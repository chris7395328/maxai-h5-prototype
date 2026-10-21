/* Progressive enhancement only. All SEO content is present without JavaScript. */
(()=>{
  const links=[...document.querySelectorAll('.section-nav a')];
  if(!('IntersectionObserver' in window))return;
  const sections=links.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const visible=new Set();
  const paint=()=>{const candidates=sections.filter(section=>visible.has(section));if(!candidates.length)return;const current=candidates.reduce((best,section)=>Math.abs(section.getBoundingClientRect().top-150)<Math.abs(best.getBoundingClientRect().top-150)?section:best);links.forEach(link=>{if(link.hash==='#'+current.id)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current')})};
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>entry.isIntersecting?visible.add(entry.target):visible.delete(entry.target));paint()},{rootMargin:'-140px 0px -35% 0px',threshold:0});
  sections.forEach(section=>observer.observe(section));
})();
