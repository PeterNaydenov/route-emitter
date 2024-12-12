function listActiveAddresses ( dependencies, state ) {
/**
 * @function listActiveAddresses
 * @description Returns a list of active address names from the state.
 * @returns {String[]} A list of active address names.
 */
return function listActiveAddresses () {
    return state.rt.map ( r => r.name )
}} // listActiveAddresses func.   



export default listActiveAddresses


