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

const stories = storiesOf("Select", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Select", () => {
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
    "full width": "style=width:700px"
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
      return "700px";
    }
  }

  return `<style>gxg-select{margin-bottom: var(--spacing-lay-xs)}</style>
  
  <gxg-select
  label="Select a car:"
  width=${valueWidthSizeFunc()}
  ${valueStatusType()}
    ${errorMessage()}
    ${errorMessagesMultiple()}
    ${warningMessage()}
  max-visible-options=${valueMaxOptions}
>
  <gxg-option value="0">Select car:</gxg-option>
  <gxg-option value="1">Audi</gxg-option>
  <gxg-option value="2">BMW</gxg-option>
  <gxg-option selected value="3">Citroen</gxg-option>
  <gxg-option value="4">Ford</gxg-option>
  <gxg-option value="5">Honda</gxg-option>
  <gxg-option value="6">Jaguar</gxg-option>
  <gxg-option value="7">Land Rover</gxg-option>
  <gxg-option value="8">Mercedes</gxg-option>
</gxg-select>

<gxg-select
  label="Select a car:"
  width=${valueWidthSizeFunc()}
  ${valueStatusType()}
    ${errorMessage()}
    ${errorMessagesMultiple()}
    ${warningMessage()}
  max-visible-options=${valueMaxOptions}
>
  <gxg-option value="0">Select car:</gxg-option>
  <gxg-option value="1">Audi</gxg-option>
  <gxg-option value="2">BMW</gxg-option>
  <gxg-option selected value="3">Citroen</gxg-option>
  <gxg-option value="4">Ford</gxg-option>
  <gxg-option value="5">Honda</gxg-option>
  <gxg-option value="6">Jaguar</gxg-option>
  <gxg-option value="7">Land Rover</gxg-option>
  <gxg-option value="8">Mercedes</gxg-option>
</gxg-select>`;
});
