import { createStore } from "@stencil/store";

const { state } = createStore({
  large: document.documentElement.classList.contains("gxg-large"),
  rtl: document.documentElement.getAttribute("dir") === "rtl",
});

export default state;
