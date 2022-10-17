'use strict'
/**
 *    Route-emitter
 * 
 *    - Published for first time: October 10th, 2022
 * 
 */

import { createBrowserRouter } from 'react-router-dom'
import notice from '@peter.naydenov/notice'



function routeEmitter (routes) {
  let 
        lastLocation = ''
      , lastRoute = null
      , writeLastLocation = r => lastLocation = r
      , router = null
      , rt = []
      ;

  const eBus = notice ();
    


  function setupRouter (routes=[]) {
                rt = routes.map ( r => ({ path : r.path })   )
                return createBrowserRouter ( rt )
    } // setupRoutes func.


  
  function subscribe ( router ) {
                eBus.start ( '*' )
                router.subscribe ( ({matches}) => {
                                lastRoute = matches[0]
                                let { pathname:loc, params, route:{path, props } } = lastRoute;
                                if ( !path )   return
                                if ( loc !== lastLocation )    {
                                            emitEvent ( lastRoute)
                                            writeLastLocation ( loc )
                                    }
                      })
    } // subscribe func.


  function emitEvent ( lastRoute ) {
        const { pathname:loc, params, route:{path, props } } = lastRoute;
        routes.forEach ( r => {
                    if ( r.path === path ) {
                                eBus.emit ( r.event, {
                                                  pathname : loc
                                                , path
                                                , ...params
                                          })
                            }
            })
    } // repeat func.



  function addRoutes ( newRoutes ) {
              let updates = false;
              
              newRoutes.forEach ( newRoute => {
                          const notDefinedRoute = rt.every ( r => r.path !== newRoute.path );
                          if ( notDefinedRoute ) {
                                  updates = true
                                  routes.push ( newRoute )
                             }
                  }) // forEach route

              if ( updates ) {
                          router = setupRouter ( routes )
                          subscribe ( router )
                  }
    } // addRoute func.



  function updateRoutes ( updatedRoutes ) {
              let updates = false;
              updatedRoutes.forEach ( newRoute => {
                          routes = routes.reduce ((res,r) => {
                                            if ( r.path === newRoute.path ) {  
                                                      res.push ( { ...newRoute })
                                                      updates = true
                                                }
                                            else {
                                                    res.push ( r )
                                                }
                                            return res
                                      }, [] )
                  }) // forEach route
              if ( updates ) {
                          router = setupRouter ( routes )
                          subscribe ( router )
                  }
    } // updateRoutes func.



  function setRoutes ( newRoutes ) {
              newRoutes.forEach ( newRoute => {
                          let updates = false;
                          routes = routes.reduce ((res,r) => {
                                            if ( r.path === newRoute.path ) {  
                                                      res.push ( { ...newRoute })
                                                      updates = true
                                                }
                                            else {
                                                      res.push ( r )
                                                }
                                            return res
                                      }, [] )
                          if ( !updates )   routes.push ({...newRoute})
                  }) // forEach route
              router = setupRouter ( routes )
              subscribe ( router )
    } // setRoutes func.



  function removeRoutes ( pathList=false ) {
            let updates = false;
            if ( !pathList ) {
                     routes = []
                     rt = []
                     eBus.stop ( '*' )
                     return
                }
            else {
                    routes = routes.reduce ( (res, el) => {
                                            if ( pathList.includes(el.path) ) {
                                                      updates = true
                                                      return res
                                                }
                                            res.push ( el )
                                            return res
                                      }, [])
                }

            if ( updates ) {
                        router = setupRouter ( routes )
                        subscribe ( router )
                }
    } // removeRoutes func.



  const dead = () => console.error ( 'Router was destroyed' );
  const getActiveRoutes = () => rt.map ( r => r.path )
  
  router = setupRouter ( routes );
  subscribe ( router )
  
  return {
                on     : eBus.on
              , off    : eBus.off
              , stop   : eBus.stop
              , start  : eBus.start
              , once   : eBus.once
              , addRoutes 
              , removeRoutes
              , updateRoutes
              , setRoutes
              , getActiveRoutes
              , getCurrent : () => lastRoute
              , navigate   : (to,settings) => router.navigate ( to, settings )
              , repeat     : () => emitEvent ( lastRoute )
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


