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
  @Event() change: EventEmitter;
  @Event() keyPressed: EventEmitter;
  @Element() el: HTMLElement;

  //A reference to the input
  radioInput!: HTMLInputElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * Radio id
   */
  @Prop() RadioId: string;

  /**
   * Radio selected
   */
  @Prop({ reflect: true }) checked = false;

  /**
   * Radio disabled
   */
  @Prop() disabled = false;

  /**
   * Radio label
   */
  @Prop() label: string;

  /**
   * Radio name
   */
  @Prop() name: string;

  /**
   * Radio value
   */
  @Prop() value: string;

  /*********************************
  METHODS
  *********************************/

  componentDidLoad() {
    if (this.checked) {
      this.radioInput.setAttribute("checked", "checked");
      this.change.emit({
        id: this.RadioId,
        value: this.value
      });
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
      this.selectRadio();
    }
  }

  selectRadio() {
    this.change.emit({
      id: this.RadioId,
      value: this.value
    });
  }

  handlerOnKeyUp(event) {
    event.preventDefault();
    if (event.keyCode == 9) {
      //tab key was pressed
      this.keyPressed.emit("tab");
    }
    if (event.shiftKey && event.keyCode == 9) {
      //shift was down when tab was pressed
    } else if (event.keyCode == 37 || event.keyCode == 38) {
      //arrow-left, or arrow-up key was pressed. focus should be positioned on the previous radiobtn.
      this.keyPressed.emit({ direction: "previous" });
    }
    if (event.keyCode == 39 || event.keyCode == 40) {
      //arrow-right, or arrow-down key was pressed. focus should be positioned on the next radiobtn
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
            onKeyDown={this.handlerOnKeyUp.bind(this)}
          ></input>
          <span class="radiobtn"></span>
          {this.label}
        </label>
      </Host>
    );
  }
}
