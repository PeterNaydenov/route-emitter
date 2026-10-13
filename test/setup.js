import { JSDOM } from 'jsdom'

let currentPath = '/index.html'
let historyStack = [{ path: currentPath, state: { PGID: 'home', url: currentPath, data: {} } }]
let historyIndex = 0

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost/index.html',
  pretendToBeVisual: true
})

dom.window.history._pushState = dom.window.history.pushState.bind(dom.window.history)
dom.window.history._replaceState = dom.window.history.replaceState.bind(dom.window.history)

dom.window.history.pushState = (state, title, url) => {
  if (url) currentPath = url
  historyStack = historyStack.slice(0, historyIndex + 1)
  historyStack.push({ path: currentPath, state })
  historyIndex++
  dom.window.history._pushState(state, title, url)
}

dom.window.history.replaceState = (state, title, url) => {
  if (url) currentPath = url
  historyStack[historyIndex] = { path: currentPath, state }
  dom.window.history._replaceState(state, title, url)
}

// Traversal is asynchronous and fires 'popstate' like in a browser. Out of range steps do nothing.
dom.window.history.go = (delta = 0) => {
  const target = historyIndex + delta
  if (delta === 0 || target < 0 || target >= historyStack.length) return
  historyIndex = target
  currentPath = historyStack[historyIndex].path
  const { state } = historyStack[historyIndex]
  setTimeout(() => dom.window.dispatchEvent(new dom.window.PopStateEvent('popstate', { state })), 0)
}

dom.window.history.back    = () => dom.window.history.go(-1)
dom.window.history.forward = () => dom.window.history.go(1)

const locationProxy = new Proxy(dom.window.location, {
  get(target, prop) {
    if (prop === 'pathname') return currentPath
    if (prop === 'href') return `http://localhost${currentPath}`
    return target[prop]
  },
  set(target, prop, value) {
    if (prop === 'pathname') {
      currentPath = value
      return true
    }
    target[prop] = value
    return true
  }
})

// Vitest 5 exposes some globals (document, navigator, ...) as getter-only, so define instead of assign
const setGlobal = ( name, value ) => Object.defineProperty ( globalThis, name, { value, writable: true, configurable: true })

setGlobal ( 'window', dom.window )
setGlobal ( 'document', dom.window.document )
setGlobal ( 'history', dom.window.history )
setGlobal ( 'location', locationProxy )
setGlobal ( 'navigator', dom.window.navigator )
setGlobal ( 'sessionStorage', dom.window.sessionStorage )

global.historyStack = historyStack