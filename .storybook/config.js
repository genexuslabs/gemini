import { configure } from "@storybook/html";
import addons from "@storybook/addons";
import { addDecorator } from "@storybook/html";
import { initializeRTL } from "storybook-addon-rtl";

initializeRTL();

const channel = addons.getChannel();

let darkModeOn = false;
function setDark(isDark) {
  const darkBodyClass = "dark";
  const root = document.getElementsByTagName("html")[0]; // '0' to assign the first (and only `HTML` tag)
  if (isDark) {
    root.setAttribute("class", darkBodyClass);
  } else {
    root.classList.remove("dark");
  }
}
channel.on("DARK_MODE", setDark);

function loadStories() {
  const req = require.context("../src", true, /\.stories\.js$/);
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
