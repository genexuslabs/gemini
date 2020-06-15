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

const stories = storiesOf("Hr", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Hr", () => {
  //Fullwidth
  const labelType = "Type";
  const optionsType = {
    solid: "solid",
    dashed: "dashed"
  };
  const defaultValueType = "solid";
  const valueType = radios(labelType, optionsType, defaultValueType);

  return `
  <style>
  #root {
    width: 700px;
  }
  q {
    font-family:var(--font-family-primary);
    font-size: var(--font-size-md);
    color:var(--color-on-background);
  }
  </style>
  <q>The Way Get Started Is To Quit Talking And Begin Doing. – Walt Disney</q>
    <gxg-hr type="${valueType}"></gxg-hr>
    <q>Don’t Let Yesterday Take Up Too Much Of Today. – Will Rogers</q>`;
});
