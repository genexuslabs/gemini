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
const stories = storiesOf("Navigation/Tree", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Tree", () => {
  return `
  <gxg-tree slot="tree">
    <gxg-tree-item left-icon="general/knowledge-base">
      Meats
      <gxg-tree checkbox slot="tree">
        <gxg-tree-item left-icon="general/knowledge-base">
          White meats
          <gxg-tree checkbox slot="tree">
            <gxg-tree-item left-icon="general/knowledge-base">
              Chicken
            </gxg-tree-item>
            <gxg-tree-item left-icon="general/knowledge-base"> 
              Turkey
            </gxg-tree-item>
            <gxg-tree-item left-icon="general/knowledge-base">
              Duck
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
        <gxg-tree-item left-icon="general/knowledge-base">
          Red meats
          <gxg-tree checkbox slot="tree">
            <gxg-tree-item left-icon="general/knowledge-base">
              Beef
            </gxg-tree-item>
            <gxg-tree-item left-icon="general/knowledge-base"> 
              Lamb and mutton
            </gxg-tree-item>
            <gxg-tree-item left-icon="general/knowledge-base">
              Pork
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
    <gxg-tree-item id="fish" left-icon="general/patterns" checkbox download disabled right-icon="gemini-tools/download">
      Fish
    </gxg-tree-item>
    <gxg-tree-item checkbox left-icon="objects/module">
      Fruits
      <gxg-tree slot="tree">
        <gxg-tree-item checkbox left-icon="objects/module">
          Orange
        </gxg-tree-item>
        <gxg-tree-item checkbox left-icon="objects/module">
          Banana
          <gxg-tree slot="tree">
            <gxg-tree-item left-icon="objects/module" checkbox>
              Pisang
            </gxg-tree-item>
            <gxg-tree-item checkbox left-icon="objects/module">
              Red Banana
            </gxg-tree-item>
            <gxg-tree-item left-icon="objects/module" checkbox>
              Cavendish
              <gxg-tree slot="tree">
                <gxg-tree-item left-icon="objects/module" checkbox>
                  Big
                </gxg-tree-item>
                <gxg-tree-item left-icon="objects/module" checkbox>
                  Small
                </gxg-tree-item>
                <gxg-tree-item checkbox left-icon="objects/module">
                  Mini
                </gxg-tree-item>
              </gxg-tree>
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
        <gxg-tree-item checkbox left-icon="objects/module">
          Strawberry
          <gxg-tree slot="tree">
            <gxg-tree-item checkbox left-icon="objects/module">
              Albion 
            </gxg-tree-item>
            <gxg-tree-item checkbox left-icon="objects/module"> 
              Tillamook 
            </gxg-tree-item>
            <gxg-tree-item checkbox left-icon="objects/module">
              Northeaster 
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
  <gxg-tree-item checkbox left-icon="objects/document" empty-tree>
    nuts
    <gxg-tree slot="tree">
      <gxg-tree-item checkbox left-icon="objects/document">
        Almonds 
        <gxg-tree slot="tree">
          <gxg-tree-item checkbox left-icon="objects/document"> 
            Mollar de Tarragona
          </gxg-tree-item>
          <gxg-tree-item checkbox left-icon="objects/document">
            Ferragnès 
          </gxg-tree-item>
          <gxg-tree-item checkbox left-icon="objects/document">
            Verdal 
          </gxg-tree-item>
        </gxg-tree>
      </gxg-tree-item>
      <gxg-tree-item checkbox left-icon="objects/document"> 
        Brazil nuts 
      </gxg-tree-item>
      <gxg-tree-item checkbox left-icon="objects/document">
        Cashews 
      </gxg-tree-item>
      <gxg-tree-item checkbox left-icon="objects/document">
        Chestnuts 
      </gxg-tree-item>
    </gxg-tree>
  </gxg-tree-item>
  </gxg-tree>
    `;
});
