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

const stories = storiesOf("Slider", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Slider", () => {
  //Initial value
  const labelValueInitial = "Initial Value";
  const defaultValueInitial = 300;
  const valueInitial = number(labelValueInitial, defaultValueInitial);

  //Max value
  const labelMax = "Max. Value";
  const defaultValueMax = 400;
  const valueMax = number(labelMax, defaultValueMax);

  //Width
  const labelWidth = "Width";
  const defaultValueWidth = "300px";
  const valueWidth = text(labelWidth, defaultValueWidth);

  //Fullwidth
  const labelWidthStyle = "Width Style";
  const optionsWidthStyle = {
    "fixed width": "fixed-width",
    "full width": "full-width"
  };
  const defaultValueWidthStyle = "fixed-width";
  const valueWidthStyle = radios(
    labelWidthStyle,
    optionsWidthStyle,
    defaultValueWidthStyle
  );

  //Disabled
  const labelDisabled = "Disabled";
  const defaultValueDisabled = false;
  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  function valueDisabledFunc() {
    if (valueDisabled) {
      return "disabled";
    }
  }

  return `
  <style>
    #root{
      width:700px;
      text-align:center
    }
  </style>
  <gxg-slider label="Slider" ${valueDisabledFunc()} value=${valueInitial} max=${valueMax} width=${valueWidth} ${valueWidthStyle}></gxg-slider>
  `;
});
