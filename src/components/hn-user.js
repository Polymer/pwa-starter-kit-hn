import { LitElement, html } from '../../node_modules/@polymer/lit-element/lit-element.js';
import users, { currentUserSelector } from '../reducers/users.js';
import { store } from '../store.js';
import './hn-loading-button.js';
import { fetchUser, fetchUserIfNeeded } from '../actions/users.js';
import { connect } from '../../lib/connect-mixin.js';
import { sharedStyles } from './shared-styles.js';

store.addReducers({
  users,
});

export class HnUserElement extends connect(store)(LitElement) {
  render({ user }) {
    return html`
    <style>${sharedStyles}</style>
    <style>
      table {
        margin: 1em 0;
      }
    </style>
    <hn-loading-button
        loading="${user.isFetching}"
        on-click="${() => store.dispatch(fetchUser(user))}">
    </hn-loading-button>
    <table hidden="${user.failure}">
      <tr>
        <td>User:</td><td>${user.id}</td>
      </tr>
      <tr>
        <td>Created:</td><td>${user.created}</td>
      </tr>
      <tr>
        <td>Karma:</td><td>${user.karma}</td>
      </tr>
    </table>
    ${user.failure ? html`<p>User not found</p>` : ''}
    `;
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
      this.user = user;
    }
  }
}

customElements.define('hn-user', HnUserElement);

export { currentUserSelector, fetchUserIfNeeded };
