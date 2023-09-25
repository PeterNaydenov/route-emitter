'use strict'
/**
 *    Route-emitter
 * 
 *    - Published for first time: October 10th, 2022
 *    - Version 2: September 26th, 2023
 * 
 */

import notice from '@peter.naydenov/notice'   // Docs: https://github.com/PeterNaydenov/notice
import UrlPattern from 'url-pattern'          // Docs: https://github.com/snd/url-pattern

import historyController from './historyController.js' // Browser window.history controller
import methods from './methods/index.js'               // Library methods



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
            }
    , dependencies = { UrlPattern, eBus, history }
    , APImethods = {}
    , inAPI = {}
    , dead = () => console.error ( 'Router was destroyed' );
    ;
    
  if ( appName           && ( typeof appName === 'string'           ))   state.appName = appName
  if ( sessionStorageKey && ( typeof sessionStorageKey === 'string' ))   state.SSName = sessionStorageKey  

  Object.entries ( methods ).forEach ( ([name,fn]) => {
                if ( name.startsWith ( '_' ) )   inAPI[name]      = fn ( dependencies, state )
                else                             APImethods[name] = fn ( dependencies, state )
      })
  dependencies.inAPI = inAPI
  
  history.listen ( ( addressName, data, url ) => {   // Start listening for pop-state events
                if ( state.lastLocation === url )   eBus.emit ( '_REFRESH', addressName, data, url )
                else                                eBus.emit ( '_CHANGE', addressName, data, url  )
      })   
  addEventListener ( 'DOMContentLoaded', inAPI._locationChange )  // Listen for the initial page load.
  addEventListener ( 'beforeunload', e => {
                  e.preventDefault ()
                  sessionStorage.setItem ( state.SSName, window.location.pathname ) 
                  confirm ( 'Are you sure you want to leave?' )
                  return null
        })

  

  
  
  dependencies.API = {
                run     : () => { // start the router
                                  // Check if  all settings are correct and then start the router
                } 

              // Event related methods
              , onChange  : fn => { eBus.on ( '_CHANGE',  fn ); return dependencies.API }
              , onError   : fn => { eBus.on ( '_ERROR',   fn ); return dependencies.API }
              , onRefresh : fn => { eBus.on ( '_REFRESH', fn ); return dependencies.API }
              , debug  : eBus.debug

              // Routes related methods
              // , setAddresses
              // , addAddresses
              // , removeAddresses
              // , updateAddresses
              , listActiveRoutes    : () => state.rt.map ( r => `${r.name} ---> ${r.path}`)
              , listActiveAddresses : () => state.rt.map ( r => r.name )
              , getCurrent : () => lastRoute
              , ...APImethods
              , repeat     : () => { if ( lastRoute )   emitEvent ( lastRoute ) }
              , destroy    : () => {
                                    eBus.off ()
                                    // TODO: Stop all browser event listeners
                                    return router = {
                                                    on : dead
                                                  , navigate : dead
                                                  , destroy : dead
                                              }
                                }
      }
  return dependencies.API
}  // ReactEmmiter func.



export default routeEmitter


