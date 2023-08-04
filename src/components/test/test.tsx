import { Component, h, Host, Prop, Element } from "@stencil/core";
//import { GxgComboBox } from "../combo-box/combo-box";
//import { GxgFormSelect } from "../form-select/gxg-select";
//import { GxgModal } from "../modal/modal";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  gxgTree: HTMLGxgTreeElement;
  @Element() el: HTMLElement;
  @Prop() active = true;

  render() {
    return (
      <Host>
        <gxg-button part="button-user">User Button</gxg-button>
      </Host>
    );
  }
}
