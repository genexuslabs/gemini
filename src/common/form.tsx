import { h } from "@stencil/core";
import { FormComponent } from "../common/interfaces";

// interface FormComponent {
//   error: boolean;
//   hideValidationMessage: boolean;
//   validationMessage: string | undefined;
// }

function requiredLabel(component): JSX.Element {
  if (component.required) {
    return <span class="required">*</span>;
  }
}

function formMessage(children?: JSX.Element[]): JSX.Element {
  /* The following snipet of jsx is intended to be inserted at the end of every form-x component.
  The purpose of this jsx snippet is to show error or warning messages,
  inserted on the "message" slot with a gxg-form-message component
  */
  return (
    <div class="messages-wrapper" role="alert" aria-live="assertive">
      {children}
    </div>
  );
}

function formHandleValidation(
  component: FormComponent,
  formElement: HTMLInputElement | HTMLTextAreaElement
): boolean {
  const hasError = !formElement.validity.valid;
  if (hasError) {
    component.validationMessage =
      component.validationMessage || formElement.validationMessage;
    return true;
  } else {
    return false;
  }
}

function formMessageLogic(comp: FormComponent): JSX.Element {
  {
    return comp.informationMessage ||
      (comp.displayValidationMessage &&
        comp.validationStatus === ("error" || "warning"))
      ? formMessage([
          comp.informationMessage ? (
            <gxg-form-message type="indeterminate">
              {comp.informationMessage}
            </gxg-form-message>
          ) : null,
          comp.validationStatus === ("error" || "warning") ? (
            <gxg-form-message type={comp.validationStatus}>
              {comp.validationMessage}
            </gxg-form-message>
          ) : null,
        ])
      : null;
  }
}

export {
  requiredLabel,
  formHandleValidation,
  formMessage,
  formMessageLogic,
  FormComponent,
};
