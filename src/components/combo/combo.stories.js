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

const stories = storiesOf("Controls/Combo", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Combo", () => {
  return `
  <script>
      const comboItems = [
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
  <gxg-combo id="gxgCombo"></gxg-combo>
  <script>
    let gxgCombo = document.getElementById("gxgCombo");

    gxgCombo.items = comboItems;
  </script>
`;
});
