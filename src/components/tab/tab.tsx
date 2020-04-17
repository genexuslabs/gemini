import { Component, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-tab",
  styleUrl: "tab.scss",
  shadow: true
})
export class Tab {
  // Indicate that name should be a public property on the component
  @Prop() tab: string;
  @Prop() isSelected = false;

  render() {
    return this.isSelected ? (
      <Host class="selected">
        <section
          class={{
            tab: true,
            "tab--selected": this.isSelected === true
          }}
        >
          <slot></slot>
        </section>
      </Host>
    ) : (
      <Host class="not-selected"></Host>
    );
  }
}
