document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('accessibility-toggle');
  const menu = document.getElementById('accessibility-menu');
  const contrast = document.getElementById('contrast-select');
  const font = document.getElementById('font-select');
  const lineheight = document.getElementById('lineheight-select');
  const resetBtn = document.getElementById('reset-accessibility');

  let rotation = 0; 

  function applyState(state) {
    document.body.classList.remove('contrast-high','contrast-invert','font-dyslexic','lineheight-large');
    if (state.contrast === 'high') document.body.classList.add('contrast-high');
    if (state.contrast === 'invert') document.body.classList.add('contrast-invert');
    if (state.font === 'dyslexic') document.body.classList.add('font-dyslexic');
    if (state.lineheight === 'large') document.body.classList.add('lineheight-large');

    if (contrast) contrast.value = state.contrast || 'default';
    if (font) font.value = state.font || 'default';
    if (lineheight) lineheight.value = state.lineheight || 'default';
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem('acc_prefs') || '{}');
      return {
        contrast: saved.contrast || 'default',
        font: saved.font || 'default',
        lineheight: saved.lineheight || 'default'
      };
    } catch(e){
      return {contrast:'default', font:'default', lineheight:'default'};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem('acc_prefs', JSON.stringify(state));
    } catch(e){}
  }

  const state = loadState();
  applyState(state);

  toggle.addEventListener('click', function() {
    const isOpen = menu.classList.toggle('visible');
    menu.classList.toggle('hidden', !isOpen);

    rotation += isOpen ? 360 : -360;
    toggle.style.transform = `rotate(${rotation}deg) scale(1.1)`;

    toggle.setAttribute('aria-expanded', isOpen);
  });

  document.addEventListener('click', function(e){
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('visible');
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') {
      if(menu.classList.contains('visible')) {
        menu.classList.remove('visible');
        menu.classList.add('hidden');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  if (contrast) {
    contrast.addEventListener('change', function(){
      state.contrast = contrast.value;
      applyState(state);
      saveState(state);
    });
  }
  if (font) {
    font.addEventListener('change', function(){
      state.font = font.value;
      applyState(state);
      saveState(state);
    });
  }
  if (lineheight) {
    lineheight.addEventListener('change', function(){
      state.lineheight = lineheight.value;
      applyState(state);
      saveState(state);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function(){
      state.contrast = 'default';
      state.font = 'default';
      state.lineheight = 'default';
      applyState(state);
      saveState(state);
    });
  }
});
