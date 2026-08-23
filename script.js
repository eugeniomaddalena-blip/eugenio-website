document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var slider = document.getElementById('exhibit-slider');
  if (!slider) return;

  var slides = Array.prototype.slice.call(slider.querySelectorAll('.exhibit-slide'));
  var tagEl = document.getElementById('exhibit-tag');
  var topicEl = document.getElementById('exhibit-topic');
  var dotsWrap = document.getElementById('exhibit-dots');
  var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  var current = 0;
  var timer = null;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  slides.forEach(function (slide, i) {
    var dot = document.createElement('button');
    dot.className = 'exhibit-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Show exhibit ' + letters[i]);
    dot.addEventListener('click', function () { goTo(i); resetTimer(); });
    dotsWrap.appendChild(dot);
  });

  function update() {
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
      d.classList.toggle('active', i === current);
    });
    tagEl.textContent = 'EXHIBIT ' + letters[current];
    topicEl.textContent = slides[current].dataset.topic;
  }

  function goTo(i) {
    current = (i + slides.length) % slides.length;
    update();
  }

  slider.querySelectorAll('.exhibit-arrow').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goTo(current + parseInt(btn.dataset.dir, 10));
      resetTimer();
    });
  });

  function startTimer() {
    if (reducedMotion) return;
    timer = setInterval(function () { goTo(current + 1); }, 7000);
  }
  function stopTimer() { if (timer) clearInterval(timer); }
  function resetTimer() { stopTimer(); startTimer(); }

  slider.addEventListener('mouseenter', stopTimer);
  slider.addEventListener('mouseleave', startTimer);
  slider.addEventListener('focusin', stopTimer);
  slider.addEventListener('focusout', startTimer);

  update();
  startTimer();
});
