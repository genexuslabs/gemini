import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select,
} from "@storybook/addon-knobs";

/*************
STORIES
*************/
const stories = storiesOf("Other/Scroll", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme, layout: "centered" });
stories.add("Scroll", () => {
  return `<style>
    #root {
      width: 400px;
    }
    </style>
    <gxg-scroll max-height="126px">
    <gxg-text>
    Crabbed Age and Youth<br>
    Cannot live together:<br>
    Youth is full of pleasance,<br>
    Age is full of care;<br>
    Youth like summer morn,<br>
    Age like winter weather;<br>
    Youth like summer brave,<br>
    Age like winter bare:<br>
    Youth is full of sports,<br>
    Age's breath is short,<br>
    Youth is nimble, Age is lame:<br>
    Youth is hot and bold,<br>
    Age is weak and cold,<br>
    Youth is wild, and Age is tame:-<br>
    Age, I do abhor thee;<br>
    Youth, I do adore thee;<br>
    O! my Love, my Love is young!<br>
    Age, I do defy thee-<br>
    O sweet shepherd, hie thee,<br>
    For methinks thou stay'st too long. 
    </gxg-text></gxg-scroll>`;
});
