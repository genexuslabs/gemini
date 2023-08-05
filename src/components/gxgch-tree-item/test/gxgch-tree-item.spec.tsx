import { newSpecPage } from "@stencil/core/testing";
import { GxgchTreeItem } from "../gxgch-tree-item";

describe("gxgch-tree-item", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [GxgchTreeItem],
      html: `<gxgch-tree-item></gxgch-tree-item>`,
    });
    expect(page.root).toEqualHtml(`
      <gxgch-tree-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gxgch-tree-item>
    `);
  });
});
