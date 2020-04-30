import { Component, Element, Prop, h, Host, Watch } from "@stencil/core";

@Component({
  tag: "gxg-modal",
  styleUrl: "modal.scss",
  shadow: true
})
export class Modal {
  @Element() el: HTMLElement;

  /**
   * The modal title
   */
  @Prop() modalTitle: string;

  /**
   * The modal width
   */
  @Prop() width = "304px";

  /**
   * The footer alignment
   */
  @Prop() footerAlignment: footerAlignmentType = "left";

  /**
   * Wether the modal is visible or not
   */
  @Prop() visible = false;

  /**
   * z-index
   */
  @Prop() zIndex = "10";

  closeModal() {
    this.visible = false;
  }

  @Watch("visible")
  watchHandler(newValue: boolean) {
    const modal = this.el;
    if (newValue === true) {
      this.el.removeAttribute("hidden");
      setTimeout(function() {
        modal.classList.add("visible");
      }, 250);
    } else {
      modal.classList.remove("visible");
      setTimeout(function() {
        modal.setAttribute("hidden", "hidden");
      }, 500);
    }
  }

  render() {
    return (
      <Host hidden style={{ "z-index": this.zIndex }}>
        <div class="modal" style={{ width: this.width }}>
          <header class="modal__header">
            <span class="modal__header__title">{this.modalTitle}</span>
            <gxg-button
              type="secondary-icon-only"
              onClick={this.closeModal.bind(this)}
            >
              <gxg-icon slot="icon" type="close"></gxg-icon>
            </gxg-button>
          </header>
          <div class="modal__container">
            <slot></slot>
          </div>
          <footer
            class={{
              modalFooter: true,
              "modalFooter--left": this.footerAlignment === "left",
              "modalFooter--center": this.footerAlignment === "center",
              "modalFooter--right": this.footerAlignment === "right"
            }}
          >
            <slot name="footer"></slot>
          </footer>
        </div>
      </Host>
    );
  }
}

export type footerAlignmentType = "left" | "center" | "right";
