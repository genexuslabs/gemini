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

const stories = storiesOf("Form-radio", module);
stories.addDecorator(withKnobs);
stories.add("Radiobutton", () => {
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

  //Status
  const labelDisabled = "Disabled";
  const defaultValueDisabled = false;

  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  function checkedFirst() {
    if (valueDisabled === false) {
      return "checked";
    }
  }

  function checkedSecond() {
    if (valueDisabled === true) {
      return "checked";
    }
  }

  return `<gxg-form-radio-wrapper ${valueDisplay}>


  <gxg-form-radio
    label="red"
    name="colors"
    radio-id="red"
    value="red"
    ${checkedFirst()}
    disabled=${valueDisabled}
  ></gxg-form-radio>

  <gxg-form-radio
    label="blue"
    name="colors"
    radio-id="blue"
    value="blue"
    ${checkedSecond()}
  ></gxg-form-radio>

  <gxg-form-radio
    label="green"
    name="colors"
    radio-id="green"
    value="green"
  ></gxg-form-radio>

  <gxg-form-radio
  label="orange"
  name="colors"
  radio-id="orange"
  value="orange"
></gxg-form-radio>

<gxg-form-radio
  label="pink"
  name="colors"
  radio-id="pink"
  value="pink"
></gxg-form-radio>


</gxg-form-radio-wrapper>`;
});
