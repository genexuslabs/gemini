import {
  Component,
  Element,
  Host,
  Prop,
  h,
  Event,
  EventEmitter,
  Watch,
  State
} from "@stencil/core";
import { formMessageLogic } from "../../common/form";
import { FormComponent } from "../../common/interfaces";
import { formClasses } from "../../common/classesNames";
import { commonClassesNames } from "../../common/classesNames";
import state from "../store";
import { JSXElement } from "@babel/types";
import { exportParts } from "../../common/export-parts";
import { ValidationStatus } from "../../common/types";

@Component({
  tag: "gxg-form-checkbox",
  styleUrl: "form-checkbox.scss",
  shadow: { delegatesFocus: true }
})
export class GxgFormCheckbox implements FormComponent {
  private parts = {
    input: "input"
  };
  private exportparts: string;
  @Element() el: HTMLElement;

  //A reference to the input
  checkboxInput!: HTMLInputElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The checkbox id
   */
  @Prop() checkboxId: string;

  /**
   * The presence of this attribute makes the checkbox checked by default
   */
  @Prop({ reflect: false }) checked = false;

  /**
   * The presence of this attribute makes the checkbox indeterminate
   */
  @Prop({ reflect: true }) indeterminate = false;

  /**
   * The presence of this attribute disables the checkbox
   */
  @Prop() disabled = false;

  /**
   * The checkbox label
   */
  @Prop() label: string | undefined = undefined;

  /**
   * The checkbox value
   */
  @Prop() value: string;

  /**
   * The checkbox name
   */
  @Prop() name: string;

  /**
   * The checkbox icon
   */
  @Prop() iconName: string = undefined;

  /**
   * Aligns the checkbox to the top of the label (useful when the label is too long)
   */
  @Prop() alignTop = false;

  /**
   * The input has focus
   */
  @State() hasFocus = false;

  @Event() change: EventEmitter<CheckboxInfo>;

  /*VALIDATION*/

  /**
   * The presence of this attribute makes the commbo required
   */
  @Prop({ reflect: true }) required = false;

  /**
   * The validation status
   *
   */
  @Prop({ mutable: true }) validationStatus: ValidationStatus = "indeterminate";

  /**
   * The message to display when validation fails (error)
   *
   */
  @Prop() validationMessage: string;

  /**
   * An informative message to help the user filling the information
   *
   */
  @Prop() informationMessage: string;

  /*
   * An optional label tooltip (Useful if the label is too long).
   */
  @Prop() tooltip: string;

  /**
   * The logic for displaying or hidding the validation messages
   *
   */
  formMessageLogic = formMessageLogic;

  /*********************************
  METHODS
  *********************************/

  componentWillLoad() {
    this.attachExportParts();
  }

  private attachExportParts = (): void => {
    const part = this.el.getAttribute("part");
    const exportPartsResult = exportParts(part, this.parts);
    exportPartsResult.length && (this.exportparts = exportPartsResult);
  };

  compontentDidLoad() {
    if (this.checked && this.disabled) {
      this.checked = false;
      this.checkboxInput.removeAttribute("checked");
    }
  }

  changed() {
    this.checked = this.checkboxInput.checked;
  }

  @Watch("checked")
  checkedHandler() {
    this.change.emit({
      id: this.checkboxId,
      value: this.checked,
      disabled: this.disabled
    });
  }

  handlerOnKeyUp(event) {
    if (event.code == "Space") {
      this.checked = !this.checked;
    }
  }

  private handleGxgLabelClick = () => {
    this.checkboxInput.click();
  };

  ariaChecked() {
    if (this.checked) {
      return "true";
    } else {
      return "false";
    }
  }

  handleInputClick(e) {
    e.stopPropagation();
  }

  icon() {
    if (this.iconName) {
      return (
        <gxg-icon type={this.iconName} color="auto" size="small"></gxg-icon>
      );
    }
  }

  private focusHandler = () => {
    //this.hasFocus = true;
  };

  private blurHandler = () => {
    //this.hasFocus = false;
  };

  private renderCheckbox = (): JSXElement[] => {
    return [
      <input
        ref={el => (this.checkboxInput = el as HTMLInputElement)}
        type="checkbox"
        checked={this.checked}
        class="input"
        id={this.checkboxId}
        name={this.name}
        value={this.value}
        disabled={this.disabled}
        onChange={this.changed.bind(this)}
        onKeyUp={this.handlerOnKeyUp.bind(this)}
        onFocus={this.focusHandler}
        onBlur={this.blurHandler}
        tabindex="0"
        onClick={this.handleInputClick}
        part={this.parts.input}
      ></input>,
      <span
        part="box"
        class={{
          box: true,
          "no-label": !this.label,
          "has-icon": !!this.iconName,
          "form-element": true,
          indeterminate: this.indeterminate,
          checkbox: true
        }}
        role="checkbox"
      ></span>,
      this.icon()
    ];
  };

  render() {
    return (
      <Host
        role="checkbox"
        value={this.value}
        aria-checked={this.ariaChecked}
        aria-label={this.label}
        class={{
          large: state.large,
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
        exportParts={this.exportparts ? this.exportparts : null}
      >
        <div
          class={{
            "gxg-form-checkbox__wrapper": true,
            "gxg-form-checkbox__wrapper--align-top": this.alignTop
          }}
          onClick={this.handleGxgLabelClick}
        >
          {this.label ? (
            [
              <div
                class={{
                  wrapper: true,
                  "wrapper--checked": this.checked,
                  "wrapper--indeterminate": this.indeterminate,
                  "wrapper--focus": this.hasFocus,
                  "wrapper--has-icon": !!this.iconName
                }}
              ></div>,
              this.renderCheckbox(),
              <gxg-label
                class={{
                  label: true,
                  "label--has-icon": !!this.iconName
                }}
                disabled={this.disabled}
                labelPosition="end"
                tooltip={this.tooltip}
                noMargin={!!this.iconName}
              >
                {this.label}
              </gxg-label>
            ]
          ) : (
            <div class="wrapper">{this.renderCheckbox()}</div>
          )}
        </div>
        {this.formMessageLogic(this)}
      </Host>
    );
  }
}

export type CheckboxInfo = {
  id: string;
  value: boolean;
  disabled?: boolean;
};
