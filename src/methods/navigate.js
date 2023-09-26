function navigate ( dependencies, state ) {
const { history, eBus } = dependencies;
return function navigate ( addressName, data={} ) {
    
    if ( !state.isActive ) {  
                console.error ( 'Router is not active. Use router.run() to activate it.' )
                return
        }
    const { lastAddress, lastLocation, routes } = state;
    if ( !routes[addressName] ) {  // If address is not registered
                console.error ( `Address "${addressName}" is not registered` )
                eBus.emit ( '_ERROR', { code: 404, message: `Address "${addressName}" is not registered` })
                return  
        }

    let oldHistoryFlag = false;   // False means replaceState, true means pushState
    const { pattern, title } = routes[addressName];

    if ( lastAddress )   oldHistoryFlag = state.routes[ lastAddress ].inHistory
    try {
                const url = pattern.stringify ( data );
                if ( url === lastLocation )   return   // If same path, do nothing
                const isFn = (typeof title === 'function');
                document.title = isFn ? title ( data ) : title
                history.write ({ 
                                  state : { PGID: addressName, url, data }
                                , url
                            }, oldHistoryFlag ) 
                state.lastLocation = url
                sessionStorage.setItem ( state.SSName, url )
                state.lastAddress  = addressName
        } 
    catch ( err ) {
                eBus.emit ( '_ERROR', { code: 400, message: `Data provided for address "${addressName}" is not correct. ${err}` })
                return
        }
}} // navigate func.



export default navigate


