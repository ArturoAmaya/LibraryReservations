// Hello this file is to explore the page.
const puppeteer = require('puppeteer');

(async () => {
    // 1. LAUNCH BROWSER
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 2. GO TO PAGE
    await page.goto('https://ucsd.libcal.com/reserve', {waitUntil: 'networkidle0'});

    const nextpage = await page.$('#eq-time-grid > div.fc-header-toolbar.fc-toolbar.fc-toolbar-ltr > div:nth-child(1) > div > button.fc-next-button.btn.btn-default.btn-sm');
    await page.screenshot({path: './screenshots/day0.png'});

    for (let i =0; i<14; i++){
        await nextpage.click();
        await page.screenshot({path: `./screenshots/day${i+1}.png`});
    }
    
    // 3. CLICK ON A TIMESLOT
    //:nth-child(18) > a
    await page.waitForTimeout(4000);
    const libroom2096a = await page.$$('#eq-time-grid > div.fc-view-harness.fc-view-harness-passive > div > table > tbody > tr > td:nth-child(3) > div > div > div > table > tbody > tr:nth-child(33) > td > div > div.fc-timeline-events.fc-scrollgrid-sync-inner > div');
    //console.log(libroom2096a.length);
    const libroom2096a_properties = await libroom2096a[0].getProperties();
    console.log(libroom2096a_properties);
    await libroom2096a[0].screenshot({path: './screenshots/libroom2096a.png'});
    //const libroom2096ai = await libroom2096a.getProperty("")
    
    let avail_class = false;
    let avail_title = false;
    let slot_count = 0;
    // start at 1 because we don't really care about the 7:30 slot
    let i = 1;
    for (i=1; i<libroom2096a.length; i++) {
        const a = await libroom2096a[i].$eval('a', a => a.getAttribute("class"));
        const b = await libroom2096a[i].$eval('a', a => a.getAttribute("title"));
        console.log(`${i}:${a}`);
        console.log(`${i}:${b}`);

        avail_class = a.includes('s-lc-eq-avail');
        avail_title = b.includes('Available');

        if ( (avail_class && avail_title) == true) {
            await libroom2096a[i].$eval('a', a=>a.click());
            await page.waitForTimeout(1000);
            slot_count++;
            if (slot_count == 4){
                break;
            }
        }
        //console.log(a_class);
        //console.log(b_title);
        //const libroom2096a = await page.evaluate
    }

    console.log(i);
    console.log(slot_count);
    await browser.close();
})();