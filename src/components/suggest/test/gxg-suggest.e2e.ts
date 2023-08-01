import { newE2EPage } from "@stencil/core/testing";

describe("gxg-suggest", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<gxg-suggest></gxg-suggest>");

    const element = await page.find("gxg-suggest");
    expect(element).toHaveClass("hydrated");
  });
});
