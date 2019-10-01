import { Component, Prop, h, Host } from '@stencil/core';

@Component({
    tag: 'gxg-base-component-template',
    styleUrl: 'base-component-template.scss',
    shadow: true
  })
export class MyComponent {

  /**
   * The kind of base-component-template
   * Possible values: primary, secondary.
   */
  @Prop() type: string = 'primary';


  render() {
    return (
      <Host class={{
        'base-component-template': true,
        'base-component-template--primary': this.type === 'primary'
        }}
      >
      <div class="base-component-template-native">
        <slot/>
      </div>
      </Host>
    );
  }
}

  
