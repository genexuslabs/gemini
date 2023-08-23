import { ValidationStatus } from "./types";
export interface FormComponent {
  disabled: boolean;
  validationStatus: ValidationStatus;
  validationMessage: string;
  informationMessage?: string;
}
