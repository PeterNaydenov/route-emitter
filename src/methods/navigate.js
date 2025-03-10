function navigate ( dependencies, state ) {
const { history, eBus } = dependencies;
/**
 *  @function navigate
 *  @description Navigate to address by name
 *  @param {string} addressName - name of address to navigate to
 *  @param {object} [data={}] - data to use for path generation
 *  @param {boolean} [historyEvent=false] - flag to indicate if this navigate is called from '_historyActions'
 *                                          or in _locationChange is detected 'reload' event. This flag prevents
 *                                          history line - forwards and backwards.
 *  @return {void}
 */
return function navigate ( addressName, data={}, historyEvent=false ) {
    // historyEvent flag should be 'true' if 'navigate' is called from '_historyActions' or in _locationChange is detected 'reload' event.
    // This historyEvent flag prevents history line - forwards and backwards. 
    if ( !state.isActive ) {  // Don't use navigate before router.run()
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
    const { pattern, title, redirect, data:redirectData } = routes[addressName];
    if ( redirect ) {
                navigate ( redirect, redirectData )
                return
        }
    if ( lastAddress )   oldHistoryFlag = routes[ lastAddress ].inHistory
    try {
                const url = pattern.stringify ( data );
                if ( url === lastLocation )   return   // If same path, do nothing
                state.lastLocation = url
                sessionStorage.setItem ( state.SSName, url )
                state.lastAddress  = addressName
                if ( historyEvent )   oldHistoryFlag = false   // Ignore 'inHistory' flag if event is coming from history or refresh event
                history.write ({ 
                                  state : { PGID: addressName, url, data }
                                , url
                                , title
                            }, oldHistoryFlag ) 
        } 
    catch ( err ) {
                eBus.emit ( '_ERROR', { code: 400, message: `Data provided for address "${addressName}" is not correct. ${err}` })
                return
        }
}} // navigate func.



export default navigate


