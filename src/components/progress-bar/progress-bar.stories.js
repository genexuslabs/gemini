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

const stories = storiesOf("Interaction/Progress-bar", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
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
  const labelMaxWidth = "Max Width";
  const defaultValueMaxWidth = "100%";
  const valueMaxWidth = text(labelMaxWidth, defaultValueMaxWidth);

  function animateProgressBar() {
    const progresBar = document.getElementById("progress-bar");
    const initialValue = progresBar.getAttribute("value");
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
  id="progress-bar"
  value=${valueValue}
  label=${valueLabel}
  max-width=${valueMaxWidth}
  silent=${boolean("Silent", false)}>
></gxg-progress-bar>
<gxg-button style="margin-top:30px" onClick="(function(){
  const progressBar = document.getElementById('progress-bar');
  let initialProgress = progressBar.getAttribute('value');
  for (let index = initialProgress; index <= 75; index++) {
    progressBar.setAttribute('value',index);
  };
  setTimeout(function(){
    for (let index = initialProgress; index <= 90; index++) {
      progressBar.setAttribute('value',index);
    };
  }, 1000);
  setTimeout(function(){
    for (let index = initialProgress; index <= 95; index++) {
      progressBar.setAttribute('value',index);
    };
  }, 2000);
  setTimeout(function(){
    for (let index = initialProgress; index <= 100; index++) {
      progressBar.setAttribute('value',index);
    };
  }, 2500);
  return false;
})();return false;">Animate</gxg-button>
  `;
});
