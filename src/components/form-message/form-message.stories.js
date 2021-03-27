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

const stories = storiesOf("Controls/Form message", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Warning", () => {
    return `<gxg-form-message type="warning" slot="message">The name field can not contain any numbers</gxg-form-message>`;
  })
  .add(
    "Error",
    () =>
      `<gxg-form-message type="error" slot="message">Address field is mandatory</gxg-form-message>`
  );
