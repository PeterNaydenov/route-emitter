'use strict'
function setAddresses ( dependencies, state ) {
/**
 * @function setAddresses
 * @description Registers list of addresses
 * @param {array} list - List of addresses
 * @param {string[]} [cancelList=[]] - Names of addresses to skip
 * @returns {object} Router API (chainable)
 *   
 */
return function setAddresses ( list, cancelList=[] ) {
     const { _setAddressRecord } = dependencies.inAPI;
     list.forEach ( route => {
                const addressRecord = _setAddressRecord ( route );
                if ( !addressRecord )   return
                if ( cancelList.includes ( addressRecord.name ) )   return

                const name = addressRecord.name;
                state.rt.push ( addressRecord )
                state.routes[name] = addressRecord
        })
      return dependencies.API
}} // setAddresses func.



export default setAddresses
