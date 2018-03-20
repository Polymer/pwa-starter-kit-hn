import 'babel-polyfill';

(async () => {
  if (window.customElements) { 
    await import(/* webpackChunkName: 'custom-elements-es5-adapter' */
      '@webcomponents/webcomponentsjs/custom-elements-es5-adapter');
  }

  if (!('content' in document.createElement('template')) || !window.Promise || !Array.from ||
    // Edge has broken fragment cloning which means you cannot clone template.content
    !(document.createDocumentFragment().cloneNode() instanceof DocumentFragment)) {
      await import(/* webpackChunkName: 'webcomponents-lite' */
        '@webcomponents/webcomponentsjs/webcomponents-lite');
  } else if (!window.customElements || !('attachShadow' in Element.prototype)) {
    await import(/* webpackChunkName: 'webcomponents-sd-ce' */
      '@webcomponents/webcomponentsjs/webcomponents-sd-ce');
  }

  import(/* webpackMode: 'eager' */ './components/hn-app');
})();
