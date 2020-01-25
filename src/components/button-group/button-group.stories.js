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
const label = "Title Alignment";
const options = {
  Left: "left",
  Center: "center",
  Right: "right"
};
const defaultValue = "left";

/*************
STORIES
*************/
const stories = storiesOf("Button Group", module);
stories.addDecorator(withKnobs);
stories
  .add(
    "Two buttons",
    () => `
    <gxg-button-group buttonGroupTitle="${text(
      "Maint Title",
      "The Title"
    )}" title-alignment="${select(label, options, defaultValue)}">
        <button id="${text("First Button Id", "id1")}" value="${text(
      "First Button Value",
      "Primero"
    )}">${text("First Button Label", "Left")}</button>
        <button id="${text("Second Button Id", "id2")}" value="${text(
      "Second Button Value",
      "Segundo"
    )}">${text("Second Button Label", "Right")}</button>
    </gxg-button-group>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Three buttons",
    () => `
    <gxg-button-group buttonGroupTitle="${text(
      "Main Title",
      "The Title"
    )}" title-alignment="${select(
      label,
      options,
      defaultValue
    )}" selected-button-id="${text("Initial Selected Button Id", "id1")}">
        <button id="${text("First Button Id", "id1")}" value="${text(
      "First Button Value",
      "Primero"
    )}">${text("First Button Label", "Left")}</button>
        <button id="${text("Second Button Id", "id2")}" value="${text(
      "Second Button Value",
      "Segundo"
    )}">${text("Second Button Label", "Middle")}</button>
        <button id="${text("Third Button Id", "id3")}" value="${text(
      "Third Button Value",
      "Tercero"
    )}">${text("Third Button Label", "Right")}</button>
    </gxg-button-group>
        `,
    {
      notes: {
        markdown: readme
      }
    }
  );
