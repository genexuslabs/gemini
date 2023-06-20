export interface DisableableComponent {
  disabled: boolean;
}
export interface FormComponent extends DisableableComponent {
  required: boolean;
  validationStatus: "indeterminate" | "warning" | "error" | "success";
  validate: () => Promise<boolean>;
  validateOnInput?: boolean;
  validateOnChange?: boolean;
  displayValidationStyles: boolean;
  displayValidationMessage: boolean;
  validationMessage: string;
  informationMessage: string;
  emmitValidation?: boolean;
  warningCondition?: Function;
  errorCondition?: Function;
  handleError: Function;
  handleWarning: Function;
  formMessageLogic: Function;
}
