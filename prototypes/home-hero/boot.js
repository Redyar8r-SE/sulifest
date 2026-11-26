/*
 * Runs before the first paint (normal <script> in <head>, no defer).
 * It only sets classes on <html>, so the page has the right layout at once:
 *   .js        JavaScript works
 *   .motion    motion is allowed -> tall scroll wrapper + sticky stage + loops
 * hero.js removes .motion again if GSAP does not load.
 */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  try {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('motion');
    }
  } catch (e) {
    /* matchMedia missing: keep the two normal sections */
  }
})();
