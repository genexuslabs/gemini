import { Component, h, Host, Prop } from "@stencil/core";
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
  @Prop() model;

  render() {
    return (
      <Host>
        <gxg-tree model={this.model}></gxg-tree>
      </Host>
    );
  }
}
