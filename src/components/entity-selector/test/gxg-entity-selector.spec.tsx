import { newSpecPage } from "@stencil/core/testing";
import { GxgEntitySelector } from "../gxg-entity-selector";

describe("gxg-entity-selector", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [GxgEntitySelector],
      html: `<gxg-entity-selector></gxg-entity-selector>`,
    });
    expect(page.root).toEqualHtml(`
      <gxg-entity-selector>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gxg-entity-selector>
    `);
  });
});
