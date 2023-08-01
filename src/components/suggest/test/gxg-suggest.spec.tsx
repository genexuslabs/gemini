import { newSpecPage } from "@stencil/core/testing";
import { GxgSuggest } from "../gxg-suggest";

describe("gxg-suggest", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [GxgSuggest],
      html: `<gxg-suggest></gxg-suggest>`,
    });
    expect(page.root).toEqualHtml(`
      <gxg-suggest>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gxg-suggest>
    `);
  });
});
