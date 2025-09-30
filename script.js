function showToast(message, options = { type: 'success', duration: 2000 }) {
    const el = document.getElementById('toast');
    if (!el) return;
  
    el.textContent = message;
  
    el.classList.remove('error', 'show');
    if (options.type === 'error') el.classList.add('error');
  
    void el.offsetWidth;
    el.classList.add('show');
  
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => {
      el.classList.remove('show');
    }, options.duration);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[type="text"]');
    const list = document.querySelector('.lista');
  
    // Adicionar novo item
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      
      if (!text) return;
  
      const li = document.createElement('li');
      li.className = 'item';
      li.innerHTML = `
        <label class="checkbox-wrapper">
          <input type="checkbox" class="checkbox">
          <span class="checkmark"></span>
        </label>
        <span class="item-text">${text}</span>
        <button class="delete-btn" aria-label="Remove item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>
      `;
  
      list.appendChild(li);
      input.value = '';
      showToast('Item adicionado na lista!');
    });
  
    // Checkbox - riscar item
    list.addEventListener('change', (e) => {
      if (e.target.classList.contains('checkbox')) {
        const item = e.target.closest('.item');
        item.classList.toggle('checked', e.target.checked);
      }
    });
  
    // Botão deletar
    list.addEventListener('click', (e) => {
      if (e.target.closest('.delete-btn')) {
        const item = e.target.closest('.item');
        showToast('Item removed from list', { type: 'error', duration: 3000 });
        item.remove();
        showToast('Item removido da lista!');
      }
    });
  });
