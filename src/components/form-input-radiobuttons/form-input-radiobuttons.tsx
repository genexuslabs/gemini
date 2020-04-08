import { Component, Prop, Element } from "@stencil/core";

@Component({
  tag: "gxg-form-input-radiobuttons",
  styleUrl: "form-input-radiobuttons.scss",
  shadow: true
})
export class FormInputRadioButtons {
  /**
   * The radio buttons options
   */
  @Prop() options: object;

  /**
   * If radio buttons should display inline
   */
  @Prop() inline = false;

  @Element() el: HTMLElement;
  componentDidLoad() {
    const cmp = document.querySelector("gxg-form-input-radiobuttons");
    const radioButtons = JSON.parse(cmp.getAttribute("options"));

    const arrayOptions = [];

    radioButtons.forEach(function(radiobutton) {
      //create .radiobtn
      const span = document.createElement("span");
      span.setAttribute("class", "radiobtn");

      //create label
      const label = document.createElement("label");
      label.innerText = radiobutton.label;
      label.setAttribute("for", radiobutton.id);
      label.setAttribute("class", "label");

      //create radiobutton
      const radio = document.createElement("input");
      radio.setAttribute("type", "radio");
      radio.setAttribute("name", radiobutton.name);
      radio.setAttribute("id", radiobutton.id);
      radio.setAttribute("value", radiobutton.value);

      //if disabled...
      if (radiobutton.disabled) {
        radio.setAttribute("disabled", "disabled");
      }

      //if checked...
      if (radiobutton.checked) {
        radio.setAttribute("checked", "checked");
      }

      //append radio button into label
      label.insertBefore(span, label.firstChild);
      label.insertBefore(radio, label.firstChild);

      arrayOptions.push(label);
    });

    arrayOptions.forEach(element => {
      this.el.shadowRoot.querySelector(".outer-wrapper").appendChild(element);
    });
  }

  render() {
    return [
      <div class="outer-wrapper"></div>,
      <div class="messages-wrapper"></div>
    ];
  }
}
