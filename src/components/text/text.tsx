import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "gxg-text",
  styleUrl: "text.scss",
  shadow: true
})
export class Text {
  /**
   * The href (for "link" or "link-gray" types
   */
  @Prop() href: string;

  /**
   * The target (for "link" or "link-gray" types
   * */
  @Prop() target: TargetType = "_self";

  /**
   * Title type
   */
  @Prop() type: TextType = "regular";

  textType() {
    let text;
    switch (this.type) {
      case "regular":
        text = <p class="gxg-text">{<slot></slot>}</p>;
        break;
      case "gray":
        text = <p class="gxg-text--gray">{<slot></slot>}</p>;
        break;
      case "quote":
        text = <q class="gxg-quote">{<slot></slot>}</q>;
        break;
      case "link":
        text = (
          <a href={this.href} target={this.target} class="gxg-link">
            {<slot></slot>}
          </a>
        );
        break;
      case "link-gray":
        text = (
          <a href={this.href} target={this.target} class="gxg-link-gray">
            {<slot></slot>}
          </a>
        );
        break;
      case "alert-error":
        text = <p class="gxg-alert-error">{<slot></slot>}</p>;
        break;
      case "alert-warning":
        text = <p class="gxg-alert-warning">{<slot></slot>}</p>;
        break;
      case "alert-success":
        text = <p class="gxg-alert-success">{<slot></slot>}</p>;
        break;
      default:
        text = <p class="gxg-text">{<slot></slot>}</p>;
    }
    return text;
  }

  render() {
    return <Host>{this.textType()} </Host>;
  }
}

export type TextType =
  | "regular"
  | "gray"
  | "quote"
  | "link"
  | "link-gray"
  | "alert-error"
  | "alert-warning"
  | "alert-success";

export type TargetType = "_self" | "_blank";
