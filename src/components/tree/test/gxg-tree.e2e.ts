import { newE2EPage } from "@stencil/core/testing";

describe("gxg-tree", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<gxg-tree></gxg-tree>");

    const element = await page.find("gxg-tree");
    expect(element).toHaveClass("hydrated");
  });
});
