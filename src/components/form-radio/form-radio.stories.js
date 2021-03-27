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

const stories = storiesOf("Controls/Radio button", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Radiobutton", () => {
  //Status
  const labelDisabled = "Disable red";
  const defaultValueDisabled = false;
  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  //Radio Group Label
  const labelRadioGroupLabel = "Radio Group Label";
  const defaultValueRadioGroupLabel = "My favorite color:";
  const valueRadioGroupLabel = text(
    labelRadioGroupLabel,
    defaultValueRadioGroupLabel
  );

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

  return `<gxg-form-radio-group label="${valueRadioGroupLabel}">

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


</gxg-form-radio-group>`;
});
