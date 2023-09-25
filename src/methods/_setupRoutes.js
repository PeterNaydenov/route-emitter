'use strict'
function _setupRoutes ( dependencies, state ) {
return function _setupRoutes ( list ) {
     const { _setRoute } = dependencies.inAPI;

     list.forEach ( route => {
                const routeRecord = _setRoute(route);
                if ( !routeRecord )   return
                const name = routeRecord.name;
                state.rt.push ( routeRecord )
                state.routes[name] = routeRecord
        })
}} // _setupRoutes func.



export default _setupRoutes
