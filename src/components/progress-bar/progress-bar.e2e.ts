import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-progress-bar", () => {
  let page: E2EPage;
  let progressBar: E2EElement;
  let outerWrapper: E2EElement;
  let label: E2EElement;
  let outerBar: E2EElement;
  let innerBar: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:600px;"><gxg-progress-bar
      label="Progress Bar"
      value="50"
    ></gxg-progress-bar></div>`
    );
    progressBar = await page.find("gxg-progress-bar");
    outerWrapper = await page.find("gxg-progress-bar >>> .outer-wrapper");
    label = await page.find("gxg-progress-bar >>> label");
    outerBar = await page.find("gxg-progress-bar >>> .outer-bar");
    innerBar = await page.find("gxg-progress-bar >>> .inner-bar");
  });

  it("renders", async () => {
    expect(progressBar).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(label.textContent).toBe("Progress Bar");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(outerWrapper).toHaveClass("outer-wrapper");
    expect(label).toHaveClass("label");
    expect(outerBar).toHaveClass("outer-bar");
    expect(innerBar).toHaveClass("inner-bar");
  });

  it("has the right width and progress", async () => {
    await page.waitForChanges();
    expect((await outerBar.getComputedStyle()).width).toBe("600px");
    expect((await innerBar.getComputedStyle()).width).toBe("300px");
  });

  it("is fullwidth", async () => {
    await page.waitForChanges();
    progressBar.setProperty("fullWidth", true);
    await page.waitForChanges();
    expect((await outerBar.getComputedStyle()).width).toBe("600px");
    expect((await innerBar.getComputedStyle()).width).toBe("300px");
  });
});
