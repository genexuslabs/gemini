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
   * The loader description (optional)
   */
  @Prop() description: string;

  /**
   * It shows the loader
   */
  @Prop() show = false;

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
              "loader-wrapper": true,
              "loader-wrapper--visible": this.showWrapper,
            }}
          >
            <div class="loader-spinner"></div>
            {this.description ? (
              <gxg-title
                class="loader-description"
                type="title-04"
                alignment="center"
              >
                {this.description}
              </gxg-title>
            ) : // <gxg-title>{this.description}</gxg-title>
            null}
          </div>
        </ch-window>
      </Host>
    );
  }
}
