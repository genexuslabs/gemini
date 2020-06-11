import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-menu", () => {
  let page: E2EPage;
  let menu: E2EElement;
  let menuList: E2EElement;
  let menuHeader: E2EElement;
  let menuTitle: E2EElement;
  let menuItem1: E2EElement;
  let menuItem1Li: E2EElement;
  let menuItem1Container: E2EElement;
  let menuItem2: E2EElement;
  let menuItem2Li: E2EElement;
  let menuItem2Container: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<div style="width:500px">
      <gxg-menu menu-title="fruits" width="400px">
        <gxg-menu-item id="menu-item-1" label="apple" icon="" active></gxg-menu-item>
        <gxg-menu-item id="menu-item-2" label="banana" icon="error"></gxg-menu-item>
      </gxg-menu>
    </div>`
    );

    menu = await page.find("gxg-menu");
    menuList = await page.find("gxg-menu >>> .menuList");
    menuHeader = await page.find("gxg-menu >>> .menu__header");
    menuTitle = await page.find("gxg-menu >>> .menu__header__title");
    menuItem1 = await page.find("gxg-menu-item#menu-item-1");
    menuItem1Li = await page.find("gxg-menu-item#menu-item-1 >>> .menu-item");
    menuItem1Container = await page.find(
      "gxg-menu-item#menu-item-1 >>> .menu-item__container"
    );
    menuItem2 = await page.find("gxg-menu-item#menu-item-2");
    menuItem2Li = await page.find("gxg-menu-item#menu-item-2 >>> .menu-item");
    menuItem2Container = await page.find(
      "gxg-menu-item#menu-item-2 >>> .menu-item__container"
    );
  });

  it("renders", async () => {
    expect(menu).toHaveClass("hydrated");
    expect(menuItem1).toHaveClass("hydrated");
    expect(menuItem2).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(menuTitle.textContent).toBe("fruits");
    expect(menuItem1Container.textContent).toBe("apple");
    expect(menuItem2Container.textContent).toBe("banana");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(menuHeader).toHaveClass("menu__header");
    expect(menuTitle).toHaveClass("menu__header__title");
    expect(menuList).toHaveClass("menuList");
    expect(menuItem1Container).toHaveClass("menu-item__container");
    expect(menuItem1Li).toHaveClass("menu-item");
    expect(menuItem2Container).toHaveClass("menu-item__container");
    expect(menuItem2Li).toHaveClass("menu-item");
  });

  it("has active attribute", async () => {
    await page.waitForChanges();
    expect(menuItem1).toHaveAttribute("active");
    expect(menuItem2).not.toHaveAttribute("active");

    menuItem2.triggerEvent("click");
    await page.waitForChanges();
    expect(menuItem1).not.toHaveAttribute("active");
    expect(menuItem2).toHaveAttribute("active");
  });

  it("is not full width / it is full width", async () => {
    await page.waitForChanges();
    expect((await menu.getComputedStyle()).width).toBe("400px");

    menu.setProperty("fullWidth", true);
    await page.waitForChanges();
    expect((await menu.getComputedStyle()).width).toBe("500px");
  });

  it("has styles for tabs", async () => {
    menu.setProperty("tabs", true);
    await page.waitForChanges();
    expect(menu).toHaveAttribute("tabs");
  });
});
