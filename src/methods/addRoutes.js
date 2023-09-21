'use strict'

function addRoutes ( dependencies, state ) {
return function addRoutes ( newRoutes ) {
    const { routes, inAPI } = dependencies;
              
    newRoutes.forEach ( newRoute => {
                const 
                      newName = newRoute.name
                    , notDefinedRoute = ( state.routes[ newName ] == null )
                    ;
                const routeRecord = inAPI._setRoute ( newRoute )
                if ( notDefinedRoute ) {
                        updates = true
                        routes.push ( newRoute )
                   }
        }) // forEach route

    if ( updates ) {
                router = setupRouter ( routes )
                subscribe ( router )
        }
}}  // addRoutes func.