# polymer-redux-hn

An experimental Hacker News client built from scratch using Polymer and Redux. Using to explore patterns for routing, lazy-loading elements/reducer/actions, and organizing files.

## Setup

* `npm i`
* Serve index.html for all routes (`polymer serve` or similar)

## Routing

Client side routing is done by the src/modules/router.js module, which intercept link clicks and dispatches an action to the store. A subset of `window.location` is stored in the state, and the rest of the app renders based on that state (never on `window.location` directly). `history.pushState` is called as a side-effect of the action creator, meaning that `window.location` won't actually modify when time-travel debugging. `popstate` events (e.g. browser back) dispatches a different action that just updates the location state without side-effects.

## Lazy-loading

Dynamically-loaded elements are loaded as a side-effect by the `updateLocation` action in src/actions/location.js. These elements may export actions and selectors that are asynchronously used by the `updateLocation` action for a particular page.

## File structure

* actions/
* reducers/
  * Like [one of the Redux examples](https://github.com/reactjs/redux/tree/master/examples/real-world/src), actions and reducers are in their own directories
* components/
  * Custom element definitions that are statically or dynamically imported. Dynamically-imported components may also export functions that are used by the `updateLocation` action.
