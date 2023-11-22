import { Component, Host, h, Prop, State } from "@stencil/core";

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

  @Prop() readonly suspend? = false;

  @Prop({ reflect: true, mutable: true }) showTooltip = false;

  @State() show = false;

  componentDidLoad(): void {
    this.showTooltip = true;
  }

  render() {
    return (
      <Host>
        <ch-shortcuts
          suspend={this.suspend}
          src={this.src}
          showKey={this.showKey}
        ></ch-shortcuts>
      </Host>
    );
  }
}
