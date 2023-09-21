'use strict'
/**
 *   Browser window.history controller
 */
function historyController ( dependencies ) {



    function write ({state, title, url},  overwriteFlag ) {
            console.log ( 'historyController.write' )
            console.log ( overwriteFlag )
            if ( overwriteFlag )  window.history.pushState    ( state, title, url )
            else                  window.history.replaceState ( state, title, url )
            document.title = title
        } // setState func.

        

    function read () {
                return window.location.pathname.substring(1);
        } // readLocation func.
    


    function listen ( fn ) {
            window.onpopstate = function ( event ) {
                                                console.log ( 'pop-state event' )
                                                console.log ( window.location.pathname )
                                                let page = event.state.page;
                                                fn ( page, event.state )
                                        }
        } // listen func.

    
    
    function destroy () {
                            window.onpopstate = null            
        } // destroy func.



    return {
              write
            , read
            , listen
            , destroy
        }
} // historyController func.



export default historyController


