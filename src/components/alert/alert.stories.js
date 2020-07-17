import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

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
    })();">Show alert</gxg-button>
    <gxg-alert
    id="alert-more-info"
    type="more-info"
    active="false"
    active-time="${select(
      "Active Time",
      {
        xxslow: "xxslow",
        xslow: "xslow",
        slow: "slow",
        regular: "regular",
        fast: "fast",
        xfast: "xfast",
        xxfast: "xxfast"
      },
      "xfast"
    )}"
    bottom="${select(
      "Bottom spacing",
      {
        "0": "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl"
      },
      "xs"
    )}"
    full-width=${boolean("Full Width", false)}
    left-right="${select(
      "Left/Right spacing",
      {
        "0": "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl"
      },
      "xs"
    )}"
    position="${select(
      "Position",
      { left: "left", center: "center", right: "right" },
      "center"
    )}"
    alert-title="${text("Title", "Conversation deleted")}"
    width=${text("Width (default: 350px)", "350px")}>
  ${text("Message", "The conversation has been sent to trash")}
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
  })();">Show alert</gxg-button>
  <gxg-alert
  id="alert-success"
  type="success"
  active="false"
  active-time="${select(
    "Active Time",
    {
      xxslow: "xxslow",
      xslow: "xslow",
      slow: "slow",
      regular: "regular",
      fast: "fast",
      xfast: "xfast",
      xxfast: "xxfast"
    },
    "xfast"
  )}"
  bottom="${select(
    "Bottom spacing",
    {
      "0": "0",
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl"
    },
    "xs"
  )}"
  full-width=${boolean("Full Width", false)}
  left-right="${select(
    "Left/Right spacing",
    {
      "0": "0",
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl"
    },
    "xs"
  )}"
  position="${select(
    "Position",
    { left: "left", center: "center", right: "right" },
    "center"
  )}"
  alert-title="${text("Title", "EMAIL SENT")}"
  width=${text("Width (default: 350px)", "350px")}>
    ${text("Message", "The email has been successfully sent to the recipient")}
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
    type="warning"
    active="false"
    active-time="${select(
      "Active Time",
      {
        xxslow: "xxslow",
        xslow: "xslow",
        slow: "slow",
        regular: "regular",
        fast: "fast",
        xfast: "xfast",
        xxfast: "xxfast"
      },
      "xfast"
    )}"
    bottom="${select(
      "Bottom spacing",
      {
        "0": "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl"
      },
      "xs"
    )}"
    full-width=${boolean("Full Width", false)}
    left-right="${select(
      "Left/Right spacing",
      {
        "0": "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl"
      },
      "xs"
    )}"
    position="${select(
      "Position",
      { left: "left", center: "center", right: "right" },
      "center"
    )}"
    alert-title="${text("Title", "WARNING!")}"
    width=${text("Width (default: 350px)", "350px")}>
    ${text("Message", "You are about to delete all the conversations")}
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
    })();">Show alert</gxg-button>
    <gxg-alert
    id="alert-error"
    type="error"
    active="false"
    active-time="${select(
      "Active Time",
      {
        xxslow: "xxslow",
        xslow: "xslow",
        slow: "slow",
        regular: "regular",
        fast: "fast",
        xfast: "xfast",
        xxfast: "xxfast"
      },
      "xfast"
    )}"
    bottom="${select(
      "Bottom spacing",
      {
        "0": "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl"
      },
      "xs"
    )}"
    full-width=${boolean("Full Width", false)}
    left-right="${select(
      "Left/Right spacing",
      {
        "0": "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl"
      },
      "xs"
    )}"
    position="${select(
      "Position",
      { left: "left", center: "center", right: "right" },
      "center"
    )}"
    alert-title="${text("Title", "FATAL ERROR")}"
    width=${text("Width (default: 350px)", "350px")}>
    ${text("Message", "The nuclear plant is about to explode in five minutes")}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme
      }
    }
  );
