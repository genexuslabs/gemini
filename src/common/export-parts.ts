export const exportParts = (el: HTMLElement) => {
  const allChildren = el.shadowRoot.querySelectorAll("*");
  allChildren.forEach((child) => {
    const nodeName = child.nodeName;
    if (nodeName.includes("GXG")) {
      const gxgElementsWithParts = child.shadowRoot.querySelectorAll("[part]");
      if (gxgElementsWithParts) {
        const exportParts = [];
        gxgElementsWithParts.forEach((el) => {
          const part = el.getAttribute("part");
          part.split(" ").forEach((part) => {
            const composedPartName = `${part}:${nodeName.toLocaleLowerCase()}-${part}`;
            exportParts.push(composedPartName);
          });
        });
        child.setAttribute("exportparts", exportParts.join(","));
      }
    }
  });
};
