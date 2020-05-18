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
          if (
            (accordion as HTMLGxgAccordionElement).getAttribute("status") ===
            "open"
          ) {
            (accordion as HTMLGxgAccordionElement).setAttribute(
              "status",
              "closed"
            );
          } else {
            (accordion as HTMLGxgAccordionElement).setAttribute(
              "status",
              "open"
            );
          }
        } else {
          (accordion as HTMLGxgAccordionElement).setAttribute(
            "status",
            "close"
          );
        }
      } else {
        if (title === event.detail) {
          if (
            (accordion as HTMLGxgAccordionElement).getAttribute("status") ===
            "open"
          ) {
            (accordion as HTMLGxgAccordionElement).setAttribute(
              "status",
              "close"
            );
          } else {
            (accordion as HTMLGxgAccordionElement).setAttribute(
              "status",
              "open"
            );
          }
        }
      }
    });
  }

  componentDidLoad() {
    this.accordions = this.el.querySelectorAll("gxg-accordion");

    if (this.singleTabOpen) {
      /* If "single-tab-open" is true, and more than one accordion has the "open" property, 
      show only the first accordion open.*/
      let numberOfOpenAccordions = 0;
      this.accordions.forEach(accordion => {
        if (
          (accordion as HTMLGxgAccordionElement).getAttribute("status") ===
          "open"
        ) {
          numberOfOpenAccordions++;
        }
      });
      if (numberOfOpenAccordions > 1) {
        let firstOpenAccordionFounded = false;
        this.accordions.forEach(accordion => {
          if (
            (accordion as HTMLGxgAccordionElement).getAttribute("status") ===
            "open"
          ) {
            if (firstOpenAccordionFounded) {
              (accordion as HTMLGxgAccordionElement).setAttribute(
                "status",
                "closed"
              );
            } else {
              firstOpenAccordionFounded = true;
            }
          }
        });
      }
    }

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
