export function mutationObserverRemoved(target, ref) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const removedNodesArray = Array.from(mutation.removedNodes);
        for (const removedNode of removedNodesArray) {
          if (removedNode.nodeType === Node.ELEMENT_NODE) {
            ref.removedItem = removedNode;
          }
        }
      }
    }
  });

  observer.observe(target, { childList: true });
  return observer; // Return the observer instance if needed
}
