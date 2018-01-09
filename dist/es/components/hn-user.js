import{$bundled$$$$$$$node_modules$$polymer$polymer$polymer$element}from'./hn-app.js';const{Element:Element}=$bundled$$$$$$$node_modules$$polymer$polymer$polymer$element;import{$bundled$$$$$$$node_modules$$polymer$polymer$lib$elements$dom$if}from'./hn-app.js';import{$bundled$$$$$$$node_modules$reselect$src$index}from'./hn-app.js';const{createSelector:createSelector}=$bundled$$$$$$$node_modules$reselect$src$index;import{$bundled$$$$reducers$location}from'./hn-app.js';const{splitPathnameSelector:splitPathnameSelector,urlSearchParamsSelector:urlSearchParamsSelector}=$bundled$$$$reducers$location;import{$bundled$$$$store}from'./hn-app.js';const{store:store}=$bundled$$$$store;import{$bundled$$$$$$$lib$connect$mixin}from'./hn-app.js';const{connect:connect}=$bundled$$$$$$$lib$connect$mixin;import{$bundled$shared$styles}from'./hn-app.js';const{sharedStyles:sharedStyles}=$bundled$shared$styles,REQUEST_USER='REQUEST_USER',RECEIVE_USER='RECEIVE_USER',FAIL_USER='FAIL_USER',fetchUser=(d)=>(a)=>{a(requestUser(d.id)),fetch(`/api/user/${d.id}`).then((b)=>b.json()).then((b)=>{if(b.error)throw b.error;a(receiveUser(d.id,b))}).catch(()=>a(failUser(d.id)))},fetchUserIfNeeded=(c)=>(d)=>{!c||c.created_time||c.isFetching||d(fetchUser(c))},requestUser=(b)=>({type:REQUEST_USER,userId:b}),receiveUser=(c,d)=>({type:RECEIVE_USER,userId:c,data:d}),failUser=(b)=>({type:FAIL_USER,userId:b});var _extends=Object.assign||function(e){for(var a,b=1;b<arguments.length;b++)for(var c in a=arguments[b],a)Object.prototype.hasOwnProperty.call(a,c)&&(e[c]=a[c]);return e};const users=(d={},a)=>{switch(a.type){case REQUEST_USER:case RECEIVE_USER:case FAIL_USER:const b=a.userId;return _extends({},d,{[b]:user(d[b],a)});default:return d;}},user=(c={},a)=>{switch(a.type){case REQUEST_USER:return _extends({},c,{id:a.userId,failure:!1,isFetching:!0});case RECEIVE_USER:return _extends({},c,{failure:!1,isFetching:!1},a.data);case FAIL_USER:return _extends({},c,{failure:!0,isFetching:!1});default:return c;}},usersSelector=(b)=>b.users,currentUserSelector=createSelector(usersSelector,splitPathnameSelector,urlSearchParamsSelector,(e,a,b)=>{switch(a[0]){case'user':const c=b.get('id');return e[c]||{id:c};default:return null;}});store.addReducers({users});class HnUserElement extends connect(store)(Element){static get template(){return`
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