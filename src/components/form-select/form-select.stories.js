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

const stories = storiesOf("Form-select", module);
stories.addDecorator(withKnobs);
stories.add("Select", () => {
  //Display
  const labelDisplay = "Display";
  const optionsDisplay = {
    flex: "flex",
    "inline-flex": "inline-flex"
  };
  const defaultValueDisplay = "flex";
  const valueDisplay = radios(
    labelDisplay,
    optionsDisplay,
    defaultValueDisplay
  );

  //Max number visible options
  const labelMaxOptions = "Max. number of visible options";
  const defaultMaxOptions = 4;
  const valueMaxOptions = number(labelMaxOptions, defaultMaxOptions);

  //Width value
  const labelWidthSize = "Width Size (default: 240px )";
  const defaultWidthSize = "240px";
  const valueWidthSize = text(labelWidthSize, defaultWidthSize);

  //Fullwidth
  const labelWidthStyle = "Width Style";
  const optionsWidthStyle = {
    "fixed width": "fixed-width",
    "full width (Display must be 'default')": "style=width:600px"
  };
  const defaultValueWidthStyle = "fixed-width";
  const valueWidthStyle = radios(
    labelWidthStyle,
    optionsWidthStyle,
    defaultValueWidthStyle
  );

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

  function valueWidthSizeFunc() {
    if (valueWidthStyle === "fixed-width") {
      return "240px";
    } else {
      if (valueDisplay !== "inline-flex") {
        return "600px";
      } else {
        return "240px";
      }
    }
  }

  return `<gxg-form-select
  label="Select a car:"
  ${valueDisplay}
  width=${valueWidthSizeFunc()}
  ${valueStatusType()}
    ${errorMessage()}
    ${errorMessagesMultiple()}
    ${warningMessage()}
  max-visible-options=${valueMaxOptions}
>
  <option value="0">Select car:</option>
  <option value="1">Audi</option>
  <option value="2">BMW</option>
  <option selected value="3">Citroen</option>
  <option value="4">Ford</option>
  <option value="5">Honda</option>
  <option value="6">Jaguar</option>
  <option value="7">Land Rover</option>
  <option value="8">Mercedes</option>
</gxg-form-select>

<gxg-form-select
  label="Select a car:"
  ${valueDisplay}
  width=${valueWidthSizeFunc()}
  ${valueStatusType()}
    ${errorMessage()}
    ${errorMessagesMultiple()}
    ${warningMessage()}
  max-visible-options=${valueMaxOptions}
>
  <option value="0">Select car:</option>
  <option value="1">Audi</option>
  <option value="2">BMW</option>
  <option selected value="3">Citroen</option>
  <option value="4">Ford</option>
  <option value="5">Honda</option>
  <option value="6">Jaguar</option>
  <option value="7">Land Rover</option>
  <option value="8">Mercedes</option>
</gxg-form-select>`;
});
