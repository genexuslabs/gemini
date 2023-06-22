import { Component, h, Host, Prop, State, Method } from "@stencil/core";
//import { GxgComboBox } from "../combo-box/combo-box";
//import { GxgFormSelect } from "../form-select/gxg-select";
//import { GxgModal } from "../modal/modal";
import state from "../store";

@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Prop() name = "Andres";
  @Prop() show = false;
  @Prop() showValidationMessage = false;
  @State() comboListArray = [];
  private formText!: HTMLGxgFormTextElement;

  @Method()
  async validate(): Promise<boolean> {
    //const isValid = this.validateData();
    return true;
  }

  private validateText = () => {
    this.formText.validate();
  };

  render() {
    return (
      <Host
        class={{
          large: state.large,
        }}
      >
        <gxg-form-text
          value="uno"
          minLength="5"
          display-validation-styles
          display-validation-message
          ref={(el: HTMLGxgFormTextElement) =>
            (this.formText = el as HTMLGxgFormTextElement)
          }
        ></gxg-form-text>
        <gxg-button onClick={this.validateText}>Validate</gxg-button>
      </Host>
    );
  }
}
