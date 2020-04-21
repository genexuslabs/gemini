import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios
} from "@storybook/addon-knobs";

const stories = storiesOf("Form-textarea", module);
stories.addDecorator(withKnobs);
stories.add("Textarea", () => {
  //Cols
  const labelCols = "Cols";
  const defaultValueCols = 40;
  const valueCols = number(labelCols, defaultValueCols);

  //Rows
  const labelRows = "Rows";
  const defaultValueRows = 4;
  const valueRows = number(labelRows, defaultValueRows);

  //Fullwidth
  const labelWidth = "Width";
  const optionsWidth = {
    "fixed width": "fixed-width",
    "full width": "style=width:600px"
  };
  const defaultValueWidth = "fixed-width";
  const valueWidth = radios(labelWidth, optionsWidth, defaultValueWidth);

  //Status
  const labelStatus = "Status";
  const optionsStatus = {
    enabled: "enabled",
    warning: "warning",
    error: "error",
    "error (multiple)": "error-multiple",
    disabled: "disabled"
  };
  const defaultValueStatus = "enabled";
  const valueStatus = radios(labelStatus, optionsStatus, defaultValueStatus);

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

  return `<gxg-form-textarea
    label="Describe your experience"
    placeholder="I have experience as a..."
    cols=${valueCols}
    rows=${valueRows}
    ${valueWidth}
    ${valueWidth !== "fixed-width" ? "full-width" : ""}
    ${valueStatusType()}
    ${errorMessage()}
    ${errorMessagesMultiple()}
    ${warningMessage()}
  ></gxg-form-textarea>`;
});
