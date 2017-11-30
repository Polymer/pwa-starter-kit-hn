# polymer-redux-hn

An experimental Hacker News client built from scratch using Polymer and Redux. Using to explore patterns for routing, lazy-loading elements/reducer/actions, and organizing files.

## Setup

* `npm i`
* Serve index.html for all routes (`polymer serve` or similar)

## Routing

Client side routing is done by the src/js/router.js script, which intercept link clicks and dispatches an action to the store. A subset of `window.location` is stored in the state, and the rest of the app renders based on that state (never on `window.location` directly). `history.pushState` is called as a side-effect of the action creator, meaning that `window.location` won't actually modify when time-travel debugging. `popstate` events (e.g. browser back) dispatches a different action that just updates the location state without side-effects.

## Lazy-loading

Source files are grouped by fragments. The main.js fragment is loaded by index.html while other fragments are loaded as a side-effect by the `updateLocation` action in src/actions/location.js.

NOTE: The src/js/metadata.js script also dynamically imports selectors from these fragments - metadata (e.g. `document.title`) should be updated from the store, but not all selectors are loaded for all pages. Maybe there's a better way...

* main.js
  * `location` reducer and related actions
  * router.js script
  * metadata.js script
  * `hn-app-element`
* list.js
  * `lists` reducer and related actions
  * `items` reducer and related actions
  * `hn-list-element`
  * `hn-summary-element`
* item.js
  * `items` reducer and related actions
  * `hn-item-element`
  * `hn-summary-element`
  * `hn-comment-element`
* user.js
  * `users` reducer and related actions
  * `hn-user-element`

## File structure

* actions/
* reducers/
  * Like [one of the Redux examples](https://github.com/reactjs/redux/tree/master/examples/real-world/src), actions and reducers are in their own directories
* elements/
  * Custom element definitions
* fragments/
  * Lazy-loaded imports - see "Lazy-loading" above
* js/
  * Document-level scripts that don't belong in an element. Could be directly in fragments/main.js instead.
* store.js
  * Single file since it's imported by several fragments/elements/scripts. 
