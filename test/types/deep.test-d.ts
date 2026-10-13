// Type check for deep imports of the builds and sources. Each one should resolve to the main declarations.
import fromESMBuild from '@peter.naydenov/route-emitter/dist/route-emitter.esm.js'
import fromSource   from '@peter.naydenov/route-emitter/src/main.js'
import routeEmitter, { type API } from '@peter.naydenov/route-emitter'

const a: API = fromESMBuild ()
const b: API = fromSource ({ appName: 'App' })
const c: typeof routeEmitter = fromSource
