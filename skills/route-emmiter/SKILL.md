---
name: route-emmiter
description: Integrate @peter.naydenov/route-emitter into browser applications. Use for named routes, URL patterns, navigation, page titles, history, redirects, and debugging integration behavior with this library. Exclude server-side routing and changes to the library implementation.
---

# Route emitter

Use the default-exported `routeEmitter()` factory for browser routing. This guide
covers v2.2.18 and assumes browser history, document, and sessionStorage APIs.
Keep the user's framework and rendering logic; the library manages addresses,
URLs, titles, and signals, while the application renders views.

## Essential contract

- Register addresses and callbacks before calling `run()` once. Include a route
  matching the application's initial pathname.
- `onChange` and `onReload` receive `(name, data, url)`. Handle both for startup:
  a matching saved session location produces `reload` instead of `change`.
- `navigate(name, data)` requires an active router and emits neither signal.
  Update the view explicitly after successful programmatic navigation.
- Address matching is first-match-wins. Put specific paths before overlapping
  parameter routes and catch-all patterns. Use unique address names.
- `inHistory` defaults to `false`. The address **being left** controls whether
  programmatic navigation pushes a history entry or replaces the current one.
- Route matching reads `window.location.pathname`. Ordinary links are not
  intercepted; hash changes and direct `pushState` calls do not trigger routing.
- Errors use `onError(({ code, message }) => ...)`: `404` for missing addresses
  and `400` for invalid navigation data. `navigate()` has no success return value.

## Minimal integration

Install `@peter.naydenov/route-emitter` with the project's package manager when
needed. Use ESM by default; do not assume a named factory export or singleton.

```js
import routeEmitter from '@peter.naydenov/route-emitter'

const router = routeEmitter({ appName: 'My App' })
router.setAddresses([
  { name: 'home', path: '/', inHistory: true },
  { name: 'newUser', path: '/users/new', inHistory: true },
  {
    name: 'profile', path: '/users/:id', inHistory: true,
    title: ({ id }) => `User ${id}`,
  },
])

function renderRoute(name, data, url) {
  // Replace this with the application's view rendering.
  console.log(name, data, url)
}

let navigationFailed = false
router.onChange(renderRoute)
router.onReload(renderRoute)
router.onError(({ code, message }) => {
  navigationFailed = true
  console.warn(code, message)
})
router.run()

// Use for application actions; redirect targets render by their resolved name.
function goTo(name, data = {}) {
  navigationFailed = false
  router.navigate(name, data)
  if (navigationFailed) return
  const [resolvedName, resolvedData] = router.getCurrentAddress()
  renderRoute(resolvedName, resolvedData, window.location.pathname)
}

goTo('profile', { id: '42' })
```

This example registers `/` as its startup route. Adapt that path to the host
application. Keep `goTo` after activation; an inactive router only logs an error.
The wrapper's failure flag relies on synchronous error callbacks and guards view
rendering; it does not roll back router state if a title function or browser
history write fails. It deliberately renders again for same-URL actions even
though `navigate()` itself is a no-op.

## Additional tasks

Read [references/api.md](references/api.md) for method return values, configuration,
optional and wildcard patterns, redirect data, dynamic registration, lifecycle,
and troubleshooting. Do not invent route guards, query parsers, link interception,
or framework routing APIs. Use the application's facilities when needed.

## Verify against the target version

Prefer the installed version's source and observable behavior when documentation
or generated types disagree. In v2.2.18 the public method is spelled
`listAciveAddresses()`, not `listActiveAddresses()`, and the callback method is
`onReload()`, not the README's `onRefresh()`.

Repository links below are relative to this skill folder. They are optional for
using this guide; if the skill is copied elsewhere, inspect the installed package
instead. Recheck version-specific details for versions other than v2.2.18.

- [Factory](../../src/main.js) and [method exports](../../src/methods/index.js): actual public API.
- [Navigation](../../src/methods/navigate.js), [startup](../../src/methods/_locationChange.js),
  and [history](../../src/historyController.js): signals and browser behavior.
- [README](../../README.md) and [tests](../../test/01_test.test.js): usage context.

The skill uses standard YAML frontmatter and Markdown with no agent-specific tools.
Load it through the agent's skill discovery mechanism or read `SKILL.md` directly.
