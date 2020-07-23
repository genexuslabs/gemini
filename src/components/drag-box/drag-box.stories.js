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
  //Border
  const labelBlueBorder = "Blue Border";
  const defaultValueBlueBorder = false;
  const valueBlueBorder = boolean(labelBlueBorder, defaultValueBlueBorder);

  function blueBorder() {
    if (valueBlueBorder) {
      return "border";
    }
  }

  return `
  <style>
    #root{
      width:700px;
      text-align:center
    }
    
  </style>
  <gxg-drag-container>
  <gxg-drag-box ${blueBorder()} padding="${select(
    "Padding",
    {
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
      xxl: "xxl",
      xxxl: "xxxl"
    },
    "s"
  )}">Container 01</gxg-drag-box>
  <gxg-drag-box ${blueBorder()} padding="${select(
    "Padding",
    {
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
      xxl: "xxl",
      xxxl: "xxxl"
    },
    "s"
  )}">Container 02</gxg-drag-box>
  <gxg-drag-box ${blueBorder()} padding="${select(
    "Padding",
    {
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
      xxl: "xxl",
      xxxl: "xxxl"
    },
    "s"
  )}">Container 03</gxg-drag-box>
  <gxg-drag-box ${blueBorder()} padding="${select(
    "Padding",
    {
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
      xxl: "xxl",
      xxxl: "xxxl"
    },
    "s"
  )}">Container 04</gxg-drag-box>
  <gxg-drag-box ${blueBorder()} padding="${select(
    "Padding",
    {
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
      xxl: "xxl",
      xxxl: "xxxl"
    },
    "s"
  )}">Container 05</gxg-drag-box>
  <p>Drag me!</p>
</gxg-drag-container>`;
});
