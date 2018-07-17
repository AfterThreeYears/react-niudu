export const getProperties = () => {
  const div = document.createElement('div');

  return {
    transform: 'transform' in div.style ? 'transform' : '-webkit-transform',
    transition: 'transition' in div.style ? 'transition' : '-webkit-transition',
  };
};

export const letPxGo = value => Number((value || '').replace('px', ''));
export const getComputedProp = (el, prop) => (el instanceof Element ?
  window.getComputedStyle(el, null)[prop] : null);
export const getPropNumeric = (el, prop) => {
  if (!el) {
    return 0;
  }
  const value = letPxGo(getComputedProp(el, prop));
  return isNaN(value) ? 0 : value;
};