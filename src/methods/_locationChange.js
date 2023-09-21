function _locationChange ( dependencies, state ) {
const { history, eBus } = dependencies;
return function _locationChange () {
                                let reload = false;
                                const 
                                      lastLocation = sessionStorage.getItem ( state.SSName )
                                    , url = window.location.pathname
                                    ;
                                if ( lastLocation && lastLocation === window.location.pathname )   reload = true
                                let missingURL = state.rt.every ( ({ name, pattern, title }) => {   // Search for address name
                                                    let res = pattern.match ( url );
                                                    if ( res ) {
                                                                if ( reload ) { 
                                                                        eBus.emit ( '_REFRESH', { name })
                                                                        return false  // Prevents duplicated data in the browser.history
                                                                    }
                                                                document.title = title
                                                                console.log ( title )
                                                                history.write ({page:name, url, title}, true )
                                                                return false
                                                        }
                                                    return true
                                            })
                                if ( missingURL ) {   // URL is not defined in the address list
                                            eBus.emit ( '_ERROR', { code: 404, message: `Path "${url}" is not registered` })
                                            return 
                                    }
                                state.lastRoute = url
}} // _locationChange func.



export default _locationChange


