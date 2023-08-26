import { newE2EPage } from "@stencil/core/testing";

describe("gxg-menu-list", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<gxg-menu-list></gxg-menu-list>");

    const element = await page.find("gxg-menu-list");
    expect(element).toHaveClass("hydrated");
  });
});
