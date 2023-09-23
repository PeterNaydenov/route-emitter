'use strict'

function setConfig ( dependencies, state ) {
return function setConfig ({ appName, addressDefault, addressError } ) {
        if ( appName && (typeof appName === 'string') )   state.appName = appName
        if ( addressDefault && (typeof addressDefault === 'string') )   state.addressDefault = addressDefault
}} // setConfig func.



export default setConfig


