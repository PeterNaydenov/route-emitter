function destroy ( dependencies, state ) {
return function destroy () {
        const { eBus, history, dead } = dependencies;
        state.isActive = false
        eBus.off ()
        history.destroy ()
        sessionStorage.removeItem ( state.SSName )
        dependencies.API = {
                              on : dead
                            , navigate : dead
                            , destroy : dead
                        }
}} // destroy func.



export default destroy


