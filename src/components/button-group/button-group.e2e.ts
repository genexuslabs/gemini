import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-button-group", () => {
  let page: E2EPage;
  let buttonGroup: E2EElement;
  let buttonGroupTitle: E2EElement;
  let button1: E2EElement;
  let button2: E2EElement;
  let button3: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `
      <div style="width:500px;"><gxg-button-group
      default-selected-btn-id="id2"
      button-group-title="The title"
      title-alignment="left"
    >
      <button id="id1" value="primero">Left</button>
      <button id="id2" value="segundo">Middle</button>
      <button id="id3" value="tercero">Right</button>
    </gxg-button-group></div>`
    );
    buttonGroup = await page.find("gxg-button-group");
    buttonGroupTitle = await page.find(
      "gxg-button-group >>> .button-group-header-title"
    );
    button1 = await page.find("gxg-button-group button#id1");
    button2 = await page.find("gxg-button-group button#id2");
    button3 = await page.find("gxg-button-group button#id3");
  });

  it("renders", async () => {
    expect(buttonGroup).toHaveClass("hydrated");
    expect(buttonGroup).toHaveClass("button-group");
  });

  it("displays text", async () => {
    await page.waitForChanges();
    expect(button1.textContent).toBe("Left");
    expect(button2.textContent).toBe("Middle");
    expect(button3.textContent).toBe("Right");
    expect(buttonGroupTitle.textContent).toBe("The title");
  });

  it("has data-active attribute", async () => {
    await page.waitForChanges();
    expect(button2).toHaveAttribute("data-active");
  });

  it("is disabled", async () => {
    //Disabled
    buttonGroup.setProperty("disabled", true);
    await page.waitForChanges();
    expect(buttonGroup).toHaveAttribute("disabled");
  });

  it("has aria label", async () => {
    await page.waitForChanges();
    expect(buttonGroup).toEqualAttribute("aria-label", "The title");
  });

  it("Is full-width", async () => {
    buttonGroup.setProperty("fullWidth", true);
    await page.waitForChanges();
    expect((await buttonGroup.getComputedStyle()).width).toBe("500px");
  });
});
