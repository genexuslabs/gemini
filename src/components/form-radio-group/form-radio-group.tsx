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

  @Listen("change")
  radioClickedHandler(event: CustomEvent) {
    this.RadioId = event.detail["id"];
    this.RadioValue = event.detail["value"];

    const radioButtonsNodeList = this.el.querySelectorAll("gxg-form-radio");

    radioButtonsNodeList.forEach(function(currentRadio) {
      if (event.detail["id"] === currentRadio.getAttribute("radio-id")) {
        currentRadio.setAttribute("checked", "checked");
      } else {
        currentRadio.removeAttribute("checked");
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
