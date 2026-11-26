/*
 * Sulifest home hero – scroll timeline (plan 002, Part 0)
 *
 * One GSAP timeline, controlled by the scroll position (ScrollTrigger, scrub 0.6).
 * The stage is held with CSS `position: sticky` (no GSAP pin).
 * GSAP only changes transform and opacity.
 * The always-moving parts (stars, sleigh, reindeer, snow, clouds) are CSS.
 *
 * Distances are the preview's numbers (1280 x 720 stage), scaled like the CSS:
 *   scene 1 uses the "cover" unit u = max(width / 1280, height / 720).
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var hero = document.getElementById('hero');
  if (!hero) return;

  var scene1 = hero.querySelector('.scene1');
  var scene2 = hero.querySelector('.scene2');
  var pauseBtn = hero.querySelector('.pause');
  var pauseLabel = pauseBtn.querySelector('.pause-label');
  var iconPause = pauseBtn.querySelector('.icon-pause');
  var iconPlay = pauseBtn.querySelector('.icon-play');
  var PAUSE_KEY = 'sulifest-hero-paused';

  /* ---------- Pause button (for the always-moving parts) ---------- */
  function showPaused(paused) {
    root.classList.toggle('is-paused', paused);
    pauseBtn.setAttribute('aria-pressed', paused ? 'true' : 'false');
    pauseLabel.textContent = paused ? 'Play' : 'Pause';
    iconPause.hidden = paused;
    iconPlay.hidden = !paused;
  }
  showPaused(root.classList.contains('is-paused'));
  pauseBtn.addEventListener('click', function () {
    var paused = !root.classList.contains('is-paused');
    showPaused(paused);
    try {
      window.sessionStorage.setItem(PAUSE_KEY, paused ? '1' : '0');
    } catch (e) {
      /* storage blocked: the choice is kept only until reload */
    }
  });

  /* ---------- No GSAP: fall back to the two normal sections ---------- */
  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) {
    root.classList.remove('motion');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });

  /* Preview pixels -> real pixels. Function values are read again on every refresh. */
  function coverUnit() {
    return Math.max(scene1.clientWidth / 1280, scene1.clientHeight / 720);
  }
  function u(n) {
    return function () { return n * coverUnit(); };
  }
  function stageH(f) {
    return function () { return f * scene2.clientHeight; };
  }

  var mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', function () {
    root.classList.add('motion');
    pauseBtn.hidden = false;

    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        invalidateOnRefresh: true
      }
    });

    /* Scene 1 leaves (0 - 0.6). Moon and mountains use the same timing, and the
       moon moves almost as far (-410 / -420), so the mountains never cover the
       sleigh. Only the dark front layer (-680) covers it. */
    var s1 = { duration: 0.6, ease: 'power1.inOut' };
    tl.to('.l-stars',     Object.assign({ y: u(-60) },  s1), 0)
      .to('.l-cloudfar',  Object.assign({ y: u(-130) }, s1), 0)
      .to('.l-moon',      Object.assign({ y: u(-410) }, s1), 0)
      .to('.l-cloudnear', Object.assign({ y: u(-210) }, s1), 0)
      .to('.l-mount',     Object.assign({ y: u(-420) }, s1), 0)
      .to('.l-front',     Object.assign({ y: u(-680) }, s1), 0)
      // header + title go up fast and fade out (autoAlpha also removes them from the Tab order)
      .to('.l-top', { y: u(-420), autoAlpha: 0, duration: 0.3, ease: 'power1.in' }, 0)
      .to('.hint',  { autoAlpha: 0, duration: 0.2 }, 0)

      /* Scene 2 comes in (0.55 - 1) */
      .fromTo('.s-mist',   { autoAlpha: 0, y: stageH(0.05) }, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.55)
      .fromTo('.s-card',   { y: stageH(1.05) }, { y: 0, duration: 0.3,  ease: 'power2.out' }, 0.6)
      .fromTo('.s-tent',   { y: stageH(0.75) }, { y: 0, duration: 0.2,  ease: 'power2.out' }, 0.7)
      .fromTo('.s-boxes',  { y: stageH(0.42) }, { y: 0, duration: 0.12, ease: 'power2.out' }, 0.8)
      .fromTo('.s-ground', { y: stageH(0.15) }, { y: 0, duration: 0.12, ease: 'power2.out' }, 0.85)
      // lights on, last
      .fromTo('.tree-lit', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.08 }, 0.92)
      // short pause at the end, so the lit tree is seen before the page moves on
      .to({}, { duration: 0.08 });

    hero.classList.add('is-ready');

    /* Keyboard: if focus goes into a scene that is not on screen, scroll to it. */
    function onFocusScene2() {
      var st = tl.scrollTrigger;
      if (st && st.progress < 0.99) window.scrollTo(0, st.end);
    }
    function onFocusScene1(event) {
      var st = tl.scrollTrigger;
      if (event.target === pauseBtn) return;
      if (st && st.progress > 0) window.scrollTo(0, st.start);
    }
    scene2.addEventListener('focusin', onFocusScene2);
    scene1.addEventListener('focusin', onFocusScene1);

    return function () {
      /* "reduce motion" was turned on: GSAP removes its styles, we go back to two sections */
      scene2.removeEventListener('focusin', onFocusScene2);
      scene1.removeEventListener('focusin', onFocusScene1);
      hero.classList.remove('is-ready');
      root.classList.remove('motion');
      pauseBtn.hidden = true;
    };
  }, hero);

  /* Measure again when the pictures and fonts are ready. */
  window.addEventListener('load', function () { ScrollTrigger.refresh(); }, { once: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
