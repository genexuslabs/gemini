export const exportParts = (part: string, parts: object): string => {
  const exportParts = [];
  if (part && Object.keys(parts).length > 0) {
    const innerParts = [];
    for (const key in parts) {
      const partsArray = parts[key].split(" ");
      innerParts.push(...partsArray);
    }
    innerParts.length &&
      innerParts.forEach((innerPart) => {
        const composedPartName = `${innerPart}:${part}-${innerPart}`;
        exportParts.push(composedPartName);
      });
  }
  return exportParts.join(",");
};
