import { Component, h, Prop, Listen, Element } from "@stencil/core";
import { button } from "@storybook/addon-knobs";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;

  /**
   * The presence of this attribute makes the input disabled
   */
  @Prop() comboValues = [
    {
      id: "web-net",
      label: "Web (.NET)",
      iconName: null,
    },
    {
      id: "android",
      label: "Android",
      iconName: "general/android",
      selected: true,
    },
    {
      id: "apple",
      label: "Apple",
      iconName: "general/apple",
    },
    {
      id: "web-angular",
      label: "Web (Angular)",
      iconName: "general/angular",
    },
    {
      id: "we-chat-mini-program",
      label: "We Chat Mini Program",
      iconName: null,
    },
  ];

  private updatedComboValues = [
    {
      id: "web-net-new",
      label: "Web (.NET) New",
      iconName: null,
    },
    {
      id: "android-new",
      label: "Android New",
      iconName: "general/android",
    },
    {
      id: "apple-new",
      label: "Apple New",
      iconName: "general/apple",
      selected: true,
    },
    {
      id: "web-angular-new",
      label: "Web (Angular) New",
      iconName: "general/angular",
    },
  ];

  private renderComboBoxItems = (itemsArray) => {
    const comboItemsArray: HTMLGxgComboBoxItemElement[] = [];
    itemsArray.forEach((comboBoxItem) => {
      const iconName = comboBoxItem.iconName || comboBoxItem.icon;
      const value = comboBoxItem.value || comboBoxItem.id;
      comboItemsArray.push(
        <gxg-combo-box-item value={value} icon={iconName}>
          {comboBoxItem.label || comboBoxItem.name}
        </gxg-combo-box-item>
      );
    });
    return comboItemsArray;
  };

  private getSelectedGxOption = (options): any => {
    let found = null;
    if (options?.length) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          found = options[i];
          break;
        }
      }
    }
    if (found) {
      return found.id;
    }
  };

  private updateFrontEnds = () => {
    this.comboValues = this.updatedComboValues;
  };

  private valueChangedHandler = (e) => {
    console.log("value updated", e.detail);
  };

  render() {
    return [
      <gxg-combo-box
        id="combo-fruits"
        placeholder="Select item"
        max-width="100%"
        label-position="start"
        center-label
        cursor-end
        value={this.getSelectedGxOption(this.comboValues)}
        onValueChanged={this.valueChangedHandler}
      >
        {this.renderComboBoxItems(this.comboValues)}
      </gxg-combo-box>,
      <button onClick={this.updateFrontEnds}>update</button>,
    ];
  }
}
