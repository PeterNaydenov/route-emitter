
import routeEmitter from "../src/main.js"  


describe ( 'routeEmitter: General', () => {
        
    
    
    it.only ( 'test', () => {
                        let router = routeEmitter ();
                        router.onChange ( (pageName, data, url ) => {
                                    console.log ('Hello world' )
                                    console.log ( pageName )
                                    console.log ( data  )
                                    console.log ( url )
                                    console.log ( '<----------<<<<' )
                            })
                        router.onError ( ({message}) => {
                                    console.log ( 'ERROR MSG:' )
                                    console.log ( message )
                            })
                        router.setAddresses ([
                                    { name: 'home',  path: '/__cypress/iframes/index.html', title: 'Home' },
                                    { name: 'about', path: '/__cypress/iframes/about.html', title: 'About' }
                            ])
                        // router.run ()
                        router.navigate ( 'about' )
                        console.log ( window.location.pathname )
        })

}) // describe