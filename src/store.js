/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import createStore from '../node_modules/@0xcda7a/redux-es6/src/createStore.js';
import applyMiddleware from '../node_modules/@0xcda7a/redux-es6/src/applyMiddleware.js';
import origCompose from '../node_modules/@0xcda7a/redux-es6/src/compose.js';
import combineReducers from '../node_modules/@0xcda7a/redux-es6/src/combineReducers.js';
import thunk from '../node_modules/redux-thunk/src/index.js';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

function lazyReducerEnhancer(nextCreator) {
  return (origReducer, preloadedState) => {
    let lazyReducers = {};
    const nextStore = nextCreator(origReducer, preloadedState);
    return {
      ...nextStore,
      addReducers(newReducers) {
        this.replaceReducer(combineReducers(lazyReducers = {
          ...lazyReducers,
          ...newReducers
        }));
      }
    }
  }
}

export const store = createStore(
  (state, action) => state,
  compose(lazyReducerEnhancer, applyMiddleware(thunk))
);
