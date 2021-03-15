import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-icon", () => {
  let page: E2EPage;
  let icon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-icon size="small" slot="icon" type="duplicate"></gxg-icon>`
    );
    icon = await page.find("gxg-icon");
  });

  it("renders", async () => {
    expect(icon).toHaveClass("hydrated");
  });

  //Check size
  it("has the right size", async () => {
    //regular
    icon.setProperty("size", "regular");
    await page.waitForChanges();
    expect(icon.getAttribute("size")).toBe("regular");
  });
});
