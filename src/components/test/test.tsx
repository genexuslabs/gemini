import { Component, h, Host, Prop, State } from "@stencil/core";
import { GxgComboBox } from "../combo-box/combo-box";
import { GxgModal } from "../modal/modal";
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
  modalCloseButton!: HTMLElement;
  modal!: HTMLElement;
  showModal!: HTMLElement;

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

    this.modalCloseButton.addEventListener("click", () => {
      ((this.modal as unknown) as GxgModal).close();
    });
    this.showModal.addEventListener("click", () => {
      ((this.modal as unknown) as GxgModal).visible = true;
    });
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
        {/* <gxg-combo-box
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
        </gxg-button> */}

        <gxg-modal
          silent
          modal-title="test"
          ref={(el) => (this.modal = (el as unknown) as HTMLElement)}
        >
          this is the description
          <gxg-button
            slot="footer"
            type="secondary-text-only"
            ref={(el) =>
              (this.modalCloseButton = (el as unknown) as HTMLElement)
            }
          >
            Close
          </gxg-button>
        </gxg-modal>
        <gxg-button
          slot="footer"
          type="primary-text-only"
          ref={(el) => (this.showModal = (el as unknown) as HTMLElement)}
        >
          show modal
        </gxg-button>
      </Host>
    );
  }
}
