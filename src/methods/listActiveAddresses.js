function listActiveAddresses ( dependencies, state ) {
return function listActiveAddresses () {
    const { rt } = state;
    return rt.map ( r => r.name )
}} // listActiveAddresses func.   



export default listActiveAddresses


