// import { newE2EPage, E2EElement, E2EPage } from "@stencil/core/testing";

// describe("gxg-toolbar", () => {
//   let page: E2EPage;
//   let toolbar: E2EElement;
//   let mainTitle: E2EElement;
//   let mainSubitle: E2EElement;
//   let toolbarItem01Title: E2EElement;
//   let toolbarItem01Subtitle: E2EElement;

//   beforeEach(async () => {
//     page = await newE2EPage();

//     await page.setContent(
//       `<gxg-toolbar title="Title" subtitle="Subtitle" position="left">
//       <gxg-toolbar-item
//         slot
//         icon="settings"
//         title="title"
//         subtitle="subtitle"
//         onClick="toolbarFunc01()"
//       ></gxg-toolbar-item>
//       <gxg-toolbar-item
//         slot
//         icon="settings"
//         title="title"
//         subtitle="subtitle"
//         disabled
//       ></gxg-toolbar-item>
//     </gxg-toolbar>`
//     );
//     toolbar = await page.find("gxg-toolbar");
//     mainTitle = await page.find("gxg-toolbar");
//     mainSubitle = await page.find("gxg-toolbar");
//     toolbarItem01Title = await page.find("gxg-toolbar");
//     toolbarItem01Subtitle = await page.find("gxg-toolbar");
//   });

//   it("renders", async () => {
//     expect(toolbar).toHaveClass("hydrated");
//   });

//   it("displays text", async () => {
//     await page.waitForChanges();
//     expect(element.textContent).toBe("Primary Text Only");
//   });

//   it("has the right classes", async () => {
//     await page.waitForChanges();
//     expect(element.classList.contains("button--primary-text-only")).toBe(true);
//   });

//   it("has role attribute", async () => {
//     await page.waitForChanges();
//     expect(element.getAttribute("role")).toBe("button");
//   });

//   it("fires click event", async () => {
//     await page.waitForChanges();

//     const clickEventSpy = await element.spyOnEvent("click");
//     element.triggerEvent("click");
//     await page.waitForChanges();
//     // Kent C. Dodds
//     expect(clickEventSpy).toHaveReceivedEvent();
//   });
// });
