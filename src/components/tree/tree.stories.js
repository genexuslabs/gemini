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
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Tree", () => {
  //Toggle checkboxes
  const labelToggleCheckboxes = "Toggle checkboxes";
  const defaultValueToggleCheckboxes = true;
  const valueToggleCheckboxes = boolean(
    labelToggleCheckboxes,
    defaultValueToggleCheckboxes
  );

  const fishItems = `<gxg-tree checkbox slot='tree'>
  <gxg-tree-item left-icon='general/patterns'>
    Alaskan salmon
  </gxg-tree-item>
  <gxg-tree-item left-icon='general/patterns'> 
    Cod
  </gxg-tree-item>
  <gxg-tree-item left-icon='general/patterns'>
    Herring
  </gxg-tree-item>
  <gxg-tree-item left-icon='general/patterns'>
    Mahi-mahi
  </gxg-tree-item>
</gxg-tree>`;

  return `
  <style>
    body {
      display:block;
    }
  </style>
  <br><br><br><br>
  <gxg-tree slot="tree" toggle-checkboxes=${valueToggleCheckboxes}>
    <gxg-tree-item opened left-icon="general/knowledge-base">
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
    <gxg-tree-item onClick="(function(){
      this.setAttribute('downloading', '');

      let gxgTree = document.createElement('GXG-TREE');   
      gxgTree.setAttribute('slot', 'tree');
      gxgTree.setAttribute('checkbox', '');

      let gxgTreeItem1 = document.createElement('GXG-TREE-ITEM');   
      gxgTreeItem1.setAttribute('left-icon','general/patterns');
      gxgTreeItem1.innerHTML = 'Alaskan salmon';      

      let gxgTreeItem2 = document.createElement('GXG-TREE-ITEM');   
      gxgTreeItem2.setAttribute('left-icon','general/patterns');
      gxgTreeItem2.innerHTML = 'Cod';      

      let gxgTreeItem3 = document.createElement('GXG-TREE-ITEM');   
      gxgTreeItem3.setAttribute('left-icon','general/patterns');
      gxgTreeItem3.innerHTML = 'Herringn';      

      let gxgTreeItem4 = document.createElement('GXG-TREE-ITEM');   
      gxgTreeItem4.setAttribute('left-icon','general/patterns');
      gxgTreeItem4.innerHTML = 'Mahi-mahi';      
      
      gxgTree.appendChild(gxgTreeItem1); 
      gxgTree.appendChild(gxgTreeItem2); 
      gxgTree.appendChild(gxgTreeItem3); 
      gxgTree.appendChild(gxgTreeItem4); 

      setTimeout(function(){
        this.appendChild(gxgTree); 
        this.setAttribute('downloaded', '');
        this.removeAttribute('disabled');
        this.removeAttribute('download');
        this.removeAttribute('downloading');
      }.bind(this), 1500);
      this.removeAttribute('onclick');


      return false;
    }.bind(this))();return false; this.onclick=null;" id="fish" left-icon="general/patterns" checkbox download disabled right-icon="gemini-tools/download">
      Fish
    </gxg-tree-item>
    <gxg-tree-item checkbox opened left-icon="objects/module">
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
            <gxg-tree-item checkbox left-icon="objects/module" opened> 
              Tillamook 
            </gxg-tree-item>
            <gxg-tree-item checkbox left-icon="objects/module">
              Northeaster 
            </gxg-tree-item>
          </gxg-tree>
        </gxg-tree-item>
      </gxg-tree>
    </gxg-tree-item>
  <gxg-tree-item opened checkbox left-icon="objects/document" empty-tree>
    nuts
    <gxg-tree slot="tree">
      <gxg-tree-item checkbox left-icon="objects/document">
        Almonds 
        <gxg-tree slot="tree">
          <gxg-tree-item checkbox left-icon="objects/document" opened> 
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
      <gxg-tree-item checkbox left-icon="objects/document" opened> 
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
  <br><br><br><br>`;
});
