
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
                          , title : p => `About ${p.name}`       // Title as a function
                          , inHistory : true
                        },
                        {
                              name: 'login'
                            , path: '/__cypress/iframes/login'
                            , redirect: 'home'                  // Warning: Redirect instruction!
                        }
                ];



describe ( 'routeEmitter: General', () => {
        
  
    
    it ( 'Public API', () => {
                        const router = routeEmitter ();
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
                    const router = routeEmitter ();
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
                    router.destroy ()
        }) // it set addresses, list active addresses



    it ( 'Setup and Run it', done => {
                    expect ( document.title ).to.be.equal ( 'Components App' ) // Default title for the test page
                    const router = routeEmitter ()
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



    it ( 'Redirect on initial loading', () => {
                const addressRedirect = [
                        {                       
                              name : 'home'      
                            , path : '/__cypress/iframes/index.html'
                            , redirect: 'about'
                            , data : { name: 'John' }
                        },
                        {                       
                            name : 'about'      
                          , path : '/__cypress/iframes/about/:name'
                          , title : p => `About ${p.name}`
                          , inHistory : true
                        }
                    ];
                const router = routeEmitter ().setAddresses ( addressRedirect );
                router.run ()
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/about/John' )
                router.navigate ( 'home' )
                router.destroy ()
        }) // it redirect



    it ( 'Redirect during navigate', () => {
                const addressRedirect = [
                        {                       
                              name : 'home'      
                            , path : '/__cypress/iframes/index.html'
                        },
                        {
                              name : 'login'
                            , path : '/__cypress/iframes/login'
                            , redirect: 'about'
                            , data : { name: 'Peter' }
                        },
                        {                       
                            name : 'about'      
                          , path : '/__cypress/iframes/about/:name'
                          , title : p => `About ${p.name}`
                          , inHistory : true
                        }
                    ];
                const router = routeEmitter ().setAddresses ( addressRedirect );
                router.run ()
                router.navigate ( 'login' )
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/about/Peter' )
                expect ( document.title ).to.be.equal ( 'About Peter' )
                router.navigate ( 'home' )
                router.destroy ()
        }) // it redirect during navigate



    it ( 'Back and going forward', done => {
                const addresses = [
                        {                       
                              name : 'home'      
                            , path : '/__cypress/iframes/index.html'
                            , inHistory : true
                        },
                        {
                              name : 'login'
                            , path : '/__cypress/iframes/login'
                            , inHistory : true
                            
                        },
                        {                       
                            name : 'about'      
                          , path : '/__cypress/iframes/about/:name'
                          , title : p => `About ${p.name}`
                          , inHistory : true
                        }
                    ];
                const router = routeEmitter ().setAddresses ( addresses );
                router.run ()
                router.navigate ( 'login' )
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/login' )
                router.navigate ( 'about', { name: 'Peter' } )
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/about/Peter' )
                
                router.back ()
                      .then ( (pg,data) => {
                                expect ( pg ).to.be.equal ( 'login' )
                                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/login' )
                                return router.forward ()
                            })
                        .then ( (pg,data) => {
                                expect ( pg ).to.be.equal ( 'about' )
                                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/about/Peter' )
                                router.navigate ( 'home' )
                                router.destroy ()
                                done ()
                            })
                
        }) // it back and going forward
    


    it ( 'Add adddresses after run', () => {
                // console.log ( window.location.pathname )
                const addresses = [
                                                {                       
                                                      name : 'home'      
                                                    , path : '/__cypress/iframes/index.html'
                                                    , inHistory : true
                                                }
                                        ];
                const router = routeEmitter ().setAddresses ( addresses );
                router.run ()

                router.setAddresses ([{
                                          name  : 'login'
                                        , path  : '/__cypress/iframes/login'
                                        , title : 'App Login'
                                    }])
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/index.html' )
                router.navigate ( 'login' )
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/login' )
                router.navigate ( 'home' )
                router.destroy ()
        }) // it add adddresses after run



    it ( 'Error on missing address', () => {
                let num, msg;
                const router = routeEmitter ().setAddresses ([{
                                                                  name: 'home'
                                                                , path: '/__cypress/iframes/index.html'
                                                                , inHistory: true
                                                        }]);
                router.onChange ( ( addressName , data ) => {
                                    expect ( addressName ).to.be.equal ( 'home' )
                        })
                router.onError ( ({code, message}) => {
                                    num = code
                                    msg = message
                        })
                router.run ()
                router.navigate ( 'login' )
                expect ( num ).to.be.equal ( 404 )
                expect ( msg ).to.be.equal ( 'Address "login" is not registered' )
                router.destroy ()
        }) // it error on missing address



    it ( 'Error - missing data', () => {
                let num, msg;
                const router = routeEmitter ().setAddresses ([
                                                        {
                                                              name: 'home'
                                                            , path: '/__cypress/iframes/index.html'
                                                            , inHistory: true
                                                        },
                                                        {
                                                                  name: 'about'
                                                                , path: '/__cypress/iframes/about/:name'
                                                                , title: p => `About ${p.name}`
                                                                , inHistory: true
                                                        }
                                                    ]);
                router.onChange ( ( addressName , data ) => {
                                    expect ( addressName ).to.be.equal ( 'home' )
                        })
                router.onError ( ({code, message}) => {
                                    num = code
                                    msg = message
                        })
                router.run ()
                router.navigate ( 'about' )
                expect ( num ).to.be.equal ( 400 )
                expect ( msg ).to.be.equal ( 'Data provided for address "about" is not correct. Error: no values provided for key `name`' )
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/index.html' )
                router.destroy ()
        }) // it error - missing data



    it ( 'Remove adddresses after run', () => {
                let num, msg;
                const router = routeEmitter ().setAddresses ( addressList );
                router.removeAddresses ( ['about', 'login'] )
                router.onError ( ({code, message}) => {
                                    num = code
                                    msg = message
                        })
                router.run ()
                router.navigate ( 'login' )
                expect ( num ).to.be.equal ( 404 )
                expect ( msg ).to.be.equal ( 'Address "login" is not registered' )
                router.destroy ()
        }) // it remove adddresses after run



    it ( 'List active addresses', () => {
                let router = routeEmitter ().setAddresses ( addressList );
                router.removeAddresses ( ['login'] )

                const list = router.listAciveAddresses ();
                expect ( list.length ).to.be.equal ( 2 )
                expect ( list ).to.contains ( 'home' )
                expect ( list ).to.contains ( 'about' )
                expect ( list ).to.not.contains ( 'login' )
                router.destroy ()
        }) // it list active addresses



    it ( 'List active routes', () => {
                const router = routeEmitter ().setAddresses ( addressList );
                const list = router.listActiveRoutes ();

                expect ( list ).to.be.an ( 'array' )
                expect ( list.length ).to.be.equal ( 3 )
                expect ( list[0] ).to.be.equal ( 'home ---> /__cypress/iframes/index.html' )

                router.destroy ()
        }) // it list active routes



    it ( 'Current address', () => {
                const router = routeEmitter ().setAddresses ( addressList );
                router.run ()
                router.navigate ( 'about', { name: 'John' } )
                const [name, data] = router.getCurrentAddress ();

                expect ( name ).to.be.equal ( 'about' )
                expect ( data ).to.have.property ( 'name' )
                expect ( data.name ).to.be.equal ( 'John' )

                router.navigate ( 'home' )
                router.destroy ()
        }) // it current address



    it ( 'Insert only non existing addresses', () => {
                const router = routeEmitter ().setAddresses ( addressList );
                const updateList = [
                                        {
                                              name : 'login'
                                            , path : '/__cypress/iframes/loginUpdated'
                                            , title : 'App Login'
                                            , inHistory : true
                                        },
                                        {
                                            name: 'middle'
                                            , path: '/__cypress/iframes/middle'
                                            , title: 'Middle'
                                        }
                                    ]
                router.onError ( ({code, message}) => {
                                    console.log ( code, message )
                        })
                router.run()
                router.setAddresses ( updateList, router.listAciveAddresses() ) // provide second parameter - cancelList. If new addresses have name listed in cancelList - they will not be added or updated
                
                const list = router.listActiveRoutes();
                expect ( list ).to.contains ( 'login ---> /__cypress/iframes/login' )
                
                router.navigate ( 'middle' )
                expect ( window.location.pathname ).to.be.equal ( '/__cypress/iframes/middle' ) // expect no changes in existing addresses


                router.navigate ( 'home' )
                router.destroy ()
        }) // it insert only non existing addresses

}) // describe