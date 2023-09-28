'use strict'
/**
 *    Route-emitter
 * 
 *    - Published for first time: October 10th, 2022
 *    - Version 2: September 28th, 2023
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
              , onRefresh : fn => { eBus.on ( '_REFRESH', fn ); return dependencies.API }
              , back      : steps => history.back ( steps )
              , forward   : steps => history.go   ( steps )
              , ...APImethods
      }
  return dependencies.API
}  // ReactEmmiter func.



export default routeEmitter


