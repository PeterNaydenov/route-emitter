function getCurrentAddress ( dependencies, state ) {
return function getCurrentAddress () {
        const 
                { lastAddress, lastLocation, routes } = state
                , { pattern } = routes[lastAddress]
                ;
        let data = pattern.match ( lastLocation )
        return [ state.lastAddress, data ]
}} // getCurrentAddress func.



export default getCurrentAddress


