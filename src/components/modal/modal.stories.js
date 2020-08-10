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

const stories = storiesOf("Interaction/Modal", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Modal", () => {
  //Content
  const labelValueContent = "Content";
  const defaultValueContent =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, dolorum voluptatibus harum minima aut id architecto adipisci tempore numquam explicabo iure quae, laborum qui at? Qui nemo in facere voluptates.";
  const valueContent = text(labelValueContent, defaultValueContent);

  //Padding
  const labelPadding = "Padding";
  const optionsPadding = {
    xs: "xs",
    s: "s",
    m: "m",
    l: "l",
    xl: "xl",
    xxl: "xxl",
    xxxl: "xxxl"
  };
  const defaultValuePadding = "m";

  //Title
  const labelTitle = "Title";
  const defaultValueTitle = "Modal Title";
  const valueTitle = text(labelTitle, defaultValueTitle);

  //Width
  const labelWidth = "Width";
  const defaultValueWidth = "304px";
  const valueWidth = text(labelWidth, defaultValueWidth);

  return `
  <gxg-modal id="modal" padding="${select(
    labelPadding,
    optionsPadding,
    defaultValuePadding
  )}" modal-title="${valueTitle}" width=${valueWidth}>
    ${valueContent}
    <gxg-button slot="footer" type="secondary-text-only">Button</gxg-button>
    <gxg-spacer-one slot="footer" space="xs"></gxg-spacer-one>
    <gxg-button slot="footer" type="primary-text-only">Other Button</gxg-button>
  </gxg-modal>
  
  <div style="display: flex; align-items: center; flex-direction: column;">
  
<gxg-button style="margin-top:30px" onClick="(function(){
  const modal = document.getElementById('modal');
  modal.setAttribute('visible','true');
  return false;
})();return false;">Launch Modal</gxg-button>
</div>
  `;
});
