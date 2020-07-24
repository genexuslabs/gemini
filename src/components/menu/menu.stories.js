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

const stories = storiesOf("Navigation/Menu", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Menu", () => {
  //Tabs
  const labelTabs = "Menu for Tabs";
  const defaultValueTabs = false;
  const valueTabs = boolean(labelTabs, defaultValueTabs);

  //Title
  const labelValueTitle = "Title (optional)";
  const defaultValueTitle = "Fruits";
  const valueTitle = text(labelValueTitle, defaultValueTitle);

  function tabsFunc() {
    if (valueTabs) {
      return "tabs";
    }
  }

  return `
  <gxg-menu ${tabsFunc()} menu-title=${valueTitle}>
    <gxg-menu-item label="apple" icon=""></gxg-menu-item>
    <gxg-menu-item label="banana" icon="warning"></gxg-menu-item>
    <gxg-menu-item label="grapes" icon="error"></gxg-menu-item>
    <gxg-menu-item label="kiwi" icon="search"></gxg-menu-item>
  </gxg-menu>`;
});
