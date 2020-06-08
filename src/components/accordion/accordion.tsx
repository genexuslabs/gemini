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
  @Prop() mode: mode = "classical";

  @State() accordions: HTMLGxgAccordionItemElement[];

  @Element() el: HTMLElement;

  @Listen("accordionItemClicked")
  itemClickedHandler(event: CustomEvent) {
    this.accordions.forEach(accordion => {
      const id = accordion.itemId;
      if (this.singleItemOpen) {
        if (id === event.detail) {
          if (accordion.status === "open") {
            accordion.status = "closed";
          } else {
            accordion.status = "open";
          }
        } else {
          accordion.status = "close";
        }
      } else {
        if (id === event.detail) {
          if (accordion.status === "open") {
            accordion.status = "close";
          } else {
            accordion.status = "open";
          }
        }
      }
    });
  }
  @Listen("accordionItemLoaded")
  itemLoadedHandler() {
    this.setupAccordions();
  }

  componentDidLoad() {
    this.setupAccordions();
  }

  setupAccordions() {
    this.accordions = Array.from(
      this.el.querySelectorAll<HTMLGxgAccordionItemElement>(
        "gxg-accordion-item"
      )
    );

    //Disabled
    if (this.disabled) {
      this.accordions.forEach(accordion => {
        (accordion as HTMLGxgAccordionItemElement).status = "closed";
      });
    }

    if (this.singleItemOpen) {
      /* If "single-item-open" is true, and more than one accordion has the "open" property, 
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

export type mode = "classical" | "alternate";
