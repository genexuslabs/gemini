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

const stories = storiesOf("Form-checkbox", module);
stories.addDecorator(withKnobs);
stories.add("Checkbox", () => {
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

  return `<gxg-form-checkbox
  label="red"
  id="red"
  name="red"
  value="red"
  ${valueDisplay}
  disabled=${valueDisabled}
  checked
></gxg-form-checkbox>

<gxg-form-checkbox
  label="blue"
  id="blue"
  name="blue"
  value="blue"
  ${valueDisplay}
  checked
></gxg-form-checkbox>

<gxg-form-checkbox
  label="green"
  id="green"
  name="green"
  value="green"
  ${valueDisplay}
></gxg-form-checkbox>

<gxg-form-checkbox
  label="orange"
  id="orange"
  name="orange"
  value="orange"
  ${valueDisplay}
></gxg-form-checkbox>

<gxg-form-checkbox
  label="pink"
  id="pink"
  name="pink"
  value="pink"
  ${valueDisplay}
></gxg-form-checkbox>`;
});
