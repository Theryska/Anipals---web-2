(function(){
  /* --- mobilní menu (hamburger) --- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', function(){
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.addEventListener('click', function(e){
      if (e.target.tagName === 'A' && !e.target.closest('.submenu')) {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* --- roletky v menu (Jak to funguje / Služby / Ceník) --- */
  var drops = [].slice.call(document.querySelectorAll('.has-sub'));

  function closeAllSubmenus(except){
    drops.forEach(function(d){
      if (d === except) return;
      var sm = d.querySelector('.submenu');
      var btn = d.querySelector('.sub-toggle');
      if (sm) sm.classList.remove('open');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  drops.forEach(function(drop){
    var toggle = drop.querySelector('.sub-toggle');
    var submenu = drop.querySelector('.submenu');
    if (!toggle || !submenu) return;

    toggle.addEventListener('click', function(e){
      e.stopPropagation();
      var willOpen = !submenu.classList.contains('open');
      closeAllSubmenus(drop);
      submenu.classList.toggle('open', willOpen);
      toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    [].slice.call(submenu.querySelectorAll('a')).forEach(function(link){
      link.addEventListener('click', function(){
        var tabId = link.getAttribute('data-tab');
        if (tabId) {
          var tabEl = document.getElementById(tabId);
          if (tabEl) selectTab(tabEl);
        }
        closeAllSubmenus(null);
        if (menu) menu.classList.remove('open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.addEventListener('click', function(e){
    if (!e.target.closest('.has-sub')) closeAllSubmenus(null);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closeAllSubmenus(null);
  });

  /* --- záložky Pro majitele / Pro hlídače (jen na Jak to funguje) --- */
  var tabs = [].slice.call(document.querySelectorAll('.tab'));

  function selectTab(tab){
    tabs.forEach(function(t){
      var on = (t === tab);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      var panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.hidden = !on;
    });
  }

  tabs.forEach(function(tab, i){
    tab.addEventListener('click', function(){ selectTab(tab); });
    tab.addEventListener('keydown', function(e){
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      selectTab(next); next.focus();
    });
  });

  /* --- odhalování při scrollu (.reveal) --- */
  var reduceMotion = false;
  try { reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch(e){}
  var reveals = [].slice.call(document.querySelectorAll('.reveal'));
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function(el){ el.classList.add('on'); });
    } else {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if (en.isIntersecting) en.target.classList.add('on'); });
      }, { threshold: .2 });
      reveals.forEach(function(el){ io.observe(el); });
    }
  }

  /* --- vodítko (signature scroll linka) --- */
  var svg = document.getElementById('leash');
  if (svg) {
    var NS = 'http://www.w3.org/2000/svg';
    var cord, dots = [], len = 0;

    var build = function(){
      if (window.innerWidth < 1180) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      dots = [];

      var docH = document.body.scrollHeight, W = 120;
      svg.setAttribute('width', W);
      svg.setAttribute('height', docH);
      svg.setAttribute('viewBox', '0 0 ' + W + ' ' + docH);

      var stops = [].slice.call(document.querySelectorAll('[data-stop]'));
      var pts = stops.map(function(s, i){
        var r = s.getBoundingClientRect();
        var y = r.top + window.pageYOffset + r.height / 2;
        return { x: (i % 2 === 0 ? 44 : 82), y: y };
      });
      if (pts.length < 2) return;

      var d = 'M ' + pts[0].x + ' ' + (pts[0].y - 120);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i], prev = i ? pts[i-1] : { x: pts[0].x, y: pts[0].y - 120 };
        var midY = (prev.y + p.y) / 2;
        d += ' C ' + prev.x + ' ' + midY + ', ' + p.x + ' ' + midY + ', ' + p.x + ' ' + p.y;
      }
      var last = pts[pts.length - 1];
      d += ' C ' + last.x + ' ' + (last.y+90) + ', ' + last.x + ' ' + (last.y+110) + ', ' + last.x + ' ' + (last.y+150);

      cord = document.createElementNS(NS, 'path');
      cord.setAttribute('class', 'cord');
      cord.setAttribute('d', d);
      svg.appendChild(cord);

      pts.forEach(function(p){
        var c = document.createElementNS(NS, 'circle');
        c.setAttribute('class', 'stop');
        c.setAttribute('cx', p.x); c.setAttribute('cy', p.y); c.setAttribute('r', 6);
        svg.appendChild(c);
        dots.push({ el: c, y: p.y });
      });

      len = cord.getTotalLength();
      cord.style.strokeDasharray = len;
      cord.style.strokeDashoffset = reduceMotion ? 0 : len;
      if (reduceMotion) dots.forEach(function(d){ d.el.classList.add('lit'); });
      draw();
    };

    var draw = function(){
      if (!cord || reduceMotion) return;
      var view = window.pageYOffset + window.innerHeight * 0.82;
      var docH = document.body.scrollHeight;
      var p = Math.max(0, Math.min(1, view / (docH - 60)));
      cord.style.strokeDashoffset = len * (1 - p);
      dots.forEach(function(d){
        if (view > d.y) d.el.classList.add('lit'); else d.el.classList.remove('lit');
      });
    };

    var tick = false;
    window.addEventListener('scroll', function(){
      if (tick) return; tick = true;
      requestAnimationFrame(function(){ draw(); tick = false; });
    }, { passive: true });

    var rt;
    window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(build, 180); });
    window.addEventListener('load', build);
    build();
  }
})();
