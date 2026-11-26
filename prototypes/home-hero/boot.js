/*
 * Runs before the first paint (normal <script> in <head>, no defer).
 * It only sets classes on <html>, so the page has the right layout at once:
 *   .js        JavaScript works
 *   .motion    motion is allowed -> tall scroll wrapper + sticky stage + loops
 *   .is-paused the visitor pressed "Pause" earlier in this visit
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
    if (window.sessionStorage.getItem('sulifest-hero-paused') === '1') {
      root.classList.add('is-paused');
    }
  } catch (e) {
    /* sessionStorage can be blocked; the defaults are fine */
  }
})();
