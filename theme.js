// IE HTML5 Shim
(function(){var h="abbr,article,aside,audio,canvas,datalist,details,"+
"figure,footer,header,hgroup,mark,menu,meter,nav,output,"
+"progress,section,time,video".split(',');h.forEach(function(t){document.createElement(t)});})();
// Archive page
!function(){var ar=document.querySelector('.post-body .ArchivePage');if(!ar)return;fetch('/feeds/posts/summary?alt=json&max-results=0').then(function(r){return r.json()}).then(function(d){var cats=d.feed.category||[];cats.forEach(function(c){var html='<div class="caregory-div"><h2 class="Category-ArchivePage"><a href="/search/label/'+c.term+'">'+c.term+'</a></h2></div><ul class="clear">';fetch('/feeds/posts/default/-/'+c.term+'?alt=json').then(function(r){return r.json()}).then(function(e){(e.feed.entry||[]).forEach(function(entry){var links=entry.link||[],alt='';for(var k=0;k<links.length;k++){if(links[k].rel==='alternate'){alt=links[k].href;break}}if(alt.indexOf('.blogspot.')>-1)alt=alt.replace('http://','https://');html+='<li><a class="ArchivePage-posts" title="'+entry.title.+'" href="'+alt+'">'+entry.title.+'</a></li>'+(k>0?',':'')});ar.insertAdjacentHTML('beforeend',html+'</ul>')})})})}();
// Dark mode, scroll to top, reading progress bar
var darkMode=function(){document.body.classList.toggle('dark-mode');document.cookie='darkmode='+(document.body.classList.contains('dark-mode')?'1':'0')+';path=/'};
var scrolup=function(){window.scrollTo({top:0,behavior:'smooth'})};
(function(){var ua=navigator.userAgent;if(ua.indexOf('wv')>-1||(ua.indexOf('Android')>-1&&ua.indexOf('Chrome')<0))document.documentElement.classList.add('isWebView')})();
(function(){var p=document.querySelector('#reading-progress-bar');if(p)document.addEventListener('scroll',function(){var s=document.documentElement.scrollTop||document.body.scrollTop,h=document.documentElement.scrollHeight-document.documentElement.clientHeight;p.style.width=(s/h*100)+'%'},{passive:!0})})();
// Touch cursor fix
(function(){if('ontouchstart'in window)document.querySelectorAll('.head-pz,.par-bottm,.par-tp,.stxk,.sidenav,.pos-t-t').forEach(function(e){e.style.cursor='pointer'})})();
// AdSense
(adsbygoogle=window.adsbygoogle||[]).push({});
// Pagination
(function(){var q=window.location.search.replace('?','').split('&');for(var i=0;i<q.length;i++){var p=q[i].split('=');if('page'===p[0]){document.body.classList.add('page40');break}}var lm=document.getElementsByClassName('loadMore');if(lm.length>0&&!document.body.classList.contains('page40')){var bp=document.getElementsByClassName('blog-pager-container');if(bp.length>0)bp[0].innerHTML='<div class="noMorePosts"><svg class="icon-load" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg><span>'+(document.documentElement.dir==='rtl'?'??? ??????? ????????':'No more posts')+'</span></div>'}var sk=document.querySelector('.siki');if(sk){var pn=sk.getElementsByClassName('pageNum');if(pn.length>0){var pg=document.querySelector('#siki-page-number');if(pg)pg.innerHTML='<span>'+(document.documentElement.dir==='rtl'?'?????':'Page')+'</span> '+pn[0].textContent}var nx=sk.getElementsByClassName('next');if(nx.length>0&&!document.body.classList.contains('page40'))nx[0].style.display='none'}})();
// Topic navigation
(function(){function loadTitle(e,l){var h=e.getAttribute('href');if(!h)return;fetch(h).then(function(r){return r.text()}).then(function(html){var d=document.createElement('div');d.innerHTML=html;var t=d.querySelector('.topic-title');e.innerHTML='<span class="texxattt">'+l+'</span> <span class="posttitle">'+(t?t.textContent:'')+'</span>'})}var n=document.querySelector('.topic-nav-cont a.next'),p=document.querySelector('.topic-nav-cont a.prev');if(n)loadTitle(n,NextArticle);if(p)loadTitle(p,PreviousArticle)})();
// Load More Posts
(function(){var lm=document.querySelector('.loadMore .loadMorePosts a');if(!lm)return;var n=lm.getAttribute('data-page'),url=window.location.href.split('?')[0]+'?page='+(parseInt(n)||2);fetch(url).then(function(r){return r.text()}).then(function(html){var d=document.createElement('div');d.innerHTML=html;var p=d.querySelectorAll('.post-outer');if(p.length>0){var c=document.querySelector('.blog-posts');if(c)p.forEach(function(e){c.appendChild(e)})}})})();
// Reactions lazy-load
document.addEventListener('DOMContentLoaded',function(){var r=document.getElementById('reactions-iframe');if(r){var io=new IntersectionObserver(function(e){e.forEach(function(entry){if(entry.isIntersecting){r.src=r.getAttribute('data-src');io.unobserve(r)}})},{rootMargin:'200px'});io.observe(r)}});
// Share handlers
(function(){var wa=document.querySelector('.whatsappThis a');if(wa)wa.addEventListener('click',function(e){if(!/Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent)){e.preventDefault();alert('Open WhatsApp on your mobile device')}});var ml=document.querySelector('.mailThis a');if(ml)ml.addEventListener('click',function(){window.location='mailto:?subject='+encodeURIComponent(document.title)+'&body='+encodeURIComponent(window.location.href)})})();
// Copy link
function copyFunction(){var e=document.getElementById('getlink');e.select();navigator.clipboard.writeText(e.value).then(function(){document.getElementById('share-notif').innerHTML='<span>'+(document.documentElement.lang==='ar'?'?? ??? ??????!':'Copy the link!')+'</span>'})['catch'](function(){document.execCommand('copy');document.getElementById('share-notif').innerHTML='<span>'+(document.documentElement.lang==='ar'?'?? ??? ??????!':'Copy the link!')+'</span>'})}
// Comment open button
document.addEventListener('DOMContentLoaded',function(){var b=document.querySelector('.open-comment');if(b)b.addEventListener('click',function(){var c=document.querySelector('#comments');if(c)c.scrollIntoView({behavior:'smooth'})})});
// Comment editor lazy-load
(function(){var c=document.querySelector('#comment-editor,#comments-iframe');if(!c)return;var io=new IntersectionObserver(function(e){e.forEach(function(entry){if(entry.isIntersecting){c.src=c.getAttribute('data-src')||c.src;io.unobserve(c)}})},{rootMargin:'200px'});io.observe(c)})();
// Random Posts
(function(){var r=document.getElementById('RandomPosts');if(!r)return;fetch('/feeds/posts/default?alt=json&redirect=false&max-results=10').then(function(res){return res.json()}).then(function(d){var entries=d.feed.entry||[],shuffled=entries.sort(function(){return 0.5-Math.random()}).slice(0,4),html='';shuffled.forEach(function(e){var l=e.link||[],u='';for(var i=0;i<l.length;i++){if(l[i].rel==='alternate'){u=l[i].href;break}}var t=e.title.$t||'',th=e.media$thumbnail?e.media$thumbnail.url.replace(/\/default.*/,'/mqdefault'):'';html+='<div class="newPost"><a class="reimage" href="'+u+'"><img src="'+th+'"></a><h4><a href="'+u+'">'+t+'</a></h4></div>'});r.innerHTML='<div class="post-random">'+html+'</div>'})})();
// Random Posts placement (top)
(function(){var r=document.getElementById('RandomPosts'),t=document.getElementById('top-mkan');if(r&&t)t.parentNode.insertBefore(r,t.nextSibling)})();
// Random Posts placement (midpoint)
(function(){var r=document.getElementById('RandomPosts');if(!r)return;var p=document.querySelector('.post-body');if(!p)return;var paras=p.querySelectorAll('p');if(paras.length===0)return;var mid=Math.floor(paras.length/2);paras[mid].parentNode.insertBefore(r,paras[mid].nextSibling)})();

// ========== Core Application Script ==========
var _monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function renderFeed(el, a) {
  if (!a || !a.feed) { if (window.console) console.log('renderFeed: no feed'); return; }
  var entries = a.feed.entry || [];
  var h = '';
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    var title = e.title.$t || '';
    var url = '';
    var links = e.link || [];
    for (var j = 0; j < links.length; j++) {
      if (links[j].rel == 'alternate') { url = links[j].href; break; }
    }
    var thumb = '';
    if (e.media$thumbnail && e.media$thumbnail.url) {
      thumb = e.media$thumbnail.url.replace(/\/default.*/, '/mqdefault');
    }
    var snippet = (e.content ? e.content.$t : (e.summary ? e.summary.$t : ''));
    snippet = snippet.replace(/<[^>]*>/g, '').substring(0, 100);
    var author = (e.author && e.author[0]) ? e.author[0].name.$t : '';
    var pub = e.published ? e.published.$t : '';
    var dateStr = '';
    if (pub) {
      var dt = new Date(pub);
      dateStr = _monthNames[dt.getMonth()] + ' ' + dt.getDate() + ', ' + dt.getFullYear();
    }
    h += "<div class='posts'>";
    h += "<a class='author' href='" + url + "'><svg aria-hidden='true' focusable='false' data-prefix='fal' data-icon='user-circle' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 496 512' class='icon small-icon'><path fill='currentColor' d='M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z'></path></svg>" + author + "</a>";
    h += "<a class='PLHolder thumb' href='" + url + "'><img alt='" + title.replace(/'/g,"&apos;") + "' data-src='" + thumb + "' loading='lazy' decoding='async' /></a>";
    h += "<div class='cont'><h3 class='rnav-title'><a title='" + title.replace(/'/g,"&apos;") + "' href='" + url + "'>" + title + "</a></h3>";
    h += "<div class='items'><span class='Date'><a href='" + url + "'>" + dateStr + "</a></span></div>";
    h += "<div class='Short_content'>" + snippet + "...</div></div>";
    h += "<a class='moreLink' title='" + title.replace(/'/g,"&apos;") + "' href='" + url + "'></a>";
    h += "</div>";
  }
  el.innerHTML = h;
  el.querySelectorAll('img[data-src]').forEach(function(img) { imgObserver.observe(img); });
}

function lazyLoadImg(img) {
  var src = img.getAttribute('data-src');
  if (!src) return;
  if (src.indexOf('img.youtube.com') >= 0) {
    src = src.replace('img.youtube.com', 'ytimg.com').replace('/default', '/mqdefault');
  }
  img.setAttribute('src', src);
  img.setAttribute('loading', 'lazy');
  img.removeAttribute('data-src');
  img.parentElement.classList.remove('PLHolder');
  img.parentElement.classList.remove('not-pl');
  img.onerror = function() { this.src = ''; };
}

var imgObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      lazyLoadImg(entry.target);
      imgObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '200px' });

function fetchFeed(el) {
  var cat = el.getAttribute('name') || '';
  var count = 4;
  if (el.classList.contains('Sp-posts0')) count = 3;
  else if (el.classList.contains('Sp-posts1')) count = 3;
  else if (el.classList.contains('Sp-posts2')) count = 4;
  else if (el.classList.contains('Sp-posts3')) count = 5;
  else if (el.classList.contains('Sp-posts4')) count = 6;
  else if (el.classList.contains('Sp-posts5')) count = 8;
  else if (el.classList.contains('Sp-Normal')) count = 6;
  var url;
  if (cat) {
    url = '/feeds/posts/default/-/' + encodeURIComponent(cat) + '?alt=json&redirect=false&start-index=1&max-results=' + count;
  } else {
    url = '/feeds/posts/default/?alt=json&redirect=false&start-index=1&max-results=' + count;
  }
  fetch(url).then(function(r) { return r.json(); }).then(function(data) {
    renderFeed(el, data);
  }).catch(function() {});
}

document.addEventListener('DOMContentLoaded', function() {
  var divs = document.querySelectorAll('.Ajax');
  for (var i = 0; i < divs.length; i++) { fetchFeed(divs[i]); }
  document.querySelectorAll('img[data-src]').forEach(function(img) { imgObserver.observe(img); });
});

// Smart Ad Injector (CLS-safe, IntersectionObserver-based)
(function() {
  var adContainer = document.querySelector('.smart-ad-container');
  if (!adContainer || !adContainer.innerHTML.trim()) return;
  var adHtml = adContainer.innerHTML;
  adContainer.style.display = 'none';
  var adSlots = {};
  adHtml.replace(/<!--\s*(\w[\w-]*)\s*-->([\s\S]*?)(?=<!--\s*\w[\w-]*\s*-->|$)/g, function(m, name, content) {
    adSlots[name] = content.trim();
  });
  var adTargets = {
    'top-ad': '#top-a3lan',
    'mid-ad': '.post-body p:nth-of-type(' + Math.ceil(document.querySelectorAll('.post-body p').length / 2) + ')',
    'bottom-ad': '#bot-a3lan',
    'related-ad': '#ret-a3lan',
    'after-h1': '.post-body h1',
    'after-h2-1': '.post-body h2:nth-of-type(1)',
    'after-h2-2': '.post-body h2:nth-of-type(2)',
    'after-h2-3': '.post-body h2:nth-of-type(3)',
    'after-h3-1': '.post-body h3:nth-of-type(1)',
    'after-h3-2': '.post-body h3:nth-of-type(2)',
    'after-h3-3': '.post-body h3:nth-of-type(3)',
    'after-h4-1': '.post-body h4:nth-of-type(1)',
    'after-h4-2': '.post-body h4:nth-of-type(2)',
    'after-h4-3': '.post-body h4:nth-of-type(3)',
    'after-bq-1': '.post-body blockquote:nth-of-type(1)',
    'after-bq-2': '.post-body blockquote:nth-of-type(2)',
    'after-bq-3': '.post-body blockquote:nth-of-type(3)',
    'after-more': '.post-body a[name="more"]',
    'after-p1': '.post-body p:nth-of-type(1)',
    'after-p2': '.post-body p:nth-of-type(2)',
    'after-p3': '.post-body p:nth-of-type(3)'
  };
  Object.keys(adTargets).forEach(function(key) {
    if (!adSlots[key]) return;
    var target = document.querySelector(adTargets[key]);
    if (!target) return;
    var div = document.createElement('div');
    div.className = 'ad-unit';
    div.innerHTML = adSlots[key];
    var io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          div.classList.add('loaded');
          io.unobserve(div);
        }
      });
    }, { rootMargin: '200px' });
    io.observe(div);
    target.parentNode.insertBefore(div, target.nextSibling);
  });
})();

// Search: open/close overlay
document.addEventListener('DOMContentLoaded', function() {
  var searchIcon = document.querySelector('.search a');
  var stxk = document.querySelector('.stxk');
  var searchBox = document.querySelector('.search-box');
  var searchClose = document.querySelector('.search-submit2');
  var searchInput = document.querySelector('.search-field');
  var searchForm = document.querySelector('.search-form');
  var mobileSearch = document.querySelector('.search-link .link');

  function openSearch() {
    stxk.classList.add('active');
    searchBox.classList.add('active');
    setTimeout(function() { searchInput.focus(); }, 100);
  }
  function closeSearch() {
    stxk.classList.remove('active');
    searchBox.classList.remove('active');
  }
  if (searchIcon) searchIcon.addEventListener('click', function(e) { e.preventDefault(); openSearch(); });
  if (stxk) stxk.addEventListener('click', closeSearch);
  if (searchClose) searchClose.addEventListener('click', function(e) { e.preventDefault(); closeSearch(); });
  if (mobileSearch) mobileSearch.addEventListener('click', function(e) { e.preventDefault(); openSearch(); });
  if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
      if (e.keyCode == 13 && searchForm) { searchForm.submit(); }
    });
  }
});



function replaceSrc(a) {
  var c = document.querySelector('.posts');
  if (c) {
    c.querySelectorAll('img').forEach(function(e) {
      var f = e.getAttribute('src');
      if (f && f.indexOf('-rw-') >= 0) e.setAttribute('src', a);
    });
  }
}

function galio(a) { return parseInt(a, 16); }

// SEO: Estimated reading time
document.addEventListener('DOMContentLoaded', function() {
  var rt = document.querySelector('.reading-time');
  if (rt) {
    var body = document.querySelector('.post-body');
    if (body) {
      var text = body.textContent || '';
      var words = text.trim().split(/\s+/).length;
      var min = Math.max(1, Math.round(words / 200));
      var label = min <= 1 ? '????? ?????' : min + ' ????? ?????';
      rt.textContent = label;
    }
  }
});

// SEO: Dynamic FAQPage schema
document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('.post-body .faq-accordion, .post-body .faq-item')) {
    var items = [];
    document.querySelectorAll('.post-body .faq-accordion details, .post-body details.faq-item').forEach(function(el) {
      var q = el.querySelector('summary');
      var a = el.querySelector('.faq-answer, .faq-a');
      if (q && a) {
        items.push({
          '@type': 'Question',
          'name': q.textContent.trim(),
          'acceptedAnswer': { '@type': 'Answer', 'text': a.textContent.trim() }
        });
      }
    });
    if (items.length) {
      if (document.querySelector('script[type="application/ld+json"][data-faq="1"]')) return;
      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-faq','1');
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': items });
      document.head.appendChild(script);
    }
  }
});
// Google Translate
function toggleTransPanel() {
  var panel = document.querySelector('.wTrans');
  var overlay = document.querySelector('.fCls');
  var cb = document.getElementById('forTranslate');
  if (panel) panel.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
  if (cb) cb.checked = panel ? panel.classList.contains('open') : false;
}
function closeTransPanel() {
  var panel = document.querySelector('.wTrans');
  var overlay = document.querySelector('.fCls');
  var cb = document.getElementById('forTranslate');
  if (panel) panel.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  if (cb) cb.checked = false;
}
function moveTranslateGadget() {
  var gadget = document.querySelector('.goog-te-gadget');
  var src = document.getElementById('google_translate_element');
  if (!gadget && src) gadget = src.querySelector('.goog-te-gadget');
  var panel = document.querySelector('.transC');
  if (gadget && panel && !panel.contains(gadget)) {
    panel.appendChild(gadget);
  }
}
(function waitForGadget(remaining) {
  if (remaining <= 0) return;
  var gadget = document.querySelector('.goog-te-gadget');
  var panel = document.querySelector('.transC');
  if (gadget && panel) {
    if (!panel.contains(gadget)) panel.appendChild(gadget);
    return;
  }
  setTimeout(function() { waitForGadget(remaining - 1); }, 1000);
})(30);
function cleanupGoogleTranslate() {
  var banner = document.querySelector('.goog-te-banner-frame');
  if (banner) banner.style.display = 'none';
  document.body.style.top = '0px';
  document.body.style.position = '';
  document.body.style.minHeight = '';
  moveTranslateGadget();
}
setTimeout(function() { cleanupGoogleTranslate(); }, 2000);
setTimeout(function() { cleanupGoogleTranslate(); }, 6000);

