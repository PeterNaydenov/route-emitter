import routeEmitter from '../src/main.js'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const addressList = [
  { name: 'home', path: '/index.html', inHistory: true },
  { name: 'about', path: '/about/:name', title: p => `About ${p.name}`, inHistory: true },
  { name: 'login', path: '/login', redirect: 'home' }
]

describe ( 'routeEmitter: General', () => {



  it ( 'Public API', () => {
          const router = routeEmitter()
          expect(router).toHaveProperty('run')
          expect(router).toHaveProperty('setAddresses')
          expect(router).toHaveProperty('onChange')
          expect(router).toHaveProperty('onError')
          expect(router).toHaveProperty('onReload')
          expect(router).toHaveProperty('destroy')
          expect(router).toHaveProperty('navigate')
          expect(router).toHaveProperty('back')
          router.destroy()
    }) // it Public API



  it ( 'Chainable methods', () => {
          const router = routeEmitter()
          expect(router).toHaveProperty('run')
          expect(router.run).toBeTypeOf('function')
          expect(router.setAddresses(addressList)).toHaveProperty('run')
          expect(router.removeAddresses(addressList)).toHaveProperty('run')
          expect(router.onChange(() => {})).toHaveProperty('run')
          expect(router.onError(() => {})).toHaveProperty('run')
          expect(router.onReload(() => {})).toHaveProperty('run')
    }) // it Chainable methods



  it ( 'Set addresses, list active addresses', () => {
          const router = routeEmitter()
          router.setAddresses(addressList)
          const r = router.listAciveAddresses()
          expect(r).toBeInstanceOf(Array)
          expect(r).toContain('home')
          router.destroy()
    }) // it Set addresses



  it ( 'Setup and Run it', async () => {
          document.title = 'Components App'
          const router = routeEmitter()
          router.setAddresses(addressList)
          router.onChange((page, data, url) => {
                  expect(url).toBe(addressList[0].path)
                  expect(page).toBe('home')
                  expect(document.title).toBe('App Name')
            })
          router.run()
    })



  it ( 'Change application name', async () => {
          const router = routeEmitter({ appName: 'New App Name' })
          router.setAddresses(addressList)
          router.onChange(() => {
            expect(document.title).toBe('New App Name')
            router.destroy()
          })
          router.run()
    }) // it Change application name



  it ( 'Title as a function', async () => {
        let router = routeEmitter().setAddresses(addressList)
        router.onChange((page) => {
                if (page === 'home') {
                      router.navigate('about', { name: 'John' })
                      expect(document.title).toBe('About John')
                      expect(window.location.pathname).toBe('/about/John')
                      router.navigate('home')
                      router.destroy()
                  }
            })
        router.run()
    }) // it Title as a function



  it.skip ( 'Back', async () => {
        // Skipped - requires complex browser history mocking
    })



  it ( 'Redirect on initial loading', () => {
        const addressRedirect = [
          { name: 'home', path: '/index.html', redirect: 'about', data: { name: 'John' } },
          { name: 'about', path: '/about/:name', title: p => `About ${p.name}`, inHistory: true }
        ]
        const router = routeEmitter().setAddresses(addressRedirect)
        router.run()
        expect(window.location.pathname).toBe('/about/John')
        router.navigate('home')
        router.destroy()
    }) // it Redirect on initial loading



  it ( 'Redirect during navigate', () => {
        const addressRedirect = [
          { name: 'home', path: '/index.html' },
          { name: 'login', path: '/login', redirect: 'about', data: { name: 'Peter' } },
          { name: 'about', path: '/about/:name', title: p => `About ${p.name}`, inHistory: true }
        ]
        const router = routeEmitter().setAddresses(addressRedirect)
        router.run()
        router.navigate('login')
        expect(window.location.pathname).toBe('/about/Peter')
        expect(document.title).toBe('About Peter')
        router.navigate('home')
        router.destroy()
    }) // it Redirect during navigate



  it.skip ( 'Back and going forward', async () => {
        // Skipped - requires complex browser history mocking
    }) // it Back and going forward



  it ( 'Add addresses after run', () => {
        const addresses = [{ name: 'home', path: '/index.html', inHistory: true }]
        const router = routeEmitter().setAddresses(addresses)
        router.run()
        router.setAddresses([{ name: 'login', path: '/login', title: 'App Login' }])
        expect(window.location.pathname).toBe('/index.html')
        router.navigate('login')
        expect(window.location.pathname).toBe('/login')
        router.navigate('home')
        router.destroy()
    }) // it Add addresses after run



  it ( 'Error on missing address', () => {
        let num, msg
        const router = routeEmitter().setAddresses([{
          name: 'home', path: '/index.html', inHistory: true
        }])
        router.onChange((addressName) => {
          expect(addressName).toBe('home')
        })
        router.onError(({ code, message }) => {
          num = code
          msg = message
        })
        router.run()
        router.navigate('login')
        expect(num).toBe(404)
        expect(msg).toBe('Address "login" is not registered')
        router.destroy()
    }) // it Error on missing address



  it ( 'Error - missing data', () => {
          let num, msg;
          const router = routeEmitter().setAddresses([
                { name: 'home', path: '/index.html', inHistory: true },
                { name: 'about', path: '/about/:name', title: p => `About ${p.name}`, inHistory: true }
            ]);

          router.onChange((addressName) => {
                expect(addressName).toBe('home')
            })

          router.onError(({ code, message }) => {
                num = code
                msg = message
            })

          router.run ()
          router.navigate ( 'about' )
          expect( num ).toBe ( 400 )
          console.log ( msg )
          expect(msg).toContain ( 'Missing required value for segment: name' )
          expect(window.location.pathname).toBe('/index.html')
          router.destroy()
  }) // it Error - missing data




  it ( 'Remove addresses after run', () => {
          let num, msg
          const router = routeEmitter().setAddresses(addressList)
          router.removeAddresses(['about', 'login'])
          router.onError(({ code, message }) => {
            num = code
            msg = message
          })
          router.run()
          router.navigate('login')
          expect(num).toBe(404)
          expect(msg).toBe('Address "login" is not registered')
          router.destroy()
    }) // it Remove addresses after run



  it ( 'List active addresses', () => {
          let router = routeEmitter().setAddresses(addressList)
          router.removeAddresses(['login'])
          const list = router.listAciveAddresses()
          expect(list).toHaveLength(2)
          expect(list).toContain('home')
          expect(list).toContain('about')
          expect(list).not.toContain('login')
          router.destroy()
    }) // it List active addresses



  it ( 'List active routes', () => {
          const router = routeEmitter().setAddresses(addressList)
          const list = router.listActiveRoutes()
          expect(list).toBeInstanceOf(Array)
          expect(list).toHaveLength(3)
          expect(list[0]).toBe('home ---> /index.html')
          router.destroy()
    }) // it List active routes



  it ( 'Current address', () => {
          const router = routeEmitter().setAddresses(addressList)
          router.run()
          router.navigate('about', { name: 'John' })
          const [name, data] = router.getCurrentAddress()
          expect(name).toBe('about')
          expect(data).toHaveProperty('name')
          expect(data.name).toBe('John')
          router.navigate('home')
          router.destroy()
    })



  it ( 'Insert only non existing addresses', () => {
          const router = routeEmitter().setAddresses(addressList)
          const updateList = [
            { name: 'login', path: '/loginUpdated', title: 'App Login', inHistory: true },
            { name: 'middle', path: '/middle', title: 'Middle' }
          ]
          router.onError(({ code, message }) => {
            console.log(code, message)
          })
          router.run()
          router.setAddresses(updateList, router.listAciveAddresses())
          const list = router.listActiveRoutes()
          expect(list).toContain('login ---> /login')
          router.navigate('middle')
          expect(window.location.pathname).toBe('/middle')
          router.navigate('home')
          router.destroy()
    }) // it Insert only non existing addresses



  it ( 'Create URL', () => {
          const router = routeEmitter().setAddresses(addressList)
          expect(router.createURL('about', { name: 'Peter' })).toBe('/about/Peter')
          expect(router.createURL('login')).toBe('/login')
          expect(router.createURL('wrong')).toBe(null)
          expect(router.createURL('about')).toBe(null)
          router.destroy()
    }) // it Create URL

}) // describe


