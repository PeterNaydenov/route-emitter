function run ( dependencies, state ) {
return function run () {
    const { inAPI, history } = dependencies;
    state.isActive = true
    history.listen ( inAPI._historyActions )
    addEventListener ( 'DOMContentLoaded', inAPI._locationChange )   // Listen for the initial page load.
    inAPI._locationChange ()
}} // run func.



export default run


