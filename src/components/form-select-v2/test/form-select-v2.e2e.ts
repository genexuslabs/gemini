import { newE2EPage } from "@stencil/core/testing";

describe("form-select-v2", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<form-select-v2></form-select-v2>");

    const element = await page.find("form-select-v2");
    expect(element).toHaveClass("hydrated");
  });
});
