(function(){var f=document.getElementById('enquiry'),m=f.querySelector('.form-msg'),b=f.querySelector('button');
var t=new URLSearchParams(location.search).get('topic');if(t&&f.topic.querySelector('option[value="'+t+'"]'))f.topic.value=t;
f.addEventListener('submit',function(e){e.preventDefault();m.className='form-msg';
 if(f.website.value)return;
 var d={name:f.name.value.trim(),email:f.email.value.trim(),phone:f.phone.value.trim()||null,topic:f.topic.value,message:f.message.value.trim(),page:location.pathname};
 if(d.name.length<2){m.textContent='Please enter your name.';m.classList.add('err');f.name.focus();return}
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){m.textContent='Please enter a valid email address.';m.classList.add('err');f.email.focus();return}
 if(d.message.length<5){m.textContent='Please write a short message.';m.classList.add('err');f.message.focus();return}
 b.disabled=true;b.textContent='Sending…';
 fetch("https://lzupbmnpxgdpyrrxaejl.supabase.co/rest/v1/enquiries",{method:'POST',headers:{'Content-Type':'application/json',apikey:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dXBibW5weGdkcHlycnhhZWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzMjYzNTUsImV4cCI6MjExMDkwMjM1NX0.N6bCc-A_V9vi59KCp6VThaFMYPwHpqbyKXbIMCEGCFs",Authorization:'Bearer '+"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6dXBibW5weGdkcHlycnhhZWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTUzMjYzNTUsImV4cCI6MjExMDkwMjM1NX0.N6bCc-A_V9vi59KCp6VThaFMYPwHpqbyKXbIMCEGCFs",Prefer:'return=minimal'},body:JSON.stringify(d)})
 .then(function(r){if(r.ok){f.reset();m.textContent='Thank you! Your message is on its way. We\'ll reply to '+d.email+'.';m.classList.add('ok')}else return r.json().then(function(j){throw new Error(j&&j.message||'failed')})})
 .catch(function(err){m.textContent=/too many/i.test(err.message)?'You have sent several messages already. Please try again in an hour.':'Sorry, that did not send. Please try again or email support@goldook.com.';m.classList.add('err')})
 .finally(function(){b.disabled=false;b.textContent='Send message'})});})();
