'use strict'
function setAddresses ( dependencies, state ) {
return function setAddresses ( list, cancelList=[] ) {
     const { _setRoute } = dependencies.inAPI;
     list.forEach ( route => {
                const routeRecord = _setRoute(route);
                if ( !routeRecord )   return
                if ( cancelList.includes ( routeRecord.name ) )   return

                const name = routeRecord.name;
                state.rt.push ( routeRecord )
                state.routes[name] = routeRecord
        })
      return dependencies.API
}} // setAddresses func.



export default setAddresses
