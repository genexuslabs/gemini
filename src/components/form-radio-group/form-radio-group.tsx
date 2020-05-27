import { Component, Prop, h, Listen, Element, Host } from "@stencil/core";

@Component({
  tag: "gxg-form-radio-group",
  styleUrl: "form-radio-group.scss",
  shadow: true
})
export class FormRadioGroup {
  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * Selected Radio id
   */
  @Prop({ reflect: true }) RadioId: string;

  /**
   * Inline-flex display
   */
  @Prop() inlineFlex = false;

  /**
   * The label for the Radio Group
   */
  @Prop() label: string;

  /**
   * Selected Radio value
   */
  @Prop({ reflect: true }) RadioValue: string;

  /*********************************
  METHODS
  *********************************/

  @Listen("keyPressed")
  keyPressedHandler(event: CustomEvent) {
    if (event.detail === "tab") {
      //tab key was pressed, set
    }
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

  @Listen("change")
  radioClickedHandler(event: CustomEvent) {
    this.RadioId = event.detail["id"];
    this.RadioValue = event.detail["value"];

    const radioButtonsNodeList = this.el.querySelectorAll("gxg-form-radio");

    radioButtonsNodeList.forEach(function(currentRadio) {
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

  labelFunc() {
    if (this.label) {
      return <span class="label">{this.label}</span>;
    }
  }

  render() {
    return (
      <Host>
        {this.labelFunc()}
        <slot></slot>
      </Host>
    );
  }
}
