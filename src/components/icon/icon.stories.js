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
  default: "color-on-background",
  error: "error",
  warning: "warning",
  success: "success"
};
const defaultValue = options.add;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

/*************
STORIES
*************/

const arrayIconsNames = [
  "add",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "chevronClose",
  "chevronColorPicker",
  "deleted",
  "down",
  "drag",
  "duplicate",
  "edit",
  "editWand",
  "error",
  "levelUp",
  "moreInfo",
  "search",
  "settings",
  "showMore",
  "success",
  "up",
  "warning"
];

function iconsSet(size) {
  return arrayIconsNames
    .map(iconType => {
      return ` <gxg-icon size="${size}" type="${iconType}" color="${select(
        label,
        options,
        defaultValue
      )}"></gxg-icon>`;
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
