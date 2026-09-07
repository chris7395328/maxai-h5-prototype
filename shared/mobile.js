(() => {
  const root = document.documentElement;
  document.body.dataset.page = location.pathname.split('/').slice(-2, -1)[0];
  const app = document.querySelector('.app');
  if (!app) return;
  // Settings previously mixed scrollable rows and navigation in one container.
  if (document.body.dataset.page === 'settings-v1') {
    const nav = app.querySelector('.bottom-nav');
    const content = document.createElement('div');
    content.className = 'mobile-scroll';
    [...app.childNodes].filter(node => node !== nav).forEach(node => content.append(node));
    app.prepend(content);
  }
  let frame;
  function syncViewport() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const viewport = window.visualViewport;
      // Preserve browser pinch zoom; keyboard and toolbar changes have scale 1.
      if (viewport && Math.abs(viewport.scale - 1) > 0.05) return;
      root.style.setProperty('--app-height', `${viewport ? viewport.height : innerHeight}px`);
      root.style.setProperty('--app-top', `${viewport ? viewport.offsetTop : 0}px`);
    });
  }
  window.addEventListener('resize', syncViewport);
  window.visualViewport?.addEventListener('resize', syncViewport);
  window.visualViewport?.addEventListener('scroll', syncViewport);
  window.addEventListener('pageshow', syncViewport);
  syncViewport();
})();
