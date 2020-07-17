import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios
} from "@storybook/addon-knobs";

const stories = storiesOf("Drag", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Drag-boxes", () => {
  return `
  <style>
    #root{
      width:200px;
      text-align:center
    }
    
  </style>
  <gxg-drag-container>
  <gxg-drag-box>Container 01</gxg-drag-box>
  <gxg-drag-box>Container 02</gxg-drag-box>
  <gxg-drag-box>Container 03</gxg-drag-box>
  <gxg-drag-box>Container 04</gxg-drag-box>
  <gxg-drag-box>Container 05</gxg-drag-box>
  <p>Drag me!</p>
</gxg-drag-container>`;
});
