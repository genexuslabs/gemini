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

const stories = storiesOf("Navigation/Contextual Menu", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Contextual Menu", () => {
  return `
  <style>
  .container {
    display:flex;
    flex-direction:column;    
  }
  </style>

  <!-- CONTEXTUAL MENU FRUITS -->
  <gxg-contextual-menu id="contextualMenuFruits"> 
  <gxg-contextual-menu-item icon="gemini-tools/folder">
    Apples
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item>
        Pink Pearl
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Arkansas black
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Ambrosia
      </gxg-contextual-menu-item>    
      <gxg-contextual-menu-item>
        Winesap
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Cortland
      </gxg-contextual-menu-item> 
    </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
  <gxg-contextual-menu-item icon="gemini-tools/folder">
    Bananas
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item>
      Cavendish
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
      Pisang Raja
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
      Red
      </gxg-contextual-menu-item>    
      <gxg-contextual-menu-item>
      Lady Finger
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
      Blue Java
      </gxg-contextual-menu-item> 
    </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
  <gxg-contextual-menu-item icon="gemini-tools/folder"> 
    Grapes
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item icon="gemini-tools/folder">
      Red
        <gxg-contextual-menu-submenu>
        <gxg-contextual-menu-item>
          Moon Drops
        </gxg-contextual-menu-item>
        <gxg-contextual-menu-item>
          Concord
        </gxg-contextual-menu-item>
        <gxg-contextual-menu-item>
          Pinot Noir
        </gxg-contextual-menu-item>
        <gxg-contextual-menu-item>
          Lemberger
        </gxg-contextual-menu-item>
      </gxg-contextual-submenu>
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item icon="gemini-tools/folder">
      White
        <gxg-contextual-menu-submenu>
          <gxg-contextual-menu-item>
            Cotton Candy
          </gxg-contextual-menu-item>
          <gxg-contextual-menu-item>
            Riesling
          </gxg-contextual-menu-item>
          <gxg-contextual-menu-item>
            Gewürztraminer
          </gxg-contextual-menu-item>
          <gxg-contextual-menu-item>
            Moon Balls
          </gxg-contextual-menu-item>
        </gxg-contextual-submenu>
      </gxg-contextual-menu-item>
    </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
</gxg-contextual-menu>

<!-- CONTEXTUAL MENU VEGETABLES -->
<gxg-contextual-menu id="contextualMenuVegetables"> 
  <gxg-contextual-menu-item>
    Onion
  </gxg-contextual-menu-item>
  <gxg-contextual-menu-item icon="gemini-tools/folder">
    Lettuce
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item>
        Butterhead
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Batavia
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Leaf
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Celtuce
      </gxg-contextual-menu-item>
      </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
  <gxg-contextual-menu-item icon="gemini-tools/folder">
    Tomatoes
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item>
        Cherry
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Roma
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        San Marzano
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Better Boy
      </gxg-contextual-menu-item>
      </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
</gxg-contextual-menu>

<!-- CONTEXTUAL MENU MEATS -->
<gxg-contextual-menu id="contextualMenuMeats"> 
  <gxg-contextual-menu-item icon="gemini-tools/folder">
    Red
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item>
        Beef
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Lamb and Mutton
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Pork
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Veal
      </gxg-contextual-menu-item>
      </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
  <gxg-contextual-menu-item icon="gemini-tools/folder">
    White
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item>
        Chicken
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Rabit
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Turkey
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Veal
      </gxg-contextual-menu-item>
      </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
  <gxg-contextual-menu-item icon="gemini-tools/folder">
    Fish
    <gxg-contextual-menu-submenu>
      <gxg-contextual-menu-item>
        Alaskan salmon
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Cod
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Herring
      </gxg-contextual-menu-item>
      <gxg-contextual-menu-item>
        Mahi-mahi
      </gxg-contextual-menu-item>
      </gxg-contextual-submenu>
  </gxg-contextual-menu-item>
</gxg-contextual-menu>

  <div class="container">
    <gxg-menu menu-title="foods">
      <gxg-menu-item label="fruits" oncontextmenu="(event,function(){
        event.preventDefault();
        let contextualMenuFruits = document.querySelector('#contextualMenuFruits');
        contextualMenuFruits.removeAttribute('visible');
        contextualMenuFruits.setAttribute('visible', '');
    }.bind(this))();"></gxg-menu-item>
      <gxg-menu-item label="vegetables" oncontextmenu="(event,function(){
        event.preventDefault();
        let contextualMenuVegetables = document.querySelector('#contextualMenuVegetables');
        contextualMenuVegetables.removeAttribute('visible');
        contextualMenuVegetables.setAttribute('visible', '');
    }.bind(this))();"></gxg-menu-item>
    <gxg-menu-item label="meats" oncontextmenu="(event,function(){
      event.preventDefault();
      let contextualMenuMeats = document.querySelector('#contextualMenuMeats');
      contextualMenuMeats.removeAttribute('visible');
      contextualMenuMeats.setAttribute('visible', '');
  }.bind(this))();"></gxg-menu-item> 
  </gxg-menu>
  <p>Right click on an item to see contextual menu</p>
  </div>

  `;
});
