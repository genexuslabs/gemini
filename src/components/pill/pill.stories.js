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
      add: "add",
      addCircle: "addCircle",
      arrowDown: "arrowDown",
      arrowLeft: "arrowLeft",
      circle: "circle",
      chevronDown: "chevronDown",
      chevronLeft: "chevronLeft",
      chevronRight: "chevronRight",
      chevronUp: "chevronUp",
      chevronDown: "chevronDown",
      chevronClose: "chevronClose",
      chevronColorPicker: "chevronColorPicker",
      deleted: "deleted",
      down: "down",
      drag: "drag",
      duplicate: "duplicate",
      edit: "edit",
      editWand: "editWand",
      error: "error",
      levelUp: "levelUp",
      moreInfo: "moreInfo",
      search: "search",
      settings: "settings",
      showMore: "showMore",
      success: "success",
      up: "up",
      warning: "warning"
    };
    const defaultValueIcon = optionsIcon.circle;

    //Pill Label
    const labelPillLabel = "Label";
    const defaultValuePillLabel = "Pill Label";
    const valuePillLabel = text(labelPillLabel, defaultValuePillLabel);

    //Remove Button
    const labelRemoveButton = "Remove Button";
    const defaultValueRemoveButton = false;
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
        <gxg-pill tabindex="0" label="Salt" icon="circle" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Pepper" icon="circle" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Garlic" icon="circle" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Basil" icon="circle" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Rosemary" icon="circle" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Comino" icon="circle" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Turmeric" icon="circle" remove-button></gxg-pill>
        <gxg-pill tabindex="0" label="Chili Pepper" icon="circle" remove-button></gxg-pill>
      </div>
      <script>
        alert("hola");
      </script>
      `,
    {
      notes: {
        markdown: readme
      }
    }
  );
