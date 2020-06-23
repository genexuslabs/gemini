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
const label = "Color";
const options = {
  onbackground: "onbackground",
  negative: "negative",
  error: "error",
  warning: "warning",
  success: "success"
};
const defaultValue = options.default;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

/*************
STORIES
*************/

const arrayIconsNames = [
  "add",
  "arrowDown",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "close",
  "colorPicker",
  "deleted",
  "drag",
  "duplicate",
  "editWand",
  "edit",
  "error",
  "levelDown",
  "levelUp",
  "moreInfo",
  "search",
  "settings",
  "showMore",
  "success",
  "warning"
];

function iconsSet(size) {
  return arrayIconsNames
    .map(iconType => {
      return `<style>gxg-icon:hover {opacity:0.25}</style><gxg-tooltip no-border width-auto message="${iconType}"><gxg-icon size="${size}" type="${iconType}" color="${select(
        label,
        options,
        defaultValue
      )}"></gxg-icon></gxg-tooltip>`;
    })
    .join("");
}
const stories = storiesOf("Icons", module);
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
