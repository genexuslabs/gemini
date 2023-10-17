import { h } from "@stencil/core";
import { FormComponent } from "../common/interfaces";
import { Color } from "../components/icon/icon";

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
      (!comp.disabled &&
        comp.validationMessage &&
        (comp.validationStatus === "error" ||
          comp.validationStatus === "warning" ||
          comp.validationStatus === "success"))
      ? formMessage([
          comp.informationMessage ? (
            <gxg-form-message type="indeterminate">
              {comp.informationMessage}
            </gxg-form-message>
          ) : null,
          comp.validationStatus === "error" ||
          comp.validationStatus === "warning" ||
          comp.validationStatus === "success" ? (
            <gxg-form-message type={comp.validationStatus}>
              {comp.validationMessage}
            </gxg-form-message>
          ) : null,
        ])
      : null;
  }
}

export function formTooltipLogic(
  comp: FormComponent,
  hideTooltip: boolean
): JSX.Element {
  {
    const show =
      comp.validationStatus !== "indeterminate" &&
      comp.validationMessage.length > 0;
    const color: Color = comp.validationStatus;
    return (
      // <div class="tooltip-outer-wrapper">
      <div
        class={{
          "tooltip-inner-wrapper": true,
          "tooltip-inner-wrapper--visible": show,
          "tooltip--hidden": hideTooltip,
        }}
      >
        <gxg-tooltip
          label={comp.validationMessage}
          noBorder
          alignEnd
          flex
          fixed
        >
          <gxg-icon
            color={color}
            type={`gemini-tools/${comp.validationStatus}`}
          ></gxg-icon>
        </gxg-tooltip>
      </div>
      // </div>
    );
  }
}

export {
  requiredLabel,
  formHandleValidation,
  formMessage,
  formMessageLogic,
  FormComponent,
};
