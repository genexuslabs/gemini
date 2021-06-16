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
  <gxg-listbox id="list-box" the-title="the title">
  <gxg-listbox-item>Common</gxg-listbox-item>
  <gxg-listbox-item icon="objects/business-process-diagram">BPM</gxg-listbox-item>
  <gxg-listbox-item icon="objects/conversational-flows">Chatbots</gxg-listbox-item>
  <gxg-listbox-item icon="objects/data-provider">Data Management</gxg-listbox-item>
  <gxg-listbox-item icon="objects/bg-color">Resources</gxg-listbox-item>
  <gxg-listbox-item value="otro value" icon="objects/webpanel">User interface</gxg-listbox-item>
  <gxg-listbox-item icon="objects/dashboard">Dashboard</gxg-listbox-item>
  <gxg-listbox-item icon="objects/deployment-unit">Deployment Unit</gxg-listbox-item>
  <gxg-listbox-item icon="objects/dso">DSO</gxg-listbox-item>
  <gxg-listbox-item icon="objects/structured-data-type">Structured Data Type</gxg-listbox-item>
  <gxg-listbox-item icon="objects/url-rewrite">URL Rewrite</gxg-listbox-item>
  <gxg-listbox-item icon="objects/stencil">Stencil</gxg-listbox-item>
</gxg-listbox>
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
    <gxg-listbox id="list-box" the-title="the title" checkboxes>
    <gxg-listbox-item>Common</gxg-listbox-item>
    <gxg-listbox-item icon="objects/business-process-diagram">BPM</gxg-listbox-item>
    <gxg-listbox-item icon="objects/conversational-flows">Chatbots</gxg-listbox-item>
    <gxg-listbox-item icon="objects/data-provider">Data Management</gxg-listbox-item>
    <gxg-listbox-item icon="objects/bg-color">Resources</gxg-listbox-item>
    <gxg-listbox-item value="otro value" icon="objects/webpanel">User interface</gxg-listbox-item>
    <gxg-listbox-item icon="objects/dashboard">Dashboard</gxg-listbox-item>
    <gxg-listbox-item icon="objects/deployment-unit">Deployment Unit</gxg-listbox-item>
    <gxg-listbox-item icon="objects/dso">DSO</gxg-listbox-item>
    <gxg-listbox-item icon="objects/structured-data-type">Structured Data Type</gxg-listbox-item>
    <gxg-listbox-item icon="objects/url-rewrite">URL Rewrite</gxg-listbox-item>
    <gxg-listbox-item icon="objects/stencil">Stencil</gxg-listbox-item>
  </gxg-listbox>
`;
  });
