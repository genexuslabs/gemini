import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

/*************
KNOBS
*************/

/*Icons Knob*/
const label = "Icon";
const options = {
  add: "general/arrowDown",
  chevronDown: "general/chevronDown",
  chevronLeft: "general/chevronLeft",
  chevronRight: "general/chevronRight",
  chevronUp: "general/chevronUp",
  chevronDown: "general/chevronDown",
  chevronClose: "general/chevronClose",
  chevronColorPicker: "general/chevronColorPicker",
  deleted: "general/deleted",
  down: "general/down",
  drag: "general/drag",
  duplicate: "general/duplicate",
  edit: "general/edit",
  editWand: "general/editWand",
  error: "general/error",
  levelUp: "general/levelUp",
  notice: "general/notice",
  search: "general/search",
  settings: "general/settings",
  showMore: "general/showMore",
  success: "general/success",
  up: "general/up",
  warning: "general/warning",
};
const defaultValue = options.add;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

function mostrarAlertNotice(alertId) {
  document.getElementById(alertId).setAttribute("active", "true");
}

/*************
STORIES
*************/
const stories = storiesOf("Interaction/Alert", module);
stories.addDecorator(withKnobs);
stories.addParameters({ layout: "centered" });
stories
  .add(
    "Notice",
    () => ` 
    <gxg-button onClick="(function(){
        document.getElementById('alert-notice').setAttribute('active', 'true');
        return false;
    })();">Show alert</gxg-button>
    <gxg-alert
    id="alert-notice"
    full-width=${boolean("Full Width", false)}
    width=${text("Width (default: 350px)", "350px")}
    position="${select(
      "Position",
      { start: "start", center: "center", end: "end" },
      "center"
    )}"
    bottom="${select(
      "Bottom spacing",
      {
        "no-space": "no-space",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "xs"
    )}"
    
    left-right="${select(
      "Left/Right spacing",
      {
        "no-space": "no-space",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "xs"
    )}"
    type="notice"
    active-time="${select(
      "Active Time",
      {
        xxslow: "xxslow",
        xslow: "xslow",
        slow: "slow",
        regular: "regular",
        fast: "fast",
        xfast: "xfast",
        xxfast: "xxfast",
      },
      "xfast"
    )}"
    title="${text("Title", "Conversation deleted")}"
    >
  ${text("Message", "The conversation has been sent to trash")}
  </gxg-alert>
        `,
    {
      notes: {
        markdown: readme,
      },
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
  full-width=${boolean("Full Width", false)}
  width=${text("Width (default: 350px)", "350px")}
  position="${select(
    "Position",
    { start: "start", center: "center", end: "end" },
    "center"
  )}"
  bottom="${select(
    "Bottom spacing",
    {
      "no-space": "no-space",
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
    },
    "xs"
  )}"
  type="success"
  active-time="${select(
    "Active Time",
    {
      xxslow: "xxslow",
      xslow: "xslow",
      slow: "slow",
      regular: "regular",
      fast: "fast",
      xfast: "xfast",
      xxfast: "xxfast",
    },
    "xfast"
  )}"
  left-right="${select(
    "Left/Right spacing",
    {
      "no-space": "no-space",
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
    },
    "xs"
  )}"
  
  title="${text("Title", "EMAIL SENT")}"
 >
    ${text("Message", "The email has been successfully sent to the recipient")}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme,
      },
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
    active-time="${select(
      "Active Time",
      {
        xxslow: "xxslow",
        xslow: "xslow",
        slow: "slow",
        regular: "regular",
        fast: "fast",
        xfast: "xfast",
        xxfast: "xxfast",
      },
      "xfast"
    )}"
    bottom="${select(
      "Bottom spacing",
      {
        "no-space": "no-space",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "xs"
    )}"
    full-width=${boolean("Full Width", false)}
    left-right="${select(
      "Left/Right spacing",
      {
        "no-space": "no-space",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "xs"
    )}"
    position="${select(
      "Position",
      { start: "start", center: "center", end: "end" },
      "center"
    )}"
    title="${text("Title", "WARNING!")}"
    width=${text("Width (default: 350px)", "350px")}
    silent=${boolean("Silent", false)}>
    ${text("Message", "You are about to delete all the conversations")}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme,
      },
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
    active-time="${select(
      "Active Time",
      {
        xxslow: "xxslow",
        xslow: "xslow",
        slow: "slow",
        regular: "regular",
        fast: "fast",
        xfast: "xfast",
        xxfast: "xxfast",
      },
      "xfast"
    )}"
    bottom="${select(
      "Bottom spacing",
      {
        "no-space": "no-space",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "xs"
    )}"
    full-width=${boolean("Full Width", false)}
    left-right="${select(
      "Left/Right spacing",
      {
        "no-space": "no-space",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "xs"
    )}"
    position="${select(
      "Position",
      { start: "start", center: "center", end: "end" },
      "center"
    )}"
    title="${text("Title", "FATAL ERROR")}"
    width=${text("Width (default: 350px)", "350px")}
    silent=${boolean("Silent", false)}>
    ${text("Message", "A fatal error has ocurred")}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme,
      },
    }
  );
