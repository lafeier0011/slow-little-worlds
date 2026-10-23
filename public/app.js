/*
 * Every destination on this site is a looping capture that costs a few
 * megabytes, so fetching them all up front would be wasteful. Each animated
 * scene ships with a still poster: the poster renders immediately, and the
 * animation is only downloaded for what the visitor actually looks at.
 *
 *   - switching tabs shows the still frame at once, then upgrades in place
 *   - a decoded animation is cached, so returning to a tab is instant
 *   - covers upgrade when they scroll into view rather than on page load
 */
document.querySelectorAll('[data-copy-contact]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.parentElement.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copyContact);
      status.textContent = '已复制，在微信中搜索添加即可。';
    } catch {
      status.textContent = '可长按或选中上方微信号，手动复制。';
    }
  });
});
(() => {
  const preloads = new Map();

  function preload(src) {
    if (!preloads.has(src)) {
      preloads.set(
        src,
        new Promise(resolve => {
          const probe = new Image();
          probe.onload = () => resolve(true);
          probe.onerror = () => resolve(false);
          probe.src = src;
        })
      );
    }
    return preloads.get(src);
  }

  const absolute = value => new URL(value, document.baseURI).href;

  // Swap a still image for its animated counterpart once the latter is decoded.
  // `token` guards against a slow download landing after the visitor moved on.
  function upgrade(img, token) {
    const src = img.dataset.src;
    if (!src) return Promise.resolve();
    return preload(src).then(ok => {
      if (!ok || img.dataset.src !== src) return;
      if (token && token.stale) return;
      delete img.dataset.src;
      img.src = src;
    });
  }

  function setSrc(img, value) {
    if (absolute(img.src) !== absolute(value)) img.src = value;
  }

  const sceneImage = document.getElementById('scene-image');
  const covers = Array.from(document.querySelectorAll('img[data-src]')).filter(
    img => img !== sceneImage
  );

  if (covers.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          upgrade(entry.target);
        }
      },
      { rootMargin: '300px' }
    );
    covers.forEach(img => observer.observe(img));
  } else {
    covers.forEach(img => upgrade(img));
  }

  const frame = document.querySelector('.scene-frame');
  const caption = document.getElementById('scene-caption');
  const buttons = Array.from(document.querySelectorAll('[data-scene]'));
  if (!frame || !sceneImage || !buttons.length) return;

  let token = { stale: false };

  function activate(button) {
    token.stale = true;
    token = { stale: false };
    const current = token;

    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    caption.textContent = button.dataset.caption;
    sceneImage.alt = `${button.dataset.name}游戏实景`;
    setSrc(sceneImage, button.dataset.poster || button.dataset.scene);
    sceneImage.dataset.src = button.dataset.scene;

    frame.classList.toggle('is-loading', Boolean(sceneImage.dataset.src));
    upgrade(sceneImage, current).then(() => {
      if (current.stale) return;
      frame.classList.remove('is-loading');
    });
  }

  buttons.forEach(button => button.addEventListener('click', () => activate(button)));

  const active = buttons.find(button => button.getAttribute('aria-pressed') === 'true');
  if (active) {
    if ('requestIdleCallback' in window) requestIdleCallback(() => activate(active), { timeout: 1500 });
    else setTimeout(() => activate(active), 400);
  }
})();
