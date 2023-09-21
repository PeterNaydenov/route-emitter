function _setRoute ( dependencies, state ) {
return function _setRoute ({name, path, title, inHistory }) {
    
    if ( name == null      )   return
    if ( path == null      )   return
    if ( title == null     )   title = state.appName
    if ( inHistory == null )   inHistory = false

    const
          { UrlPattern } = dependencies 
        , pattern = new UrlPattern ( path )
        ;
    return { name, path, title, inHistory, pattern }
}} // setRoute func.



export default _setRoute


