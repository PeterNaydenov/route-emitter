 # Route-emitter (@peter.naydenov/route-emitter)

![version](https://img.shields.io/github/package-json/v/peterNaydenov/route-emitter)
![license](https://img.shields.io/github/license/peterNaydenov/route-emitter)



Provide an list of "**application addresses**"(in brief: *'address list'*) and `router-emitter` will control changing of the URL, page titles and browser history records. Router recognizes the `application addresses` and will trigger an event with the name of the address. Calling the router `navigate` method with `address name` and data will generate and change the URL, will change page title and will set a browser history record if needed.

## Application Address Definition

```js
const address = {
               name: 'about'                 // required
             , path: '/about/:name'          // required
             , title: x => `About ${x.name}` // optional
             , inHistory: true               // optional
        }
// path: string. Path to be matched;
// name: string. Name of the address used also for event name;
// title: string|function. Title of the page. ( optional, default value: App title);
// inHistory: boolean. If true, will add record in the browser history. (optional, default value: false);
```


## Instalation
Install for node.js projects by writing in your terminal:

```
npm install @peter.naydenov/route-emitter
```

Once it has been installed, it can be used by writing this line in JavaScript project:

```js
import routeEmitter from '@peter.naydenov/route-emitter'
```


## How to use it

```js 
 let router = routeEmitter ([
                                  { path: '/about/:name', name: 'info' }
                                , { path: 'contact/:name', name: 'showContactInformation' }
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

// Here is a alternative way to listen all events from single callback function
router.on ( '*', (name, data) => {
                switch ( name ) {
                                case 'info':
                                        console.log ( `Info about ${data.name}`)
                                        break
                                case 'showContactInformation':
                                        console.log ( `Here is the contact information of ${data.name}` )
                                        break
                        }
        })
```





## Route-emitter Methods
```js
// Router Methods
   on    : 'Register a callback function for event'
 , once  : 'Register a single execution callback for event'
 , off   : 'Removes event from subscribtion'
 , stop  : 'Ignore event for a while'
 , start : 'Reactivate ignored event'
 , debug : 'Returns a console message on each triggered event'
 , setRoutes    : 'Will overwrite existing and will add the new paths to the routing table'
 , addRoutes    : 'Add a new routes to existing routes. Already defined paths whould be ignored'
 , updateRoutes : 'Change only existing paths. Will not add routes with new path'
 , removeRoutes : 'Exclude routes with specific paths'
 , listActiveRoutes : 'Returns a list of active addresses: address name -> address path'
 , navigate   : 'Change location by calling the route name and passing data'
 , repeat     : 'Emit the last route again'
 , getCurrent : 'Returns last route object'
 , destroy    : 'Destroy the router'
```



## Credits
'@peter.naydenov/route-emitter' was created and supported by Peter Naydenov.

## License
'@peter.naydenov/router-emitter' is released under the MIT License.


