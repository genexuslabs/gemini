import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-template",
  styleUrl: "template.scss",
  shadow: true
})
export class Template {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  render() {
    return <Host class={{}}></Host>;
  }
}
