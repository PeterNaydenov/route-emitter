import { createRequire } from 'node:module'
import { describe, it, expect } from 'vitest'
import routeEmitter from '../src/main.js'

const require = createRequire ( import.meta.url )



describe ( 'routeEmitter: Package', () => {



  it ( 'listActiveAddresses and deprecated listAciveAddresses return the same list', () => {
          const router = routeEmitter ()
          router.setAddresses ([ { name: 'home', path: '/index.html' }, { name: 'about', path: '/about' } ])
          expect ( router.listActiveAddresses () ).toEqual ([ 'home', 'about' ])
          expect ( router.listAciveAddresses ()  ).toEqual ([ 'home', 'about' ])
          router.destroy ()
    }) // it listActiveAddresses



  it ( 'CommonJS build exports the routeEmitter function', () => {
          const cjs = require ( '../dist/route-emitter.cjs' )
          expect ( cjs ).toBeTypeOf ( 'function' )
          const router = cjs ()
          expect ( router.listActiveAddresses ).toBeTypeOf ( 'function' )
          expect ( router.listAciveAddresses  ).toBeTypeOf ( 'function' )
          router.destroy ()
    }) // it CommonJS build

}) // describe Package
