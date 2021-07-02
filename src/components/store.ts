import { createStore } from "@stencil/store";

const { state } = createStore({
  large: document.documentElement.classList.contains("gxg-large"),
});

export default state;
