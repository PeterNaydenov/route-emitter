 # Route-emitter (@peter.naydenov/route-emitter)

Tool for building a **micro-frontend(MFE)**. Library `route-emitter` is based on [**react-router**](https://reactrouter.com/en/main) but is not a **'react' platform** dependant. Route change will trigger an event and will execute a callback function if it is defined.

```js 
 let router = routeEmitter ([
                                  { path: '/about/:name', event: 'info' }
                                , { path: 'contact/:name', event: 'showContactInformation' }
                        ])
router.on ( 'info', props => { // Callback definition. Executes on path: '/about/:name'
                        console.log ( `Info about ${props.name}`)
                })
router.on ( 'showContactInformation' , props => { // Callback definition. executes on path: 'contact/:name'
                        console.log ( `Here is the contact information of ${props.name}` )
                })
router.navigate ( '/about/Peter' )
// console --> Info about Peter
router.navigate ( '/contact/Ivan' )
// console --> Here is the contact information of Ivan
```

## Instalation
Install for node.js projects by writing in your terminal:

```
npm install @peter.naydenov/route-emitter
```

Once it has been installed, it can be used by writing this line in JavaScript project:

```js
const routeEmitter = require ( '@peter.naydenov/route-emitter' )
```

or

```js
import routeEmitter from '@peter.naydenov/route-emitter'
```



## Route-emitter Methods
```js
// Router Methods
   on    : 'Register a callback function for event'
 , once  : 'Register a single execution callback for event'
 , off   : 'Removes event from subscribtion'
 , stop  : 'Ignore event for a while'
 , start : 'Reactivate ignored event'
 , setRoutes    : 'Will overwrite existing and will add the new paths to the routing table'
 , addRoutes    : 'Add a new routes to existing routes. Already defined paths whould be ignored'
 , updateRoutes : 'Change only existing paths. Will not add routes with new path'
 , removeRoutes : 'Exclude routes with specific paths'
 , getActiveRoutes : 'Returns a list of active route paths'
 , navigate  : 'Change location. Works as react-router navigate'
 , destroy   : 'Destroy the router'
```



## Credits
'@peter.naydenov/route-emitter' was created and supported by Peter Naydenov.

## License
'@peter.naydenov/router-emitter' is released under the MIT License.


