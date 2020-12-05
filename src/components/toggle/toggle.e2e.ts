import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-toggle", () => {
  let page: E2EPage;
  let toggle: E2EElement;
  let toggleContainer: E2EElement;
  let toggleContainerKnob: E2EElement;
  let toggleLabel: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`<gxg-toggle></gxg-toggle>`);
    toggle = await page.find("gxg-toggle");
    toggleContainer = await page.find("gxg-toggle >>> .toggle__container");
    toggleContainerKnob = await page.find(
      "gxg-toggle >>> .toggle__container__knob"
    );
    toggleLabel = await page.find("gxg-toggle >>> .toggle__label");
  });

  it("renders", async () => {
    expect(toggle).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(toggleLabel.textContent).toBe("Label");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(toggle).toHaveClass("toggle");
    expect(toggleContainer).toHaveClass("toggle__container");
    expect(toggleContainerKnob).toHaveClass("toggle__container__knob");
    expect(toggleLabel).toHaveClass("toggle__label");
  });

  it("has 'on' attribute", async () => {
    toggle.setProperty("on", true);
    await page.waitForChanges();
    expect(await toggle).toHaveAttribute("on");
  });

  it("is disabled", async () => {
    toggle.setProperty("disabled", true);
    await page.waitForChanges();
    expect(await toggle).toHaveAttribute("disabled");
  });
});
