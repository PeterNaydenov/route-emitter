'use strict'
/**
 *   Browser window.history controller
 */
function historyController ( dependencies ) {
    let 
          records = 0
        , historyCall = false
        // , { eBus } = dependencies
        , customReadFn = false
        ;

    function setState ( state, title, url ) {
            if ( historyCall ) {
                    historyCall = false
                    return
                }
            if ( records === 0 ) {   
                        window.history.replaceState ( state, title, url )
                        records++
                }
            else        window.history.pushState ( state, title, url    )
            document.title = title
        } // setState func.
    
    function readLocation () {
                const str = window.location.pathname.substring(1);
                if ( customReadFn )   customReadFn ( str )
                else                  return str
        } // readLocation func.


    function setCustomReadLocation ( fn ) {
            customReadFn = fn
        } // setCustomReadLocation func.

    window.onpopstate = function ( event ) {
                                    let 
                                          act      = false 
                                        , pageName = ''
                                        ;
                                    historyCall = true
                                    if ( event.state && typeof event.state === 'object' ) {
                                            act = event.state.act
                                            pageName = event.state.pageName
                                        }
                                    // if ( act )   eBus.emit ( act, { pageName } )
                            }
    return {
              setState
            , readLocation
            , setCustomReadLocation
        }
} // historyController func.



export default historyController


