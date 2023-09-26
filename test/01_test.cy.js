
import routeEmitter from "../src/main.js"  


describe ( 'routeEmitter: General', () => {
        
    
    
    it.only ( 'test', () => {
                        let router = routeEmitter ();
                        console.log ( router )
                        // router.onChange ( (pageName, data, url ) => {
                        //             console.log ('Hello world' )
                        //             console.log ( pageName )
                        //             console.log ( data  )
                        //             console.log ( url )
                        //             console.log ( '<----------<<<<' )
                        //     })
                        // router.onError ( ({message}) => {
                        //             console.log ( 'ERROR:' )
                        //             console.log ( message )
                        //     })
                        // router.setAddresses ([
                        //             { name: 'home',  path: '/__cypress/iframes/index.html', title: 'Home' },
                        //             { name: 'about', path: '/__cypress/iframes/about.html', title: 'About' }
                        //     ])
                        // router.run ()
                        // // router.navigate ( 'about' )
                        // cy.location ().should ( ({pathname}) => {
                        //                 console.log ( pathname )
                        //         })
                        // console.log ( window.location.pathname )
        })

}) // describe