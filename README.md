[![Built with pwa–starter–kit](https://img.shields.io/badge/built_with-pwa–starter–kit_-blue.svg)](https://github.com/Polymer/pwa-starter-kit "Built with pwa–starter–kit")

# polymer-redux-hn

A Hacker News client built using [PWA Starter Kit](https://github.com/PolymerLabs/pwa-starter-kit). Using the starter-template as the starting point and the [wiki](https://github.com/PolymerLabs/pwa-starter-kit/wiki) for configuring and personalizing.

![screenshot](https://user-images.githubusercontent.com/116360/39543436-1302e57c-4e00-11e8-86fb-74cd8ad0466f.png)

## Features/highlights

- Updating the Redux store from an API
- Lazy-load actions, components, and reducers

## Setup

* `npm i`
* `npm start` (or any static file server for single page apps, like `serve -s`)

## Building & Deploying

See the [Building & Deploying](https://github.com/Polymer/pwa-starter-kit/wiki/5.-Building-&-Deploying) section in the pwa-starter-kit wiki.

### HTTP/2 push optimized build

The [push](https://github.com/PolymerLabs/polymer-redux-hn/compare/push) branch contains an optimized version of the static build that uses a proxy for Hacker News API requests so that it can use HTTP/2 server push for the initial API request as well. This is the build currently hosted on https://polymer-redux-hn.appspot.com/.

## Routing

Client side routing is done by the pwa-helpers/router.js library, which intercept link clicks and dispatches the `updateLocation` action to the store. A state computed from the value of `window.location` is stored, and the rest of the app renders based on that state (never on `window.location` directly). `history.pushState` is called by the router library before the action is dispatched, meaning that `window.location` won't actually modify when using time-travel debugging. `popstate` events (e.g. browser back) will just dispatch the `updateLocation` action.

## Lazy-loading

Dynamically-loaded elements are loaded as a side-effect by the `updateLocation` action in src/actions/app.js. These elements may export actions and selectors that are asynchronously used by the `updateLocation` action for a particular page.

## File structure

* actions/
* reducers/
  * Like [one of the Redux examples](https://github.com/reactjs/redux/tree/master/examples/real-world/src), actions and reducers are in their own directories
* components/
  * Custom element definitions that are statically or dynamically imported. Dynamically-imported components may also export functions that are used by the `updateLocation` action.
