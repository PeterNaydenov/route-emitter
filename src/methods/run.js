function run ( dependencies, state ) {
return function run () {
    const { inAPI, history } = dependencies;
    state.isActive = true
    history.listen ( inAPI._historyActions )
    inAPI._locationChange ()
}} // run func.



export default run


