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

const stories = storiesOf("Interaction/Demo", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Demo", () => {
  return `
    <style>
    body {
      width: 100%;
    }
    #root {
      width: 100%;
      height: 100%;
    }
    .main-container {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .first-row, .second-row {
      display: flex;
      justify-content: space-between;
    }
    .first-row {
      margin: 50px;
    }
    .second-row {
      margin: 50px;
    }
    .third-row {
      text-align: center;
      margin-bottom: 20px;
    }
    </style>
    <gxg-demo id="demo"></gxg-demo>
    <div class="main-container">
    <div class="first-row">
    <gxg-button type="outlined" gxg-demo-item position="bottom-start" message="Garlic is an herb that is grown around the world. It is related to onion, leeks, and chives. It is thought that garlic is native to Siberia, but spread to other parts of the world over 5000 years ago. Garlic is most commonly used for conditions related to the heart and blood system.">Garlic</gxg-button>
    <gxg-button type="outlined" gxg-demo-item position="bottom-center" message=" Pepper or black pepper is the dried unripe fruit grown in the plant called piper nigrum. It's pungent smell, peppery/hot taste and health friendly properties make pepper a favorite spice all over the world and it is commonly used in all cuisines.">Pepper</gxg-button>
    <gxg-button type="outlined" gxg-demo-item position="bottom-end" message="Salt is a mineral composed primarily of sodium chloride (NaCl), a chemical compound belonging to the larger class of salts; salt in its natural form as a crystalline mineral is known as rock salt or halite. Salt is present in vast quantities in seawater, where it is the main mineral constituent.">Salt</gxg-button>
    </div>
    <div class="second-row">
    <gxg-button type="outlined" gxg-demo-item position="top-start" message="Cumin is a flowering plant in the family Apiaceae, native to a territory including the Middle East and stretching east to India.[7] Its seeds – each one contained within a fruit, which is dried – are used in the cuisines of many cultures in both whole and ground form. Although cumin is thought to have uses in traditional medicine, there is no high-quality evidence that it is safe or effective as a therapeutic agent.[">Cumin</gxg-button>
    <gxg-button type="outlined" gxg-demo-item position="top-center" message="Parsley or garden parsley (Petroselinum crispum) is a species of flowering plant in the family Apiaceae that is native to the central and eastern Mediterranean region (Sardinia, Lebanon, Israel, Cyprus, Turkey, southern Italy, Greece, Portugal, Spain, Malta, Morocco, Algeria, and Tunisia), but has naturalized elsewhere in Europe, and is widely cultivated as an herb, and a vegetable.">Parsley</gxg-button>
    <gxg-button type="outlined" gxg-demo-item position="top-end" message="Coriander is a spice produced from the round, tan-colored seeds of the coriander plant (Coriandrum sativum), which is a member of the parsley family. The word coriander can be used to describe the entire plant: leaves, stems, seeds, and all.">Coriander</gxg-button>
    </div>  
    <div class="third-row">
    <gxg-button type="primary-text-only" onClick="(function(){
      const demo = document.getElementById('demo');
      demo.initiateDemo = true;
      return false;
    })();return false;">Initiate Demo</gxg-button>
    </div>
    </div>
    
`;
});
