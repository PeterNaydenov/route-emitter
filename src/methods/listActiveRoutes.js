function listActiveRoutes ( dependencies, state ) {
/**
 * @function listActiveRoutes
 * @description Returns a list of active address paths.
 * @returns {String[]} A list of active address paths.
 */
return function listActiveRoutes () {
    const { rt } = state;
    return rt.map ( r => `${r.name} ---> ${r.path}`)
}} // listActiveRoutes func.



export default listActiveRoutes


