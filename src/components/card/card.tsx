import { Component, Prop, h, Host, Element } from "@stencil/core";
import state from "../store";
import { EditableTitleType } from "../title-editable/title-editable";
import { Color } from "../icon/icon";
@Component({
  tag: "gxg-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class GxgCard {
  @Element() el!: HTMLElement;

  /**
   * The card box-shadow
   */
  @Prop({ reflect: true }) elevation: elevation = "xs";

  /**
   * The background color
   */
  @Prop({ reflect: true }) background: background = "white";

  /**
   * The card padding
   */
  @Prop({ reflect: true }) padding: padding = "xs";

  /**
   * The component min. height
   */
  @Prop() minHeight = "auto";

  /**
   * The component height
   */
  @Prop() height = "auto";

  /**
   * The component max. width
   */
  @Prop() maxWidth = "100%";

  /**
   * Disables box-shadow
   */
  @Prop() noShadow = false;

  /*---  Mercury Only Tokens ---*/

  private titleType: EditableTitleType = "h2";
  private hasSlot = false;
  private hasHeaderSlot = false;

  /**
   * Remove padding from the top (applies only for the "section" card type)
   */
  @Prop({ reflect: true }) readonly noPaddingTop: boolean = false;

  /**
   * An optional title
   */
  @Prop() readonly cardTitle: string;

  /**
   * Card title semibold
   */
  @Prop() readonly titleSemibold: boolean = false;

  /**
   * An optional subtitle
   */
  @Prop() readonly cardSubtitle: string;

  /**
   * An optional subtitle link
   */
  @Prop() readonly subtitleLink: string;

  /**
   * An optional subtitle icon
   */
  @Prop() readonly subtitleIcon: string;

  /**
   * The card type (only for mercury)
   */
  @Prop() cardType: CardType = "section";

  /**
   * The card type (only for mercury)
   */
  @Prop() icon: string;

  /**
   * The icon color
   */
  @Prop() iconColor: Color = "auto";

  /**
   * The icon color
   */
  @Prop() subtitleColor: Color = "auto";

  /**
   * It makes the title editable (only for mercury)
   */
  @Prop() readonly editableTitle: boolean = false;

  /**
   * It applies a different style on hover. Useful when the card is actionable (has an action attached to the click event).
   */
  @Prop() readonly actionable: boolean = false;

  componentWillLoad() {
    if (this.cardType === "article") {
      this.titleType = "h2";
    } else if (this.cardType === "mini") {
      this.titleType = "h4";
    }
    const hasSlot = this.el.querySelector("*");
    if (hasSlot) {
      this.hasSlot = true;
    }
    const headerSlot = this.el.querySelector("[slot='header']");
    if (headerSlot) {
      this.hasHeaderSlot = true;
    }
  }

  private renderCardSubtitle = () => {
    if (this.cardSubtitle && this.subtitleLink) {
      return (
        <a class="subtitle" href={this.subtitleLink} target="_blank">
          {this.cardSubtitle}
        </a>
      );
    } else if (this.cardSubtitle && !this.subtitleLink) {
      return this.cardSubtitle;
    }
  };

  render() {
    return (
      <Host
        role="article"
        class={{
          card: true,
          mercury: state.mercury,
          "card--no-content": !this.hasSlot,
          "card--section": this.cardType === "section",
          "card--article": this.cardType === "article",
          "card--mini": this.cardType === "mini",
          "card--title": this.cardTitle !== undefined,
          "card--actionable":
            this.actionable &&
            (this.cardType === "article" || this.cardType === "mini"),
          "title-semibold": this.titleSemibold,
          "card--no-shadow": this.noShadow,
        }}
        style={{
          maxWidth: this.maxWidth,
          minHeight: this.minHeight,
          height: this.height,
        }}
      >
        <div
          role={this.actionable ? "button" : "none"}
          class={{
            wrapper: true,
            "wrapper--header": this.cardTitle !== undefined,
          }}
        >
          {this.cardTitle ? (
            <header class="card__header">
              {/*Title*/}
              <div class="card__header--left">
                {this.icon ? (
                  <gxg-icon type={this.icon} color={this.iconColor}></gxg-icon>
                ) : null}
                <div class="card-title-wrapper">
                  {this.cardType === "section" ? (
                    <gxg-title-editable
                      class="card__title"
                      titleType={this.titleType}
                      value={this.cardTitle}
                      disableEdition={!this.editableTitle}
                    ></gxg-title-editable>
                  ) : (
                    <h2 class="card__title">{this.cardTitle}</h2>
                  )}
                </div>
              </div>
              {/*Subtitle*/}
              {this.cardSubtitle &&
              this.cardType !== "mini" &&
              !this.hasHeaderSlot ? (
                <div class="card__header--right">
                  <div class="subtitle-wrapper">
                    {this.renderCardSubtitle()}
                  </div>
                  {this.subtitleIcon ? (
                    <gxg-icon
                      type={this.subtitleIcon}
                      color={this.subtitleColor}
                    ></gxg-icon>
                  ) : null}
                </div>
              ) : null}
              {/*Header Slot*/}
              {this.hasHeaderSlot ? (
                <div class="card__header--right">
                  <slot name="header"></slot>
                </div>
              ) : null}
            </header>
          ) : null}

          {this.hasSlot ? (
            <div class="content">
              <slot></slot>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}

export type elevation = "xs" | "m";

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type background = "white" | "gray-01";

export type CardType = "section" | "article" | "mini"; /*only for mercury*/
