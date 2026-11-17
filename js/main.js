(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeNav();
  });
  window.matchMedia('(min-width: 951px)').addEventListener('change', closeNav);
  const form = document.querySelector('#enquiry-form');
  if (!form) return;
  const service = new URLSearchParams(window.location.search).get('service');
  const select = document.querySelector('#service');
  if ([...select.options].some(option => option.value === service)) select.value = service;
  const fallback = document.querySelector('#email-fallback');
  fallback.addEventListener('click', () => {
    const data = new FormData(form);
    const interest = select.selectedOptions[0].textContent;
    const subject = `DKTCM enquiry: ${interest}`;
    const body = `Name: ${data.get('name') || ''}\nEmail: ${data.get('email') || ''}\nCompany: ${data.get('company') || ''}\nInterest: ${interest}\n\n${data.get('message') || ''}`;
    fallback.href = `mailto:enquiry@dktconsult.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  form.addEventListener('submit', () => {
    const interest = select.selectedOptions[0].textContent;
    form.querySelector('[name="_subject"]').value = `DKTCM enquiry: ${interest}`;
    let provider = form.querySelector('[name="company_service"]');
    if (!provider) {
      provider = document.createElement('input');
      provider.type = 'hidden';
      provider.name = 'company_service';
      form.appendChild(provider);
    }
    provider.value = interest;
    document.querySelector('#form-status').textContent = 'Opening the secure form service. If submission is unavailable, return here and use the email link above.';
  });
})();
