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

const stories = storiesOf("Columns", module);
stories.addDecorator(withKnobs);
stories.add("Columns", () => {
  return `
  
  <style>
    #root {
      width: 700px;
    }
    gxg-column {
      background-color: #ececec59;
      padding:10px 10px;
      align-items: center;
      justify-content: center;
      display:flex;
      color: #6f6d6d;
      border: 1px solid #b7b5b5;
      border-radius: 2px;
    }
    gxg-column, .note {
      font-family: "Open Sans", sans-serif;
      font-size: 11px;
    }
    .note {
      color: #aaa;
      line-height: 1.6em;
      margin:15px 0 15px 0;
    }
  </style>
  <gxg-stack space="${select(
    "Stack Space",
    {
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl"
    },
    "s"
  )}">
  <gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="content">
    Content
  </gxg-column>
  <gxg-column width="fluid">
    Content
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="1/2">
    1/2
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="1/3">
    1/3
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="2/3">
    2/3
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="1/4">
    1/4
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="3/4">
    3/4
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="1/5">
    1/5
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="2/5">
    2/5
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="3/5">
    3/5
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns>
<gxg-columns space="${select(
    "Column Space",
    {
      xs: "xs",
      s: "s",
      m: "m"
    },
    "s"
  )}">
  <gxg-column width="4/5">
    4/5
  </gxg-column>
  <gxg-column width="fluid">
    Fluid
  </gxg-column>
</gxg-columns></gxg-stack><div style="text-align:center"><p class="note">Note: <em>gxg-column</em> component does not has inherent background-color or border color styles.<br>The ones applied on this example are only for the purpose of better understanding the columns system.</p><gxg-button onClick="(function(){
  var win = window.open('https://codepen.io/brsastregx/pen/BaoXBpX?editors=1000', '_blank');
  win.focus();
  return false;
})();return false;" type="primary-text-icon"
>Open in Playground<gxg-icon
  slot="icon"
  type="edit"
></gxg-icon></gxg-button>
  `;
});
