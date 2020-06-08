import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

describe("gxg-modal", () => {
  let page: E2EPage;
  let modal: E2EElement;
  let modalContainer: E2EElement;

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
    modalContainer = await page.find("gxg-modal >>> .modal__container");
  });

  it("renders", async () => {
    expect(modal).toHaveClass("hydrated");
  });

  it("displays text", async () => {
    modal.setProperty("visible", true);
    await page.waitForChanges();

    expect(modal.textContent).toBe(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit."
    );
  });

  // it("has the right classes", async () => {
  //   await page.waitForChanges();
  //   expect(element.classList.contains("button--primary-text-only")).toBe(true);
  // });

  // it("has role attribute", async () => {
  //   await page.waitForChanges();
  //   expect(element.getAttribute("role")).toBe("button");
  // });

  // it("fires click event", async () => {
  //   await page.waitForChanges();

  //   const clickEventSpy = await element.spyOnEvent("click");
  //   element.triggerEvent("click");
  //   await page.waitForChanges();
  //   // Kent C. Dodds
  //   expect(clickEventSpy).toHaveReceivedEvent();
  // });
});
