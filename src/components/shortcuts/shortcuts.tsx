import { Component, Host, h, Prop } from "@stencil/core";

@Component({
  tag: "gxg-shortcuts",
  styleUrl: "shortcuts.scss",
  shadow: false,
})
export class GxgShortcuts {
  /**
   * The URL of the shortcut definitions.
   */
  @Prop() readonly src!: string;

  @Prop() readonly showKey = "F10";

  render() {
    return (
      <Host>
        <ch-shortcuts src={this.src} showKey={this.showKey}></ch-shortcuts>
      </Host>
    );
  }
}
