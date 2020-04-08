import { Component, Prop, Element, h } from "@stencil/core";

@Component({
  tag: "gxg-form-input-checkboxes",
  styleUrl: "form-input-checkboxes.scss",
  shadow: true
})
export class FormInputCheckboxes {
  /**
   * The checkboxes options
   */
  @Prop() options: object;

  /**
   * If checkboxes should display inline
   */
  @Prop() inline = false;

  @Element() el: HTMLElement;
  componentDidLoad() {
    const cmp = this.el;
    const checkboxes = JSON.parse(cmp.getAttribute("options"));

    const arrayOptions = [];

    checkboxes.forEach(function(checkbox) {
      //create label
      const label = document.createElement("label");
      label.innerText = checkbox.label;
      label.setAttribute("for", checkbox.id);
      label.setAttribute("class", "label");

      //create .radiobtn
      const span = document.createElement("span");
      span.setAttribute("class", "checkmark");

      //create radiobutton
      const inptCheckbox = document.createElement("input");
      inptCheckbox.setAttribute("class", "input");
      inptCheckbox.setAttribute("type", "checkbox");
      inptCheckbox.setAttribute("name", checkbox.name);
      inptCheckbox.setAttribute("id", checkbox.id);
      inptCheckbox.setAttribute("value", checkbox.value);

      //if disabled...
      if (checkbox.disabled) {
        inptCheckbox.setAttribute("disabled", "disabled");
      }

      //if checked...
      if (checkbox.checked) {
        inptCheckbox.setAttribute("checked", "checked");
      }

      //append checkbox into label
      label.insertBefore(span, label.firstChild);
      label.insertBefore(inptCheckbox, label.firstChild);

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
