webpackJsonp([1],{

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ADD_FAVORITE = exports.ADD_FAVORITE = 'ADD_FAVORITE';
var REMOVE_FAVORITE = exports.REMOVE_FAVORITE = 'REMOVE_FAVORITE';

var dbPromise = window.dbPromise = new Promise(function (resolve, reject) {
  var openRequest = window.indexedDB.open('favorites', 5);
  openRequest.onsuccess = function (event) {
    resolve(event.target.result);
  };
  openRequest.onupgradeneeded = function (event) {
    event.target.result.createObjectStore('favorites', { keyPath: 'id' });
  };
  openRequest.onerror = function (error) {
    reject(error);
  };
});

var saveFavorite = exports.saveFavorite = function saveFavorite(item) {
  return function (dispatch) {
    dbPromise.then(function (db) {
      var transaction = db.transaction(['favorites'], 'readwrite');
      var objectStore = transaction.objectStore('favorites');
      var objectStoreRequest = objectStore.add({
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
      objectStoreRequest.onsuccess = function () {
        dispatch(addFavorite(item));
      };
    });
  };
};

var addFavorite = function addFavorite(item) {
  return function (dispatch) {
    dispatch({
      type: ADD_FAVORITE,
      item: item
    });
  };
};

var deleteFavorite = exports.deleteFavorite = function deleteFavorite(item) {
  return function (dispatch) {
    dbPromise.then(function (db) {
      var transaction = db.transaction(['favorites'], 'readwrite');
      var objectStore = transaction.objectStore('favorites');
      var objectStoreRequest = objectStore.delete(item.id);
      objectStoreRequest.onsuccess = function () {
        dispatch({
          type: REMOVE_FAVORITE,
          item: item
        });
      };
    });
  };
};

var loaded = false;

var loadFavorites = exports.loadFavorites = function loadFavorites() {
  return function (dispatch) {
    if (loaded) return;
    loaded = true;
    dbPromise.then(function (db) {
      var objectStore = db.transaction('favorites').objectStore('favorites');
      objectStore.openCursor().onsuccess = function (event) {
        var cursor = event.target.result;
        if (cursor) {
          dispatch(addFavorite(cursor.value));
          cursor.continue();
        }
      };
    });
  };
};

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomRepeat = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polymerElement = __webpack_require__(10);

var _templatize = __webpack_require__(38);

var _debounce = __webpack_require__(40);

var _flush = __webpack_require__(41);

var _mutableData = __webpack_require__(39);

var _path = __webpack_require__(16);

var _async = __webpack_require__(13);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TemplateInstanceBase = _templatize.TemplateInstanceBase; // eslint-disable-line

/**
 * @constructor
 * @implements {Polymer_OptionalMutableData}
 * @extends {Polymer.Element}
 */
var domRepeatBase = (0, _mutableData.OptionalMutableData)(_polymerElement.Element);

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

var DomRepeat = function (_domRepeatBase) {
  _inherits(DomRepeat, _domRepeatBase);

  _createClass(DomRepeat, null, [{
    key: 'is',


    // Not needed to find template; can be removed once the analyzer
    // can find the tag name from customElements.define call
    get: function get() {
      return 'dom-repeat';
    }
  }, {
    key: 'template',
    get: function get() {
      return null;
    }
  }, {
    key: 'properties',
    get: function get() {

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
  }, {
    key: 'observers',
    get: function get() {
      return ['__itemsChanged(items.*)'];
    }
  }]);

  function DomRepeat() {
    _classCallCheck(this, DomRepeat);

    var _this = _possibleConstructorReturn(this, (DomRepeat.__proto__ || Object.getPrototypeOf(DomRepeat)).call(this));

    _this.__instances = [];
    _this.__limit = Infinity;
    _this.__pool = [];
    _this.__renderDebouncer = null;
    _this.__itemsIdxToInstIdx = {};
    _this.__chunkCount = null;
    _this.__lastChunkTime = null;
    _this.__sortFn = null;
    _this.__filterFn = null;
    _this.__observePaths = null;
    _this.__ctor = null;
    _this.__isDetached = true;
    _this.template = null;
    return _this;
  }

  _createClass(DomRepeat, [{
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {
      _get(DomRepeat.prototype.__proto__ || Object.getPrototypeOf(DomRepeat.prototype), 'disconnectedCallback', this).call(this);
      this.__isDetached = true;
      for (var i = 0; i < this.__instances.length; i++) {
        this.__detachInstance(i);
      }
    }
  }, {
    key: 'connectedCallback',
    value: function connectedCallback() {
      _get(DomRepeat.prototype.__proto__ || Object.getPrototypeOf(DomRepeat.prototype), 'connectedCallback', this).call(this);
      // only perform attachment if the element was previously detached.
      if (this.__isDetached) {
        this.__isDetached = false;
        var parent = this.parentNode;
        for (var i = 0; i < this.__instances.length; i++) {
          this.__attachInstance(i, parent);
        }
      }
    }
  }, {
    key: '__ensureTemplatized',
    value: function __ensureTemplatized() {
      var _this2 = this;

      // Templatizing (generating the instance constructor) needs to wait
      // until ready, since won't have its template content handed back to
      // it until then
      if (!this.__ctor) {
        var template = this.template = this.querySelector('template');
        if (!template) {
          // // Wait until childList changes and template should be there by then
          var observer = new MutationObserver(function () {
            if (_this2.querySelector('template')) {
              observer.disconnect();
              _this2.__render();
            } else {
              throw new Error('dom-repeat requires a <template> child');
            }
          });
          observer.observe(this, { childList: true });
          return false;
        }
        // Template instance props that should be excluded from forwarding
        var instanceProps = {};
        instanceProps[this.as] = true;
        instanceProps[this.indexAs] = true;
        instanceProps[this.itemsIndexAs] = true;
        this.__ctor = _templatize.Templatize.templatize(template, this, {
          mutableData: this.mutableData,
          parentModel: true,
          instanceProps: instanceProps,
          /**
           * @this {this}
           * @param {string} prop Property to set
           * @param {*} value Value to set property to
           */
          forwardHostProp: function forwardHostProp(prop, value) {
            var i$ = this.__instances;
            for (var i = 0, inst; i < i$.length && (inst = i$[i]); i++) {
              inst.forwardHostProp(prop, value);
            }
          },
          /**
           * @this {this}
           * @param {Object} inst Instance to notify
           * @param {string} prop Property to notify
           * @param {*} value Value to notify
           */
          notifyInstanceProp: function notifyInstanceProp(inst, prop, value) {
            if ((0, _path.matches)(this.as, prop)) {
              var idx = inst[this.itemsIndexAs];
              if (prop == this.as) {
                this.items[idx] = value;
              }
              var path = (0, _path.translate)(this.as, 'items.' + idx, prop);
              this.notifyPath(path, value);
            }
          }
        });
      }
      return true;
    }
  }, {
    key: '__getMethodHost',
    value: function __getMethodHost() {
      // Technically this should be the owner of the outermost template.
      // In shadow dom, this is always getRootNode().host, but we can
      // approximate this via cooperation with our dataHost always setting
      // `_methodHost` as long as there were bindings (or id's) on this
      // instance causing it to get a dataHost.
      return this.__dataHost._methodHost || this.__dataHost;
    }
  }, {
    key: '__sortChanged',
    value: function __sortChanged(sort) {
      var methodHost = this.__getMethodHost();
      this.__sortFn = sort && (typeof sort == 'function' ? sort : function () {
        return methodHost[sort].apply(methodHost, arguments);
      });
      if (this.items) {
        this.__debounceRender(this.__render);
      }
    }
  }, {
    key: '__filterChanged',
    value: function __filterChanged(filter) {
      var methodHost = this.__getMethodHost();
      this.__filterFn = filter && (typeof filter == 'function' ? filter : function () {
        return methodHost[filter].apply(methodHost, arguments);
      });
      if (this.items) {
        this.__debounceRender(this.__render);
      }
    }
  }, {
    key: '__computeFrameTime',
    value: function __computeFrameTime(rate) {
      return Math.ceil(1000 / rate);
    }
  }, {
    key: '__initializeChunking',
    value: function __initializeChunking() {
      if (this.initialCount) {
        this.__limit = this.initialCount;
        this.__chunkCount = this.initialCount;
        this.__lastChunkTime = performance.now();
      }
    }
  }, {
    key: '__tryRenderChunk',
    value: function __tryRenderChunk() {
      // Debounced so that multiple calls through `_render` between animation
      // frames only queue one new rAF (e.g. array mutation & chunked render)
      if (this.items && this.__limit < this.items.length) {
        this.__debounceRender(this.__requestRenderChunk);
      }
    }
  }, {
    key: '__requestRenderChunk',
    value: function __requestRenderChunk() {
      var _this3 = this;

      requestAnimationFrame(function () {
        return _this3.__renderChunk();
      });
    }
  }, {
    key: '__renderChunk',
    value: function __renderChunk() {
      // Simple auto chunkSize throttling algorithm based on feedback loop:
      // measure actual time between frames and scale chunk count by ratio
      // of target/actual frame time
      var currChunkTime = performance.now();
      var ratio = this._targetFrameTime / (currChunkTime - this.__lastChunkTime);
      this.__chunkCount = Math.round(this.__chunkCount * ratio) || 1;
      this.__limit += this.__chunkCount;
      this.__lastChunkTime = currChunkTime;
      this.__debounceRender(this.__render);
    }
  }, {
    key: '__observeChanged',
    value: function __observeChanged() {
      this.__observePaths = this.observe && this.observe.replace('.*', '.').split(' ');
    }
  }, {
    key: '__itemsChanged',
    value: function __itemsChanged(change) {
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
  }, {
    key: '__handleObservedPaths',
    value: function __handleObservedPaths(path) {
      if (this.__observePaths) {
        path = path.substring(path.indexOf('.') + 1);
        var paths = this.__observePaths;
        for (var i = 0; i < paths.length; i++) {
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

  }, {
    key: '__debounceRender',
    value: function __debounceRender(fn) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.__renderDebouncer = _debounce.Debouncer.debounce(this.__renderDebouncer, delay > 0 ? _async.timeOut.after(delay) : _async.microTask, fn.bind(this));
      (0, _flush.enqueueDebouncer)(this.__renderDebouncer);
    }

    /**
     * Forces the element to render its content. Normally rendering is
     * asynchronous to a provoking change. This is done for efficiency so
     * that multiple changes trigger only a single render. The render method
     * should be called if, for example, template rendering is required to
     * validate application state.
     */

  }, {
    key: 'render',
    value: function render() {
      // Queue this repeater, then flush all in order
      this.__debounceRender(this.__render);
      (0, _flush.flush)();
    }
  }, {
    key: '__render',
    value: function __render() {
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
  }, {
    key: '__applyFullRefresh',
    value: function __applyFullRefresh() {
      var _this4 = this;

      var items = this.items || [];
      var isntIdxToItemsIdx = new Array(items.length);
      for (var i = 0; i < items.length; i++) {
        isntIdxToItemsIdx[i] = i;
      }
      // Apply user filter
      if (this.__filterFn) {
        isntIdxToItemsIdx = isntIdxToItemsIdx.filter(function (i, idx, array) {
          return _this4.__filterFn(items[i], idx, array);
        });
      }
      // Apply user sort
      if (this.__sortFn) {
        isntIdxToItemsIdx.sort(function (a, b) {
          return _this4.__sortFn(items[a], items[b]);
        });
      }
      // items->inst map kept for item path forwarding
      var itemsIdxToInstIdx = this.__itemsIdxToInstIdx = {};
      var instIdx = 0;
      // Generate instances and assign items
      var limit = Math.min(isntIdxToItemsIdx.length, this.__limit);
      for (; instIdx < limit; instIdx++) {
        var inst = this.__instances[instIdx];
        var itemIdx = isntIdxToItemsIdx[instIdx];
        var item = items[itemIdx];
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
      for (var _i = this.__instances.length - 1; _i >= instIdx; _i--) {
        this.__detachAndRemoveInstance(_i);
      }
    }
  }, {
    key: '__detachInstance',
    value: function __detachInstance(idx) {
      var inst = this.__instances[idx];
      for (var i = 0; i < inst.children.length; i++) {
        var el = inst.children[i];
        inst.root.appendChild(el);
      }
      return inst;
    }
  }, {
    key: '__attachInstance',
    value: function __attachInstance(idx, parent) {
      var inst = this.__instances[idx];
      parent.insertBefore(inst.root, this);
    }
  }, {
    key: '__detachAndRemoveInstance',
    value: function __detachAndRemoveInstance(idx) {
      var inst = this.__detachInstance(idx);
      if (inst) {
        this.__pool.push(inst);
      }
      this.__instances.splice(idx, 1);
    }
  }, {
    key: '__stampInstance',
    value: function __stampInstance(item, instIdx, itemIdx) {
      var model = {};
      model[this.as] = item;
      model[this.indexAs] = instIdx;
      model[this.itemsIndexAs] = itemIdx;
      return new this.__ctor(model);
    }
  }, {
    key: '__insertInstance',
    value: function __insertInstance(item, instIdx, itemIdx) {
      var inst = this.__pool.pop();
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
      var beforeRow = this.__instances[instIdx + 1];
      var beforeNode = beforeRow ? beforeRow.children[0] : this;
      this.parentNode.insertBefore(inst.root, beforeNode);
      this.__instances[instIdx] = inst;
      return inst;
    }

    // Implements extension point from Templatize mixin

  }, {
    key: '_showHideChildren',
    value: function _showHideChildren(hidden) {
      for (var i = 0; i < this.__instances.length; i++) {
        this.__instances[i]._showHideChildren(hidden);
      }
    }

    // Called as a side effect of a host items.<key>.<path> path change,
    // responsible for notifying item.<path> changes to inst for key

  }, {
    key: '__handleItemPath',
    value: function __handleItemPath(path, value) {
      var itemsPath = path.slice(6); // 'items.'.length == 6
      var dot = itemsPath.indexOf('.');
      var itemsIdx = dot < 0 ? itemsPath : itemsPath.substring(0, dot);
      // If path was index into array...
      if (itemsIdx == parseInt(itemsIdx, 10)) {
        var itemSubPath = dot < 0 ? '' : itemsPath.substring(dot + 1);
        // If the path is observed, it will trigger a full refresh
        this.__handleObservedPaths(itemSubPath);
        // Note, even if a rull refresh is triggered, always do the path
        // notification because unless mutableData is used for dom-repeat
        // and all elements in the instance subtree, a full refresh may
        // not trigger the proper update.
        var instIdx = this.__itemsIdxToInstIdx[itemsIdx];
        var inst = this.__instances[instIdx];
        if (inst) {
          var itemPath = this.as + (itemSubPath ? '.' + itemSubPath : '');
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

  }, {
    key: 'itemForElement',
    value: function itemForElement(el) {
      var instance = this.modelForElement(el);
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

  }, {
    key: 'indexForElement',
    value: function indexForElement(el) {
      var instance = this.modelForElement(el);
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

  }, {
    key: 'modelForElement',
    value: function modelForElement(el) {
      return _templatize.Templatize.modelForElement(this.template, el);
    }
  }]);

  return DomRepeat;
}(domRepeatBase);

customElements.define(DomRepeat.is, DomRepeat);

exports.DomRepeat = DomRepeat;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currentItemSelector = exports.itemsSelector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// HACK: Don't need to import list actions just for this.
// import { RECEIVE_LIST } from '../actions/lists.js';


var _items = __webpack_require__(43);

var _favorites = __webpack_require__(34);

var _index = __webpack_require__(14);

var _location = __webpack_require__(4);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var items = function items() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _items.REQUEST_ITEM:
    case _items.RECEIVE_ITEM:
    case _items.FAIL_ITEM:
      var itemId = action.itemId;
      return _extends({}, state, _defineProperty({}, itemId, item(state[itemId], action)));
    case 'RECEIVE_LIST':
      return action.items.reduce(function (obj, item) {
        obj[item.id] = item;
        return obj;
      }, _extends({}, state));
    case _favorites.ADD_FAVORITE:
      return _extends({}, state, _defineProperty({}, action.item.id, action.item));
    default:
      return state;
  }
};

var item = function item() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _items.REQUEST_ITEM:
      return _extends({}, state, {
        id: action.itemId,
        failure: false,
        isFetching: true
      });
    case _items.RECEIVE_ITEM:
      return _extends({}, state, {
        failure: false,
        isFetching: false
      }, action.data);
    case _items.FAIL_ITEM:
      return _extends({}, state, {
        failure: true,
        isFetching: false
      });
    default:
      return state;
  }
};

exports.default = items;
var itemsSelector = exports.itemsSelector = function itemsSelector(state) {
  return state.items;
};

var currentItemSelector = exports.currentItemSelector = (0, _index.createSelector)(itemsSelector, _location.splitPathnameSelector, _location.urlSearchParamsSelector, function (items, splitPath, params) {
  switch (splitPath[0]) {
    case 'item':
      var id = params.get('id');
      return items[id] || { id: id };
    default:
      return null;
  }
});

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.favoritesSelector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _favorites = __webpack_require__(34);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var favorites = function favorites() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _favorites.ADD_FAVORITE:
      return _extends({}, state, _defineProperty({}, action.item.id, true));
    case _favorites.REMOVE_FAVORITE:
      var result = _extends({}, state);
      delete result[action.item.id];
      return result;
    default:
      return state;
  }
};

exports.default = favorites;
var favoritesSelector = exports.favoritesSelector = function favoritesSelector(state) {
  return state.favorites;
};

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var REQUEST_ITEM = exports.REQUEST_ITEM = 'REQUEST_ITEM';
var RECEIVE_ITEM = exports.RECEIVE_ITEM = 'RECEIVE_ITEM';
var FAIL_ITEM = exports.FAIL_ITEM = 'FAIL_ITEM';

var fetchItem = exports.fetchItem = function fetchItem(item) {
  return function (dispatch) {
    dispatch(requestItem(item.id));
    fetch('https://node-hnapi.herokuapp.com/item/' + item.id).then(function (res) {
      return res.json();
    }).then(function (data) {
      return dispatch(receiveItem(item.id, data));
    }).catch(function () {
      return dispatch(failItem(item.id));
    });
  };
};

var fetchItemIfNeeded = exports.fetchItemIfNeeded = function fetchItemIfNeeded(item) {
  return function (dispatch) {
    if (item && !item.comments && !item.isFetching) {
      dispatch(fetchItem(item));
    }
  };
};

var requestItem = function requestItem(itemId) {
  return {
    type: REQUEST_ITEM,
    itemId: itemId
  };
};

var receiveItem = function receiveItem(itemId, data) {
  return {
    type: RECEIVE_ITEM,
    itemId: itemId,
    data: data
  };
};

var failItem = function failItem(itemId) {
  return {
    type: FAIL_ITEM,
    itemId: itemId
  };
};

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HnSummaryElement = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _polymerElement = __webpack_require__(10);

var _store = __webpack_require__(12);

var _favorites = __webpack_require__(34);

var _sharedStyles = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HnSummaryElement = exports.HnSummaryElement = function (_PolymerElement) {
  _inherits(HnSummaryElement, _PolymerElement);

  function HnSummaryElement() {
    _classCallCheck(this, HnSummaryElement);

    return _possibleConstructorReturn(this, (HnSummaryElement.__proto__ || Object.getPrototypeOf(HnSummaryElement)).apply(this, arguments));
  }

  _createClass(HnSummaryElement, [{
    key: '_getItemHref',
    value: function _getItemHref(item) {
      return item && item.id ? '/item?id=' + item.id : null;
    }
  }, {
    key: '_getUserHref',
    value: function _getUserHref(item) {
      return item && item.user ? '/user?id=' + item.user : null;
    }
  }, {
    key: '_markItem',
    value: function _markItem() {
      _store.store.dispatch((0, _favorites.saveFavorite)(this.item));
    }
  }, {
    key: '_unmarkItem',
    value: function _unmarkItem() {
      _store.store.dispatch((0, _favorites.deleteFavorite)(this.item));
    }
  }], [{
    key: 'template',
    get: function get() {
      return '\n    ' + _sharedStyles.sharedStyles + '\n    <style>\n      :host {\n        display: block;\n        margin: 1em 0;\n      }\n    </style>\n    <a href$="[[item.url]]">[[item.title]]</a>\n    <span class="domain">([[item.domain]])</span>\n    <div class="info">\n      [[item.points]] points by\n      <a href$="[[_getUserHref(item)]]">[[item.user]]</a>\n      [[item.time_ago]]\n      <span class="spacer">|</span>\n      <a href$="[[_getItemHref(item)]]">[[item.comments_count]] comments</a>\n      <button hidden$="[[isFavorite]]" on-click="_markItem">Mark</button>\n      <button hidden$="[[!isFavorite]]" on-click="_unmarkItem">Unmark</button>\n    </div>\n    ';
    }
  }, {
    key: 'properties',
    get: function get() {
      return {
        item: Object,

        isFavorite: Boolean
      };
    }
  }]);

  return HnSummaryElement;
}(_polymerElement.Element);

customElements.define('hn-summary', HnSummaryElement);

/***/ })

});