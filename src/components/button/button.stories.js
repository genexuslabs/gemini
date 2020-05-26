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
const label = "Icon";
const options = {
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
const defaultValue = options.add;

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
const stories = storiesOf("Button", module);
stories.addDecorator(withKnobs);
stories
  .add(
    "Primary Text Only",
    () => `
        <style>#root { width:700px; text-align: center; }</style>
        <gxg-button type="primary-text-only" full-width=${boolean(
          labelFullWidth,
          valueFullWidth
        )} disabled=${boolean(labelDisabled, valueDisabled)}> ${text(
      "Button Label",
      "Button"
    )}</gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Primary Text Icon",
    () => `
    <style>#root { width:700px; text-align: center; }</style>    
    <gxg-button type="primary-text-icon" full-width=${boolean(
      labelFullWidth,
      valueFullWidth
    )} disabled=${boolean(
      labelDisabled,
      valueDisabled
    )}><gxg-icon slot="icon" type="${select(
      label,
      options,
      defaultValue
    )}"></gxg-icon
        >${text("Button Label", "Button")}</gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Primary Icon Only",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="primary-icon-only" full-width=${boolean(
        labelFullWidth,
        valueFullWidth
      )} disabled=${boolean(
      labelDisabled,
      valueDisabled
    )}><gxg-icon slot="icon" type="${select(
      label,
      options,
      defaultValue
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
    "Secondary Text Only",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="secondary-text-only" full-width=${boolean(
        labelFullWidth,
        valueFullWidth
      )} disabled=${boolean(labelDisabled, valueDisabled)}>${text(
      "Button Label",
      "Button"
    )}</gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Secondary Text Icon",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="secondary-text-icon" full-width=${boolean(
        labelFullWidth,
        valueFullWidth
      )} disabled=${boolean(
      labelDisabled,
      valueDisabled
    )}><gxg-icon slot="icon" type="${select(
      label,
      options,
      defaultValue
    )}"></gxg-icon
                >${text("Button Label", "Button")}</gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Secondary Icon Only",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="secondary-icon-only" full-width=${boolean(
        labelFullWidth,
        valueFullWidth
      )} disabled=${boolean(
      labelDisabled,
      valueDisabled
    )}><gxg-icon slot="icon" type="${select(
      label,
      options,
      defaultValue
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
      <gxg-button type="tertiary" full-width=${boolean(
        labelFullWidth,
        valueFullWidth
      )} disabled=${boolean(
      labelDisabled,
      valueDisabled
    )}><gxg-icon slot="icon" type="${select(
      label,
      options,
      defaultValue
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
    "Outlined",
    () => `
      <style>#root { width:700px; text-align: center; }</style>  
      <gxg-button type="outlined" full-width=${boolean(
        labelFullWidth,
        valueFullWidth
      )} disabled=${boolean(labelDisabled, valueDisabled)}>${text(
      "Button Label",
      "Button"
    )}</gxg-button>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  );
