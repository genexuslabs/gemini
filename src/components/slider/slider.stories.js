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

const stories = storiesOf("Controls/Slider", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Slider", () => {
  //Disabled
  const labelDisabled = "Disabled";
  const defaultValueDisabled = false;
  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  //Initial value
  const labelValueInitial = "Initial Value";
  const defaultValueInitial = 300;
  const valueInitial = number(labelValueInitial, defaultValueInitial);

  //Max value
  const labelMax = "Max. Value";
  const defaultValueMax = 400;
  const valueMax = number(labelMax, defaultValueMax);

  //Max Width
  const labelWidth = "Max. Width";
  const defaultValueMaxWidth = "100%";
  const valueMaxWidth = text(labelWidth, defaultValueMaxWidth);

  function valueDisabledFunc() {
    if (valueDisabled) {
      return "disabled";
    }
  }

  return `
  <style>
    #root{
      width:700px;
      text-align:center;
      display:flex;
      justify-content: center;
    }s
  </style>
  <gxg-slider label="Slider" ${valueDisabledFunc()} value=${valueInitial} max=${valueMax} max-width=${valueMaxWidth}></gxg-slider>
  `;
});
