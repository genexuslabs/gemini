import {
  Component,
  Element,
  Host,
  Prop,
  h,
  Event,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "gxg-form-checkbox",
  styleUrl: "form-checkbox.scss",
  shadow: true
})
export class FormCheckbox {
  @Element() el: HTMLElement;

  //A reference to the input
  checkboxInput!: HTMLInputElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * Checkbox id
   */
  @Prop() checkboxId: string;

  /**
   * Checkbox checked
   */
  @Prop({ reflect: true }) checked = false;

  /**
   * Checkbox disabled
   */
  @Prop() disabled = false;

  /**
   * Checkbox label
   */
  @Prop() label: string;

  /**
   * Checkbox value
   */
  @Prop() value: string;

  /**
   * Checkbox name
   */
  @Prop() name: string;

  @Event() change: EventEmitter;

  /*********************************
  METHODS
  *********************************/

  compontentDidLoad() {
    if (this.checked && this.disabled) {
      this.checked = false;
      this.checkboxInput.removeAttribute("checked");
    }
  }

  changed() {
    this.checked = this.checkboxInput.checked;
    this.change.emit({
      "checkbox id": this.checkboxId,
      "checkbox value": this.checked
    });
  }

  render() {
    return (
      <Host
        role="checkbox"
        value={this.value}
        aria-checked={this.checked + ""}
        aria-label={this.label}
      >
        <label class="label">
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
          ></input>
          <span class="checkmark"></span>
          {this.label}
        </label>
      </Host>
    );
  }
}
