'use strict'
/**
 *   Browser window.history controller
 */

import askForPromise from 'ask-for-promise' // Docs: https://github.com/PeterNaydenov/ask-for-promise



function historyController ( ) {
    
    let wait = null;

    function write ({state, title, url},  keepHistoryFlag ) {
            if ( keepHistoryFlag )   window.history.pushState    ( state, '', url )
            else                     window.history.replaceState ( state, '', url )
            const isFn = (typeof title === 'function');
            document.title = isFn ? title ( state.data ) : title
        } // setState func.

        

    function read () {
                return window.location.pathname;
        } // readLocation func.
    


    function listen ( fn ) {
            onpopstate = function onPopState ( event ) {
                                let { PGID, url, data } = event.state;
                                if ( !wait )   wait = askForPromise ()
                                fn ( wait, {addressName:PGID, data, url} )
                                wait = null
                            }
        } // listen func.



    function back ( steps=1 ) {
                    wait = askForPromise ().timeout ( 1500, 'expire' )   // history.back is asynch operation. It's applied when event 'popstate' is fired
                    window.history.back ( steps )
                    wait.onComplete ( d => { if ( d === 'expire')   wait = null }) // prevent unclosed promises
                    return wait.promise            
        } // back func.



    function go ( steps=1 ) {
                    wait = askForPromise ().timeout ( 1500, 'expire' )   // history.go is asynch operation. It's applied when event 'popstate' is fired
                    window.history.go ( steps )
                    wait.onComplete ( d => { if ( d === 'expire')   wait = null }) // prevent unclosed promises
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


