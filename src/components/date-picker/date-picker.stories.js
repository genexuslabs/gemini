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

const stories = storiesOf("Date Picker", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Date Picker", () => {
  return `<gxg-date-picker></gxg-date-picker>`;
});
