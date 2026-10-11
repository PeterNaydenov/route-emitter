'use strict'
/**
 *    Route-emitter
 * 
 *    - Published for first time: October 10th, 2022
 *    - Version 2 - full rewrite: September 29th, 2023
 * 
 */

import notice from '@peter.naydenov/notice'             // Docs: https://github.com/PeterNaydenov/notice
import { UrlPattern } from '@peter.naydenov/url-pattern'    // Docs: https://github.com/PeterNaydenov/url-pattern

import historyController from './historyController.js' // Browser window.history controller
import methods from './methods/index.js'               // Library methods

/**
 * @callback AddressHandler
 * @param {string} addressName - Name of the address
 * @param {Record<string, any>} data - Data extracted from the URL
 * @param {string} url - The URL
 * @returns {void}
 */


/**
 * @typedef {Object} RouterError
 * @property {number} code - 404 for an unknown address or path, 400 for wrong address data
 * @property {string} message - Error description
 */


/**
 * @callback ErrorHandler
 * @param {RouterError} error
 * @returns {void}
 */


/**
 * @typedef {Object} API
 * @property {(fn: AddressHandler) => API} onChange - Register a callback function for "change" signal
 * @property {(fn: AddressHandler) => API} onReload - Register a callback function for "reload" signal
 * @property {(fn: ErrorHandler) => API} onError - Register a callback function for "error" signal
 * @property {(steps?: number) => Promise<string>} back - Go back in history. Resolves with the address name or 'expire'
 * @property {(steps?: number) => Promise<string>} forward - Go forward in history. Resolves with the address name or 'expire'
 * @property {() => void} run - Start the router
 * @property {(addressName: string, data?: Record<string, any>) => void} navigate - Change current address
 * @property {(addressName: string, data?: Record<string, any>) => (string|null)} createURL - Create URL from address name and data
 * @property {() => [ (string|null), (Record<string, any>|null) ]} getCurrentAddress - Returns the current address name and data
 * @property {(list: Address[], cancelList?: string[]) => API} setAddresses - Set the address list
 * @property {(removeList: string[]) => API} removeAddresses - Remove addresses from the list by name
 * @property {() => string[]} listActiveAddresses - Returns a list of active addresses names
 * @property {() => string[]} listAciveAddresses - Deprecated. Misspelled alias of listActiveAddresses
 * @property {() => string[]} listActiveRoutes - Returns a list of active addresses and their paths
 * @property {() => void} destroy - Destroy the router
 */


/**
 * @typedef {Object} Address
 * @property {string} name - The name of the route.
 * @property {string} path - The path of the route.
 * @property {string|((data: Record<string, any>) => string)} [title] - The title of the route, or a function that returns it.
 * @property {boolean} [inHistory=false] - Indicates if the route should be in history.
 * @property {string} [redirect] - The name of the route to redirect to.
 * @property {Record<string, any>} [data] - Data used for the redirect address.
 */


/**
 * Initializes and returns a route emitter instance.
 * 
 * This function sets up a router with the provided configuration,
 * allowing for URL pattern matching, state management, and event
 * handling for route changes, errors, and reloads.
 * 
 * @param {Object} [config] - Configuration options for the route emitter.
 * @param {string} [config.appName='App Name'] - Name used as a title for addresses without a title property.
 * @param {string} [config.sessionStorageKey='_routeEmmiterLastLocation'] - Key used to store the last route in sessionStorage.
 * 
 * @returns {API} Router instance with methods for event handling, navigation, and state management.
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


