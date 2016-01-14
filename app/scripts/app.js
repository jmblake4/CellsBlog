(function(document) {
  'use strict';

  var webComponentsSupported = ('registerElement' in document && 'import' in document.createElement('link') && 'content' in document.createElement('template'));

  function setI18n() {
    if (window.I18nMsg) {
      window.I18nMsg.lang = document.documentElement.lang || 'en';
      window.I18nMsg.url = 'locales';
    }
  }

  function removeSplashScreen() {
    var loadEl = document.getElementById('splash');
    loadEl.parentNode.removeChild(loadEl);
    document.body.classList.remove('loading');
  }

  function fireComponentsLoadEvent() {
    var eventComponentsLoaded = document.createEvent('Event');
    eventComponentsLoaded.initEvent('componentsLoaded', true, true);
    document.body.dispatchEvent(eventComponentsLoaded);
  }

  function setShadow() {
    // (Optional) Use native Shadow DOM if it's available in the browser.
    window.Polymer = window.Polymer || { dom: 'shadow' };
  }

  function finishLazyLoading() {
    setShadow();
    removeSplashScreen();
    fireComponentsLoadEvent();
    setI18n();
  }

  function loadElements() {
    var bundle = document.createElement('link');
    bundle.rel = 'import';
    bundle.href = 'components/components.html';
    bundle.onload = finishLazyLoading;
    document.head.appendChild(bundle);
  }

  function loadWebComponentPolyfill(cb) {
    var polyfill = document.createElement('script');
    polyfill.onload = cb || null;
    polyfill.src = 'components/webcomponentsjs/webcomponents-lite.min.js';
    document.head.appendChild(polyfill);
  }

  if (webComponentsSupported) {
    loadElements();
  } else {
    loadWebComponentPolyfill(loadElements);
  }

})(document);
