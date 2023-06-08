import {
  Component,
  Element,
  Prop,
  h,
  Host,
  State,
  Watch,
  Method,
  Event,
  EventEmitter,
} from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-modal",
  styleUrl: "modal.scss",
  shadow: true,
})
export class GxgModal {
  @Element() el: HTMLElement;

  /*The modal flavor*/
  @Prop() flavor: "classic" | "alternate" = "classic";

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
  @Prop() width = "100%";

  /**
   * The modal max-width
   */
  @Prop() maxWidth = "300px";

  /**
   * Wether the modal is visible or not
   */
  @Prop() visible = false;

  /**
   * The z-index value of the modal
   */
  @Prop() zIndex = "100";

  /**
   * The presence of this attribute removes the sound that plays when the modal appears
   */
  @Prop() silent = false;

  /**
   * Emmited when the modal was closed
   */
  @Event() modalClosed: EventEmitter;

  /**
   * Emmited when the modal was opened
   */
  @Event() modalOpened: EventEmitter;

  @State() layerVisible = false;
  @State() modalVisible = false;
  @State() modalTransition = false;

  componentDidLoad() {
    this.el.style.display = "block";
  }

  closeModal() {
    this.layerVisible = false;
    this.modalVisible = false;
    this.modalClosed.emit(true);
    setTimeout(
      function () {
        this.visible = false;
        this.modalTransition = false;
      }.bind(this),
      250
    );
  }

  @Method()
  public close(): void {
    // Implementation of the method
    this.closeModal();
  }

  @Watch("visible")
  watchVisibleHandler() {
    if (this.visible === true) {
      setTimeout(
        function () {
          this.modalTransition = true;
          setTimeout(
            function () {
              this.layerVisible = true;
              this.modalVisible = true;
              this.modalOpened.emit(true);
            }.bind(this),
            50
          );
        }.bind(this),
        50
      );
    } else {
      this.closeModal.bind(this);
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
            this.footerJustifyContent === "space-between",
          large: state.large,
          "flavor-alternate": this.flavor === "alternate",
        }}
      >
        <div class="modal-container">
          <div
            class={{
              modal: true,
              "modal--visible": this.modalVisible,
              "modal--transition": this.modalTransition,
            }}
            style={{
              width: this.width,
              maxWidth: this.maxWidth,
              "z-index": this.zIndex + 1,
            }}
          >
            <header class="modal__header">
              <span class="modal__header__title">{this.modalTitle}</span>
              <gxg-button
                icon="gemini-tools/close"
                type="tertiary"
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
        </div>
        <div
          class={{
            layer: true,
            "layer--visible": this.layerVisible,
          }}
          style={{ "z-index": this.zIndex }}
        ></div>
      </Host>
    ) : null;
  }
}

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
export type footerJustifyContent = "flex-end" | "space-between";
