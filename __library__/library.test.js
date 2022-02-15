describe("Basic test", () => {
    // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto("https://ucsd.libcal.com/reserve", {
      waitUntil: "load",
    });
    page.once("load", () => {
      console.log("pageloaded!");
    });
  });

  it ("Initial Home page", async() =>{
      const time = await page.$eval(".fc-timeline-slot-cushion fc-scrollgrid-sync-inner", (prod) => {
          return prod.getProperty("innerText");
      })
  });


});