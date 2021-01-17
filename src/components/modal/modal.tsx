import { Component, Element, Prop, h, Host, Watch } from "@stencil/core";

@Component({
  tag: "gxg-modal",
  styleUrl: "modal.scss",
  shadow: true
})
export class GxgModal {
  @Element() el: HTMLElement;

  /*The accordion padding (internal spacing)*/
  @Prop({ reflect: true }) padding: padding = "s";

  /**
   * The footer justify content type
   */
  @Prop() footerJustifyContent = "flex-end";

  /**
   * The modal title
   */
  @Prop() modalTitle: string;

  /**
   * The modal width
   */
  @Prop() width = "304px";

  /**
   * Wether the modal is visible or not
   */
  @Prop() visible = false;

  /**
   * The z-index value of the modal
   */
  @Prop() zIndex = "10";

  componentDidLoad() {
    this.el.style.display = "block";
    this.el.style.zIndex = "-1";
  }

  closeModal() {
    this.visible = false;
  }

  @Watch("visible")
  watchHandler(newValue: boolean) {
    const modal = this.el;
    if (newValue === true) {
      this.el.removeAttribute("hidden");
      this.el.style.zIndex = this.zIndex;
      setTimeout(function() {
        modal.classList.add("visible");
      }, 250);
    } else {
      modal.classList.remove("visible");
      setTimeout(function() {
        modal.setAttribute("hidden", "hidden");
        modal.style.zIndex = "-1";
      }, 500);
    }
  }

  modalHidden() {
    if (this.visible) {
      return "false";
    } else {
      return "true";
    }
  }

  render() {
    return (
      <Host
        role="dialog"
        aria-hidden={this.modalHidden()}
        hidden
        style={{ "z-index": this.zIndex, display: "none" }}
        class={{
          "footer-justify-end": this.footerJustifyContent === "flex-end",
          "footer-justify-space-between":
            this.footerJustifyContent === "space-between"
        }}
      >
        <div class="modal" style={{ width: this.width }}>
          <header class="modal__header">
            <span class="modal__header__title">{this.modalTitle}</span>
            <gxg-button
              icon="gemini-tools/close"
              type="secondary-icon-only"
              onClick={this.closeModal.bind(this)}
            ></gxg-button>
          </header>
          <div class="modal__container">
            <slot></slot>
          </div>
          <footer class="modal__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
        <div class="layer"></div>
      </Host>
    );
  }
}

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
export type footerJustifyContent = "flex-end" | "space-between";
