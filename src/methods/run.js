function run ( dependencies, state ) {
return function run () {
    const { inAPI, history } = dependencies;
    history.listen ( inAPI._historyAction )   
    addEventListener ( 'DOMContentLoaded', inAPI._locationChange )   // Listen for the initial page load.
    inAPI._locationChange ()
    state.isActive = true
}} // run func.



export default run


