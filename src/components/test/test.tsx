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
      id: "1",
      label: "1",
      iconName: null,
    },
    {
      id: "2",
      label: "2",
      iconName: "general/android",
    },
    {
      id: "3",
      label: "3",
      iconName: "general/apple",
      selected: true,
    },
    {
      id: "4",
      label: "4",
      iconName: "general/angular",
    },
  ];

  private model = [
    {
      id: "number-1",
      caption: "number-1 label",
      leaf: false,
      leftImgSrc: "../assets/icons/datastore.svg",
      items: [
        {
          id: "number-1-1",
          caption: "number-1-1",
          leaf: false,
          leftImgSrc: "/build/ch-icon-assets/patterns.svg",
          items: [
            {
              id: "number-1-1-1",
              caption: "number-1-1-1",
              leaf: true,
              leftImgSrc: "../assets/icons/knowledge-base.svg",
            },
            {
              id: "number-1-1-2",
              caption: "number-1-1-2",
              leaf: false,
              leftImgSrc: "../assets/icons/knowledge-base.svg",
              items: [
                {
                  id: "number-1-1-2-1",
                  caption: "number-1-1-2-1 (lazy)",
                  leaf: false,
                  leftImgSrc: "../assets/icons/knowledge-base.svg",
                  lazy: true,
                  checkbox: true,
                  toggleCheckboxes: true,
                },
                {
                  id: "number-1-1-2-2",
                  caption: "number-1-1-2-2",
                  leaf: true,
                  leftImgSrc: "/build/ch-icon-assets/java.svg",
                },
              ],
            },
          ],
        },
        {
          id: "number-1-2",
          caption: "number-1-2",
          leaf: true,
          leftImgSrc: "../assets/icons/knowledge-base.svg",
        },
      ],
    },
    {
      id: "number-2",
      caption: "number-2",
      leaf: false,
      leftImgSrc: "../assets/icons/datastore.svg",
      items: [
        {
          id: "number-2-1",
          caption: "number-2-1",
          leaf: true,
          leftImgSrc: "/build/ch-icon-assets/java.svg",
        },
        {
          id: "number-2-2",
          caption: "number-2-2",
          leaf: true,
          leftImgSrc: "../assets/icons/knowledge-base.svg",
        },
      ],
    },
  ];

  private renderComboBoxItems = (itemsArray) => {
    const comboItemsArray: HTMLGxgComboBoxItemElement[] = [];
    itemsArray.forEach((comboBoxItem) => {
      const iconName = comboBoxItem.iconName || comboBoxItem.icon;
      const value = comboBoxItem.value || comboBoxItem.id;
      comboItemsArray.push(
        <gxg-combo-box-item value={value} icon={iconName} key={comboBoxItem.id}>
          {comboBoxItem.label || comboBoxItem.name}
        </gxg-combo-box-item>
      );
    });
    return comboItemsArray;
  };

  private getSelectedGxOption = (options): string | void => {
    let found;
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
    } else {
      return options[0].id;
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
      // <gxg-combo-box
      //   id="combo-fruits"
      //   placeholder="Select item"
      //   max-width="100%"
      //   label-position="start"
      //   center-label
      //   cursor-end
      //   value={this.getSelectedGxOption(this.comboValues)}
      //   onValueChanged={this.valueChangedHandler}
      // >
      //   {this.renderComboBoxItems(this.comboValues)}
      // </gxg-combo-box>,
      // <button onClick={this.updateFrontEnds}>update</button>,
      // <gxg-tree-view treeModel={this.model}></gxg-tree-view>,
    ];
  }
}
