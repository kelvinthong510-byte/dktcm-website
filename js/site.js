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
    var show=document.getElementById('route-to');function upd(){var o=sel.options[sel.selectedIndex];show.textContent=o&&o.value?o.value:'admin@dktconsult.com'}sel.addEventListener('change',upd);upd();
    f.addEventListener('submit',function(e){e.preventDefault();if(!f.reportValidity())return;
      var o=sel.options[sel.selectedIndex],to=o.value||'admin@dktconsult.com',v=function(id){return(f.querySelector('#'+id).value||'').trim()};
      var subj='Website enquiry: '+o.text+(v('org')?' ('+v('org')+')':'');
      var body='Name: '+v('name')+'\nEmail: '+v('email')+'\nPhone: '+v('phone')+'\nOrganisation: '+v('org')+'\nTopic: '+o.text+'\n\n'+v('msg');
      location.href='mailto:'+to+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body)})}
})();
