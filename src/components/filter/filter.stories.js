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
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Filter", () => {
  return `
    <gxg-button onClick="(function(){
      let buttonCoordinates = this.getBoundingClientRect();
      let buttonLeft = buttonCoordinates.left + 'px';
      let buttonTop = buttonCoordinates.top + 'px';

      let filter = document.createElement('gxg-filter');
      filter.setAttribute('left', buttonLeft);
      filter.setAttribute('top', buttonTop);

      let filterItem1 = document.createElement('gxg-filter-item');
      filterItem1.setAttribute('type', 'webpanel');
      filterItem1.setAttribute('icon', 'objects/webpanel');
      filterItem1.innerHTML = 'Webpanels';

      let filterItem2 = document.createElement('gxg-filter-item');
      filterItem2.innerHTML = 'Webpanel01';

      let filterItem3 = document.createElement('gxg-filter-item');
      filterItem3.setAttribute('type', 'module');
      filterItem3.setAttribute('icon', 'objects/module');
      filterItem3.innerHTML = 'PrimaryModule.InModuleDSO PrimaryModule.InModuleDSO';

      let filterItem4 = document.createElement('gxg-filter-item');
      filterItem4.setAttribute('type', 'theme');
      filterItem4.setAttribute('icon', 'objects/themes');
      filterItem4.innerHTML = 'DesignSystems';

      let filterItem5 = document.createElement('gxg-filter-item');
      filterItem5.setAttribute('type', 'webpanel');
      filterItem5.setAttribute('icon', 'objects/webpanel');
      filterItem5.innerHTML = 'WebPanel02';

      let filterItem6 = document.createElement('gxg-filter-item');
      filterItem6.setAttribute('type', 'object');
      filterItem6.setAttribute('icon', 'objects/object');
      filterItem6.innerHTML = 'DesignSystem01';

      let filterItem7 = document.createElement('gxg-filter-item');
      filterItem7.setAttribute('type', 'module');
      filterItem7.setAttribute('icon', 'objects/module');
      filterItem7.innerHTML = 'SecondaryModule.InModuleDSO';
      
      let filterItem8 = document.createElement('gxg-filter-item');
      filterItem8.setAttribute('type', 'webpanel');
      filterItem8.setAttribute('icon', 'objects/webpanel');
      filterItem8.innerHTML = 'WebPanel03';

      let filterItem9 = document.createElement('gxg-filter-item');
      filterItem9.setAttribute('type', 'object');
      filterItem9.setAttribute('icon', 'objects/object');
      filterItem9.innerHTML = 'DesignSystem02';
      
      filter.appendChild(filterItem1);
      filter.appendChild(filterItem2);
      filter.appendChild(filterItem3);
      filter.appendChild(filterItem4);
      filter.appendChild(filterItem5);
      filter.appendChild(filterItem6);
      filter.appendChild(filterItem7);
      filter.appendChild(filterItem8);
      filter.appendChild(filterItem9);

      document.body.appendChild(filter); 
      return false;
    }.bind(this))();return false;">Show Filter</gxg-button>`;
});
