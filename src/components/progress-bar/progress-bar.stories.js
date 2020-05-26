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

const stories = storiesOf("Progress-bar", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Progress Bar", () => {
  //Label
  const labelLabel = "Label";
  const defaultValueLabel = "Progress-Bar";
  const valueLabel = text(labelLabel, defaultValueLabel);

  //Initial value
  const labelValue = "Initial Value (%)";
  const defaultValueValue = 50;
  const valueValue = number(labelValue, defaultValueValue);

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

  function animateProgressBar() {
    const progresBar = document.getElementById("progress-bar");
    const initialValue = progresBar.getAttribute("value");
    console.log(initialValue);
  }

  function valueWidthSizeFunc() {
    if (valueWidthStyle === "full-width") {
      return "full-width";
    }
  }

  return `
  <style>
  #root {
    width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  <gxg-progress-bar
  ${valueWidthStyle}
  id="progress-bar"
  label=${valueLabel}
  value=${valueValue}
  width=${valueWidth}
></gxg-progress-bar>
<gxg-button style="margin-top:30px" onClick="(function(){
  const progressBar = document.getElementById('progress-bar');
  let initialProgress = progressBar.getAttribute('value');
  console.log(progressBar);
  for (let index = initialProgress; index <= 100; index++) {
    progressBar.setAttribute('value',index);
  };
  
  return false;
})();return false;">Animate</gxg-button>
  `;
});
