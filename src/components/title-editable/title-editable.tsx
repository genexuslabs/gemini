import {
  Component,
  Host,
  h,
  Prop,
  Element,
  State,
  Watch,
  Event,
  EventEmitter
} from "@stencil/core";
import { formTooltipLogic } from "../../common/form";
import { formClasses } from "../../common/classesNames";
import { FormComponent } from "../../common/interfaces";
import { commonClassesNames } from "../../common/classesNames";
import { detectClickOutside } from "../../common/detect-click-outside";
import { ValidationStatus } from "../../common/types";

@Component({
  tag: "gxg-title-editable",
  styleUrl: "title-editable.scss",
  shadow: true
})
export class GxgTitleEditable implements FormComponent {
  textInput!: HTMLInputElement;
  wrapperEl!: HTMLDivElement;
  editButtonEl!: HTMLGxgButtonElement;
  ghostDiv!: HTMLDivElement;
  @Element() el: HTMLElement;

  private timeoutReference;

  /*PROPS*/

  /**
   * The title value
   */
  @Prop({ mutable: true }) value: string = undefined;
  @Watch("value")
  watchValueHandler(newValue): void {
    if (this.debounce) {
      clearTimeout(this.timeoutReference);
      this.timeoutReference = setTimeout(() => {
        this.valueChanged.emit(newValue);
      }, this.debounceDelay);
    } else {
      this.valueChanged.emit(newValue);
    }
  }

  /**
   * The title type
   */
  @Prop({ reflect: true }) titleType: EditableTitleType = "h1";

  /**
   * If true, the title will not be editable
   */
  @Prop({ reflect: true }) disableEdition = false;

  /**
   * The presence of this attribute activates a debounce for the valueChanged event. This will cause the event to be emitted after 'debounceDelay' time.
   */
  @Prop() debounce = false;

  /**
   * The debounce delay value. Only applies if 'debounce' is true.
   */
  @Prop() debounceDelay = 800;

  /**
   * The presence of this attribute makes the input disabled
   */
  @Prop() disabled = false;

  /**
   * If true, it will allow the title to be edited
   */
  @Prop({ reflect: true }) clickToEdit = false;

  /**
   * If true, the width of the title will take only the minimum needed space
   */
  @Prop({ reflect: true }) fluid = false;

  /**
   * If true, the width of the title will take only the minimum needed space
   */
  @Prop({ reflect: true }) focusType: EditableTitleFocusType;

  /*--- Validation ---*/

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
   * Shows or hides the tooltip
   */
  @Prop() hideTooltip = false;

  /*STATE*/

  @State() editing = false;
  @Watch("editing")
  watchEditingHandler(editing: boolean): void {
    if (editing) {
      document.addEventListener("click", this.detectClickOutsideFunc);
    } else {
      document.removeEventListener("click", this.detectClickOutsideFunc);
    }
  }

  /* EVENTS */
  /**
   * Emitted when the value changes
   */
  @Event() valueChanged: EventEmitter<string>;

  /*COMPONENT LIFECYCLE METHODS*/

  componentDidLoad(): void {
    if (this.fluid) {
      this.inputInputHandler();
    }
  }

  /*PRIVATE METHODS*/

  private edit = (): void => {
    this.editing = true;
    this.positionCursorAtTheEnd();
  };

  private wrapperClickedHandler = (): void => {
    this.editing = true;
  };

  private positionCursorAtTheEnd = (): void => {
    this.textInput.selectionStart = this.textInput.selectionEnd =
      this.textInput.value.length;
    this.textInput.focus();
  };

  private inputKeyDownHandler = (e: KeyboardEvent): void => {
    if (e.key === "Enter" || e.key === "Escape") {
      e.preventDefault();
      this.editing = false;
      this.editButtonEl.focus();
    } else if (this.fluid) {
      this.setInputWidth();
    }
  };

  private detectClickOutsideFunc = (e: MouseEvent): void => {
    const clickedOutside = detectClickOutside(e, this.wrapperEl);
    if (clickedOutside) {
      this.editing = false;
    }
  };

  private setInputWidth = (): void => {
    this.textInput.style.width = this.value.length + 1 + "ch";
  };

  private inputInputHandler = (): void => {
    this.value = this.textInput.value;
    if (this.fluid) {
      this.ghostDiv.innerText = this.value;
      this.updateInputWidth();
    }
  };

  private updateInputWidth = (): void => {
    if (this.fluid) {
      const ghostDivWidth = this.ghostDiv.getBoundingClientRect().width;
      this.textInput.style.width = `${ghostDivWidth}px`;
    }
  };

  /*RENDER*/

  render(): void {
    return (
      <Host
        class={{
          editing: this.editing,
          "focus--text": this.focusType === "text",
          "focus--line": this.focusType === "line",
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
        <div
          onMouseUp={
            this.clickToEdit &&
            !this.editing &&
            !this.disableEdition &&
            this.wrapperClickedHandler
          }
          class={{
            wrapper: true
          }}
          ref={el => (this.wrapperEl = el as HTMLDivElement)}
        >
          {this.fluid ? (
            <div
              class="ghost"
              ref={el => (this.ghostDiv = el as HTMLDivElement)}
            ></div>
          ) : null}
          <input
            type="text"
            value={this.value}
            readOnly={!this.editing}
            ref={el => (this.textInput = el as HTMLInputElement)}
            onKeyDown={this.inputKeyDownHandler}
            onInput={this.inputInputHandler}
            tabIndex={this.editing ? 0 : -1}
          />
          <div class="right-wrapper">
            {!this.disableEdition ? (
              <gxg-button
                type="secondary-icon-only"
                icon="gemini-tools/edit"
                onClick={this.edit}
                ref={el => (this.editButtonEl = el as HTMLGxgButtonElement)}
              ></gxg-button>
            ) : null}
            {formTooltipLogic(this, this.hideTooltip)}
          </div>
        </div>
      </Host>
    );
  }
}

export type EditableTitleType = "h1" | "h2" | "h3" | "h4";

export type EditableTitleFocusType = "text" | "line";
