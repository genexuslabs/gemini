import { Component, Host, h, getAssetPath, Element, Prop } from "@stencil/core";
import state from "../store";

/**
 * @deprecated since v1.0.0
 */
@Component({
  tag: "gxg-grid",
  styleUrl: "gxg-grid.scss",
  shadow: false
})
export class GxgGrid {
  @Prop({ reflect: true }) noBorder = false;
  @Prop({ reflect: true }) fullHeight = false;
  @Element() el!: HTMLElement;

  componentWillLoad() {
    const iconsUrl = getAssetPath("./icon-assets/");
    this.el.style.setProperty(
      "--refreshIconUrl",
      `url("${iconsUrl}gemini-tools/reset.svg")`
    );
    this.el.style.setProperty(
      "--settingshIconUrl",
      `url("${iconsUrl}gemini-tools/settings.svg")`
    );
    this.el.style.setProperty(
      "--barSortAscendingIconUrl",
      `url("${iconsUrl}navigation/chevron-down.svg")`
    );
    this.el.style.setProperty(
      "--barSortDescendingIconUrl",
      `url("${iconsUrl}navigation/chevron-up.svg")`
    );
    this.el.style.setProperty(
      "--barSettingsButtonIconUrl",
      `url("${iconsUrl}gemini-tools/settings.svg")`
    );
    this.el.style.setProperty(
      "--settingsCloseIconUrl",
      `url("${iconsUrl}gemini-tools/close.svg")`
    );
    this.el.style.setProperty(
      "--dragIconUrl",
      `url("${iconsUrl}navigation/drag.svg")`
    );
    this.el.style.setProperty(
      "--caretCollapseIconUrl",
      `url("${iconsUrl}gemini-tools/minus.svg")`
    );
    this.el.style.setProperty(
      "--caretExpandIconUrl",
      `url("${iconsUrl}gemini-tools/add.svg")`
    );
  }

  render() {
    return (
      <Host class={{ large: state.large, "no-border": this.noBorder }}>
        <slot></slot>
      </Host>
    );
  }
}
