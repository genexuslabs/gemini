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

const stories = storiesOf("Interaction/Loader", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Loader", () => {
  //Loader text
  const labelLoaderText = "Loader text (optional)";
  const defaultValueLoaderText = "Loading application";
  const valueLoaderText = text(labelLoaderText, defaultValueLoaderText);

  return `
  <gxg-loader text="${valueLoaderText}" id="loader"></gxg-loader>
  
  <div style="display: flex; align-items: center; flex-direction: column;">
  
<gxg-button style="margin-top:30px" onClick="(function(){
  const modal = document.getElementById('loader');
  modal.setAttribute('show',true);
  setTimeout(function(){  modal.setAttribute('show', false); }, 3000);
  return false;
})();return false;">Show Loader</gxg-button>
</div> 
`;
});
