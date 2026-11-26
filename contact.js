(function(){var f=document.getElementById('enquiry'),m=f.querySelector('.form-msg'),b=f.querySelector('button');
var t=new URLSearchParams(location.search).get('topic');if(t&&f.topic.querySelector('option[value="'+t+'"]'))f.topic.value=t;
f.addEventListener('submit',function(e){e.preventDefault();m.className='form-msg';
 var cap=f.querySelector('[name="cf-turnstile-response"]');
 var d={name:f.name.value.trim(),email:f.email.value.trim(),phone:f.phone.value.trim()||null,topic:f.topic.value,message:f.message.value.trim(),page:location.pathname,website:f.website.value,captcha:cap?cap.value:''};
 if(d.name.length<2){m.textContent='Please enter your name.';m.classList.add('err');f.name.focus();return}
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){m.textContent='Please enter a valid email address.';m.classList.add('err');f.email.focus();return}
 if(d.message.length<5){m.textContent='Please write a short message.';m.classList.add('err');f.message.focus();return}
 if(cap&&!d.captcha){m.textContent='Please complete the "I am human" check above the button.';m.classList.add('err');return}
 b.disabled=true;b.textContent='Sending…';
 fetch("https://lzupbmnpxgdpyrrxaejl.supabase.co/functions/v1/enquiry",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)})
 .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(r.ok&&j.ok){f.reset();m.textContent='Thank you! Your message is on its way. We\'ll reply to '+d.email+'.';m.classList.add('ok')}else throw new Error(j.error||'failed')})})
 .catch(function(err){var e=err.message;m.textContent=e==='too_many'?'You have sent several messages already. Please try again in an hour.':/captcha/.test(e)?'The "I am human" check did not pass. Please tick it again and resend.':'Sorry, that did not send. Please try again or email support@goldook.com.';m.classList.add('err')})
 .finally(function(){b.disabled=false;b.textContent='Send message';if(window.turnstile&&cap)try{window.turnstile.reset()}catch(x){}})});})();
