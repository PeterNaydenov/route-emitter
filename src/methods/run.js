function run ( dependencies, state ) {
/**
 * @function run
 * @description  Run the router
 * @returns {void}
 */
return function run () {
    const { inAPI, history } = dependencies;
    state.isActive = true
    history.listen ( inAPI._historyActions )
    inAPI._locationChange ()
}} // run func.



export default run


