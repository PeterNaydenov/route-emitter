import _beforeUnload      from "./_beforeUnload.js"
import _historyActions    from "./_historyActions.js"
import _locationChange    from "./_locationChange.js"
import _setRoute          from "./_setRoute.js"  

import listAciveAddresses from "./listActiveAddresses.js"
import listActiveRoutes   from "./listActiveRoutes.js"
import navigate           from "./navigate.js"
import setAddresses       from "./setAddresses.js"
import removeAddresses    from "./removeAddresses.js"
import run                from "./run.js"


export default {
                // inAPI methods
                  _beforeUnload
                , _historyActions
                , _setRoute       // Individual route preparation
                , _locationChange

                // API methods
                , listAciveAddresses
                , listActiveRoutes
                , navigate
                , setAddresses
                , removeAddresses
                , run
            }
