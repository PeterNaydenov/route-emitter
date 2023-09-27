'use strict'
/**
 *   Browser window.history controller
 */

import askForPromise from 'ask-for-promise' // Docs: https://github.com/PeterNaydenov/ask-for-promise



function historyController ( ) {
    
    let wait = null;

    function write ({state, title, url},  overwriteFlag ) {
            if ( !overwriteFlag )    window.history.pushState    ( state, '', url )
            else                     window.history.replaceState ( state, '', url )
            const isFn = (typeof title === 'function');
            document.title = isFn ? title ( state.data ) : title
        } // setState func.

        

    function read () {
                return window.location.pathname;
        } // readLocation func.
    


    function listen ( fn ) {
            window.onpopstate = function ( event ) {
                                                let { PGID, url, data } = event.state;
                                                fn ( wait, {addressName:PGID, data, url} )
                                        }
        } // listen func.



    function back ( steps=1 ) {
                    wait = askForPromise ()   // history.back is asynch operation. It's applied when event 'popstate' is fired
                    history.back ()
                    return wait.promise            
        } // back func.


    function go ( steps=1 ) {
                    wait = askForPromise ()   // history.go is asynch operation. It's applied when event 'popstate' is fired
                    history.go ( steps )
                    return wait.promise
        } // go func.
    


    function destroy () {
            window.onpopstate = null            
        } // destroy func.



    return {
              write
            , read
            , back
            , go

            , listen
            , destroy
        }
} // historyController func.



export default historyController


