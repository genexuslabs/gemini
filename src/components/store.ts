import { createStore } from "@stencil/store";

const { state } = createStore({
  large: document.documentElement.classList.contains("gxg-large"),
  mercury: document.documentElement.classList.contains("mercury"),
  rtl: document.documentElement.getAttribute("dir") === "rtl",
});

export default state;
