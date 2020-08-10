import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-scroll",
  styleUrl: "scroll.scss",
  shadow: true
})
export class Scroll {
  /**
   * Max height
   */
  @Prop() maxHeight = "100%";

  render() {
    return (
      <div class="gxg-scroll" style={{ maxHeight: this.maxHeight }}>
        <slot></slot>
      </div>
    );
  }
}
