import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-stack", () => {
  let page: E2EPage;
  let stack: E2EElement;
  let btn1: E2EElement;
  let btn2: E2EElement;
  let btn3: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-stack space="xs">
      <gxg-button id="btn1" type="primary-text-only" style="display:block;">Salt</gxg-button>
      <gxg-button id="btn2" type="primary-text-only" style="display:block;">Pepper</gxg-button>
    </gxg-stack>`
    );
    stack = await page.find("gxg-stack");
    btn1 = await page.find("gxg-button#btn1");
    btn2 = await page.find("gxg-button#btn2");
  });

  it("renders", async () => {
    expect(stack).toHaveClass("hydrated");
  });
  it("has space attribute", async () => {
    await page.waitForChanges();
    expect(stack.getAttribute("space")).toBe("xs");
  });
  it("has the right spacing", async () => {
    await page.waitForChanges();
    expect((await btn1.getComputedStyle()).marginBottom).toBe("4px");
    expect((await btn2.getComputedStyle()).marginBottom).toBe("0px");
  });

  //test other spacings
  it("has the right spacings", async () => {
    //s
    stack.setProperty("space", "s");
    await page.waitForChanges();
    expect(stack.getAttribute("space")).toBe("s");
    expect((await btn1.getComputedStyle()).marginBottom).toBe("8px");
    expect((await btn2.getComputedStyle()).marginBottom).toBe("0px");

    //m
    stack.setProperty("space", "m");
    await page.waitForChanges();
    expect(stack.getAttribute("space")).toBe("m");
    expect((await btn1.getComputedStyle()).marginBottom).toBe("16px");
    expect((await btn2.getComputedStyle()).marginBottom).toBe("0px");

    //l
    stack.setProperty("space", "l");
    await page.waitForChanges();
    expect(stack.getAttribute("space")).toBe("l");
    expect((await btn1.getComputedStyle()).marginBottom).toBe("32px");
    expect((await btn2.getComputedStyle()).marginBottom).toBe("0px");

    //xl
    stack.setProperty("space", "xl");
    await page.waitForChanges();
    expect(stack.getAttribute("space")).toBe("xl");
    expect((await btn1.getComputedStyle()).marginBottom).toBe("64px");
    expect((await btn2.getComputedStyle()).marginBottom).toBe("0px");
  });
});
