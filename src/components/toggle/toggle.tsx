import { Component, Prop, State, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-toggle",
  styleUrl: "toggle.scss",
  shadow: true
})
export class Toggle {
  /**
   * The state of the toggle. Whether is disabled or not.
   * Possible values: false, true
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * If the toggle is active or not
   * Possible values: false/true
   */
  @Prop({ reflect: true }) on = false;

  @State() focus = false;

  /**
   * The toggle label
   */
  @Prop() label = "Label";

  switchToggle() {
    if (this.disabled !== true) {
      if (this.on === true) {
        this.on = false;
      } else {
        this.on = true;
      }
    }
  }
  onKeyUp(e) {
    if (e.which == 13) {
      //"enter" key was pressed
      this.switchToggle();
    } else if (e.which == 9) {
      //"tab" key was pressed
      this.focus = true;
    }
  }
  onKeyDown(e) {
    if (e.which == 9) {
      //"tab" key was pressed
      this.focus = false;
    }
  }

  render() {
    return (
      <Host
        class={{
          toggle: true,
          "on-focus": this.focus === true
        }}
        onClick={this.switchToggle}
        onKeyup={this.onKeyUp.bind(this)}
        onKeydown={this.onKeyDown.bind(this)}
      >
        <div class="toggle__container">
          <span class="toggle__container__knob"></span>
        </div>
        <span class="toggle__label">{this.label}</span>
      </Host>
    );
  }
}
