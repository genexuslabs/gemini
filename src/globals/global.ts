import { setMode } from "@stencil/core";

// Global mode (theme) configuration based on https://stackoverflow.com/a/56530775
const getMode = (el: HTMLElement): string => {
  return (
    el.getAttribute("mode") ??
    document.querySelector("html")?.getAttribute("mode") ??
    "regular"
  );
};

setMode((el) => getMode(el));
