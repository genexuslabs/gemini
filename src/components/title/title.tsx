import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-title",
  styleUrl: "title.scss",
  shadow: true
})
export class GxgTitle {
  /**
   * Title type
   */
  @Prop() type: TitleType = "title-01";

  titleType() {
    let title;
    switch (this.type) {
      case "title-01":
        title = <h1 class="gxg-title-01">{<slot></slot>}</h1>;
        break;
      case "title-02":
        title = <h2 class="gxg-title-02">{<slot></slot>}</h2>;
        break;
      case "title-03":
        title = <h3 class="gxg-title-03">{<slot></slot>}</h3>;
        break;
      case "title-04":
        title = <h4 class="gxg-title-04">{<slot></slot>}</h4>;
        break;
      case "title-05":
        title = <h5 class="gxg-title-05">{<slot></slot>}</h5>;
        break;
      default:
        title = <h1 class="gxg-title-01">{<slot></slot>}</h1>;
    }
    return title;
  }

  render() {
    return <Host>{this.titleType()} </Host>;
  }
}

export type TitleType =
  | "title-01"
  | "title-02"
  | "title-03"
  | "title-04"
  | "title-05";
