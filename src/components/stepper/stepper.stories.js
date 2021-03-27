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

const stories = storiesOf("Controls/Stepper", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Stepper", () => {
  //Disabled
  const labelDisabled = "Disabled";
  const defaultValueDisabled = false;
  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  //Initial value
  const labelValue = "Initial Value";
  const defaultValueValue = 0;
  const valueValue = number(labelValue, defaultValueValue);

  //Label
  const labelLabel = "Label";
  const defaultValueLabel = "Stepper";
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

  //Max value
  const labelMaxValue = "Max. Value";
  const defaultMaxValue = 10;
  const valueMaxValue = number(labelMaxValue, defaultMaxValue);

  //Min value
  const labelMinValue = "Min. Value";
  const defaultMinValue = 0;
  const valueMinValue = number(labelMinValue, defaultMinValue);

  function disabled() {
    if (valueDisabled) {
      return "disabled";
    }
  }

  return `<gxg-stepper ${disabled()} value=${valueValue} label=${valueLabel} label-position=${valueLabelPosition} max=${valueMaxValue} min=${valueMinValue}></gxg-stepper>`;
});
