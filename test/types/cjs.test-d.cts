// Type check for CommonJS consumers. `require` resolves to dist/route-emitter.cjs and types/main.d.cts.
import routeEmitter = require ( '@peter.naydenov/route-emitter' )

const router: routeEmitter.API = routeEmitter ({ appName: 'App' })
const address: routeEmitter.Address = { name: 'home', path: '/' }

router.setAddresses ([ address ]).onChange ( ( name: string ) => {} )
const names: string[] = router.listActiveAddresses ()
