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

const stories = storiesOf("Layout/Stack", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Stack", () => {
  return `
      <style>
        #root {
          width: 300px;
        }
      </style>
        <gxg-stack space="${select(
          "Stack Space",
          {
            xs: "xs",
            s: "s",
            m: "m",
            l: "l",
            xl: "xl",
          },
          "s"
        )}">
      <gxg-form-textarea
      id="textarea1"
      name="textarea1"
      label="Describe your experience:"
      placeholder="I have experience cooking burguers with chedar cheese"
      full-width
    >
    </gxg-form-textarea>
        <gxg-form-text
        type="text"
        id="name4"
        name="Johan"
        label="Describe your experience"
        placeholder="First Name:"
        required
        >
        </gxg-form-text>

        <gxg-form-text
type="text"
id="name4"
name="name"
label="Second name:"
placeholder="Sebastian"
display-flex
required
>
</gxg-form-text>

<gxg-select label="Type of car you would like to drive:" width="400px" size="5" full-width>
<gxg-option value="0">Select car:</gxg-option>
<gxg-option value="1">Audi</gxg-option>
<gxg-option value="2">BMW</gxg-option>
<gxg-option selected value="3">Citroen</gxg-option>
<gxg-option value="4">Ford</gxg-option>
<gxg-option value="5">Honda</gxg-option>
<gxg-option value="6">Jaguar</gxg-option>
<gxg-option value="7">Land Rover</gxg-option>
<gxg-option value="8">Mercedes</gxg-option>
</gxg-select>

<gxg-button full-width type="primary-text-only">Submit</gxg-button>
</gxg-stack>`;
});
