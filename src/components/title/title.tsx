import { Component, Host, Prop, h } from "@stencil/core";
import state from "../store";
import { TitleAlignment } from "../../common/types";

@Component({
  tag: "gxg-title",
  styleUrl: "title.scss",
  shadow: true,
})
export class GxgTitle {
  /**
   * Title type
   */
  @Prop() type: TitleType = "title-01";

  /**
   * Title type
   */
  @Prop({ reflect: true }) alignment: TitleAlignment = "start";

  titleType() {
    let title;
    switch (this.type) {
      case "title-01":
        title = (
          <h1 class="gxg-title-01" part="title">
            {<slot></slot>}
          </h1>
        );
        break;
      case "title-02":
        title = (
          <h2 class="gxg-title-02" part="title">
            {<slot></slot>}
          </h2>
        );
        break;
      case "title-03":
        title = (
          <h3 class="gxg-title-03" part="title">
            {<slot></slot>}
          </h3>
        );
        break;
      case "title-04":
        title = (
          <h4 class="gxg-title-04" part="title">
            {<slot></slot>}
          </h4>
        );
        break;
      case "title-05":
        title = (
          <h5 class="gxg-title-05" part="title">
            {<slot></slot>}
          </h5>
        );
        break;
      default:
        title = (
          <h1 class="gxg-title-06" part="title">
            {<slot></slot>}
          </h1>
        );
    }
    return title;
  }

  render() {
    return <Host class={{ large: state.large }}>{this.titleType()} </Host>;
  }
}

export type TitleType =
  | "title-01"
  | "title-02"
  | "title-03"
  | "title-04"
  | "title-05";
