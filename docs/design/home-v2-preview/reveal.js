/*
 * "One moment" for the sections under the hero (plan 004, design choice 2026-11-26).
 * - Every section heading slides up from behind a line, once, when the section comes into view.
 * - In About, the 16 lights (one per night, 16-31 December) turn on one by one, once.
 * - Paragraphs are not animated: the text is simply there.
 * - IntersectionObserver + CSS transitions only (no GSAP). Whole headings move; text is never split.
 * - Things are "off" before the moment only in motion mode. Without IntersectionObserver
 *   nothing is hidden. Reads nothing from the URL, cookies or storage.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var sections = document.querySelectorAll('.page-section');
  if (!sections.length || !('IntersectionObserver' in window)) return;

  var BULB_STEP = 120; // ms between two lights
  var BULB_START = 300; // ms, after the heading has started
  var bulbs = document.querySelectorAll('.bulb');
  for (var b = 0; b < bulbs.length; b++) {
    bulbs[b].style.transitionDelay = (BULB_START + b * BULB_STEP) + 'ms';
  }

  // A section that is already on screen (page opened in the middle) is shown at once.
  for (var s = 0; s < sections.length; s++) {
    if (sections[s].getBoundingClientRect().top < window.innerHeight * 0.85) {
      sections[s].classList.add('is-revealed');
    }
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var e = 0; e < entries.length; e++) {
      if (!entries[e].isIntersecting) continue;
      entries[e].target.classList.add('is-revealed');
      observer.unobserve(entries[e].target); // once only
    }
  }, { rootMargin: '0px 0px -15% 0px', threshold: 0 });

  for (var k = 0; k < sections.length; k++) {
    if (!sections[k].classList.contains('is-revealed')) observer.observe(sections[k]);
  }

  // The lights turn on when the row of lights itself is in view (About is a tall section).
  var nights = document.querySelector('.nights');
  if (nights) {
    var r = nights.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.85) {
      nights.classList.add('is-lit');
    } else {
      var lightsObserver = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        nights.classList.add('is-lit');
        lightsObserver.disconnect(); // once only
      }, { rootMargin: '0px 0px -20% 0px', threshold: 1 });
      lightsObserver.observe(nights);
    }
  }

  root.classList.add('reveal-on');
})();
