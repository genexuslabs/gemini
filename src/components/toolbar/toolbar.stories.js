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

const stories = storiesOf("Other/Toolbar", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Toolbar", () => {
  //Title
  const labelTitle = "Title";
  const defaultValueTitle = "Title";
  const valueTitle = text(labelTitle, defaultValueTitle);

  //Subtitle
  const labelSubtitle = "Subtitle";
  const defaultValueSubtitle = "Subtitle";
  const valueSubtitle = text(labelSubtitle, defaultValueSubtitle);

  //Icon disabled
  const iconDisabledLabel = "Disabled (first icon on this example)";
  const defaultValueIconDisabled = false;
  const iconDisabledInitialValue = boolean(
    iconDisabledLabel,
    defaultValueIconDisabled
  );

  function iconDisabledFunc() {
    if (iconDisabledInitialValue === true) {
      return "disabled";
    }
  }

  //First Icon Title
  const labelFirstIconTitle = "First Icon Title";
  const defaultValueFirstIconTitle = "Title";
  const valueFirstIconTitle = text(
    labelFirstIconTitle,
    defaultValueFirstIconTitle
  );

  //First Icon Subtitle
  const labelFirstIconSubtitle = "First Icon Subtitle";
  const defaultValueFirstIconSubtitle = "Subtitle";
  const valueFirstIconSubtitle = text(
    labelFirstIconSubtitle,
    defaultValueFirstIconSubtitle
  );

  //Arrow position
  const labelArrowPosition = "Arrow position";
  const optionsArrowPosition = {
    start: "start",
    top: "top",
    bottom: "bottom",
  };
  const defaultValueStatus = "start";
  const valueArrowPosition = select(
    labelArrowPosition,
    optionsArrowPosition,
    defaultValueStatus
  );

  return `
  <gxg-alert
          id="alert-first-icon"
          type="notice"
          position="center"
          bottom="s"
          alert-title="CLICKED!"
          active-time="xxfast"
        >
          First icon was clicked!
        </gxg-alert>
        <gxg-alert
          id="alert-second-icon"
          type="notice"
          position="center"
          bottom="s"
          alert-title="Second Icon"
          active-time="xxfast"
        >
          Second icon was clicked!
        </gxg-alert>
        <gxg-alert
          id="alert-third-icon"
          type="notice"
          position="center"
          bottom="s"
          alert-title="Third Icon"
          active-time="xxfast"
        >
          Third icon was clicked!
        </gxg-alert>

  <gxg-toolbar toolbar-title="${valueTitle}" subtitle="${valueSubtitle}" position=${valueArrowPosition}>
      <gxg-toolbar-item
        slot
        icon="gemini-tools/settings"
        toolbar-item-title="${valueFirstIconTitle}"
        subtitle="${valueFirstIconSubtitle}"
        onClick="(function(){
          document.getElementById('alert-first-icon').setAttribute('active', 'true');
          return false;
      })();return false;""
        ${iconDisabledFunc()}
      ></gxg-toolbar-item>
      <gxg-toolbar-item
        slot
        icon="gemini-tools/settings"
        toolbar-item-title="Title"
        subtitle="Subtitle"
        onClick="(function(){
          document.getElementById('alert-second-icon').setAttribute('active', 'true');
          return false;
      })();return false;""
      ></gxg-toolbar-item>
      <gxg-toolbar-item
        slot
        icon="gemini-tools/settings"
        toolbar-item-title="Title"
        subtitle="Subtitle"
        onClick="(function(){
          document.getElementById('alert-third-icon').setAttribute('active', 'true');
          return false;
      })();return false;""
      ></gxg-toolbar-item>
    </gxg-toolbar>
  `;
});
