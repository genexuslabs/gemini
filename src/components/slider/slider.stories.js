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
stories.add("Slider", () => {
  //Initial value
  const labelValueInitial = "Initial Value";
  const defaultValueInitial = 300;
  const valueInitial = number(labelValueInitial, defaultValueInitial);

  //Max value
  const labelMax = "Max. Value";
  const defaultValueMax = 400;
  const valueMax = number(labelMax, defaultValueMax);

  return `
  <gxg-slider label="Slider" value=${valueInitial} max=${valueMax}></gxg-slider>
  `;
});
