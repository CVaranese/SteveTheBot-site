"""The site's look ("lab notebook", the user's choice on 2026-11-16) and the shared catalog table.

STYLE      tokens and base elements for every built page (build.py passes it to the page builders as site_style)
NAV_STYLE  the bar's own style and the font link, put into the head of every page, templates included
CATALOG    the sortable, filterable table with rows that open (experiments.html, models.html, watch.html)
CATALOG_JS the helpers those pages' scripts share

Rules are in STYLE.md ("Colours and type", "Catalog tables").
"""

NAV_H = 48

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans:'
         'wght@400;600&family=Newsreader:opsz,wght@6..72,500;6..72,700&display=swap" rel="stylesheet">')

STYLE = """
:root{--bg:#faf8f3;--surface:#faf8f3;--ink:#17181c;--muted:#62646b;--line:#d9d5ca;--accent:#b3261e;
  --bar:#3a3d45;--track:#ebe7dc;--off:#a9a59a;
  --head:"Newsreader",Georgia,serif;--body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
  --mono:"IBM Plex Mono",ui-monospace,Consolas,monospace}
@media (prefers-color-scheme: dark){:root{--bg:#131416;--surface:#131416;--ink:#e9e6df;--muted:#9b9a94;
  --line:#34352f;--accent:#ff7a66;--bar:#c9c6bd;--track:#232421;--off:#5a5a54}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 var(--body);padding:20px 16px 64px}
main{max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:28px}
h1{font:700 2.3rem/1.1 var(--head);margin:8px 0 4px}
h2{font:700 1.35rem/1.25 var(--head);margin:0 0 4px}
h3{font:600 .78rem var(--body);letter-spacing:.09em;text-transform:uppercase;color:var(--muted);margin:14px 0 0}
p{margin:0;color:var(--muted)}
header p{max-width:72ch}
a{color:inherit;text-decoration-color:var(--accent);text-underline-offset:3px}
a:hover{color:var(--accent)}
button,input,select{font:inherit;color:inherit}
ul{list-style:none;margin:8px 0 0;padding:0;border-top:1px solid var(--ink)}
li{padding:9px 0;display:flex;flex-wrap:wrap;gap:2px 12px;justify-content:space-between;
  border-bottom:1px solid var(--line)}
li span{color:var(--muted);font-size:.85rem}
.legend li{display:block}
.legend b{display:block;font-family:var(--mono);font-size:.9rem}
.legend span{display:block;color:var(--muted);font-size:.9rem}
details{margin-top:10px} summary{cursor:pointer;color:var(--muted);font-size:.9rem}
footer{color:var(--muted);font-size:.85rem}
.sub{display:flex;gap:18px;margin-top:10px;font-size:.95rem}
.sub a{text-decoration:none;color:var(--muted);padding-bottom:2px}
.sub a[aria-current]{color:var(--ink);box-shadow:0 2px 0 var(--accent)}
"""

NAV_STYLE = FONTS + """<style>
.stb-nav{--n-bg:#faf8f3;--n-ink:#17181c;--n-mut:#62646b;--n-acc:#b3261e;
  position:fixed;top:0;left:0;right:0;z-index:1000;height:%(h)dpx;background:var(--n-bg);
  border-bottom:1px solid var(--n-ink);font:400 15px/1 "IBM Plex Sans",system-ui,-apple-system,"Segoe UI",sans-serif;
  color:var(--n-ink);box-sizing:border-box}
@media (prefers-color-scheme: dark){.stb-nav{--n-bg:#131416;--n-ink:#e9e6df;--n-mut:#9b9a94;--n-acc:#ff7a66}}
.stb-nav *{box-sizing:border-box}
.stb-nav .stb-in{max-width:1180px;height:100%%;margin:0 auto;padding:0 16px;display:flex;align-items:center;
  gap:22px;overflow-x:auto;scrollbar-width:none}
.stb-nav a{color:var(--n-mut);text-decoration:none;white-space:nowrap;padding:6px 0}
.stb-nav a:hover{color:var(--n-acc)}
.stb-nav a.stb-home{color:var(--n-ink);font:700 20px/1 "Newsreader",Georgia,serif;margin-right:auto}
.stb-nav a[aria-current="page"]{color:var(--n-ink);box-shadow:0 2px 0 var(--n-acc)}
.stb-space{height:%(h)dpx}
html{scroll-padding-top:%(h)dpx}
@media (max-width:480px){.stb-nav .stb-in{gap:14px}.stb-nav{font-size:14px}.stb-nav a.stb-home{font-size:17px}}
</style>""" % {'h': NAV_H}

CATALOG = """
.ctl{display:flex;flex-wrap:wrap;gap:8px 6px;align-items:center;padding:10px 0;border-top:1px solid var(--ink);
  border-bottom:1px solid var(--line)}
.chip{background:none;border:1px solid var(--line);border-radius:0;padding:4px 10px;font-size:.88rem;cursor:pointer;
  color:var(--muted)}
.chip i{font-style:normal;font-family:var(--mono);font-size:.78rem;margin-left:5px;opacity:.75}
.chip.on{border-color:var(--ink);color:var(--bg);background:var(--ink)}
.ctl input[type=search]{background:none;border:1px solid var(--line);border-radius:0;padding:4px 8px;min-width:150px;
  flex:1;max-width:260px}
.ctl label{font-size:.88rem;color:var(--muted);display:flex;gap:5px;align-items:center;margin-left:4px}
.count{font:.82rem var(--mono);color:var(--muted);margin:8px 0 0}
.catw{overflow-x:auto}
/* fixed layout: column widths come from the <col> elements, so opening a row never resizes the table */
table.cat{width:100%;border-collapse:collapse;margin-top:4px;table-layout:fixed}
.cat td{overflow-wrap:anywhere}
.minih{overflow:hidden;text-overflow:ellipsis}
.cat th{text-align:left;font:600 .74rem var(--body);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);
  padding:9px 10px 7px 0;border-bottom:1px solid var(--ink);cursor:pointer;white-space:nowrap;user-select:none}
.cat th.ns{cursor:default}
.cat th.n,.cat td.n{text-align:right}
.cat th u{text-decoration:none;display:inline-block;width:.9em;color:var(--accent)}
.cat td{padding:11px 10px 11px 0;border-bottom:1px solid var(--line);vertical-align:top}
.cat td.n{font:.9rem var(--mono);white-space:nowrap}
.cat td.na{color:var(--off)}
tr.r{cursor:pointer}
tr.r:hover .ti{color:var(--accent)}
.when{font:.84rem var(--mono);white-space:nowrap}
.when span{display:block;color:var(--muted)}
.task{font:.84rem var(--mono);color:var(--muted);white-space:nowrap}
.topic{font-size:.8rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);white-space:nowrap}
.ti{font:700 1.08rem/1.3 var(--head)}
.ti.m{font:600 .95rem/1.4 var(--mono)}
.sh{color:var(--muted);font-size:.92rem;margin-top:2px;max-width:68ch}
.tag{font:600 .68rem var(--body);letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}
.mini{display:flex;align-items:flex-end;gap:2px;height:30px;border-bottom:1px solid var(--line);width:max-content}
.mini b{width:7px;background:var(--bar);display:block;min-height:1px}
.mini b.top{background:var(--accent)}
.minih{font:.68rem var(--mono);color:var(--muted);margin-top:3px;white-space:nowrap}
.w{display:flex;gap:6px;flex-wrap:wrap}
.w a,.w span{font-size:.8rem;border:1px solid var(--ink);padding:2px 8px;text-decoration:none;white-space:nowrap}
.w a:hover{background:var(--accent);border-color:var(--accent);color:var(--bg)}
.w span{border:1px dashed var(--off);color:var(--off)}
tr.d>td{padding:0 0 26px;border-bottom:1px solid var(--ink)}
.det{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:6px 34px;padding:10px 0 0}
.det h4{font:600 .72rem var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin:14px 0 4px}
.det p{margin:0;max-width:66ch;color:var(--ink)}
.det p.note,.note{font-size:.8rem;color:var(--muted);margin-top:6px}
.plots{display:grid;gap:16px}
.plot h5{font:600 .86rem var(--body);margin:0 0 6px}
.plot h5 small{font-weight:400;color:var(--muted)}
.pr{display:grid;grid-template-columns:minmax(90px,38%) 1fr 44px;gap:8px;align-items:center;font-size:.84rem;
  padding:2px 0}
.pr .lb{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--muted)}
.tr{position:relative;height:14px;background:var(--track)}
.tr .f{position:absolute;inset:0 auto 0 0;background:var(--bar)}
.tr .f.top{background:var(--accent)}
.tr .t{position:absolute;top:-3px;bottom:-3px;width:2px;background:var(--ink);margin-left:-1px}
.tr .h{position:absolute;top:0;bottom:0;left:50%;border-left:1px dashed var(--off)}
.pr .v{font:600 .86rem var(--mono);text-align:right}
.pr .v.na{color:var(--off);font-weight:400}
.vw{width:100%;border-collapse:collapse;font-size:.88rem;margin-top:2px}
.vw td{border-bottom:1px solid var(--line);padding:6px 8px 6px 0;vertical-align:middle}
.vw td small{display:block;color:var(--muted);font:.76rem var(--mono)}
.fx{overflow-x:auto}
.fx table{border-collapse:collapse;font-size:.84rem;margin-top:4px}
.fx th,.fx td{text-align:left;padding:4px 14px 4px 0;border-bottom:1px solid var(--line);white-space:nowrap}
.fx th{color:var(--muted);font-weight:600}
dl.cols{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;font-size:.9rem;margin:8px 0 0}
dl.cols dt{font-weight:600} dl.cols dd{margin:0;color:var(--muted)}
@media (max-width:760px){
  table.stack,table.stack tbody{display:block;width:100%}
  table.stack thead{display:none}
  table.stack tr.r{display:grid;grid-template-columns:auto auto minmax(0,1fr);gap:2px 12px;padding:12px 0;
    border-bottom:1px solid var(--line);align-items:baseline}
  table.stack tr.r td{padding:0;border:0;min-width:0}
  table.stack td.c-when,table.stack td.c-meta{grid-row:1}
  table.stack td.c-topic{text-align:right}
  table.stack td.c-main,table.stack td.c-w{grid-column:1/-1}
  table.stack td.c-w{margin-top:6px}
  table.stack td.c-mini{display:none}
  .when span{display:inline;margin-left:6px}
  table.stack tr.d,table.stack tr.d>td{display:block}
  .det{grid-template-columns:1fr}
  .pr{grid-template-columns:minmax(0,1fr) 44px}
  .pr .lb{grid-column:1/-1;white-space:normal}
  .ctl input[type=search]{max-width:none;flex-basis:100%}
}
"""

CATALOG_JS = """
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const day=d=>+d.slice(8)+' '+MON[+d.slice(5,7)-1];
function links(v,why){
  const one=(h,t)=>h?`<a href="${h}">${t}</a>`:`<span title="${esc(why||'No '+t.toLowerCase()+' page was recorded')}">${t}</span>`;
  return `<div class="w">${one(v.game,'Game')}${one(v.scen,'Scenarios')}</div>`;
}
function arrows(sel,k,dir){document.querySelectorAll(sel+' th[data-k]').forEach(th=>{
  const u=th.querySelector('u');if(u)u.textContent=th.dataset.k===k?(dir<0?'\\u2193':'\\u2191'):''})}
"""


def watch_links(pages):
    """{shown model name: {'game': href, 'scen': href}} from build.py's model_pages ({name: [(href, short, long)]}):
    the first game report and the first version 2 scenario page of each model."""
    out = {}
    for name, items in pages.items():
        d = {}
        for href, _s, _l in items:
            if href.startswith('reports/'):
                d.setdefault('game', href)
            elif href.startswith('anim/anim2_'):
                d.setdefault('scen', href)
        for href, _s, _l in items:
            if href.startswith('anim/'):
                d.setdefault('scen', href)
        out[name] = d
    return out
