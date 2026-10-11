export type AddressHandler = (addressName: string, data: Record<string, any>, url: string) => void;
export type RouterError = {
    /**
     * - 404 for an unknown address or path, 400 for wrong address data
     */
    code: number;
    /**
     * - Error description
     */
    message: string;
};
export type ErrorHandler = (error: RouterError) => void;
export type API = {
    /**
     * - Register a callback function for "change" signal
     */
    onChange: (fn: AddressHandler) => API;
    /**
     * - Register a callback function for "reload" signal
     */
    onReload: (fn: AddressHandler) => API;
    /**
     * - Register a callback function for "error" signal
     */
    onError: (fn: ErrorHandler) => API;
    /**
     * - Go back in history. Resolves with the address name or 'expire'
     */
    back: (steps?: number) => Promise<string>;
    /**
     * - Go forward in history. Resolves with the address name or 'expire'
     */
    forward: (steps?: number) => Promise<string>;
    /**
     * - Start the router
     */
    run: () => void;
    /**
     * - Change current address
     */
    navigate: (addressName: string, data?: Record<string, any>) => void;
    /**
     * - Create URL from address name and data
     */
    createURL: (addressName: string, data?: Record<string, any>) => (string | null);
    /**
     * - Returns the current address name and data
     */
    getCurrentAddress: () => [(string | null), (Record<string, any> | null)];
    /**
     * - Set the address list
     */
    setAddresses: (list: Address[], cancelList?: string[]) => API;
    /**
     * - Remove addresses from the list by name
     */
    removeAddresses: (removeList: string[]) => API;
    /**
     * - Returns a list of active addresses names
     */
    listActiveAddresses: () => string[];
    /**
     * - Deprecated. Misspelled alias of listActiveAddresses
     */
    listAciveAddresses: () => string[];
    /**
     * - Returns a list of active addresses and their paths
     */
    listActiveRoutes: () => string[];
    /**
     * - Destroy the router
     */
    destroy: () => void;
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
     * - The title of the route, or a function that returns it.
     */
    title?: string | ((data: Record<string, any>) => string);
    /**
     * - Indicates if the route should be in history.
     */
    inHistory?: boolean;
    /**
     * - The name of the route to redirect to.
     */
    redirect?: string;
    /**
     * - Data used for the redirect address.
     */
    data?: Record<string, any>;
};
/**
 * @callback AddressHandler
 * @param {string} addressName - Name of the address
 * @param {Record<string, any>} data - Data extracted from the URL
 * @param {string} url - The URL
 * @returns {void}
 */
/**
 * @typedef {Object} RouterError
 * @property {number} code - 404 for an unknown address or path, 400 for wrong address data
 * @property {string} message - Error description
 */
/**
 * @callback ErrorHandler
 * @param {RouterError} error
 * @returns {void}
 */
/**
 * @typedef {Object} API
 * @property {(fn: AddressHandler) => API} onChange - Register a callback function for "change" signal
 * @property {(fn: AddressHandler) => API} onReload - Register a callback function for "reload" signal
 * @property {(fn: ErrorHandler) => API} onError - Register a callback function for "error" signal
 * @property {(steps?: number) => Promise<string>} back - Go back in history. Resolves with the address name or 'expire'
 * @property {(steps?: number) => Promise<string>} forward - Go forward in history. Resolves with the address name or 'expire'
 * @property {() => void} run - Start the router
 * @property {(addressName: string, data?: Record<string, any>) => void} navigate - Change current address
 * @property {(addressName: string, data?: Record<string, any>) => (string|null)} createURL - Create URL from address name and data
 * @property {() => [ (string|null), (Record<string, any>|null) ]} getCurrentAddress - Returns the current address name and data
 * @property {(list: Address[], cancelList?: string[]) => API} setAddresses - Set the address list
 * @property {(removeList: string[]) => API} removeAddresses - Remove addresses from the list by name
 * @property {() => string[]} listActiveAddresses - Returns a list of active addresses names
 * @property {() => string[]} listAciveAddresses - Deprecated. Misspelled alias of listActiveAddresses
 * @property {() => string[]} listActiveRoutes - Returns a list of active addresses and their paths
 * @property {() => void} destroy - Destroy the router
 */
/**
 * @typedef {Object} Address
 * @property {string} name - The name of the route.
 * @property {string} path - The path of the route.
 * @property {string|((data: Record<string, any>) => string)} [title] - The title of the route, or a function that returns it.
 * @property {boolean} [inHistory=false] - Indicates if the route should be in history.
 * @property {string} [redirect] - The name of the route to redirect to.
 * @property {Record<string, any>} [data] - Data used for the redirect address.
 */
/**
 * Initializes and returns a route emitter instance.
 *
 * This function sets up a router with the provided configuration,
 * allowing for URL pattern matching, state management, and event
 * handling for route changes, errors, and reloads.
 *
 * @param {Object} [config] - Configuration options for the route emitter.
 * @param {string} [config.appName='App Name'] - Name used as a title for addresses without a title property.
 * @param {string} [config.sessionStorageKey='_routeEmmiterLastLocation'] - Key used to store the last route in sessionStorage.
 *
 * @returns {API} Router instance with methods for event handling, navigation, and state management.
 */
declare function routeEmitter(config?: {
    appName?: string;
    sessionStorageKey?: string;
}): API;
export default routeEmitter;
//# sourceMappingURL=main.d.ts.map