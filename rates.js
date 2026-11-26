(function(){function gkRates(src,cb){if(!src){cb(null);return}fetch(src,{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(d){cb(d&&d.metals&&d.metals.XAU?d:null)}).catch(function(){cb(null)})}
var inr=function(v){return '₹'+Math.round(v).toLocaleString('en-IN')};
var box=document.getElementById('rates');if(!box)return;var note=box.querySelector('.rate-note');
gkRates(box.dataset.src,function(d){if(!d){note.textContent='Could not load today’s rate right now. Please refresh, or open the app.';return}
 var g=d.metals.XAU.price,s=d.metals.XAG&&d.metals.XAG.price;
 box.querySelectorAll('[data-k]').forEach(function(td){td.textContent=inr(g*(+td.dataset.k)/24*(+td.dataset.g))});
 box.querySelectorAll('[data-silver]').forEach(function(td){if(s){var u=td.querySelector('span');td.textContent=inr(s*(+td.dataset.silver))+' ';if(u)td.appendChild(u)}});
 var t=new Date(d.updatedAt||d.metals.XAU.ts),ch=d.metals.XAU.changePct;
 note.textContent='Updated '+t.toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'})+(typeof ch==='number'?' · 24K '+(ch>=0?'up ':'down ')+Math.abs(ch).toFixed(2)+'% in 24 hours':'')+'.'})})();
