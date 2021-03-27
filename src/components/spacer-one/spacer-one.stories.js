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

const stories = storiesOf("Layout/Spacer One", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Spacer One", () => {
  //Space
  const labelSpace = "Space";
  const optionsSpace = {
    xs: "xs",
    s: "s",
    m: "m",
    l: "l",
    xl: "xl",
  };
  const defaultValueSpace = "xs";

  return `
  <style>
  #container {
    background: #eee;
    width: 900px;
    height: 300px;
    line-height:0;
  }
  </style>
  <div id="container"><gxg-button type="primary-text-only">Salt</gxg-button>
    <gxg-spacer-one space=${select(
      labelSpace,
      optionsSpace,
      defaultValueSpace
    )}></gxg-spacer-one>
  <gxg-button type="primary-text-only">Pepper</gxg-button>
  </div>`;
});
