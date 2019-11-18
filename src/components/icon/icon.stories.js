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
const stories = storiesOf("Icon", module);
stories.addDecorator(withKnobs);
// storiesOf('Button', module)
stories.add(
  "Icons set",
  () => `
        <gxg-icon slot="icon" type="add"></gxg-icon>
        <gxg-icon slot="icon" type="arrowDown"></gxg-icon>
        <gxg-icon slot="icon" type="close"></gxg-icon>
        <gxg-icon slot="icon" type="colorPicker"></gxg-icon>
        <gxg-icon slot="icon" type="duplicate"></gxg-icon>
        <gxg-icon slot="icon" type="edit"></gxg-icon>
        <gxg-icon slot="icon" type="magic"></gxg-icon>
        <gxg-icon slot="icon" type="more"></gxg-icon>
        <gxg-icon slot="icon" type="remove"></gxg-icon>
        <gxg-icon slot="icon" type="triangle"></gxg-icon>
        `,
  {
    notes: {
      markdown: readme
    }
  }
);
