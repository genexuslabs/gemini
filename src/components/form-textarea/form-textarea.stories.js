import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios,
} from "@storybook/addon-knobs";

const stories = storiesOf("Controls/Textarea", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Textarea", () => {
  //Max Width
  const labelMaxWidth = "Max. Width";
  const defaultMaxWidth = "100%";
  const valueMaxWidth = text(labelMaxWidth, defaultMaxWidth);

  //Required
  const requiredLabel = "Required";
  const requiredDefaultValue = false;
  const requiredValue = boolean(requiredLabel, requiredDefaultValue);

  //Rows
  const labelRows = "Rows";
  const defaultValueRows = 4;
  const valueRows = number(labelRows, defaultValueRows);

  //Status
  const labelStatus = "Status";
  const optionsStatus = {
    enabled: "enabled",
    warning: "warning",
    error: "error",
    "error (multiple)": "error-multiple",
    disabled: "disabled",
  };
  const defaultValueStatus = "enabled";
  const valueStatus = select(labelStatus, optionsStatus, defaultValueStatus);

  function valueStatusType() {
    if (valueStatus === "error" || valueStatus === "error-multiple") {
      return "error";
    } else {
      return valueStatus;
    }
  }

  function errorMessage() {
    if (valueStatus === "error") {
      return `<div><gxg-form-message type="error" slot="message">
    This is an error message
  </gxg-form-message></div>`;
    }
  }

  function requiredValueFunc() {
    if (requiredValue) {
      return "required";
    }
  }

  function errorMessagesMultiple() {
    if (valueStatus === "error-multiple") {
      return `<div><gxg-form-message type="error" slot="message">
    This is an error message
  </gxg-form-message>
  <gxg-form-message type="error" slot="message">
    This is another error message
  </gxg-form-message></div>`;
    }
  }

  function warningMessage() {
    if (valueStatus === "warning") {
      return `<div><gxg-form-message type="warning" slot="message">
    This is a warning message
  </gxg-form-message></div>`;
    }
  }

  return `<style>#root{width:700px; display:flex; flex-direction:column;align-items:center}</style>
    <gxg-form-textarea max-width=${valueMaxWidth} ${requiredValueFunc()}
    label="Describe your experience"
    placeholder="I have experience as a.."
    rows=${valueRows}
    ${valueStatusType()}
    ${errorMessage()}
    ${errorMessagesMultiple()}
    ${warningMessage()}
  ></gxg-form-textarea>`;
});
