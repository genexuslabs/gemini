import { Component, h, Host, Prop, Listen, Element } from "@stencil/core";
import { GxgTreeItemData } from "../tree-item/gxg-tree-item";
import { renderTreeItems } from "../tree/renderTreeItems";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;
  tree!: HTMLGxgTreeElement;

  //Do not delete buttonTestExportParts property as this is for a specific purpose
  @Prop() buttonTestExportParts = false;
  //Do not delete treeModel property as this is for a specific purpose
  @Prop() model: GxgTreeItemData[];

  render() {
    if (this.buttonTestExportParts) {
      return <gxg-button part="exterior-part">Export parts tests</gxg-button>;
    } else if (this.model) {
      return <gxg-tree checked>{renderTreeItems(this.model)}</gxg-tree>;
    } else {
      return <slot></slot>;
    }
  }
}
