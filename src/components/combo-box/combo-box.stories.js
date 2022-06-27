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

const stories = storiesOf("Controls/Combo Box", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Combo Box", () => {
  return `
  <gxg-combo-box>
    <gxg-combo-box-item>Common</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/business-process-diagram">BPM</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/conversational-flows">Chatbots</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/data-provider">Data Management</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/bg-color">Resources</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/webpanel">User interface</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/dashboard">Dashboard</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/deployment-unit">Deployment Unit</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/dso">DSO</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/structured-data-type">Structured Data Type</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/url-rewrite">URL Rewrite</gxg-combo-box-item>
    <gxg-combo-box-item icon="objects/stencil">Stencil</gxg-combo-box-item>
  </gxg-combo-box>
`;
});
