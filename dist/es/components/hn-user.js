import{$bundled$$$$$$$node_modules$$polymer$polymer$polymer$element}from'./hn-app.js';const{Element:Element}=$bundled$$$$$$$node_modules$$polymer$polymer$polymer$element;import{$bundled$$$$$$$node_modules$$polymer$polymer$lib$elements$dom$if}from'./hn-app.js';import{$bundled$$$$reducers$users}from'./hn-app.js';const{currentUserSelector:currentUserSelector}=$bundled$$$$reducers$users,users=$bundled$$$$reducers$users;import{$bundled$$$$store}from'./hn-app.js';const{store:store}=$bundled$$$$store;import{$bundled$$$$actions$users}from'./hn-app.js';const{fetchUser:fetchUser,fetchUserIfNeeded:fetchUserIfNeeded}=$bundled$$$$actions$users;import{$bundled$$$$$$$lib$connect$mixin}from'./hn-app.js';const{connect:connect}=$bundled$$$$$$$lib$connect$mixin;import{$bundled$shared$styles}from'./hn-app.js';const{sharedStyles:sharedStyles}=$bundled$shared$styles;store.addReducers({users:users.default});class HnUserElement extends connect(store)(Element){static get template(){return`
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
    </dom-if>`}static get properties(){return{user:Object}}update(c){const a=currentUserSelector(c);a&&(document.title=a.id,this.setProperties({user:a}))}_reload(){store.dispatch(fetchUser(this.user))}}customElements.define('hn-user',HnUserElement);export{HnUserElement,currentUserSelector,fetchUserIfNeeded};