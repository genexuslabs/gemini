import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from "@storybook/addon-knobs";

/*************
STORIES
*************/
const stories = storiesOf("Other/Filter", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Filter", () => {
  return `
    <gxg-button onClick="(function(){
      const modal = document.getElementById('modal');
      modal.setAttribute('visible','true');
      return false;
    })();return false;">Show Filter</gxg-button>`;
});
