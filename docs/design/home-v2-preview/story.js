/*
 * The story in three steps: SuliFest (the brand), italk (the organizer), Christmas Nights (the festival).
 * When a step comes into view, once:
 *   - the green wire grows down to it and its diamond turns red,
 *   - its stamp drops onto the page and the postmark is pressed on it,
 *   - its numbers count up.
 * The look is in brand.css. Everything is visible without this script, and with "reduce motion".
 * Reads nothing from the URL, cookies or storage. No innerHTML.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var steps = document.querySelectorAll('.step');
  if (!steps.length || !('IntersectionObserver' in window)) return;

  var motion = root.classList.contains('motion');

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    if (!motion || isNaN(target)) return;
    var from = target > 1000 ? target - 25 : 0; // a year only runs through its last numbers
    var start = null;
    var length = 900;
    function frame(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / length, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(from + (target - from) * eased));
      if (t < 1) window.requestAnimationFrame(frame);
    }
    el.textContent = String(from);
    window.requestAnimationFrame(frame);
  }

  function seen(step) {
    step.classList.add('is-seen');
    var numbers = step.querySelectorAll('[data-count]');
    for (var i = 0; i < numbers.length; i++) countUp(numbers[i]);
  }

  var observer = new IntersectionObserver(function (entries) {
    for (var e = 0; e < entries.length; e++) {
      if (!entries[e].isIntersecting) continue;
      seen(entries[e].target);
      observer.unobserve(entries[e].target); // once only
    }
  }, { rootMargin: '0px 0px -28% 0px', threshold: 0 });

  for (var c = 0; c < steps.length; c++) {
    // A step that is already above the screen (page opened lower down) is simply shown.
    if (steps[c].getBoundingClientRect().bottom < 0) steps[c].classList.add('is-seen');
    else observer.observe(steps[c]);
  }

  root.classList.add('story-on');
})();
