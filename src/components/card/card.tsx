import { Component, Prop, h, Host } from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-card",
  styleUrl: "card.scss",
  shadow: true,
})
export class GxgCard {
  /**
   * An optional title
   */
  @Prop() readonly cardTitle: string;

  /**
   * It makes the title editable
   */
  @Prop() readonly editableTitle: boolean = false;

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
   * The card type (only for mercury)
   */
  @Prop() cardType: CardType = "section";

  /**
   * The card type (only for mercury)
   */
  @Prop() icon: string;

  render() {
    return (
      <Host
        role="article"
        class={{
          card: true,
          mercury: state.mercury,
          "card--section": this.cardType === "section",
          "card--article": this.cardType === "article",
        }}
        style={{
          maxWidth: this.maxWidth,
          minHeight: this.minHeight,
          height: this.height,
        }}
      >
        <div
          class={{
            wrapper: true,
            "wrapper--header": this.cardTitle !== undefined,
          }}
        >
          {this.cardTitle ? (
            <header>
              {this.icon ? (
                <gxg-icon type={this.icon} color="mercury"></gxg-icon>
              ) : null}
              <gxg-title-editable
                titleType="h2"
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

export type CardType = "section" | "article"; /*only for mercury*/
