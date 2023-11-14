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
  radioInput!: HTMLInputElement;

  /**
   * Styles the radio-button with error attributes
   */
  @Prop() error = false;

  /**
   * Emits the id and value of the radio when is checked.
   */
  @Event() radioChecked: EventEmitter<RadioData>;

  /**
   * (This event is for internal use)
   */
  @Event() keyPressed: EventEmitter;

  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The radio id
   */
  @Prop() radioId: string;

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

  @Watch("checked")
  checkedHandler(newValue: boolean): void {
    if (newValue) {
      this.radioChecked.emit({
        id: this.radioId,
        value: this.value,
      });
    }
  }

  private clickedHandler = (): void => {
    this.checked = true;
  };

  private handlerOnKeyDown(event): void {
    this.keyPressed.emit(event.key);
  }

  private gxgLabelKeyDownHandler = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      this.checked = true;
    }
  };

  render(): void {
    return (
      <Host class={{ "gxg-form-radio--disabled": this.disabled }}>
        <gxg-label
          noMargin
          class="label"
          disabled={this.disabled}
          onClick={this.clickedHandler}
          onKeyDown={this.gxgLabelKeyDownHandler}
        >
          <input
            ref={(el) => (this.radioInput = el as HTMLInputElement)}
            type="radio"
            name={this.name}
            value={this.value}
            disabled={this.disabled}
            onKeyDown={this.handlerOnKeyDown.bind(this)}
            checked={this.checked}
            class={{ checked: this.checked }}
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

export type RadioData = {
  value: string;
  id?: string;
};
