document.querySelectorAll('[data-scene]').forEach(button => {
  button.addEventListener('click', () => {
    const image = document.getElementById('scene-image');
    image.src = button.dataset.scene;
    image.alt = `${button.dataset.name}游戏实景`;
    document.getElementById('scene-caption').textContent = button.dataset.caption;
    document.querySelectorAll('[data-scene]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
});
