import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-more-info",
  styleUrl: "more-info.scss",
  shadow: true
})
export class MoreInfo {
  /**
   the tooltip position
   */
  @Prop({ reflect: true }) position: position = "top";

  /**
   * The label
   */
  @Prop() label: string;

  render() {
    return (
      <span class="more-info">
        <gxg-icon color="primary" type="general/notice"></gxg-icon>
        <div class="more-info__text">
          <span class="more-info__text__content">{this.label}</span>
        </div>
      </span>
    );
  }
}

export type position = "top" | "right" | "bottom" | "left";
