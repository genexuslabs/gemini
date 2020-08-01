import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-title",
  styleUrl: "title.scss",
  shadow: true
})
export class Title {
  /**
   * Title type
   */
  @Prop() type: TitleType = "01";

  titleType() {
    let title;
    switch (this.type) {
      case "01":
        title = <h1 class="gxg-title-01">{<slot></slot>}</h1>;
        break;
      case "02":
        title = <h2 class="gxg-title-02">{<slot></slot>}</h2>;
        break;
      case "03":
        title = <h3 class="gxg-title-03">{<slot></slot>}</h3>;
        break;
      case "04":
        title = <h4 class="gxg-title-04">{<slot></slot>}</h4>;
        break;
      case "05":
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

export type TitleType = "01" | "02" | "03" | "04" | "05";
