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

const stories = storiesOf("Interaction/Demo", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Box", () => {
  return `
    <style>
    div{
      
    }
    </style>
    <div></div>
`;
});
