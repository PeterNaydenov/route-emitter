function destroy ( dependencies, state ) {
const { eBus, history } = dependencies;
return function destroy () {
        console.log ( dependencies.API )
        state.isActive = false
        eBus.off ()
        history.destroy ()
        removeEventListener ( 'DOMContentLoaded', inAPI._locationChange )
        removeEventListener ( 'beforeunload'    , inAPI._beforeUnload   )
        sessionStorage.removeItem ( state.SSName )
        dependencies.API = {
                              on : dead
                            , navigate : dead
                            , destroy : dead
                        }
}} // destroy func.



export default destroy


