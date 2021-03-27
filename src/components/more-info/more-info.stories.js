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

const stories = storiesOf("Interaction/More info", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("More info", () => {
  //Position
  const labelPosition = "Position";
  const optionsPosition = {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
  };
  const defaultValuePosition = "top";
  const valuePosition = select(
    labelPosition,
    optionsPosition,
    defaultValuePosition
  );

  //Label
  const labelValueLabel = "Content";
  const defaultValueLabel =
    "In the history of Europe, the Middle Ages or Medieval Period lasted from the 5th to the 15th century. It began with the fall of the Western Roman Empire and merged into the Renaissance and the Age of Discovery.";
  const valueLabel = text(labelValueLabel, defaultValueLabel);

  //More info label
  const labelMoreInfoLabel = "More info label (optional)";
  const defaultValueMoreInfoLabel = "More info";
  const valueMoreInfoLabel = text(
    labelMoreInfoLabel,
    defaultValueMoreInfoLabel
  );

  //More info url
  const labelMoreInfoUrl = "More info Url (optional)";
  const defaultValueMoreInfoUrl =
    "https://en.wikipedia.org/wiki/Middle_Ages#:~:text=In%20the%20history%20of%20Europe,and%20the%20Age%20of%20Discovery.";
  const valueMoreInfoUrl = text(labelMoreInfoUrl, defaultValueMoreInfoUrl);

  //Target
  const labelTarget = "Target";
  const optionsTarget = {
    _blank: "_blank",
    _self: "_self",
  };
  const defaultValueTarget = "_blank";
  const valueTarget = radios(labelTarget, optionsTarget, defaultValueTarget);

  return `<gxg-more-info url="${valueMoreInfoUrl}" more-info-label="${valueMoreInfoLabel}"
  position="${valuePosition}"
      label="${valueLabel}"
      target="${valueTarget}"
    ></gxg-more-info>`;
});
