webpackJsonp([1],{38:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(4),e=c(18),f=c(50),g=c(15),h=c(48),i=c(17),j=c(6);c.d(b,"currentUserSelector",function(){return f.a}),c.d(b,"fetchUserIfNeeded",function(){return h.e}),g.a.addReducers({users:f.b});class k extends Object(i.a)(g.a)(d.a){static get template(){return`
    ${j.a}
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
    </dom-if>`}static get properties(){return{user:Object}}update(a){const b=Object(f.a)(a);b&&(document.title=b.id,this.setProperties({user:b}))}_reload(){g.a.dispatch(Object(h.d)(this.user))}}b.HnUserElement=k,customElements.define("hn-user",k)},48:function(a,b){"use strict";const c="REQUEST_USER";b.c=c;const d="RECEIVE_USER";b.b=d;const e="FAIL_USER";b.a=e;const f=(a)=>(b)=>{b(g(a.id)),fetch(`/api/user/${a.id}`).then((a)=>a.json()).then((c)=>{if(c.error)throw c.error;b(h(a.id,c))}).catch(()=>b(i(a.id)))};b.d=f;b.e=(a)=>(b)=>{!a||a.created_time||a.isFetching||b(f(a))};const g=(a)=>({type:c,userId:a}),h=(a,b)=>({type:d,userId:a,data:b}),i=(a)=>({type:e,userId:a})},50:function(a,b,c){"use strict";var d=c(48),e=c(16),f=c(7),g=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};const h=(a={},b)=>{switch(b.type){case d.c:return g({},a,{id:b.userId,failure:!1,isFetching:!0});case d.b:return g({},a,{failure:!1,isFetching:!1},b.data);case d.a:return g({},a,{failure:!0,isFetching:!1});default:return a;}};b.b=(a={},b)=>{switch(b.type){case d.c:case d.b:case d.a:const c=b.userId;return g({},a,{[c]:h(a[c],b)});default:return a;}};const i=Object(e.a)((a)=>a.users,f.c,f.d,(a,b,c)=>{switch(b[0]){case"user":const d=c.get("id");return a[d]||{id:d};default:return null;}});b.a=i}});