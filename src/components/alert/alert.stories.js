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
const stories = storiesOf("Alert", module);
stories.addDecorator(withKnobs);
stories
  .add(
    "More info",
    () => ` 
    <gxg-button onClick="(function(){
        document.getElementById('alert-more-info').setAttribute('active', 'true');
        return false;
    })();return false;">Show alert</gxg-button>
    <gxg-alert
    id="alert-more-info"
    alert-title="${text("Title", "more info title")}"
    type="more-info"
    active="false"
    position="${select(
      "position",
      { left: "left", center: "center", right: "right" },
      "center"
    )}"
    left="${text("Left position", "15px")}"
    right="${text("Right position", "15px")}"
    bottom="${text("Bottom position", "15px")}"
    active-time="${select(
      "Active Time",
      {
        "04": "04",
        "05": "05",
        "06": "06",
        "07": "07",
        "08": "08",
        "09": "09",
        "10": "10"
      },
      "05"
    )}"
  >
  ${text("Message", "This is an info message")}
  </gxg-alert>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Success",
    () => ` 
      <gxg-button onClick="(function(){
          document.getElementById('alert-success').setAttribute('active', 'true');
          return false;
      })();return false;">Show alert</gxg-button>
      <gxg-alert
      id="alert-success"
      alert-title="${text("Title", "success title")}"
      type="success"
      active="false"
      position="${select(
        "position",
        { left: "left", center: "center", right: "right" },
        "center"
      )}"
      left="${text("Left position", "15px")}"
      right="${text("Right position", "15px")}"
      bottom="${text("Bottom position", "15px")}"
      active-time="${select(
        "Active Time",
        {
          "04": "04",
          "05": "05",
          "06": "06",
          "07": "07",
          "08": "08",
          "09": "09",
          "10": "10"
        },
        "05"
      )}"
    >
    ${text("Message", "This is a success message")}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Warning",
    () => ` 
      <gxg-button onClick="(function(){
          document.getElementById('alert-warning').setAttribute('active', 'true');
          return false;
      })();return false;">Show alert</gxg-button>
      <gxg-alert
      id="alert-warning"
      alert-title="${text("Title", "warning title")}"
      type="warning"
      active="false"
      position="${select(
        "position",
        { left: "left", center: "center", right: "right" },
        "center"
      )}"
      left="${text("Left position", "15px")}"
      right="${text("Right position", "15px")}"
      bottom="${text("Bottom position", "15px")}"
      active-time="${select(
        "Active Time",
        {
          "04": "04",
          "05": "05",
          "06": "06",
          "07": "07",
          "08": "08",
          "09": "09",
          "10": "10"
        },
        "05"
      )}"
    >
    ${text("Message", "This is a warning message")}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Error",
    () => ` 
      <gxg-button onClick="(function(){
          document.getElementById('alert-error').setAttribute('active', 'true');
          return false;
      })();return false;">Show alert</gxg-button>
      <gxg-alert
      id="alert-error"
      alert-title="${text("Title", "error title")}"
      type="error"
      active="false"
      position="${select(
        "position",
        { left: "left", center: "center", right: "right" },
        "center"
      )}"
      left="${text("Left position", "15px")}"
      right="${text("Right position", "15px")}"
      bottom="${text("Bottom position", "15px")}"
      active-time="${select(
        "Active Time",
        {
          "04": "04",
          "05": "05",
          "06": "06",
          "07": "07",
          "08": "08",
          "09": "09",
          "10": "10"
        },
        "05"
      )}"
    >
    ${text("Message", "This is an error message")}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme
      }
    }
  );
