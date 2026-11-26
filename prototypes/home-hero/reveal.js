/*
 * Text reveal for the sections under the hero (plan 004).
 * - Plays once per section, when the section comes into view.
 * - Heading: slides up from behind a line. Paragraphs, list items, facts:
 *   fade in and rise 16px, one after another (80 ms apart). The look is in page.css.
 * - IntersectionObserver + CSS transitions only (no GSAP), transform and opacity only.
 * - Whole headings and paragraphs move; text is never split into letters.
 * - Text is hidden before the reveal only in motion mode. Without IntersectionObserver,
 *   nothing is hidden. Reads nothing from the URL, cookies or storage.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var sections = document.querySelectorAll('.page-section');
  if (!sections.length || !('IntersectionObserver' in window)) return;

  var ITEMS = '.column > p, .item > *, li, .fact';
  var FIRST_DELAY = 150; // ms, so the heading starts first
  var STEP = 80;         // ms between items

  for (var s = 0; s < sections.length; s++) {
    var items = sections[s].querySelectorAll(ITEMS);
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('data-reveal', '');
      items[i].style.transitionDelay = (FIRST_DELAY + i * STEP) + 'ms';
    }
    // A section that is already on screen (page opened in the middle) is shown at once.
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

  root.classList.add('reveal-on');
})();
