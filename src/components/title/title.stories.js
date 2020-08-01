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

const stories = storiesOf("Text/Titles", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Titles", () => {
  return `
    <style>#root {width: 600px; text-align:center} gxg-title{display:inline-block}</style>
    <gxg-title type=${radios(
      "Type",
      {
        "01": "01",
        "02": "02",
        "03": "03",
        "04": "04",
        "05": "05"
      },
      "01"
    )}>This is a title</gxg-title>
`;
});
