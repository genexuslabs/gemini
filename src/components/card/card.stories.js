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

const stories = storiesOf("Other/Containers", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories
  .add("Box", () => {
    return `
    <gxg-box 
    background=${select(
      "Background",
      {
        "surface (default)": "surface",
        "gray-01": "gray-01",
        "gray-02": "gray-02"
      },
      "white"
    )}
      border="${select(
        "Border",
        {
          "no-border": "no-border",
          "gray-03": "gray-03"
        },
        "no-border"
      )}"
      max-width="${text("Max Width", "100%")}"
      min-height=${text("Min Height (default: auto)", "auto")}
      padding="${select(
        "Padding",
        {
          0: "0",
          xs: "xs",
          s: "s",
          m: "m",
          l: "l",
          xl: "xl",
          xxl: "xxl",
          xxxl: "xxxl"
        },
        "s"
      )}">
      <q>Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.
      – Bernard M. Baruch</q>
    </gxg-box>
`;
  })
  .add("Card", () => {
    return `
  <gxg-card 
  background=${select(
    "Background",
    {
      "surface (default)": "surface",
      "gray-01": "gray-01"
    },
    "xs"
  )}
  elevation=${select(
    "Elevation",
    {
      "01": "01",
      "03": "03"
    },
    "xs"
  )} 
    max-width="${text("Max Width", "100%")}"
    min-height=${text("Min Height (default: auto)", "auto")}
    padding="${select(
      "Padding",
      {
        0: "0",
        xs: "xs",
        s: "s",
        m: "m",
        l: "l",
        xl: "xl",
        xxl: "xxl",
        xxxl: "xxxl"
      },
      "s"
    )}">
    <q>Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.
    – Bernard M. Baruch</q>
  </gxg-card>
`;
  });
