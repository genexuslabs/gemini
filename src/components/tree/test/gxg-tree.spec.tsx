import { newSpecPage } from "@stencil/core/testing";
import { GxgTree } from "../gxg-tree";

describe("gxg-tree", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [GxgTree],
      html: `<gxg-tree></gxg-tree>`,
    });
    expect(page.root).toEqualHtml(`
      <gxg-tree>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gxg-tree>
    `);
  });
});
