import {
  Component,
  Host,
  h,
  State,
  Prop,
  Listen,
  Element,
} from "@stencil/core";
import state from "../store";

@Component({
  tag: "gxg-options",
  styleUrl: "gxg-options.scss",
  shadow: true,
})
export class GxgOptions {
  optionsButton!: HTMLElement;
  optionsItemsContainer!: HTMLElement;

  @Element() el: HTMLElement;
  @Prop() maxWidth = "100%";
  @Prop() zIndex = "10";
  @Prop() position: "left" | "right" = "left";
  @Prop() maxVisibleOptions = 6;
  @State() optionsVisible = false;
  private maxHeight = "0px";

  componentWillLoad() {
    this.assignDataIds();

    if (state.large) {
      this.el.style.setProperty("--optionHeight", "24px");
    } else {
      this.el.style.setProperty("--optionHeight", "20px");
    }
  }

  componentDidLoad() {
    this.optionsItemsContainer.style.setProperty(
      "max-height",
      `calc(var(--optionHeight) * ${this.maxVisibleOptions})`
    );
  }

  assignDataIds() {
    //this is for internal use
    const options = this.el.querySelectorAll("*");
    options.forEach((option, i) => {
      option.setAttribute("data-id", i.toString());
    });
  }

  toggleOptions() {
    this.optionsVisible = !this.optionsVisible;
  }

  prevOption(dataId: string) {
    const currentItem = this.el.querySelector(
      "gxg-options-item[data-id='" + dataId + "']"
    );
    const prevOption = currentItem.previousElementSibling;
    if (prevOption) {
      (prevOption as HTMLElement).focus();
    } else {
      this.optionsVisible = false;
      this.optionsButton.focus();
    }
  }

  nextOption(dataId: string) {
    const currentItem = this.el.querySelector(
      "gxg-options-item[data-id='" + dataId + "']"
    );
    const nextOption = currentItem.nextElementSibling;
    if (nextOption) {
      (nextOption as HTMLElement).focus();
    }
  }

  @Listen("keyDown")
  keyDownHandler(event: CustomEvent<Record<string, any>>) {
    const escape = event.detail["escape"];
    const direction = event.detail["direction"];
    const dataId = event.detail["dataId"];
    if (escape) {
      this.optionsVisible = false;
      this.optionsButton.focus();
    } else if (direction === "ArrowUp") {
      this.prevOption(dataId);
    } else if (direction === "ArrowDown") {
      this.nextOption(dataId);
    }
  }

  @Listen("optionSelected")
  optionSelectedHandler(event: CustomEvent<boolean>) {
    //An option was selected. Close options.
    this.optionsVisible = false;
  }

  optionsButtonKeyDownHandler(e) {
    const code = e.code;
    if (code === "Escape") {
      this.optionsVisible = false;
    }
    if (code === "ArrowDown") {
      if (this.optionsVisible) {
        const firstOption = this.el.querySelector("gxg-options-item");
        if (firstOption) {
          firstOption.focus();
        }
      } else {
        this.optionsVisible = true;
      }
    }
  }

  render() {
    return (
      <Host
        class={{
          options: true,
          "options--visible": this.optionsVisible,
          "options--left": this.position === "left",
          "options--right": this.position === "right",
          large: state.large,
        }}
      >
        <div class="options__container">
          <gxg-button
            icon="gemini-tools/show-more-horizontal"
            type="tertiary"
            onClick={this.toggleOptions.bind(this)}
            onKeyDown={this.optionsButtonKeyDownHandler.bind(this)}
            ref={(el) => (this.optionsButton = el as HTMLElement)}
          ></gxg-button>
          <div
            class="options__items-container"
            style={{ maxWidth: this.maxWidth, zIndex: this.zIndex }}
            ref={(el) => (this.optionsItemsContainer = el as HTMLElement)}
          >
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
