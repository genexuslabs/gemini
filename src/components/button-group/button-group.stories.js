import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select
} from "@storybook/addon-knobs";

/*************
STORIES
*************/

const stories = storiesOf("Button Group", module);
stories.addDecorator(withKnobs);
stories
  .add("Two buttons", () => {
    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    //First button id
    const labelFirstButtonId = "First Button Id";
    const defaultValueFirstButtonId = "salt";
    const valueFirstButtonId = text(
      labelFirstButtonId,
      defaultValueFirstButtonId
    );

    //First button label
    const labelFirstButtonLabel = "First Button Label";
    const defaultValueFirstButtonLabel = "Salt";
    const valueFirstButtonLabel = text(
      labelFirstButtonLabel,
      defaultValueFirstButtonLabel
    );

    //First button value
    const labelFirstButtonValue = "First Button Value";
    const defaultValueFirstButtonValue = "salt";
    const valueFirstButtonValue = text(
      labelFirstButtonValue,
      defaultValueFirstButtonValue
    );

    /*Full Width*/
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    //Initial Selected Button Id
    const labelInitialSelectedButtonId = "Initial Selected Button Id";
    const defaultValueInitialSelectedButtonId = "salt";
    const valueInitialSelectedButtonId = text(
      labelInitialSelectedButtonId,
      defaultValueInitialSelectedButtonId
    );

    //Second button id
    const labelSecondButtonId = "Second Button Id";
    const defaultValueSecondButtonId = "pepper";
    const valueSecondButtonId = text(
      labelSecondButtonId,
      defaultValueSecondButtonId
    );

    //Second button label
    const labelSecondButtonLabel = "Second Button Label";
    const defaultValueSecondButtonLabel = "Pepper";
    const valueSecondButtonLabel = text(
      labelSecondButtonLabel,
      defaultValueSecondButtonLabel
    );

    //Second button value
    const labelSecondButtonValue = "Second Button Value";
    const defaultValueSecondButtonValue = "pepper";
    const valueSecondButtonValue = text(
      labelSecondButtonValue,
      defaultValueSecondButtonValue
    );

    //Main Title
    const labelMainTitle = "Main Title";
    const defaultValueMainTitle = "Seasoning";
    const valueMainTitle = text(labelMainTitle, defaultValueMainTitle);

    //Title Alignment
    const labelTitleAlignment = "Title Alignment";
    const optionsTitleAlignment = {
      left: "left",
      center: "center",
      right: "right"
    };
    const defaultValueTitleAlignment = "left";

    function valueDisabledFunc() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    function valueFullWidthFunc() {
      if (valueFullWidth) {
        return "full-width";
      }
    }

    return `
    <style>
      #root {
        width: 700px;
        text-align: center;
      }
    </style>
    <gxg-button-group ${valueFullWidthFunc()} ${valueDisabledFunc()} button-group-title="${valueMainTitle}" title-alignment="${select(
      labelTitleAlignment,
      optionsTitleAlignment,
      defaultValueTitleAlignment
    )}" default-selected-btn-id="${valueInitialSelectedButtonId}">
      
    <button id="${valueFirstButtonId}" value="${valueFirstButtonValue}">
      ${valueFirstButtonLabel}
    </button>
    
    <button id="${valueSecondButtonId}" value="${valueSecondButtonValue}">
      ${valueSecondButtonLabel}
    </button>

    </gxg-button-group>
`;
  })
  .add("Three buttons", () => {
    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    //First button id
    const labelFirstButtonId = "First Button Id";
    const defaultValueFirstButtonId = "salt";
    const valueFirstButtonId = text(
      labelFirstButtonId,
      defaultValueFirstButtonId
    );

    //First button label
    const labelFirstButtonLabel = "First Button Label";
    const defaultValueFirstButtonLabel = "Salt";
    const valueFirstButtonLabel = text(
      labelFirstButtonLabel,
      defaultValueFirstButtonLabel
    );

    //First button value
    const labelFirstButtonValue = "First Button Value";
    const defaultValueFirstButtonValue = "salt";
    const valueFirstButtonValue = text(
      labelFirstButtonValue,
      defaultValueFirstButtonValue
    );

    /*Full Width*/
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    //Initial Selected Button Id
    const labelInitialSelectedButtonId = "Initial Selected Button Id";
    const defaultValueInitialSelectedButtonId = "salt";
    const valueInitialSelectedButtonId = text(
      labelInitialSelectedButtonId,
      defaultValueInitialSelectedButtonId
    );

    //Second button id
    const labelSecondButtonId = "Second Button Id";
    const defaultValueSecondButtonId = "pepper";
    const valueSecondButtonId = text(
      labelSecondButtonId,
      defaultValueSecondButtonId
    );

    //Second button label
    const labelSecondButtonLabel = "Second Button Label";
    const defaultValueSecondButtonLabel = "Pepper";
    const valueSecondButtonLabel = text(
      labelSecondButtonLabel,
      defaultValueSecondButtonLabel
    );

    //Second button value
    const labelSecondButtonValue = "Second Button Value";
    const defaultValueSecondButtonValue = "pepper";
    const valueSecondButtonValue = text(
      labelSecondButtonValue,
      defaultValueSecondButtonValue
    );

    //Main Title
    const labelMainTitle = "Main Title";
    const defaultValueMainTitle = "Seasoning";
    const valueMainTitle = text(labelMainTitle, defaultValueMainTitle);

    //Third button id
    const labelThirdButtonId = "Third Button Id";
    const defaultValueThirdButtonId = "garlic";
    const valueThirdButtonId = text(
      labelThirdButtonId,
      defaultValueThirdButtonId
    );

    //Third button label
    const labelThirdButtonLabel = "Third Button Label";
    const defaultValueThirdButtonLabel = "Garlic";
    const valueThirdButtonLabel = text(
      labelThirdButtonLabel,
      defaultValueThirdButtonLabel
    );

    //Third button value
    const labelThirdButtonValue = "Third Button Value";
    const defaultValueThirdButtonValue = "garlic";
    const valueThirdButtonValue = text(
      labelThirdButtonValue,
      defaultValueThirdButtonValue
    );

    //Title Alignment
    const labelTitleAlignment = "Title Alignment";
    const optionsTitleAlignment = {
      left: "left",
      center: "center",
      right: "right"
    };
    const defaultValueTitleAlignment = "left";

    function valueDisabledFunc() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    function valueFullWidthFunc() {
      if (valueFullWidth) {
        return "full-width";
      }
    }

    function valueDisabledFunc() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    function valueFullWidthFunc() {
      if (valueFullWidth) {
        return "full-width";
      }
    }

    return `
    <style>
      #root {
        width: 700px;
        text-align: center;
      }
    </style>
    <gxg-button-group ${valueFullWidthFunc()} ${valueDisabledFunc()} button-group-title="${valueMainTitle}" title-alignment="${select(
      labelTitleAlignment,
      optionsTitleAlignment,
      defaultValueTitleAlignment
    )}" default-selected-btn-id="${valueInitialSelectedButtonId}">
      
    <button id="${valueFirstButtonId}" value="${valueFirstButtonValue}">
      ${valueFirstButtonLabel}
    </button>
    
    <button id="${valueSecondButtonId}" value="${valueSecondButtonValue}">
      ${valueSecondButtonLabel}
    </button>

    <button id="${valueThirdButtonId}" value="${valueThirdButtonValue}">
      ${valueThirdButtonLabel}
    </button>

    </gxg-button-group>
`;
  });
