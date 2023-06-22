import { Component, Host, h, Prop, Element, State } from "@stencil/core";

@Component({
  tag: "gxg-group",
  styleUrl: "group.scss",
  shadow: true,
})
export class GxgGroup {
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
   * Makes this group act as a fieldset
   */
  @Prop() readonly fieldset: boolean = false;

  /**
   * The title of the group
   */
  @Prop() readonly groupTitle: string;

  /**
   * Makes this group has a border all around
   */
  @Prop() readonly displayBorder: boolean = false;

  /**
   * Removes the component border on the top
   */
  @Prop() readonly noBorderTop: boolean = false;

  /**
   * Removes the component border on the end
   */
  @Prop() readonly noBorderEnd: boolean = false;

  /**
   * Removes the component border on the bottom
   */
  @Prop() readonly noBorderBottom: boolean = false;

  /**
   * Removes the component border on the start
   */
  @Prop() readonly noBorderStart: boolean = false;

  /**
   * The group general padding (applies to .heading, .content, and .footer)
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
   * A boolean variable indicating if the component has or not any content for the 'footer' slot
   */
  @State() hasFooterSlot = false;

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
    const footerSlot = this.el.querySelectorAll('[slot="footer"]');
    if (footerSlot.length) {
      this.hasFooterSlot = true;
    }
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

  private headingClasses = (): string | { [className: string]: boolean } => {
    return {
      heading: true,
      "heading--no-border": this.noHeadingBorder,
      [`heading--justify-${this.headingJustify}`]: true,
      ["heading--no-padding"]: this.noHeadingPadding,
    };
  };

  private contentClasses = (): string | { [className: string]: boolean } => {
    return {
      content: true,
      "content--no-padding": this.noContentPadding,
      "content--no-gap": this.noContentGap,
    };
  };

  private footer = (): JSX.Element | null => {
    return this.hasFooterSlot ? (
      <footer
        class={{
          footer: true,
          "footer--no-border": this.noHeadingBorder,
          [`footer--justify-${this.footerJustify}`]: true,
          [`footer--justify-${this.footerJustify}`]: true,
          ["footer--no-padding"]: this.noFooterPadding,
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
    let result;
    if (this.fieldset) {
      result = [
        <fieldset>
          {this.groupTitle ? (
            <legend class={this.headingClasses()}>
              {<gxg-title type="title-04">{this.groupTitle}</gxg-title>}
            </legend>
          ) : null}
          <div class={this.contentClasses()}>
            <slot></slot>
          </div>
        </fieldset>,
        this.footer(),
      ];
    } else {
      result = [
        this.groupTitle ? (
          <header class={this.contentClasses()}>
            {<gxg-title type="title-04">{this.groupTitle}</gxg-title>}
          </header>
        ) : null,
        <div class={this.headingClasses()}>
          <slot></slot>
        </div>,
        this.footer(),
      ];
    }

    return (
      <Host
        class={{
          "gxg-group": true,
          [`gxg-group--padding-${this.sectionsPadding}`]: true,
          "gxg-group--display-border": this.displayBorder,
          "gxg-group--no-border-top": this.noBorderTop,
          "gxg-group--no-border-end": this.noBorderEnd,
          "gxg-group--no-border-bottom": this.noBorderBottom,
          "gxg-group--no-border-start": this.noBorderStart,
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
