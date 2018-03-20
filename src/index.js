(async () => {
  if (!window.customElements || !('attachShadow' in Element.prototype)) {
    await import(/* webpackChunkName: 'sd-ce-polyfill' */ '@webcomponents/webcomponentsjs/webcomponents-sd-ce');
  }
  import(/* webpackMode: 'eager' */ './components/hn-app');
})();
