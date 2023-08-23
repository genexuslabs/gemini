import {
  Component,
  Prop,
  h,
  Listen,
  Element,
  Host,
  Watch,
} from "@stencil/core";
import { requiredLabel, formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { ValidationStatus } from "../../common/types";
@Component({
  tag: "gxg-form-radio-group",
  styleUrl: "form-radio-group.scss",
  shadow: true,
})
export class GxgFormRadioGroup implements FormComponent {
  showValidationMessage = false;
  private valueBeforeDisabled;

  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The presence of this attribute makes the input disabled
   */
  @Prop() disabled = false;

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

  /*VALIDATION*/

  formMessageLogic = formMessageLogic;

  /**
   * Make the radio-buttons required
   */
  @Prop() required = false;

  /**
   * The validation status
   *
   */
  @Prop({ mutable: true }) validationStatus: ValidationStatus = "indeterminate";

  /**
   * An informative message to help the user filling the information
   *
   */
  @Prop() informationMessage: string;

  /*********************************
  METHODS
  *********************************/

  @Watch("disabled")
  disabledHandler(newValue): void {
    if (newValue === true) {
      this.disableAllRadios();
      this.valueBeforeDisabled = this.value;
      this.value = null;
    } else {
      this.value = this.valueBeforeDisabled;
      this.enableAllRadios();
    }
  }

  @Watch("value")
  watchValueHandler(): void {
    this.uncheckAll();
    this.setNewRadio();
  }

  @Listen("keyPressed")
  keyPressedHandler(event: CustomEvent): void {
    const key = event.detail;
    const currentRadio = event.target;
    let newRadio = null;
    const radiosArray = Array.from(
      this.el.querySelectorAll("gxg-form-radio:not([disabled])")
    );
    const currentRadioIndex = radiosArray.findIndex((radio) => {
      return currentRadio === radio;
    });
    if (currentRadioIndex !== -1) {
      if (key === "ArrowDown" || key === "ArrowRight") {
        if (currentRadioIndex + 1 < radiosArray.length) {
          newRadio = radiosArray[currentRadioIndex + 1];
        }
      } else if (key === "ArrowUp" || key === "ArrowLeft") {
        if (currentRadioIndex - 1 < radiosArray.length) {
          newRadio = radiosArray[currentRadioIndex - 1];
        }
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
  }

  @Listen("radioClicked")
  radioClickedHandler(event: CustomEvent): void {
    this.value = (event.target as HTMLGxgFormRadioElement).value;
  }

  componentWillLoad(): void {
    if (this.disabled) {
      this.disableAllRadios();
    }
  }

  componentDidLoad(): void {
    this.setInitialValue();
  }

  renderLabel(): void {
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
    const radios = this.el.querySelectorAll("gxg-form-radio:not([disabled])");
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
          "gxg-form-radio:not([disabled]"
        ) as HTMLGxgFormRadioElement;
      } else {
        newRadio = this.el.querySelector(
          "gxg-form-radio[checked]:not([disabled]"
        ) as HTMLGxgFormRadioElement;
      }
      if (newRadio && newRadio.value) {
        this.value = newRadio.value;
      }
    }
  };

  private disableAllRadios = (): void => {
    if (this.disabled) {
      const radios = this.el.querySelectorAll("gxg-form-radio");
      radios.forEach((radio) => {
        (radio as HTMLGxgFormRadioElement).disabled = true;
      });
    }
  };

  private enableAllRadios = (): void => {
    if (!this.disabled) {
      const radios: NodeListOf<HTMLGxgFormRadioElement> = this.el.querySelectorAll(
        "gxg-form-radio"
      );
      radios.forEach((radio) => {
        radio.disabled = false;
        if (radio.value === this.value) {
          radio.checked = true;
        }
      });
    }
  };

  render(): void {
    return (
      <Host
        class={{
          "gxg-form-radio-group": true,
          "gxg-form-radio-group--row": this.row,
          [formClasses["VALIDATION_INDETERMINATE_CLASS"]]:
            this.validationStatus === "indeterminate",
          [formClasses["VALIDATION_WARNING_CLASS"]]:
            this.validationStatus === "warning",
          [formClasses["VALIDATION_ERROR_CLASS"]]:
            this.validationStatus === "error",
          [formClasses["VALIDATION_SUCCESS_CLASS"]]:
            this.validationStatus === "success",
        }}
      >
        {this.renderLabel()}
        <div class="radios-wrapper">
          <slot></slot>
        </div>
        {formMessageLogic(this)}
      </Host>
    );
  }
}
