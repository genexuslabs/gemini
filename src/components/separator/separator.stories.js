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

const stories = storiesOf("Layout/Separator", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Separator", () => {
  /*Top/Bottom margin*/
  const labelMargin = "Top/Bottom margin";
  const optionsMargin = {
    xs: "xs",
    s: "s",
    m: "m",
    l: "l",
    xl: "xl",
  };
  const defaultValueMargin = "xs";

  //Type
  const labelType = "Type";
  const optionsType = {
    solid: "solid",
    dashed: "dashed",
  };
  const defaultValueType = "solid";
  const valueType = select(labelType, optionsType, defaultValueType);

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
    <gxg-separator margin="${select(
      labelMargin,
      optionsMargin,
      defaultValueMargin
    )}" type="${valueType}"></gxg-separator>
    <q>Don’t Let Yesterday Take Up Too Much Of Today. – Will Rogers</q>`;
});
