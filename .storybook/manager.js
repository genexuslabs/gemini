import "@storybook/addon-notes/register";
import "@storybook/addon-storysource/register";
import "@storybook/addon-knobs/register";
import "storybook-dark-mode/register";
import "@storybook/addon-viewport/register";
import "storybook-addon-rtl/register";

import { addons } from "@storybook/addons";
import { themes } from "@storybook/theming";
import geminiTheme from "./geminiTheme";

addons.setConfig({
  theme: geminiTheme,
  enableShortcuts: false,
});
