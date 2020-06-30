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
  <gxg-tree>
    <gxg-tree-item>
      Fruits
      <gxg-tree>
        <gxg-tree-item>
          apple
        </gxg-tree-item>
        <gxg-tree-item>
          banana
        </gxg-tree-item>
        <gxg-tree-item>
          strawberry
        </gxg-tree-item>
        <gxg-tree-item>
          waterlemon
        </gxg-tree-item>
        <gxg-tree-item>
          grapes
        </gxg-tree-item>
        <gxg-tree-item>
          mango
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
    <gxg-tree-item>
      Vegetables
      <gxg-tree>
        <gxg-tree-item>
          potatoes
        </gxg-tree-item>
        <gxg-tree-item>
          sweat potatoes
        </gxg-tree-item>
        <gxg-tree-item>
          lettuce
        </gxg-tree-item>
        <gxg-tree-item>
          onion
        </gxg-tree-item>
        <gxg-tree-item>
          pumpkin
        </gxg-tree-item>
        <gxg-tree-item>
          eggplant
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
    <gxg-tree-item>
      Seasonings
      <gxg-tree>
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
    <gxg-tree-item>
      Desserts
      <gxg-tree>
        <gxg-tree-item>
          lemmon cake
        </gxg-tree-item>
        <gxg-tree-item>
          icecream
        </gxg-tree-item>
        <gxg-tree-item>
          snkicker rolls
        </gxg-tree-item>
        <gxg-tree-item>
          tiramisu
        </gxg-tree-item>
        <gxg-tree-item>
          amaretto tart
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
  </gxg-tree>`;
});
