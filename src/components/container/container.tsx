import { Component, Host, h, Prop, Element, State } from "@stencil/core";

@Component({
  tag: "gxg-container",
  styleUrl: "container.scss",
  shadow: true
})
export class GxgContainer {
  /*
INDEX:
1.OWN PROPERTIES
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API
5.EVENTS (EMMIT)
6.COMPONENT LIFECYCLE EVENTS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION

Code organization suggested by StencilJs:
https://stenciljs.com/docs/style-guide#code-organization
*/

  /** ******************************
   *  1.OWN PROPERTIES
   ********************************/

  /*GENERAL*/

  /**
   * Makes this component content act as a fieldset
   */
  @Prop() readonly fieldset: boolean = false;

  /**
   * The title of the container
   */
  @Prop() readonly containerTitle: string;

  /**
   * Dsiplays a border all around the container
   */
  @Prop() readonly displayBorder: boolean = false;

  /**
   * Removes the component border on the top
   */
  @Prop() readonly displayBorderTop: boolean = false;

  /**
   * Removes the component border on the end
   */
  @Prop() readonly displayBorderEnd: boolean = false;

  /**
   * Removes the component border on the bottom
   */
  @Prop() readonly displayBorderBottom: boolean = false;

  /**
   * Removes the component border on the start
   */
  @Prop() readonly displayBorderStart: boolean = false;

  /**
   * The container general padding (applies to .heading, .content, and .footer)
   */
  @Prop() readonly sectionsPadding: sectionsPadding = "m";

  /*HEADING*/

  /**
   * Removes the border bottom from the heading
   */
  @Prop() readonly noHeadingBorder: boolean = false;

  /**
   * Removes the padding from the heading
   */
  @Prop() readonly noHeadingPadding: boolean = false;

  /**
   * The heading justification
   */
  @Prop() readonly headingJustify: headingJustify = "center";

  /*CONTENT*/

  /**
   * Removes the padding from the content
   */
  @Prop() readonly noContentPadding: boolean = false;

  /**
   * Removes the gap from the content
   */
  @Prop() readonly noContentGap: boolean = false;

  /*FOOTER*/

  /**
   * Removes the padding from the footer
   */
  @Prop() readonly noFooterPadding: boolean = false;

  /**
   * The footer justification
   */
  @Prop() readonly footerJustify: footerJustify = "end";

  /**
   * Removes the border top from the footer
   */
  @Prop() readonly noBorderFooter: boolean = false;

  /** *****************************
   * 2. REFERENCE TO ELEMENTS
   ********************************/

  @Element() el: HTMLElement;

  /** *****************************
   *  3.STATE() VARIABLES
   ********************************/

  /**
   * A boolean variable indicating if the component has or not any content slotted content (regular slotted content, without 'slot' attribute)
   */
  @State() hasSlottedContent = false;

  /**
   * A boolean variable indicating if the component has or not any content for the 'footer' slot
   */
  @State() hasFooterSlot = false;

  /**
   * A boolean variable indicating that the container only has the heading section
   */
  @State() hasOnlyHeading = false;

  /**
   * A boolean variable indicating that the container only has the footer section
   */
  @State() hasOnlyFooter = false;

  /** *****************************
   4.PUBLIC PROPERTY API
   ********************************/

  /** *****************************
   *  5.EVENTS (EMMIT)
   ********************************/

  /** *****************************
   *  6.COMPONENT LIFECYCLE EVENTS
   ********************************/

  componentWillLoad() {
    this.evaluateSlots();
  }

  /** *****************************
   *  7.LISTENERS
   ********************************/

  /** *****************************
   *  8.PUBLIC METHODS API
   ********************************/

  /** *****************************
   *  9.LOCAL METHODS
   ********************************/

  private evaluateSlots() {
    //content
    const slottedContent = this.el.querySelectorAll(":not([slot])");
    if (slottedContent.length) {
      this.hasSlottedContent = true;
    }
    //footer
    const footerSlot = this.el.querySelectorAll('[slot="footer"]');
    if (footerSlot.length) {
      this.hasFooterSlot = true;
    }
  }

  private evaluateSections() {
    if (!this.hasSlottedContent && !this.hasFooterSlot) {
      this.hasOnlyHeading = true;
    }
    if (!this.hasSlottedContent && !this.containerTitle) {
      this.hasOnlyFooter = true;
    }
  }

  private headingClasses = (): string | { [className: string]: boolean } => {
    return {
      heading: true,
      "heading--no-border": this.noHeadingBorder || this.hasOnlyHeading,
      [`heading--justify-${this.headingJustify}`]: true,
      ["heading--no-padding"]: this.noHeadingPadding
    };
  };

  private contentClasses = (): string | { [className: string]: boolean } => {
    return {
      content: true,
      "content--no-padding": this.noContentPadding,
      "content--no-gap": this.noContentGap
    };
  };

  private footer = (): any | null => {
    return this.hasFooterSlot ? (
      <footer
        class={{
          footer: true,
          "footer--no-border":
            this.noHeadingBorder ||
            this.hasOnlyFooter ||
            !this.hasSlottedContent,
          [`footer--justify-${this.footerJustify}`]: true,
          [`footer--justify-${this.footerJustify}`]: true,
          ["footer--no-padding"]: this.noFooterPadding
        }}
      >
        <slot name="footer"></slot>
      </footer>
    ) : null;
  };

  /** *****************************
   *  10.RENDER() FUNCTION
   ********************************/

  render() {
    this.evaluateSections();
    let result;
    if (this.fieldset) {
      result = [
        <fieldset>
          {this.containerTitle ? (
            <legend class={this.headingClasses()}>
              {<gxg-title type="title-04">{this.containerTitle}</gxg-title>}
            </legend>
          ) : null}
          {this.hasSlottedContent ? (
            <div class={this.contentClasses()}>
              <slot></slot>
            </div>
          ) : null}
        </fieldset>,
        this.footer()
      ];
    } else {
      result = [
        this.containerTitle ? (
          <header class={this.headingClasses()}>
            {<gxg-title type="title-04">{this.containerTitle}</gxg-title>}
          </header>
        ) : null,
        this.hasSlottedContent ? (
          <div class={this.contentClasses()}>
            <slot></slot>
          </div>
        ) : null,
        this.footer()
      ];
    }

    return (
      <Host
        class={{
          "gxg-container": true,
          [`gxg-container--padding-${this.sectionsPadding}`]: true,
          "gxg-container--display-border": this.displayBorder,
          "gxg-container--display-border-top": this.displayBorderTop,
          "gxg-container--display-border-end": this.displayBorderEnd,
          "gxg-container--display-border-bottom": this.displayBorderBottom,
          "gxg-container--display-border-start": this.displayBorderStart
        }}
      >
        {result}
      </Host>
    );
  }
}

export type headingJustify = "start" | "center" | "end";
export type footerJustify = "start" | "center" | "end";
export type sectionsPadding = "s" | "m" | "l";
