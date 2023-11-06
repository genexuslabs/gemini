import { Component, h, Prop, Listen, State, Element } from "@stencil/core";
@Component({
  tag: "gxg-test",
  styleUrl: "test.scss",
  shadow: true,
})
export class GxgTest {
  @Element() el: HTMLElement;

  render() {
    return (
      <gxg-grid ellipsis-cell-wrapper noBorder>
        <ch-grid row-selection-mode="multiple">
          <ch-grid-columnset>
            <ch-grid-column
              settingable={false}
              sortable={false}
              columnType="tree"
            ></ch-grid-column>
            <ch-grid-column
              settingable={false}
              sortable={false}
            ></ch-grid-column>
            <ch-grid-column
              settingable={false}
              sortable={false}
            ></ch-grid-column>
            <ch-grid-column
              columnName="Name"
              settingable={false}
            ></ch-grid-column>
            <ch-grid-column
              columnName="Type"
              settingable={false}
            ></ch-grid-column>
            <ch-grid-column
              columnName="Description"
              settingable={false}
            ></ch-grid-column>
            <ch-grid-column
              columnName="Notes"
              settingable={false}
            ></ch-grid-column>
          </ch-grid-columnset>

          <ch-grid-row>
            <ch-grid-cell>
              <span class="cell-wrapper">
                <gxg-icon
                  type="gemini-tools/notice"
                  color="primary-active"
                ></gxg-icon>
              </span>
            </ch-grid-cell>
            <ch-grid-cell>
              <span class="cell-wrapper">
                <gxg-icon type="objects/data-provider" color="auto"></gxg-icon>
              </span>
            </ch-grid-cell>
            <ch-grid-cell>
              <span class="cell-wrapper">
                <gxg-icon
                  type="gx-server/changes-commit-pending"
                  color="primary-active"
                ></gxg-icon>
              </span>
            </ch-grid-cell>
            <ch-grid-cell>
              <span class="cell-wrapper"> Object Name </span>
            </ch-grid-cell>
            <ch-grid-cell>
              <span class="cell-wrapper"> Object Type </span>
            </ch-grid-cell>
            <ch-grid-cell>
              <span class="cell-wrapper"> Object Description </span>
            </ch-grid-cell>
            <ch-grid-cell>
              <span class="cell-wrapper"> Object Notes </span>
            </ch-grid-cell>
            <ch-grid-rowset>
              <ch-grid-rowset-empty>
                <p>Some Info message</p>
              </ch-grid-rowset-empty>
            </ch-grid-rowset>
          </ch-grid-row>
        </ch-grid>
      </gxg-grid>
    );
  }
}
