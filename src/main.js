'use strict'
/**
 *    Route-emitter
 * 
 *    - Published for first time: October 10th, 2022
 *    - Version 2 - full rewrite: September 29th, 2023
 * 
 */

import notice from '@peter.naydenov/notice'   // Docs: https://github.com/PeterNaydenov/notice
import UrlPattern from 'url-pattern'          // Docs: https://github.com/snd/url-pattern

import historyController from './historyController.js' // Browser window.history controller
import methods from './methods/index.js'               // Library methods



/**
 * @typedef {Object} API
 * @property {function(function):API} onChange - Register a callback function for "change" signal
 * @property {function(function):API} onReload - Register a callback function for "refresh" signal
 * @property {function(function):API} onError - Register a callback function for "error" signal
 * @property {function():API} run - Start the router
 * @property {function(string):API} navigate - Change current address
 * @property {function():string} getCurrentAddress - Returns the current address name and data
 * @property {function(Address[]):API} setAddresses - Set the address list
 * @property {function(string[]):API} removeAddresses - Remove addresses from the list by name
 * @property {function():string} listActiveAddresses - Returns a list of active addresses names
 * @property {function():Object} listActiveRoutes - Returns a list of active addresses and their paths
 * @property {function():API} destroy - Destroy the router
 */


/**
 * @typedef {Object} Address
 * @property {string} name - The name of the route.
 * @property {string} path - The path of the route.
 * @property {function} [title] - A function that returns the title of the route.
 * @property {boolean} [inHistory=true] - Indicates if the route should be in history.
 * @property {string} [redirect] - The name of the route to redirect to.
 */


/**
 * Initializes and returns a route emitter instance.
 * 
 * This function sets up a router with the provided configuration,
 * allowing for URL pattern matching, state management, and event
 * handling for route changes, errors, and reloads.
 * 
 * @param {Object} config - Configuration options for the route emitter.
 * @param {string} [config.appName='App Name'] - Name used as a title for addresses without a title property.
 * @param {string} [config.sessionStorageKey='_routeEmmiterLastLocation'] - Key used to store the last route in sessionStorage.
 * 
 * @returns {API}
 * navigation, and state management.
 */
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
    
  if ( appName           && ( typeof appName === 'string'           ))   state.appName = appName
  if ( sessionStorageKey && ( typeof sessionStorageKey === 'string' ))   state.SSName = sessionStorageKey  

  Object.entries ( methods ).forEach ( ([name,fn]) => {
                if ( name.startsWith ( '_' ) )   inAPI[name]      = fn ( dependencies, state )
                else                             APImethods[name] = fn ( dependencies, state )
      })
  dependencies.inAPI = inAPI
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
      }
  return dependencies.API
}  // ReactEmmiter func.



export default routeEmitter


