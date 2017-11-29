import '../js/router.js';
import '../js/metadata.js';
import { HnAppElement } from '../elements/hn-app-element.js';

// Define element only after adding the reducers it needs (the location reducer)
customElements.define('hn-app', HnAppElement);
