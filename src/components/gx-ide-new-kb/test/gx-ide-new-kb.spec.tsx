import { newSpecPage } from "@stencil/core/testing";
import { GxIdeNewKb } from "../gx-ide-new-kb";

describe("gx-ide-new-kb", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [GxIdeNewKb],
      html: `<gx-ide-new-kb></gx-ide-new-kb>`,
    });
    expect(page.root).toEqualHtml(`
      <gx-ide-new-kb>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gx-ide-new-kb>
    `);
  });
});
