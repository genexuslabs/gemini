import { Component, Element, h } from "@stencil/core";

@Component({
  tag: "gxg-tree",
  styleUrl: "tree.scss",
  shadow: true
})
export class GxgTree {
  @Element() el: HTMLElement;

  render() {
    return (
      <ul>
        <slot></slot>
      </ul>
    );
  }
}
