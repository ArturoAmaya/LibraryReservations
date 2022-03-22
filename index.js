const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://ucsd.libcal.com/reserve', {waitUntil: 'networkidle0'});
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
    const timeslot1 = await page.$('#eq-time-grid > div.fc-view-harness.fc-view-harness-passive > div > table > tbody > tr > td:nth-child(3) > div > div > div > table > tbody > tr:nth-child(14) > td > div > div.fc-timeline-events.fc-scrollgrid-sync-inner > div:nth-child(11) > a');
    await timeslot1.click();

    await page.waitForTimeout(3000);

    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('#submit_times')
    ]);

    await page.waitForSelector('#main-content > div > section > h1 > span');
    await page.screenshot({path: './screenshots/sso.png'});

    await page.type('#ssousername', 'a1amaya');
    await page.type('#ssopassword', 'R@D@r2d2R@D@R@D@');

    await page.screenshot({path: './screenshots/ssofilledout.png'});

    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('#login > button')
    ]);

    await page.screenshot({path: './screenshots/ssosubmitted.png'});

    const duo = await page.$('#duo_iframe');
    await duo.screenshot({path:'./screenshots/duocontent.png'});

    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('#auth_methods > fieldset:nth-child(1) > div.row-label.push-label > button')
    ]);

    await page.screenshot({path: './screenshots/postduo.png'});

    await browser.close();
})();