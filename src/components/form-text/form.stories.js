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
  add: "arrowDown",
  chevronDown: "chevronDown",
  chevronLeft: "chevronLeft",
  chevronRight: "chevronRight",
  chevronUp: "chevronUp",
  chevronDown: "chevronDown",
  chevronClose: "chevronClose",
  chevronColorPicker: "chevronColorPicker",
  deleted: "deleted",
  down: "down",
  drag: "drag",
  duplicate: "duplicate",
  edit: "edit",
  editWand: "editWand",
  error: "error",
  levelUp: "levelUp",
  moreInfo: "moreInfo",
  search: "search",
  settings: "settings",
  showMore: "showMore",
  success: "success",
  up: "up",
  warning: "warning"
};
const defaultValue = options.add;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

function mostrarAlertMoreInfo(alertId) {
  console.log("hola");
  document.getElementById(alertId).setAttribute("active", "true");
}

/*************
STORIES
*************/
const stories = storiesOf("Form", module);
stories.addDecorator(withKnobs);
stories.add(
  "Text",
  () => ` 
    <gxg-form-text
        id="input-text"
        type="text"
        label="Name"
        placeholder="John Griffith"
        icon="search"
        icon-position="left"
        value=""
        display-flex
      >
      </gxg-form-text>
      
      <gxg-form-text
        id="input-text"
        type="text"
        label="Position"
        placeholder="UX Lead"
        icon="search"
        icon-position="left"
        value=""
        display-flex
      >
      </gxg-form-text>
      
      <gxg-form-text
        id="input-text"
        type="text"
        label="Location"
        placeholder="Atlanta Georgia 30309"
        icon="search"
        icon-position="left"
        value=""
        display-flex
      >
      </gxg-form-text>
        `,
  {
    notes: {
      markdown: readme
    }
  }
);
