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

const stories = storiesOf("Tree", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Tree", () => {
  return `
  <gxg-tree id="main-tree" onClick="(function(){
    let itemClickedHandler = function(e){
      console.log(e);
    }
    this.removeEventListener('itemClicked', itemClickedHandler);
    this.addEventListener('itemClicked', itemClickedHandler);
    return false;
})();">>
      <gxg-tree-item>
        Fruits
        <gxg-tree slot="tree">
          <gxg-tree-item>
            apple
          </gxg-tree-item>
          <gxg-tree-item>
            banana
            <gxg-tree slot="tree">
              <gxg-tree-item>
                cavendish banana
              </gxg-tree-item>
              <gxg-tree-item>
                pisang raja
              </gxg-tree-item>
              <gxg-tree-item>
                red banana
              </gxg-tree-item>
            </gxg-tree>
          </gxg-tree-item>
        </gxg-tree>
      </gxg-tree-item>
      <gxg-tree-item>
        Vegetables
        <gxg-tree slot="tree">
          <gxg-tree-item>
            potatoes
          </gxg-tree-item>
          <gxg-tree-item>
            sweat potatoes
          </gxg-tree-item>
          <gxg-tree-item>
            lettuce
          </gxg-tree-item>
        </gxg-tree>
      </gxg-tree-item>
      <gxg-tree-item>
        Seasonings
        <gxg-tree slot="tree">
          <gxg-tree-item>
            salt
          </gxg-tree-item>
          <gxg-tree-item>
            pepper
          </gxg-tree-item>
          <gxg-tree-item>
            comino
          </gxg-tree-item>
          <gxg-tree-item>
            parsley
          </gxg-tree-item>
          <gxg-tree-item>
            basil
          </gxg-tree-item>
        </gxg-tree>
      </gxg-tree-item>
    </gxg-tree>
   `;
});
