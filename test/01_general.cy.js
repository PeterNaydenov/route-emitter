
import routeEmitter from '/src/main'

describe ( 'routeEmitter: General', () => {
  
  // let x;


  // before ( () => {
  //         // const routes = [
  //         //                   {
  //         //                       path : '/about/:id'
  //         //                     , event : 'myPage'
  //         //                   },
  //         //                   {
  //         //                       path  : '/contact/:name'
  //         //                     , event : 'contact'
  //         //                   },
  //         //                   {
  //         //                       path  : '*'
  //         //                     , event : 'default'
  //         //                   }
  //         //               ]
  //         // x = routeEmitter (routes)
  //     }) // before 



  it.only ( 'test', () => {
              console.log ( 'TEST' )
    }) // it test


  it( 'RouteEmmiter structure', () => {          
          expect ( x.navigate ).to.be.a ( 'function' )
          expect ( x.on       ).to.be.a ( 'function' )
          expect ( x.destroy  ).to.be.a ( 'function' )
      }) // it playground



  it ( 'Change route', () => {
            x.navigate ( '/watch' )
            cy.url().should ( 'include', '/watch' )
      }) // it change route

  

  it ( 'Event off', () => {
            let 
                  a = 0
                , url = '/contact/Peter'
                ;
            x.on ( 'contact', () => a++ )
            x.off ( 'contact' )
            x.navigate ( url )
            expect ( a ).to.be.equal ( 0 )
      }) // it event off



  it ( 'execute event', done => {
            let url = '/contact/Peter';
            x.on ( 'contact', props => {
                        const { name,path, pathname } = props;
                        expect ( name ).to.be.equal ( 'Peter' )
                        expect ( path ).to.be.equal ( '/contact/:name' )
                        expect ( pathname ).to.be.equal ( url )
                        x.off ( 'contact' )
                        done ()
                  })
            x.navigate ( '/' )
            x.navigate ( url )
      }) // it execute event



  it ( 'Do not trigger event if url is the same', () => {
            let 
                a = 0
              , url = '/contact/Peter'
              ;
            x.navigate ( '/' )
            x.on ( 'contact', props => a++ )
            x.navigate ( url )
            x.navigate ( url )
            expect ( a ).to.be.equal ( 1 )
            x.off ( 'contact' )
      }) // it Do not trigger event if url is the same



   it ( 'Trigger a default route', done => {
            let url = '/noise'
            x.on ( 'default', props => {
                      const { path, pathname } = props
                      expect ( path ).to.be.equal ( '*' )
                      expect ( pathname ).to.be.equal ( url )
                      expect ( props['*']).to.be.equal ( 'noise' )
                      x.off ( 'default' )
                      done ()
                })
            x.navigate ( '/noise' )
      }) // it trigger a default route



    it ( 'Destroy the router', () => {
            let 
                url = '/contact/Peter'
              , a = 0
              ;
            x.navigate ( '/' )
            let loc = window.location.href;

            x.on ( 'contact', props => a++ )
            x.destroy ()
            x.navigate ( url )
            expect ( window.location.href ).to.be.equal ( loc )
            expect ( a ).to.be.equal ( 0 )
      }) // it Destroy the router

}) // describe