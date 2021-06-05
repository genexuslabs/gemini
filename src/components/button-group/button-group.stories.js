import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from "@storybook/addon-knobs";

/*************
STORIES
*************/

const stories = storiesOf("Controls/Button Group", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Two buttons", () => {
    //Main Title
    const labelMainTitle = "Main Title";
    const defaultValueMainTitle = "Seasoning";
    const valueMainTitle = text(labelMainTitle, defaultValueMainTitle);

    //Title Alignment
    const labelTitleAlignment = "Title Alignment";
    const optionsTitleAlignment = {
      left: "left",
      center: "center",
      right: "right",
    };
    const defaultValueTitleAlignment = "left";

    //First button label
    const labelFirstButtonLabel = "First Button Label";
    const defaultValueFirstButtonLabel = "Salt";
    const valueFirstButtonLabel = text(
      labelFirstButtonLabel,
      defaultValueFirstButtonLabel
    );

    //First button id
    const labelFirstButtonId = "First Button Id";
    const defaultValueFirstButtonId = "salt";
    const valueFirstButtonId = text(
      labelFirstButtonId,
      defaultValueFirstButtonId
    );

    //Second button label
    const labelSecondButtonLabel = "Second Button Label";
    const defaultValueSecondButtonLabel = "Pepper";
    const valueSecondButtonLabel = text(
      labelSecondButtonLabel,
      defaultValueSecondButtonLabel
    );

    //Second button id
    const labelSecondButtonId = "Second Button Id";
    const defaultValueSecondButtonId = "pepper";
    const valueSecondButtonId = text(
      labelSecondButtonId,
      defaultValueSecondButtonId
    );

    //Initial Selected Button Id
    const labelInitialSelectedButtonId = "Initial Selected Button Id";
    const defaultValueInitialSelectedButtonId = "salt";
    const valueInitialSelectedButtonId = text(
      labelInitialSelectedButtonId,
      defaultValueInitialSelectedButtonId
    );

    /*Full Width*/
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    /*Outlined*/
    const labelOutlined = "Outlined";
    const defaultValueOutlined = false;
    const valueOutlined = boolean(labelOutlined, defaultValueOutlined);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

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

    function valueOutlinedFunc() {
      if (valueOutlined) {
        return "outlined";
      }
    }

    return `
    <style>
      #root {
        width: 700px;
        text-align: center;
      }
    </style>
    <gxg-button-group title-alignment="left" button-group-title="Buttons title"  default-selected-btn-id="button1">
    <button id="button1">Button 1</button>
    <button id="button2">Button 2</button>
    <button id="button3">Button 3</button>
  </gxg-button-group>
`;
  })
  .add("Three buttons", () => {
    //Main Title
    const labelMainTitle = "Main Title";
    const defaultValueMainTitle = "Seasoning";
    const valueMainTitle = text(labelMainTitle, defaultValueMainTitle);

    //Title Alignment
    const labelTitleAlignment = "Title Alignment";
    const optionsTitleAlignment = {
      left: "left",
      center: "center",
      right: "right",
    };
    const defaultValueTitleAlignment = "left";

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

    //Initial Selected Button Id
    const labelInitialSelectedButtonId = "Initial Selected Button Id";
    const defaultValueInitialSelectedButtonId = "salt";
    const valueInitialSelectedButtonId = text(
      labelInitialSelectedButtonId,
      defaultValueInitialSelectedButtonId
    );

    /*Full Width*/
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    /*Outlined*/
    const labelOutlined = "Outlined";
    const defaultValueOutlined = false;
    const valueOutlined = boolean(labelOutlined, defaultValueOutlined);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

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

    function valueOutlinedFunc() {
      if (valueOutlined) {
        return "outlined";
      }
    }

    return `
    <style>
      #root {
        width: 700px;
        text-align: center;
      }
    </style>
    <gxg-button-group title-alignment="${select(
      labelTitleAlignment,
      optionsTitleAlignment,
      defaultValueTitleAlignment
    )}" ${valueFullWidthFunc()} ${valueDisabledFunc()} ${valueOutlinedFunc()} button-group-title="${valueMainTitle}"  default-selected-btn-id="${valueInitialSelectedButtonId}">
      
    <button id="${valueFirstButtonId}">
      ${valueFirstButtonLabel}
    </button>
    
    <button id="${valueSecondButtonId}">
      ${valueSecondButtonLabel}
    </button>

    <button id="${valueThirdButtonId}">
      ${valueThirdButtonLabel}
    </button>

    </gxg-button-group>
`;
  });
