import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

/*************
STORIES
*************/
const stories = storiesOf("Layout/Columns", module);
stories.addParameters({ layout: "centered" });
stories.addDecorator(withKnobs);
stories
  .add(
    "Spacing",
    () => `<style>
#root {
  width: 700px;
}
gxg-column {        
  align-items: center;
  justify-content: center;
  display:flex;
  color: #6f6d6d;
}
.dummy-container {
  box-sizing: border-box;
  background-color: #ececec59;
  padding-top:10px;
  padding-bottom:10px;
  border: 1px solid #b7b5b5;
  border-radius: 2px;
  width: 100%;
  text-align: center;
  justify-content: center;
}
gxg-column {
  font-family: "Open Sans", sans-serif;
  font-size: 11px;
}

</style>
<gxg-stack space="${select(
      "Stack Space",
      {
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-columns space="${select(
      "Column Space",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-column width="2/3">
<div class="dummy-container">
2/3
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns>
<gxg-columns space="${select(
      "Column Space",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-column width="1/4">
<div class="dummy-container">
1/4
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns>
<gxg-columns space="${select(
      "Column Space",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-column width="3/4">
<div class="dummy-container">
3/4
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns>
<gxg-columns space="${select(
      "Column Space",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-column width="1/5">
<div class="dummy-container">
1/5
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns>
<gxg-columns space="${select(
      "Column Space",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-column width="2/5">
<div class="dummy-container">
2/5
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns>
<gxg-columns space="${select(
      "Column Space",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-column width="3/5">
<div class="dummy-container">
3/5
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns>
<gxg-columns space="${select(
      "Column Space",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
      },
      "s"
    )}">
<gxg-column width="4/5">
<div class="dummy-container">
4/5
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns></gxg-stack><div style="text-align:center"><p style="margin-bottom:5px;">Note: <em>gxg-column</em> component does not has any inherent background-color or border-color styles.<br>The ones applied on this example are only for the purpose of helping understanding how the columns system works.</p><a style="display:inline-block; margin-bottom:20px;" class="gxg-link" href="https://codepen.io/brsastregx/pen/BaoXBpX?editors=1000" target="_blank">Open in Playground</a>`,
    {
      notes: {
        markdown: readme,
      },
    }
  )
  .add(
    "Vertical Alignment",
    () => `<style>
#root {
  width: 700px;
}
gxg-column {
  align-items: center;
  justify-content: center;
  display:flex;
  color: #6f6d6d;
}
.dummy-container {
  box-sizing: border-box;
  background-color: #ececec59;
  padding-top:10px;
  padding-bottom:10px;
  border: 1px solid #b7b5b5;
  border-radius: 2px;
  width: 100%;
  text-align: left;
  height:100%;
  padding: 10px;
  width: 100%;
  line-height:1.6em;

}
gxg-column, .note {
  font-family: "Open Sans", sans-serif;
  font-size: 11px;
}
.higher-padding {
  padding-top: 50px !important;
  padding-bottom: 50px !important;
}
</style>
<gxg-stack space="s"> 
<gxg-columns space="s" align-y="${select(
      "Align Y:",
      {
        top: "top",
        center: "center",
        bottom: "bottom",
      },
      "top"
    )}">
<gxg-column width="1/2">
<div class="dummy-container">
In all chaotic beauty lies a wounded work of art.<br>
Beautiful but torn, wreaking havoc on my heart.<br>
Camouflaged by insecurities, blinded by it all.<br>
I love the way you sit there and barely notice me at all.
</div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
</gxg-columns>`,
    {
      notes: {
        markdown: readme,
      },
    }
  )
  .add(
    "Types of Widths",
    () => `<style>
#root {
  width: 700px;
}
gxg-column {
  align-items: center;
  justify-content: center;
  display:flex;
  color: #6f6d6d;
}
.dummy-container {
  box-sizing: border-box;
  background-color: #ececec59;
  padding-top:10px;
  padding-bottom:10px;
  border: 1px solid #b7b5b5;
  border-radius: 2px;
  width: 100%;
  text-align: center;
  height:100%;
}
gxg-column, .note {
  font-family: "Open Sans", sans-serif;
  font-size: 11px;
}
</style>
<gxg-stack space="s">
<gxg-columns space="s">
<gxg-column width="${select(
      "Width:",
      {
        "1/2": "1/2",
        "1/3": "1/3",
        "1/4": "1/4",
        "1/5": "1/5",
        "2/3": "2/3",
        "2/5": "2/5",
        "3/5": "3/5",
        "4/5": "4/5",
      },
      "1/2"
    )}">
    <div class="dummy-container">
    ${select(
      "Width:",
      {
        "1/2": "1/2",
        "1/3": "1/3",
        "1/4": "1/4",
        "1/5": "1/5",
        "2/3": "2/3",
        "2/5": "2/5",
        "3/5": "3/5",
        "4/5": "4/5",
      },
      "1/2"
    )}
    </div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
Fluid
</div>
</gxg-column>
<gxg-column width="content">
<div class="dummy-container" style="padding-left:10px; padding-right:10px;">
${text("Content", "Content")}
</div>
</gxg-column>
</gxg-columns>`,
    {
      notes: {
        markdown: readme,
      },
    }
  )
  .add(
    "Collapse Bellow",
    () => `<style>
#root {
  width: 700px;
}
gxg-column {
  align-items: center;
  justify-content: center;
  display:flex;
  color: #6f6d6d;
}
.dummy-container {
  box-sizing: border-box;
  background-color: #ececec59;
  padding-top:10px;
  padding-bottom:10px;
  border: 1px solid #b7b5b5;
  border-radius: 2px;
  width: 100%;
  text-align: center;
  height:100%;
}
gxg-column, .note {
  font-family: "Open Sans", sans-serif;
  font-size: 11px;
}
</style>
<gxg-stack space="s">

<gxg-columns space="s" collapse-bellow="${select(
      "Collapse Bellow:",
      {
        "none (default)": "none",
        lg: "lg",
      },
      "none"
    )}">
<gxg-column width="1/4">
<div class="dummy-container">
    1/4
    </div>
</gxg-column>
<gxg-column width="fluid">
<div class="dummy-container">
    fluid
    </div>
</gxg-column>
<gxg-column width="content">
<div class="dummy-container" style="padding-left:10px; padding-right:10px;">
Content
</div>
</gxg-column>
<gxg-column width="1/4">
<div class="dummy-container">
    1/4
    </div>
</gxg-column>
</gxg-columns>`,
    {
      notes: {
        markdown: readme,
      },
    }
  );
