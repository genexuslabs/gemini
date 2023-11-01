import { Component, Prop, h, Host } from "@stencil/core";
import state from "../store";
import { EditableTitleType } from "../title-editable/title-editable";

@Component({
  tag: "gxg-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class GxgCard {
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

  /*---  Mercury Only Tokens ---*/

  private titleType: EditableTitleType = "h2";

  /**
   * Remove padding from the top (applies only for the "section" card type)
   */
  @Prop({ reflect: true }) readonly noPaddingTop = false;

  /**
   * An optional title (only for mercury)
   */
  @Prop() readonly cardTitle: string;

  /**
   * The card type (only for mercury)
   */
  @Prop() cardType: CardType = "section";

  /**
   * The card type (only for mercury)
   */
  @Prop() icon: string;

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
  }

  render() {
    return (
      <Host
        role="article"
        class={{
          card: true,
          mercury: state.mercury,
          "card--section": this.cardType === "section",
          "card--article": this.cardType === "article",
          "card--mini": this.cardType === "mini",
          "card--title": this.cardTitle !== undefined,
          "card--actionable":
            this.actionable &&
            (this.cardType === "article" || this.cardType === "mini"),
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
              {this.icon ? (
                <gxg-icon type={this.icon} color="mercury"></gxg-icon>
              ) : null}
              <gxg-title-editable
                class="card__title"
                titleType={this.titleType}
                value={this.cardTitle}
                disableEdition={!this.editableTitle}
              ></gxg-title-editable>
            </header>
          ) : null}
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

export type elevation = "xs" | "m";

export type padding = "0" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";

export type background = "white" | "gray-01";

export type CardType = "section" | "article" | "mini"; /*only for mercury*/
