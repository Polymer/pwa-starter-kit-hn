import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import '../../node_modules/@polymer/polymer/lib/elements/dom-if.js';
import users, { currentUserSelector } from '../reducers/users.js';
import { store } from '../store.js';
import { fetchUser, fetchUserIfNeeded } from '../actions/users.js';
import { connect } from '../../lib/connect-mixin.js';
import { sharedStyles } from './shared-styles.js';

store.addReducers({
  users,
});

export class HnUserElement extends connect(store)(PolymerElement) {
  static get template() {
    return `
    ${sharedStyles}
    <style>
      table {
        margin: 1em 0;
      }
    </style>
    <button on-click="_reload">Reload</button>
    <table hidden$="[[user.failure]]">
      <tr>
        <td>User:</td><td>[[user.id]]</td>
      </tr>
      <tr>
        <td>Created:</td><td>[[user.created]]</td>
      </tr>
      <tr>
        <td>Karma:</td><td>[[user.karma]]</td>
      </tr>
    </table>
    <dom-if if="[[user.failure]]">
      <template>
        <p>User not found</p>
      </template>
    </dom-if>`;
  }
  
  static get properties() {
    return {
      user: Object
    }
  }

  update(state) {
    const user = currentUserSelector(state);
    if (user) {
      document.title = user.id;
      this.setProperties({
        user
      });
    }
  }
  
  _reload() {
    store.dispatch(fetchUser(this.user));
  }
}

customElements.define('hn-user', HnUserElement);

export { currentUserSelector, fetchUserIfNeeded };
