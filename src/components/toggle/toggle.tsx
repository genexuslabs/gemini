import {
  Component,
  Element,
  Event,
  EventEmitter,
  Prop,
  h,
  Host,
} from "@stencil/core";

@Component({
  tag: "gxg-toggle",
  styleUrl: "toggle.scss",
  shadow: true,
})
export class GxgToggle {
  @Element() el: HTMLElement;

  /*********************************
  PROPERTIES & STATE
  *********************************/

  /**
   * The state of the toggle. Whether is disabled or not.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The label
   */
  @Prop() label: string | undefined = undefined;

  /**
   * If the toggle is active or not
   */
  @Prop({ reflect: true }) on = false;

  /*********************************
  EVENTS
  *********************************/

  /**
   * This event is triggered when the toggle is switched. 'event.detail' will display true when the toggle is on, or false when the toggle is off.
   */
  @Event() toggleSwitched: EventEmitter;

  /*********************************
  METHODS
  *********************************/

  componentWillLoad() {
    // Create a new 'change' event
  }

  onKeyUp(e) {
    if (e.which == 13) {
      //"enter" key was pressed
      this.switchToggle();
    }
  }
  switchToggle() {
    if (this.disabled !== true) {
      if (this.on === true) {
        this.on = false;
      } else {
        this.on = true;
      }
    }
    this.toggleSwitched.emit(this.on);
  }
  state() {
    if (this.on) {
      return "true";
    } else {
      return "false";
    }
  }

  render() {
    return (
      <Host
        role="switch"
        aria-checked={this.state()}
        class={{
          toggle: true,
        }}
        onClick={this.switchToggle.bind(this)}
        onKeyup={this.onKeyUp.bind(this)}
        tabindex="0"
      >
        <div class="main-container">
          <div class="toggle__container">
            <span class="toggle__container__knob"></span>
          </div>
          <gxg-label labelPosition="end" class="toggle__label">
            {this.label}
          </gxg-label>
        </div>
      </Host>
    );
  }
}
