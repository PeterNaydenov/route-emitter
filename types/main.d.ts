export default routeEmitter;
/**
 * *
 */
export type API = {
    /**
     * - Register a callback function for "change" signal
     */
    onChange: (arg0: Function) => API;
    /**
     * - Register a callback function for "refresh" signal
     */
    onReload: (arg0: Function) => API;
    /**
     * - Register a callback function for "error" signal
     */
    onError: (arg0: Function) => API;
    /**
     * - Start the router
     */
    run: () => API;
    /**
     * - Change current address
     */
    navigate: (arg0: string) => API;
    /**
     * - Returns the current address name and data
     */
    getCurrentAddress: () => string;
    /**
     * - Set the address list
     */
    setAddresses: (arg0: Address[]) => API;
    /**
     * - Remove addresses from the list by name
     */
    removeAddresses: (arg0: string[]) => API;
    /**
     * - Returns a list of active addresses names
     */
    listActiveAddresses: () => string;
    /**
     * - Returns a list of active addresses and their paths
     */
    listActiveRoutes: () => any;
    /**
     * - Destroy the router
     */
    destroy: () => API;
};
export type Address = {
    /**
     * - The name of the route.
     */
    name: string;
    /**
     * - The path of the route.
     */
    path: string;
    /**
     * - A function that returns the title of the route.
     */
    title?: Function;
    /**
     * - Indicates if the route should be in history.
     */
    inHistory?: boolean;
    /**
     * - The name of the route to redirect to.
     */
    redirect?: string;
};
/**

 */
/***
 *
 * @typedef {Object} API
 * @property {function(function):API} onChange - Register a callback function for "change" signal
 * @property {function(function):API} onReload - Register a callback function for "refresh" signal
 * @property {function(function):API} onError - Register a callback function for "error" signal
 * @property {function():API} run - Start the router
 * @property {function(string):API} navigate - Change current address
 * @property {function():string} getCurrentAddress - Returns the current address name and data
 * @property {function(Address[]):API} setAddresses - Set the address list
 * @property {function(string[]):API} removeAddresses - Remove addresses from the list by name
 * @property {function():string} listActiveAddresses - Returns a list of active addresses names
 * @property {function():Object} listActiveRoutes - Returns a list of active addresses and their paths
 * @property {function():API} destroy - Destroy the router
 */
/**
 * @typedef {Object} Address
 * @property {string} name - The name of the route.
 * @property {string} path - The path of the route.
 * @property {function} [title] - A function that returns the title of the route.
 * @property {boolean} [inHistory=true] - Indicates if the route should be in history.
 * @property {string} [redirect] - The name of the route to redirect to.
 */
/**
 * Initializes and returns a route emitter instance.
 *
 * This function sets up a router with the provided configuration,
 * allowing for URL pattern matching, state management, and event
 * handling for route changes, errors, and reloads.
 *
 * @param {Object} config - Configuration options for the route emitter.
 * @param {string} [config.appName='App Name'] - Name used as a title for addresses without a title property.
 * @param {string} [config.sessionStorageKey='_routeEmmiterLastLocation'] - Key used to store the last route in sessionStorage.
 *
 * @returns {API}
 * navigation, and state management.
 */
declare function routeEmitter(config: {
    appName?: string;
    sessionStorageKey?: string;
}): API;
//# sourceMappingURL=main.d.ts.map