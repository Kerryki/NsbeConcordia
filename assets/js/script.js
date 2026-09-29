// NSBE Concordia website interactions
(function () {
  // Mobile menu
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  if (nav && toggle) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.querySelectorAll('.nav-links a').forEach((a) =>
      a.addEventListener('click', () => nav.classList.remove('open'))
    );
  }

  // "3 words" highlight (hover on desktop, tap on mobile)
  const rows = document.querySelectorAll('.word-row');
  const activate = (row) => {
    rows.forEach((r) => r.classList.remove('active'));
    row.classList.add('active');
  };
  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => activate(row));
    row.addEventListener('focus', () => activate(row));
    row.addEventListener('click', () => activate(row));
  });

  // Events: category filter
  const pills = document.querySelectorAll('.pill');
  const cards = document.querySelectorAll('.ecard');
  const empty = document.querySelector('.empty');
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const f = pill.dataset.filter;
      pills.forEach((p) => {
        p.classList.toggle('active', p === pill);
        p.setAttribute('aria-pressed', String(p === pill));
      });
      let shown = 0;
      cards.forEach((c) => {
        const match = f === 'all' || c.dataset.cat === f;
        c.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    });
  });

  // Events: sign up toggle
  document.querySelectorAll('.rsvp').forEach((btn) => {
    btn.addEventListener('click', () => {
      const done = btn.classList.toggle('done');
      btn.textContent = done ? 'SIGNED UP ✓' : 'SIGN UP';
      btn.setAttribute('aria-pressed', String(done));
    });
  });

// Reveal sections on scroll
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  } else {
    els.forEach((el) => el.classList.add('in'));
  }
})();
