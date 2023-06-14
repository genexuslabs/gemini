import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  State,
  Listen,
} from "@stencil/core";
//import { requiredLabel, formMessage } from "../../common.js";
import state from "../store.js";

@Component({
  tag: "gxg-select-v2",
  styleUrl: "select-v2.scss",
  shadow: { delegatesFocus: true },
})
export class FormSelectV2 {
  slottedContent!: HTMLCollection;
  @Element() el: HTMLElement;
  selectedValueRef!: HTMLDivElement;

  /********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The select label
   */
  @Prop() label: string = undefined;

  /**
   * The label position
   */
  @Prop() labelPosition: LabelPosition = "above";

  /**
   * The presence of this attribute makes this input required
   */
  @Prop() required = false;

  /**
   * The maximum number of visible options
   */
  @Prop() size: string;

  /**
   * This holds the value of the selected option
   */
  @Prop() value: string = undefined;

  /**
   * The select width
   */
  @Prop() width = "100%";

  /**
   * The select min. width
   */
  @Prop() minWidth = undefined;

  /**
   * The select max. width
   */
  @Prop() maxWidth = undefined;

  /**
   * The presence of this attribute disables the component
   */
  @Prop() disabled = false;

  /**
   * The presence of this attribute stylizes the component with warning attributes
   */
  @Prop() warning = false;

  /**
   * The presence of this attribute stylizes the component with error attributes
   */
  @Prop() error = false;

  /**
   * Returns the value of the selected option
   */
  @Event() change: EventEmitter;

  /**
   * If true, the select options are visible
   */
  @State() visible = false;

  @State() myObserver = null;

  private detectClickOutsideSelect = this.detectClickOutsideSelectFunc.bind(
    this
  );
  private detectMouseScroll = this.detectMouseScrollFunc.bind(this);

  @Listen("optionIsSelected")
  optionIsSelectedHandler(event) {
    this.value = event.detail;
  }

  handlerOnKeyDown(event) {
    if (event.keyCode == 9) {
      //tab key was pressed
      if (event.shiftKey) {
        //shift key was also pressed
        (this.el.previousSibling.previousSibling as HTMLElement).focus();
      }
    }
  }

  selectedValue() {
    let selectedOption = undefined;
    const activeOption = this.el.querySelector("gxg-option-v2[selected]");
    if (activeOption) {
      selectedOption = activeOption;
    } else {
      //show the first
      selectedOption = this.el.querySelector("gxg-option-v2");
    }
    return (selectedOption as HTMLElement).innerText;
  }

  detectClickOutsideSelectFunc(event) {
    const comboMainContainer = this.el.shadowRoot.querySelector(
      ".main-container"
    ) as HTMLElement;

    const x = event.x;
    const y = event.y;

    //Contextual menu coordinates
    const comboMainContainerArea = comboMainContainer.getBoundingClientRect();
    if (
      (x > comboMainContainerArea.left &&
        x < comboMainContainerArea.right &&
        y > comboMainContainerArea.top &&
        y < comboMainContainerArea.bottom) ||
      (event.screenX === 0 &&
        event.screenY === 0 &&
        event.clientX === 0 &&
        event.clientY === 0)
    ) {
      //Click happened inside the combo
    } else {
      this.visible = false;
      //Click happened outside the combo
    }
  }

  componentDidLoad() {
    this.resizeObserver();
  }
  disconnectedCallback() {
    this.myObserver.unobserve(document.body);
    document.removeEventListener("click", this.detectClickOutsideSelect, true);
    document.removeEventListener("scroll", this.detectMouseScroll, true);
  }

  detectMouseScrollFunc() {
    this.visible = false;
  }

  resizeObserver() {
    this.myObserver = new ResizeObserver((entries) => {
      entries.forEach(() => {
        this.repositionItemsContainer();
      });
    });
    this.myObserver.observe(document.body);
    this.myObserver.observe(this.el);
  }

  repositionItemsContainer() {
    //redefine .main-container width
    const gxgComboWidth = this.el.clientWidth;
    this.selectedValueRef.style.width = gxgComboWidth + "px";
    //redefine .items-container "top" value
    const gxgComboCoordinates = this.el.getBoundingClientRect();
    const gxgComboY = gxgComboCoordinates.y;
    const gxgComboHeight = gxgComboCoordinates.height;
    this.selectedValueRef.style.top = gxgComboY + gxgComboHeight + "px";
  }

  toggle() {
    this.visible = !this.visible;
  }

  render() {
    console.log("render");
    return (
      <Host
        style={{
          minWidth: this.minWidth,
          maxWidth: this.maxWidth,
          "--size": this.size,
        }}
        class={{
          large: state.large,
        }}
        onKeyDown={this.handlerOnKeyDown.bind(this)}
      >
        {this.label ? (
          <label
            class={{
              label: true,
            }}
          >
            {this.label}
          </label>
        ) : null}

        <div class={{ "form-wrapper": true }}>
          <div
            class="selected-value"
            onClick={this.toggle.bind(this)}
            ref={(el) => (this.selectedValueRef = el as HTMLDivElement)}
          >
            {this.selectedValue()}
          </div>
          {this.visible ? (
            <div class="options">
              <slot></slot>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}

export type LabelPosition = "start" | "above";
