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

const stories = storiesOf("Interaction/More info", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("More info", () => {
  //Label
  const labelValueLabel = "Content";
  const defaultValueLabel = "More info text";
  const valueLabel = text(labelValueLabel, defaultValueLabel);

  //Position
  const labelPosition = "Position";
  const optionsPosition = {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left"
  };
  const defaultValuePosition = "top";
  const valuePosition = select(
    labelPosition,
    optionsPosition,
    defaultValuePosition
  );

  return `<gxg-more-info
  position="${valuePosition}"
      label="${valueLabel}"
    ></gxg-more-info>`;
});
