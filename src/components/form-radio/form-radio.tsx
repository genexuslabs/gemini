import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h,
  Watch
} from "@stencil/core";

@Component({
  tag: "gxg-form-radio",
  styleUrl: "form-radio.scss",
  shadow: true
})
export class FormRadio {
  @Event() change: EventEmitter;
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
    }
  }

  selectRadio() {
    this.change.emit({
      id: this.RadioId,
      value: this.value
    });
  }

  render() {
    return (
      <label class="label">
        <input
          ref={el => (this.radioInput = el as HTMLInputElement)}
          type="radio"
          name={this.name}
          id={this.RadioId}
          value={this.value}
          onClick={this.selectRadio.bind(this)}
          disabled={this.disabled}
        ></input>
        <span class="radiobtn"></span>
        {this.label}
      </label>
    );
  }
}
