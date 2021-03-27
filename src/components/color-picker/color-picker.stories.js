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

const stories = storiesOf("Controls/Color Picker", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Color Picker", () => {
  return `<gxg-color-picker label='${text(
    "Label (optional)",
    "Pick a color:"
  )}' value=${text("Value (color)", "red")}
  )}'></gxg-color-picker>`;
});
