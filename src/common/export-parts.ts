export const exportParts = (
  comp: any,
  el: HTMLElement,
  part: string,
  exportparts: string
): void => {
  if (el && part && !exportparts) {
    console.log("part", part);
    const elementsWithParts = el.shadowRoot.querySelectorAll("[part]");
    if (elementsWithParts) {
      const exportParts = [];
      elementsWithParts.forEach((el) => {
        const innerParts = el.getAttribute("part");
        innerParts.split(" ").forEach((innerPart) => {
          const composedPartName = `${innerPart}:${part}-${innerPart}`;
          console.log("composedPartName", composedPartName);
          exportParts.push(composedPartName);
        });
      });
      console.log("exportParts", exportParts);
      comp.exportparts = exportParts.join(",");
    }
  }
};
