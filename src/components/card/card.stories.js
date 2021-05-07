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

const stories = storiesOf("Other/Containers", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories
  .add("Box", () => {
    //Box Content
    const labelBoxContent = "Content";
    const defaultValueBoxContent =
      "Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.– Bernard M. Baruch";
    const valueBoxContent = text(labelBoxContent, defaultValueBoxContent);

    return `
    <gxg-box 
    background=${select(
      "Background",
      {
        "white (default)": "white",
        "gray-01": "gray-01",
        "gray-02": "gray-02",
      },
      "white"
    )}
      border="${boolean("Border", true)}"
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
          xxxl: "xxxl",
        },
        "s"
      )}">
      <q>${valueBoxContent}</q>
    </gxg-box>
`;
  })
  .add("Card", () => {
    //Card Content
    const labelCardContent = "Content";
    const defaultValueCardContent =
      "Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.– Bernard M. Baruch";
    const valueCardContent = text(labelCardContent, defaultValueCardContent);

    return `
  <gxg-card 
  background=${select(
    "Background",
    {
      "white (default)": "white",
      "gray-01": "gray-01",
    },
    "white"
  )}
  elevation=${select(
    "Elevation",
    {
      xs: "xs",
      m: "m",
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
        xxxl: "xxxl",
      },
      "s"
    )}">
    <q>${valueCardContent}</q>
  </gxg-card>
`;
  });
