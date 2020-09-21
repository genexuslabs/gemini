import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

let page: E2EPage;
let box: E2EElement;

describe("gxg-box fullwidth", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:200px"><gxg-box
      >Lorem ipsum dolor sit amet consectetur adipisicing elit.</gxg-box
    ></div>`
    );
    box = await page.find("gxg-box");
  });

  it("renders", async () => {
    expect(box).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(box.textContent).toBe(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    );
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(box.classList.contains("card")).toBe(true);
  });

  it("is full width", async () => {
    expect((await box.getComputedStyle()).width).toBe("192px");
  });
});

describe("gxg-box gray", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    //light gray
    await page.setContent(
      `<gxg-box gray="1"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae blanditiis
      temporibus laudantium maxime laboriosam a, animi quo dolorem perspiciatis?
      Ad fugiat nobis cum? Consectetur earum tempore iusto quos sunt
      sint?</gxg-box
    >`
    );
    box = await page.find("gxg-box");
  });

  it("has the right attribute", async () => {
    await page.waitForChanges();
    expect(box.getAttribute("gray")).toBe("1");
  });

  it("has the right attribute", async () => {
    //dark gray
    box.setAttribute("gray", "2");
    await page.waitForChanges();
    expect(box.getAttribute("gray")).toBe("2");
  });
});

describe("gxg-box border", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-box border
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae blanditiis
      temporibus laudantium maxime laboriosam a, animi quo dolorem perspiciatis?
      Ad fugiat nobis cum? Consectetur earum tempore iusto quos sunt
      sint?</gxg-box>`
    );
    box = await page.find("gxg-box");
  });

  it("has the right attribute", async () => {
    await page.waitForChanges();
    expect(box.getAttribute("border")).toBe("");
  });
});

describe("gxg-box width", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:500px"><gxg-box border
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae blanditiis
      temporibus laudantium maxime laboriosam a, animi quo dolorem perspiciatis?
      Ad fugiat nobis cum? Consectetur earum tempore iusto quos sunt
      sint?</gxg-box></div>`
    );
    box = await page.find("gxg-box");
  });

  it("has the right width", async () => {
    expect((await box.getComputedStyle()).width).toBe("492px");
  });
});

describe("gxg-box padding", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      <gxg-box border space padding="xs">Lorem ipsum</gxg-box>
      `
    );
    box = await page.find("gxg-box");
  });

  it("has the right padding", async () => {
    //padding xs
    expect((await box.getComputedStyle()).padding).toBe("4px");

    //padding s
    box.setAttribute("padding", "s");
    await page.waitForChanges();
    expect((await box.getComputedStyle()).padding).toBe("8px");

    //padding m
    box.setAttribute("padding", "m");
    await page.waitForChanges();
    expect((await box.getComputedStyle()).padding).toBe("12px");

    //padding l
    box.setAttribute("padding", "l");
    await page.waitForChanges();
    expect((await box.getComputedStyle()).padding).toBe("16px");

    //padding xl
    box.setAttribute("padding", "xl");
    await page.waitForChanges();
    expect((await box.getComputedStyle()).padding).toBe("24px");

    //padding xl
    box.setAttribute("padding", "xxl");
    await page.waitForChanges();
    expect((await box.getComputedStyle()).padding).toBe("32px");

    //padding xl
    box.setAttribute("padding", "xxxl");
    await page.waitForChanges();
    expect((await box.getComputedStyle()).padding).toBe("40px");
  });
});
