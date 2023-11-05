import { Component, h, Prop, Listen, State, Element } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;

  render() {
    return (
      <div class="container">
        <h2>combo-box</h2>
        <p>
          AAA Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor est
          culpa laborum illo, tenetur, quaerat quae eum rem magni voluptatem
          quasi eos repellendus nostrum commodi. Quasi aperiam eveniet dicta id.
        </p>
        <section>
          <gxg-combo-box>
            <gxg-combo-box-item value="manzana">Manzana</gxg-combo-box-item>
            <gxg-combo-box-item value="banana">Banana</gxg-combo-box-item>
            <gxg-combo-box-item value="mandarina">Mandarina</gxg-combo-box-item>
            <gxg-combo-box-item value="uva">Uvas</gxg-combo-box-item>
            <gxg-combo-box-item value="manzana">Manzana</gxg-combo-box-item>
            <gxg-combo-box-item value="banana">Banana</gxg-combo-box-item>
            <gxg-combo-box-item value="mandarina">Mandarina</gxg-combo-box-item>
            <gxg-combo-box-item value="uva">Uvas</gxg-combo-box-item>
            <gxg-combo-box-item value="manzana">Manzana</gxg-combo-box-item>
            <gxg-combo-box-item value="banana">Banana</gxg-combo-box-item>
            <gxg-combo-box-item value="mandarina">Mandarina</gxg-combo-box-item>
            <gxg-combo-box-item value="uva">Uvas</gxg-combo-box-item>
            <gxg-combo-box-item value="manzana">Manzana</gxg-combo-box-item>
            <gxg-combo-box-item value="banana">Banana</gxg-combo-box-item>
            <gxg-combo-box-item value="mandarina">Mandarina</gxg-combo-box-item>
            <gxg-combo-box-item value="uva">Uvas</gxg-combo-box-item>
            <gxg-combo-box-item value="manzana">Manzana</gxg-combo-box-item>
            <gxg-combo-box-item value="banana">Banana</gxg-combo-box-item>
            <gxg-combo-box-item value="mandarina">Mandarina</gxg-combo-box-item>
            <gxg-combo-box-item value="uva">Uvas</gxg-combo-box-item>
          </gxg-combo-box>
        </section>
      </div>
    );
  }
}
