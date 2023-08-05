import { newSpecPage } from "@stencil/core/testing";
import { GxgchTree } from "../gxgch-tree";

describe("gxgch-tree", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [GxgchTree],
      html: `<gxgch-tree></gxgch-tree>`,
    });
    expect(page.root).toEqualHtml(`
      <gxgch-tree>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gxgch-tree>
    `);
  });
});
