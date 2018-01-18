/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

export const connect = (store) => (baseElement) => class extends baseElement {
  constructor() {
    super();
    store.subscribe(() => this.update(store.getState()));
    this.update(store.getState());
  }

  update(state) {
    console.warn('update() not implemented', this);
  }
};
