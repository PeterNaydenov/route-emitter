
import routeEmitter from "../src/main.js"  


const addressList = [
                        {                       
                              name : 'home'      
                            , path : '/__cypress/iframes/index.html'
                            , inHistory : true
                        },
                        {                       
                            name : 'about'      
                          , path : '/__cypress/iframes/about/:name'
                          , title : p => `About ${p.name}`
                          , inHistory : true
                        }
                ];
let router = routeEmitter ();

describe ( 'routeEmitter: General', () => {
        
  
    
    it ( 'Public API', () => {
                        router = routeEmitter ();
                        // Should provide the public API:
                        expect ( router ).to.have.property ( 'run' )
                        expect ( router ).to.have.property ( 'setAddresses' )
                        expect ( router ).to.have.property ( 'onChange' )
                        expect ( router ).to.have.property ( 'onError' )
                        expect ( router ).to.have.property ( 'onRefresh' )
                        expect ( router ).to.have.property ( 'destroy' )
                        expect ( router ).to.have.property ( 'navigate' )
                        expect ( router ).to.have.property ( 'back' )
                        router.destroy ()
        }) // it public API



    it ( 'Chainable methods', () => {
                    router = routeEmitter ();
                    expect ( router ).to.have.property ( 'run' )
                    expect ( router.run ).to.be.a ( 'function' )
                    // Test for a chainable methods:
                    expect ( router.setAddresses( addressList) ).to.have.property ( 'run' )
                    expect ( router.removeAddresses( addressList) ).to.have.property ( 'run' )
                    expect ( router.onChange( () => {} ) ).to.have.property ( 'run' )
                    expect ( router.onError( () => {} ) ).to.have.property ( 'run' )
                    expect ( router.onRefresh( () => {} ) ).to.have.property ( 'run' )
        }) // it chainable methods



    it ( 'Set addresses, list active addresses', () => {
                    router = routeEmitter ();
                    router.setAddresses ( addressList )
                    const r = router.listAciveAddresses ();
                    expect ( r ).to.be.an ( 'array' )
                    expect ( r ).to.contains ( 'home' )
                    router.destroy ()
        }) // it set addresses, list active addresses



    it ( 'Setup and Run it', done => {
                    expect ( document.title ).to.be.equal ( 'Components App' ) // Default title for the test page
                    router = routeEmitter ()
                            .setAddresses ( addressList )
                            .onChange ((page, data, url) => {
                                                expect ( url ).to.be.equal ( addressList[0].path )
                                                expect ( page ).to.be.equal ( 'home')
                                                // Expect document title to be changed to address title. 
                                                expect ( document.title ).to.be.equal ( 'App Name' ) // -> If address title is not defined - application name
                                                done ()                   
                                        })
                            .run ()
        }) // it setup and run it



    it ( 'Change application name', done => {
                    const router = routeEmitter ({ appName: 'New App Name' })
                        router.setAddresses ( addressList )
                        router.onChange ((page, data, url) => { 
                                                expect ( document.title ).to.be.equal ( 'New App Name' ) 
                                                router.destroy ()
                                                done ()
                                        })
                        .run ()
        }) // it change application name



    it ( 'Title as a function', done => {
                let router = routeEmitter ().setAddresses ( addressList );
                router.onChange ( (page, data, url) => {
                                if ( page === 'home' ) {  
                                                router.navigate ( 'about', { name: 'John' } ) // provide data for the address
                                                expect ( document.title ).to.be.equal ( 'About John' ) // Title function is executed and applied
                                                let currentURL = window.location.pathname;
                                                expect ( currentURL  ).to.be.equal ( '/__cypress/iframes/about/John' ) // URL is changed
                                                router.navigate ( 'home' )
                                                router.destroy ()
                                                done ()
                                        }
                        })
                router.run ()
        }) // it title as a function



    it ( 'Back', done => {
                let i = 0;
                let router = routeEmitter ().setAddresses ( addressList );
                router.onChange ( ( address, data, url ) => {
                                if ( address === 'home' )  i++
                        })

                router.run ()

                router.navigate ( 'about', { name: 'John' } ) // provide data for the address
                expect ( window.location.pathname  ).to.be.equal ( '/__cypress/iframes/about/John' ) // URL is changed

                router.back () // router.back is asynch operation and returns a promise
                      .then ( res => {
                                expect ( res ).to.be.equal ( 'home' )   // router.back resolves with the address name
                                expect ( i ).to.be.equal ( 2 )          // onChange with address 'home' is called twice. First time when router.run is called, second time when router.back is called.
                                expect ( document.title ).to.be.equal ( 'App Name' ) // Title for address 'home' is not exist and application name is applied
                                router.destroy ()
                                done ()
                      })
        }) // it back
    

}) // describe