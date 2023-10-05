import _historyActions    from "./_historyActions.js"
import _locationChange    from "./_locationChange.js"
import _setAddressRecord  from "./_setAddressRecord.js"  

import createURL          from "./createURL.js"
import getCurrentAddress  from "./getCurrentAddress.js"
import destroy            from "./destroy.js"
import listAciveAddresses from "./listActiveAddresses.js"
import listActiveRoutes   from "./listActiveRoutes.js"
import navigate           from "./navigate.js"
import setAddresses       from "./setAddresses.js"
import removeAddresses    from "./removeAddresses.js"
import run                from "./run.js"


export default {
                // inAPI methods
                  _historyActions
                , _locationChange
                , _setAddressRecord       // Individual address record preparation

                // API methods
                , createURL
                , getCurrentAddress
                , destroy
                , listAciveAddresses
                , listActiveRoutes
                , navigate
                , removeAddresses
                , run
                , setAddresses
            }
