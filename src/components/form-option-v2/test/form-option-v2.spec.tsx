import { newSpecPage } from "@stencil/core/testing";
import { FormOptionV2 } from "../form-option-v2";

describe("form-option-v2", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [FormOptionV2],
      html: `<form-option-v2></form-option-v2>`,
    });
    expect(page.root).toEqualHtml(`
      <form-option-v2>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </form-option-v2>
    `);
  });
});
