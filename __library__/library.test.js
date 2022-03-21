describe("Basic test", () => {
    // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto("https://ucsd.libcal.com/reserve", {
      waitUntil: "load",
      timeout: 12000
    });
    page.once("load", () => {
      console.log("pageloaded!");
    });
  });

  it ("Initial Home page", async() =>{
      const time = await page.$eval("#eq-time-grid > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) > div > button.fc-next-button.btn.btn-default.btn-sm", (prod) => {
         console.log("aha\n");
         let potato = await prod.getProperty("innerText");
      })
  });


});