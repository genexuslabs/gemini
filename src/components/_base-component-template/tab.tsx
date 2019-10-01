import { Component, Prop, h, Host } from '@stencil/core';

@Component({
    tag: 'gxg-tab',
    styleUrl: 'tab.scss',
    shadow: true
  })
export class MyComponent {

  /**
   * The kind of tab
   * Possible values: primary, secondary.
   */
  @Prop() type: string = 'primary';


  render() {
    return (
      <Host class={{
        'tab': true,
        'tab--primary': this.type === 'primary'
        }}
      >
      <li class="tab-native">
        <slot/>
      </li>
      </Host>
    );
  }
}

  
