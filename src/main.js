'use strict'
/**
 *    Route-emitter
 * 
 *    - Published for first time: October 10th, 2022
 *    - Version 2: September 20th, 2023
 * 
 */

import { createBrowserRouter } from 'react-router-dom'
import notice from '@peter.naydenov/notice'
import UrlPattern from 'url-pattern'


import historyController from './historyController.js' // Browser window.history controller
import methods from './methods/index.js'               // Library methods



function routeEmitter ({ appName='App Name', addressList }) {
  const 
      eBus  = notice ()
    , history = historyController ()
    , state = {
                  lastLocation : ''
                , appName
                , lastRoute : null
                , rt : []      // Route list
                , routes : {}  // Route definitions
            }
    , dependencies = { UrlPattern, eBus, history }
    , API = {}
    , inAPI = {}
    ;
    
  history.listen ( (p,state) => eBus.emit ( p, state ))


  Object.entries ( methods ).forEach ( ([name,fn]) => {
                if ( name.startsWith ( '_' ) )   inAPI[name] = fn ( dependencies, state)
                else                               API[name] = fn ( dependencies, state )
      })
  
  addEventListener ( 'DOMContentLoaded', inAPI._locationChange )  // Listen for the initial page load.
  addEventListener ( 'beforeunload', e => {
                  e.preventDefault ()
                  // TODO: Send a signal to app that the page is going to be unloaded
                  sessionStorage.setItem ('_routeEmmiterLastLocation', window.location.pathname ) 
                  return null
        })
  dependencies.inAPI = inAPI
  inAPI._setupRoutes ( addressList )

    

  const dead = () => console.error ( 'Router was destroyed' );
    
  return {
                on     : eBus.on
              , off    : eBus.off
              , stop   : eBus.stop
              , start  : eBus.start
              , once   : eBus.once
              , emit   : eBus.emit
              , debug  : eBus.debug
              // , addAddress
              // , removeAddress
              // , updateRoutes
              // , setRoutes
              , listActiveRoutes : () => state.rt.map ( r => `${r.name} ---> ${r.path}`)
              , getCurrent : () => lastRoute
              , ...API
              , repeat     : () => { if ( lastRoute )   emitEvent ( lastRoute ) }
              , destroy    : () => {
                                    eBus.off ()
                                    return router = {
                                                    on : dead
                                                  , navigate : dead
                                                  , destroy : dead
                                              }
                                }
      }
}  // ReactEmmiter func.



export default routeEmitter


const list = [
  {
      path : '/'
    , name : 'home'
    , title : 'Home Page'
    , inHistory : true
  }
  , {
      path: '/about'
    , name: 'about'
    , title : 'About Page'
    , inHistory : true
  }
]


const router = routeEmitter ({ addressList:list });
router.on ( 'home', state => {
                                console.log ( 'HOME' )
                                console.log ( state ) 
      })
router.on ( 'about', state => {
                                console.log ( 'ABOUT' )
                                console.log ( state ) 
      })
// router.getActiveRoutes ();

addEventListener ( 'beforeunload', event => {
              event.preventDefault()
              console.log ( window.location.pathname )
              return null
      })



// const home = new UrlPattern ( '/:page' )
const about = new UrlPattern ( '/:page(/:user/)' )
try {
//  let x = about.stringify({page:'info'}) 
  // router.navigate ( 'home' )
  // router.navigate ( 'about' )
  // console.log ( x )
} catch ( err ) {
    console.error ( `Missing data. \n ${err} `)
}


//  console.log ( x )