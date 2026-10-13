import routeEmitter from '../src/main.js'
import { describe, it, expect, beforeEach } from 'vitest'

// Runs in its own file, so popstate listeners left by other tests can't react to traversal here.
const addressList = [
  { name: 'home', path: '/index.html', inHistory: true },
  { name: 'about', path: '/about/:name', title: p => `About ${p.name}`, inHistory: true }
]



describe ( 'routeEmitter: History', () => {



  beforeEach ( () => {
          sessionStorage.clear ()
          history.replaceState ( null, '', '/index.html' )
    })



  it ( 'Back', async () => {
          const changes = []
          const router = routeEmitter ().setAddresses ( addressList )
          router.onChange ( ( name, data, url ) => changes.push ([ name, url ]) )
          router.run ()
          router.navigate ( 'about', { name: 'John' })
          expect ( location.pathname ).toBe ( '/about/John' )

          const result = await router.back ()
          expect ( result ).toBe ( 'home' )
          expect ( location.pathname ).toBe ( '/index.html' )
          expect ( document.title ).toBe ( 'App Name' )
          expect ( changes.at ( -1 ) ).toEqual ([ 'home', '/index.html' ])
          expect ( router.getCurrentAddress ()[0] ).toBe ( 'home' )
          router.destroy ()
    }) // it Back



  it ( 'Back and going forward', async () => {
          const changes = []
          const router = routeEmitter ().setAddresses ( addressList )
          router.onChange ( ( name, data, url ) => changes.push ( url ) )
          router.run ()
          router.navigate ( 'about', { name: 'John' })
          router.navigate ( 'about', { name: 'Peter' })

          expect ( await router.back ( 2 ) ).toBe ( 'home' )
          expect ( location.pathname ).toBe ( '/index.html' )

          expect ( await router.forward () ).toBe ( 'about' )
          expect ( location.pathname ).toBe ( '/about/John' )
          expect ( document.title ).toBe ( 'About John' )

          expect ( await router.forward () ).toBe ( 'about' )
          expect ( location.pathname ).toBe ( '/about/Peter' )

          expect ( changes ).toEqual ([ '/index.html', '/index.html', '/about/John', '/about/Peter' ])
          router.destroy ()
    }) // it Back and going forward



  it ( 'Back without history resolves with "expire"', async () => {
          const router = routeEmitter ().setAddresses ( addressList )
          router.run ()
          expect ( await router.back ( 100 ) ).toBe ( 'expire' )
          router.destroy ()
    }) // it Back without history

}) // describe History
