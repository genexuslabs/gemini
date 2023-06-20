import { Component, Prop, h, Listen, Element, Host } from "@stencil/core";
import { requiredLabel, formMessage } from "../../common/form";
@Component({
  tag: "gxg-form-radio-group",
  styleUrl: "form-radio-group.scss",
  shadow: true,
})
export class GxgFormRadioGroup {
  showValidationMessage = false;

  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The radio group label
   */
  @Prop() label: string;

  /**
   * The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up
   *
   */
  @Prop({ mutable: true }) validationMessage: string;

  /**
   * Make the radio-buttons required
   */
  @Prop() required = false;

  /*********************************
  METHODS
  *********************************/

  @Listen("keyPressed")
  keyPressedHandler(event: CustomEvent) {
    const currentActiveRadio = this.el.querySelector("gxg-form-radio[checked]");
    currentActiveRadio.shadowRoot
      .querySelector("input")
      .setAttribute("tabindex", "-1");
    currentActiveRadio.removeAttribute("checked");
    if (event.detail.direction === "next") {
      const nextSibling = currentActiveRadio.nextElementSibling;
      if (nextSibling !== null) {
        nextSibling.shadowRoot
          .querySelector("input")
          .setAttribute("tabindex", "0");
        nextSibling.setAttribute("checked", "checked");
        nextSibling.shadowRoot.querySelector("input").focus();
      } else {
        const firstRadio = this.el.querySelector("gxg-form-radio:first-child");
        firstRadio.setAttribute("checked", "checked");
        firstRadio.shadowRoot.querySelector("input").focus();
      }
    } else if (event.detail.direction === "previous") {
      const prevSibling = currentActiveRadio.previousElementSibling;
      if (prevSibling !== null) {
        prevSibling.shadowRoot
          .querySelector("input")
          .setAttribute("tabindex", "0");
        prevSibling.setAttribute("checked", "checked");
        prevSibling.shadowRoot.querySelector("input").focus();
      } else {
        const lastRadio = this.el.querySelector("gxg-form-radio:last-child");
        lastRadio.setAttribute("checked", "checked");
        lastRadio.shadowRoot.querySelector("input").focus();
      }
    }
  }

  @Listen("changeInternal")
  radioClickedHandler(event: CustomEvent) {
    const radioButtonsNodeList = this.el.querySelectorAll("gxg-form-radio");

    radioButtonsNodeList.forEach(function (currentRadio) {
      if (event.detail["id"] === currentRadio.getAttribute("radio-id")) {
        currentRadio.setAttribute("checked", "checked");
        currentRadio.shadowRoot
          .querySelector("input")
          .setAttribute("tabindex", "0");
      } else {
        currentRadio.removeAttribute("checked");
        currentRadio.shadowRoot.querySelector("input");
        currentRadio.shadowRoot
          .querySelector("input")
          .setAttribute("tabindex", "-1");
      }
    }, "myThisArg");
  }

  componentDidLoad() {
    const firstRadioButton = this.el.querySelector("gxg-option:first-child");
    firstRadioButton.setAttribute("required", "required");
  }

  labelFunc() {
    if (this.label) {
      return (
        <gxg-label class="label">
          {this.label}
          {requiredLabel(this)}
        </gxg-label>
      );
    }
  }

  render() {
    return (
      <Host>
        {this.labelFunc()}
        <slot></slot>
        {formMessage(
          this.showValidationMessage ? (
            <gxg-form-message type="error" key="required-error">
              {this.validationMessage}
            </gxg-form-message>
          ) : null
        )}
      </Host>
    );
  }
}
