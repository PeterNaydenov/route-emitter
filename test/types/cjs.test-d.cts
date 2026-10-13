// Type check for CommonJS consumers. `require` resolves to dist/route-emitter.cjs and types/main.d.cts.
import routeEmitter = require ( '@peter.naydenov/route-emitter' )

const router: routeEmitter.API = routeEmitter ({ appName: 'App' })
const address: routeEmitter.Address = { name: 'home', path: '/' }

router.setAddresses ([ address ]).onChange ( ( name: string ) => {} )
const names: string[] = router.listActiveAddresses ()

// The generated CommonJS declarations must match the ESM declarations
import type * as esm from '@peter.naydenov/route-emitter' with { 'resolution-mode': 'import' }

type Equal<A, B> = ( <T>() => T extends A ? 1 : 2 ) extends ( <T>() => T extends B ? 1 : 2 ) ? true : false

const sameFactory        : Equal<typeof routeEmitter, typeof esm.default>               = true
const sameAPI            : Equal<routeEmitter.API, esm.API>                             = true
const sameAddress        : Equal<routeEmitter.Address, esm.Address>                     = true
const sameAddressHandler : Equal<routeEmitter.AddressHandler, esm.AddressHandler>       = true
const sameErrorHandler   : Equal<routeEmitter.ErrorHandler, esm.ErrorHandler>           = true
const sameRouterError    : Equal<routeEmitter.RouterError, esm.RouterError>             = true
