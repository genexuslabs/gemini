import { Component, Element, h, Listen, State, Prop } from "@stencil/core";

@Component({
  tag: "gxg-accordion-container",
  styleUrl: "accordion-container.scss",
  shadow: true
})
export class AccordionContainer {
  /**
   * The state of the toggle. Whether is disabled or not.
   */
  @Prop() disabled = false;

  /**
   * Wether only one accordion can be open at the same time or not.
   */
  @Prop() singleTabOpen = false;

  /**
   * The aesthetical mode
   */
  @Prop() mode: modeType = "classical";

  @State() accordions: NodeList;

  @Element() el: HTMLElement;

  @Listen("tabClicked")
  tabClickedHandler(event: CustomEvent) {
    this.accordions.forEach(accordion => {
      const title = (accordion as HTMLGxgAccordionElement).tabTitle;
      if (this.singleTabOpen) {
        if (title === event.detail) {
          if ((accordion as HTMLGxgAccordionElement).hasAttribute("open")) {
            (accordion as HTMLGxgAccordionElement).removeAttribute("open");
          } else {
            (accordion as HTMLGxgAccordionElement).setAttribute("open", "open");
          }
        } else {
          (accordion as HTMLGxgAccordionElement).removeAttribute("open");
        }
      } else {
        console.log("single tab not open");
        if (title === event.detail) {
          if ((accordion as HTMLGxgAccordionElement).hasAttribute("open")) {
            (accordion as HTMLGxgAccordionElement).removeAttribute("open");
          } else {
            (accordion as HTMLGxgAccordionElement).setAttribute("open", "open");
          }
        }
      }
    });
  }

  componentDidLoad() {
    this.accordions = this.el.querySelectorAll("gxg-accordion");
    this.accordions.forEach(accordion => {
      (accordion as HTMLGxgAccordionElement).setAttribute("mode", this.mode);
      if (this.disabled) {
        (accordion as HTMLGxgAccordionElement).setAttribute(
          "disabled",
          "disabled"
        );
      }
    });
  }

  render() {
    return <slot></slot>;
  }
}

export type modeType = "classical" | "alternate";
