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
KNOBS
*************/

/*Icons Knob*/
const labelIcon = "Icon";
const optionsIcon = {
  add: "arrowDown",
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
stories.addParameters({ notes: readme });
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
    <gxg-button type="primary-text-icon" full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )} disabled=${valueDisabled}><gxg-icon slot="icon" type="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}"></gxg-icon>
    ${valueButtonLabel}
    </gxg-button>`;
  })
  .add(
    "Primary Icon Only",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="primary-icon-only" disabled=${boolean(
        labelDisabled,
        valueDisabled
      )} full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )}><gxg-icon slot="icon" type="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}"></gxg-icon
            ></gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
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
    <gxg-button type="secondary-text-icon" full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )} disabled=${valueDisabled}><gxg-icon slot="icon" type="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}"></gxg-icon>
    ${valueButtonLabel}
    </gxg-button>`;
  })
  .add(
    "Secondary Icon Only",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="secondary-icon-only" disabled=${boolean(
        labelDisabled,
        valueDisabled
      )} full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )}><gxg-icon slot="icon" type="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}"></gxg-icon
            ></gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Tertiary",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="tertiary" disabled=${boolean(
        labelDisabled,
        valueDisabled
      )} full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )}><gxg-icon slot="icon" type="${select(
      labelIcon,
      optionsIcon,
      defaultValueIcon
    )}"></gxg-icon
            ></gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
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
    <gxg-button type="tertiary" full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )} disabled=${valueDisabled}>${valueButtonLabel}</gxg-button>`;
  });
