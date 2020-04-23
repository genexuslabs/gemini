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

const stories = storiesOf("Containers", module);
stories.addDecorator(withKnobs);
stories
  .add("Card", () => {
    //Width
    const labelWidth = "Width Size (default: 100%)";
    const defaultValueWidth = "260px";
    const valueWidth = text(labelWidth, defaultValueWidth);

    //Box Shadow
    const labelShadow = "Shadow (1 to 8)";
    const defaultValueShadow = "1";
    const valueShadow = text(labelShadow, defaultValueShadow);

    //Color
    const labelColor = "Color";
    const optionsColor = {
      "White (default)": "white",
      Gray: "gray"
    };
    const defaultValueColor = "white";
    const valueColor = radios(labelColor, optionsColor, defaultValueColor);

    return `
  <style>
  gxg-card {
    margin-bottom: 15px;
  }
  </style>
  <gxg-card width=${valueWidth} shadow=${valueShadow} ${valueColor}>
    <q>Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.
    – Bernard M. Baruch</q>
  </gxg-card>
  <gxg-card width=${valueWidth} shadow=${valueShadow} ${valueColor}>
    <q>You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.
    – Dr. Seuss</q>
  </gxg-card>
  <gxg-card width=${valueWidth} shadow=${valueShadow} ${valueColor}>
    <q>Don’t walk behind me; I may not lead. Don’t walk in front of me; I may not follow. Just walk beside me and be my friend.
    – Albert Camus</q>
  </gxg-card>
`;
  })
  .add("Box", () => {
    //Width
    const labelWidth = "Width Size (default: 100%)";
    const defaultValueWidth = "260px";
    const valueWidth = text(labelWidth, defaultValueWidth);

    //Color
    const labelColor = "Color";
    const optionsColor = {
      "White (default)": "0",
      "Gray 1": "1",
      "Gray 2": "2"
    };
    const defaultValueColor = "0";
    const valueColor = radios(labelColor, optionsColor, defaultValueColor);

    //Border
    const labelBorder = "Border";
    const defaultValueBorder = false;
    const valueBorder = boolean(labelBorder, defaultValueBorder);

    function valueBorderFunc() {
      if (valueBorder) {
        return "border";
      }
    }

    return `
  <style>
  gxg-box {
    margin-bottom: 15px;
  }
  </style>
  <gxg-box gray=${valueColor} width=${valueWidth} ${valueBorderFunc()}>
    <q>Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.
    – Bernard M. Baruch</q>
  </gxg-box>
  <gxg-box gray=${valueColor} width=${valueWidth} ${valueBorderFunc()}>
    <q>You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.
    – Dr. Seuss</q>
  </gxg-box>
  <gxg-box gray=${valueColor} width=${valueWidth} ${valueBorderFunc()}>
    <q>Don’t walk behind me; I may not lead. Don’t walk in front of me; I may not follow. Just walk beside me and be my friend.
    – Albert Camus</q>
  </gxg-box>
`;
  });
