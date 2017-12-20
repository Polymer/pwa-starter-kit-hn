function main() {
  import(/* webpackMode: 'eager' */ './components/hn-app.js');
}

if (!window.customElements || !('attachShadow' in Element.prototype)) {
  if (window.fetch) {
    // Firefox/Edge
    import(/* webpackChunkName: 'sd-ce-polyfill' */ '../node_modules/@webcomponents/webcomponentsjs/webcomponents-sd-ce.js').then(main);
  } else {
    // IE
    // No native Promise, so can't use Webpack's import();
    var script = document.createElement('script');
    script.src = '/polyfills/webcomponents-lite.js';

    var fetchScript = document.createElement('script');
    fetchScript.src = '/polyfills/fetch.js';

    fetchScript.onload = script.onload = () => {
      if (window.customElements && window.fetch) main();
    };

    document.head.appendChild(script);
    document.head.appendChild(fetchScript);
  }
} else {
  main();
}
