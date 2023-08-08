import { Component, Event, EventEmitter, Prop, h, Host } from "@stencil/core";

@Component({
  tag: "gxg-menu-item",
  styleUrl: "menu-item.scss",
  shadow: true,
})
export class GxgMenuItem {
  //A reference to the input
  listItem!: HTMLElement;

  @Prop() label: string;
  @Prop() icon: string = null;
  @Prop({ reflect: true }) active = false;
  @Prop() id: string;

  // Event called 'todoCompleted' that is "composed", "cancellable" and it will bubble up!
  @Event({ eventName: "menuItemActive" })
  menuItemActive: EventEmitter<string>;

  includeIcon() {
    if (this.icon !== null) {
      return <gxg-icon slot="icon" type={this.icon} size="small"></gxg-icon>;
    }
  }

  setActive() {
    this.active = true;
    this.menuItemActive.emit(this.id);
  }

  render() {
    return (
      <Host onClick={this.setActive.bind(this)}>
        <li class="menu-item" ref={(el) => (this.listItem = el as HTMLElement)}>
          <div class="menu-item__container">
            {this.includeIcon()}
            {this.label}
          </div>
        </li>
      </Host>
    );
  }
}
