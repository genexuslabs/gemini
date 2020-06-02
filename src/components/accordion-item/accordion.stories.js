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
  const defaultValueTitle = "tab 1";
  const valueTitle = text(labelTitle, defaultValueTitle);

  //Content
  const labelValueContent = "First accordion content";
  const defaultValueContent =
    "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
  const valueContent = text(labelValueContent, defaultValueContent);

  //Initial State
  const labelInitialState =
    "Tab opened by default (only for the first accordion in this example)";
  const defaultValueInitialState = false;
  const valueInitialState = boolean(
    labelInitialState,
    defaultValueInitialState
  );

  function initialState() {
    if (valueInitialState === true) {
      return "open";
    }
  }

  //Single Tab Open
  const labelSingleTabOpen =
    "Single Tab Opened (only one accordion at a time can be open at the same time)";
  const defaultValueSingleTabOpen = false;

  const valueSingleTabOpen = boolean(
    labelSingleTabOpen,
    defaultValueSingleTabOpen
  );

  function singleTabOpen() {
    if (valueSingleTabOpen) {
      return "single-tab-open";
    } else {
      return "";
    }
  }

  //Mode
  const labelMode = "Mode";
  const optionsMode = {
    "Classical (default)": "classical",
    Alternate: "alternate"
  };
  const defaultValueMode = "classical";
  const valueMode = radios(labelMode, optionsMode, defaultValueMode);

  //One tab disabled
  const labelSingleTabDisabled =
    "Single Tab Disabled (only the first accordion for this example)";
  const defaultValueSingleTabDisabled = false;

  const valueSingleTabDisabled = boolean(
    labelSingleTabDisabled,
    defaultValueSingleTabDisabled
  );

  //All tabs disabled
  const labelAllDisabled =
    "All tabs disabled (by setting 'disabled' on the accordion-container component)";
  const defaultValueAllDisabled = false;

  const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

  function allDisabled() {
    if (valueAllDisabled) {
      return "disabled";
    }
  }

  function singleDisabled() {
    if (valueSingleTabDisabled) {
      return "disabled";
    }
  }

  return `<style>#root {width: 700px;}</style>
  <gxg-accordion-container ${singleTabOpen()} mode="${valueMode}" ${allDisabled()}>
    <gxg-accordion ${initialState()} tab-title="${valueTitle}" ${singleDisabled()}>${valueContent}</gxg-accordion>
    <gxg-accordion tab-title="tab 2">“If you want to know what a man's like, take a good look at how he
    treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
    the Goblet of Fire</gxg-accordion> 
    <gxg-accordion tab-title="tab 3">“I've learned that people will forget what you said, people will forget
    what you did, but people will never forget how you made them feel.” ―
    Maya Angelou</gxg-accordion>
  </gxg-accordion-container>`;
});
