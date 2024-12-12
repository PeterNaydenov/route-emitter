function getCurrentAddress ( dependencies, state ) {
/**
 * @function getCurrentAddress
 * @description Returns the name of the current address and the parsed data
 * @returns {array} [ addressName, data ]
 * 
 */        
return function getCurrentAddress () {
        const 
                { lastAddress, lastLocation, routes } = state
                , { pattern } = routes[lastAddress]
                ;
        let data = pattern.match ( lastLocation )
        return [ state.lastAddress, data ]
}} // getCurrentAddress func.



export default getCurrentAddress


