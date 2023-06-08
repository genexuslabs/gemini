import { newE2EPage } from "@stencil/core/testing";

describe("gx-ide-new-kb", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<gx-ide-new-kb></gx-ide-new-kb>");

    const element = await page.find("gx-ide-new-kb");
    expect(element).toHaveClass("hydrated");
  });
});
