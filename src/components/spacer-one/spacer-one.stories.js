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

const stories = storiesOf("Spacer One", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Spacer One", () => {
  //Space
  const labelSpace = "Space";
  const optionsSpace = {
    xxsmall: "xxsmall",
    xsmall: "xsmall",
    small: "small",
    medium: "medium",
    large: "large",
    xlarge: "xlarge",
    xxlarge: "xxlarge"
  };
  const defaultValueSpace = "xxsmall";

  return `
  <style>
  #container {
    background: #eee;
    width: 900px;
    height: 300px;
  }
  </style>
  <div id="container">
  <gxg-button type="primary-text-only">Salt</gxg-button>
    <gxg-spacer-one space=${select(
      labelSpace,
      optionsSpace,
      defaultValueSpace
    )}></gxg-spacer-one>
  <gxg-button type="primary-text-only">Pepper</gxg-button>
  </div>`;
});
