import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-accordion-1", () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`<gxg-accordion>tab 01</gxg-accordion>`);
    element = await page.find("gxg-accordion");
  });

  it("renders", async () => {
    expect(element).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(element.textContent).toBe("Primary Text Only");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(element.classList.contains("button--primary-text-only")).toBe(true);
  });

  it("has role attribute", async () => {
    await page.waitForChanges();
    expect(element.getAttribute("role")).toBe("button");
  });

  it("fires click event", async () => {
    await page.waitForChanges();

    const clickEventSpy = await element.spyOnEvent("click");
    element.triggerEvent("click");
    await page.waitForChanges();
    // Kent C. Dodds
    expect(clickEventSpy).toHaveReceivedEvent();
  });
});
