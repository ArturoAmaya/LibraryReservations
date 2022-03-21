const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ucsd.libcal.com/reserve');
    await page.screenshot({ path: './screenshots/landedatpage.png' });

    // Try to click the next day button
    const nextpage = await page.$('#eq-time-grid > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) > div > button.fc-next-button.btn.btn-default.btn-sm');
    // not used at the moment, but this is to get the next button "text". there is no text its an image thing.
    //const nextpagepropertyInnerText = await page.$eval('#eq-time-grid > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) > div > button.fc-next-button.btn.btn-default.btn-sm', el => el.innerText);
    /*await nextpage.screenshot({path: './screenshots/correctbutton.png'});
    await nextpage.click();
    await page.screenshot({path: './screenshots/nextday.png'});
    await nextpage.click();
    await page.screenshot({path: './screenshots/day3.png'});
    */
    await page.screenshot({path: './screenshots/day0.png'});
    for (let i =0; i<14; i++){
        await nextpage.click();
        await page.screenshot({path: `./screenshots/day${i+1}.png`});
    }

    // Now you're on the correct day, two weeks from today
    
    await browser.close();
})();