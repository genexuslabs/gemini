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
  .add("Pill Static", () => {
    /*Pill Icon*/
    const labelIcon = "Icon";
    const optionsIcon = {
      "general/pill-filled": "general/pill-filled",
      "general/pill-outlined": "general/pill-outlined"
    };
    const defaultValueIcon = optionsIcon["general/pill-filled"];

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    return `<gxg-pill type="static" tabindex="0" icon="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}">${valuePillSlot}</gxg-pill>`;
  })
  .add("Pill Static With Action", () => {
    /*Pill Icon*/
    const labelIcon = "Icon";
    const optionsIcon = {
      "general/pill-filled": "general/pill-filled",
      "general/pill-outlined": "general/pill-outlined"
    };
    const defaultValueIcon = optionsIcon["general/pill-filled"];

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    return `<gxg-pill type="static" tabindex="0" icon="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}">${valuePillSlot}</gxg-pill>`;
  })
  .add("Pill Button", () => {
    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    /*Pill Icon*/
    const labelIcon = "Icon";
    const optionsIcon = {
      "general/pill-filled": "general/pill-filled",
      "general/pill-outlined": "general/pill-outlined"
    };
    const defaultValueIcon = optionsIcon["general/pill-filled"];

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    function disabledPill() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    return `<gxg-pill type="button" tabindex="0" ${disabledPill()} icon="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}">${valuePillSlot}</gxg-pill>`;
  })
  .add("Pill Button With Action", () => {
    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    /*Pill Icon*/
    const labelIcon = "Icon";
    const optionsIcon = {
      "general/pill-filled": "general/pill-filled",
      "general/pill-outlined": "general/pill-outlined"
    };
    const defaultValueIcon = optionsIcon["general/pill-filled"];

    //Pill Label
    const labelPillSlot = "Slot";
    const defaultValuePillSlot = "Pill Label";
    const valuePillSlot = text(labelPillSlot, defaultValuePillSlot);

    function disabledPill() {
      if (valueDisabled) {
        return "disabled";
      }
    }

    return `<gxg-pill type="button-with-action" tabindex="0" ${disabledPill()} icon="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}">${valuePillSlot}</gxg-pill>`;
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
        markdown: readme
      }
    }
  );
