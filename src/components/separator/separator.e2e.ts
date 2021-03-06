import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-hr", () => {
  let page: E2EPage;
  let separator: E2EElement;
  let hrInner: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`<gxg-separator></gxg-separator>`);
    separator = await page.find("gxg-separator");
    hrInner = await page.find("gxg-separator >>> hr");
  });

  it("renders", async () => {
    expect(separator).toHaveClass("hydrated");
  });

  it("it is solid", async () => {
    await page.waitForChanges();
    expect(separator.getAttribute("type")).toBe("solid");
    expect((await hrInner.getComputedStyle()).borderStyle).toBe("solid");
  });

  it("it is dashed", async () => {
    separator.setProperty("type", "dashed");
    await page.waitForChanges();
    expect(separator.getAttribute("type")).toBe("dashed");
    expect((await hrInner.getComputedStyle()).borderStyle).toBe("dashed");
  });

  it("has top and bottom margin", async () => {
    await page.waitForChanges();
    //xs
    expect((await hrInner.getComputedStyle()).marginTop).toBe("4px");
    expect((await hrInner.getComputedStyle()).marginBottom).toBe("4px");
    //s
    separator.setAttribute("margin", "s");
    await page.waitForChanges();
    expect((await hrInner.getComputedStyle()).marginTop).toBe("8px");
    expect((await hrInner.getComputedStyle()).marginBottom).toBe("8px");
    //m
    separator.setAttribute("margin", "m");
    await page.waitForChanges();
    expect((await hrInner.getComputedStyle()).marginTop).toBe("16px");
    expect((await hrInner.getComputedStyle()).marginBottom).toBe("16px");
    //l
    separator.setAttribute("margin", "l");
    await page.waitForChanges();
    expect((await hrInner.getComputedStyle()).marginTop).toBe("32px");
    expect((await hrInner.getComputedStyle()).marginBottom).toBe("32px");
    //xl
    separator.setAttribute("margin", "xl");
    await page.waitForChanges();
    expect((await hrInner.getComputedStyle()).marginTop).toBe("64px");
    expect((await hrInner.getComputedStyle()).marginBottom).toBe("64px");
  });
});
