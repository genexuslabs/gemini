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
stories
  .add("Classical", () => {
    //Title
    const labelTitle = "Title";
    const defaultValueTitle = "Dr. Seuss";
    const valueTitle = text(labelTitle, defaultValueTitle);

    //Content
    const labelValueContent = "First accordion content";
    const defaultValueContent =
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
    const valueContent = text(labelValueContent, defaultValueContent);

    //Full width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;

    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);
    function fullWidth() {
      if (valueFullWidth === true) {
        return "full-width";
      }
    }

    //Initial State
    const labelInitialState =
      "Item opened by default (only for the first accordion in this example)";
    const defaultValueInitialState = false;
    const valueInitialState = boolean(
      labelInitialState,
      defaultValueInitialState
    );

    //Single Item Open
    const labelSingleItemOpen =
      "Single Item Open (only one accordion at a time can be open at the same time)";
    const defaultValueSingleItemOpen = false;

    const valueSingleItemOpen = boolean(
      labelSingleItemOpen,
      defaultValueSingleItemOpen
    );

    function singleItemOpen() {
      if (valueSingleItemOpen) {
        return "single-item-open";
      } else {
        return "";
      }
    }

    //One item disabled
    const labelSingleItemDisabled =
      "Item Disabled (only the first accordion for this example)";
    const defaultValueSingleItemDisabled = false;

    const valueSingleItemDisabled = boolean(
      labelSingleItemDisabled,
      defaultValueSingleItemDisabled
    );

    //All items disabled
    const labelAllDisabled =
      "All items disabled (by setting 'disabled' on the accordion-container component)";
    const defaultValueAllDisabled = false;

    const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

    function allDisabled() {
      if (valueAllDisabled) {
        return "disabled";
      }
    }

    function itemOpen() {
      if (valueInitialState) {
        return "open";
      }
    }

    function singleDisabled() {
      if (valueSingleItemDisabled) {
        return "disabled";
      }
    }

    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
  <gxg-accordion ${fullWidth()} ${allDisabled()} ${singleItemOpen()} mode="classical">
    <gxg-accordion-item item-title="${valueTitle}" item-id="tab 1" ${singleDisabled()} ${itemOpen()}>${valueContent}</gxg-accordion-item>
    <gxg-accordion-item item-title="J.K. Rowling" item-id="tab 2">“If you want to know what a man's like, take a good look at how he
    treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
    the Goblet of Fire</gxg-accordion-item> 
    <gxg-accordion-item item-title="Maya Angelou" item-id="tab 3">“I've learned that people will forget what you said, people will forget
    what you did, but people will never forget how you made them feel.” ―
    Maya Angelou</gxg-accordion-item>
  </gxg-accordion>`;
  })
  .add("Slim", () => {
    //Title
    const labelTitle = "Title";
    const defaultValueTitle = "Dr. Seuss";
    const valueTitle = text(labelTitle, defaultValueTitle);

    //Content
    const labelValueContent = "First accordion content";
    const defaultValueContent =
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
    const valueContent = text(labelValueContent, defaultValueContent);

    //Full width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;

    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);
    function fullWidth() {
      if (valueFullWidth === true) {
        return "full-width";
      }
    }

    //Initial State
    const labelInitialState =
      "Item opened by default (only for the first accordion in this example)";
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

    //Single Item Open
    const labelSingleItemOpen =
      "Single Item Open (only one accordion at a time can be open at the same time)";
    const defaultValueSingleItemOpen = false;

    const valueSingleItemOpen = boolean(
      labelSingleItemOpen,
      defaultValueSingleItemOpen
    );

    function singleItemOpen() {
      if (valueSingleItemOpen) {
        return "single-item-open";
      } else {
        return "";
      }
    }

    //One item disabled
    const labelSingleItemDisabled =
      "Item Disabled (only the first accordion for this example)";
    const defaultValueSingleItemDisabled = false;

    const valueSingleItemDisabled = boolean(
      labelSingleItemDisabled,
      defaultValueSingleItemDisabled
    );

    //All items disabled
    const labelAllDisabled =
      "All items disabled (by setting 'disabled' on the accordion-container component)";
    const defaultValueAllDisabled = false;

    const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

    function allDisabled() {
      if (valueAllDisabled) {
        return "disabled";
      }
    }

    function singleDisabled() {
      if (valueSingleItemDisabled) {
        return "disabled";
      }
    }

    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
  <gxg-accordion ${fullWidth()} ${allDisabled()} ${singleItemOpen()} mode="slim">
    <gxg-accordion-item  ${initialState()} item-title="${valueTitle}" item-id="tab 1" ${singleDisabled()}>${valueContent}</gxg-accordion-item>
    <gxg-accordion-item item-title="J.K. Rowling" item-id="tab 2">“If you want to know what a man's like, take a good look at how he
    treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
    the Goblet of Fire</gxg-accordion-item> 
    <gxg-accordion-item item-title="Maya Angelou" item-id="tab 3">“I've learned that people will forget what you said, people will forget
    what you did, but people will never forget how you made them feel.” ―
    Maya Angelou</gxg-accordion-item>
  </gxg-accordion>`;
  })
  .add("Boxed", () => {
    //Title
    const labelTitle = "Title";
    const defaultValueTitle = "Dr. Seuss";
    const valueTitle = text(labelTitle, defaultValueTitle);

    //Content
    const labelValueContent = "First accordion content";
    const defaultValueContent =
      "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”― Dr. Seuss";
    const valueContent = text(labelValueContent, defaultValueContent);

    //Full width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;

    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);
    function fullWidth() {
      if (valueFullWidth === true) {
        return "full-width";
      }
    }

    //Initial State
    const labelInitialState =
      "Item opened by default (only for the first accordion in this example)";
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

    //Single Item Open
    const labelSingleItemOpen =
      "Single Item Open (only one accordion at a time can be open at the same time)";
    const defaultValueSingleItemOpen = false;

    const valueSingleItemOpen = boolean(
      labelSingleItemOpen,
      defaultValueSingleItemOpen
    );

    function singleItemOpen() {
      if (valueSingleItemOpen) {
        return "single-item-open";
      } else {
        return "";
      }
    }

    //One item disabled
    const labelSingleItemDisabled =
      "Item Disabled (only the first accordion for this example)";
    const defaultValueSingleItemDisabled = false;

    const valueSingleItemDisabled = boolean(
      labelSingleItemDisabled,
      defaultValueSingleItemDisabled
    );

    //All items disabled
    const labelAllDisabled =
      "All items disabled (by setting 'disabled' on the accordion-container component)";
    const defaultValueAllDisabled = false;

    const valueAllDisabled = boolean(labelAllDisabled, defaultValueAllDisabled);

    function allDisabled() {
      if (valueAllDisabled) {
        return "disabled";
      }
    }

    function singleDisabled() {
      if (valueSingleItemDisabled) {
        return "disabled";
      }
    }

    return `<style>#root {width: 700px; display:flex; justify-content: center;}</style>
    <gxg-accordion ${fullWidth()} ${allDisabled()} ${singleItemOpen()} mode="boxed">
      <gxg-accordion-item ${initialState()} item-title="${valueTitle}" item-id="tab 1" ${singleDisabled()}>${valueContent}</gxg-accordion-item>
      <gxg-accordion-item item-title="J.K. Rowling" item-id="tab 2">“If you want to know what a man's like, take a good look at how he
      treats his inferiors, not his equals.” ― J.K. Rowling, Harry Potter and
      the Goblet of Fire</gxg-accordion-item> 
      <gxg-accordion-item item-title="Maya Angelou" item-id="tab 3">“I've learned that people will forget what you said, people will forget
      what you did, but people will never forget how you made them feel.” ―
      Maya Angelou</gxg-accordion-item>
    </gxg-accordion>`;
  });
