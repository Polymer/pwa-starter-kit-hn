import { Element as PolymerElement } from '../../node_modules/@polymer/polymer/polymer-element.js';
import users, { currentUserSelector } from '../reducers/users.js';
import { store } from '../store.js';

store.addReducers({
  users,
});

export class HnUserElement extends PolymerElement {
  static get template() {
    return `
    <h1>User View</h1>
    <table>
      <tr>
        <td>User:</td><td>[[user.id]]</td>
      </tr>
      <tr>
        <td>Created:</td><td>[[user.data.created]]</td>
      </tr>
      <tr>
        <td>Karma:</td><td>[[user.data.karma]]</td>
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
    this.setProperties({
      user
    });
  }
}

customElements.define('hn-user', HnUserElement);
