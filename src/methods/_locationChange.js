function _locationChange ( dependencies, state ) {
return function _locationChange () {
            const { eBus, history, API } = dependencies;
            let 
                  reload = false
                , missingURL = true
                , usingRedirect = false
                ;
            const 
                  lastLocation = sessionStorage.getItem ( state.SSName )
                , url = history.read ()
                ;
            if ( lastLocation && lastLocation === url )   reload = true
            missingURL = state.rt.every ( ({ name, pattern, title, redirect, data={} }) => {   // Search for address name
                                let res = pattern.match ( url );
                                if ( res ) {
                                            if ( redirect ) {
                                                    API.navigate ( redirect, data, true )
                                                    usingRedirect = true
                                                    return false
                                                }
                                            sessionStorage.setItem ( state.SSName, url )
                                            state.lastLocation = url
                                            state.lastAddress  = name
                                            history.write ({ 
                                                              state : { PGID: name, url, data:res }
                                                            , url
                                                            , title
                                                        }, true )
                                                        
                                            if ( reload )    eBus.emit ( '_RELOAD', name, res, url )
                                            else             eBus.emit ( '_CHANGE',  name, res, url )
                                            return false   // Prevents duplicated data in the browser.history
                                    }
                                return true
                        })
            if ( missingURL ) {   // URL is not defined in the address list
                        if ( usingRedirect )   return
                        eBus.emit ( '_ERROR', { code: 404, message: `There is no defined address for path "${url}".` })
                        return 
                }
            state.lastRoute = url
}} // _locationChange func.



export default _locationChange


