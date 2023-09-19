import UrlPattern from "url-pattern"
import notice from "@peter.naydenov/notice" 


let pattern = new UrlPattern ( '/contact/:name' )

// let props = pattern.match ( '/cn/Peter' )
console.log ( 'YES' )

window.addEventListener ( 'locationchange', function () {
    console.log( 'location changed!' );
});

// console.log ( props )


function ReactEmmiter () {
let 
        lastLocation = ''
      , lastRoute = null
      , writeLastLocation = r => lastLocation = r
      , router = null
      , rt = []
      ;

const eBus = notice ();

return {
                on     : eBus.on
              , off    : eBus.off
              , stop   : eBus.stop
              , start  : eBus.start
              , once   : eBus.once
              , debug  : eBus.debug
              , addRoutes 
              , removeRoutes
              , updateRoutes
              , setRoutes
              , getActiveRoutes
              , getCurrent : () => lastRoute
              , navigate   : (to,settings) => router.navigate ( to, settings )
              , repeat     : () => { if ( lastRoute )   emitEvent ( lastRoute ) }
              , destroy    : () => {
                                    eBus.off ()
                                    return router = {
                                                    on : dead
                                                  , navigate : dead
                                                  , destroy : dead
                                              }
                                }
      }
} // ReactEmmiter func.