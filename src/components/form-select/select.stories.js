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

const stories = storiesOf("Controls/Select", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Select", () => {
  //Label Position
  const labelLabelPosition = "Label position";
  const optionsLabelPosition = {
    start: "start",
    above: "above",
  };
  const defaultValueLabelPosition = "above";
  const valueLabelPosition = select(
    labelLabelPosition,
    optionsLabelPosition,
    defaultValueLabelPosition
  );

  //Max Width
  const labelMaxWidthSize = "Max. Width";
  const defaultMaxWidthSize = "100%";
  const valueMaxWidthSize = text(labelMaxWidthSize, defaultMaxWidthSize);

  //Max number visible options
  const labelMaxOptions = "Max. number of visible options";
  const defaultMaxOptions = 4;
  const valueMaxOptions = number(labelMaxOptions, defaultMaxOptions);

  //Minimal
  const labelMinimal = "Minimal (border an background visible on focus only)";
  const defaultValueMinimal = false;
  const valueMinimal = boolean(labelMinimal, defaultValueMinimal);

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

  function minimal() {
    if (valueMinimal) {
      return `minimal`;
    }
  }

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

  return `<style>
  gxg-select{margin-bottom: var(--spacing-lay-xs)}
  #root {
    width: 700px;
    display:flex;
    flex-direction: column;
    align-items: center
  }
  gxg-select {
    width: 100%;
  }
  </style>
  
  <gxg-select
  label="Select a car:"
  label-position=${valueLabelPosition}
  max-width=${valueMaxWidthSize}
  ${minimal()}
  ${valueStatusType()}
    ${errorMessage()}
    ${errorMessagesMultiple()}
    ${warningMessage()}
  size=${valueMaxOptions}
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
