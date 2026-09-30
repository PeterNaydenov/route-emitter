# API reference and integration notes

Verified against route-emitter v2.2.18. Public spelling and runtime behavior take
precedence over stale README entries or generated TypeScript declarations.

## Factory and addresses

`routeEmitter(config?)` creates an instance. Configuration strings:

| Option | Default | Purpose |
| --- | --- | --- |
| `appName` | `'App Name'` | Title when an address has no title |
| `sessionStorageKey` | `'_routeEmmiterLastLocation'` | Saved pathname; preserve the spelling |

An address requires `name` and `path`. Optional fields:

| Field | Meaning |
| --- | --- |
| `title` | String or `(data) => string`; keep title functions free of exceptions |
| `inHistory` | Boolean, default `false`; preserve this address when navigating away |
| `redirect` | Name of another registered address |
| `data` | Parameters supplied to the redirect target |

## Methods

| Method | Result and behavior |
| --- | --- |
| `setAddresses(list, cancelList = [])` | Returns router; appends records except names in cancel list |
| `removeAddresses(names)` | Returns router; accepts an array of name strings |
| `onChange(fn)`, `onReload(fn)`, `onError(fn)` | Return router; register callbacks |
| `run()` | Returns `undefined`; activates listening and resolves current pathname |
| `navigate(name, data = {})` | Returns `undefined`; writes URL/title/history without change or reload signals |
| `createURL(name, data = {})` | URL string; `null` plus console error for unknown name or missing data; works before activation |
| `getCurrentAddress()` | `[name, parsedData]`; use only after a route resolves and while its definition still exists |
| `listAciveAddresses()` | Name array; this misspelling is the exported API in v2.2.18 |
| `listActiveRoutes()` | String array with entries such as `'home ---> /'` |
| `back(steps = 1)`, `forward(steps = 1)` | Promises for history traversal; see limitations below |
| `destroy()` | Returns `undefined`; removes listeners and the configured sessionStorage entry |

Only methods returning the router can be chained. Do not write
`router.run().navigate(...)` or assume navigation is awaitable.

## Patterns

Patterns use `@peter.naydenov/url-pattern`, not another router's syntax:

| Path | Example URL | Parsed data |
| --- | --- | --- |
| `/users/:id` | `/users/42` | `{ id: '42' }` |
| `/users(/:id)` | `/users` | `{}` |
| `/users(/:id)` | `/users/42` | `{ id: '42' }` |
| `/files/*` | `/files/a/b` | `{ _: 'a/b' }` |

`router.createURL('profile', { id: '42' })` generates `/users/42` for
`/users/:id`. For wildcard generation, supply `{ _: 'a/b' }`. Optional groups use
parentheses; do not substitute `:id?`. Query and hash values are not included in
pathname matching. Parse them separately with browser URL APIs when requested.
Verify encoding and more complex patterns against the installed dependency.

## Redirects and registration

A redirect record such as
`{ name: 'login', path: '/login', redirect: 'profile', data: { id: '42' } }`
uses its own fixed `data`; it does not automatically forward matched parameters
or the data passed to `navigate('login', ...)`. Startup redirects update the URL
without a target `change` or `reload` signal. Render the resolved address explicitly
when initial redirects are used. Avoid redirect cycles.

Registration is additive. Reusing a name appends another match candidate while
replacing that name's navigation lookup; it is not a clean update. To replace a
record, remove its name first and register the replacement. Appending changes its
matching position, so rebuild the affected list if order matters. Neither removal
nor registration automatically re-resolves the current pathname. Avoid removing
the current address before navigating to a retained one.

## History and lifecycle

- On a normal startup match, `run()` pushes a history record even when the address
  has `inHistory: false`. Later programmatic navigation consults the address being
  left. With no previous address it replaces the current record.
- History callbacks receive router-managed `event.state` fields `PGID`, `url`,
  and `data`; null or foreign state is not handled defensively. Check the host
  application's history integration when traversal fails.
- `forward(steps)` uses `history.go(steps)`. `back(steps)` passes the argument to
  native `history.back()`, which does not support multiple steps. Do not promise
  multi-step backward traversal. Traversal promises time out after about 1.5 seconds.
- Destroy the router when its owner unmounts. Discard the old instance; do not
  assume every old method reference has been disabled. Create a fresh instance
  for a new lifecycle. Simultaneous routers share browser history and, by default,
  a storage key; do not assume they are isolated.

## Troubleshooting

| Symptom | Check or action |
| --- | --- |
| Initial view stays blank | Register callbacks before `run()` and handle both change and reload; account for startup redirects |
| View stays stale after `navigate` | Invoke rendering explicitly after navigation succeeds |
| Unexpected route wins | Put specific paths before parameter paths and catch-all patterns |
| Back button skips a page | Check `inHistory` on the address being left |
| `404` signal | Check startup pathname and registered navigation name |
| `400` signal | Check required parameter keys; inspect message and any title/history errors |
| Getter throws | Ensure a route has resolved and its definition has not been removed |
| Helper method is missing | Check actual exports, especially `listAciveAddresses` and `onReload` |

When verifying an integration, exercise its startup path, a programmatic action,
and relevant errors. Use real browser history for back/forward checks; a URL
update alone does not prove a change callback fired.
