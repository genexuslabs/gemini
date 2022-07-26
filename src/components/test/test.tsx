import {
  Component,
  h,
  Host,
  Prop,
  Method,
  Watch,
  State,
  Element,
} from "@stencil/core";
import { GxgComboBox } from "../combo-box/combo-box";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Prop() name = "Andres";
  @Prop() show = false;
  @State() comboListArray = [];

  comboBox!: GxgComboBox;

  componentDidLoad() {
    setTimeout(() => {
      this.comboListArray = [
        {
          icon: "objects/data-provider",
          value: "data-management",
          description: "Data Management",
        },
        {
          icon: "objects/business-process-diagram",
          value: 12,
          description: "BPM",
        },
        { icon: "objects/dso", value: "dso", description: "DSO" },
      ];
    }, 1000);
  }

  getValue() {
    console.log(this.comboBox.value);
  }

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <gxg-combo-box
          id="gxgCombo1"
          disable-filter
          placeholder="Select item"
          value="bpm"
          strict
          ref={(el) => (this.comboBox = (el as unknown) as GxgComboBox)}
        >
          {this.comboListArray.map((i) => (
            <gxg-combo-box-item icon={i.icon} value={i.value}>
              {i.description}
            </gxg-combo-box-item>
          ))}
        </gxg-combo-box>
        <gxg-button type="primary-text-only" onClick={this.getValue.bind(this)}>
          Get value
        </gxg-button>
      </Host>
    );
  }
}
