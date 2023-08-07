// https://stackoverflow.com/questions/54520554/custom-element-getrootnode-closest-function-crossing-multiple-parent-shadowd
export function closestElementComposed(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === document || el === window) return null;
    const found = el.closest(selector);
    return found ? found : __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
