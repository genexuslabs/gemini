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

const stories = storiesOf("Text/Titles", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Titles", () => {
  return `
    <style>#root {width: 600px; text-align:center} gxg-title{display:inline-block}</style>
    <gxg-title type=${select(
      "Type",
      {
        "title-01": "title-01",
        "title-02": "title-02",
        "title-03": "title-03",
        "title-04": "title-04",
        "title-05": "title-05",
      },
      "title-01"
    )}>This is a title</gxg-title>
`;
});
