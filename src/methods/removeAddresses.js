function removeAddresses ( dependencies, state ) {
return function removeAddresses ( removeList ) {
    const { rt } = state;
    state.rt = rt.reduce (( res, item ) => {
                                        let { name } = item;
                                        if ( removeList.includes ( name )) {
                                                    delete state.routes [ name ]
                                                    return res
                                            }
                                        res.push ( item )
                                        return res
                            }, [])
    return dependencies.API
}} // removeAddresses func.



export default removeAddresses


