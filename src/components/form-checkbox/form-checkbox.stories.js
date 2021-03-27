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

const stories = storiesOf("Controls/Checkbox", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Checkbox", () => {
  //Status
  const labelDisabled = "Disable red";
  const defaultValueDisabled = false;
  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  //Orientation
  const labelOrientation = "Orientation";
  const optionsOrientation = {
    vertical: "vertical",
    horizontal: "horizontal",
  };
  const defaultValueOrientation = "vertical";
  const valueOrientation = select(
    labelOrientation,
    optionsOrientation,
    defaultValueOrientation
  );

  //Space
  const labelSpace = "Space";
  const optionsSpace = {
    xs: "xs",
    s: "s",
    m: "m",
  };
  const defaultValueSpace = "s";
  const valueSpace = select(labelSpace, optionsSpace, defaultValueSpace);

  return `
  <gxg-spacer-layout orientation=${valueOrientation} space=${valueSpace}>
  <gxg-form-checkbox
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
></gxg-form-checkbox>
</gxg-spacer-layout>
`;
});
