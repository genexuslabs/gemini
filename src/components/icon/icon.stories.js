import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  color
} from "@storybook/addon-knobs";

/*************
KNOBS
*************/

/*Icons Knob*/
const label = "Icons/Color";
const options = {
  auto: "auto",
  alwaysblack: "alwaysblack",
  disabled: "disabled",
  error: "error",
  "negative (white)": "negative",
  onbackground: "onbackground",
  primary: "primary",
  success: "success",
  warning: "warning",
  default: "auto"
};

const defaultValue = options.default;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

/*************
STORIES
*************/

const generalIcons = [
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

const objectsIcons = [
  { name: "objects/atribute", description: "Some description" },
  { name: "objects/bg-color", description: "Some description" },
  { name: "objects/business-process-diagram", description: "Some description" },
  { name: "objects/category", description: "Some description" },
  { name: "objects/dashboard", description: "Some description" },
  { name: "objects/data-provider", description: "Some description" },
  { name: "objects/data-selector", description: "Some description" },
  { name: "objects/data-view", description: "Some description" },
  { name: "objects/datastore", description: "Some description" },
  { name: "objects/datastore-category", description: "Some description" },
  { name: "objects/dataview-index", description: "Some description" },
  { name: "objects/diagram", description: "Some description" },
  { name: "objects/document", description: "Some description" },
  { name: "objects/domain", description: "Some description" },
  { name: "objects/external-object", description: "Some description" },
  { name: "objects/file", description: "Some description" },
  { name: "objects/folder", description: "Some description" },
  { name: "objects/generator", description: "Some description" },
  { name: "objects/generator-category", description: "Some description" },
  { name: "objects/image", description: "Some description" },
  { name: "objects/lenguage", description: "Some description" },
  { name: "objects/masterpage", description: "Some description" },
  { name: "objects/menu", description: "Some description" },
  { name: "objects/menubar", description: "Some description" },
  { name: "objects/module", description: "Some description" },
  { name: "objects/object", description: "Some description" },
  { name: "objects/orphant-document", description: "Some description" },
  { name: "objects/panel-for-sd", description: "Some description" },
  { name: "objects/procedure", description: "Some description" },
  { name: "objects/query", description: "Some description" },
  { name: "objects/report", description: "Some description" },
  { name: "objects/structured-data-type", description: "Some description" },
  { name: "objects/subtype-group", description: "Some description" },
  { name: "objects/table", description: "Some description" },
  { name: "objects/themes", description: "Some description" },
  { name: "objects/themes-for-sd", description: "Some description" },
  { name: "objects/to-be-defined", description: "Some description" },
  { name: "objects/transaction", description: "Some description" },
  { name: "objects/web-component", description: "Some description" },
  { name: "objects/webpanel", description: "Some description" },
  { name: "objects/work-panel", description: "Some description" },
  { name: "objects/work-with-web", description: "Some description" },
  { name: "objects/workwith-for-sd", description: "Some description" }
];

function returnTableOfIcons(size, iconsArray) {
  const newArray = iconsArray.map((iconType, index) => {
    return `
      <div class="container">
      <span><gxg-icon size="${size}" type="${iconType.name}" color="${select(
      label,
      options,
      defaultValue
    )}"></gxg-icon></span>
        <span class="icon-name">${iconType.name}</span>
      <span class="description">${iconType.description}</span></div>`;
  });

  return (
    `<style>
  #root {
    padding-top: 100px;
    padding-bottom: 100px;
  }
  body {
    align-items: baseline !important;
  }
    .container {
      border: 1px solid var(--gray-02);
      font-family: "Open Sans";
      font-size: var(--font-size-sm);
      border-bottom:none;
      padding:5px;
      display: flex;
      align-items: center;
      width:450px;
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
      font-size: var(--font-size-xs);
    }
    .container:last-child{
      border-bottom: 1px solid var(--gray-02);
    }
  </style>` + newArray.join("")
  );
}
const stories = storiesOf("Icons/Icons", module);
stories.addDecorator(withKnobs);
// storiesOf('Button', module)
stories
  .add("general", () => returnTableOfIcons("regular", generalIcons), {
    notes: {
      markdown: readme
    }
  })
  .add(
    "objects",
    () => {
      //Icons01
      const icons01Label = "--icons01";
      const icons01Value = "#0266a0";
      const groupId = "iconColors";
      const valueIcons01 = color(icons01Label, icons01Value, groupId);

      //Icons02
      const icons02Label = "--icons02";
      const icons02Value = "#605cab";
      const valueIcons02 = color(icons02Label, icons02Value, groupId);

      //Icons03
      const icons03Label = "--icons03";
      const icons03Value = "#00746b";
      const valueIcons03 = color(icons03Label, icons03Value, groupId);

      //Icons04
      const icons04Label = "--icons04";
      const icons04Value = "#00a99d";
      const valueIcons04 = color(icons04Label, icons04Value, groupId);

      //Icons05
      const icons05Label = "--icons05";
      const icons05Value = "#39b54a";
      const valueIcons05 = color(icons05Label, icons05Value, groupId);

      //Icons06
      const icons06Label = "--icons06";
      const icons06Value = "#ed145b";
      const valueIcons06 = color(icons06Label, icons06Value, groupId);

      //Icons07
      const icons07Label = "--icons01";
      const icons07Value = "#f26522";
      const valueIcons07 = color(icons07Label, icons07Value, groupId);

      //Icons08
      const icons08Label = "--icons08";
      const icons08Value = "#f7941d";
      const valueIcons08 = color(icons08Label, icons08Value, groupId);

      return (
        "<style>body {--icons01:" +
        valueIcons01 +
        ";--icons02:" +
        valueIcons02 +
        ";--icons03:" +
        valueIcons03 +
        ";--icons04:" +
        valueIcons04 +
        ";--icons05:" +
        valueIcons05 +
        ";--icons06:" +
        valueIcons06 +
        ";--icons07:" +
        valueIcons07 +
        ";--icons08:" +
        valueIcons08 +
        ";}</style>" +
        returnTableOfIcons("regular", objectsIcons)
      );
    },
    {
      notes: {
        markdown: readme
      }
    }
  );
