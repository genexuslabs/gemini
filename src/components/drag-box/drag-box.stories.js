import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
  radios,
} from "@storybook/addon-knobs";

const stories = storiesOf("Interaction/Drag", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Drag-boxes", () => {
  //Deletable
  const labelDeletable = "Deletable (click a drag-box to see the trash icon)";
  const defaultValueDeletable = false;
  const valueDeletable = boolean(labelDeletable, defaultValueDeletable);

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
    #drag-container {
      margin: 0 auto;
    }
    
  </style>
  <gxg-drag-container id="drag-container" max-width=${text(
    "Width (default: 100%)",
    "100%"
  )} padding="${select(
    "Padding",
    {
      0: "0",
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
      xxl: "xxl",
      xxxl: "xxxl",
    },
    "s"
  )}" ${deletableFunc()} >
  <gxg-drag-box id="01" title="Title container 01">Content container 01</gxg-drag-box>
  <gxg-drag-box id="02" title="Title container 02">Content container 02</gxg-drag-box>
  <gxg-drag-box id="03" title="Title container 03">Content container 03</gxg-drag-box>
  <gxg-drag-box id="04" title="Title container 04">Content container 04</gxg-drag-box>
  <gxg-drag-box id="05" title="Title container 05">Content container 05</gxg-drag-box>
  <p>Drag me!</p>
</gxg-drag-container>`;
});
