function _locationChange ( dependencies, state ) {
const { history, eBus } = dependencies;
return function _locationChange () {
                                let reload = false;
                                const 
                                      lastLocation = sessionStorage.getItem ('_routeEmmiterLastLocation' )
                                    , url = window.location.pathname
                                    ;
                                if ( lastLocation && lastLocation === window.location.pathname )   reload = true
                                state.rt.every ( ({ name, pattern, title }) => { // Search an address name
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
                                state.lastRoute = url
}} // _locationChange func.



export default _locationChange


