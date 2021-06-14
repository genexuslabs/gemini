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
  <gxg-combo>
    <gxg-combo-item>Common</gxg-combo-item>
    <gxg-combo-item icon="objects/business-process-diagram">BPM</gxg-combo-item>
    <gxg-combo-item icon="objects/conversational-flows">Chatbots</gxg-combo-item>
    <gxg-combo-item icon="objects/data-provider">Data Management</gxg-combo-item>
    <gxg-combo-item icon="objects/bg-color">Resources</gxg-combo-item>
    <gxg-combo-item icon="objects/webpanel">User interface</gxg-combo-item>
    <gxg-combo-item icon="objects/dashboard">Dashboard</gxg-combo-item>
    <gxg-combo-item icon="objects/deployment-unit">Deployment Unit</gxg-combo-item>
    <gxg-combo-item icon="objects/dso">DSO</gxg-combo-item>
    <gxg-combo-item icon="objects/structured-data-type">Structured Data Type</gxg-combo-item>
    <gxg-combo-item icon="objects/url-rewrite">URL Rewrite</gxg-combo-item>
    <gxg-combo-item icon="objects/stencil">Stencil</gxg-combo-item>
  </gxg-combo>
`;
});
