 # Route-emitter (@peter.naydenov/route-emitter)

![version](https://img.shields.io/github/package-json/v/peterNaydenov/route-emitter)
![license](https://img.shields.io/github/license/peterNaydenov/route-emitter)



Provide an list of "**application addresses**"(in brief: *'address list'*) and `route-emitter` can take control over change of the URL, page titles and browser history records. 


## What route-emitter can do?
- Router emits event on each external change of the URL. Event names are `_CHANGE`, `_REFRESH`, and `_ERROR`;
- On changing url, `route-emitter` will trigger an event `_CHANGE` with the name of the address and object with collected parameters;
- Application can change the URL by calling the router `navigate` method with `address name` and data. `route-emitter` will generate and change the URL, will change page title and will set a browser history record if needed. 
- Calling method `navigate` will **NOT** trigger the event `_CHANGE`(prevents infinite loop);
- Router don't have any route logic build in. Everything is programmable from outside;
- If url is not recognized, router will send event `_ERROR` with the url to the application logic;
- Event `_REFRESH` means that requested url is the same as the current url. As the event `_CHANGE`, will deliver the name of the address and collected parameters;
- Calling navigate with address and wrong set of data will trigger event `_ERROR` with the name of the address and collected parameters;



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

Router is coming with a default configuration. What is coming with the default configuration?
- Single addresses: `home`(path: '/');
- Application title is set to 'App title';
- Default address is set to 'home';

Before `run` the router, make sure that you have set a list of `application addresses`, and the application title. '**App title**' is used only if some of addresses don't have title. Make sure also to listen for system event '_ERROR'. Router will not do anything without your command.



```js
// create the router instance:
const router = routeEmmiter ()
// set application title & addresses:
router.setConfig({ appTitle: 'My App'}).setAddresses ( addressList )
// listen for system event '_ERROR'
router.on ( '_ERROR', (name, data) => console.log ( `Error: ${data}`)   )
// run the router
router.run ()
```

- If URL is not recognized, the router will navigate to 'home';
- Error address is set to 'error';
To 'run' the router, you need to set a list of addresses and configuration options. Here is the list
- Expected at least two addresses - home and error.
- Expected one of the addresses to contain path '/'. 


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
   run : 'Start the router'
 , setConfig : 'Set some configuration options' 
 , on    : 'Register a callback function for event'
 , once  : 'Register a single execution callback for event'
 , off   : 'Removes event from subscribtion'
 , stop  : 'Ignore event for a while'
 , start : 'Reactivate ignored event'
 , debug : 'Returns a console message on each triggered event'
 , setAddresses  : 'Will remove existing and will set the new addresses'
 , addRoutes     : 'Add a new routes to existing routes. Already defined paths whould be ignored'
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


