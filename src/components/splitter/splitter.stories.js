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

const stories = storiesOf("Layout/Splitter", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Horizontal", () => {
    //Sizes
    const sizesLabel = "Sizes (in percentages, separated by comma)";
    const defaultValuesizesLabel = "25,75";
    const sizesValueLabel = text(sizesLabel, defaultValuesizesLabel);

    //Min Sizes
    const minSizesLabel = "Min Sizes (in pixels, separated by comma)";
    const defaultValueMinsizesLabel = "0,100";
    const minSizesValueLabel = text(minSizesLabel, defaultValueMinsizesLabel);

    //Simple knob
    const labelSimpleKnob = "Simple knob";
    const defaultValueSimpleKnob = false;
    const valueSimpleKnob = boolean(labelSimpleKnob, defaultValueSimpleKnob);

    function simpleKnob() {
      if (valueSimpleKnob) {
        return "knob-simple";
      } else {
        return "knob";
      }
    }

    //Direction
    const labelDirection = "Direction";
    const optionsDirection = {
      vertical: "vertical",
      horizontal: "horizontal",
    };
    const defaultValueDirection = "horizontal";
    const valueDirection = select(
      labelDirection,
      optionsDirection,
      defaultValueDirection
    );

    return `
  <style>
  .container {
    width: 628px;
    height: 400px;
    background-color: white;                                            
  }
  </style>
  <div class="container">
  <gxg-splitter direction=${valueDirection} sizes="${sizesValueLabel}" min-size="${minSizesValueLabel}" ${simpleKnob()}>
     <gxg-split id="a" style="background-color:var(--color-error-light)"></gxg-split>
     <gxg-split id="b" style="background-color:var(--color-success-light)"></gxg-split>
  </gxg-splitter>
</div>
`;
  })
  .add("Vertical", () => {
    return `
  <style>
  .container {
    width: 800px;
    height: 400px;
    background-color: white;                                            
  }
  </style>
  <div class="container">
  <gxg-splitter direction="vertical" knob sizes="25,75" min-size="0,300">
     <gxg-split id="a" style="background-color:var(--color-error-light)"></gxg-split>
     <gxg-split id="b" style="background-color:var(--color-success-light)"></gxg-split>
  </gxg-splitter>
</div>
`;
  });
