import {
  Component,
  Host,
  h,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
} from "@stencil/core";
import { CheckboxInfo } from "../form-checkbox/form-checkbox";

@Component({
  tag: "gxg-form-checkbox-group",
  styleUrl: "gxg-form-checkbox-group.scss",
  shadow: true,
})
export class GxgFormCheckboxGroup {
  @Element() el: HTMLGxgFormCheckboxGroupElement;

  /**
   * The presence of this attribute makes the checkboxes be displayed with flex "row", instead of flex "column"
   */
  @Prop() row: boolean;

  @Event() groupValuesChanged: EventEmitter<CheckboxesGroupValues>;

  @Listen("change")
  changeHandler(event: CustomEvent<CheckboxInfo>) {
    const checkboxesGroupInfo = this.getCheckboxesInfo();
    this.groupValuesChanged.emit(checkboxesGroupInfo);
  }

  private getCheckboxesInfo = (): CheckboxesGroupValues => {
    const checkboxesArray: CheckboxesGroupValues = [];
    const checkboxes = this.el.querySelectorAll("gxg-form-checkbox");
    checkboxes.forEach((checkbox) => {
      checkboxesArray.push({
        id: checkbox.checkboxId,
        value: checkbox.checked,
        disabled: checkbox.disabled,
      });
    });
    return checkboxesArray;
  };

  render() {
    return (
      <Host>
        <div
          class={{
            "checkboxes-wrapper": true,
            "checkboxes-wrapper--row": this.row,
          }}
        >
          <slot></slot>
        </div>
      </Host>
    );
  }
}

export type CheckboxesGroupValues = CheckboxInfo[];
