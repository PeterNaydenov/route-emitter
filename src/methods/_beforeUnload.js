function _beforeUnload ( dependencies, state) {
return function _beforeUnload ( e ) {
            e.preventDefault ()
            sessionStorage.setItem ( state.SSName, window.location.pathname ) 
            confirm ( 'Are you sure you want to leave?' )
}} // _beforeUnload func.



export default _beforeUnload


  