import {
  Component,
  h,
  Host,
  Element,
  Event,
  EventEmitter,
  State,
  Prop
} from "@stencil/core";

@Component({
  tag: "gxg-tree-item",
  styleUrl: "tree-item.scss",
  shadow: true
})
export class TreeItem {
  @Element() el: HTMLElement;
  @State() hasChildren = false;

  /**
   * The state of the tree-item, wether it is disabled or not
   */
  @Prop({ reflect: true }) disabled = false;
  /**
   * The tree item icon
   */
  @Prop() icon = null;
  @State() open = false;
  @State() numberOfChildItems: number;
  @State() treeContainerMaxHeight: string;

  /**
   * (This event is for internal use)
   */
  @Event() itemClicked: EventEmitter;

  componentDidLoad() {
    const slottedTree = this.el.querySelector("gxg-tree");

    if (slottedTree !== null) {
      if (slottedTree.nodeName === "GXG-TREE") {
        this.hasChildren = true;
        this.numberOfChildItems = slottedTree.childNodes.length - 1;
        this.treeContainerMaxHeight = (28 * this.numberOfChildItems) / 2 + "px";
        this.el.style.setProperty(
          "--treeContainerMaxHeight",
          this.treeContainerMaxHeight
        );

        //set animation duration
        const animationDuration = this.numberOfChildItems * 0.03 + "s";
        this.el.style.setProperty("--animation-duration", animationDuration);
      }
    }
    this.el.style.setProperty("--treeContainerMaxHeight", "0");
  }

  getClickHandler(onClick, onDblClick, delay) {
    let timeoutID = null;
    delay = delay || 250;
    return function(event) {
      if (!timeoutID) {
        timeoutID = setTimeout(function() {
          onClick(event);
          timeoutID = null;
        }, delay);
      } else {
        timeoutID = clearTimeout(timeoutID);
        onDblClick(event);
      }
    };
  }

  render() {
    return (
      <Host
        tabindex="0"
        class={{
          disabled: this.disabled
        }}
      >
        <li
          class={{
            closed: !this.open
          }}
        >
          <div
            class="wrapper"
            onClick={this.getClickHandler(
              function() {
                //single clicked
                this.el.focus();
                this.itemClicked.emit(this);
              }.bind(this),
              function() {
                this.el.focus();
                //double clicked
                this.open = !this.open;
              }.bind(this),
              250
            )}
          >
            {(this.hasChildren && this.open) || !this.hasChildren ? (
              <gxg-icon
                size="small"
                type="gemini-tools/minus"
                class={{
                  "fold-unfold": true,
                  "no-icon": this.icon === null
                }}
              ></gxg-icon>
            ) : (
              <gxg-icon
                size="small"
                type="gemini-tools/add"
                class={{
                  "fold-unfold": true,
                  "no-icon": this.icon === null
                }}
              ></gxg-icon>
            )}
            <gxg-icon size="small" type={this.icon}></gxg-icon>
            <slot></slot>
          </div>
          {this.open ? <slot name="tree"></slot> : null}
        </li>
      </Host>
    );
  }
}
