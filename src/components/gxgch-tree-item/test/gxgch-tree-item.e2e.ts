import { newE2EPage } from "@stencil/core/testing";

describe("gxgch-tree-item", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<gxgch-tree-item></gxgch-tree-item>");

    const element = await page.find("gxgch-tree-item");
    expect(element).toHaveClass("hydrated");
  });
});
