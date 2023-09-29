function listActiveAddresses ( dependencies, state ) {
return function listActiveAddresses () {
    return state.rt.map ( r => r.name )
}} // listActiveAddresses func.   



export default listActiveAddresses


