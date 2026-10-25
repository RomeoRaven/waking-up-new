// doublings-double.js - interactive skyline for "The Doublings Double" (Waking Up New)
// Self-contained: finds #dd-embed, replaces its static fallback with the interactive scene.
// Model: 40 skill plots on an 8x5 grid; one doubling per quarter (slider step); the gold
// district (coding, math, science, logic) earns an extra doubling per year (shared roots).
(function () {
  var host = document.getElementById('dd-embed');
  if (!host) return;

  var css = [
    '.dd-wrap{font-family:inherit;color:#1c2733;max-width:680px;margin:0 auto}',
    '.dd-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:8px}',
    '.dd-btn{background:#fff;color:#1c2733;border:1px solid #c3ccd4;border-radius:999px;padding:5px 12px;font-size:13px;cursor:pointer}',
    '.dd-btn.on{background:#47678a;color:#fff;border-color:#47678a}',
    '.dd-btn:focus-visible,.dd-range:focus-visible{outline:2px solid #47678a;outline-offset:2px}',
    '.dd-range{flex:1 1 180px;accent-color:#47678a}',
    '.dd-nums{display:flex;gap:8px;margin:4px 0 10px}',
    '.dd-num{flex:1 1 0;background:#fff;border:1px solid #d5dce2;border-radius:12px;padding:8px 10px 9px;text-align:center}',
    '.dd-num .dd-lab{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#5a6a78}',
    '.dd-num .dd-val{font-size:30px;font-weight:700;line-height:1.15;font-variant-numeric:tabular-nums}',
    '.dd-num.dd-hero{border-color:#9c6f1e}',
    '.dd-num.dd-hero .dd-val{color:#9c6f1e;font-size:34px}',
    '.dd-scene{background:#eef2f5;border:1px solid #d5dce2;border-radius:12px;padding:6px}',
    '.dd-scene svg{width:100%;height:auto;display:block}',
    '.dd-stats{font-size:14px;margin-top:8px}',
    '.dd-cap{font-size:12.5px;color:#5a6a78;margin-top:4px;line-height:1.45}',
    '.dd-sw{display:inline-block;width:10px;height:10px;border-radius:2px;background:#d9a441;vertical-align:-1px;margin:0 3px}',
    '.dd-tlabel{font-size:13px;color:#5a6a78;min-width:86px}'
  ].join('\n');
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  host.innerHTML =
    '<div class="dd-wrap">' +
    '<div class="dd-row">' +
    '<button class="dd-btn" id="dd-mGen" type="button">General AI: a whole city</button>' +
    '<button class="dd-btn" id="dd-mNar" type="button">Narrow AI: one tower</button>' +
    '</div>' +
    '<div class="dd-nums">' +
    '<div class="dd-num"><div class="dd-lab">Time elapsed</div><div class="dd-val" id="dd-nTime">0</div></div>' +
    '<div class="dd-num"><div class="dd-lab">Doublings</div><div class="dd-val" id="dd-nDbl">0</div></div>' +
    '<div class="dd-num dd-hero"><div class="dd-lab">Total capability</div><div class="dd-val" id="dd-nCap">×1</div></div>' +
    '</div>' +
    '<div class="dd-row">' +
    '<span class="dd-tlabel" id="dd-tLabel">Now</span>' +
    '<input class="dd-range" type="range" id="dd-q" min="0" max="12" step="1" value="0" aria-label="Time in quarters">' +
    '<button class="dd-btn dd-snap" data-q="0" type="button">Now</button>' +
    '<button class="dd-btn dd-snap" data-q="4" type="button">+1 yr</button>' +
    '<button class="dd-btn dd-snap" data-q="8" type="button">+2 yr</button>' +
    '<button class="dd-btn dd-snap" data-q="12" type="button">+3 yr</button>' +
    '</div>' +
    '<div class="dd-scene"><svg id="dd-svg" viewBox="0 0 640 430" role="img" aria-label="Isometric skyline growing from farmland to a city"></svg></div>' +
    '<div class="dd-stats" id="dd-stats"></div>' +
    '<div class="dd-cap" id="dd-cap"></div>' +
    '<div class="dd-cap">The <span class="dd-sw"></span>gold district is a family of linked skills (coding, math, science, logic). Growth in one feeds the others through shared roots, so that district rises faster than the base rate. Building heights are compressed to fit the frame; every number shown is exact. Growth rate: one doubling every 3 months, the clean example from the article, close to the recent measured pace.</div>' +
    '</div>';

  var W = 8, D = 5, TW = 58, TH = 29, OX = 320, OY = 64;
  var plots = [];
  function frac(x) { return x - Math.floor(x); }
  for (var cy = 0; cy < D; cy++) for (var cx = 0; cx < W; cx++) {
    var i = cy * W + cx;
    var dist = Math.hypot(cx - 3.4, cy - 1.6);
    var jit = frac(Math.sin(i * 12.9898) * 43758.5453);
    var act = Math.max(0, Math.min(9, Math.round(dist * 1.7 + jit * 1.6 - 0.6)));
    var f = 0.7 + 0.6 * frac(Math.sin(i * 78.233) * 12543.21);
    plots.push({ cx: cx, cy: cy, act: act, f: f, district: (cx >= 5 && cy <= 1) });
  }
  plots.sort(function (a, b) { return (a.cx + a.cy) - (b.cx + b.cy); });

  var svg = document.getElementById('dd-svg');
  function pos(cx, cy) { return [OX + (cx - cy) * TW / 2, OY + (cx + cy) * TH / 2]; }
  function tile(cx, cy, fill) {
    var p = pos(cx, cy), x = p[0], y = p[1];
    return '<polygon points="' + x + ',' + y + ' ' + (x + TW / 2) + ',' + (y + TH / 2) + ' ' + x + ',' + (y + TH) + ' ' + (x - TW / 2) + ',' + (y + TH / 2) + '" fill="' + fill + '" stroke="rgba(0,0,0,0.08)"/>';
  }
  function building(cx, cy, h, colors) {
    var p = pos(cx, cy), x = p[0], y = p[1];
    var inset = 7, hw = TW / 2 - inset, hh = TH / 2 - inset / 2;
    var by = y + TH, top = by - h;
    return '<polygon points="' + (x - hw) + ',' + (top + hh) + ' ' + x + ',' + (top + 2 * hh) + ' ' + x + ',' + by + ' ' + (x - hw) + ',' + (by - hh) + '" fill="' + colors[0] + '"/>' +
      '<polygon points="' + (x + hw) + ',' + (top + hh) + ' ' + x + ',' + (top + 2 * hh) + ' ' + x + ',' + by + ' ' + (x + hw) + ',' + (by - hh) + '" fill="' + colors[1] + '"/>' +
      '<polygon points="' + x + ',' + top + ' ' + (x + hw) + ',' + (top + hh) + ' ' + x + ',' + (top + 2 * hh) + ' ' + (x - hw) + ',' + (top + hh) + '" fill="' + colors[2] + '"/>';
  }
  var CITY = ['#5d81a6', '#47678a', '#82a7c9'];
  var GOLD = ['#c08c2d', '#9c6f1e', '#e6bc5c'];
  var TOWER = ['#6a5f96', '#524a78', '#8d81b8'];
  var state = { mode: 'general', q: 0 };
  function stories(p, q) {
    if (q < p.act) return 0;
    var s = p.f * Math.pow(2, q - p.act);
    if (p.district) s *= Math.pow(2, Math.floor(q / 4));
    return s;
  }
  function vheight(s) { return Math.min(10 + 15 * Math.log2(1 + s), 218); }
  function tText(q) {
    if (q === 0) return 'Now';
    var yrs = Math.floor(q / 4), mos = (q % 4) * 3;
    return ('+' + (yrs ? yrs + ' yr ' : '') + (mos ? mos + ' mo' : '')).trim();
  }
  function render() {
    var q = state.q, out = '', k, p, s;
    document.getElementById('dd-tLabel').textContent = tText(q);
    document.getElementById('dd-q').value = q;
    document.getElementById('dd-mGen').classList.toggle('on', state.mode === 'general');
    document.getElementById('dd-mNar').classList.toggle('on', state.mode === 'narrow');
    document.getElementById('dd-nTime').textContent = q === 0 ? '0' : tText(q).replace('+', '');
    document.getElementById('dd-nDbl').textContent = state.mode === 'general' ? q : '0';
    if (state.mode === 'narrow') {
      for (k = 0; k < plots.length; k++) { p = plots[k]; out += tile(p.cx, p.cy, (p.cx + p.cy) % 2 ? '#79a95c' : '#83b364'); }
      out += building(3, 2, 218, TOWER);
      out += '<text x="320" y="415" text-anchor="middle" font-size="13" fill="#5a6a78">One tower, superhuman at chess. Every other plot: farmland, at year 0 and at year 3 alike.</text>';
      svg.innerHTML = out;
      document.getElementById('dd-nCap').textContent = '×1';
      document.getElementById('dd-stats').innerHTML = '<b>Narrow AI.</b> Capability in its one skill: off the chart. Everywhere else: zero, at every point on the slider. Nothing spreads, nothing rises, nothing connects, so the total never leaves ×1.';
      document.getElementById('dd-cap').textContent = 'Drag the slider: this picture and these numbers do not change. That is the point.';
      return;
    }
    var active = 0;
    for (k = 0; k < plots.length; k++) {
      p = plots[k]; s = stories(p, q);
      if (q < p.act) {
        out += tile(p.cx, p.cy, q === p.act - 1 ? '#9aa0a3' : ((p.cx + p.cy) % 2 ? '#79a95c' : '#83b364'));
      } else {
        active++;
        out += tile(p.cx, p.cy, p.district ? '#cbb26a' : '#a8adb2');
        out += building(p.cx, p.cy, vheight(s), p.district ? GOLD : CITY);
      }
    }
    svg.innerHTML = out;
    var M = Math.pow(2, q);
    document.getElementById('dd-nCap').textContent = '×' + M.toLocaleString('en-US');
    document.getElementById('dd-stats').innerHTML = '<b>General AI.</b> Skills with a building up: <b>' + active + ' of 40</b>. The city grows taller, wider, and deeper at the same time, and every doubling multiplies everything already standing.';
    document.getElementById('dd-cap').textContent = q === 0
      ? 'Farmland. The first plots are just being staked out. Drag the slider: one doubling every 3 months.'
      : 'Each step is one doubling applied to everything already standing, plus new plots breaking ground as capability reaches new skills, spreading across the grid and back into new depth.';
  }
  document.getElementById('dd-q').addEventListener('input', function (e) { state.q = parseInt(e.target.value, 10); render(); });
  document.getElementById('dd-mGen').addEventListener('click', function () { state.mode = 'general'; render(); });
  document.getElementById('dd-mNar').addEventListener('click', function () { state.mode = 'narrow'; render(); });
  var snaps = document.querySelectorAll('.dd-snap');
  for (var n = 0; n < snaps.length; n++) snaps[n].addEventListener('click', function () { state.q = parseInt(this.getAttribute('data-q'), 10); render(); });
  render();
})();
