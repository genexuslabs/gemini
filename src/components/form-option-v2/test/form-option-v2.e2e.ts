import { newE2EPage } from "@stencil/core/testing";

describe("form-option-v2", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<form-option-v2></form-option-v2>");

    const element = await page.find("form-option-v2");
    expect(element).toHaveClass("hydrated");
  });
});
