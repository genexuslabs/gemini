import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-toolbar",
  styleUrl: "toolbar.scss",
  shadow: true
})
export class Toolbar {
  @Prop() position = "bottom";
  @Prop({ reflect: true }) disabled = false;
  @Prop() subtitle: string;
  @Prop() toolbarTitle: string;

  render() {
    return (
      <Host class={{}}>
        <div
          class={{
            toolbar: true,
            "toolbar--top": this.position === "top",
            "toolbar--left": this.position === "left",
            "toolbar--bottom": this.position === "bottom"
          }}
        >
          <div class="left-container">
            <gxg-icon
              slot="icon"
              type="drag"
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

export type position = "top" | "left" | "bottom";
