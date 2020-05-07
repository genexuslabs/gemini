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

const stories = storiesOf("Accordion", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Accordion", () => {
  //Title
  const labelTitle = "Title";
  const defaultValueTitle = "tab title";
  const valueTitle = text(labelTitle, defaultValueTitle);

  //Content
  const labelValueContent = "Content";
  const defaultValueContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolorum voluptatibus harum minima aut id architecto adipisci tempore numquam explicabo iure quae, laborum qui at? Qui nemo in facere voluptates.";
  const valueContent = text(labelValueContent, defaultValueContent);

  //Status
  const labelDisabled = "Open";
  const defaultValueDisabled = false;

  const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

  function initialState() {
    if (valueDisabled === true) {
      return "open";
    }
  }

  return `<style>#root {width: 700px;}</style>
  <gxg-accordion-wrapper>
    <gxg-accordion ${initialState()} tab-title="${valueTitle}">${valueContent}</gxg-accordion>
    <gxg-accordion ${initialState()} tab-title="${valueTitle}">${valueContent}</gxg-accordion> 
    <gxg-accordion ${initialState()} tab-title="${valueTitle}">${valueContent}</gxg-accordion>
  </gxg-accordion-wrapper>`;
});
