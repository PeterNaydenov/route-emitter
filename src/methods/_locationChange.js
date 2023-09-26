function _locationChange ( dependencies, state ) {
const { eBus, history } = dependencies;
return function _locationChange () {
            let 
                  reload = false
                , missingURL = true
                ;
            const 
                  lastLocation = sessionStorage.getItem ( state.SSName )
                , url = history.read ()
                ;
            if ( lastLocation && lastLocation === url )   reload = true
            missingURL = state.rt.every ( ({ name, pattern, title }) => {   // Search for address name
                                let res = pattern.match ( url );
                                if ( res ) {
                                            sessionStorage.setItem ( state.SSName, url )
                                            if ( reload )    eBus.emit ( '_REFRESH', name, res, url )
                                            else             eBus.emit ( '_CHANGE',  name, res, url )
                                            return false   // Prevents duplicated data in the browser.history
                                    }
                                return true
                        })
            if ( missingURL ) {   // URL is not defined in the address list
                        eBus.emit ( '_ERROR', { code: 404, message: `There is no defined address for path "${url}".` })
                        return 
                }
            state.lastRoute = url
}} // _locationChange func.



export default _locationChange


