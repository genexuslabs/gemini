import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Watch,
} from "@stencil/core";

@Component({
  tag: "gxg-form-radio",
  styleUrl: "form-radio.scss",
  shadow: { delegatesFocus: true },
})
export class GxgFormRadio {
  /**
   * Styles the radio-button with error attributes
   */
  @Prop() error = false;

  /**
   * Returns an object with the radio value, and radio id
   */
  @Event() change: EventEmitter;
  /**
   * (This event is for internal use)
   */
  @Event() radioClicked: EventEmitter;
  /**
   * (This event is for internal use)
   */
  @Event() keyPressed: EventEmitter;
  @Element() el: HTMLElement;

  //A reference to the input
  radioInput!: HTMLInputElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The radio id
   */
  @Prop() RadioId: string;

  /**
   * The presence of this attribute makes the radio selected by default
   */
  @Prop({ reflect: true }) checked = false;

  /**
   * The presence of this attribute disables the radio
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The radio label
   */
  @Prop() label: string;

  /**
   * The radio name (should be the same for every radio of the same radio-group)
   */
  @Prop() name: string;

  /**
   * The radio value
   */
  @Prop() value: string;

  /*********************************
  METHODS
  *********************************/

  componentDidLoad() {
    if (this.checked) {
      this.radioInput.setAttribute("checked", "checked");
    }

    if (this.disabled && this.checked) {
      this.radioInput.removeAttribute("checked");
      this.checked = false;
    }
  }

  @Watch("checked")
  watchHandler(newValue: boolean) {
    if (newValue === false) {
      this.radioInput.removeAttribute("checked");
    }
    if (newValue === true) {
      this.radioInput.setAttribute("checked", "checked");
      this.change.emit({
        id: this.RadioId,
        value: this.value,
      });
    }
  }

  private clickedHandler = () => {
    this.radioClicked.emit();
  };

  handlerOnKeyDown(event) {
    this.keyPressed.emit(event.key);
  }

  render() {
    return (
      <Host
        onClick={this.clickedHandler}
        class={{ "gxg-form-radio--disabled": this.disabled }}
      >
        <gxg-label noMargin class="label" disabled={this.disabled}>
          <input
            ref={(el) => (this.radioInput = el as HTMLInputElement)}
            type="radio"
            name={this.name}
            id={this.RadioId}
            value={this.value}
            disabled={this.disabled}
            onKeyDown={this.handlerOnKeyDown.bind(this)}
          ></input>
          <span
            class={{ radiobtn: true, "radiobtn--error": this.error }}
          ></span>
          {this.label}
        </gxg-label>
      </Host>
    );
  }
}
