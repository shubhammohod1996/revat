'use strict';
// Optional production integration: set window.REVAT_CONFIG = { leadEndpoint: 'https://your-secure-endpoint.example/api/enquiries' }
// before loading this file, and deploy a reviewed privacy notice, server-side validation, spam protection and consent records.
(() => {
  const $ = (selector, context=document) => context.querySelector(selector);
  const $$ = (selector, context=document) => Array.from(context.querySelectorAll(selector));

  const toggle = $('#menu-toggle'), menu = $('#primary-menu');
  if (toggle && menu) {
    const setOpen = (open) => {menu.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');};
    toggle.addEventListener('click',()=>setOpen(!menu.classList.contains('open')));
    $$('#primary-menu a').forEach(a=>a.addEventListener('click',()=>setOpen(false)));
    window.addEventListener('keydown',event=>{if(event.key==='Escape')setOpen(false)});
    window.addEventListener('resize',()=>{if(window.innerWidth>940)setOpen(false)});
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}});
    },{threshold:.10,rootMargin:'0px 0px 55px 0px'});
    $$('.reveal').forEach(el=>observer.observe(el));
  } else $$('.reveal').forEach(el=>el.classList.add('visible'));

  const track = $('#insight-track'), prev = $('#carousel-prev'), next = $('#carousel-next');
  if (track && prev && next) {
    let index=0;
    const slides=$$('.slide',track);
    function visibleCount(){return window.innerWidth<=620?1:window.innerWidth<=940?2:3;}
    function show(){
      const max=Math.max(0,slides.length-visibleCount());index=Math.max(0,Math.min(max,index));
      const gap=parseFloat(getComputedStyle(track).gap)||0;
      const step=slides[0].getBoundingClientRect().width+gap;
      track.style.transform=`translateX(-${index*step}px)`;
      prev.disabled=index===0;next.disabled=index===max;
      prev.style.opacity=index===0?'.45':'1';next.style.opacity=index===max?'.45':'1';
    }
    prev.addEventListener('click',()=>{index--;show()});next.addEventListener('click',()=>{index++;show()});
    window.addEventListener('resize',show);show();
  }

  const filters=$$('.filter-chip[data-filter]');
  filters.forEach(chip=>chip.addEventListener('click',()=>{
    const filter=chip.dataset.filter;
    filters.forEach(item=>{const selected=item===chip;item.classList.toggle('active',selected);item.setAttribute('aria-pressed',String(selected))});
    $$('.faq[data-group]').forEach(item=>{const visible=filter==='all'||item.dataset.group===filter;item.classList.toggle('hidden',!visible);if(!visible)item.open=false});
  }));

  const traderInput=$('#traders-range'), traderOut=$('#traders-out'), perInput=$('#per-trader-range'), perOut=$('#per-trader-out'), total=$('#allocation-total');
  if(traderInput&&perInput){
    const num=new Intl.NumberFormat('en-US',{maximumFractionDigits:0});
    const render=()=>{const traderCount=Number(traderInput.value), amount=Number(perInput.value);traderOut.textContent=String(traderCount);perOut.textContent=num.format(amount)+' USDT';total.textContent=num.format(traderCount*amount)+' USDT';};
    traderInput.addEventListener('input',render);perInput.addEventListener('input',render);render();
  }

  const roleTabs=$$('.role-tab'), roleInput=$('#form-role'), form=$('#lead-form');
  if(roleTabs.length&&roleInput){
    const choose=(role)=>{
      if(!['investor','trader'].includes(role))role='investor';
      roleInput.value=role;
      roleTabs.forEach(tab=>{const active=tab.dataset.role===role;tab.classList.toggle('active',active);tab.setAttribute('aria-selected',String(active));});
      $$('.form-role[data-for]').forEach(field=>{
        const visible=field.dataset.for===role;field.hidden=!visible;
        $$('input,select,textarea',field).forEach(control=>{control.disabled=!visible});
      });
      const status=$('#form-status');if(status){status.className='form-status';status.textContent='';}
    };
    roleTabs.forEach(tab=>tab.addEventListener('click',()=>choose(tab.dataset.role)));
    const qs=new URLSearchParams(window.location.search);choose(qs.get('role')||'investor');
    if(qs.get('route')&&$('#verification')){$('#verification').value=qs.get('route');}
  }
  if(form){
    const status=$('#form-status'), submit=$('button[type=submit]',form);
    const show=(type,message)=>{status.className='form-status show '+type;status.textContent=message;};
    form.addEventListener('submit',async(event)=>{
      event.preventDefault();
      if(!form.checkValidity()){form.reportValidity();show('error','Please complete the required fields and consent checkbox.');return;}
      const endpoint=(window.REVAT_CONFIG&&window.REVAT_CONFIG.leadEndpoint)||'';
      if(!endpoint){show('info','This is a website preview. The enquiry form is not connected yet, so nothing has been sent or stored. Configure a secure lead endpoint before publishing.');return;}
      if(!/^https:\/\//i.test(endpoint)){show('error','The lead endpoint must use HTTPS. Nothing was submitted.');return;}
      const data=Object.fromEntries(new FormData(form).entries());data.formType='Revat website enquiry';data.submittedAt=new Date().toISOString();
      submit.disabled=true;submit.textContent='Submitting…';
      try{
        const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),mode:'cors',credentials:'omit'});
        if(!res.ok)throw new Error('Submission was not accepted');
        show('success','Your enquiry has been received by the configured submission service. This is not approval or an offer.');
        form.reset();
      }catch(err){show('error','Submission could not be confirmed. Please contact the website operator through an approved official channel.');}
      finally{submit.disabled=false;submit.innerHTML='Submit enquiry <svg aria-hidden="true"><use href="#i-arrow-up-right"></use></svg>';}
    });
  }
})();
