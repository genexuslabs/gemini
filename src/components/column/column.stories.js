import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

/*************
STORIES
*************/
const stories = storiesOf("Columns", module);
stories.addDecorator(withKnobs);
stories
  .add(
    "Spacing",
    () => `<style>
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
        none: "none",
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
</gxg-columns></gxg-stack><div style="text-align:center"><p style="margin-bottom:5px;" class="note">Note: <em>gxg-column</em> component does not has any inherent background-color or border-color styles.<br>The ones applied on this example are only for the purpose of helping understanding how the columns system works.</p><a style="display:inline-block; margin-bottom:20px;" class="gxg-link" href="https://codepen.io/brsastregx/pen/BaoXBpX?editors=1000" target="_blank">Open in Playground</a>`,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Vertical Alignment",
    () => `<style>
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
.higher-padding {
  padding:50px 10px;
}
</style>
<gxg-stack space="s">

<gxg-columns space="s" align-y="${select(
      "Align Y:",
      {
        top: "top",
        center: "center",
        bottom: "bottom"
      },
      "top"
    )}">
<gxg-column width="1/2">
1/2
</gxg-column>
<gxg-column width="fluid" class="higher-padding">
Fluid
</gxg-column>
</gxg-columns>`,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Types of Widths",
    () => `<style>
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
        "4/5": "4/5"
      },
      "1/2"
    )}">
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
        "4/5": "4/5"
      },
      "1/2"
    )}
</gxg-column>
<gxg-column width="fluid">
Fluid
</gxg-column>
<gxg-column width="content">
${text("Content", "Content")}
</gxg-column>
</gxg-columns>`,
    {
      notes: {
        markdown: readme
      }
    }
  )
  .add(
    "Collapse Bellow",
    () => `<style>
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
</style>
<gxg-stack space="s">

<gxg-columns space="s" collapse-bellow="${select(
      "Collapse Bellow:",
      {
        "none (default)": "none",
        lg: "lg"
      },
      "none"
    )}">
<gxg-column width="1/4">
    1/4
</gxg-column>
<gxg-column width="fluid">
    fluid
</gxg-column>
<gxg-column width="content">
Content
</gxg-column>
<gxg-column width="1/4">
    1/4
</gxg-column>
</gxg-columns>`,
    {
      notes: {
        markdown: readme
      }
    }
  );
