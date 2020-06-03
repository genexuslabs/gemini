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
    width=${text("Width (default: 350px)", "350px")}
    full-width=${boolean("Full Width", false)}
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
    )}">
  ${text(
    "Message",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
  )}
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
      width=${text("Width (default: 350px)", "350px")}
      full-width=${boolean("Full Width", false)}
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
      )}">
    ${text(
      "Message",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    )}
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
      left-right="${select(
        "Left/Right",
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
        width=${text("Width (default: 350px)", "350px")}
        full-width=${boolean("Full Width", false)}
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
      )}">
    ${text(
      "Message",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    )}
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
      width=${text("Width (default: 350px)", "350px")}
      full-width=${boolean("Full Width", false)}
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
      )}">
    ${text(
      "Message",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
    )}
    </gxg-alert>
          `,
    {
      notes: {
        markdown: readme
      }
    }
  );
