function _setAddressRecord ( dependencies, state ) {
return function _setAddressRecord ({name, path, title, inHistory, redirect, data }) {
    
    if ( name == null      )   return null
    if ( path == null      )   return null
    if ( title == null     )   title = state.appName
    if ( inHistory == null )   inHistory = false

    const
          { UrlPattern } = dependencies 
        , pattern = new UrlPattern ( path )
        ;
    return { name, path, title, inHistory, pattern, redirect, data }
}} // _setAddressRecord func.



export default _setAddressRecord


