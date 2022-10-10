
import routeEmitter from '/src/main'

describe ( 'routeEmitter: Extended', () => {
  
  let x;


  beforeEach ( () => {
          const routes = [
                            {
                                path : '/about/:id'
                              , event : 'myPage'
                            },
                            {
                                path  : '/contact/:name'
                              , event : 'contact'
                            }
                        ]
          x = routeEmitter ( routes )
      }) // before 



  it ( 'No route matches', () => {          
            let a = 0;
            x.on ( 'contact', props =>  a ++   )            
            x.navigate ( '/contact' )
            expect ( a ).to.be.equal ( 0 )  
            // No matches in route definition
      }) // it playground



  it ( 'Add a new route', done => {
            x.addRoutes([
                        { 
                              path : '*'
                            , event : 'default'
                        }
                    ])
            x.on ( 'default', props => {
                        expect ( props.path ).to.be.equal ( '*' )
                        done ()
                })
            x.navigate ( '/watch' )            
      }) // it Add a new route



  it ( 'Try to add route that is already defined', () => {
            // Should keep existing routes
            let a = 0;
            x.addRoutes([
                        { 
                              path : '/contact/:name'
                            , event : 'check'
                        }
                    ])
            x.on ( 'check'  , () => a = 'changes' )
            x.on ( 'contact', () => a = 'not changed' )
            x.navigate ( '/contact/Peter' )
            expect ( a ).to.be.equal ( 'not changed' )
      }) // it Try to add route that is already defined

  

  it ( 'Remove a route', () => {
            let a = 0;
            x.on ( 'myPage', () =>  a++   )
            x.navigate ( '/about/24' )
            x.removeRoutes (['/about/:id'])
            x.navigate ( '/about/30' )
            expect ( a ).to.be.equal ( 1 )
      }) // it Remove a route



  it ( 'Remove all routes', () => {
            let a = 0;
            x.on ( 'myPage', () => a++ )
            x.navigate ( '/about/24' )
            x.removeRoutes ()
            x.navigate ( '/about/48' )
            expect ( a ).to.be.equal ( 1 )
            x.addRoutes ([
                            {
                              path : '/about/:id'
                            , event : 'myPage'
                            }
                    ])
            x.navigate ( '/about/88' )
            expect ( a ).to.be.equal ( 2 )
        }) // it Remove all routes



  it ( 'Multiple subscriptions', () => {
            let 
                  a = 0
                , b = 0
                ;
            x.on ( 'myPage', () =>  a++   )
            x.navigate ( '/about/24' )
            x.on ( 'myPage', () => b++ )
            x.navigate ( '/about/30' )
            expect ( a ).to.be.equal ( 2 )
            expect ( b ).to.be.equal ( 1 )
      }) // it execute event


      
   it ( 'Get active routes', () => {
            const list = x.getActiveRoutes ();
            expect ( list ).to.have.length ( 2 )
            expect ( list[0] ).to.be.equal ( '/about/:id' )
            expect ( list[1] ).to.be.equal ( '/contact/:name' )
        }) // it Get active routes



  it ( 'Update Routes', () => {
            let 
                  a = 'initial'
                , b = 'initial'
                ;
            x.on ( 'myPage', () => a = 'no change')
            x.on ( 'afterChange', () => { a = 'after change'})
            x.on ( 'more', () => b = 'more' )
            x.updateRoutes ( [
                            { path: '/about/:id', event: 'afterChange' },
                            { path: '*', event: 'more' }
                        ])
            x.navigate ( '/about/48' )
            x.navigate ( '/watch')
            expect ( a ).to.be.equal ( 'after change' )
            expect ( b ).to.be.equal ( 'initial' )  // Updates only existing routes
        })

  it ( 'Use method setRoutes', () => {
            let 
                  a = 'initial'
                , b = 'initial'
                ;
            x.on ( 'afterChange', () => a = 'after change' )
            x.on ( 'more'       , () => b = 'more')
            x.setRoutes ([
                            { path: '/about/:id', event: 'afterChange' },
                            { path: '*', event: 'more' }
                        ])
            x.navigate ( '/about/Peter')
            x.navigate ( '/watch' )
            expect ( a ).to.be.equal ( 'after change' )
            expect ( b ).to.be.equal ( 'more' )
        }) // it Use method setRoutes

}) // describe
