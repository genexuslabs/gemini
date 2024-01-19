import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Event,
  EventEmitter
} from "@stencil/core";

@Component({
  tag: "gxg-buttons-container",
  styleUrl: "buttons-container.scss",
  shadow: true
})
export class GxgButtonsContainer {
  @Element() el: HTMLGxgButtonsContainerElement;
  containerEl!: HTMLDivElement;

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

  /**
   * The id of the currently selected button, or null if all are disabled
   */
  @Prop() selectedButtonId: string;

  /**
   * Used to reduce the height when the button-container is next to a form-text
   */
  @Prop() reduced: boolean = false;

  // 2. REFERENCE TO ELEMENTS //

  // 3.STATE() VARIABLES //

  // 4.PUBLIC PROPERTY API | WATCH'S //

  // 5.EVENTS (EMIT) //
  @Event() selectedButtonChanged: EventEmitter<string>;

  // 6.COMPONENT LIFECYCLE METHODS //

  componentDidLoad() {
    this.updateSelectedButtonId();
  }

  // 7.LISTENERS //

  // 8.PUBLIC METHODS API //

  // 9.LOCAL METHODS //

  private setSelectedButton = (event: MouseEvent) => {
    const tagName = (event.target as HTMLElement).tagName;
    if (tagName !== "GXG-BUTTON") {
      //clicked button is disabled
      return;
    } else {
      const clickedButton = event.target as HTMLGxgButtonElement;
      if (clickedButton.disabled || clickedButton.selected) {
        //button is disabled or is the current selected
        return;
      }
      const gxgButtonsHtmlCollection = this.el.children;
      Array.from(gxgButtonsHtmlCollection).forEach(function (
        button: HTMLGxgButtonElement
      ) {
        if (button.selected) {
          button.selected = false;
        }
      });
      clickedButton.selected = true;
      this.selectedButtonChanged.emit(clickedButton.id);
      this.updateSelectedButtonId();
    }
  };

  private updateSelectedButtonId = () => {
    const gxgButtonsHtmlCollection = this.el.children;
    const selectedButton = Array.from(gxgButtonsHtmlCollection).find(
      (button: HTMLGxgButtonElement) => {
        return button.selected && !button.disabled;
      }
    );
    if (selectedButton as HTMLGxgButtonElement) {
      this.selectedButtonId = selectedButton.id;
    }
  };

  // 10.RENDER() FUNCTION //

  render() {
    return (
      <Host>
        <div
          class={{ container: true, "container--reduced": this.reduced }}
          ref={el => (this.containerEl = el as HTMLDivElement)}
          onClick={this.setSelectedButton}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}
