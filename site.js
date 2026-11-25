(function(){
// Never show goldook.com inside another site's frame (clickjacking).
if (window.top !== window.self) { document.documentElement.style.display = "none"; try { window.top.location = window.location.href; } catch (e) {} }
var b=document.querySelector('.menu-btn'),n=document.getElementById('nav');if(b)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'}):null;
document.querySelectorAll('.reveal').forEach(function(el){io?io.observe(el):el.classList.add('in')});})();
