// Type check for ESM consumers. Imports the package by name, so the "exports" map is used.
import routeEmitter, { type API, type Address } from '@peter.naydenov/route-emitter'

const addresses: Address[] = [
      { name: 'home', path: '/' }
    , { name: 'user', path: '/user/:id', title: data => `User ${data.id}`, inHistory: true }
    , { name: 'old', path: '/old', redirect: 'home' }
]

const router: API = routeEmitter ()
routeEmitter ({ appName: 'App', sessionStorageKey: 'key' })

router
    .onChange ( ( name: string, data: Object, url: string ) => {} )
    .onReload ( () => {} )
    .onError  ( ({ code, message }) => {} )
    .setAddresses ( addresses )
    .removeAddresses ([ 'old' ])

router.run ()
router.navigate ( 'user', { id: 1 } )

const url: string | null = router.createURL ( 'user', { id: 1 } )
const [ name, data ] = router.getCurrentAddress ()
const id = data?.id
const names: string[] = router.listActiveAddresses ()
const legacyNames: string[] = router.listAciveAddresses ()
const routes: string[] = router.listActiveRoutes ()
const back: Promise<string> = router.back ()
router.forward ( 2 )
router.destroy ()
