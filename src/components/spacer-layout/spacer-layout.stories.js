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

const stories = storiesOf("Spacer Layout", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Spacer Layout", () => {
  //Space
  const labelSpace = "Space";
  const optionsSpace = {
    xs: "xs",
    s: "s",
    m: "m",
    l: "l",
    xl: "xl"
  };
  const defaultValueSpace = "xs";

  //Display
  const labelOrientation = "Display";
  const optionsOrientation = {
    horizontal: "horizontal",
    vertical: "vertical"
  };
  const defaultValueOrientation = "horizontal";
  const valueOrientation = radios(
    labelOrientation,
    optionsOrientation,
    defaultValueOrientation
  );

  //Justify Content
  const labelJustify = "Justity Content";
  const optionsJustify = {
    start: "start",
    end: "end",
    center: "center",
    "space-between": "space-between",
    "space-around": "space-around"
  };
  const defaultValueJustify = "flex-start";

  return `
  <style>
  gxg-spacer-layout {
    background: var(--gray-01);
    width: 900px;
    height: 300px;
  }
  </style>
  <gxg-spacer-layout
  space=${select(labelSpace, optionsSpace, defaultValueSpace)}
  orientation=${valueOrientation}
  justify-content=${select(labelJustify, optionsJustify, defaultValueJustify)}
>
  <gxg-button type="primary-text-only">Salt</gxg-button>
  <gxg-button type="primary-text-only">Pepper</gxg-button>
  <gxg-button type="primary-text-only">Cucumber</gxg-button>
</gxg-spacer-layout>
  `;
});
