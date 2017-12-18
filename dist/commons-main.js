webpackJsonp([0],{

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateInstanceBase = exports.Templatize = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

__webpack_require__(0);

var _propertyEffects = __webpack_require__(17);

var _mutableData = __webpack_require__(39);

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Base class for HTMLTemplateElement extension that has property effects
// machinery for propagating host properties to children. This is an ES5
// class only because Babel (incorrectly) requires super() in the class
// constructor even though no `this` is used and it returns an instance.
var newInstance = null;
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
var DataTemplate = (0, _propertyEffects.PropertyEffects)(HTMLTemplateElementExtension);
/**
 * @constructor
 * @implements {Polymer_MutableData}
 * @extends {DataTemplate}
 */
var MutableDataTemplate = (0, _mutableData.MutableData)(DataTemplate);

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
var base = (0, _propertyEffects.PropertyEffects)(function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  return _class;
}());

/**
 * @polymer
 * @customElement
 * @appliesMixin Polymer.PropertyEffects
 * @unrestricted
 */

var TemplateInstanceBase = function (_base) {
  _inherits(TemplateInstanceBase, _base);

  function TemplateInstanceBase(props) {
    _classCallCheck(this, TemplateInstanceBase);

    var _this = _possibleConstructorReturn(this, (TemplateInstanceBase.__proto__ || Object.getPrototypeOf(TemplateInstanceBase)).call(this));

    _this._configureProperties(props);
    _this.root = _this._stampTemplate(_this.__dataHost);
    // Save list of stamped children
    var children = _this.children = [];
    for (var n = _this.root.firstChild; n; n = n.nextSibling) {
      children.push(n);
      n.__templatizeInstance = _this;
    }
    if (_this.__templatizeOwner.__hideTemplateChildren__) {
      _this._showHideChildren(true);
    }
    // Flush props only when props are passed if instance props exist
    // or when there isn't instance props.
    var options = _this.__templatizeOptions;
    if (props && options.instanceProps || !options.instanceProps) {
      _this._enableProperties();
    }
    return _this;
  }
  /**
   * Configure the given `props` by calling `_setPendingProperty`. Also
   * sets any properties stored in `__hostProps`.
   * @private
   * @param {Object} props Object of property name-value pairs to set.
   */


  _createClass(TemplateInstanceBase, [{
    key: '_configureProperties',
    value: function _configureProperties(props) {
      var options = this.__templatizeOptions;
      if (props) {
        for (var iprop in options.instanceProps) {
          if (iprop in props) {
            this._setPendingProperty(iprop, props[iprop]);
          }
        }
      }
      for (var hprop in this.__hostProps) {
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

  }, {
    key: 'forwardHostProp',
    value: function forwardHostProp(prop, value) {
      if (this._setPendingPropertyOrPath(prop, value, false, true)) {
        this.__dataHost._enqueueClient(this);
      }
    }
    /**
     * @override
     */

  }, {
    key: '_addEventListenerToNode',
    value: function _addEventListenerToNode(node, eventName, handler) {
      var _this2 = this;

      if (this._methodHost && this.__templatizeOptions.parentModel) {
        // If this instance should be considered a parent model, decorate
        // events this template instance as `model`
        this._methodHost._addEventListenerToNode(node, eventName, function (e) {
          e.model = _this2;
          handler(e);
        });
      } else {
        // Otherwise delegate to the template's host (which could be)
        // another template instance
        var templateHost = this.__dataHost.__dataHost;
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

  }, {
    key: '_showHideChildren',
    value: function _showHideChildren(hide) {
      var c = this.children;
      for (var i = 0; i < c.length; i++) {
        var n = c[i];
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

  }, {
    key: '_setUnmanagedPropertyToNode',
    value: function _setUnmanagedPropertyToNode(node, prop, value) {
      if (node.__hideTemplateChildren__ && node.nodeType == Node.TEXT_NODE && prop == 'textContent') {
        node.__polymerTextContent__ = value;
      } else {
        _get(TemplateInstanceBase.prototype.__proto__ || Object.getPrototypeOf(TemplateInstanceBase.prototype), '_setUnmanagedPropertyToNode', this).call(this, node, prop, value);
      }
    }
    /**
     * Find the parent model of this template instance.  The parent model
     * is either another templatize instance that had option `parentModel: true`,
     * or else the host element.
     *
     * @return {Polymer_PropertyEffects} The parent model of this instance
     */

  }, {
    key: 'parentModel',
    get: function get() {
      var model = this.__parentModel;
      if (!model) {
        var options = void 0;
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
  }]);

  return TemplateInstanceBase;
}(base);

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
var MutableTemplateInstanceBase = (0, _mutableData.MutableData)(TemplateInstanceBase);

function findMethodHost(template) {
  // Technically this should be the owner of the outermost template.
  // In shadow dom, this is always getRootNode().host, but we can
  // approximate this via cooperation with our dataHost always setting
  // `_methodHost` as long as there were bindings (or id's) on this
  // instance causing it to get a dataHost.
  var templateHost = template.__dataHost;
  return templateHost && templateHost._methodHost || templateHost;
}

/* eslint-disable valid-jsdoc */
/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function createTemplatizerClass(template, templateInfo, options) {
  // Anonymous class created by the templatize
  var base = options.mutableData ? MutableTemplateInstanceBase : TemplateInstanceBase;
  /**
   * @constructor
   * @extends {base}
   */
  var klass = function (_base2) {
    _inherits(klass, _base2);

    function klass() {
      _classCallCheck(this, klass);

      return _possibleConstructorReturn(this, (klass.__proto__ || Object.getPrototypeOf(klass)).apply(this, arguments));
    }

    return klass;
  }(base);
  klass.prototype.__templatizeOptions = options;
  klass.prototype._bindTemplate(template);
  addNotifyEffects(klass, template, templateInfo, options);
  return klass;
}

/**
 * @suppress {missingProperties} class.prototype is not defined for some reason
 */
function addPropagateEffects(template, templateInfo, options) {
  var userForwardHostProp = options.forwardHostProp;
  if (userForwardHostProp) {
    // Provide data API and property effects on memoized template class
    var klass = templateInfo.templatizeTemplateClass;
    if (!klass) {
      var _base3 = options.mutableData ? MutableDataTemplate : DataTemplate;
      klass = templateInfo.templatizeTemplateClass = function (_base4) {
        _inherits(TemplatizedTemplate, _base4);

        function TemplatizedTemplate() {
          _classCallCheck(this, TemplatizedTemplate);

          return _possibleConstructorReturn(this, (TemplatizedTemplate.__proto__ || Object.getPrototypeOf(TemplatizedTemplate)).apply(this, arguments));
        }

        return TemplatizedTemplate;
      }(_base3);
      // Add template - >instances effects
      // and host <- template effects
      var hostProps = templateInfo.hostProps;
      for (var prop in hostProps) {
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
  var hostProps = templateInfo.hostProps || {};
  for (var iprop in options.instanceProps) {
    delete hostProps[iprop];
    var userNotifyInstanceProp = options.notifyInstanceProp;
    if (userNotifyInstanceProp) {
      klass.prototype._addPropertyEffect(iprop, klass.prototype.PROPERTY_EFFECT_TYPES.NOTIFY, { fn: createNotifyInstancePropEffect(iprop, userNotifyInstanceProp) });
    }
  }
  if (options.forwardHostProp && template.__dataHost) {
    for (var hprop in hostProps) {
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

var Templatize = {

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
  templatize: function templatize(template, owner, options) {
    options = /** @type {!TemplatizeOptions} */options || {};
    if (template.__templatizeOwner) {
      throw new Error('A <template> can only be templatized once');
    }
    template.__templatizeOwner = owner;
    var templateInfo = owner.constructor._parseTemplate(template);
    // Get memoized base class for the prototypical template, which
    // includes property effects for binding template & forwarding
    var baseClass = templateInfo.templatizeInstanceClass;
    if (!baseClass) {
      baseClass = createTemplatizerClass(template, templateInfo, options);
      templateInfo.templatizeInstanceClass = baseClass;
    }
    // Host property forwarding must be installed onto template instance
    addPropagateEffects(template, templateInfo, options);
    // Subclass base class and add reference for this specific template
    var klass = function (_baseClass) {
      _inherits(TemplateInstance, _baseClass);

      function TemplateInstance() {
        _classCallCheck(this, TemplateInstance);

        return _possibleConstructorReturn(this, (TemplateInstance.__proto__ || Object.getPrototypeOf(TemplateInstance)).apply(this, arguments));
      }

      return TemplateInstance;
    }(baseClass);
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
  modelForElement: function modelForElement(template, node) {
    var model = void 0;
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

exports.Templatize = Templatize;
exports.TemplateInstanceBase = TemplateInstanceBase;

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionalMutableData = exports.MutableData = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mixin = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Common implementation for mixin & behavior
function mutablePropertyChange(inst, property, value, old, mutableData) {
  var isObject = void 0;
  if (mutableData) {
    isObject = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null;
    // Pull `old` for Objects from temp cache, but treat `null` as a primitive
    if (isObject) {
      old = inst.__dataTemp[property];
    }
  }
  // Strict equality check, but return false for NaN===NaN
  var shouldChange = old !== value && (old === old || value === value);
  // Objects are stored in temporary cache (cleared at end of
  // turn), which is used for dirty-checking
  if (isObject && shouldChange) {
    inst.__dataTemp[property] = value;
  }
  return shouldChange;
}

var MutableData = exports.MutableData = (0, _mixin.dedupingMixin)(function (superClass) {

  /**
   * @polymer
   * @mixinClass
   * @implements {Polymer_MutableData}
   */
  var MutableData = function (_superClass) {
    _inherits(MutableData, _superClass);

    function MutableData() {
      _classCallCheck(this, MutableData);

      return _possibleConstructorReturn(this, (MutableData.__proto__ || Object.getPrototypeOf(MutableData)).apply(this, arguments));
    }

    _createClass(MutableData, [{
      key: '_shouldPropertyChange',

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
      value: function _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, true);
      }
    }]);

    return MutableData;
  }(superClass);
  /** @type {boolean} */


  MutableData.prototype.mutableData = false;

  return MutableData;
});

var OptionalMutableData = exports.OptionalMutableData = (0, _mixin.dedupingMixin)(function (superClass) {

  /**
   * @mixinClass
   * @polymer
   * @implements {Polymer_OptionalMutableData}
   */
  var OptionalMutableData = function (_superClass2) {
    _inherits(OptionalMutableData, _superClass2);

    function OptionalMutableData() {
      _classCallCheck(this, OptionalMutableData);

      return _possibleConstructorReturn(this, (OptionalMutableData.__proto__ || Object.getPrototypeOf(OptionalMutableData)).apply(this, arguments));
    }

    _createClass(OptionalMutableData, [{
      key: '_shouldPropertyChange',


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
      value: function _shouldPropertyChange(property, value, old) {
        return mutablePropertyChange(this, property, value, old, this.mutableData);
      }
    }], [{
      key: 'properties',
      get: function get() {
        return {
          /**
           * Instance-level flag for configuring the dirty-checking strategy
           * for this element.  When true, Objects and Arrays will skip dirty
           * checking, otherwise strict equality checking will be used.
           */
          mutableData: Boolean
        };
      }
    }]);

    return OptionalMutableData;
  }(superClass);

  return OptionalMutableData;
});

// Export for use by legacy behavior
MutableData._mutablePropertyChange = mutablePropertyChange;

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Debouncer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(0);

__webpack_require__(1);

__webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** @typedef {{run: function(function(), number=):number, cancel: function(number)}} */
var AsyncModule = void 0; // eslint-disable-line no-unused-vars

/**
 * @summary Collapse multiple callbacks into one invocation after a timer.
 * @memberof Polymer
 */

var Debouncer = function () {
  function Debouncer() {
    _classCallCheck(this, Debouncer);

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


  _createClass(Debouncer, [{
    key: 'setConfig',
    value: function setConfig(asyncModule, callback) {
      var _this = this;

      this._asyncModule = asyncModule;
      this._callback = callback;
      this._timer = this._asyncModule.run(function () {
        _this._timer = null;
        _this._callback();
      });
    }
    /**
     * Cancels an active debouncer and returns a reference to itself.
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      if (this.isActive()) {
        this._asyncModule.cancel(this._timer);
        this._timer = null;
      }
    }
    /**
     * Flushes an active debouncer and returns a reference to itself.
     */

  }, {
    key: 'flush',
    value: function flush() {
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

  }, {
    key: 'isActive',
    value: function isActive() {
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

  }], [{
    key: 'debounce',
    value: function debounce(debouncer, asyncModule, callback) {
      if (debouncer instanceof Debouncer) {
        debouncer.cancel();
      } else {
        debouncer = new Debouncer();
      }
      debouncer.setConfig(asyncModule, callback);
      return debouncer;
    }
  }]);

  return Debouncer;
}();

exports.Debouncer = Debouncer;

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flush = exports.enqueueDebouncer = undefined;

__webpack_require__(0);

var debouncerQueue = [];

var enqueueDebouncer = exports.enqueueDebouncer = function enqueueDebouncer(debouncer) {
  debouncerQueue.push(debouncer);
};

function flushDebouncers() {
  var didFlush = Boolean(debouncerQueue.length);
  while (debouncerQueue.length) {
    try {
      debouncerQueue.shift().flush();
    } catch (e) {
      setTimeout(function () {
        throw e;
      });
    }
  }
  return didFlush;
}

var flush = exports.flush = function flush() {
  var shadyDOM = void 0,
      debouncers = void 0;
  do {
    shadyDOM = window.ShadyDOM && ShadyDOM.flush();
    if (window.ShadyCSS && window.ShadyCSS.ScopingShim) {
      window.ShadyCSS.ScopingShim.flush();
    }
    debouncers = flushDebouncers();
  } while (shadyDOM || debouncers);
};

/***/ })

});