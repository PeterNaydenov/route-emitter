function _historyActions ( dependencies, state ) {
const { eBus } = dependencies;
return function _historyActions ( addressName, data, url ) {
            if ( state.lastLocation === url )   eBus.emit ( '_REFRESH', addressName, data, url )
            else                                eBus.emit ( '_CHANGE', addressName, data, url  )
}} // _historyActions func.



export default _historyActions


