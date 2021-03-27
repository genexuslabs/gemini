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

const stories = storiesOf("Interaction/Tooltip", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Tooltip", () => {
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

  //No border
  const labelNoBorder = "No border";
  const defaultValueNoBorder = false;
  const valueNoBorder = boolean(labelNoBorder, defaultValueNoBorder);

  function noBorderFunc() {
    if (valueNoBorder) {
      return "no-border";
    }
  }

  return `<div style="width:450px;">
            <p style="font-family: var(--font-family-primary);font-size: var(--font-size-md); line-height: 1.5em;">
              Prehistory is the period that begins with the appearance of the human being, about five million years ago, and finishes with the invention of writing, about 6,000 years ago. It is a long period divided into three stages: the In the <gxg-tooltip ${noBorderFunc()} label='In the Paleolithic period (roughly 2.5 million years ago to 10,000 B.C.), early humans lived in caves or simple huts or tepees and were hunters and gatherers. They used basic stone and bone tools, as well as crude stone axes, for hunting birds and wild animals.' position="${valuePosition}">Paleolithic period</gxg-tooltip> (roughly 2.5 million years ago to 10,000 B.C.), early humans lived in caves or simple huts or tepees and were hunters and gatherers. They used basic stone and bone tools, as well as crude stone axes, for hunting birds and wild animals., the NeolithicAge and the Metal Age.
              </p>
          </div>`;
});
