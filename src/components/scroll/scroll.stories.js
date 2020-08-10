import { storiesOf } from "@storybook/html";
import readme from "./readme.md";
import {
  withKnobs,
  text,
  boolean,
  number,
  select
} from "@storybook/addon-knobs";

/*************
STORIES
*************/
const stories = storiesOf("Other/Scroll", module);
stories.addDecorator(withKnobs);
stories.addParameters({ notes: readme });
stories.add("Scroll", () => {
  return `<style>
    #root {
      width: 400px;
    }
    </style>
    <gxg-scroll max-height="126px">
    <gxg-text>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
    illum ratione repellendus labore ab voluptates fugiat ipsum aliquid
    quibusdam? Eos ipsam facilis libero. Quasi, consectetur. Quae facilis
    rem sequi esse. Lorem ipsum dolor sit amet consectetur adipisicing
    elit. Laboriosam non nesciunt recusandae libero possimus consequatur
    commodi tempore esse natus et, quam ipsa officiis tenetur! Nam nostrum
    magnam nihil quam maxime! Lorem ipsum, dolor sit amet consectetur
    adipisicing elit. Molestiae nemo ratione aut nihil, repellendus
    doloremque libero aliquid temporibus autem accusamus tempore pariatur
    quod odit deserunt cumque tenetur aperiam necessitatibus omnis? Lorem
    ipsum dolor sit amet consectetur adipisicing elit. Natus dolores ea
    ducimus aspernatur accusamus. Architecto beatae expedita aliquam
    debitis commodi provident aspernatur ipsum repellat assumenda,
    obcaecati quae repudiandae totam dicta?
    </gxg-text></gxg-scroll>`;
});
