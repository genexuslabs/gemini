import { h } from "@stencil/core";

interface FormComponent {
  error: boolean;
  isRequiredError: boolean;
  requiredMessage: string;
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
  return (
    <div class="messages-wrapper" role="alert" aria-live="assertive">
      <slot name="message"></slot>
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
  component.isRequiredError = component.error;
  //If validity is false, show message
  if (hasError) {
    component.requiredMessage =
      component.requiredMessage || formElement.validationMessage;
  }
}

export { requiredLabel, formHandleChange, formMessage, FormComponent };
