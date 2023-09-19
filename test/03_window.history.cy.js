import historyController from "../src/historyController"


describe ( 'historyController', () => {



it ( 'Change url', () => {
        const 
              STR = '/__cypress/iframes/'
            , history = historyController ()
            ;

        history.setState ( {no:'something'}, 'Test page', 'test' )
        cy.location()
            .should ( loc => expect ( loc.pathname ).to.eq ( `${STR}test` ))
            .then ( () => history.setState ( {no:'trend'}, 'About page', 'about/Peter' ) )
            .then ( () => cy.location().should ( loc =>  expect(loc.pathname).to.eq( `${STR}about/Peter` ))   )
            .then ( () => cy.title().should ('equal', 'About page' ))
            .then ( () => history.setState ( {no:'trend'}, 'Ivan profile', 'about/Ivan' ))
            .then ( () => cy.title().should ('equal', 'Ivan profile' ))
            .then ( () => cy.window() )
            .then ( win => win.history.back ()   )
            .then ( () => cy.title().should ('equal', 'About page' ))
                
            
                
            
}) // it change url


}) // describe historyController