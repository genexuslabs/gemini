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
  <gxg-list-box id="list-box" the-title="the title">
  <gxg-list-box-item>Common</gxg-list-box-item>
  <gxg-list-box-item icon="objects/business-process-diagram">BPM</gxg-list-box-item>
  <gxg-list-box-item icon="objects/conversational-flows">Chatbots</gxg-list-box-item>
  <gxg-list-box-item icon="objects/data-provider">Data Management</gxg-list-box-item>
  <gxg-list-box-item icon="objects/bg-color">Resources</gxg-list-box-item>
  <gxg-list-box-item value="otro value" icon="objects/webpanel">User interface</gxg-list-box-item>
  <gxg-list-box-item icon="objects/dashboard">Dashboard</gxg-list-box-item>
  <gxg-list-box-item icon="objects/deployment-unit">Deployment Unit</gxg-list-box-item>
  <gxg-list-box-item icon="objects/dso">DSO</gxg-list-box-item>
  <gxg-list-box-item icon="objects/structured-data-type">Structured Data Type</gxg-list-box-item>
  <gxg-list-box-item icon="objects/url-rewrite">URL Rewrite</gxg-list-box-item>
  <gxg-list-box-item icon="objects/stencil">Stencil</gxg-list-box-item>
</gxg-list-box>
<p class="note">(press crtl/cmd to select multiple items)</p>
`;
  })
  .add("List box with checkboxes", () => {
    return `
    <style>
    .note {
      font-family: var(--font-family-primary);
      text-align: center;
    }
  </style>
    <gxg-list-box id="list-box" the-title="the title" checkboxes>
    <gxg-list-box-item>Common</gxg-list-box-item>
    <gxg-list-box-item icon="objects/business-process-diagram">BPM</gxg-list-box-item>
    <gxg-list-box-item icon="objects/conversational-flows">Chatbots</gxg-list-box-item>
    <gxg-list-box-item icon="objects/data-provider">Data Management</gxg-list-box-item>
    <gxg-list-box-item icon="objects/bg-color">Resources</gxg-list-box-item>
    <gxg-list-box-item value="otro value" icon="objects/webpanel">User interface</gxg-list-box-item>
    <gxg-list-box-item icon="objects/dashboard">Dashboard</gxg-list-box-item>
    <gxg-list-box-item icon="objects/deployment-unit">Deployment Unit</gxg-list-box-item>
    <gxg-list-box-item icon="objects/dso">DSO</gxg-list-box-item>
    <gxg-list-box-item icon="objects/structured-data-type">Structured Data Type</gxg-list-box-item>
    <gxg-list-box-item icon="objects/url-rewrite">URL Rewrite</gxg-list-box-item>
    <gxg-list-box-item icon="objects/stencil">Stencil</gxg-list-box-item>
  </gxg-list-box>
`;
  });
