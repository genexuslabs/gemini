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
      `<gxg-progress-bar
      label="Progress Bar"
      value="50"
      width="400px"
    ></gxg-progress-bar>`
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

  it("has the right progress", async () => {
    await page.waitForChanges();
    expect((await outerBar.getComputedStyle()).width).toBe("400px");
    expect((await innerBar.getComputedStyle()).width).toBe("200px");
  });
});
