//<![CDATA[

/* =====================================================
   قالب أسطورة سيو v8.0 - سكربت مُصلح ومُحسّن
   الإصلاحات: إزالة كود الحماية المعطّل + تحسين تحميل الصور
   ===================================================== */

// ========== 1. معالجة أخطاء تحميل الصور ==========
function replaceSrc(e){
  var src=e.target.getAttribute("src");
  if(src){
    var newSrc=src.replace("-rw-","-");
    e.target.setAttribute("src",newSrc);
  }
}

// ========== 2. تحميل الصور بالتأخير (Lazy Loading) - مُحسّن بـ IntersectionObserver ==========
var lazyObserver=new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if(entry.isIntersecting){
      var img=entry.target;
      var dataSrc=img.getAttribute("data-src");
      if(!dataSrc)return;

      var containerWidth=Math.ceil(img.parentNode.offsetWidth)+50;
      var newSrc=function(url){
        try{
          if(-1!==url.indexOf("img.youtube.com")||-1!==url.indexOf("ytimg.com")){
            url=url.replace("/default","/mqdefault");
          }else{
            url=url.replace(/\/(s72\-c|s40\-c|s1600\-c|s72\-rc|s220|s640|s1600|s16000|s113|s0-rw-e90|s1600-rw-e90|w1600)\//,'/s'+parseInt(containerWidth)+"-rw-e90/");
            if(-1===url.indexOf('/s'+parseInt(containerWidth)+"-rw-e90/")){
              url=url.replace(/=s\d+(-[^/&]*)?/,"=s"+parseInt(containerWidth));
            }
          }
        }finally{
          return url;
        }
      }(dataSrc);

      if(0<img.parentNode.offsetWidth){
        img.setAttribute("src",newSrc);
        img.removeAttribute("data-src");
        img.parentElement.classList.remove("PLHolder");
        img.parentElement.classList.add("not-pl");
        img.onerror=replaceSrc;
      }else{
        img.removeAttribute("data-src");
        img.remove();
      }
      lazyObserver.unobserve(img);
    }
  });
},{rootMargin:'200px'});

function changeDS(){
  document.querySelectorAll("img[data-src]").forEach(function(img){
    lazyObserver.observe(img);
  });
}

window.addEventListener("load",changeDS);
document.addEventListener("scroll",changeDS);

// مُلاحظة: الصور الموجودة بالفعل في منطقة العرض سيتم تحميلها تلقائياً بفضل IntersectionObserver

document.querySelectorAll("img").forEach(function(el){
  var src=el.getAttribute("src"),fallback;
  if(src){
    fallback=src.replace("-rw-","-");
    el.onerror=el.setAttribute("src",fallback);
  }
});

// ========== 3. عرض المشاركات حسب التصنيف ==========
function pllrstNew(data,container){
  var html='';
  html+="<div class='Posts-byCategory'>";
  for(var i=0;24>i;i++){
    var entry=data.feed.entry[i],postUrl='';
    if(i==data.feed.entry.length)break;
    for(var imgUrl,author,date,excerpt,monthName,months,monthNum,pubDate,j=0;j<entry.link.length;j++){
      if('alternate'==entry.link[j].rel){
        postUrl=entry.link[j].href;
        break;
      }
    }
    var tempDiv;
    imgUrl=entry.content&&(tempDiv=document.createElement("div"),tempDiv.innerHTML=entry.content.$t,tempDiv.querySelector("img"))?tempDiv.querySelector("img").getAttribute("src"):entry.media$thumbnail&&entry.media$thumbnail.url?entry.media$thumbnail.url:altImage;
    if(''!=postUrl){
      author=entry.author[0]&&entry.author[0].uri&&''!=entry.author[0].uri.$t?'<a class="author" href="'+entry.author[0].uri.$t+'"><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="user-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="icon small-icon"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"></path></svg>'+entry.author[0].name.$t+'</a>':'<a href="javascript:void(0)"></a>';
      var title=entry.title.$t;
      excerpt=300<(rawText=entry.content?entry.content.$t.replace(/<\S[^>]*>/g,''):entry.summary.$t.replace(/<\S[^>]*>/g,'')).length?rawText.substring(0,100)+"...":rawText;
      var category=entry.category?entry.category[0].term:'';
      monthNum=entry.published.$t.substr(5,2);
      (months=[])[1]=January,months[2]=February,months[3]=March,months[4]=April,months[5]=May,months[6]=June,months[7]=July,months[8]=August,months[9]=September,months[10]=October,months[11]=November,months[12]=December;
      monthName=0===monthNum.indexOf('0')?months[monthNum.replace('0','')]:months[monthNum];
      pubDate=entry.published.$t.substr(8,2)+' '+monthName+' '+entry.published.$t.substr(0,4);
      if(100<rawText.length)rawText.substring(0,100);
      html+="<div class='posts postnum"+i+"'><a title='"+title+"' class='PLHolder thumb' href='"+postUrl+"' ><img alt='"+title+"' data-src='"+imgUrl+"' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJAQMAAAAB5D5xAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjwA0AABsAAQrj5HwAAAAASUVORK5CYII=' loading='lazy' decoding='async'/></a><div class='cont'><h3 class='rnav-title'><a title='"+title+"' href='"+postUrl+"'>"+title+'</a></h3><div class="items">'+author+"<span class='Date'><a href='"+postUrl+"'><svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fal\" data-icon=\"clock\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\" class=\"icon small-icon\"><path fill=\"currentColor\" d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z\"></path></svg>"+pubDate+"</a></span></div><div class='Short_content'>"+excerpt+"</div><a class='moreLink' title='"+title+"' href='"+postUrl+"'>"+ReadMore+"</a></div></div>";
    }
  }
  html+="</div>";
  if(container.parentElement){
    container.parentElement.innerHTML=html;
  }
  // مُلاحظة الصور الجديدة بـ IntersectionObserver
  changeDS();
}

// ========== 4. تحميل المشاركات عبر AJAX ==========
function loadPosts(){
  document.querySelectorAll(".Ajax").forEach(function(el){
    var label=el.getAttribute("name"),
        count=5,
        theme=el.getAttribute("theam"),
        parentClass=el.parentElement.classList[0];
    if(-1!=parentClass.search("Sp-posts0"))count=posts0Length.replace("px","");
    if(-1!=parentClass.search("Sp-posts1"))count=posts1Length.replace("px","");
    if(-1!=parentClass.search("Sp-posts2"))count=posts2Length.replace("px","");
    if(-1!=parentClass.search("Sp-posts3"))count=posts3Length.replace("px","");
    if(-1!=parentClass.search("Sp-posts4"))count=posts4Length.replace("px","");
    if(-1!=parentClass.search("Sp-posts5"))count=posts5Length.replace("px","");
    if(-1!=parentClass.search("Sp-posts6"))count=posts6Length.replace("px","");
    if(-1!=parentClass.search("Sp-slide"))count=slideLength.replace("px","");
    if(-1!=parentClass.search("Sp-3colList"))count=lListsLength.replace("px","");
    if(-1!=parentClass.search("Sp-shreet"))count=shreetLength.replace("px","");
    if(-1!=parentClass.search("Sp-Normal"))count=postsNormalLength.replace("px","");
    var elTop=el.getBoundingClientRect().top-document.querySelector("body").getBoundingClientRect().top;
    if(window.pageYOffset+window.innerHeight>elTop){
      if(-1==theme.search("LastPost")){
        fetch(Url+"feeds/posts/default/-/"+label+"?alt=json&redirect=false&start-index=1&max-results="+count).then(r=>r.json()).then(data=>{
          pllrstNew(data,el);
        });
      }else{
        fetch(Url+"feeds/posts/default/?alt=json&redirect=false&start-index=1&max-results="+count).then(r=>r.json()).then(data=>{
          pllrstNew(data,el);
        });
      }
    }
  });
}

window.addEventListener("load",loadPosts);
document.addEventListener("scroll",loadPosts);

// ========== 5. تأثير التمرير للهيدر ==========
if(!document.querySelector('#StopSitkyHeadar')){
  var headerID=document.getElementById("sp-header");
  window.onscroll=function(){
    if(100<window.pageYOffset){
      headerID.classList.add("active");
    }else{
      headerID.classList.remove("active");
    }
  };
}

// ========== 6. تنظيف عناوين الويدجت ==========
document.querySelectorAll('.widget .title').forEach(function(title){
  title.innerHTML=title.innerHTML.replace("[posts0]",'');
  title.innerHTML=title.innerHTML.replace("[posts1]",'');
  title.innerHTML=title.innerHTML.replace("[posts2]",'');
  title.innerHTML=title.innerHTML.replace("[posts3]",'');
  title.innerHTML=title.innerHTML.replace("[posts4]",'');
  title.innerHTML=title.innerHTML.replace("[posts5]",'');
  title.innerHTML=title.innerHTML.replace("[posts6]",'');
  title.innerHTML=title.innerHTML.replace("[3colList]",'');
  title.innerHTML=title.innerHTML.replace('[slide]','');
  title.innerHTML=title.innerHTML.replace("[LastPost]",'');
  title.innerHTML=title.innerHTML.replace("[postsNormal]",'');
  title.innerHTML=title.innerHTML.replace("[LastComments]",'');
});

// ========== 7. تحميل المزيد من المشاركات ==========
var olderLink=$(".blog-pager-older-link").attr("href");

function stickySideBarOn(){
  if($("#sidepar-wid").length){
    $added=$el.outerHeight()>window.innerHeight?$el.outerHeight()-window.innerHeight:-75;
    $limit=$(".bocker").offset().top+$(".bocker").outerHeight();
    var scrollTop=$(this).scrollTop();
    $fixed=1;
    if(scrollTop>$limit-window.innerHeight){
      $el.css({'position':"absolute",'top':$limit-window.innerHeight-$(".bocker").offset().top-$added+'px','left':0});
      $fixed=0;
    }
    if(scrollTop>$sticky&&$fixed){
      $el.css({'position':"absolute",'top':0<=scrollTop-$(".bocker").offset().top-$added?scrollTop-$(".bocker").offset().top-$added+'px':0,'left':0});
    }
    if(scrollTop<$sticky){
      $el.css({'position':"static"});
    }
  }
}

if(olderLink){
  $(".loadMorePosts").show();
}
$(".loadMorePosts a").on("click",function(e){
  $(".loadMorePosts").hide();
  $.ajax({
    'url':olderLink,
    'success':function(data){
      var newPosts=$(data).find(".blog-posts");
      newPosts.children('.status-msg-wrap').remove();
      $(".blog-posts").append(newPosts.html());
      olderLink=$(data).find(".blog-pager-older-link").attr("href");
      if(olderLink){
        $('.loadMorePosts').show();
      }else{
        $(".noMorePosts").show();
      }
      // مُلاحظة الصور الجديدة بعد تحميل المزيد
      changeDS();
    },
    'beforeSend':function(){
      $(".loadMore > #loader").show();
    },
    'complete':function(){
      $(".loadMore > #loader").hide();
    }
  });
  e.preventDefault();
});

// ========== 8. الشريط الجانبي الثابت ==========
if($("#sidepar-wid").length){
  if($("#sidepar-wid").outerHeight()>$(".r-r").outerHeight()||!$('#StikySidepar').length&&860<$(window).width()){
    $el=$("#sidepar-wid");
    $added=$el.outerHeight()>window.innerHeight?$el.outerHeight()-window.innerHeight:-75;
    $sticky=$el.offset().top+$added;
    $(window).scroll(function(){stickySideBarOn();});
    $(document).ready(function(){stickySideBarOn();});
  }
}

// ========== 9. شريط المشاركات المتحرك (Sp-shreet) ==========
$(window).ready(function(){
  $i=$(".Sp-shreet").width();
  $enter=false;
  $(".Sp-shreet").mouseenter(function(){$enter=true;});
  $(".Sp-shreet").mouseleave(function(){$enter=false;});
  setInterval(function(){
    if(!$enter){
      $i-=1;
      if(Math.abs($i)>$(".Sp-shreet .Posts-byCategory").width()&&$(".Sp-shreet .Posts-byCategory").width()>$('.Sp-shreet').width()){
        $i=$(".Sp-shreet").width();
        if($('body').hasClass("rtl")){
          $(".Sp-shreet .Posts-byCategory").css({'right':$i+'px','display':"none"});
        }else{
          $('.Sp-shreet .Posts-byCategory').css({'left':$i+'px','display':'none'});
        }
      }else{
        if($("body").hasClass('rtl')){
          $(".Sp-shreet .Posts-byCategory").css({'right':$i+'px','display':"flex"});
        }else{
          $('.Sp-shreet .Posts-byCategory').css({'left':$i+'px','display':"flex"});
        }
      }
    }
  },15);
});
/*]]>*/
//]]>
