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
const stories = storiesOf("Other/Pill", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Pill Static", () => {
    //Pill Icon
    const labelPillIcon = "Icon";
    const defaultValuePillIcon = "objects/procedure";
    const valuePillIcon = text(labelPillIcon, defaultValuePillIcon);

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    function disabledPill() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    return `<gxg-pill type="static" tabindex="0" ${disabledPill()} icon="${valuePillIcon}">${valuePillSlot}</gxg-pill>`;
  })
  .add("Pill Static With Action", () => {
    //Pill Icon
    const labelPillIcon = "Icon";
    const defaultValuePillIcon = "objects/procedure";
    const valuePillIcon = text(labelPillIcon, defaultValuePillIcon);

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    function disabledPill() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    return `<gxg-pill type="static-with-action" tabindex="0" ${disabledPill()} icon="${valuePillIcon}">${valuePillSlot}</gxg-pill>`;
  })
  .add("Pill Button", () => {
    //Pill Icon
    const labelPillIcon = "Icon";
    const defaultValuePillIcon = "gx-server/lock-without-changes";
    const valuePillIcon = text(labelPillIcon, defaultValuePillIcon);

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    function disabledPill() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    return `<gxg-pill type="button" tabindex="0" ${disabledPill()} icon="${valuePillIcon}">${valuePillSlot}</gxg-pill>`;
  })
  .add("Pill Button With Action", () => {
    //Pill Icon
    const labelPillIcon = "Icon";
    const defaultValuePillIcon = "gx-server/changes-commit-pending";
    const valuePillIcon = text(labelPillIcon, defaultValuePillIcon);

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    function disabledPill() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    return `<gxg-pill type="button-with-action" tabindex="0" ${disabledPill()} icon="${valuePillIcon}">${valuePillSlot}</gxg-pill>`;
  })
  .add(
    "Pills Together",
    () =>
      `
      <style>
        #root{text-align: center}
        .container{width: 280px}
      </style> 
      <p>Remove the seasonings you don't want in your food:</p>
      <div class="container">
        <gxg-pill tabindex="0" type="button-with-action">Salt</gxg-pill>
        <gxg-pill tabindex="0" type="button-with-action">Pepper</gxg-pill>
        <gxg-pill tabindex="0" type="button-with-action">Garlic</gxg-pill>
        <gxg-pill tabindex="0" type="button-with-action">Basil</gxg-pill>
        <gxg-pill tabindex="0" type="button-with-action">Rosemary</gxg-pill>
        <gxg-pill tabindex="0" type="button-with-action">Comino</gxg-pill>
        <gxg-pill tabindex="0" type="button-with-action">Turmeric</gxg-pill>
        <gxg-pill tabindex="0" type="button-with-action">Chill Pepper</gxg-pill>
      </div>
      `,
    {
      notes: {
        markdown: readme,
      },
    }
  );
