import { Component, Prop, h, Host, State } from "@stencil/core";

@Component({
  tag: "gxg-toolbar",
  styleUrl: "toolbar.scss",
  shadow: true
})
export class Toolbar {
  /**
   * The toggle arrow position
   */
  @Prop() position = "bottom";

  /**
   * The state of the toggle, wether is disabled or not
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The toolbar title
   */
  @Prop() subtitle: string;

  /**
   * The toolbar subtitle
   */
  @Prop() toolbarTitle: string;

  /**
   * Reading direction
   */
  @State() rtl = false;

  componentDidLoad() {
    //Reading Direction
    const dirHtml = document
      .getElementsByTagName("html")[0]
      .getAttribute("dir");
    const dirBody = document
      .getElementsByTagName("body")[0]
      .getAttribute("dir");
    if (dirHtml === "rtl" || dirBody === "rtl") {
      this.rtl = true;
    }
  }

  render() {
    return (
      <Host class={{}}>
        <div
          class={{
            toolbar: true,
            "toolbar--start": this.position === "start",
            "toolbar--top": this.position === "top",
            "toolbar--bottom": this.position === "bottom",
            rtl: this.rtl
          }}
        >
          <div class="left-container">
            <gxg-icon
              slot="icon"
              type="tools/drag"
              color="negative"
              size="small"
            ></gxg-icon>
            <div class="left-container__title">
              <strong>{this.toolbarTitle}:</strong>
            </div>
            <div class="left-container__subtitle">{this.subtitle}</div>
          </div>
          <div class="right-container">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

export type position = "start" | "top" | "bottom";
