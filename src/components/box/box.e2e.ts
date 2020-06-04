import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

let page: E2EPage;
let box: E2EElement;

describe("gxg-box-fullwidth", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:200px"><gxg-box full-width
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
    expect((await box.getComputedStyle()).width).toBe("200px");
  });
});

describe("gxg-box-light-gray", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-box gray="1" width="300px"
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
});

describe("gxg-box-dark-gray", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-box gray="2" width="300px"
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
    expect(box.getAttribute("gray")).toBe("2");
  });
});

describe("gxg-box-border", () => {
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

describe("gxg-box-width", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-box border width="325px"
      >Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae blanditiis
      temporibus laudantium maxime laboriosam a, animi quo dolorem perspiciatis?
      Ad fugiat nobis cum? Consectetur earum tempore iusto quos sunt
      sint?</gxg-box>`
    );
    box = await page.find("gxg-box");
  });

  it("has the right width", async () => {
    expect((await box.getComputedStyle()).width).toBe("325px");
  });
});

describe("gxg-box-padding", () => {
  let box2: E2EElement;
  let box3: E2EElement;
  let box4: E2EElement;
  let box5: E2EElement;
  let box6: E2EElement;
  let box7: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      <gxg-box id="id01" border space padding="xs">Lorem ipsum</gxg-box>
      <gxg-box id="id02" border space padding="s">Lorem ipsum</gxg-box>
      <gxg-box id="id03" border space padding="m">Lorem ipsum</gxg-box>
      <gxg-box id="id04" border space padding="l">Lorem ipsum</gxg-box>
      <gxg-box id="id05" border space padding="xl">Lorem ipsum</gxg-box>
      <gxg-box id="id06" border space padding="xxl">Lorem ipsum</gxg-box>
      <gxg-box id="id07" border space padding="xxxl">Lorem ipsum</gxg-box>
      `
    );
    box = await page.find("gxg-box#id01");
    box2 = await page.find("gxg-box#id02");
    box3 = await page.find("gxg-box#id03");
    box4 = await page.find("gxg-box#id04");
    box5 = await page.find("gxg-box#id05");
    box6 = await page.find("gxg-box#id06");
    box7 = await page.find("gxg-box#id07");
  });

  it("has the right padding", async () => {
    expect((await box.getComputedStyle()).padding).toBe("4px");
    expect((await box2.getComputedStyle()).padding).toBe("8px");
    expect((await box3.getComputedStyle()).padding).toBe("12px");
    expect((await box4.getComputedStyle()).padding).toBe("16px");
    expect((await box5.getComputedStyle()).padding).toBe("24px");
    expect((await box6.getComputedStyle()).padding).toBe("32px");
    expect((await box7.getComputedStyle()).padding).toBe("40px");
  });
});
