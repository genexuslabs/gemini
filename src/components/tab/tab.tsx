import { Component, Element, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-tab",
  styleUrl: "tab.scss",
  shadow: true
})
export class Tab {
  @Element() el: HTMLElement;

  /**
   * The tab id. Should match the "tab" value of the correlative "gxg-tab"
   */
  @Prop() tab: string;

  /**
   *
   */
  @Prop({ reflect: true }) isSelected = false;

  componentDidLoad() {
    //Resize Observer
    const myObserver = new ResizeObserver(entries => {
      entries.forEach(() => {
        this.setMaxHeight();
      });
    });
    myObserver.observe(this.el);

    //Set max height
    this.setMaxHeight();
  }

  setMaxHeight() {
    //Set max-height to ".item__outer-container"
    let outerContainerMaxHeight = "0px";
    outerContainerMaxHeight =
      (this.el.shadowRoot.querySelector(".inner-container") as HTMLElement)
        .offsetHeight + "px";

    this.el.style.setProperty(
      "--outerContainerMaxHeight",
      outerContainerMaxHeight
    );
  }

  render() {
    return (
      <Host class={{ open: this.isSelected }}>
        <div class="outer-container">
          <div class="inner-container">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
