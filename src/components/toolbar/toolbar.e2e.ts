import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-toolbar", () => {
  let page: E2EPage;
  let toolbar: E2EElement;
  let toolbarIcon: E2EElement;
  let toolbarToolbar: E2EElement;
  let toolbarToolbarLeftContainer: E2EElement;
  let toolbarToolbarLeftContainerTitle: E2EElement;
  let toolbarToolbarLeftContainerSubtitle: E2EElement;
  let toolbarToolbarRightContainer: E2EElement;
  let toolbarItem1: E2EElement;
  let toolbarItem1Item: E2EElement;
  let toolbarItem1ItemLabel: E2EElement;
  let toolbarItem1ItemLabelTitle: E2EElement;
  let toolbarItem1ItemLabelSubtitle: E2EElement;
  let toolbarItem2: E2EElement;
  let toolbarItem2Item: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-toolbar title="Title" subtitle="Subtitle" position="left">
      <gxg-toolbar-item
        slot
        icon="settings"
        title="title"
        subtitle="subtitle"
        onClick="toolbarFunc01()"
        id="toolbar-item-01"
      ></gxg-toolbar-item>
      <gxg-toolbar-item
        slot
        icon="settings"
        title="title"
        subtitle="subtitle"
        disabled
        id="toolbar-item-02"
      ></gxg-toolbar-item>
    </gxg-toolbar>`
    );

    toolbar = await page.find("gxg-toolbar");
    toolbarToolbar = await page.find("gxg-toolbar >>> .toolbar");
    toolbarIcon = await page.find("gxg-toolbar >>> gxg-icon");
    toolbarToolbarLeftContainer = await page.find(
      "gxg-toolbar >>> .left-container"
    );
    toolbarToolbarLeftContainerTitle = await page.find(
      "gxg-toolbar >>> .left-container__title"
    );
    toolbarToolbarLeftContainerSubtitle = await page.find(
      "gxg-toolbar >>> .left-container__subtitle"
    );
    toolbarToolbarRightContainer = await page.find(
      "gxg-toolbar >>> .right-container"
    );
    toolbarItem1 = await page.find("gxg-toolbar-item#toolbar-item-01");
    toolbarItem1Item = await page.find(
      "gxg-toolbar-item#toolbar-item-01 >>> .toolbar-item"
    );
    toolbarItem1ItemLabel = await page.find(
      "gxg-toolbar-item#toolbar-item-01 >>> .toolbar-item__label"
    );
    toolbarItem1ItemLabelTitle = await page.find(
      "gxg-toolbar-item#toolbar-item-01 >>> .toolbar-item__label__title"
    );
    toolbarItem1ItemLabelSubtitle = await page.find(
      "gxg-toolbar-item#toolbar-item-01 >>> .toolbar-item__label__subtitle"
    );
    toolbarItem2 = await page.find("gxg-toolbar-item#toolbar-item-02");
    toolbarItem2Item = await page.find(
      "gxg-toolbar-item#toolbar-item-02 >>> .toolbar-item"
    );
  });

  it("renders", async () => {
    expect(toolbar).toHaveClass("hydrated");
    expect(toolbarItem1).toHaveClass("hydrated");
    expect(toolbarItem2).toHaveClass("hydrated");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(toolbarToolbar).toHaveClass("toolbar");
    expect(toolbarToolbarLeftContainer).toHaveClass("left-container");
    expect(toolbarToolbarLeftContainerTitle).toHaveClass(
      "left-container__title"
    );
    expect(toolbarToolbarLeftContainerSubtitle).toHaveClass(
      "left-container__subtitle"
    );
    expect(toolbarToolbarRightContainer).toHaveClass("right-container");
    expect(toolbarItem1Item).toHaveClass("toolbar-item");
    expect(toolbarItem1ItemLabel).toHaveClass("toolbar-item__label");
    expect(toolbarItem1ItemLabelSubtitle).toHaveClass(
      "toolbar-item__label__subtitle"
    );
    expect(toolbarItem2Item).toHaveClass("toolbar-item");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(toolbarToolbarLeftContainerTitle.textContent).toBe("Title:");
    expect(toolbarToolbarLeftContainerSubtitle.textContent).toBe("Subtitle");
    expect(toolbarItem1ItemLabelTitle.textContent).toBe("title");
    expect(toolbarItem1ItemLabelSubtitle.textContent).toBe("subtitle");
  });

  it("has the right attribute", async () => {
    await page.waitForChanges();
    expect(toolbarIcon.getAttribute("color")).toBe("negative");
    expect(toolbarIcon.getAttribute("size")).toBe("small");
    expect(toolbarIcon.getAttribute("type")).toBe("drag");
  });
});
