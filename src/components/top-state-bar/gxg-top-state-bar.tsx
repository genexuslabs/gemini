import { Component, Host, h, Prop, State, Watch, Element } from "@stencil/core";

@Component({
  tag: "gxg-top-state-bar",
  styleUrl: "gxg-top-state-bar.scss",
  shadow: true
})
export class GxgTopStateBar {
  /*
INDEX:
1.OWN PROPERTIES 
2.REFERENCE TO ELEMENTS
3.STATE() VARIABLES
4.PUBLIC PROPERTY API | WATCH'S
5.EVENTS (EMIT)
6.COMPONENT LIFECYCLE METHODS
7.LISTENERS
8.PUBLIC METHODS API
9.LOCAL METHODS
10.RENDER() FUNCTION
*/

  // 1.OWN PROPERTIES //

  // 2. REFERENCE TO ELEMENTS //

  @Element() el: HTMLGxgTopStateBarElement;

  // 3.STATE() VARIABLES //

  /**
   * If true it will display the caption
   */
  @State() topStateBarVisible: boolean = false;

  /**
   * If true it will display bar
   */
  @State() visible: boolean = false;

  // 4.PUBLIC PROPERTY API //

  /**
   * The top-bar title
   */
  @Prop() caption: string;

  /**
   * The top-bar active state. If false it will be hidden
   */
  @Prop() active: boolean = false;
  @Watch("active")
  watchActiveHandler(active: boolean) {
    if (active) {
      this.visible = true;
      setTimeout(() => {
        this.topStateBarVisible = true;
      }, 300);
    } else {
      this.topStateBarVisible = false;
      setTimeout(() => {
        this.visible = false;
      }, 300);
    }
  }

  /**
   * The top-bar title
   */
  @Prop({ reflect: true }) stateType: topStateBarType = "in-progress";
  @Watch("stateType")
  watchStateTypeHandler() {
    this.evaluateWithAction();
  }

  /**
   * The progress bar progress
   */
  @Prop() progress: number = undefined;
  @Watch("progress")
  watchProgressHandler(progress: number) {
    if (progress => 0 && progress <= 100) {
      this.el.style.setProperty("--top-bar-progress", `${progress}%`);
    }
    if (progress === 100 && this.autoClose) {
      setTimeout(() => {
        this.active = false;
      }, 200);
    }
  }

  /**
   * It will display a close action button
   */
  @Prop() withClose: boolean = undefined;

  /**
   * It true, it will auto-close when the progress is 100
   */
  @Prop() autoClose = false;

  /**
   * It removes the border (actually is box shadow)
   */
  @Prop({ reflect: true }) noBorder = false;

  /**
   * A callback that gets called when the top-state-bar is closed
   */
  @Prop({ reflect: true }) closedCallback = false;

  // 5.EVENTS (EMIT) //

  // 6.COMPONENT LIFECYCLE EVENTS //

  componentWillLoad() {
    this.evaluateWithAction();
    this.evaluateInitialProgress();
    if (this.active) {
      this.visible = true;
      this.topStateBarVisible = true;
    }
  }

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  private evaluateInitialProgress = () => {
    if (
      this.progress === undefined &&
      (this.stateType === "error" ||
        this.stateType === "warning" ||
        this.stateType === "success")
    ) {
      this.progress = 100;
    } else if (
      this.progress === undefined &&
      this.stateType === "in-progress"
    ) {
      this.progress = 0;
    }
    this.el.style.setProperty("--top-bar-progress", `${this.progress}%`);
  };

  private evaluateWithAction = () => {
    if (
      this.withClose === undefined &&
      (this.stateType === "error" ||
        this.stateType === "warning" ||
        this.stateType === "success")
    ) {
      this.withClose = true;
    }
  };

  private closeButtonHandler = () => {
    this.active = false;
  };

  //  10.RENDER() FUNCTION //

  render() {
    return (
      <Host class={{ visible: this.visible }} aria-hidden={!this.active}>
        <div
          role="status"
          aria-labelledby="label"
          aria-hidden={!this.active}
          class={{
            "top-state-bar": true,
            [`top-state-bar--${this.stateType}`]: true,
            "top-state-bar--with-close": this.withClose,
            "top-state-bar--visible": this.topStateBarVisible
          }}
        >
          <div class="top-state-bar__wrapper">
            <label
              id="label"
              class={{
                "top-state-bar__caption": true
              }}
              part="label"
            >
              {this.caption}
            </label>
            <div
              class={{
                "top-state-bar__progress-wrapper": true
              }}
              part="progress-wrapper"
            >
              <span class="progress-bar"></span>
            </div>
          </div>
          {this.withClose ? (
            <div
              class="top-state-bar__close-wrapper"
              onClick={this.closeButtonHandler}
            >
              <gxg-icon
                class={{
                  "top-state-bar__close": true
                }}
                role="button"
                aria-label="close"
                type="gemini-tools/close"
                color="mercury-primary"
                tabIndex={0}
              ></gxg-icon>
            </div>
          ) : null}
        </div>
      </Host>
    );
  }
}

export type topStateBarType =
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "in-progress";
