import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-spacer-layout", () => {
  let page: E2EPage;
  let spacer: E2EElement;
  let btn1: E2EElement;
  let btn2: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="background:#ccc;">
      <gxg-spacer-layout
        space="xs"
        orientation="horizontal"
        justify-content="start"
      >
        <gxg-button id="btn1" type="primary-text-only">Salt</gxg-button>
        <gxg-button id="btn2" type="primary-text-only">Pepper</gxg-button>
    </gxg-spacer-layout>
  </div>`
    );
    spacer = await page.find("gxg-spacer-layout");
    btn1 = await page.find("gxg-button#btn1");
    btn2 = await page.find("gxg-button#btn2");
  });

  it("renders", async () => {
    expect(spacer).toHaveClass("hydrated");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(spacer).toHaveClass("horizontal");
    expect(spacer).toHaveClass("xs");
  });

  it("has the right spaces", async () => {
    await page.waitForChanges();
    expect((await btn1.getComputedStyle()).marginRight).toBe("4px");
    expect((await btn2.getComputedStyle()).marginRight).toBe("0px");

    //space s
    spacer.setProperty("space", "s");
    await page.waitForChanges();
    expect((await btn1.getComputedStyle()).marginRight).toBe("8px");
    expect((await btn2.getComputedStyle()).marginRight).toBe("0px");

    //space m
    spacer.setProperty("space", "m");
    await page.waitForChanges();
    expect((await btn1.getComputedStyle()).marginRight).toBe("16px");
    expect((await btn2.getComputedStyle()).marginRight).toBe("0px");

    //space l
    spacer.setProperty("space", "l");
    await page.waitForChanges();
    expect((await btn1.getComputedStyle()).marginRight).toBe("32px");
    expect((await btn2.getComputedStyle()).marginRight).toBe("0px");

    //space xl
    spacer.setProperty("space", "xl");
    await page.waitForChanges();
    expect((await btn1.getComputedStyle()).marginRight).toBe("64px");
    expect((await btn2.getComputedStyle()).marginRight).toBe("0px");

    //change justify-content end
    spacer.setProperty("justifyContent", "end");
    await page.waitForChanges();
    expect(spacer).toHaveClass("flex-end");

    //change justify-content center
    spacer.setProperty("justifyContent", "center");
    await page.waitForChanges();
    expect(spacer).toHaveClass("center");

    //change justify-content space-around
    spacer.setProperty("justifyContent", "space-around");
    await page.waitForChanges();
    expect(spacer).toHaveClass("space-around");

    //change justify-content space-between
    spacer.setProperty("justifyContent", "space-between");
    await page.waitForChanges();
    expect(spacer).toHaveClass("space-between");
  });
});
