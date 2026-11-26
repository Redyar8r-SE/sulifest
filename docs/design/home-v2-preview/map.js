/*
 * Venue map (design preview for plan 005).
 * A button in the list highlights one part of the map; a second press shows the whole map again.
 * Reads nothing from the URL, cookies or storage. No innerHTML.
 */
(function () {
  'use strict';

  var map = document.getElementById('map');
  if (!map) return;

  var buttons = map.querySelectorAll('.map-btn');
  var all = map.querySelector('.map-all');

  function show(key) {
    if (key) map.setAttribute('data-focus', key);
    else map.removeAttribute('data-focus');
    for (var i = 0; i < buttons.length; i++) {
      var on = buttons[i].getAttribute('data-map') === key;
      buttons[i].setAttribute('aria-pressed', on ? 'true' : 'false');
    }
    if (all) all.hidden = !key;
  }

  map.addEventListener('click', function (event) {
    var button = event.target.closest('.map-btn, .map-all');
    if (!button) return;
    var key = button.getAttribute('data-map');
    show(map.getAttribute('data-focus') === key ? '' : key);
  });
})();
