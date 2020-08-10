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
  { name: "add", description: "Some description" },
  {
    name: "add-circle",
    description: "Some description"
  },
  { name: "arrow-down", description: "Some description" },
  { name: "arrow-left", description: "Some description" },
  { name: "arrow-right", description: "Some description" },
  { name: "arrow-up", description: "Some description" },
  { name: "chevron-down", description: "Some description" },
  { name: "chevron-left", description: "Some description" },
  { name: "chevron-right", description: "Some description" },
  { name: "chevron-up", description: "Some description" },
  { name: "circle", description: "Some description" },
  { name: "close", description: "Some description" },
  { name: "color-picker", description: "Some description" },
  { name: "deleted", description: "Some description" },
  { name: "drag", description: "Some description" },
  { name: "duplicate", description: "Some description" },
  { name: "edit", description: "Some description" },
  { name: "edit-wand", description: "Some description" },
  { name: "error", description: "Some description" },
  { name: "file", description: "Some description" },
  { name: "folder", description: "Some description" },
  { name: "level-down", description: "Some description" },
  { name: "level-up", description: "Some description" },
  { name: "minus", description: "Some description" },
  { name: "minus-circle", description: "Some description" },
  { name: "notice", description: "Some description" },
  { name: "pill-filled", description: "Some description" },
  { name: "pill-outlined", description: "Some description" },
  { name: "reset", description: "Some description" },
  { name: "search", description: "Some description" },
  { name: "settings", description: "Some description" },
  { name: "show-more-horizontal", description: "Some description" },
  { name: "show-more-vertical", description: "Some description" },
  { name: "success", description: "Some description" },
  { name: "warning", description: "Some description" }
];

function iconsSet(size) {
  return arrayIconsNames
    .map((iconType, index) => {
      return `
      <style>
      #root {
        padding-top:770px;
        margin-bottom:100px;  
      }
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
stories.add("icons", () => iconsSet("regular"), {
  notes: {
    markdown: readme
  }
});
