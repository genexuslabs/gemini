import { Component, h, Host, Prop, Listen } from "@stencil/core";
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

  tree1!: HTMLGxgTreeElement;
  tree2!: HTMLGxgTreeElement;

  componentDidLoad() {
    this.tree1.addEventListener(
      "checkboxClickedEvent",
      function (e: CustomEvent) {
        console.log("tree1 received the checkboxClickedEvent event", e.detail);
      }
    );
    this.tree2.addEventListener(
      "checkboxClickedEvent",
      function (e: CustomEvent) {
        console.log("tree1 received the checkboxClickedEvent event", e.detail);
      }
    );
  }

  render() {
    return (
      <Host>
        <gxg-tree
          model={this.model}
          ref={(el) => (this.tree1 = el as HTMLGxgTreeElement)}
        ></gxg-tree>
        <hr />
        <gxg-tree
          model={this.model}
          ref={(el) => (this.tree2 = el as HTMLGxgTreeElement)}
        ></gxg-tree>
      </Host>
    );
  }
}
