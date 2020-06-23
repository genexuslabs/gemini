import {
  Component,
  Element,
  h,
  Host,
  Listen,
  State,
  Prop
} from "@stencil/core";

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
   * Whether the accordion is fullwidth or not
   */
  @Prop() fullWidth = false;

  /**
   * Wether only one accordion can be open at the same time or not.
   */
  @Prop() singleItemOpen = false;

  /**
   * The aesthetical mode
   */
  @Prop() mode: mode;

  /**
   * The padding (only for the "slim" accordion mode)
   */
  @Prop() padding: padding = "xs";

  /**
   * The accordion width
   */
  @Prop() width = "360px";

  @State() accordions: HTMLGxgAccordionItemElement[];

  @Element() el: HTMLElement;

  @Listen("accordionItemClicked")
  itemClickedHandler(event: CustomEvent) {
    this.accordions.forEach(accordion => {
      const id = accordion.itemId;
      if (this.singleItemOpen) {
        if (id === event.detail) {
          if (accordion.open === true) {
            accordion.open = false;
          } else {
            accordion.open = true;
          }
        } else {
          accordion.open = false;
        }
      } else {
        if (id === event.detail) {
          if (accordion.open === true) {
            accordion.open = false;
          } else {
            accordion.open = true;
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

    //mode
    if (this.mode === "slim") {
      this.accordions.forEach(accordion => {
        (accordion as HTMLGxgAccordionItemElement).mode = "slim";
        (accordion as HTMLGxgAccordionItemElement).padding = this.padding;
      });
    }
    if (this.mode === "boxed") {
      this.accordions.forEach(accordion => {
        (accordion as HTMLGxgAccordionItemElement).mode = "boxed";
      });
    }
    //Disabled
    if (this.disabled) {
      this.accordions.forEach(accordion => {
        (accordion as HTMLGxgAccordionItemElement).disabled = true;
        (accordion as HTMLGxgAccordionItemElement).open = false;
      });
    }

    if (this.singleItemOpen) {
      /* If "single-item-open" is true, and more than one accordion has the "open" property,
      show only the first accordion open.*/
      let numberOfOpenAccordions = 0;
      this.accordions.forEach(accordion => {
        if ((accordion as HTMLGxgAccordionItemElement).hasAttribute("open")) {
          numberOfOpenAccordions++;
        }
      });
      if (numberOfOpenAccordions > 1) {
        let firstOpenAccordionFound = false;
        this.accordions.forEach(accordion => {
          if ((accordion as HTMLGxgAccordionItemElement).hasAttribute("open")) {
            if (firstOpenAccordionFound) {
              (accordion as HTMLGxgAccordionItemElement).removeAttribute(
                "open"
              );
            } else {
              firstOpenAccordionFound = true;
            }
          }
        });
      }
    }
  }

  render() {
    return (
      <Host
        style={{
          maxWidth: this.width
        }}
      >
        <slot></slot>
      </Host>
    );
  }
}

export type mode = "classical" | "slim" | "boxed";
export type padding = "xxs" | "xs" | "s";
