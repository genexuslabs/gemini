import { Component, Element, Prop, h, Host, State, Watch } from "@stencil/core";

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
  @Prop() zIndex = "100";

  @State() layerVisible = false;
  @State() modalVisible = false;
  @State() modalTransition = false;

  componentDidLoad() {
    console.log("modal this.visible");
    console.log(this.visible);
    this.el.style.display = "block";
    this.el.style.zIndex = "-1";
  }

  closeModal() {
    this.layerVisible = false;
    this.modalVisible = false;
    setTimeout(
      function() {
        this.visible = false;
        this.modalTransition = false;
      }.bind(this),
      250
    );
  }

  @Watch("visible")
  watchVisibleHandler() {
    if (this.visible === true) {
      setTimeout(
        function() {
          this.modalTransition = true;
          setTimeout(
            function() {
              this.layerVisible = true;
              this.modalVisible = true;
            }.bind(this),
            50
          );
        }.bind(this),
        50
      );
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
    return this.visible === true ? (
      <Host
        role="dialog"
        aria-hidden={this.modalHidden()}
        class={{
          "footer-justify-end": this.footerJustifyContent === "flex-end",
          "footer-justify-space-between":
            this.footerJustifyContent === "space-between"
        }}
      >
        <div
          class={{
            modal: true,
            "modal--visible": this.modalVisible,
            "modal--transition": this.modalTransition
          }}
          style={{ width: this.width, "z-index": this.zIndex + 1 }}
        >
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
        <div
          class={{
            layer: true,
            "layer--visible": this.layerVisible
          }}
          style={{ "z-index": this.zIndex }}
        ></div>
      </Host>
    ) : null;
  }
}

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
export type footerJustifyContent = "flex-end" | "space-between";
