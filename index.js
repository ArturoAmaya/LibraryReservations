const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://ucsd.libcal.com/reserve');
  await page.screenshot({ path: 'landedatpage.png' });

  // Try to click the next day button
  const nextpage = await page.$('#eq-time-grid > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) > div > button.fc-next-button.btn.btn-default.btn-sm');
  //const nextpageJSON = 
  await nextpage.screenshot({path: 'correctbutton.png'});
  //console.log(nextpageJSON);

  await browser.close();
})();