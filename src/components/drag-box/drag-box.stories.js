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

const stories = storiesOf("Interaction/Drag", module);
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

  //Deletable
  const labelDeletable = "Deletable";
  const defaultValueDeletable = false;
  const valueDeletable = boolean(labelDeletable, defaultValueDeletable);

  function blueBorder() {
    if (valueBlueBorder) {
      return "border";
    }
  }

  function deletableFunc() {
    if (valueDeletable) {
      return "deletable";
    }
  }

  return `
  <style>
    #root{
      width:700px;
      text-align:center
    }
    
  </style>
  <gxg-drag-container ${deletableFunc()}>
  <gxg-drag-box id="01" title="Title container 01" ${blueBorder()} padding="${select(
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
  <gxg-drag-box id="02" title="Title container 02" ${blueBorder()} padding="${select(
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
  <gxg-drag-box id="03" title="Title container 03" ${blueBorder()} padding="${select(
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
  <gxg-drag-box id="04" title="Title container 04" ${blueBorder()} padding="${select(
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
  <gxg-drag-box id="05" title="Title container 05" ${blueBorder()} padding="${select(
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
