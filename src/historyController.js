'use strict'
/**
 *   Browser window.history controller
 */
function historyController ( ) {



    function write ({state, title, url},  overwriteFlag ) {
            if ( overwriteFlag )  window.history.pushState    ( state, title, url )
            else                  window.history.replaceState ( state, title, url )
            document.title = title
        } // setState func.

        

    function read () {
                return window.location.pathname;
        } // readLocation func.
    


    function listen ( fn ) {
            window.onpopstate = function ( event ) {
                                                let { PGID, url, data } = event.state.PGID;
                                                fn ( PGID, data, url )
                                        }
        } // listen func.

    
    
    function destroy () {
            window.onpopstate = null            
        } // destroy func.



    return {
              write
            , read
            , back : (steps=1) => window.history.go ( parseInt(`-${steps}`)   )
            , go   : (steps=1) => window.history.go ( steps )

            , listen
            , destroy
        }
} // historyController func.



export default historyController


