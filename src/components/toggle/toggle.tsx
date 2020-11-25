import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-toggle",
  styleUrl: "toggle.scss",
  shadow: true
})
export class GxgToggle {
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
  @Prop() label = "Label";

  /**
   * The label
   */
  @Prop({ reflect: true }) size: Size = "regular";

  /**
   * If the toggle is active or not
   */
  @Prop({ reflect: true }) on = false;

  /*********************************
  METHODS
  *********************************/

  onKeyUp(e) {
    if (e.which == 13) {
      //"enter" key was pressed
      this.switchToggle();
    }
  }
  // onKeyDown(e) {
  //   if (e.which == 9) {
  //     //"tab" key was pressed
  //     this.focus = false;
  //   }
  // }
  switchToggle() {
    if (this.disabled !== true) {
      if (this.on === true) {
        this.on = false;
      } else {
        this.on = true;
      }
    }
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
          toggle: true
        }}
        onClick={this.switchToggle}
        onKeyup={this.onKeyUp.bind(this)}
        tabindex="0"
      >
        <div class="toggle__container">
          <span class="toggle__container__knob"></span>
        </div>
        <span class="toggle__label">{this.label}</span>
      </Host>
    );
  }
}

export type Size = "regular" | "small";
