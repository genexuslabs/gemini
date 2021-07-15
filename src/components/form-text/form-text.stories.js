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

const stories = storiesOf("Controls/Input text", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Text", () => {
  //Label
  const labelLabel = "Label";
  const defaultValueLabel = "Position";
  const valueLabel = text(labelLabel, defaultValueLabel);

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

  //Required
  const requiredLabel = "Required";
  const requiredDefaultValue = false;
  const requiredValue = boolean(requiredLabel, requiredDefaultValue);

  //Icon
  const labelIcon = "Icon";
  const defaultValueIcon = "gemini-tools/edit";
  const valueIcon = text(labelIcon, defaultValueIcon);

  //Icon Position
  const labelIconPosition = "Icon position";
  const optionsIconPosition = {
    start: "start",
    end: "end",
  };
  const defaultValueIconPosition = "start";
  const valueIconPosition = select(
    labelIconPosition,
    optionsIconPosition,
    defaultValueIconPosition
  );

  //Clear button
  const labelClearButton = "Clear button";
  const defaultValueClearButton = false;
  const valueClearButton = boolean(labelClearButton, defaultValueClearButton);

  //Text Style
  const labelTextStyle = "Text Style";
  const optionsTextStyle = {
    regular: "regular",
    quote: "quote",
    "title-01": "title-01",
    "title-02": "title-02",
    "title-03": "title-03",
    "title-04": "title-04",
    "title-05": "title-05",
  };
  const defaultValueTextStyle = "regular";
  const valueTextStyle = select(
    labelTextStyle,
    optionsTextStyle,
    defaultValueTextStyle
  );

  //Minimal
  const labelMinimal = "Minimal (border an background visible on focus only)";
  const defaultValueMinimal = false;
  const valueMinimal = boolean(labelMinimal, defaultValueMinimal);

  //Max Width
  const labelMaxWidth = "Max. Width";
  const defaultValueMaxWidth = "100%";
  const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

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

  function minimal() {
    if (valueMinimal) {
      return `minimal`;
    }
  }

  function requiredValueFunc() {
    if (requiredValue) {
      return "required";
    }
  }

  function clearButtonFunc() {
    if (valueClearButton) {
      return "clear-button";
    }
  }

  return `<style>#root{width:700px;display:flex;flex-direction:column;align-items:center}gxg-form-text{margin-bottom: var(--spacing-lay-xs)}</style>

  <gxg-form-text
  label=${valueLabel}
  label-position=${valueLabelPosition}
  placeholder="Chief Executive"
  ${clearButtonFunc()}
  icon=${valueIcon}
  icon-position=${valueIconPosition}
  max-width=${valueMaxWidth}
  text-style=${valueTextStyle}
  ${minimal()}
  ${requiredValueFunc()}
  ${valueStatusType()}
  ${errorMessage()}
${errorMessagesMultiple()}
${warningMessage()}
></gxg-form-text>
`;
});
