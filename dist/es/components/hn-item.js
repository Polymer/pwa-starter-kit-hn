import{$bundled$$$$$$$node_modules$$polymer$polymer$polymer$element}from'./hn-app.js';const{Element:Element}=$bundled$$$$$$$node_modules$$polymer$polymer$polymer$element;import{$bundled$$$$$$$node_modules$$polymer$polymer$lib$elements$dom$if}from'./hn-app.js';import{$bundled$$$$$$$node_modules$$polymer$polymer$lib$elements$dom$repeat}from'./hn-app.js';import{$bundled$$$$reducers$items}from'./hn-app.js';const{currentItemSelector:currentItemSelector}=$bundled$$$$reducers$items,items=$bundled$$$$reducers$items;import{$bundled$$$$reducers$favorites}from'./hn-app.js';const favorites=$bundled$$$$reducers$favorites;import{$bundled$$$$store}from'./hn-app.js';const{store:store}=$bundled$$$$store;import{$bundled$hn$summary}from'./hn-app.js';import{$bundled$hn$comment}from'./hn-app.js';import{$bundled$$$$actions$items}from'./hn-app.js';const{fetchItem:fetchItem,fetchItemIfNeeded:fetchItemIfNeeded}=$bundled$$$$actions$items;import{$bundled$$$$actions$favorites}from'./hn-app.js';const{loadFavorites:loadFavorites}=$bundled$$$$actions$favorites;import{$bundled$$$$$$$lib$connect$mixin}from'./hn-app.js';const{connect:connect}=$bundled$$$$$$$lib$connect$mixin;import{$bundled$shared$styles}from'./hn-app.js';const{sharedStyles:sharedStyles}=$bundled$shared$styles;store.addReducers({favorites:favorites.default,items:items.default}),store.dispatch(loadFavorites());class HnItemElement extends connect(store)(Element){static get template(){return`
    ${sharedStyles}
    <button on-click="_reload">Reload</button>
    <div hidden$="[[item.failure]]">
      <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
      <div hidden$="[[!item.content]]" inner-h-t-m-l="[[item.content]]"></div>
      <dom-repeat items="[[item.comments]]" as="comment">
        <template>
          <hn-comment id$="[[comment.id]]" comment="[[comment]]" item-id="[[item.id]]"></hn-comment>
        </template>
      </dom-repeat>
    </div>
    <dom-if if="[[item.failure]]">
      <template>
        <p>Item not found</p>
      </template>
    </dom-if>`}static get properties(){return{item:Object}}update(c){const a=currentItemSelector(c);a&&(document.title=a.title,this.setProperties({favorites:c.favorites,item:a}))}_isFavorite(c,a){return!!(c&&a&&c[a.id])}_reload(){store.dispatch(fetchItem(this.item))}}customElements.define('hn-item',HnItemElement);export{HnItemElement,currentItemSelector,fetchItemIfNeeded};