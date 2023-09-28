function _historyActions ( dependencies, state ) {

return function _historyActions ( task, {addressName, data, url}) {
            const 
                  { eBus, API } = dependencies
                , lastLocation  = state.lastLocation
                ;
            API.navigate ( addressName, data, true )  // last argument is 'historyEvent' flag.
            if ( lastLocation === url )   eBus.emit ( '_REFRESH', addressName, data, url )
            else                          eBus.emit ( '_CHANGE' , addressName, data, url )
            task.done ( addressName, data )
}} // _historyActions func.



export default _historyActions


