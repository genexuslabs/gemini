import { Component, Host, h, Prop } from "@stencil/core";
import { ValidationStatus } from "../../common/types";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { commonClassesNames } from "../../common/classesNames";
@Component({
  tag: "gxg-suggest",
  styleUrl: "styles.scss",
  shadow: false
})
export class GxgSuggest implements FormComponent {
  /* VALIDATION */

  /**
   * The validation status
   */
  @Prop({ mutable: true }) validationStatus: ValidationStatus = "indeterminate";

  /**
   * The message to display for the validation result.
   */
  @Prop() validationMessage: string;

  /**
   * The presence of this attribute makes the suggest disabled.
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute forces the suggest list items to not wrap to a second line, and it will display ellipsis. (...)
   */
  @Prop({ reflect: true }) ellipsis = true;

  render() {
    return (
      <Host
        class={{
          [formClasses["VALIDATION_INDETERMINATE_CLASS"]]:
            this.validationStatus === "indeterminate",
          [formClasses["VALIDATION_WARNING_CLASS"]]:
            this.validationStatus === "warning",
          [formClasses["VALIDATION_ERROR_CLASS"]]:
            this.validationStatus === "error",
          [formClasses["VALIDATION_SUCCESS_CLASS"]]:
            this.validationStatus === "success",
          [commonClassesNames["DISABLED_CLASS"]]: this.disabled
        }}
      >
        <slot></slot>
        {formMessageLogic(this)}
      </Host>
    );
  }
}
