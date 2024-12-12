'use strict';

var notice = require('@peter.naydenov/notice');
var UrlPattern = require('url-pattern');
var askForPromise = require('ask-for-promise');

function historyController ( ) {
    
    let wait = null;

    function write ({state, title, url},  keepHistoryFlag ) {
            if ( keepHistoryFlag )   window.history.pushState    ( state, '', url );
            else                     window.history.replaceState ( state, '', url );
            const isFn = (typeof title === 'function');
            document.title = isFn ? title ( state.data ) : title;
        } // setState func.

        

    function read () {
                return window.location.pathname;
        } // readLocation func.
    


    function listen ( fn ) {
            onpopstate = function onPopState ( event ) {
                                let { PGID, url, data } = event.state;
                                if ( !wait )   wait = askForPromise ();
                                fn ( wait, {addressName:PGID, data, url} );
                                wait = null;
                            };
        } // listen func.



    function back ( steps=1 ) {
                    wait = askForPromise ().timeout ( 1500, 'expire' );   // history.back is asynch operation. It's applied when event 'popstate' is fired
                    window.history.back ( steps );
                    wait.onComplete ( d => { if ( d === 'expire')   wait = null; }); // prevent unclosed promises
                    return wait.promise            
        } // back func.



    function go ( steps=1 ) {
                    wait = askForPromise ().timeout ( 1500, 'expire' );   // history.go is asynch operation. It's applied when event 'popstate' is fired
                    window.history.go ( steps );
                    wait.onComplete ( d => { if ( d === 'expire')   wait = null; }); // prevent unclosed promises
                    return wait.promise
        } // go func.
    


    function destroy () {
            window.onpopstate = null;            
        } // destroy func.



    return {
              write
            , read
            , back
            , go

            , listen
            , destroy
        }
} // historyController func.

function _historyActions ( dependencies, state ) {

return function _historyActions ( task, {addressName, data, url}) {
            const 
                  { eBus, API } = dependencies
                , lastLocation  = state.lastLocation
                ;
            API.navigate ( addressName, data, true );  // last argument is 'historyEvent' flag.
            if ( lastLocation === url )   eBus.emit ( '_RELOAD', addressName, data, url );
            else                          eBus.emit ( '_CHANGE' , addressName, data, url );
            task.done ( addressName, data );
}} // _historyActions func.

function _locationChange ( dependencies, state ) {
return function _locationChange () {
            const { eBus, history, API } = dependencies;
            let 
                  reload = false
                , missingURL = true
                , usingRedirect = false
                ;
            const 
                  lastLocation = sessionStorage.getItem ( state.SSName )
                , url = history.read ()
                ;
            if ( lastLocation && lastLocation === url )   reload = true;
            missingURL = state.rt.every ( ({ name, pattern, title, redirect, data={} }) => {   // Search for address name
                                let res = pattern.match ( url );
                                if ( res ) {
                                            if ( redirect ) {
                                                    API.navigate ( redirect, data, true );
                                                    usingRedirect = true;
                                                    return false
                                                }
                                            sessionStorage.setItem ( state.SSName, url );
                                            state.lastLocation = url;
                                            state.lastAddress  = name;
                                            history.write ({ 
                                                              state : { PGID: name, url, data:res }
                                                            , url
                                                            , title
                                                        }, true );
                                                        
                                            if ( reload )    eBus.emit ( '_RELOAD', name, res, url );
                                            else             eBus.emit ( '_CHANGE',  name, res, url );
                                            return false   // Prevents duplicated data in the browser.history
                                    }
                                return true
                        });
            if ( missingURL ) {   // URL is not defined in the address list
                        if ( usingRedirect )   return
                        eBus.emit ( '_ERROR', { code: 404, message: `There is no defined address for path "${url}".` });
                        return 
                }
            state.lastRoute = url;
}} // _locationChange func.

function _setAddressRecord ( dependencies, state ) {
return function _setAddressRecord ({name, path, title, inHistory, redirect, data }) {
    
    if ( name == null      )   return null
    if ( path == null      )   return null
    if ( title == null     )   title = state.appName;
    if ( inHistory == null )   inHistory = false;

    const
          { UrlPattern } = dependencies 
        , pattern = new UrlPattern ( path )
        ;
    return { name, path, title, inHistory, pattern, redirect, data }
}} // _setAddressRecord func.

function createURL ( dependencies, state ) {
/**
 * @function createURL
 * @description Creates URL from address name and data
 * @param {string} addressName - Name of the address
 * @param {object|string} data - Data to be used for creating URL(optional)
 */
return function createURL ( addressName, data={} ) {
        const { routes } = state;
        if ( !routes[addressName] ) {  // If address is not registered
                    console.error ( `Address "${addressName}" is not registered` );
                    return null
            }
    
        const { pattern } = routes [ addressName ];

        try {
                const url = pattern.stringify ( data );
                return url
            }
        catch ( err ) {
                console.error ( `Data provided for address "${addressName}" is not correct.`);
                return null
            }
}} // createURL func.

function getCurrentAddress ( dependencies, state ) {
return function getCurrentAddress () {
        const 
                { lastAddress, lastLocation, routes } = state
                , { pattern } = routes[lastAddress]
                ;
        let data = pattern.match ( lastLocation );
        return [ state.lastAddress, data ]
}} // getCurrentAddress func.

function destroy ( dependencies, state ) {
return function destroy () {
        const { eBus, history, dead } = dependencies;
        state.isActive = false;
        eBus.off ();
        history.destroy ();
        sessionStorage.removeItem ( state.SSName );
        dependencies.API = {
                              on : dead
                            , navigate : dead
                            , destroy : dead
                        };
}} // destroy func.

function listActiveAddresses ( dependencies, state ) {
return function listActiveAddresses () {
    return state.rt.map ( r => r.name )
}} // listActiveAddresses func.

function listActiveRoutes ( dependencies, state ) {
return function listActiveRoutes () {
    const { rt } = state;
    return rt.map ( r => `${r.name} ---> ${r.path}`)
}} // listActiveRoutes func.

function navigate ( dependencies, state ) {
const { history, eBus } = dependencies;
return function navigate ( addressName, data={}, historyEvent=false ) {
    // historyEvent flag should be 'true' if 'navigate' is called from '_historyActions' or in _locationChange is detected 'reload' event.
    // This historyEvent flag prevents history line - forwards and backwards. 
    if ( !state.isActive ) {  // Don't use navigate before router.run()
                console.error ( 'Router is not active. Use router.run() to activate it.' );
                return
        }
    const { lastAddress, lastLocation, routes } = state;
    if ( !routes[addressName] ) {  // If address is not registered
                console.error ( `Address "${addressName}" is not registered` );
                eBus.emit ( '_ERROR', { code: 404, message: `Address "${addressName}" is not registered` });
                return  
        }

    let oldHistoryFlag = false;   // False means replaceState, true means pushState
    const { pattern, title, redirect, data:redirectData } = routes[addressName];
    if ( redirect ) {
                navigate ( redirect, redirectData );
                return
        }
    if ( lastAddress )   oldHistoryFlag = routes[ lastAddress ].inHistory;
    try {
                const url = pattern.stringify ( data );
                if ( url === lastLocation )   return   // If same path, do nothing
                state.lastLocation = url;
                sessionStorage.setItem ( state.SSName, url );
                state.lastAddress  = addressName;
                if ( historyEvent )   oldHistoryFlag = false;   // Ignore 'inHistory' flag if event is coming from history or refresh event
                history.write ({ 
                                  state : { PGID: addressName, url, data }
                                , url
                                , title
                            }, oldHistoryFlag ); 
        } 
    catch ( err ) {
                eBus.emit ( '_ERROR', { code: 400, message: `Data provided for address "${addressName}" is not correct. ${err}` });
                return
        }
}} // navigate func.

function setAddresses ( dependencies, state ) {
return function setAddresses ( list, cancelList=[] ) {
     const { _setAddressRecord } = dependencies.inAPI;
     list.forEach ( route => {
                const addressRecord = _setAddressRecord ( route );
                if ( !addressRecord )   return
                if ( cancelList.includes ( addressRecord.name ) )   return

                const name = addressRecord.name;
                state.rt.push ( addressRecord );
                state.routes[name] = addressRecord;
        });
      return dependencies.API
}} // setAddresses func.

function removeAddresses ( dependencies, state ) {
return function removeAddresses ( removeList ) {
    const { rt } = state;
    state.rt = rt.reduce (( res, item ) => {
                                        let { name } = item;
                                        if ( removeList.includes ( name )) {
                                                    delete state.routes [ name ];
                                                    return res
                                            }
                                        res.push ( item );
                                        return res
                            }, []);
    return dependencies.API
}} // removeAddresses func.

function run ( dependencies, state ) {
return function run () {
    const { inAPI, history } = dependencies;
    state.isActive = true;
    history.listen ( inAPI._historyActions );
    inAPI._locationChange ();
}} // run func.

var methods = {
                // inAPI methods
                  _historyActions
                , _locationChange
                , _setAddressRecord       // Individual address record preparation

                // API methods
                , createURL
                , getCurrentAddress
                , destroy
                , listAciveAddresses: listActiveAddresses
                , listActiveRoutes
                , navigate
                , removeAddresses
                , run
                , setAddresses
            };

function routeEmitter ( config ) {
  const 
      eBus  = notice ()
    , history = historyController ()
    , { appName, sessionStorageKey } = config || {}
    , state = {
                  lastLocation : ''   // Last url
                , lastAddress : null  // Last address name
                , SSName : '_routeEmmiterLastLocation' // Session Storage(SS) key for last location
                , appName : 'App Name' // Used as a title for addresses without title property
                , rt : []      // Addresses as a list
                , routes : {}  // Addresses definitions
                , isActive : false  // If router is running - true, else - false
            }
    , dead = () => console.error ( 'Router was destroyed' )
    , dependencies = { UrlPattern, eBus, history, dead }
    , APImethods = {}
    , inAPI = {}
    ;
    
  if ( appName           && ( typeof appName === 'string'           ))   state.appName = appName;
  if ( sessionStorageKey && ( typeof sessionStorageKey === 'string' ))   state.SSName = sessionStorageKey;  

  Object.entries ( methods ).forEach ( ([name,fn]) => {
                if ( name.startsWith ( '_' ) )   inAPI[name]      = fn ( dependencies, state );
                else                             APImethods[name] = fn ( dependencies, state );
      });
  dependencies.inAPI = inAPI;
  dependencies.API = {
              // Event related methods
                onChange  : fn => { eBus.on ( '_CHANGE',  fn ); return dependencies.API }
              , onError   : fn => { eBus.on ( '_ERROR',   fn ); return dependencies.API }
              , onReload  : fn => { eBus.on ( '_RELOAD', fn ); return dependencies.API }
              // History related methods
              , back      : steps => history.back ( steps )
              , forward   : steps => history.go   ( steps )
              // Router related methods
              , ...APImethods
      };
  return dependencies.API
}  // ReactEmmiter func.

module.exports = routeEmitter;
