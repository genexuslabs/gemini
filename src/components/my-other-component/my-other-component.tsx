import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-other-component',
  styleUrl: 'my-other-component.scss',
  shadow: true
})
export class MyComponent {
  /**
   * The firsty name
   */
  @Prop() first: string;
  
  /**
   * The middle name
   */
  @Prop() middle: string;
  
  /**
   * The last name
   */
  @Prop() last: string;

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return <div class="my-other-component"><gxg-button>Button 1</gxg-button><gxg-button>Button 2</gxg-button><gxg-button>Button 3</gxg-button></div>;
  }
}
