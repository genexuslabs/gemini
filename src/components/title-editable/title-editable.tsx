import { Component, Host, h, Prop, Element, State, Watch } from "@stencil/core";
import { detectClickOutside } from "../../common/detect-click-outside";

@Component({
  tag: "gxg-title-editable",
  styleUrl: "title-editable.scss",
  shadow: true,
})
export class GxgTitleEditable {
  textInput!: HTMLInputElement;
  wrapperEl!: HTMLDivElement;
  editButtonEl!: HTMLGxgButtonElement;
  ghostDiv!: HTMLDivElement;
  @Element() el: HTMLElement;

  /*PROPS*/

  /**
   * The title value
   */
  @Prop() value: string = undefined;

  /**
   * The title type
   */
  @Prop({ reflect: true }) titleType: EditableTitleType = "h1";

  /**
   * If true, the title will not be editable
   */
  @Prop({ reflect: true }) disableEdition = false;

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
    this.textInput.selectionStart = this.textInput.selectionEnd = this.textInput.value.length;
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
    if (this.fluid) {
      this.value = this.textInput.value;
      this.ghostDiv.innerText = this.value;
      this.updateInputWidth();
    }
  };

  private updateInputWidth = (): void => {
    if (this.fluid) {
      const ghostDivWidth = this.ghostDiv.getBoundingClientRect().width;
      console.log(ghostDivWidth);
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
            wrapper: true,
          }}
          ref={(el) => (this.wrapperEl = el as HTMLDivElement)}
        >
          {this.fluid ? (
            <div
              class="ghost"
              ref={(el) => (this.ghostDiv = el as HTMLDivElement)}
            ></div>
          ) : null}
          <input
            type="text"
            value={this.value}
            readOnly={!this.editing}
            ref={(el) => (this.textInput = el as HTMLInputElement)}
            onKeyDown={this.inputKeyDownHandler}
            onInput={this.fluid && this.inputInputHandler}
            tabIndex={this.editing ? 0 : -1}
          />
          {!this.disableEdition ? (
            <gxg-button
              type="secondary-icon-only"
              icon="gemini-tools/edit"
              onClick={this.edit}
              ref={(el) => (this.editButtonEl = el as HTMLGxgButtonElement)}
            ></gxg-button>
          ) : null}
        </div>
      </Host>
    );
  }
}

export type EditableTitleType = "h1" | "h2" | "h3";

export type EditableTitleFocusType = "text" | "line";
