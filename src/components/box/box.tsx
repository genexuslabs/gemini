import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-box",
  styleUrl: "box.scss",
  shadow: true
})
export class Box {
  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The background color
   */
  @Prop({ reflect: true }) background = "white";

  /**
   * The presence of this property gives the box a border
   */
  @Prop({ reflect: true }) border = false;

  /*The box padding (internal spacing)*/
  @Prop() padding: padding = "xs";

  /**
   * The component width
   */
  @Prop() minHeight = "auto";

  /**
   * The component width
   */
  @Prop() maxWidth = "100%";

  /*********************************
  METHODS
  *********************************/

  render() {
    return (
      <Host
        class={{
          card: true
        }}
        style={{ maxWidth: this.maxWidth, minHeight: this.minHeight }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type padding = "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type background = "white" | "light-gray" | "dark-gray";
