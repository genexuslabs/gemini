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
  { name: "add", description: "this is some description for add" },
  {
    name: "add-circle",
    description: "this is some description for add circle"
  },
  { name: "arrow-down", description: "this is some description for arrow-down" }
];

function iconsSet(size) {
  return arrayIconsNames
    .map((iconType, index) => {
      return `
      <style>
        .container{
          border: 1px solid var(--gray-02);
          font-family: "Open Sans";
          font-size: 10px;
          border-bottom:none;
          padding:5px;
          display: flex;
          align-items: center;
        }
        gxg-icon {
          border-right: 1px solid var(--gray-02);
          padding-right: 5px; 
          margin-right: 8px; 
        }
        .icon-name {
          border-right: 1px solid var(--gray-02);
          padding-right:8px;
          margin-right:8px;
          color: var(--gray-06);
        }
        .description {
          color: var(--gray-04);
        }
        .container:last-child{
          border-bottom: 1px solid var(--gray-02);
        }
      </style>
      <div class="container">
      <span><gxg-icon size="${size}" type="${iconType.name}" color="${select(
        label,
        options,
        defaultValue
      )}"></gxg-icon></span>
        <span class="icon-name">${iconType.name}</span>
      <span class="description">${iconType.description}</span></div>`;
    })
    .join("");
}
const stories = storiesOf("Icons/Icons", module);
stories.addDecorator(withKnobs);
// storiesOf('Button', module)
stories.add("category one", () => iconsSet("regular"), {
  notes: {
    markdown: readme
  }
});
