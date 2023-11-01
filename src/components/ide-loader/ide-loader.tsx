import { Component, Host, h, Prop, Watch, State } from "@stencil/core";

@Component({
  tag: "gxg-ide-loader",
  styleUrl: "ide-loader.scss",
  shadow: true,
})
export class IdeLoader {
  /*
INDEX:
1.OWN PROPERTIES
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.COMPONENT LIFECYCLE EVENTS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  /**
   * The transition speed for displaying/hiding the ch-window
   */
  private showTransition = 200;
  private timeoutReference;

  // 2. REFERENCE TO ELEMENTS //

  containerEl!: HTMLDivElement;

  // 3.STATE() VARIABLES //

  /**
   * shows the ch-window
   */
  @State() showWindow = false;

  /**
   * shows the '.loader-wrapper'
   */
  @State() showWrapper = false;

  // 4.PUBLIC PROPERTY API | WATCH'S //

  /**
   * The loader title (optional)
   */
  @Prop() loaderTitle: string;

  /**
   * The loader description (optional)
   */
  @Prop() description: string;

  /**
   * The cancel button label (optional)
   */
  @Prop() cancelLabel: string;

  /**
   * It shows the loader
   */
  @Prop() show = false;

  /**
   * The time the loader will await before abort.
   */
  @Prop() abortTime = 5000;

  @Watch("show")
  showHandler(show: boolean): void {
    const timeout = 50;
    if (show) {
      this.showWindow = true;
      setTimeout(() => {
        this.showWrapper = true;
      }, timeout);
    } else {
      this.showWrapper = false;
      setTimeout(() => {
        this.showWindow = false;
      }, this.showTransition);
    }
    if (show) {
      if (this.timeoutReference) {
        clearTimeout(this.timeoutReference);
      }
      this.timeoutReference = setTimeout(() => {
        this.show = false;
      }, this.abortTime);
    }
  }

  /**
   * The container element for the loader.
   */
  @Prop() container: HTMLElement;

  // 5.EVENTS (EMIT) //

  // 6.COMPONENT LIFECYCLE EVENTS //

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  private renderTitle = (): HTMLGxgTitleElement | null => {
    return this.loaderTitle ? (
      <gxg-title class="loader__title" type="title-04" alignment="center">
        {this.loaderTitle}
      </gxg-title>
    ) : null;
  };

  private renderDescription = (): HTMLGxgTextElement | null => {
    return this.description ? (
      <gxg-text
        class="loader__description"
        type="text-regular"
        textAlign="center"
      >
        {this.description}
      </gxg-text>
    ) : null;
  };

  private renderCancelButton = (): HTMLGxgButtonElement | null => {
    return this.cancelLabel ? (
      <gxg-button
        class="loader__cancel-button"
        type="secondary-text-icon"
        onClick={this.cancelProcess}
      >
        {this.cancelLabel}
      </gxg-button>
    ) : null;
  };

  private cancelProcess = (): void => {
    clearTimeout(this.timeoutReference);
    this.show = false;
  };

  //  10.RENDER() FUNCTION //

  render() {
    return (
      <Host>
        <ch-window
          closeOnEscape={false}
          closeOnOutsideClick={false}
          container={this.container}
          hidden={!this.showWindow}
          modal={false}
          showFooter={false}
          showHeader={false}
          style={{ "--show-transition": `${this.showTransition}ms` }}
        >
          <div
            class={{
              [`loader__wrapper`]: true,
              "loader__wrapper--visible": this.showWrapper,
            }}
          >
            <div class="loader__spinner"></div>
            <div
              class={{
                "loader__content-wrapper": true,
                "loader__content-wrapper--hidden":
                  !this.description && !this.loaderTitle && !this.cancelLabel,
              }}
            >
              {this.renderTitle()}
              {this.renderDescription()}
              {this.renderCancelButton()}
            </div>
          </div>
        </ch-window>
      </Host>
    );
  }
}
