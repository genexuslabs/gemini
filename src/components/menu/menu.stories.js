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

const stories = storiesOf("Menu", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Menu", () => {
  //Title
  const labelValueTitle = "Title (optional)";
  const defaultValueTitle = "Fruits";
  const valueTitle = text(labelValueTitle, defaultValueTitle);

  //Width
  const labelValueWidth = "Width";
  const defaultValueWidth = "300px";
  const valueWidth = text(labelValueWidth, defaultValueWidth);

  //Fullwidth
  const labelFullWidth = "Full Width";
  const defaultValueFullWidth = false;
  const valueFullWidth = boolean(labelFullWidth, defaultValueFullWidth);

  //Tabs
  const labelTabs = "Menu for Tabs";
  const defaultValueTabs = false;
  const valueTabs = boolean(labelTabs, defaultValueTabs);

  function widthFunc() {
    if (valueFullWidth) {
      return "600px";
    } else {
      return valueWidth;
    }
  }

  function tabsFunc() {
    if (valueTabs) {
      return "tabs";
    }
  }

  return `
  <gxg-menu title=${valueTitle} width=${widthFunc()} ${tabsFunc()} >
    <gxg-menu-item label="apple" icon=""></gxg-menu-item>
    <gxg-menu-item label="banana" icon="warning"></gxg-menu-item>
    <gxg-menu-item label="grapes" icon="error"></gxg-menu-item>
    <gxg-menu-item label="kiwi" icon="search"></gxg-menu-item>
  </gxg-menu>`;
});
