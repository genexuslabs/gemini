import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-tabs", () => {
  let page: E2EPage;
  let tabs: E2EElement;
  let tabButton1: E2EElement;
  let tabButton2: E2EElement;
  let tabButton3: E2EElement;
  let tabButton4: E2EElement;
  let tab1: E2EElement;
  let tab2: E2EElement;
  let tab3: E2EElement;
  let tab2Icon: E2EElement;
  let tab3Icon: E2EElement;
  let tab4Icon: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-tabs>
      <gxg-tab-bar>
        <gxg-tab-button
          slot="tab-bar"
          tab-label="apples"
          tab="apples"
          key="apples"
          isSelected="true"
        ></gxg-tab-button>
        <gxg-tab-button
          slot="tab-bar"
          tab-label="bananas"
          tab="bananas"
          key="bananas"
          isSelected="false"
          icon="settings"
        ></gxg-tab-button>
        <gxg-tab-button
          slot="tab-bar"
          tab="cherries"
          key="cherries"
          isSelected="false"
          icon="settings"
        ></gxg-tab-button>
        <gxg-tab-button
          slot="tab-bar"
          tab-label="strawberries"
          tab="strawberries"
          key="strawberries"
          isSelected="false"
          disabled
          icon="settings"
        ></gxg-tab-button>
      </gxg-tab-bar>
      <gxg-tab tab="apples" key="apples" isSelected="true">Apples information</gxg-tab>
      <gxg-tab tab="bananas" key="bananas" isSelected="false">Bananas information</gxg-tab>
      <gxg-tab tab="cherries" key="cherries" isSelected="false">Cherries information</gxg-tab>
    </gxg-tabs>`
    );
    tabs = await page.find("gxg-tabs");
    tabButton1 = await page.find(
      "gxg-tab-button[tab='apples'] >>> .tab-button"
    );
    tabButton2 = await page.find(
      "gxg-tab-button[tab='bananas'] >>> .tab-button"
    );
    tabButton3 = await page.find(
      "gxg-tab-button[tab='cherries'] >>> .tab-button"
    );
    tabButton4 = await page.find(
      "gxg-tab-button[tab='strawberries'] >>> .tab-button"
    );
    tab1 = await page.find("gxg-tab[tab='apples']");
    tab2 = await page.find("gxg-tab[tab='bananas']");
    tab3 = await page.find("gxg-tab[tab='cherries']");

    tab2Icon = await page.find("gxg-tab-button[tab='bananas'] >>> gxg-icon");
    tab3Icon = await page.find("gxg-tab-button[tab='cherries'] >>> gxg-icon");
    tab4Icon = await page.find(
      "gxg-tab-button[tab='strawberries'] >>> gxg-icon"
    );
  });

  it("renders", async () => {
    expect(tabs).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(tabButton1.textContent).toBe("apples");
    expect(tabButton2.textContent).toBe("bananas");
    expect(tabButton3.textContent).toBe("");
    expect(tabButton4.textContent).toBe("strawberries");

    expect(tab1.textContent).toBe("Apples information");
    expect(tab2.textContent).toBe("Bananas information");
    expect(tab3.textContent).toBe("Cherries information");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(tabButton1).toHaveClass("tab-button");

    expect(tabButton2).toHaveClass("tab-button");
    expect(tabButton2).toHaveClass("tab-button--text-icon");

    expect(tabButton3).toHaveClass("tab-button");

    expect(tabButton4).toHaveClass("tab-button");
    expect(tabButton4).toHaveClass("tab-button--text-icon");
  });

  it("has disabled attribute", async () => {
    await page.waitForChanges();
    expect(tabButton4).toHaveAttribute("disabled");
  });

  it("has the right icons", async () => {
    await page.waitForChanges();
    expect(tab2Icon.getAttribute("type")).toBe("settings");
    expect(tab3Icon.getAttribute("type")).toBe("settings");
    expect(tab4Icon.getAttribute("type")).toBe("settings");
  });
});
