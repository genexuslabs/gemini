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

import controls from "./catalog-controls.json";
import editingStructures from "./catalog-editing-structures.json";
import tools from "./catalog-gemini-tools.json";
import general from "./catalog-general.json";
import gxServerIntegration from "./catalog-gxserver-integration.json";
import menusAndCommands from "./catalog-menus-&-commands.json";
import navigation from "./catalog-navigation.json";
import objectParts from "./catalog-object-parts.json";
import objects from "./catalog-objects.json";
import other from "./catalog-other.json";
import patterns from "./catalog-patterns.json";
import patternsDefaultAssociated from "./catalog-patterns-default-associated.json";
import windowsTools from "./catalog-windows-tools.json";

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
  .add("Controls", () => returnTableOfIcons("regular", controls), {
    notes: {
      markdown: readme
    }
  })
  .add(
    "Editing structures",
    () => returnTableOfIcons("regular", editingStructures),
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add("Tools", () => returnTableOfIcons("regular", tools), {
    notes: {
      markdown: readme
    }
  })
  .add("General", () => returnTableOfIcons("regular", general), {
    notes: {
      markdown: readme
    }
  })
  .add(
    "Gx server integration",
    () => returnTableOfIcons("regular", gxServerIntegration),
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Menus & commands",
    () => returnTableOfIcons("regular", menusAndCommands),
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add("Navigation", () => returnTableOfIcons("regular", navigation), {
    notes: {
      markdown: readme
    }
  })
  .add("Object parts", () => returnTableOfIcons("regular", objectParts), {
    notes: {
      markdown: readme
    }
  })
  .add(
    "Objects",
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
      const icons07Label = "--icons07";
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
        returnTableOfIcons("regular", objects)
      );
    },
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add("Other", () => returnTableOfIcons("regular", other), {
    notes: {
      markdown: readme
    }
  })
  .add("Patterns", () => returnTableOfIcons("regular", patterns), {
    notes: {
      markdown: readme
    }
  })
  .add(
    "Patterns default associated",
    () => returnTableOfIcons("regular", patternsDefaultAssociated),
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add("Windows tools", () => returnTableOfIcons("regular", windowsTools), {
    notes: {
      markdown: readme
    }
  });
