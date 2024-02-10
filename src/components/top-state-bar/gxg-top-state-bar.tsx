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
   * If true it will display a close icon
   */
  @State() stateWithAction: boolean = false;

  /**
   * If true it will display the caption
   */
  @State() captionVisible: boolean = false;

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
        this.captionVisible = true;
      }, 300);
    } else {
      this.captionVisible = false;
      setTimeout(() => {
        this.visible = false;
      }, 300);
      this.progress = 0;
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
   * It will display a progress bar
   */
  @Prop() withProgressBar = false;

  /**
   * The progress bar progress
   */
  @Prop() progress: number = 0;
  @Watch("progress")
  watchProgressHandler(progress: number) {
    if (progress => 0 && progress <= 100) {
      this.el.style.setProperty("--top-bar-progress", `${progress}%`);
    }
    if (progress === 100 && this.autoClose) {
      this.active = false;
    }
  }

  /**
   * It true, it will auto-close when the progress is 100
   */
  @Prop() autoClose = false;

  // 5.EVENTS (EMIT) //

  // 6.COMPONENT LIFECYCLE EVENTS //

  componentWillLoad() {
    this.evaluateWithAction();
    if (this.active) {
      this.visible = true;
      this.captionVisible = true;
    }
  }

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  private evaluateWithAction = () => {
    if (
      this.stateType === "error" ||
      this.stateType === "warning" ||
      this.stateType === "success"
    ) {
      this.stateWithAction = true;
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
            "top-state-bar--with-action": this.stateWithAction
          }}
        >
          <div
            class={{
              "top-state-bar__wrapper": true
            }}
            part="wrapper"
          >
            <label
              id="label"
              class={{
                "top-state-bar__caption": true,
                "top-state-bar__caption--visible": this.captionVisible
              }}
              part="label"
            >
              {this.caption}
            </label>
            {this.stateWithAction ? (
              <gxg-icon
                class={{
                  "top-state-bar__close": true,
                  "top-state-bar__close--visible": this.captionVisible
                }}
                role="button"
                aria-label="close"
                type="gemini-tools/close"
                color="mercury-text-on-message"
                tabIndex={0}
                onClick={this.closeButtonHandler}
              ></gxg-icon>
            ) : null}
          </div>
          {this.withProgressBar ? (
            <div
              class={{
                "progress-bar": true,
                "progress-bar--hidden":
                  this.progress === 0 || this.progress === 100
              }}
            ></div>
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
