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

const stories = storiesOf("Controls/Dropdown", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Dropdown", () => {
  //FIRST BREADCRUMB

  //Width
  const labelWidth = "Width (default 240px)";
  const defaultValueWidth = "240px";
  const valueWidth = text(labelWidth, defaultValueWidth);

  //Max. Height
  const labelMaxHeight = "Max. Height (default 120px)";
  const defaultValueMaxHeight = "120px";
  const valueMaxHeight = text(labelMaxHeight, defaultValueMaxHeight);

  return `
  <gxg-drop-down width="${valueWidth}" max-height="${valueMaxHeight}">
  <gxg-tree>
    <gxg-tree-item data-value="meats" opened left-icon="general/knowledge-base">
      Meats
      <gxg-tree checkbox slot="tree">
        <gxg-tree-item opened data-value="white meats" left-icon="general/knowledge-base">
          White meats
          <gxg-tree checkbox slot="tree">
            <gxg-tree-item data-value="chicken" left-icon="general/knowledge-base">
              Chicken
            </gxg-tree-item>
            <gxg-tree-item data-value="turkey" left-icon="general/knowledge-base"> 
              Turkey
            </gxg-tree-item>
            <gxg-tree-item data-value="duck" left-icon="general/knowledge-base">
              Duck
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
        <gxg-tree-item opened data-value="red meats" left-icon="general/knowledge-base">
          Red meats
          <gxg-tree checkbox slot="tree">
            <gxg-tree-item data-value="beef" left-icon="general/knowledge-base">
              Beef
            </gxg-tree-item>
            <gxg-tree-item data-value="lamb and mutton" left-icon="general/knowledge-base"> 
              Lamb and mutton
            </gxg-tree-item>
            <gxg-tree-item data-value="pork" left-icon="general/knowledge-base">
              Pork
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
    <gxg-tree-item data-value="fruits" checkbox opened left-icon="objects/module">
      Fruits
      <gxg-tree slot="tree">
        <gxg-tree-item data-value="orange" checkbox left-icon="objects/module">
          Orange
        </gxg-tree-item>
        <gxg-tree-item data-value="banana" checkbox left-icon="objects/module" opened>
          Banana
          <gxg-tree slot="tree">
            <gxg-tree-item data-value="pisang" left-icon="objects/module" checkbox>
              Pisang
            </gxg-tree-item>
            <gxg-tree-item data-value="red banana" checkbox left-icon="objects/module">
              Red Banana
            </gxg-tree-item>
            <gxg-tree-item opened data-value="cavendish" left-icon="objects/module" checkbox>
              Cavendish
              <gxg-tree slot="tree">
                <gxg-tree-item data-value="cavendish big" left-icon="objects/module" checkbox>
                  Big
                </gxg-tree-item>
                <gxg-tree-item data-value="cavendish small" left-icon="objects/module" checkbox>
                  Small
                </gxg-tree-item>
                <gxg-tree-item checkbox data-value="cavendish mini" left-icon="objects/module">
                  Mini
                </gxg-tree-item>
              </gxg-tree>
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
        <gxg-tree-item data-value="strawberry" checkbox opened left-icon="objects/module">
          Strawberry
          <gxg-tree slot="tree">
            <gxg-tree-item data-value="strawberry albion" checkbox left-icon="objects/module">
              Albion 
            </gxg-tree-item>
            <gxg-tree-item data-value="strawberry tillamook" checkbox left-icon="objects/module" opened> 
              Tillamook 
            </gxg-tree-item>
            <gxg-tree-item data-value="strawberry northeaster" checkbox left-icon="objects/module">
              Northeaster 
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
  <gxg-tree-item data-value="nuts" opened checkbox left-icon="objects/document" empty-tree>
    nuts
    <gxg-tree slot="tree">
      <gxg-tree-item data-value="almonds" opened checkbox left-icon="objects/document">
        Almonds 
        <gxg-tree slot="tree">
          <gxg-tree-item data-value="almonds mollar de tarragona" checkbox left-icon="objects/document" opened> 
            Mollar de Tarragona
          </gxg-tree-item>
          <gxg-tree-item data-value="almonds ferragnès" checkbox left-icon="objects/document">
            Ferragnès 
          </gxg-tree-item>
          <gxg-tree-item data-value="almonds verdal" checkbox left-icon="objects/document">
            Verdal 
          </gxg-tree-item>
        </gxg-tree>
      </gxg-tree-item>
      <gxg-tree-item data-value="brazil nuts" checkbox left-icon="objects/document" opened> 
        Brazil nuts 
      </gxg-tree-item>
      <gxg-tree-item data-value="brazil cashews" checkbox left-icon="objects/document">
        Cashews 
      </gxg-tree-item>
      <gxg-tree-item data-value="brazil chestnuts" checkbox left-icon="objects/document">
        Chestnuts 
      </gxg-tree-item>
    </gxg-tree>
  </gxg-tree-item>
  </gxg-tree>
</gxg-drop-down>
`;
});
