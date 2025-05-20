// customPlaceholder.js
export function initCustomPlaceholder() {
  document.querySelectorAll('.input-group').forEach(group => {
    const input = group.querySelector('input');
    const placeholder = group.querySelector('.custom-placeholder');
    if (!input || !placeholder) return;

    function togglePlaceholder() {
      placeholder.style.opacity = input.value.trim() === '' ? '1' : '0';
    }

    input.addEventListener('focus', () => placeholder.style.opacity = '0');
    input.addEventListener('blur', togglePlaceholder);
    input.addEventListener('input', togglePlaceholder);
    togglePlaceholder();
  });
}
