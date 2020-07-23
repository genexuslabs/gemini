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

const stories = storiesOf("Input text", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Text", () => {
  //Icon Type
  const labelIconType = "Icon";
  const optionsIconType = [
    "arrowDown",
    "arrowLeft",
    "arrowRight",
    "arrowUp",
    "chevronDown",
    "chevronLeft",
    "chevronRight",
    "chevronUp",
    "close",
    "colorPicker",
    "deleted",
    "drag",
    "duplicate",
    "editWand",
    "edit",
    "error",
    "levelDown",
    "levelUp",
    "moreInfo",
    "search",
    "settings",
    "showMore",
    "success",
    "warning"
  ];
  const defaultValueIconType = "search";
  const valueIconType = select(
    labelIconType,
    optionsIconType,
    defaultValueIconType
  );

  //Icon Position
  const labelIcon = "Icon position";
  const optionsIcon = {
    left: "left",
    right: "right"
  };
  const defaultValueIcon = "left";
  const valueIcon = radios(labelIcon, optionsIcon, defaultValueIcon);

  //Max Width
  const labelMaxWidth = "Max. Width";
  const defaultValueMaxWidth = "100%";
  const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

  //Minimal
  const labelMinimal = "Minimal (border an background visible on focus only)";
  const defaultValueMinimal = false;
  const valueMinimal = boolean(labelMinimal, defaultValueMinimal);

  //Required
  const requiredLabel = "Required";
  const requiredDefaultValue = false;
  const requiredValue = boolean(requiredLabel, requiredDefaultValue);

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

  return `<style>#root{width:700px;display:flex;flex-direction:column;align-items:center}gxg-form-text{margin-bottom: var(--spacing-lay-xs)}</style>

  <gxg-form-text
  label="Position"
  placeholder="Chief Executive"
  icon=${valueIconType}
  icon-position=${valueIcon}
  max-width=${valueMaxWidth}
  ${minimal()}
  ${requiredValueFunc()}
  ${valueStatusType()}
  ${errorMessage()}
${errorMessagesMultiple()}
${warningMessage()}
></gxg-form-text>
`;
});
