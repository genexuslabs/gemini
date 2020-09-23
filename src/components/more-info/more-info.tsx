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

  /**
   * (Optional) The "more-info" label. This property goes along with "url" attribute
   */
  @Prop() moreInfoLabel = "more info";

  /**
   * (Optional) The "more-info" url.
   */
  @Prop() url: string = null;

  /**
   * The url target
   */
  @Prop() target: target = "_blank";

  render() {
    return (
      <span class="more-info">
        <gxg-icon color="primary" type="general/notice"></gxg-icon>
        <div class="more-info__text">
          <span class="more-info__text__content">
            {this.label}
            {this.url !== null ? <br></br> : null}
            {this.url !== null ? (
              <a
                class="more-info__text__content__url"
                href={this.url}
                target={this.target}
              >
                {this.moreInfoLabel}
              </a>
            ) : null}
          </span>
        </div>
      </span>
    );
  }
}

export type position = "top" | "right" | "bottom" | "left";
export type target = "_blank" | "self";
