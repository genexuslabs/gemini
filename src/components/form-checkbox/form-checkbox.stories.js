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

const stories = storiesOf("Checkbox", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Checkbox", () => {
  //Status
  const labelDisabled = "Disable red";
  const defaultValueDisabled = false;

  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  return `<gxg-form-checkbox
  label="red"
  id="red"
  name="red"
  value="red"
  disabled=${valueDisabled}
  checked
></gxg-form-checkbox>
<gxg-form-checkbox
  label="blue"
  id="blue"
  name="blue"
  value="blue"
  checked
></gxg-form-checkbox>
<gxg-form-checkbox
  label="green"
  id="green"
  name="green"
  value="green"
></gxg-form-checkbox>
<gxg-form-checkbox
  label="orange"
  id="orange"
  name="orange"
  value="orange"
></gxg-form-checkbox>
<gxg-form-checkbox
  label="pink"
  id="pink"
  name="pink"
  value="pink"
></gxg-form-checkbox>`;
});
