/* STENCIL IMPORTS */
import { Component, Host, h, Prop, State } from "@stencil/core";
import state from "../store";
/* OTHER LIBRARIES IMPORTS */
/* CUSTOM IMPORTS */
import { Color as IconColor } from "../icon/icon";

@Component({
  tag: "gxg-entity-selector",
  styleUrl: "gxg-entity-selector.scss",
  shadow: true,
})
export class GxgEntitySelector {
  /*
INDEX:
1.OWN PROPERTIES
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API
5.EVENTS (EMIT)
6.COMPONENT LIFECYCLE EVENTS
7.LISTENERS
8.WATCH
9.PUBLIC METHODS API
10.LOCAL METHODS
11.RENDER() FUNCTION

Code organization suggested by StencilJs:
https://stenciljs.com/docs/style-guide#code-organization
*/

  /// 1.OWN PROPERTIES ///

  /**
   *  This property provides the user a way to define custom aria-label descriptions.
   */
  @Prop() readonly accessibilityLabels?: EntitySelectorLabels = {
    buttonClearLabel: "clears the actual value",
    buttonSelectLabel: "displays the entity selector",
  };

  /**
   *  Default value to be assigned as the component's value. This value should always be used when the 'X' button is pressed.
   */
  @Prop() readonly defaultValue?: EntityData | null | undefined;

  /**
   * Optional label (same as the label of an input).
   */
  @Prop() readonly label: string;

  /**
   * The label position
   */
  @Prop({ reflect: true }) labelPosition: LabelPosition = "above";

  /**
   * Centers the label
   */
  @Prop() centerLabel = false;

  /**
   * The label width
   */
  @Prop() labelWidth;

  /**
   * Callback that will be called when the user presses the action button. Returns the new value assigned to the component.
   */
  @Prop() readonly onSelectEntity: () => Promise<EntityData>;

  /**
   * Value currently assigned.
   */
  @Prop({ mutable: true }) value: EntityData | null | undefined;

  /// 2. REFERENCE TO ELEMENTS ///

  /// 3.STATE() VARIABLES ///

  /**
   * This variable adds or removes a CSS class on the host, and it can be used to remove the focus-within styles from the host in the case the focus is on a button.
   */

  @State() buttonHasFocus = false;

  /// 4.PUBLIC PROPERTY API ///

  /// 5.EVENTS (EMIT) ///

  /// 6.COMPONENT LIFECYCLE EVENTS ///

  /// 7.LISTENERS ///

  /// 8.WATCH ///

  /// 9.PUBLIC METHODS API ///

  /// 10.LOCAL METHODS ///

  private btnClearClickHandler = () => {
    this.value = null;
  };

  private btnSelectClickHandler = () => {
    this.onSelectEntity().then((result) => {
      this.value = result;
    });
  };

  private iconColor = (): IconColor => {
    let value;
    if (this.value) {
      value = this.value;
    } else if (this.defaultValue) {
      value = this.defaultValue;
    }
    return value?.iconColor || "auto";
  };

  private iconSrc = (): string | undefined => {
    if (this.value) {
      return this.value.iconSrc;
    } else if (this.defaultValue) {
      return this.defaultValue.iconSrc;
    }
    return undefined;
  };

  private buttonFocusHandler = (e: FocusEvent) => {
    if (e.type === "focus") {
      this.buttonHasFocus = true;
    } else if (e.type === "blur") {
      this.buttonHasFocus = false;
    }
  };

  /// 11.RENDER() FUNCTION ///

  render() {
    return (
      <Host
        class={{
          "gxg-entity-selector--button-has-focus": this.buttonHasFocus,
          large: state.large,
        }}
      >
        {this.label && (
          <gxg-label
            part="label"
            labelPosition={this.labelPosition}
            center={this.centerLabel}
            width={this.labelWidth}
          >
            {this.label}
          </gxg-label>
        )}
        <div part="wrapper" class="wrapper">
          {this.iconSrc() && (
            <gxg-icon
              color={this.iconColor()}
              type={this.iconSrc()}
              part="icon"
              aria-hidden="true"
            ></gxg-icon>
          )}
          <input
            type="text"
            readonly
            part="input input-entity"
            value={this.value?.name || this.defaultValue?.name}
          />
          <gxg-button
            part="button button-clear"
            onClick={this.btnClearClickHandler}
            aria-label={this.accessibilityLabels?.buttonClearLabel}
            onFocus={this.buttonFocusHandler}
            onBlur={this.buttonFocusHandler}
            type="secondary-icon-only"
            icon="gemini-tools/reset"
          ></gxg-button>
          <gxg-button
            part="button button-select"
            onClick={this.btnSelectClickHandler}
            aria-label={this.accessibilityLabels?.buttonSelectLabel}
            onFocus={this.buttonFocusHandler}
            onBlur={this.buttonFocusHandler}
            type="secondary-icon-only"
            icon="gemini-tools/show-more-horizontal"
          ></gxg-button>
        </div>
      </Host>
    );
  }
}

export type EntityData = {
  id: string; // Internal ID of the entity
  name: string; // Name that will be displayed in the interface
  iconSrc?: string; // The icon url src
  color?: IconColor; // Indicates the icon color
};

export type EntitySelectorLabels = {
  buttonClearLabel: string;
  buttonSelectLabel: string;
};
export type LabelPosition = "start" | "above";
