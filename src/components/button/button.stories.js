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
KNOBS
*************/

/*Icons Knob*/
const labelIcon = "Icon";
const optionsIcon = {
  add: "navigation/arrow-down",
  chevronDown: "general/chevronDown",
  chevronLeft: "general/chevronLeft",
  chevronRight: "general/chevronRight",
  chevronUp: "general/chevronUp",
  chevronDown: "general/chevronDown",
  chevronClose: "general/chevronClose",
  chevronColorPicker: "general/chevronColorPicker",
  deleted: "general/deleted",
  down: "general/down",
  drag: "general/drag",
  duplicate: "general/duplicate",
  edit: "general/edit",
  editWand: "general/editWand",
  error: "general/error",
  levelUp: "general/levelUp",
  moreInfo: "general/moreInfo",
  search: "general/search",
  settings: "general/settings",
  showMore: "general/showMore",
  success: "general/success",
  up: "general/up",
  warning: "general/warning",
};
const defaultValueIcon = optionsIcon.add;

/*Disabled Knob*/
const labelDisabled = "Disabled";
const valueDisabled = false;

/*Full Width*/
const labelFullWidth = "Full Width";
const defaultValueFullWidth = false;
const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

/*************
STORIES
*************/
const stories = storiesOf("Controls/Button", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Primary Text Only", () => {
    //Button Label
    const labelButtonLabel = "Button Label";
    const defaultValueButtonLabel = "Button";
    const valueButtonLabel = text(labelButtonLabel, defaultValueButtonLabel);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    //Full Width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    return `
        <style>#root { width:700px; text-align: center; }</style>
        <gxg-button type="primary-text-only" full-width=${boolean(
          labelFullWidth,
          valueFullWidth
        )} disabled=${valueDisabled}>${valueButtonLabel}</gxg-button>`;
  })
  .add("Primary Text Icon", () => {
    //Button Label
    const labelButtonLabel = "Button Label";
    const defaultValueButtonLabel = "Button";
    const valueButtonLabel = text(labelButtonLabel, defaultValueButtonLabel);

    //Button Icon
    const labelButtonIcon = "Button Icon";
    const defaultValueButtonIcon = "navigation/arrow-down";
    const valueButtonIcon = text(labelButtonIcon, defaultValueButtonIcon);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    //Full Width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    return `
    <style>#root { width:700px; text-align: center; }</style>
    <gxg-button icon="${valueButtonIcon}" type="primary-text-icon" full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )} disabled=${valueDisabled}>
    ${valueButtonLabel}
    </gxg-button>`;
  })
  .add("Primary Icon Only", () => {
    //Button Icon
    const labelButtonIcon = "Button Icon";
    const defaultValueButtonIcon = "navigation/arrow-down";
    const valueButtonIcon = text(labelButtonIcon, defaultValueButtonIcon);
    return `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button icon="${valueButtonIcon}" type="primary-icon-only" disabled=${boolean(
      labelDisabled,
      valueDisabled
    )} full-width=${boolean(labelFullWidth, valueFullWidth)}></gxg-button>
        `;
  })
  .add("Secondary Text Only", () => {
    //Button Label
    const labelButtonLabel = "Button Label";
    const defaultValueButtonLabel = "Button";
    const valueButtonLabel = text(labelButtonLabel, defaultValueButtonLabel);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    //Full Width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    return `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="secondary-text-only" full-width=${valueFullWidth} disabled=${valueDisabled}>${valueButtonLabel}</gxg-button>
        `;
  })
  .add("Secondary Text Icon", () => {
    //Button Label
    const labelButtonLabel = "Button Label";
    const defaultValueButtonLabel = "Button";
    const valueButtonLabel = text(labelButtonLabel, defaultValueButtonLabel);

    //Button Icon
    const labelButtonIcon = "Button Icon";
    const defaultValueButtonIcon = "navigation/arrow-down";
    const valueButtonIcon = text(labelButtonIcon, defaultValueButtonIcon);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    //Full Width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    return `
    <style>#root { width:700px; text-align: center; }</style>
    <gxg-button icon="${valueButtonIcon}" type="secondary-text-icon" full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )} disabled=${valueDisabled}>
    ${valueButtonLabel}
    </gxg-button>`;
  })
  .add("Secondary Icon Only", () => {
    //Button Icon
    const labelButtonIcon = "Button Icon";
    const defaultValueButtonIcon = "navigation/arrow-down";
    const valueButtonIcon = text(labelButtonIcon, defaultValueButtonIcon);
    return `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button icon="${valueButtonIcon}" type="secondary-icon-only" disabled=${boolean(
      labelDisabled,
      valueDisabled
    )} full-width=${boolean(labelFullWidth, valueFullWidth)}></gxg-button>
        `;
  })
  .add("Tertiary", () => {
    //Button Icon
    const labelButtonIcon = "Button Icon";
    const defaultValueButtonIcon = "navigation/arrow-down";
    const valueButtonIcon = text(labelButtonIcon, defaultValueButtonIcon);
    return `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button icon="${valueButtonIcon}" type="tertiary" disabled=${boolean(
      labelDisabled,
      valueDisabled
    )} full-width=${boolean(labelFullWidth, valueFullWidth)}></gxg-button>
        `;
  })
  .add("Outlined", () => {
    //Button Label
    const labelButtonLabel = "Button Label";
    const defaultValueButtonLabel = "Button";
    const valueButtonLabel = text(labelButtonLabel, defaultValueButtonLabel);

    //Disabled
    const labelDisabled = "Disabled";
    const defaultValueDisabled = false;
    const valueDisabled = boolean(labelDisabled, defaultValueDisabled);

    //Full Width
    const labelFullWidth = "Full Width";
    const defaultValueFullWidth = false;
    const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

    return `
    <style>#root { width:700px; text-align: center; }</style>
    <gxg-button type="outlined" full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )} disabled=${valueDisabled}>${valueButtonLabel}</gxg-button>`;
  });
