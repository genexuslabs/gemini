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
const stories = storiesOf("Other/Pill", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories
  .add("Pill", () => {
    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    /*Pill Icon*/
    const labelIcon = "Icon";
    const optionsIcon = {
      "pill-filled": "pill-filled",
      "pill-outlined": "pill-outlined"
    };
    const defaultValueIcon = optionsIcon["pill-filled"];

    //Pill Label
    const labelPillLabel = "Label";
    const defaultValuePillLabel = "Pill Label";
    const valuePillLabel = text(labelPillLabel, defaultValuePillLabel);

    //Remove Button
    const labelRemoveButton = "Remove Button";
    const defaultValueRemoveButton = true;
    const valueRemoveButton = boolean(
      labelRemoveButton,
      defaultValueRemoveButton
    );

    function disabledPill() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    function removeButtonFunc() {
      if (valueRemoveButton) {
        return "remove-button";
      }
    }

    return `<gxg-pill tabindex="0" ${disabledPill()} icon="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}" label="${valuePillLabel}" ${removeButtonFunc()}></gxg-pill>`;
  })
  .add(
    "Pills Together",
    () =>
      `
      <style>
        #root{text-align: center}
        .container{width: 270px}
      </style> 
      <p>Remove the seasonings you don't want in your food:</p>
      <div class="container">
        <gxg-pill tabindex="0" label="Salt" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Pepper" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Garlic" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Basil" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Rosemary" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Comino" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Turmeric" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Chili Pepper" remove-button></gxg-pill>
      </div>
      `,
    {
      notes: {
        markdown: readme
      }
    }
  );
