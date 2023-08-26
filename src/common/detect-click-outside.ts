export const detectClickOutside = (event, element): boolean => {
  const x = event.x;
  const y = event.y;

  //Contextual menu coordinates
  const elementBoundingClientRect = element.getBoundingClientRect();
  if (
    (x > elementBoundingClientRect.left &&
      x < elementBoundingClientRect.right &&
      y > elementBoundingClientRect.top &&
      y < elementBoundingClientRect.bottom) ||
    (event.screenX === 0 &&
      event.screenY === 0 &&
      event.clientX === 0 &&
      event.clientY === 0)
  ) {
    //Click happened inside the element
    return false;
  } else {
    //Click happened outside the element
    return true;
  }
};
