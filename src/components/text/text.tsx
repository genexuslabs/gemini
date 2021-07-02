import { Component, Host, Prop, h } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-text",
  styleUrl: "text.scss",
  shadow: true,
})
export class GxgText {
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
  @Prop() type: TextType = "text-regular";

  textType() {
    let text;
    switch (this.type) {
      case "text-regular":
        text = <p class="gxg-text">{<slot></slot>}</p>;
        break;
      case "text-gray":
        text = <p class="gxg-text--gray">{<slot></slot>}</p>;
        break;
      case "text-quote":
        text = <q class="gxg-quote">{<slot></slot>}</q>;
        break;
      case "text-link":
        text = (
          <a href={this.href} target={this.target} class="gxg-link">
            {<slot></slot>}
          </a>
        );
        break;
      case "text-link-gray":
        text = (
          <a href={this.href} target={this.target} class="gxg-link-gray">
            {<slot></slot>}
          </a>
        );
        break;
      case "text-alert-error":
        text = <p class="gxg-alert-error">{<slot></slot>}</p>;
        break;
      case "text-alert-warning":
        text = <p class="gxg-alert-warning">{<slot></slot>}</p>;
        break;
      case "text-alert-success":
        text = <p class="gxg-alert-success">{<slot></slot>}</p>;
        break;
      default:
        text = <p class="gxg-text">{<slot></slot>}</p>;
    }
    return text;
  }

  render() {
    return <Host class={{ large: state.large }}>{this.textType()} </Host>;
  }
}

export type TextType =
  | "text-regular"
  | "text-gray"
  | "text-quote"
  | "text-link"
  | "text-link-gray"
  | "text-alert-error"
  | "text-alert-warning"
  | "text-alert-success";

export type TargetType = "_self" | "_blank";
