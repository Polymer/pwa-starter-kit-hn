import '../js/items.js';
import { HnItemElement } from '../elements/hn-item-element.js';

// Define element only after adding the reducers it needs
customElements.define('hn-item', HnItemElement);

export { currentItemSelector } from '../reducers/items.js';
export { fetchItem } from '../actions/items.js';
