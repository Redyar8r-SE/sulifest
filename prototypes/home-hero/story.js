/*
 * The story in three steps (plan 006): SuliFest (the brand), italk (the organizer), Christmas Nights.
 * When a step's top passes 72% of the screen height, once:
 *   the green wire grows down through it, its diamond turns red, the heading slides up,
 *   the stamp drops onto the page, the postmark is pressed, and the numbers count up.
 * The look is in page.css. This script only adds .story-on to <html> and .is-seen to a step.
 * Everything is visible without this script, with "reduce motion", or without IntersectionObserver:
 * the final numbers are in the HTML.
 * Reads nothing from the URL, cookies or storage. Writes numbers with textContent only.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var steps = document.querySelectorAll('.step');
  if (!steps.length || !('IntersectionObserver' in window)) return;

  var motion = root.classList.contains('motion');
  var COUNT_MS = 900;
  var YEAR_RUN = 25; // a year (2019) only runs through its last 25 numbers

  function countUp(el) {
    var target = parseInt(el.textContent, 10);
    if (!motion || isNaN(target) || String(target) !== el.getAttribute('data-count')) return;
    var from = target > 1000 ? target - YEAR_RUN : 0;
    var start = null;
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / COUNT_MS, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(from + (target - from) * eased));
      if (t < 1) window.requestAnimationFrame(frame);
      else el.textContent = String(target); // always end on the exact number
    }
    el.textContent = String(from);
    window.requestAnimationFrame(frame);
  }

  function show(step) {
    if (step.classList.contains('is-seen')) return;
    step.classList.add('is-seen');
    observer.unobserve(step); // once only
    var numbers = step.querySelectorAll('[data-count]');
    for (var i = 0; i < numbers.length; i++) countUp(numbers[i]);
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var e = 0; e < entries.length; e++) {
      if (!entries[e].isIntersecting) continue;
      // A fast scroll or a jump can skip a step completely: show the earlier steps too,
      // so no heading or stamp stays hidden above the screen.
      for (var k = 0; k < steps.length; k++) {
        show(steps[k]);
        if (steps[k] === entries[e].target) break;
      }
    }
  }, { rootMargin: '0px 0px -28% 0px', threshold: 0 });

  for (var s = 0; s < steps.length; s++) {
    // A step that is already above the screen (page opened lower down) is simply shown, without counting.
    if (steps[s].getBoundingClientRect().bottom < 0) steps[s].classList.add('is-seen');
    else observer.observe(steps[s]);
  }

  root.classList.add('story-on');
})();
