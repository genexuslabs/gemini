import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
  Watch,
  Method,
} from "@stencil/core";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { CheckboxInfo } from "../form-checkbox/form-checkbox";
import { formClasses } from "../../common/classesNames";
import { ValidationStatus } from "../../common/types";

@Component({
  tag: "gxg-form-checkbox-group",
  styleUrl: "gxg-form-checkbox-group.scss",
  shadow: true,
})
export class GxgFormCheckboxGroup implements FormComponent {
  @Element() el: HTMLGxgFormCheckboxGroupElement;

  /**
   * The presence of this attribute makes all the checkboxes disabled
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute makes the checkboxes be displayed with flex "row", instead of flex "column"
   */
  @Prop() row: boolean;

  /**
   * The validation status
   */
  @Prop({ mutable: true }) validationStatus: ValidationStatus = "indeterminate";

  /**
   * The required message if this input is required and no value is provided (optional). If this is not provided, the default browser required message will show up
   */
  @Prop({ mutable: true }) validationMessage: string;

  /**
   * An informative message to help the user filling the information
   */
  @Prop() informationMessage: string;

  @Event() groupValuesChanged: EventEmitter<CheckboxesGroupValues>;

  @Watch("disabled")
  watchDisabledHandler(disabled: boolean) {
    if (disabled) {
      this.disableGroup();
    } else {
      this.enableGroup();
    }
  }

  /**
   * Returns CheckboxesGroupValues = CheckboxInfo[];
   */
  @Method()
  async getValues(): Promise<CheckboxesGroupValues> {
    return this.getCheckboxesInfo();
  }

  componentWillLoad() {
    if (this.disabled) {
      this.disableGroup();
    }
  }

  @Listen("change")
  changeHandler(event: CustomEvent<CheckboxInfo>) {
    if (!event.detail.disabled) {
      //If it was changed because it is disabled, do not emit
      const checkboxesGroupInfo = this.getCheckboxesInfo();
      this.groupValuesChanged.emit(checkboxesGroupInfo);
    }
  }

  private getCheckboxesInfo = (): CheckboxesGroupValues => {
    const checkboxesArray: CheckboxesGroupValues = [];
    const checkboxes = this.el.querySelectorAll("gxg-form-checkbox");
    checkboxes.forEach((checkbox) => {
      checkboxesArray.push({
        id: checkbox.checkboxId,
        value: checkbox.checked,
        disabled: checkbox.disabled,
      });
    });
    return checkboxesArray;
  };

  private disableGroup = () => {
    const allCheckboxes = this.el.querySelectorAll("gxg-form-checkbox");
    allCheckboxes.forEach((checkbox: HTMLGxgFormCheckboxElement) => {
      checkbox.disabled = true;
    });
  };

  private enableGroup = () => {
    const allCheckboxes = this.el.querySelectorAll("gxg-form-checkbox");
    allCheckboxes.forEach((checkbox: HTMLGxgFormCheckboxElement) => {
      checkbox.disabled = false;
    });
  };

  render() {
    return (
      <Host>
        <div
          class={{
            "checkboxes-wrapper": true,
            "checkboxes-wrapper--row": this.row,
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
          <slot></slot>
        </div>
        {formMessageLogic(this)}
      </Host>
    );
  }
}

export type CheckboxesGroupValues = CheckboxInfo[];
