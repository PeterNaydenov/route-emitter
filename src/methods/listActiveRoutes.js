function listActiveRoutes ( dependencies, state ) {
return function listActiveRoutes () {
    const { rt } = state;
    return rt.map ( r => `${r.name} ---> ${r.path}`)
}} // listActiveRoutes func.



export default listActiveRoutes


