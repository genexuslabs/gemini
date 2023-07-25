import { newE2EPage } from "@stencil/core/testing";

describe("gxg-entity-selector", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<gxg-entity-selector></gxg-entity-selector>");

    const element = await page.find("gxg-entity-selector");
    expect(element).toHaveClass("hydrated");
  });
});
