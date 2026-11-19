(function(){
  var b=document.querySelector('.burger'),m=document.getElementById('menu');
  if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('open')){m.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}})}
  document.querySelectorAll('.has-dd>button').forEach(function(t){t.addEventListener('click',function(){var li=t.parentNode,o=li.classList.toggle('open');t.setAttribute('aria-expanded',o)})});
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)})}else{document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in')})}
  var f=document.getElementById('enquiry');
  if(f){var sel=f.querySelector('#topic'),q=new URLSearchParams(location.search).get('to');
    if(q){for(var i=0;i<sel.options.length;i++){if(sel.options[i].dataset.key===q){sel.selectedIndex=i}}}
    var show=document.getElementById('route-to');function upd(){var o=sel.options[sel.selectedIndex];show.textContent=o&&o.value?o.value:'enquiry@dktconsult.com'}sel.addEventListener('change',upd);upd();
    var st=document.getElementById('form-status'),btn=document.getElementById('send');
    function msg(cls,html){st.className=cls?'form-msg '+cls:'';st.innerHTML=html}
    f.addEventListener('submit',function(e){e.preventDefault();if(!f.reportValidity())return;
      var o=sel.options[sel.selectedIndex],to=o.value||'enquiry@dktconsult.com',v=function(id){return(f.querySelector('#'+id).value||'').trim()};
      var topic=o.text,data={_subject:'Website enquiry: '+topic,_replyto:v('email'),_captcha:'false',_template:'table',_honey:v('hp'),
        Topic:topic,Name:v('name'),Email:v('email'),Phone:v('phone')||'-',Company:v('org')||'-',Message:v('msg'),Page:location.href};
      var mail='mailto:'+to+'?subject='+encodeURIComponent(data._subject)+'&body='+encodeURIComponent('Name: '+data.Name+'\nEmail: '+data.Email+'\nPhone: '+data.Phone+'\nCompany: '+data.Company+'\nTopic: '+topic+'\n\n'+data.Message);
      btn.disabled=true;btn.textContent='Sending…';msg('wait','Sending your enquiry. This can take up to a minute; please keep this page open.');
      function post(n){return fetch('https://formsubmit.co/ajax/'+to,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){return r.json().catch(function(){return{}}).then(function(j){if(!r.ok||String(j.success)==='false')throw new Error(j.message||'failed');return j})})
        .catch(function(err){if(n>1)return new Promise(function(ok){setTimeout(ok,2500)}).then(function(){return post(n-1)});throw err})}
      post(3)
      .then(function(){f.reset();upd();msg('ok','<strong>Thank you. Your enquiry has been sent.</strong> We will reply to you by email as soon as possible.');btn.textContent='Sent'})
      .catch(function(){msg('err','Sorry, your enquiry could not be sent just now. Please try again, or <a href="'+mail+'">email us directly at '+to+'</a>.');btn.disabled=false;btn.textContent='Send enquiry'})
      .then(function(){if(btn.textContent==='Sent')setTimeout(function(){btn.disabled=false;btn.textContent='Send enquiry'},4000)})
})}
})();
