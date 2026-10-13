// Type check for a deep `require` of the CommonJS build.
import fromCJSBuild = require ( '@peter.naydenov/route-emitter/dist/route-emitter.cjs' )

const router: fromCJSBuild.API = fromCJSBuild ()
