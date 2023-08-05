import { newE2EPage } from "@stencil/core/testing";

describe("gxgch-tree", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<gxgch-tree></gxgch-tree>");

    const element = await page.find("gxgch-tree");
    expect(element).toHaveClass("hydrated");
  });
});
