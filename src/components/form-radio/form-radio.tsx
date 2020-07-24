import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Watch
} from "@stencil/core";

@Component({
  tag: "gxg-form-radio",
  styleUrl: "form-radio.scss",
  shadow: true
})
export class FormRadio {
  /**
   * Returns an object with the radio value, and radio id
   */
  @Event() change: EventEmitter;
  /**
   * (This event is for internal use)
   */
  @Event() changeInternal: EventEmitter;
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
  @Prop() disabled = false;

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
        value: this.value
      });
    }
  }

  selectRadio() {
    this.changeInternal.emit({
      id: this.RadioId,
      value: this.value
    });
  }

  handlerOnKeyDown(event) {
    if (event.keyCode == 9) {
      //tab key was pressed
      if (event.shiftKey) {
        //shift key was also pressed
        this.keyPressed.emit({ direction: "previous-tab" });
      } else {
        this.keyPressed.emit({ direction: "next-tab" });
      }
    } else if (event.keyCode == 37 || event.keyCode == 38) {
      //arrow-left, or arrow-up key was pressed. focus should be positioned on the previous radiobtn.
      event.preventDefault();
      this.keyPressed.emit({ direction: "previous" });
    }
    if (event.keyCode == 39 || event.keyCode == 40) {
      //arrow-right, or arrow-down key was pressed. focus should be positioned on the next radiobtn
      event.preventDefault();
      this.keyPressed.emit({ direction: "next" });
    }
  }

  render() {
    return (
      <Host>
        <label class="label">
          <input
            ref={el => (this.radioInput = el as HTMLInputElement)}
            type="radio"
            name={this.name}
            id={this.RadioId}
            value={this.value}
            onClick={this.selectRadio.bind(this)}
            disabled={this.disabled}
            onKeyDown={this.handlerOnKeyDown.bind(this)}
          ></input>
          <span class="radiobtn"></span>
          {this.label}
        </label>
      </Host>
    );
  }
}
