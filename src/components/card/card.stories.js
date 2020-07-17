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
    return `
  <gxg-card 
  background=${radios(
    "Background",
    {
      "white (default)": "white",
      gray: "gray"
    },
    "xs"
  )}
  box-shadow=${select(
    "Box Shadow",
    {
      xxs: "xxs",
      xs: "xs",
      s: "s",
      m: "m",
      l: "l",
      xl: "xl",
      xxl: "xxl"
    },
    "xs"
  )} 
    max-width="${text("Max Width", "100%")}"
    min-height=${text("Min Height (default: auto)", "auto")}
    padding="${select(
      "Padding",
      {
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
  })
  .add("Box", () => {
    return `
    <gxg-box 
    background=${radios(
      "Background",
      {
        "white (default)": "white",
        "light gray": "light-gray",
        "dark gray": "dark-gray"
      },
      "white"
    )}
      border=${boolean("Border", false)}
      max-width="${text("Max Width", "100%")}"
      min-height=${text("Min Height (default: auto)", "auto")}
      padding="${select(
        "Padding",
        {
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
  });
