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

const stories = storiesOf("Stepper", module);
stories.addDecorator(withKnobs);
stories.add("Stepper", () => {
  //Label
  const labelLabel = "Label";
  const defaultValueLabel = "Stepper";
  const valueLabel = text(labelLabel, defaultValueLabel);

  //Initial value
  const labelValue = "Initial Value";
  const defaultValueValue = 0;
  const valueValue = number(labelValue, defaultValueValue);

  //Min value
  const labelMinValue = "Min. Value";
  const defaultMinValue = 0;
  const valueMinValue = number(labelMinValue, defaultMinValue);

  //Initial value
  const labelMaxValue = "Max. Value";
  const defaultMaxValue = 10;
  const valueMaxValue = number(labelMaxValue, defaultMaxValue);

  //Status
  const labelDisabled = "Disabled";
  const defaultValueDisabled = false;

  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  return `<gxg-stepper label=${valueLabel} value=${valueValue} min=${valueMinValue} max=${valueMaxValue} disabled=${valueDisabled}></gxg-stepper>`;
});
