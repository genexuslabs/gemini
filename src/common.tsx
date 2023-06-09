import { h } from "@stencil/core";

interface FormComponent {
  error: boolean;
  showValidationMessage: boolean;
  validationMessage: string | undefined;
}

function requiredLabel(component) {
  if (component.required) {
    return <span class="required">*</span>;
  }
}

function formMessage(children?: JSX.Element) {
  /* The following snipet of jsx is intended to be inserted at the end of every form-x component.
  The purpose of this jsx snippet is to show error or warning messages,
  inserted on the "message" slot with a gxg-form-message component
  */
  console.log(children);
  return (
    <div class="messages-wrapper" role="alert" aria-live="assertive">
      {children}
    </div>
  );
}

function formHandleChange(
  component: FormComponent,
  formElement: HTMLInputElement | HTMLTextAreaElement
) {
  const hasError = !formElement.validity.valid;
  component.error = hasError;
  if (hasError) {
    component.validationMessage =
      component.validationMessage || formElement.validationMessage;
  }
}

export { requiredLabel, formHandleChange, formMessage, FormComponent };
