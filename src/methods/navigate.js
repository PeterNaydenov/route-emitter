function navigate ( dependencies, state ) {
const { history } = dependencies;
return function navigate ( addressName, data={} ) {

    if ( !state.routes[addressName] ) {  // If address is not registered
                console.error ( `Address "${addressName}" is not registered` )
                return  
        }

    let oldHistoryFlag = false;   // False means replaceState, true means pushState
    const { pattern, title } = state.routes[addressName];

    if ( state.lastLocation )   oldHistoryFlag = state.routes[ state.lastLocation ].inHistory
    try {
                const url = pattern.stringify ( data );
                if ( url === state.lastRoute )   return // If same path, do nothing
                history.write ({ 
                                  state : { page: addressName, url } // TODO: Think about state...
                                , title
                                , url
                            }, oldHistoryFlag ) 
                state.lastLocation = addressName
                state.lastRoute = url
        } 
    catch ( err ) {
                console.error ( `Missing data. \n ${err} `)
                return
        }
}} // navigate func.



export default navigate


