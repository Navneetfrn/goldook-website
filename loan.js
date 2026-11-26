(function(){function gkRates(src,cb){if(!src){cb(null);return}fetch(src,{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(d){cb(d&&d.metals&&d.metals.XAU?d:null)}).catch(function(){cb(null)})}
var inr=function(v){return '₹'+Math.round(v).toLocaleString('en-IN')};
var f=document.getElementById('loancalc');if(!f)return;var o=function(k){return f.querySelector('[data-o="'+k+'"]')};
function calc(){var n=function(x){return parseFloat(f[x].value)||0};var g=n('g'),k=+f.k.value,r=n('r'),ltv=Math.min(n('ltv'),100),i=n('i'),m=Math.round(n('n'));
 if(!(g>0&&r>0)){['value','loan','emi','int'].forEach(function(x){o(x).textContent='–'});return}
 var val=g*r*k/24,loan=val*ltv/100,mr=i/1200,emi=m>0?(mr>0?loan*mr*Math.pow(1+mr,m)/(Math.pow(1+mr,m)-1):loan/m):0;
 o('value').textContent=inr(val);o('loan').textContent=inr(loan);o('emi').textContent=m>0?inr(emi)+' × '+m:'–';o('int').textContent=m>0?inr(emi*m-loan):'–'}
f.addEventListener('input',calc);f.addEventListener('submit',function(e){e.preventDefault()});
gkRates(f.dataset.src,function(d){if(d&&!f.r.value)f.r.value=Math.round(d.metals.XAU.price);else if(!d)f.r.placeholder='Type today’s 24K rate';calc()});calc()})();
