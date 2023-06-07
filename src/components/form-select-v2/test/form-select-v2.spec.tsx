import { newSpecPage } from "@stencil/core/testing";
import { FormSelectV2 } from "../gxg-select-v2";

describe("form-select-v2", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FormSelectV2],
      html: `<form-select-v2></form-select-v2>`,
    });
    expect(page.root).toEqualHtml(`
      <form-select-v2>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </form-select-v2>
    `);
  });
});
