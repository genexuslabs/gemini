import { Component, Prop, h } from "@stencil/core";
import { IconType } from "../icon/icon";

@Component({
  tag: "gxg-toolbar-item",
  styleUrl: "toolbar-item.scss",
  shadow: true
})
export class ToolbarItem {
  @Prop() disabled = false;
  @Prop() icon: IconType = null;
  @Prop() subtitle: string;
  @Prop() title: string;

  includeIcon() {
    if (this.icon !== null) {
      return (
        <gxg-icon slot="icon" type={this.icon} color="negative"></gxg-icon>
      );
    }
  }

  render() {
    return (
      <div
        class={{
          "toolbar-item": true,
          "toolbar-item--disabled": this.disabled === true
        }}
      >
        <div class="toolbar-item__label">
          {this.title}:{this.subtitle}
        </div>
        {this.includeIcon()}
      </div>
    );
  }
}
