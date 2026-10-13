function getCurrentAddress ( dependencies, state ) {
/**
 * @function getCurrentAddress
 * @description Returns the name of the current address and the parsed data
 * @returns {array} [ addressName, data ]. Data is null if no address is loaded yet or the address was removed.
 *
 */
return function getCurrentAddress () {
        const
                { lastAddress, lastLocation, routes } = state
                , record = lastAddress ? routes[lastAddress] : null
                ;
        if ( !record )   return [ lastAddress, null ]
        return [ lastAddress, record.pattern.match ( lastLocation ) ]
}} // getCurrentAddress func.



export default getCurrentAddress


