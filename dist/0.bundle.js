webpackJsonp([0],{

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_polymer_polymer_lib_elements_dom_repeat_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_store_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_lists_js__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_items_js__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__hn_summary_element_js__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__actions_lists_js__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "currentListSelector", function() { return __WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "fetchListIfNeeded", function() { return __WEBPACK_IMPORTED_MODULE_7__actions_lists_js__["e"]; });









class HnListElement extends __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__["a" /* Element */] {
  static get template() {
    return `
    <h1>List View</h1>
    <button on-click="_reload">Reload</button>
    <dom-repeat items="[[items]]">
      <template>
        <hn-summary item="[[item]]" is-favorite="[[_isFavorite(favorites, item)]]"></hn-summary>
      </template>
    </dom-repeat>
    `;
  }

  static get properties() {
    return {
      list: Object,

      favorites: Object,

      items: Array
    };
  }

  constructor() {
    super();
    __WEBPACK_IMPORTED_MODULE_3__modules_store_js__["a" /* store */].subscribe(() => this.update());
    this.update();
  }

  update() {
    const state = __WEBPACK_IMPORTED_MODULE_3__modules_store_js__["a" /* store */].getState();
    const list = Object(__WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__["b" /* currentListSelector */])(state);
    const items = Object(__WEBPACK_IMPORTED_MODULE_2__reducers_lists_js__["a" /* currentItemsSelector */])(state);
    if (items) {
      this.setProperties({
        favorites: state.favorites,
        list,
        items
      });
    }
  }

  _isFavorite(favorites, item) {
    return Boolean(favorites && item && favorites[item.id]);
  }

  _reload() {
    __WEBPACK_IMPORTED_MODULE_3__modules_store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_7__actions_lists_js__["d" /* fetchList */])(this.list));
  }
}
/* harmony export (immutable) */ __webpack_exports__["HnListElement"] = HnListElement;


customElements.define('hn-list', HnListElement);



/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const ADD_FAVORITE = 'ADD_FAVORITE';
/* harmony export (immutable) */ __webpack_exports__["a"] = ADD_FAVORITE;

const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
/* harmony export (immutable) */ __webpack_exports__["b"] = REMOVE_FAVORITE;


const dbPromise = window.dbPromise = new Promise((resolve, reject) => {
  const openRequest = window.indexedDB.open('favorites', 5);
  openRequest.onsuccess = event => {
    resolve(event.target.result);
  };
  openRequest.onupgradeneeded = event => {
    event.target.result.createObjectStore('favorites', { keyPath: 'id' });
  };
  openRequest.onerror = error => {
    reject(error);
  };
});

const saveFavorite = item => dispatch => {
  dbPromise.then(db => {
    const transaction = db.transaction(['favorites'], 'readwrite');
    const objectStore = transaction.objectStore('favorites');
    const objectStoreRequest = objectStore.add({
      comments_count: item.comments_count,
      domain: item.domain,
      id: item.id,
      points: item.points,
      time: item.time,
      time_ago: item.time_ago,
      title: item.title,
      type: item.type,
      url: item.url,
      user: item.user
    });
    objectStoreRequest.onsuccess = () => {
      dispatch(addFavorite(item));
    };
  });
};
/* harmony export (immutable) */ __webpack_exports__["e"] = saveFavorite;


const addFavorite = item => dispatch => {
  dispatch({
    type: ADD_FAVORITE,
    item
  });
};

const deleteFavorite = item => dispatch => {
  dbPromise.then(db => {
    const transaction = db.transaction(['favorites'], 'readwrite');
    const objectStore = transaction.objectStore('favorites');
    const objectStoreRequest = objectStore.delete(item.id);
    objectStoreRequest.onsuccess = () => {
      dispatch({
        type: REMOVE_FAVORITE,
        item
      });
    };
  });
};
/* harmony export (immutable) */ __webpack_exports__["c"] = deleteFavorite;


const loadFavorites = () => dispatch => {
  dbPromise.then(db => {
    const objectStore = db.transaction('favorites').objectStore('favorites');
    objectStore.openCursor().onsuccess = function (event) {
      const cursor = event.target.result;
      if (cursor) {
        dispatch(addFavorite(cursor.value));
        cursor.continue();
      }
    };
  });
};
/* harmony export (immutable) */ __webpack_exports__["d"] = loadFavorites;


/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__ = __webpack_require__(2);


// Common implementation for mixin & behavior
function mutablePropertyChange(inst, property, value, old, mutableData) {
  let isObject;
  if (mutableData) {
    isObject = typeof value === 'object' && value !== null;
    // Pull `old` for Objects from temp cache, but treat `null` as a primitive
    if (isObject) {
      old = inst.__dataTemp[property];
    }
  }
  // Strict equality check, but return false for NaN===NaN
  let shouldChange = old !== value && (old === old || value === value);
  // Objects are stored in temporary cache (cleared at end of
  // turn), which is used for dirty-checking
  if (isObject && shouldChange) {
    inst.__dataTemp[property] = value;
  }
  return shouldChange;
}

const MutableData = Object(__WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_MutableData}
   */
  class MutableData extends superClass {
    /**
     * Overrides `Polymer.PropertyEffects` to provide option for skipping
     * strict equality checking for Objects and Arrays.
     *
     * This method pulls the value to dirty check against from the `__dataTemp`
     * cache (rather than the normal `__data` cache) for Objects.  Since the temp
     * cache is cleared at the end of a turn, this implementation allows
     * side-effects of deep object changes to be processed by re-setting the
     * same object (using the temp cache as an in-turn backstop to prevent
     * cycles due to 2-way notification).
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return mutablePropertyChange(this, property, value, old, true);
    }

  }
  /** @type {boolean} */
  MutableData.prototype.mutableData = false;

  return MutableData;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = MutableData;


const OptionalMutableData = Object(__WEBPACK_IMPORTED_MODULE_0__utils_mixin_js__["a" /* dedupingMixin */])(superClass => {

  /**
   * @mixinClass
   * @polymer
   * @implements {Polymer_OptionalMutableData}
   */
  class OptionalMutableData extends superClass {

    static get properties() {
      return {
        /**
         * Instance-level flag for configuring the dirty-checking strategy
         * for this element.  When true, Objects and Arrays will skip dirty
         * checking, otherwise strict equality checking will be used.
         */
        mutableData: Boolean
      };
    }

    /**
     * Overrides `Polymer.PropertyEffects` to provide option for skipping
     * strict equality checking for Objects and Arrays.
     *
     * When `this.mutableData` is true on this instance, this method
     * pulls the value to dirty check against from the `__dataTemp` cache
     * (rather than the normal `__data` cache) for Objects.  Since the temp
     * cache is cleared at the end of a turn, this implementation allows
     * side-effects of deep object changes to be processed by re-setting the
     * same object (using the temp cache as an in-turn backstop to prevent
     * cycles due to 2-way notification).
     *
     * @param {string} property Property name
     * @param {*} value New property value
     * @param {*} old Previous property value
     * @return {boolean} Whether the property should be considered a change
     * @protected
     */
    _shouldPropertyChange(property, value, old) {
      return mutablePropertyChange(this, property, value, old, this.mutableData);
    }
  }

  return OptionalMutableData;
});
/* harmony export (immutable) */ __webpack_exports__["b"] = OptionalMutableData;


// Export for use by legacy behavior
MutableData._mutablePropertyChange = mutablePropertyChange;

/***/ }),

/***/ 34:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Templatize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemplateInstanceBase; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__ = __webpack_require__(33);




// Base class for HTMLTemplateElement extension that has property effects
// machinery for propagating host properties to children. This is an ES5
// class only because Babel (incorrectly) requires super() in the class
// constructor even though no `this` is used and it returns an instance.
let newInstance = null;
/**
 * @constructor
 * @extends {HTMLTemplateElement}
 */
function HTMLTemplateElementExtension() {
  return newInstance;
}
HTMLTemplateElementExtension.prototype = Object.create(HTMLTemplateElement.prototype, {
  constructor: {
    value: HTMLTemplateElementExtension,
    writable: true
  }
});
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 * @extends {HTMLTemplateElementExtension}
 */
const DataTemplate = Object(__WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__["a" /* PropertyEffects */])(HTMLTemplateElementExtension);
/**
 * @constructor
 * @implements {Polymer_MutableData}
 * @extends {DataTemplate}
 */
const MutableDataTemplate = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__["a" /* MutableData */])(DataTemplate);

// Applies a DataTemplate subclass to a <template> instance
function upgradeTemplate(template, constructor) {
  newInstance = template;
  Object.setPrototypeOf(template, constructor.prototype);
  new constructor();
  newInstance = null;
}

// Base class for TemplateInstance's
/**
 * @constructor
 * @implements {Polymer_PropertyEffects}
 */
const base = Object(__WEBPACK_IMPORTED_MODULE_1__mixins_property_effects_js__["a" /* PropertyEffects */])(class {});

/**
 * @polymer
 * @customElement
 * @appliesMixin Polymer.PropertyEffects
 * @unrestricted
 */
class TemplateInstanceBase extends base {
  constructor(props) {
    super();
    this._configureProperties(props);
    this.root = this._stampTemplate(this.__dataHost);
    // Save list of stamped children
    let children = this.children = [];
    for (let n = this.root.firstChild; n; n = n.nextSibling) {
      children.push(n);
      n.__templatizeInstance = this;
    }
    if (this.__templatizeOwner.__hideTemplateChildren__) {
      this._showHideChildren(true);
    }
    // Flush props only when props are passed if instance props exist
    // or when there isn't instance props.
    let options = this.__templatizeOptions;
    if (props && options.instanceProps || !options.instanceProps) {
      this._enableProperties();
    }
  }
  /**
   * Configure the given `props` by calling `_setPendingProperty`. Also
   * sets any properties stored in `__hostProps`.
   * @private
   * @param {Object} props Object of property name-value pairs to set.
   */
  _configureProperties(props) {
    let options = this.__templatizeOptions;
    if (props) {
      for (let iprop in options.instanceProps) {
        if (iprop in props) {
          this._setPendingProperty(iprop, props[iprop]);
        }
      }
    }
    for (let hprop in this.__hostProps) {
      this._setPendingProperty(hprop, this.__dataHost['_host_' + hprop]);
    }
  }
  /**
   * Forwards a host property to this instance.  This method should be
   * called on instances from the `options.forwardHostProp` callback
   * to propagate changes of host properties to each instance.
   *
   * Note this method enqueues the change, which are flushed as a batch.
   *
   * @param {string} prop Property or path name
   * @param {*} value Value of the property to forward
   */
  forwardHostProp(prop, value) {
    if (this._setPendingPropertyOrPath(prop, value, false, true)) {
      this.__dataHost._enqueueClient(this);
    }
  }
  /**
   * @override
   */
  _addEventListenerToNode(node, eventName, handler) {
    if (this._methodHost && this.__templatizeOptions.parentModel) {
      // If this instance should be considered a parent model, decorate
      // events this template instance as `model`
      this._methodHost._addEventListenerToNode(node, eventName, e => {
        e.model = this;
        handler(e);
      });
    } else {
      // Otherwise delegate to the template's host (which could be)
      // another template instance
      let templateHost = this.__dataHost.__dataHost;
      if (templateHost) {
        templateHost._addEventListenerToNode(node, eventName, handler);
      }
    }
  }
  /**
   * Shows or hides the template instance top level child elements. For
   * text nodes, `textContent` is removed while "hidden" and replaced when
   * "shown."
   * @param {boolean} hide Set to true to hide the children;
   * set to false to show them.
   * @protected
   */
  _showHideChildren(hide) {
    let c = this.children;
    for (let i = 0; i < c.length; i++) {
      let n = c[i];
      // Ignore non-changes
      if (Boolean(hide) != Boolean(n.__hideTemplateChildren__)) {
        if (n.nodeType === Node.TEXT_NODE) {
          if (hide) {
            n.__polymerTextContent__ = n.textContent;
            n.textContent = '';
          } else {
            n.textContent = n.__polymerTextContent__;
          }
        } else if (n.style) {
          if (hide) {
            n.__polymerDisplay__ = n.style.display;
            n.style.display = 'none';
          } else {
            n.style.display = n.__polymerDisplay__;
          }
        }
      }
      n.__hideTemplateChildren__ = hide;
      if (n._showHideChildren) {
        n._showHideChildren(hide);
      }
    }
  }
  /**
   * Overrides default property-effects implementation to intercept
   * textContent bindings while children are "hidden" and cache in
   * private storage for later retrieval.
   *
   * @override
   */
  _setUnmanagedPropertyToNode(node, prop, value) {
    if (node.__hideTemplateChildren__ && node.nodeType == Node.TEXT_NODE && prop == 'textContent') {
      node.__polymerTextContent__ = value;
    } else {
      super._setUnmanagedPropertyToNode(node, prop, value);
    }
  }
  /**
   * Find the parent model of this template instance.  The parent model
   * is either another templatize instance that had option `parentModel: true`,
   * or else the host element.
   *
   * @return {Polymer_PropertyEffects} The parent model of this instance
   */
  get parentModel() {
    let model = this.__parentModel;
    if (!model) {
      let options;
      model = this;
      do {
        // A template instance's `__dataHost` is a <template>
        // `model.__dataHost.__dataHost` is the template's host
        model = model.__dataHost.__dataHost;
      } while ((options = model.__templatizeOptions) && !options.parentModel);
      this.__parentModel = model;
    }
    return model;
  }
}

/** @type {!DataTemplate} */
TemplateInstanceBase.prototype.__dataHost;
/** @type {!TemplatizeOptions} */
TemplateInstanceBase.prototype.__templatizeOptions;
/** @type {!Polymer_PropertyEffects} */
TemplateInstanceBase.prototype._methodHost;
/** @type {!Object} */
TemplateInstanceBase.prototype.__templatizeOwner;
/** @type {!Object} */
TemplateInstanceBase.prototype.__hostProps;

/**
 * @constructor
 * @extends {TemplateInstanceBase}
 * @implements {Polymer_MutableData}
 */
const MutableTemplateInstanceBase = Object(__WEBPACK_IMPORTED_MODULE_2__mixins_mutable_data_js__["a" /* MutableData */])(TemplateInstanceBase);

function findMethodHost(template) {
  // Technically this should be the owner of the outermost template.
  // In shadow dom, this is always getRootNode().host, but we can
  // approximate this via cooperation with our dataHost always setting
  // `_methodHost` as long as there were bindings (or id's) on this
  // instance causing it to get a dataHost.
  let templateHost = template.__dataHost;
  return templateHost && templateHost._methodHost || templateHost;
}

/* eslint-disable valid-jsdoc */
/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function createTemplatizerClass(template, templateInfo, options) {
  // Anonymous class created by the templatize
  let base = options.mutableData ? MutableTemplateInstanceBase : TemplateInstanceBase;
  /**
   * @constructor
   * @extends {base}
   */
  let klass = class extends base {};
  klass.prototype.__templatizeOptions = options;
  klass.prototype._bindTemplate(template);
  addNotifyEffects(klass, template, templateInfo, options);
  return klass;
}

/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function addPropagateEffects(template, templateInfo, options) {
  let userForwardHostProp = options.forwardHostProp;
  if (userForwardHostProp) {
    // Provide data API and property effects on memoized template class
    let klass = templateInfo.templatizeTemplateClass;
    if (!klass) {
      let base = options.mutableData ? MutableDataTemplate : DataTemplate;
      klass = templateInfo.templatizeTemplateClass = class TemplatizedTemplate extends base {};
      // Add template - >instances effects
      // and host <- template effects
      let hostProps = templateInfo.hostProps;
      for (let prop in hostProps) {
        klass.prototype._addPropertyEffect('_host_' + prop, klass.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE, { fn: createForwardHostPropEffect(prop, userForwardHostProp) });
        klass.prototype._createNotifyingProperty('_host_' + prop);
      }
    }
    upgradeTemplate(template, klass);
    // Mix any pre-bound data into __data; no need to flush this to
    // instances since they pull from the template at instance-time
    if (template.__dataProto) {
      // Note, generally `__dataProto` could be chained, but it's guaranteed
      // to not be since this is a vanilla template we just added effects to
      Object.assign(template.__data, template.__dataProto);
    }
    // Clear any pending data for performance
    template.__dataTemp = {};
    template.__dataPending = null;
    template.__dataOld = null;
    template._enableProperties();
  }
}
/* eslint-enable valid-jsdoc */

function createForwardHostPropEffect(hostProp, userForwardHostProp) {
  return function forwardHostProp(template, prop, props) {
    userForwardHostProp.call(template.__templatizeOwner, prop.substring('_host_'.length), props[prop]);
  };
}

function addNotifyEffects(klass, template, templateInfo, options) {
  let hostProps = templateInfo.hostProps || {};
  for (let iprop in options.instanceProps) {
    delete hostProps[iprop];
    let userNotifyInstanceProp = options.notifyInstanceProp;
    if (userNotifyInstanceProp) {
      klass.prototype._addPropertyEffect(iprop, klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp) });
    }
  }
  if (options.forwardHostProp && template.__dataHost) {
    for (let hprop in hostProps) {
      klass.prototype._addPropertyEffect(hprop, klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: createNotifyHostPropEffect() });
    }
  }
}

function createNotifyInstancePropEffect(instProp, userNotifyInstanceProp) {
  return function notifyInstanceProp(inst, prop, props) {
    userNotifyInstanceProp.call(inst.__templatizeOwner, inst, prop, props[prop]);
  };
}

function createNotifyHostPropEffect() {
  return function notifyHostProp(inst, prop, props) {
    inst.__dataHost._setPendingPropertyOrPath('_host_' + prop, props[prop], true, true);
  };
}

/**
 * Module for preparing and stamping instances of templates that utilize
 * Polymer's data-binding and declarative event listener features.
 *
 * Example:
 *
 *     // Get a template from somewhere, e.g. light DOM
 *     let template = this.querySelector('template');
 *     // Prepare the template
 *     let TemplateClass = Polymer.Templatize.templatize(template);
 *     // Instance the template with an initial data model
 *     let instance = new TemplateClass({myProp: 'initial'});
 *     // Insert the instance's DOM somewhere, e.g. element's shadow DOM
 *     this.shadowRoot.appendChild(instance.root);
 *     // Changing a property on the instance will propagate to bindings
 *     // in the template
 *     instance.myProp = 'new value';
 *
 * The `options` dictionary passed to `templatize` allows for customizing
 * features of the generated template class, including how outer-scope host
 * properties should be forwarded into template instances, how any instance
 * properties added into the template's scope should be notified out to
 * the host, and whether the instance should be decorated as a "parent model"
 * of any event handlers.
 *
 *     // Customze property forwarding and event model decoration
 *     let TemplateClass = Polymer.Templatize.templatize(template, this, {
 *       parentModel: true,
 *       instanceProps: {...},
 *       forwardHostProp(property, value) {...},
 *       notifyInstanceProp(instance, property, value) {...},
 *     });
 *
 *
 * @namespace
 * @memberof Polymer
 * @summary Module for preparing and stamping instances of templates
 *   utilizing Polymer templating features.
 */

const Templatize = {

  /**
   * Returns an anonymous `Polymer.PropertyEffects` class bound to the
   * `<template>` provided.  Instancing the class will result in the
   * template being stamped into document fragment stored as the instance's
   * `root` property, after which it can be appended to the DOM.
   *
   * Templates may utilize all Polymer data-binding features as well as
   * declarative event listeners.  Event listeners and inline computing
   * functions in the template will be called on the host of the template.
   *
   * The constructor returned takes a single argument dictionary of initial
   * property values to propagate into template bindings.  Additionally
   * host properties can be forwarded in, and instance properties can be
   * notified out by providing optional callbacks in the `options` dictionary.
   *
   * Valid configuration in `options` are as follows:
   *
   * - `forwardHostProp(property, value)`: Called when a property referenced
   *   in the template changed on the template's host. As this library does
   *   not retain references to templates instanced by the user, it is the
   *   templatize owner's responsibility to forward host property changes into
   *   user-stamped instances.  The `instance.forwardHostProp(property, value)`
   *    method on the generated class should be called to forward host
   *   properties into the template to prevent unnecessary property-changed
   *   notifications. Any properties referenced in the template that are not
   *   defined in `instanceProps` will be notified up to the template's host
   *   automatically.
   * - `instanceProps`: Dictionary of property names that will be added
   *   to the instance by the templatize owner.  These properties shadow any
   *   host properties, and changes within the template to these properties
   *   will result in `notifyInstanceProp` being called.
   * - `mutableData`: When `true`, the generated class will skip strict
   *   dirty-checking for objects and arrays (always consider them to be
   *   "dirty").
   * - `notifyInstanceProp(instance, property, value)`: Called when
   *   an instance property changes.  Users may choose to call `notifyPath`
   *   on e.g. the owner to notify the change.
   * - `parentModel`: When `true`, events handled by declarative event listeners
   *   (`on-event="handler"`) will be decorated with a `model` property pointing
   *   to the template instance that stamped it.  It will also be returned
   *   from `instance.parentModel` in cases where template instance nesting
   *   causes an inner model to shadow an outer model.
   *
   * Note that the class returned from `templatize` is generated only once
   * for a given `<template>` using `options` from the first call for that
   * template, and the cached class is returned for all subsequent calls to
   * `templatize` for that template.  As such, `options` callbacks should not
   * close over owner-specific properties since only the first `options` is
   * used; rather, callbacks are called bound to the `owner`, and so context
   * needed from the callbacks (such as references to `instances` stamped)
   * should be stored on the `owner` such that they can be retrieved via `this`.
   *
   * @memberof Polymer.Templatize
   * @param {!HTMLTemplateElement} template Template to templatize
   * @param {!Polymer_PropertyEffects} owner Owner of the template instances;
   *   any optional callbacks will be bound to this owner.
   * @param {Object=} options Options dictionary (see summary for details)
   * @return {function(new:TemplateInstanceBase)} Generated class bound to the template
   *   provided
   * @suppress {invalidCasts}
   */
  templatize(template, owner, options) {
    options = /** @type {!TemplatizeOptions} */options || {};
    if (template.__templatizeOwner) {
      throw new Error('A <template> can only be templatized once');
    }
    template.__templatizeOwner = owner;
    let templateInfo = owner.constructor._parseTemplate(template);
    // Get memoized base class for the prototypical template, which
    // includes property effects for binding template & forwarding
    let baseClass = templateInfo.templatizeInstanceClass;
    if (!baseClass) {
      baseClass = createTemplatizerClass(template, templateInfo, options);
      templateInfo.templatizeInstanceClass = baseClass;
    }
    // Host property forwarding must be installed onto template instance
    addPropagateEffects(template, templateInfo, options);
    // Subclass base class and add reference for this specific template
    let klass = class TemplateInstance extends baseClass {};
    klass.prototype._methodHost = findMethodHost(template);
    klass.prototype.__dataHost = template;
    klass.prototype.__templatizeOwner = owner;
    klass.prototype.__hostProps = templateInfo.hostProps;
    return (/** @type {function(new:TemplateInstanceBase)} */klass
    );
  },

  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of
   * `TemplateInstanceBase`, and should be used to manipulate data
   * associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @memberof Polymer.Templatize
   * @param {HTMLTemplateElement} template The model will be returned for
   *   elements stamped from this template
   * @param {Node} node Node for which to return a template model.
   * @return {TemplateInstanceBase} Template instance representing the
   *   binding scope for the element
   */
  modelForElement(template, node) {
    let model;
    while (node) {
      // An element with a __templatizeInstance marks the top boundary
      // of a scope; walk up until we find one, and then ensure that
      // its __dataHost matches `this`, meaning this dom-repeat stamped it
      if (model = node.__templatizeInstance) {
        // Found an element stamped by another template; keep walking up
        // from its __dataHost
        if (model.__dataHost != template) {
          node = model.__dataHost;
        } else {
          return model;
        }
      } else {
        // Still in a template scope, keep going up until
        // a __templatizeInstance is found
        node = node.parentNode;
      }
    }
    return null;
  }
};




/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Debouncer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixin_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__async_js__ = __webpack_require__(12);




/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
let AsyncModule; // eslint-disable-line no-unused-vars

/**
 * @summary Collapse multiple callbacks into one invocation after a timer.
 * @memberof Polymer
 */
class Debouncer {
  constructor() {
    this._asyncModule = null;
    this._callback = null;
    this._timer = null;
  }
  /**
   * Sets the scheduler; that is, a module with the Async interface,
   * a callback and optional arguments to be passed to the run function
   * from the async module.
   *
   * @param {!AsyncModule} asyncModule Object with Async interface.
   * @param {function()} callback Callback to run.
   */
  setConfig(asyncModule, callback) {
    this._asyncModule = asyncModule;
    this._callback = callback;
    this._timer = this._asyncModule.run(() => {
      this._timer = null;
      this._callback();
    });
  }
  /**
   * Cancels an active debouncer and returns a reference to itself.
   */
  cancel() {
    if (this.isActive()) {
      this._asyncModule.cancel(this._timer);
      this._timer = null;
    }
  }
  /**
   * Flushes an active debouncer and returns a reference to itself.
   */
  flush() {
    if (this.isActive()) {
      this.cancel();
      this._callback();
    }
  }
  /**
   * Returns true if the debouncer is active.
   *
   * @return {boolean} True if active.
   */
  isActive() {
    return this._timer != null;
  }
  /**
   * Creates a debouncer if no debouncer is passed as a parameter
   * or it cancels an active debouncer otherwise. The following
   * example shows how a debouncer can be called multiple times within a
   * microtask and "debounced" such that the provided callback function is
   * called once. Add this method to a custom element:
   *
   * _debounceWork() {
   *   this._debounceJob = Polymer.Debouncer.debounce(this._debounceJob,
   *       Polymer.Async.microTask, () => {
   *     this._doWork();
   *   });
   * }
   *
   * If the `_debounceWork` method is called multiple times within the same
   * microtask, the `_doWork` function will be called only once at the next
   * microtask checkpoint.
   *
   * Note: In testing it is often convenient to avoid asynchrony. To accomplish
   * this with a debouncer, you can use `Polymer.enqueueDebouncer` and
   * `Polymer.flush`. For example, extend the above example by adding
   * `Polymer.enqueueDebouncer(this._debounceJob)` at the end of the
   * `_debounceWork` method. Then in a test, call `Polymer.flush` to ensure
   * the debouncer has completed.
   *
   * @param {Debouncer?} debouncer Debouncer object.
   * @param {!AsyncModule} asyncModule Object with Async interface
   * @param {function()} callback Callback to run.
   * @return {!Debouncer} Returns a debouncer object.
   */
  static debounce(debouncer, asyncModule, callback) {
    if (debouncer instanceof Debouncer) {
      debouncer.cancel();
    } else {
      debouncer = new Debouncer();
    }
    debouncer.setConfig(asyncModule, callback);
    return debouncer;
  }
}



/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__boot_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__boot_js__);


let debouncerQueue = [];

const enqueueDebouncer = function (debouncer) {
  debouncerQueue.push(debouncer);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = enqueueDebouncer;


function flushDebouncers() {
  const didFlush = Boolean(debouncerQueue.length);
  while (debouncerQueue.length) {
    try {
      debouncerQueue.shift().flush();
    } catch (e) {
      setTimeout(() => {
        throw e;
      });
    }
  }
  return didFlush;
}

const flush = function () {
  let shadyDOM, debouncers;
  do {
    shadyDOM = window.ShadyDOM && ShadyDOM.flush();
    if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
      window.ShadyCSS.ScopingShim.flush();
    }
    debouncers = flushDebouncers();
  } while (shadyDOM || debouncers);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = flush;


/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_items_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__actions_favorites_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_reselect_src_index_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__location_js__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



// HACK: Don't need to import list actions just for this.
// import { RECEIVE_LIST } from '../actions/lists.js';



const items = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_items_js__["c" /* REQUEST_ITEM */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_items_js__["b" /* RECEIVE_ITEM */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_items_js__["a" /* FAIL_ITEM */]:
      const itemId = action.itemId;
      return _extends({}, state, {
        [itemId]: item(state[itemId], action)
      });
    case 'RECEIVE_LIST':
      return action.items.reduce((obj, item) => {
        obj[item.id] = item;
        return obj;
      }, _extends({}, state));
    case __WEBPACK_IMPORTED_MODULE_1__actions_favorites_js__["a" /* ADD_FAVORITE */]:
      return _extends({}, state, {
        [action.item.id]: action.item
      });
    default:
      return state;
  }
};

const item = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_items_js__["c" /* REQUEST_ITEM */]:
      return _extends({}, state, {
        id: action.itemId,
        failure: false,
        isFetching: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_items_js__["b" /* RECEIVE_ITEM */]:
      return _extends({}, state, {
        failure: false,
        isFetching: false
      }, action.data);
    case __WEBPACK_IMPORTED_MODULE_0__actions_items_js__["a" /* FAIL_ITEM */]:
      return _extends({}, state, {
        failure: true,
        isFetching: false
      });
    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["b"] = (items);

const itemsSelector = state => state.items;
/* harmony export (immutable) */ __webpack_exports__["c"] = itemsSelector;


const currentItemSelector = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_reselect_src_index_js__["a" /* createSelector */])(itemsSelector, __WEBPACK_IMPORTED_MODULE_3__location_js__["c" /* splitPathnameSelector */], __WEBPACK_IMPORTED_MODULE_3__location_js__["d" /* urlSearchParamsSelector */], (items, splitPath, params) => {
  switch (splitPath[0]) {
    case 'item':
      const id = params.get('id');
      return items[id] || { id };
    default:
      return null;
  }
});
/* harmony export (immutable) */ __webpack_exports__["a"] = currentItemSelector;


/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DomRepeat */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polymer_element_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_flush_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_mutable_data_js__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_path_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_async_js__ = __webpack_require__(12);








let TemplateInstanceBase = __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["a" /* TemplateInstanceBase */]; // eslint-disable-line

/**
 * @constructor
 * @implements {Polymer_OptionalMutableData}
 * @extends {Polymer.Element}
 */
const domRepeatBase = Object(__WEBPACK_IMPORTED_MODULE_4__mixins_mutable_data_js__["b" /* OptionalMutableData */])(__WEBPACK_IMPORTED_MODULE_0__polymer_element_js__["a" /* Element */]);

/**
 * The `<dom-repeat>` element will automatically stamp and binds one instance
 * of template content to each object in a user-provided array.
 * `dom-repeat` accepts an `items` property, and one instance of the template
 * is stamped for each item into the DOM at the location of the `dom-repeat`
 * element.  The `item` property will be set on each instance's binding
 * scope, thus templates should bind to sub-properties of `item`.
 *
 * Example:
 *
 * ```html
 * <dom-module id="employee-list">
 *
 *   <template>
 *
 *     <div> Employee list: </div>
 *     <template is="dom-repeat" items="{{employees}}">
 *         <div>First name: <span>{{item.first}}</span></div>
 *         <div>Last name: <span>{{item.last}}</span></div>
 *     </template>
 *
 *   </template>
 *
 *   <script>
 *     Polymer({
 *       is: 'employee-list',
 *       ready: function() {
 *         this.employees = [
 *             {first: 'Bob', last: 'Smith'},
 *             {first: 'Sally', last: 'Johnson'},
 *             ...
 *         ];
 *       }
 *     });
 *   < /script>
 *
 * </dom-module>
 * ```
 *
 * Notifications for changes to items sub-properties will be forwarded to template
 * instances, which will update via the normal structured data notification system.
 *
 * Mutations to the `items` array itself should be made using the Array
 * mutation API's on `Polymer.Base` (`push`, `pop`, `splice`, `shift`,
 * `unshift`), and template instances will be kept in sync with the data in the
 * array.
 *
 * Events caught by event handlers within the `dom-repeat` template will be
 * decorated with a `model` property, which represents the binding scope for
 * each template instance.  The model is an instance of Polymer.Base, and should
 * be used to manipulate data on the instance, for example
 * `event.model.set('item.checked', true);`.
 *
 * Alternatively, the model for a template instance for an element stamped by
 * a `dom-repeat` can be obtained using the `modelForElement` API on the
 * `dom-repeat` that stamped it, for example
 * `this.$.domRepeat.modelForElement(event.target).set('item.checked', true);`.
 * This may be useful for manipulating instance data of event targets obtained
 * by event handlers on parents of the `dom-repeat` (event delegation).
 *
 * A view-specific filter/sort may be applied to each `dom-repeat` by supplying a
 * `filter` and/or `sort` property.  This may be a string that names a function on
 * the host, or a function may be assigned to the property directly.  The functions
 * should implemented following the standard `Array` filter/sort API.
 *
 * In order to re-run the filter or sort functions based on changes to sub-fields
 * of `items`, the `observe` property may be set as a space-separated list of
 * `item` sub-fields that should cause a re-filter/sort when modified.  If
 * the filter or sort function depends on properties not contained in `items`,
 * the user should observe changes to those properties and call `render` to update
 * the view based on the dependency change.
 *
 * For example, for an `dom-repeat` with a filter of the following:
 *
 * ```js
 * isEngineer: function(item) {
 *     return item.type == 'engineer' || item.manager.type == 'engineer';
 * }
 * ```
 *
 * Then the `observe` property should be configured as follows:
 *
 * ```html
 * <template is="dom-repeat" items="{{employees}}"
 *           filter="isEngineer" observe="type manager.type">
 * ```
 *
 * @customElement
 * @polymer
 * @memberof Polymer
 * @extends {domRepeatBase}
 * @appliesMixin Polymer.OptionalMutableData
 * @summary Custom element for stamping instance of a template bound to
 *   items in an array.
 */
class DomRepeat extends domRepeatBase {

  // Not needed to find template; can be removed once the analyzer
  // can find the tag name from customElements.define call
  static get is() {
    return 'dom-repeat';
  }

  static get template() {
    return null;
  }

  static get properties() {

    /**
     * Fired whenever DOM is added or removed by this template (by
     * default, rendering occurs lazily).  To force immediate rendering, call
     * `render`.
     *
     * @event dom-change
     */
    return {

      /**
       * An array containing items determining how many instances of the template
       * to stamp and that that each template instance should bind to.
       */
      items: {
        type: Array
      },

      /**
       * The name of the variable to add to the binding scope for the array
       * element associated with a given template instance.
       */
      as: {
        type: String,
        value: 'item'
      },

      /**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the sorted and filtered list of rendered items.
       * Note, for the index in the `this.items` array, use the value of the
       * `itemsIndexAs` property.
       */
      indexAs: {
        type: String,
        value: 'index'
      },

      /**
       * The name of the variable to add to the binding scope with the index
       * of the instance in the `this.items` array. Note, for the index of
       * this instance in the sorted and filtered list of rendered items,
       * use the value of the `indexAs` property.
       */
      itemsIndexAs: {
        type: String,
        value: 'itemsIndex'
      },

      /**
       * A function that should determine the sort order of the items.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.sort`.
       * Using a sort function has no effect on the underlying `items` array.
       */
      sort: {
        type: Function,
        observer: '__sortChanged'
      },

      /**
       * A function that can be used to filter items out of the view.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.filter`.
       * Using a filter function has no effect on the underlying `items` array.
       */
      filter: {
        type: Function,
        observer: '__filterChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `observe` property
       * should be set to a space-separated list of the names of item
       * sub-fields that should trigger a re-sort or re-filter when changed.
       * These should generally be fields of `item` that the sort or filter
       * function depends on.
       */
      observe: {
        type: String,
        observer: '__observeChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `delay` property
       * determines a debounce time after a change to observed item
       * properties that must pass before the filter or sort is re-run.
       * This is useful in rate-limiting shuffing of the view when
       * item changes may be frequent.
       */
      delay: Number,

      /**
       * Count of currently rendered items after `filter` (if any) has been applied.
       * If "chunking mode" is enabled, `renderedItemCount` is updated each time a
       * set of template instances is rendered.
       *
       */
      renderedItemCount: {
        type: Number,
        notify: true,
        readOnly: true
      },

      /**
       * Defines an initial count of template instances to render after setting
       * the `items` array, before the next paint, and puts the `dom-repeat`
       * into "chunking mode".  The remaining items will be created and rendered
       * incrementally at each animation frame therof until all instances have
       * been rendered.
       */
      initialCount: {
        type: Number,
        observer: '__initializeChunking'
      },

      /**
       * When `initialCount` is used, this property defines a frame rate to
       * target by throttling the number of instances rendered each frame to
       * not exceed the budget for the target frame rate.  Setting this to a
       * higher number will allow lower latency and higher throughput for
       * things like event handlers, but will result in a longer time for the
       * remaining items to complete rendering.
       */
      targetFramerate: {
        type: Number,
        value: 20
      },

      _targetFrameTime: {
        type: Number,
        computed: '__computeFrameTime(targetFramerate)'
      }

    };
  }

  static get observers() {
    return ['__itemsChanged(items.*)'];
  }

  constructor() {
    super();
    this.__instances = [];
    this.__limit = Infinity;
    this.__pool = [];
    this.__renderDebouncer = null;
    this.__itemsIdxToInstIdx = {};
    this.__chunkCount = null;
    this.__lastChunkTime = null;
    this.__sortFn = null;
    this.__filterFn = null;
    this.__observePaths = null;
    this.__ctor = null;
    this.__isDetached = true;
    this.template = null;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.__isDetached = true;
    for (let i = 0; i < this.__instances.length; i++) {
      this.__detachInstance(i);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    // only perform attachment if the element was previously detached.
    if (this.__isDetached) {
      this.__isDetached = false;
      let parent = this.parentNode;
      for (let i = 0; i < this.__instances.length; i++) {
        this.__attachInstance(i, parent);
      }
    }
  }

  __ensureTemplatized() {
    // Templatizing (generating the instance constructor) needs to wait
    // until ready, since won't have its template content handed back to
    // it until then
    if (!this.__ctor) {
      let template = this.template = this.querySelector('template');
      if (!template) {
        // // Wait until childList changes and template should be there by then
        let observer = new MutationObserver(() => {
          if (this.querySelector('template')) {
            observer.disconnect();
            this.__render();
          } else {
            throw new Error('dom-repeat requires a <template> child');
          }
        });
        observer.observe(this, { childList: true });
        return false;
      }
      // Template instance props that should be excluded from forwarding
      let instanceProps = {};
      instanceProps[this.as] = true;
      instanceProps[this.indexAs] = true;
      instanceProps[this.itemsIndexAs] = true;
      this.__ctor = __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["b" /* Templatize */].templatize(template, this, {
        mutableData: this.mutableData,
        parentModel: true,
        instanceProps: instanceProps,
        /**
         * @this {this}
         * @param {string} prop Property to set
         * @param {*} value Value to set property to
         */
        forwardHostProp: function (prop, value) {
          let i$ = this.__instances;
          for (let i = 0, inst; i < i$.length && (inst = i$[i]); i++) {
            inst.forwardHostProp(prop, value);
          }
        },
        /**
         * @this {this}
         * @param {Object} inst Instance to notify
         * @param {string} prop Property to notify
         * @param {*} value Value to notify
         */
        notifyInstanceProp: function (inst, prop, value) {
          if (Object(__WEBPACK_IMPORTED_MODULE_5__utils_path_js__["e" /* matches */])(this.as, prop)) {
            let idx = inst[this.itemsIndexAs];
            if (prop == this.as) {
              this.items[idx] = value;
            }
            let path = Object(__WEBPACK_IMPORTED_MODULE_5__utils_path_js__["i" /* translate */])(this.as, 'items.' + idx, prop);
            this.notifyPath(path, value);
          }
        }
      });
    }
    return true;
  }

  __getMethodHost() {
    // Technically this should be the owner of the outermost template.
    // In shadow dom, this is always getRootNode().host, but we can
    // approximate this via cooperation with our dataHost always setting
    // `_methodHost` as long as there were bindings (or id's) on this
    // instance causing it to get a dataHost.
    return this.__dataHost._methodHost || this.__dataHost;
  }

  __sortChanged(sort) {
    let methodHost = this.__getMethodHost();
    this.__sortFn = sort && (typeof sort == 'function' ? sort : function () {
      return methodHost[sort].apply(methodHost, arguments);
    });
    if (this.items) {
      this.__debounceRender(this.__render);
    }
  }

  __filterChanged(filter) {
    let methodHost = this.__getMethodHost();
    this.__filterFn = filter && (typeof filter == 'function' ? filter : function () {
      return methodHost[filter].apply(methodHost, arguments);
    });
    if (this.items) {
      this.__debounceRender(this.__render);
    }
  }

  __computeFrameTime(rate) {
    return Math.ceil(1000 / rate);
  }

  __initializeChunking() {
    if (this.initialCount) {
      this.__limit = this.initialCount;
      this.__chunkCount = this.initialCount;
      this.__lastChunkTime = performance.now();
    }
  }

  __tryRenderChunk() {
    // Debounced so that multiple calls through `_render` between animation
    // frames only queue one new rAF (e.g. array mutation & chunked render)
    if (this.items && this.__limit < this.items.length) {
      this.__debounceRender(this.__requestRenderChunk);
    }
  }

  __requestRenderChunk() {
    requestAnimationFrame(() => this.__renderChunk());
  }

  __renderChunk() {
    // Simple auto chunkSize throttling algorithm based on feedback loop:
    // measure actual time between frames and scale chunk count by ratio
    // of target/actual frame time
    let currChunkTime = performance.now();
    let ratio = this._targetFrameTime / (currChunkTime - this.__lastChunkTime);
    this.__chunkCount = Math.round(this.__chunkCount * ratio) || 1;
    this.__limit += this.__chunkCount;
    this.__lastChunkTime = currChunkTime;
    this.__debounceRender(this.__render);
  }

  __observeChanged() {
    this.__observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
  }

  __itemsChanged(change) {
    if (this.items && !Array.isArray(this.items)) {
      console.warn('dom-repeat expected array for `items`, found', this.items);
    }
    // If path was to an item (e.g. 'items.3' or 'items.3.foo'), forward the
    // path to that instance synchronously (retuns false for non-item paths)
    if (!this.__handleItemPath(change.path, change.value)) {
      // Otherwise, the array was reset ('items') or spliced ('items.splices'),
      // so queue a full refresh
      this.__initializeChunking();
      this.__debounceRender(this.__render);
    }
  }

  __handleObservedPaths(path) {
    if (this.__observePaths) {
      path = path.substring(path.indexOf('.') + 1);
      let paths = this.__observePaths;
      for (let i = 0; i < paths.length; i++) {
        if (path.indexOf(paths[i]) === 0) {
          this.__debounceRender(this.__render, this.delay);
          return true;
        }
      }
    }
  }

  /**
   * @param {function(this:DomRepeat)} fn Function to debounce.
   * @param {number=} delay Delay in ms to debounce by.
   */
  __debounceRender(fn, delay = 0) {
    this.__renderDebouncer = __WEBPACK_IMPORTED_MODULE_2__utils_debounce_js__["a" /* Debouncer */].debounce(this.__renderDebouncer, delay > 0 ? __WEBPACK_IMPORTED_MODULE_6__utils_async_js__["b" /* timeOut */].after(delay) : __WEBPACK_IMPORTED_MODULE_6__utils_async_js__["a" /* microTask */], fn.bind(this));
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["a" /* enqueueDebouncer */])(this.__renderDebouncer);
  }

  /**
   * Forces the element to render its content. Normally rendering is
   * asynchronous to a provoking change. This is done for efficiency so
   * that multiple changes trigger only a single render. The render method
   * should be called if, for example, template rendering is required to
   * validate application state.
   */
  render() {
    // Queue this repeater, then flush all in order
    this.__debounceRender(this.__render);
    Object(__WEBPACK_IMPORTED_MODULE_3__utils_flush_js__["b" /* flush */])();
  }

  __render() {
    if (!this.__ensureTemplatized()) {
      // No template found yet
      return;
    }
    this.__applyFullRefresh();
    // Reset the pool
    // TODO(kschaaf): Reuse pool across turns and nested templates
    // Now that objects/arrays are re-evaluated when set, we can safely
    // reuse pooled instances across turns, however we still need to decide
    // semantics regarding how long to hold, how many to hold, etc.
    this.__pool.length = 0;
    // Set rendered item count
    this._setRenderedItemCount(this.__instances.length);
    // Notify users
    this.dispatchEvent(new CustomEvent('dom-change', {
      bubbles: true,
      composed: true
    }));
    // Check to see if we need to render more items
    this.__tryRenderChunk();
  }

  __applyFullRefresh() {
    let items = this.items || [];
    let isntIdxToItemsIdx = new Array(items.length);
    for (let i = 0; i < items.length; i++) {
      isntIdxToItemsIdx[i] = i;
    }
    // Apply user filter
    if (this.__filterFn) {
      isntIdxToItemsIdx = isntIdxToItemsIdx.filter((i, idx, array) => this.__filterFn(items[i], idx, array));
    }
    // Apply user sort
    if (this.__sortFn) {
      isntIdxToItemsIdx.sort((a, b) => this.__sortFn(items[a], items[b]));
    }
    // items->inst map kept for item path forwarding
    const itemsIdxToInstIdx = this.__itemsIdxToInstIdx = {};
    let instIdx = 0;
    // Generate instances and assign items
    const limit = Math.min(isntIdxToItemsIdx.length, this.__limit);
    for (; instIdx < limit; instIdx++) {
      let inst = this.__instances[instIdx];
      let itemIdx = isntIdxToItemsIdx[instIdx];
      let item = items[itemIdx];
      itemsIdxToInstIdx[itemIdx] = instIdx;
      if (inst && instIdx < this.__limit) {
        inst._setPendingProperty(this.as, item);
        inst._setPendingProperty(this.indexAs, instIdx);
        inst._setPendingProperty(this.itemsIndexAs, itemIdx);
        inst._flushProperties();
      } else {
        this.__insertInstance(item, instIdx, itemIdx);
      }
    }
    // Remove any extra instances from previous state
    for (let i = this.__instances.length - 1; i >= instIdx; i--) {
      this.__detachAndRemoveInstance(i);
    }
  }

  __detachInstance(idx) {
    let inst = this.__instances[idx];
    for (let i = 0; i < inst.children.length; i++) {
      let el = inst.children[i];
      inst.root.appendChild(el);
    }
    return inst;
  }

  __attachInstance(idx, parent) {
    let inst = this.__instances[idx];
    parent.insertBefore(inst.root, this);
  }

  __detachAndRemoveInstance(idx) {
    let inst = this.__detachInstance(idx);
    if (inst) {
      this.__pool.push(inst);
    }
    this.__instances.splice(idx, 1);
  }

  __stampInstance(item, instIdx, itemIdx) {
    let model = {};
    model[this.as] = item;
    model[this.indexAs] = instIdx;
    model[this.itemsIndexAs] = itemIdx;
    return new this.__ctor(model);
  }

  __insertInstance(item, instIdx, itemIdx) {
    let inst = this.__pool.pop();
    if (inst) {
      // TODO(kschaaf): If the pool is shared across turns, hostProps
      // need to be re-set to reused instances in addition to item
      inst._setPendingProperty(this.as, item);
      inst._setPendingProperty(this.indexAs, instIdx);
      inst._setPendingProperty(this.itemsIndexAs, itemIdx);
      inst._flushProperties();
    } else {
      inst = this.__stampInstance(item, instIdx, itemIdx);
    }
    let beforeRow = this.__instances[instIdx + 1];
    let beforeNode = beforeRow ? beforeRow.children[0] : this;
    this.parentNode.insertBefore(inst.root, beforeNode);
    this.__instances[instIdx] = inst;
    return inst;
  }

  // Implements extension point from Templatize mixin
  _showHideChildren(hidden) {
    for (let i = 0; i < this.__instances.length; i++) {
      this.__instances[i]._showHideChildren(hidden);
    }
  }

  // Called as a side effect of a host items.<key>.<path> path change,
  // responsible for notifying item.<path> changes to inst for key
  __handleItemPath(path, value) {
    let itemsPath = path.slice(6); // 'items.'.length == 6
    let dot = itemsPath.indexOf('.');
    let itemsIdx = dot < 0 ? itemsPath : itemsPath.substring(0, dot);
    // If path was index into array...
    if (itemsIdx == parseInt(itemsIdx, 10)) {
      let itemSubPath = dot < 0 ? '' : itemsPath.substring(dot + 1);
      // If the path is observed, it will trigger a full refresh
      this.__handleObservedPaths(itemSubPath);
      // Note, even if a rull refresh is triggered, always do the path
      // notification because unless mutableData is used for dom-repeat
      // and all elements in the instance subtree, a full refresh may
      // not trigger the proper update.
      let instIdx = this.__itemsIdxToInstIdx[itemsIdx];
      let inst = this.__instances[instIdx];
      if (inst) {
        let itemPath = this.as + (itemSubPath ? '.' + itemSubPath : '');
        // This is effectively `notifyPath`, but avoids some of the overhead
        // of the public API
        inst._setPendingPropertyOrPath(itemPath, value, false, true);
        inst._flushProperties();
      }
      return true;
    }
  }

  /**
   * Returns the item associated with a given element stamped by
   * this `dom-repeat`.
   *
   * Note, to modify sub-properties of the item,
   * `modelForElement(el).set('item.<sub-prop>', value)`
   * should be used.
   *
   * @param {HTMLElement} el Element for which to return the item.
   * @return {*} Item associated with the element.
   */
  itemForElement(el) {
    let instance = this.modelForElement(el);
    return instance && instance[this.as];
  }

  /**
   * Returns the inst index for a given element stamped by this `dom-repeat`.
   * If `sort` is provided, the index will reflect the sorted order (rather
   * than the original array order).
   *
   * @param {HTMLElement} el Element for which to return the index.
   * @return {*} Row index associated with the element (note this may
   *   not correspond to the array index if a user `sort` is applied).
   */
  indexForElement(el) {
    let instance = this.modelForElement(el);
    return instance && instance[this.indexAs];
  }

  /**
   * Returns the template "model" associated with a given element, which
   * serves as the binding scope for the template instance the element is
   * contained in. A template model is an instance of `Polymer.Base`, and
   * should be used to manipulate data associated with this template instance.
   *
   * Example:
   *
   *   let model = modelForElement(el);
   *   if (model.index < 10) {
   *     model.set('item.checked', true);
   *   }
   *
   * @param {HTMLElement} el Element for which to return a template model.
   * @return {TemplateInstanceBase} Model representing the binding scope for
   *   the element.
   */
  modelForElement(el) {
    return __WEBPACK_IMPORTED_MODULE_1__utils_templatize_js__["b" /* Templatize */].modelForElement(this.template, el);
  }

}

customElements.define(DomRepeat.is, DomRepeat);



/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const REQUEST_ITEM = 'REQUEST_ITEM';
/* harmony export (immutable) */ __webpack_exports__["c"] = REQUEST_ITEM;

const RECEIVE_ITEM = 'RECEIVE_ITEM';
/* harmony export (immutable) */ __webpack_exports__["b"] = RECEIVE_ITEM;

const FAIL_ITEM = 'FAIL_ITEM';
/* harmony export (immutable) */ __webpack_exports__["a"] = FAIL_ITEM;


const fetchItem = item => dispatch => {
  dispatch(requestItem(item.id));
  fetch(`https://node-hnapi.herokuapp.com/item/${item.id}`).then(res => res.json()).then(data => dispatch(receiveItem(item.id, data))).catch(() => dispatch(failItem(item.id)));
};
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchItem;


const fetchItemIfNeeded = item => dispatch => {
  if (item && !item.comments && !item.isFetching) {
    dispatch(fetchItem(item));
  }
};
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchItemIfNeeded;


const requestItem = itemId => {
  return {
    type: REQUEST_ITEM,
    itemId
  };
};

const receiveItem = (itemId, data) => {
  return {
    type: RECEIVE_ITEM,
    itemId,
    data
  };
};

const failItem = itemId => {
  return {
    type: FAIL_ITEM,
    itemId
  };
};

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_favorites_js__ = __webpack_require__(32);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



const favorites = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_favorites_js__["a" /* ADD_FAVORITE */]:
      return _extends({}, state, {
        [action.item.id]: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_favorites_js__["b" /* REMOVE_FAVORITE */]:
      const result = _extends({}, state);
      delete result[action.item.id];
      return result;
    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["a"] = (favorites);

const favoritesSelector = state => state.favorites;
/* harmony export (immutable) */ __webpack_exports__["b"] = favoritesSelector;


/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_favorites_js__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__reducers_favorites_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers_items_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reducers_location_js__ = __webpack_require__(4);






__WEBPACK_IMPORTED_MODULE_3__store_js__["a" /* store */].addReducers({
  favorites: __WEBPACK_IMPORTED_MODULE_1__reducers_favorites_js__["a" /* default */],
  items: __WEBPACK_IMPORTED_MODULE_2__reducers_items_js__["b" /* default */]
});

__WEBPACK_IMPORTED_MODULE_3__store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_0__actions_favorites_js__["d" /* loadFavorites */])());

__WEBPACK_IMPORTED_MODULE_3__store_js__["a" /* store */].subscribe(() => {
  const state = __WEBPACK_IMPORTED_MODULE_3__store_js__["a" /* store */].getState();
  if (Object(__WEBPACK_IMPORTED_MODULE_4__reducers_location_js__["b" /* pageSelector */])(state) === 'item') {
    document.title = Object(__WEBPACK_IMPORTED_MODULE_2__reducers_items_js__["a" /* currentItemSelector */])(state).title;
  }
});

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_store_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_favorites_js__ = __webpack_require__(32);




class HnSummaryElement extends __WEBPACK_IMPORTED_MODULE_0__node_modules_polymer_polymer_polymer_element_js__["a" /* Element */] {
  static get template() {
    return `
    <style>
      :host {
        display: block;
        margin: 1em 0;
      }
    </style>
    <a href$="[[item.url]]">[[item.title]]</a>
    <span class="domain">([[item.domain]])</span>
    <div class="info">
      [[item.points]] points by
      <a href$="[[_getUserHref(item)]]">[[item.user]]</a>
      [[item.time_ago]]
      <span class="spacer">|</span>
      <a href$="[[_getItemHref(item)]]">[[item.comments_count]] comments</a>
      <button hidden$="[[isFavorite]]" on-click="_markItem">Mark</button>
      <button hidden$="[[!isFavorite]]" on-click="_unmarkItem">Unmark</button>
    </div>
    `;
  }

  static get properties() {
    return {
      item: Object,

      isFavorite: Boolean
    };
  }

  _getItemHref(item) {
    return item && item.id ? `/item?id=${item.id}` : null;
  }

  _getUserHref(item) {
    return item && item.user ? `/user?id=${item.user}` : null;
  }

  _markItem() {
    __WEBPACK_IMPORTED_MODULE_1__modules_store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions_favorites_js__["e" /* saveFavorite */])(this.item));
  }

  _unmarkItem() {
    __WEBPACK_IMPORTED_MODULE_1__modules_store_js__["a" /* store */].dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__actions_favorites_js__["c" /* deleteFavorite */])(this.item));
  }
}
/* unused harmony export HnSummaryElement */


customElements.define('hn-summary', HnSummaryElement);

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__items_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__favorites_js__ = __webpack_require__(40);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };







const lists = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["c" /* REQUEST_LIST */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["b" /* RECEIVE_LIST */]:
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["a" /* FAIL_LIST */]:
      const listId = action.listId;
      return _extends({}, state, {
        [listId]: list(state[listId], action)
      });
    default:
      return state;
  }
};

const list = (state = {}, action) => {
  switch (action.type) {
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["c" /* REQUEST_LIST */]:
      return _extends({}, state, {
        id: action.listId,
        failure: false,
        isFetching: true
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["b" /* RECEIVE_LIST */]:
      return _extends({}, state, {
        failure: false,
        isFetching: false,
        items: action.items.map(item => item.id)
      });
    case __WEBPACK_IMPORTED_MODULE_0__actions_lists_js__["a" /* FAIL_LIST */]:
      return _extends({}, state, {
        failure: true,
        isFetching: false
      });
    default:
      return state;
  }
};

/* harmony default export */ __webpack_exports__["c"] = (lists);

const listsSelector = state => state.lists;

const currentListSelector = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__["a" /* createSelector */])(listsSelector, __WEBPACK_IMPORTED_MODULE_4__favorites_js__["b" /* favoritesSelector */], __WEBPACK_IMPORTED_MODULE_2__location_js__["c" /* splitPathnameSelector */], (lists, favorites, splitPath) => {
  switch (splitPath[0]) {
    case '':
      return lists['news'] || { id: 'news' };
    case 'new':
      return lists['newest'] || { id: 'newest' };
    case 'ask':
    case 'show':
    case 'jobs':
      return lists[splitPath[0]] || { id: splitPath[0] };
    case 'favorites':
      return { id: 'favorites', items: Object.keys(favorites).map(id => parseInt(id, 10)) };
    default:
      return null;
  }
});
/* harmony export (immutable) */ __webpack_exports__["b"] = currentListSelector;


const currentItemsSelector = Object(__WEBPACK_IMPORTED_MODULE_1__node_modules_reselect_src_index_js__["a" /* createSelector */])(currentListSelector, __WEBPACK_IMPORTED_MODULE_3__items_js__["c" /* itemsSelector */], (list, items) => {
  return list && list.items ? list.items.map(id => items[id] || { id }) : null;
});
/* harmony export (immutable) */ __webpack_exports__["a"] = currentItemsSelector;


/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const REQUEST_LIST = 'REQUEST_LIST';
/* harmony export (immutable) */ __webpack_exports__["c"] = REQUEST_LIST;

const RECEIVE_LIST = 'RECEIVE_LIST';
/* harmony export (immutable) */ __webpack_exports__["b"] = RECEIVE_LIST;

const FAIL_LIST = 'FAIL_LIST';
/* harmony export (immutable) */ __webpack_exports__["a"] = FAIL_LIST;


const fetchList = list => dispatch => {
  dispatch(requestList(list.id));
  fetch(`https://node-hnapi.herokuapp.com/${list.id}`).then(res => res.json()).then(items => dispatch(receiveList(list.id, items))).catch(() => dispatch(failList(list.id)));
};
/* harmony export (immutable) */ __webpack_exports__["d"] = fetchList;


const fetchListIfNeeded = list => dispatch => {
  if (list && !list.items && !list.isFetching) {
    dispatch(fetchList(list));
  }
};
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchListIfNeeded;


const requestList = listId => {
  return {
    type: REQUEST_LIST,
    listId
  };
};

const receiveList = (listId, items) => {
  return {
    type: RECEIVE_LIST,
    listId,
    items
  };
};

const failList = listId => {
  return {
    type: FAIL_LIST,
    listId
  };
};

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__reducers_lists_js__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__reducers_location_js__ = __webpack_require__(4);




__WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].addReducers({
  lists: __WEBPACK_IMPORTED_MODULE_0__reducers_lists_js__["c" /* default */]
});

__WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].subscribe(() => {
  const state = __WEBPACK_IMPORTED_MODULE_1__store_js__["a" /* store */].getState();
  if (Object(__WEBPACK_IMPORTED_MODULE_2__reducers_location_js__["b" /* pageSelector */])(state) === 'list') {
    document.title = Object(__WEBPACK_IMPORTED_MODULE_0__reducers_lists_js__["b" /* currentListSelector */])(state).id;
  }
});

/***/ })

});