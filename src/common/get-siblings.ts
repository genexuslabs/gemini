export const getSiblings = function (el, mode: GetSiblingsMode = "all") {
  // Setup siblings array and get the first sibling
  const siblings = [];
  let sibling;

  if (mode === "all" || mode === "before") {
    sibling = el.parentNode.firstChild;
  } else if (mode === "after") {
    sibling = el.nextElementSibling;
  }

  // Loop through each sibling and push to the array
  while (sibling) {
    if (mode === "before" && sibling === el) {
      sibling = false;
    } else if (sibling.nodeType === 1 && sibling !== el) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export type GetSiblingsMode = "before" | "after" | "all";
