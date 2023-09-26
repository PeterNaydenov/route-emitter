function _locationChange ( dependencies, state ) {
const { eBus } = dependencies;
return function _locationChange () {
            let 
                  reload = false
                , missingURL = true
                ;
                console.log ( 'hamam' )
            const 
                  lastLocation = sessionStorage.getItem ( state.SSName )
                , url = window.location.pathname
                ;
                // console.log ( '_locationChange' )
                // console.log ( url )
                // console.log ( lastLocation )
                // console.log ( lastLocation === url ? 'reload' : 'change' )
            if ( lastLocation && lastLocation === window.location.pathname )   reload = true
            console.log ( state.rt )
            missingURL = state.rt.every ( ({ name, pattern, title }) => {   // Search for address name
                                let res = pattern.match ( url );
                                
                                if ( res ) {
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


