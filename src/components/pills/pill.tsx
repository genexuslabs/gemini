import {
  Component,
  Element,
  Prop,
  h,
  Host,
  Event,
  EventEmitter,
} from "@stencil/core";
import state from "../store";
import { exportParts } from "../../common/export-parts";
@Component({
  tag: "gxg-pill",
  styleUrl: "pill.scss",
  shadow: true,
})
export class GxgPill {
  private parts = {
    removeButton: "remove-button",
  };
  private exportparts: string;

  @Element() el: HTMLElement;
  @Event() pillRemoved: EventEmitter<string>;
  /**
   * The presence of this attribute disables the pill
   */
  @Prop() disabled = false;

  /**
   * The icon
   */
  @Prop() icon: string = undefined;

  /**
   * The presence of this attribute sets auto-height. Useful when the text overflows.
   */
  @Prop() heightAuto = false;

  /**
   * The pill id
   */
  @Prop() id!: string;

  /**
   * Stylizes the font with italic (only used in mercury)
   */
  @Prop() italic = false;

  /**
   * The type of pill
   */
  @Prop({ reflect: true }) type: PillType = "static";

  componentWillLoad() {
    this.attachExportParts();
  }
  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  removeButtonFunc() {
    this.pillRemoved.emit(this.id);
    this.el.classList.add("hide");
    setTimeout(() => {
      this.el.remove();
    }, 250);
  }

  iconType() {
    if (this.icon !== undefined) {
      return this.icon;
    } else {
      return "gemini-tools/empty";
    }
  }
  iconColor() {
    if (state.mercury) {
      return "mercury";
    } else if (this.disabled) {
      return "disabled";
    } else {
      return "success";
    }
  }

  render() {
    console.log(state.mercury);
    return (
      <Host
        tabindex="0"
        class={{
          "no-icon": this.icon === undefined,
          "has-icon": this.icon !== undefined,
          large: state.large,
          mercury: state.mercury,
        }}
        exportParts={this.exportparts ? this.exportparts : null}
      >
        <gxg-icon
          class="custom"
          type={this.iconType()}
          size="regular"
          color={this.iconColor()}
        ></gxg-icon>

        <span class="title">
          <slot></slot>
        </span>
        {this.type === "button-with-action" ||
        this.type === "static-with-action" ? (
          <gxg-icon
            class="clear-button"
            type="gemini-tools/close"
            size="small"
            color="onbackground"
            onClick={this.removeButtonFunc.bind(this)}
            part={this.parts.removeButton}
          ></gxg-icon>
        ) : null}
      </Host>
    );
  }
}

export type PillType =
  | "static"
  | "static-with-action"
  | "button"
  | "button-with-action";
