import { ValidationStatus } from "./types";

export interface DisableableComponent {
  disabled: boolean;
}
export interface FormComponent extends DisableableComponent {
  required: boolean;
  validationStatus: ValidationStatus;
  validationMessage: string;
  informationMessage: string;
}
