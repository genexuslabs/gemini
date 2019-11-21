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
const label = "Icon";
const options = {
  add: "add",
  arrowDown: "arrowDown",
  close: "close",
  colorPicker: "colorPicker",
  duplicate: "duplicate",
  edit: "edit",
  magic: "magic",
  more: "more",
  remove: "remove",
  triangle: "triangle"
};
const defaultValue = options.add;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

/*************
STORIES
*************/
function iconsSet(size) {
  return `
  <gxg-icon size="${size}" slot="icon" type="add"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="chevronDown"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="chevronLeft"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="chevronRight"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="chevronUp"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="chevronClose"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="chevronColorPicker"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="deleted"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="down"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="drag"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="duplicate"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="edit"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="editWand"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="error"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="levelUp"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="moreInfo"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="search"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="settings"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="showMore"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="success"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="up"></gxg-icon>
  <gxg-icon size="${size}" slot="icon" type="warning"></gxg-icon>
  `;
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
