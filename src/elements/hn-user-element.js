import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import { currentUserSelector } from '../reducers/users.js';
import { store } from '../modules/store.js';
import '../modules/users.js';
import { fetchUser, fetchUserIfNeeded } from '../actions/users.js';

export class HnUserElement extends PolymerElement {
  static get template() {
    return `
    <h1>User View</h1>
    <button on-click="_reload">Reload</button>
    <table>
      <tr>
        <td>User:</td><td>[[user.id]]</td>
      </tr>
      <tr>
        <td>Created:</td><td>[[user.created]]</td>
      </tr>
      <tr>
        <td>Karma:</td><td>[[user.karma]]</td>
      </tr>
    </table>`;
  }
  
  static get properties() {
    return {
      user: Object
    }
  }
  
  constructor() {
    super();
    store.subscribe(() => this.update());
    this.update();
  }

  update() {
    const state = store.getState();
    const user = currentUserSelector(state);
    if (user) {
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
