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

const stories = storiesOf("Controls/List box", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("List box", () => {
    return `
  <style>
    .note {
      font-family: var(--font-family-primary);
      text-align: center;
    }
  </style>
  <script>
      const listItems = [
          {
              value: "Common",
          },
          {
              icon: "objects/business-process-diagram",
              value: "BPM",
          },
          {
              icon: "objects/conversational-flows",
              value: "Chatbots",
          },
          {
              icon: "objects/data-provider",
              value: "Data Management",
          },
          {
              icon: "objects/bg-color",
              value: "Resources",
          },
          {
              icon: "objects/webpanel",
              value: "User interface",
          },
          {
              icon: "objects/dashboard",
              value: "Dashboard",
          },
          {
              icon: "objects/deployment-unit",
              value: "Deployment Unit",
          },
          {
            icon: "objects/dso",
            value: "DSO",
          },
          {
            icon: "objects/structured-data-type",
            value: "Structured Data Type",
          },
          {
            icon: "objects/url-rewrite",
            value: "URL Rewrite",
          },
          {
            icon: "objects/stencil",
            value: "Stencil",
          },
      ]
  </script>
  <gxg-listbox id="list-box" title="select a category"></gxg-listbox>
  <p class="note">(press crtl to select multiple items)</p>
  <script>
    let gxgListBox = document.getElementById("list-box");
    gxgListBox.items = listItems;
  </script>
`;
  })
  .add("List box with checkboxes", () => {
    return `
  <script>
      const listItems = [
          {
              value: "Common",
          },
          {
              icon: "objects/business-process-diagram",
              value: "BPM",
          },
          {
              icon: "objects/conversational-flows",
              value: "Chatbots",
          },
          {
              icon: "objects/data-provider",
              value: "Data Management",
          },
          {
              icon: "objects/bg-color",
              value: "Resources",
          },
          {
              icon: "objects/webpanel",
              value: "User interface",
          },
          {
              icon: "objects/dashboard",
              value: "Dashboard",
          },
          {
              icon: "objects/deployment-unit",
              value: "Deployment Unit",
          },
          {
            icon: "objects/dso",
            value: "DSO",
          },
          {
            icon: "objects/structured-data-type",
            value: "Structured Data Type",
          },
          {
            icon: "objects/url-rewrite",
            value: "URL Rewrite",
          },
          {
            icon: "objects/stencil",
            value: "Stencil",
          },
      ]
  </script>
  <gxg-listbox id="list-box" title="select a category" checkboxes></gxg-listbox>
  <script>
    let gxgListBox = document.getElementById("list-box");
    gxgListBox.items = listItems;
  </script>
`;
  });
