import {
  Component,
  Prop,
  h,
  Listen,
  Element,
  Host,
  Event,
  EventEmitter,
  Watch,
} from "@stencil/core";
import { requiredLabel, formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { ValidationStatus } from "../../common/types";
import { RadioData } from "../form-radio/form-radio";
@Component({
  tag: "gxg-form-radio-group",
  styleUrl: "form-radio-group.scss",
  shadow: true,
})
export class GxgFormRadioGroup implements FormComponent {
  showValidationMessage = false;
  private valueBeforeDisabled;
  private _componentDidLoad = false;

  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * Centers the radios if 'row' is true
   */
  @Prop() center = false;

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
   */
  @Prop() informationMessage: string;

  /**
   * Emits the value when is changed, and the radio id.
   */
  @Event() change: EventEmitter<RadioData>;

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
  watchValueHandler(newValue: string): void {
    const newCheckedRadio: HTMLGxgFormRadioElement = this.getCheckboxByValue(
      newValue
    );
    this.uncheckAll(newCheckedRadio);
    if (this._componentDidLoad) {
      //_componentDidLoad prevents change event being emitted the first time.
      this.change.emit({
        id: newCheckedRadio.radioId,
        value: this.value,
      });
    }
  }

  @Listen("radioChecked")
  radioCheckedHandler(radioInfo: CustomEvent<RadioData>) {
    this.value = radioInfo.detail.value;
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

  componentWillLoad(): void {
    if (this.disabled) {
      this.disableAllRadios();
    }
    this.setValue();
  }

  componentDidLoad() {
    this._componentDidLoad = true;
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

  private uncheckAll = (checkedRadio: HTMLGxgFormRadioElement): void => {
    const enabledRadios = this.getEnabledRadios();
    if (enabledRadios.length) {
      enabledRadios.forEach((radio) => {
        if (checkedRadio !== radio && radio.checked) radio.checked = false;
      });
    }
  };

  private setValue = (): void => {
    const enabledRadios = this.getEnabledRadios();
    let checkedRadio: HTMLGxgFormRadioElement;
    enabledRadios.forEach((radio) => {
      if (!radio.disabled && !checkedRadio) {
        !checkedRadio && radio.checked && (checkedRadio = radio);
      }
    });
    if (this.value && checkedRadio) {
      //verify if they coincide
      if (this.value !== checkedRadio.value) {
        //value then is the checked radio value
        this.value = checkedRadio.value;
      }
    } else if (this.value && !checkedRadio) {
      const foundRadio: HTMLGxgFormRadioElement = enabledRadios.find(
        (radio) => {
          return radio.value === this.value;
        }
      );
      if (foundRadio) {
        foundRadio.checked = true;
      } else {
        //there is no radio with the provided value. Set first radio checked.
        this.value = enabledRadios[0].value;
        enabledRadios[0].checked = true;
      }
    } else if (!this.value && checkedRadio) {
      //Value should be the checked radio value
      this.value = checkedRadio.value;
    } else {
      //no value, no checked radio - set the first radio.
      this.value = enabledRadios[0].value;
      enabledRadios[0].checked = true;
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

  private getEnabledRadios = (): HTMLGxgFormRadioElement[] => {
    const allRadios = this.el.querySelectorAll("gxg-form-radio");
    const enabledRadios: HTMLGxgFormRadioElement[] = [];
    allRadios.forEach((radio) => {
      if (!radio.disabled) {
        enabledRadios.push(radio);
      }
    });
    return enabledRadios;
  };

  private getCheckboxByValue = (value: string) => {
    const enabledRadios = this.getEnabledRadios();
    let radio: HTMLGxgFormRadioElement;
    if (enabledRadios.length) {
      radio = enabledRadios.find((radio) => {
        return radio.value === value;
      });
    }
    return radio;
  };

  render(): void {
    return (
      <Host
        class={{
          "gxg-form-radio-group": true,
          "gxg-form-radio-group--row": this.row,
          "gxg-form-radio-group--center": this.center && this.row,
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
