import { Component, Element, h, Listen, State, Prop } from "@stencil/core";

@Component({
  tag: "gxg-accordion",
  styleUrl: "accordion.scss",
  shadow: true
})
export class Accordion {
  /**
   * The state of the toggle. Whether is disabled or not.
   */
  @Prop() disabled = false;

  /**
   * Wether only one accordion can be open at the same time or not.
   */
  @Prop() singleItemOpen = false;

  /**
   * The aesthetical mode
   */
  @Prop() mode: modeType = "classical";

  @State() accordions: NodeList;

  @Element() el: HTMLElement;

  @Listen("accordionItemClicked")
  tabClickedHandler(event: CustomEvent) {
    this.accordions.forEach(accordion => {
      const id = (accordion as HTMLGxgAccordionItemElement).itemId;
      if (this.singleItemOpen) {
        if (id === event.detail) {
          if (
            (accordion as HTMLGxgAccordionItemElement).getAttribute(
              "status"
            ) === "open"
          ) {
            (accordion as HTMLGxgAccordionItemElement).setAttribute(
              "status",
              "closed"
            );
          } else {
            (accordion as HTMLGxgAccordionItemElement).setAttribute(
              "status",
              "open"
            );
          }
        } else {
          (accordion as HTMLGxgAccordionItemElement).setAttribute(
            "status",
            "close"
          );
        }
      } else {
        if (id === event.detail) {
          if (
            (accordion as HTMLGxgAccordionItemElement).getAttribute(
              "status"
            ) === "open"
          ) {
            (accordion as HTMLGxgAccordionItemElement).setAttribute(
              "status",
              "close"
            );
          } else {
            (accordion as HTMLGxgAccordionItemElement).setAttribute(
              "status",
              "open"
            );
          }
        }
      }
    });
  }

  componentDidLoad() {
    this.accordions = this.el.querySelectorAll("gxg-accordion-item");

    //Disabled
    if (this.disabled) {
      this.accordions.forEach(accordion => {
        (accordion as HTMLGxgAccordionItemElement).status = "closed";
      });
    }

    if (this.singleItemOpen) {
      console.log("number of open accordions is more than 1");
      /* If "single-tab-open" is true, and more than one accordion has the "open" property, 
      show only the first accordion open.*/
      let numberOfOpenAccordions = 0;
      this.accordions.forEach(accordion => {
        if (
          (accordion as HTMLGxgAccordionItemElement).getAttribute("status") ===
          "open"
        ) {
          numberOfOpenAccordions++;
        }
      });
      if (numberOfOpenAccordions > 1) {
        let firstOpenAccordionFound = false;
        this.accordions.forEach(accordion => {
          if (
            (accordion as HTMLGxgAccordionItemElement).getAttribute(
              "status"
            ) === "open"
          ) {
            if (firstOpenAccordionFound) {
              (accordion as HTMLGxgAccordionItemElement).setAttribute(
                "status",
                "closed"
              );
            } else {
              firstOpenAccordionFound = true;
            }
          }
        });
      }
    }

    this.accordions.forEach(accordion => {
      (accordion as HTMLGxgAccordionItemElement).setAttribute(
        "mode",
        this.mode
      );
      if (this.disabled) {
        (accordion as HTMLGxgAccordionItemElement).setAttribute(
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
