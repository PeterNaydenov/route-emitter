function createURL ( dependencies, state ) {
/**
 * @function createURL
 * @description Creates URL from address name and data
 * @param {string} addressName - Name of the address
 * @param {object} [data={}] - Data to be used for creating URL
 * @returns {string|null} URL or null if address is unknown or data is incorrect
 */
return function createURL ( addressName, data={} ) {
        const { routes } = state;
        if ( !routes[addressName] ) {  // If address is not registered
                    console.error ( `Address "${addressName}" is not registered` )
                    return null
            }
    
        const { pattern } = routes [ addressName ];

        try {
                const url = pattern.stringify ( data );
                return url
            }
        catch ( err ) {
                console.error ( `Data provided for address "${addressName}" is not correct.`)
                return null
            }
}} // createURL func.
    
    
    
export default createURL
    
    
    