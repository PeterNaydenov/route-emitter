
import routeEmitter from "../src/main.js"  


describe ( 'routeEmitter: General', () => {
        
    
    
    it.only ( 'test', () => {
                        let router = routeEmitter ();
                        console.log ( router.onChange(()=>{}) )
        })

}) // describe