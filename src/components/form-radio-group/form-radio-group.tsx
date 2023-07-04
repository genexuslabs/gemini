import {
  Component,
  Prop,
  h,
  Listen,
  Element,
  Host,
  Watch,
} from "@stencil/core";
import { requiredLabel, formMessage } from "../../common/form";
import { GxgFormRadio } from "../form-radio/form-radio";
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
   * The radio group checked radio value
   */
  @Prop({ reflect: true }) value: string;

  /**
   * The presence of this attribute makes the radios be displayed with flex "row", instead of flex "column"
   */
  @Prop() row: boolean;

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

  @Watch("value")
  watchValueHandler(newValue: string) {
    this.uncheckAll();
    this.setNewRadio();
  }

  @Listen("keyPressed")
  keyPressedHandler(event: CustomEvent) {
    const key = event.detail;
    const currentRadio = event.target;
    let newRadio = null;
    if (key === "ArrowDown" || key === "ArrowRight") {
      newRadio = (currentRadio as HTMLGxgFormRadioElement).nextElementSibling;
    } else if (key === "ArrowUp" || key === "ArrowLeft") {
      newRadio = (currentRadio as HTMLGxgFormRadioElement)
        .previousElementSibling;
    } else if (key === "Enter") {
      const gxgFormRadio = currentRadio as HTMLGxgFormRadioElement;
      if (!gxgFormRadio.checked) {
        this.value = gxgFormRadio.value;
      }
    }
    if (newRadio) {
      newRadio.focus();
    }
  }

  @Listen("radioClicked")
  radioClickedHandler(event: CustomEvent): void {
    this.value = (event.target as HTMLGxgFormRadioElement).value;
  }

  componentDidLoad() {
    this.setInitialValue();
  }

  renderLabel() {
    if (this.label) {
      return (
        <gxg-label class="label">
          {this.label}
          {requiredLabel(this)}
        </gxg-label>
      );
    }
  }

  private uncheckAll = (): void => {
    const currentChecked = this.el.querySelectorAll("gxg-form-radio[checked]");
    currentChecked.forEach((radio) => {
      (radio as HTMLGxgFormRadioElement).checked = false;
    });
  };

  private setNewRadio = (): void => {
    const radios = this.el.querySelectorAll("gxg-form-radio");
    for (let index = 0; index < radios.length; index++) {
      const gxgFormRadio = radios[index] as HTMLGxgFormRadioElement;
      if (this.value === gxgFormRadio.value) {
        gxgFormRadio.checked = true;
        break;
      }
    }
  };

  private setInitialValue = (): void => {
    const checkedRadios = this.el.querySelectorAll("gxg-form-radio[checked]");
    if (this.value) {
      if (checkedRadios.length > 0) {
        this.uncheckAll();
      }
      this.setNewRadio();
    } else {
      let newRadio = null;
      if (checkedRadios.length === 0) {
        newRadio = this.el.querySelector(
          "gxg-form-radio"
        ) as HTMLGxgFormRadioElement;
      } else {
        newRadio = this.el.querySelector(
          "gxg-form-radio[checked]"
        ) as HTMLGxgFormRadioElement;
      }
      if (newRadio && newRadio.value) {
        this.value = newRadio.value;
      }
    }
  };

  render() {
    return (
      <Host
        class={{
          "gxg-form-radio-group": true,
          "gxg-form-radio-group--row": this.row,
        }}
      >
        {this.renderLabel()}
        <div class="radios-wrapper">
          <slot></slot>
        </div>
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
