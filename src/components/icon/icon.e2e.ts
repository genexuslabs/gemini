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

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(icon.classList.contains("svgIcon")).toBe(true);
  });

  it("has aria label", async () => {
    await page.waitForChanges();
    expect(icon.getAttribute("aria-label")).toBe("duplicate");
  });

  //Check colors
  it("has the right colors", async () => {
    //warning
    icon.setProperty("color", "warning");
    await page.waitForChanges();
    expect(icon.classList.contains("color-warning")).toBe(true);

    //success
    icon.setProperty("color", "success");
    await page.waitForChanges();
    expect(icon.classList.contains("color-success")).toBe(true);

    //error
    icon.setProperty("color", "error");
    await page.waitForChanges();
    expect(icon.classList.contains("color-error")).toBe(true);
  });

  //Check size
  it("has the right size", async () => {
    //regular
    icon.setProperty("size", "regular");
    await page.waitForChanges();
    expect(icon.getAttribute("size")).toBe("regular");
  });
});
