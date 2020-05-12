import { Component, Element, h, Host, Listen, State } from "@stencil/core";

@Component({
  tag: "gxg-accordion-container",
  styleUrl: "accordion-container.scss",
  shadow: true
})
export class AccordionContainer {
  @State() accordions: NodeList;

  @Element() el: HTMLElement;

  @Listen("tabClicked")
  tabClickedHandler(event: CustomEvent) {
    // this.accordions.forEach(accordion => {
    //   console.log(accordion.getAttributeNode);
    //   if (accordion["tab-title"] === event.detail) {
    //   }
    // });
  }

  componentDidLoad() {
    this.accordions = this.el.querySelectorAll("gxg-accordion");
  }

  render() {
    return (
      <Host class={{}}>
        <slot></slot>
      </Host>
    );
  }
}
