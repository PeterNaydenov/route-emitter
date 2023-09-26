
import routeEmitter from "../src/main.js"  


const addressList = [
                        {                       
                              name : 'home'      
                            , path : '/__cypress/iframes/index.html'
                        }
                ];

describe ( 'routeEmitter: General', () => {
        
    
    
    it ( 'Public API', () => {
                        let router = routeEmitter ();
                        // Should provide the public API:
                        expect ( router ).to.have.property ( 'run' )
                        expect ( router ).to.have.property ( 'setAddresses' )
                        expect ( router ).to.have.property ( 'onChange' )
                        expect ( router ).to.have.property ( 'onError' )
                        expect ( router ).to.have.property ( 'onRefresh' )
                        expect ( router ).to.have.property ( 'destroy' )
                        expect ( router ).to.have.property ( 'navigate' )
                        expect ( router ).to.have.property ( 'back' )
        }) // it public API



    it ( 'Chainable methods', () => {
                    let router = routeEmitter ();
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
                    const router = routeEmitter ();
                    router.setAddresses ( addressList )
                    const r = router.listAciveAddresses ();
                    expect ( r ).to.be.an ( 'array' )
                    expect ( r ).to.contains ( 'home' )
        }) // it set addresses, list active addresses



    it ( 'Setup and Run it', done => {
                    expect ( document.title ).to.be.equal ( 'Components App' ) // Default title for the test page
                    routeEmitter ()
                            .setAddresses ( addressList )
                            .onChange ((page, data, url) => {
                                                expect ( url ).to.be.equal ( addressList[0].path )
                                                expect ( page ).to.be.equal ( 'home')
                                                expect ( document.title ).to.be.equal ( 'App Name' ) // Expect title to be changed to address title. If address title is not defined - application name
                                                done ()                   
                                        })
                            .run ()
        }) // it setup and run it



    it ( 'Change application name', done => {
                    routeEmitter ({ appName: 'New App Name' })
                        .setAddresses ( addressList )
                        .onChange ((page, data, url) => { 
                                                expect ( document.title ).to.be.equal ( 'New App Name' ) 
                                                done ()
                                        })
                        .run ()
        }) // it change application name

}) // describe