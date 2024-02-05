 # Route-emitter (@peter.naydenov/route-emitter)

![version](https://img.shields.io/github/package-json/v/peterNaydenov/route-emitter)
![license](https://img.shields.io/github/license/peterNaydenov/route-emitter)
![GitHub issues](https://img.shields.io/github/issues-raw/peterNaydenov/route-emitter)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/%40peter.naydenov%2Froute-emitter)



Provide an list of "**application addresses**"(in brief: *'address list'*) and `route-emitter` can take control over change of the URL, page titles and browser history records.


## What route-emitter can do?
- Every external change of the URL will be measured against the **address list**. Router will generate one of the 3 possible signals(`change`,`refresh`,`error`) and will execute a callback function if any provided;
- Router can change the URL by calling the method `navigate` with the `address name` and data. `route-emitter` will generate and change the URL, will change page title and will set a browser history record if needed.
- Update your `address list` at any time. Router will start using the new list immediately;



## Important Notes
- Calling method `navigate` will **NOT** generate signal to `change`(prevents infinite loop);
- Router don't have any route logic build in. Everything is programmable from outside;
- If url is not recognized, router will signal an `error`;
- Signal `reload` means that requested url is the same as the current url;
- Calling navigate with address and wrong set of data will generate signal `error`;



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

// Address can be a redirect address. Then possible fields are:
const redirectAddress = {
               name: 'about'                 // required
             , path: '/about/:name'          // required
             , redirect: 'home'              // required
             , data: { name: 'Peter' }       // optional
        }
// redirect: string. Name of the address to be redirected. Address should be in the address list;
// data: object. Data to be passed to the redirected address;
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

Router has 2 configuration options:
- appName : string. Used as page title if address don't have title. Default value: 'App title';
- sessionStorageKey : string. Used to store in sessionStorage the last route. Default value: '_routeEmmiterLastLocation';

Configuration if needed could be provided to routeEmmiter during initialization:     
```js
const config = { appName: 'My App', sessionStorageKey: 'myAppLastLocation' }
const router = routeEmmiter ( config )
```

Before `run` the router provide at least one address - current address. On `run` the router will start evaluating the URL against the address list. If URL is not recognized, the router will signal an `error`. If URL is recognized, the router will signal `change` and will execute the callback function if any provided.

```js
// create the router instance:
const router = routeEmmiter ()
// set application title & addresses:
router.setAddresses ( addressList )
// listen for 'error' signal 
router.onError (({code, message}) => console.log ( code, message )   )
router.onChange ((name, data) => console.log ( `Address "${name}" was loaded successfully`)   )
// run the router
router.run ()
// -> Address "home" was loaded successfully
```



## Route-emitter Methods
```js
// Router Methods
   setAddresses        : 'Set the address list'
 , removeAddresses     : 'Remove addresses from the list by name'
 , getCurrentAddress   : 'Returns the current address name and data'
 , navigate            : 'Change current address. Will not generate "change" signal'
 , createURL           : 'Create URL from address name and data (In version 2.1.0 and above)'

 , onChange  : 'Register a callback function for "change" signal'
 , onRefresh : 'Register a callback function for "refresh" signal'
 , onError   : 'Register a callback function for "error" signal'

 , run : 'Start the router'

 , listActiveAddresses : 'Returns a list of active addresses names'
 , listActiveRoutes    : 'Returns a list of active addresses and their paths. (Mostly used for debugging)'
 , destroy             : 'Destroy the router'
```



## External Links
- [Changelog](https://github.com/PeterNaydenov/route-emitter/blob/master/Changelog.md)
- [Migration guide](https://github.com/PeterNaydenov/route-emitter/blob/master/Migration.guide.md)
- [Documentation v.1.x.x](https://github.com/PeterNaydenov/route-emitter/blob/master/README_v.1.x.x.md)



## Credits
'@peter.naydenov/route-emitter' was created and supported by Peter Naydenov.



## License
'@peter.naydenov/router-emitter' is released under the MIT License.


