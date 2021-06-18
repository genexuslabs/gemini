import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";

/*************
KNOBS
*************/

/*Disabled Knob*/
const labelDisabled = "Disabled";
const defaultValueDisabled = false;

function mostrarAlertNotice(alertId) {
  document.getElementById(alertId).setAttribute("active", "true");
}

/*************
STORIES
*************/
const stories = storiesOf("Interaction/Window", module);
stories.addDecorator(withKnobs);
stories.addParameters({ layout: "centered" });
stories.add(
  "Window",
  () => ` 
    <gxg-button onClick="(function(){
        document.getElementById('window-component').setAttribute('display-window', 'true');
        return false;
    })();">Show window</gxg-button>
    <gxg-window id="window-component" window-title="the title" title-icon="objects/webpanel">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, impedit nesciunt deleniti, temporibus vel officia sed, aut rerum adipisci laborum nulla sit nisi fugit ipsa quisquam sapiente id cum facilis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, nemo aliquam aspernatur nesciunt dolorum ipsam voluptate labore necessitatibus repellendus dolore? Voluptatem, sint. Vero minima autem repellat, fugit laboriosam in eaque. 
  </gxg-window>
    `,
  {
    notes: {
      markdown: readme,
    },
  }
);
