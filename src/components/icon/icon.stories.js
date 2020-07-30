import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select
} from "@storybook/addon-knobs";

/*************
KNOBS
*************/

/*Icons Knob*/
const label = "Icons/Color";
const options = {
  alwaysblack: "alwaysblack",
  disabled: "disabled",
  error: "error",
  "negative (white)": "negative",
  onbackground: "onbackground",
  primary: "primary",
  success: "success",
  warning: "warning"
};

// always: "onbackground",
// "negative (white)": "negative",
// error: "error",
// warning: "warning",
// success: "success"

const defaultValue = options.default;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

/*************
STORIES
*************/

const arrayIconsNames = [
  "add",
  "add-circle",
  "arrow-down",
  "arrow-left",
  "arrow-right",
  "arrow-up",
  "chevron-down",
  "chevron-left",
  "chevron-right",
  "chevron-up",
  "close",
  "color-picker",
  "deleted",
  "drag",
  "duplicate",
  "edit-wand",
  "edit",
  "error",
  "file",
  "folder",
  "level-down",
  "level-up",
  "minus",
  "minus-circle",
  "more-info",
  "search",
  "settings",
  "show-more-horizontal",
  "show-more-vertical",
  "success",
  "warning"
];

function iconsSet(size) {
  return arrayIconsNames
    .map(iconType => {
      return `<style>gxg-icon:hover {opacity:0.25} gxg-icon{margin-right: 8px;}</style><gxg-tooltip no-border width-auto label="${iconType}"><gxg-icon size="${size}" type="${iconType}" color="${select(
        label,
        options,
        defaultValue
      )}"></gxg-icon></gxg-tooltip>`;
    })
    .join("");
}
const stories = storiesOf("Icons/Icons", module);
stories.addDecorator(withKnobs);
// storiesOf('Button', module)
stories
  .add("regular size icons", () => iconsSet("regular"), {
    notes: {
      markdown: readme
    }
  })
  .add("small size icons", () => iconsSet("small"), {
    notes: {
      markdown: readme
    }
  });
