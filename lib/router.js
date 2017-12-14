export const installRouter = (updateLocationCallback) => {
  document.body.addEventListener('click', e => {
    if ((e.button !== 0) || (e.metaKey || e.ctrlKey)) {
      return;
    }
    let origin;
    if (window.location.origin) {
      origin = window.location.origin;
    } else {
      origin = window.location.protocol + '//' + window.location.host;
    }
    let anchor = e.composedPath().filter(n=>n.localName=='a')[0];
    if (anchor && anchor.href.indexOf(origin) === 0) {
      e.preventDefault();
      if (anchor.href !== window.location.href) {
        window.history.pushState({}, '', anchor.href);
        updateLocationCallback();
      }
    }
  });

  window.addEventListener('popstate', () => updateLocationCallback());
  updateLocationCallback();
};
