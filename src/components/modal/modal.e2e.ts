import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

let page: E2EPage;
let modal: E2EElement;
let modalDiv: E2EElement;
let modalHeader: E2EElement;
let modalHeaderTitle: E2EElement;
let modalContainer: E2EElement;
let modalFooter: E2EElement;

describe("gxg-modal modal container text", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-modal
      id="modal"
      modal-title="Modal Title"
      footer-alignment="right"
      z-index="20"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit.</gxg-modal>`
    );
    modal = await page.find("gxg-modal");
  });

  it("displays text", async () => {
    modal.setProperty("visible", true);
    await page.waitForChanges();

    expect(modal.textContent).toBe(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    );
  });
});

describe("gxg-modal footer button text", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-modal
      id="modal"
      modal-title="Modal Title"
      footer-alignment="right"
      z-index="20"
    ><gxg-button slot="footer" type="secondary-text-only">Label</gxg-button></gxg-modal>`
    );
    modal = await page.find("gxg-modal");
  });

  it("displays text", async () => {
    modal.setProperty("visible", true);
    await page.waitForChanges();

    expect(modal.textContent).toBe("Label");
  });
});

describe("gxg-modal other tests", () => {
  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(
      `<gxg-modal
      id="modal"
      modal-title="Modal Title"
      footer-alignment="right"
      z-index="20"
    >Lorem ipsum dolor sit amet consectetur adipisicing elit.
      <gxg-button slot="footer" type="secondary-text-only">Label</gxg-button>
      <gxg-spacer-one slot="footer" space="xxsmall"></gxg-spacer-one>
      <gxg-button slot="footer" type="primary-text-only">Label</gxg-button>
    </gxg-modal>`
    );

    modal = await page.find("gxg-modal");
    modalDiv = await page.find("gxg-modal >>> .modal");
    modalHeader = await page.find("gxg-modal >>> .modal__header");
    modalHeaderTitle = await page.find("gxg-modal >>> .modal__header__title");
    modalContainer = await page.find("gxg-modal >>> .modal__container");
    modalFooter = await page.find("gxg-modal >>> .modalFooter");
  });

  it("renders", async () => {
    expect(modal).toHaveClass("hydrated");
  });

  it("has the right classes", async () => {
    await page.waitForChanges();
    expect(modalDiv).toHaveClass("modal");
    expect(modalHeader).toHaveClass("modal__header");
    expect(modalHeaderTitle).toHaveClass("modal__header__title");
    expect(modalContainer).toHaveClass("modal__container");
    expect(modalFooter).toHaveClass("modalFooter");
  });

  it("has the right footer alignment", async () => {
    await page.waitForChanges();
    expect(modalFooter).toHaveClass("modalFooter--right");

    modal.setProperty("footerAlignment", "left");
    await page.waitForChanges();
    expect(modalFooter).toHaveClass("modalFooter--left");

    modal.setProperty("footerAlignment", "center");
    await page.waitForChanges();
    expect(modalFooter).toHaveClass("modalFooter--center");
  });

  it("it not visible", async () => {
    await page.waitForChanges();

    modal.setProperty("visible", false);
    await page.waitForChanges();
    expect(modal).not.toHaveClass("visible");
    expect((await modal.getComputedStyle()).zIndex).toBe("-1");
  });

  it("it is visible", async () => {
    await page.waitForChanges();

    modal.setProperty("visible", true);
    await page.waitForChanges();
    expect(modal).toHaveClass("visible");
    expect((await modal.getComputedStyle()).zIndex).toBe("20");
  });
});
