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

const stories = storiesOf("Other/Toolbar", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
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
  const iconDisabledLabel = "First Icon disabled";
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

  //Single Tab Open
  const labelSingleTabOpen =
    "Single Tab Opened (only one accordion at a time can be open at the same time)";
  const defaultValueSingleTabOpen = false;

  const valueSingleTabOpen = boolean(
    labelSingleTabOpen,
    defaultValueSingleTabOpen
  );

  function singleTabOpen() {
    if (valueSingleTabOpen) {
      return "single-tab-open";
    } else {
      return "";
    }
  }

  //Arrow position
  const labelArrowPosition = "Arrow position";
  const optionsArrowPosition = {
    left: "left",
    top: "top",
    bottom: "bottom"
  };
  const defaultValueStatus = "left";
  const valueArrowPosition = radios(
    labelArrowPosition,
    optionsArrowPosition,
    defaultValueStatus
  );

  return `
  <gxg-alert
          id="alert-first-icon"
          type="more-info"
          position="center"
          bottom="15px"
          alert-title="CLICKED!"
          active-time="xxfast"
        >
          First Icon was clicked!
        </gxg-alert>
        <gxg-alert
          id="alert-second-icon"
          type="more-info"
          position="center"
          bottom="15px"
          alert-title="Second Icon"
          active-time="xxfast"
        >
          Second Icon was clicked!
        </gxg-alert>
        <gxg-alert
          id="alert-third-icon"
          type="more-info"
          position="center"
          bottom="15px"
          alert-title="Third Icon"
          active-time="xxfast"
        >
          Third Icon was clicked!
        </gxg-alert>

  <gxg-toolbar toolbar-title="${valueTitle}" subtitle="${valueSubtitle}" position=${valueArrowPosition}>
      <gxg-toolbar-item
        slot
        icon="settings"
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
        icon="settings"
        toolbar-item-title="title"
        subtitle="subtitle"
      ></gxg-toolbar-item>
      <gxg-toolbar-item
        slot
        icon="settings"
        toolbar-item-title="title"
        subtitle="subtitle"
      ></gxg-toolbar-item>
    </gxg-toolbar>
  `;
});
