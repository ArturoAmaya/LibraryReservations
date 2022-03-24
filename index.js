const puppeteer = require('puppeteer');
const args = process.argv.slice(2);
const debug = parseInt(args[0]);
const username = args[1];
const password = args[2];


(async () => {
    // 1. LAUNCH BROWSER
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // 2. GO TO PAGE
    await page.goto('https://ucsd.libcal.com/reserve', {waitUntil: 'networkidle0'});
    if(debug){
        await page.screenshot({ path: './screenshots/landedatpage.png' });
    }
    // 3. NAVIGATE TO 2 WEEKS FROM NOW
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
    if(debug){
        await page.screenshot({path: './screenshots/day0.png'});
    }
    for (let i =0; i<14; i++){
        await nextpage.click();
        if(debug){
            await page.screenshot({path: `./screenshots/day${i+1}.png`});
        }
    }

    // 4. REQUEST TIMESLOT(S)
    // Now you're on the correct day, two weeks from today
    //const timeslot1 = await page.$('#eq-time-grid > div.fc-view-harness.fc-view-harness-passive > div > table > tbody > tr > td:nth-child(3) > div > div > div > table > tbody > tr:nth-child(33) > td > div > div.fc-timeline-events.fc-scrollgrid-sync-inner > div:nth-child(20) > a');
    //await timeslot1.click();
    // we're gonna hardcode 2096a for now
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

    await page.waitForTimeout(3000);

    // 5. SUBMIT REQUESTED TIME(S)
    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('#submit_times')
    ]);

    // 6. SINGLE SIGN-ON
    await page.waitForSelector('#main-content > div > section > h1 > span');
    if (debug){
        await page.screenshot({path: './screenshots/sso.png'});
    }
    await page.type('#ssousername', username);
    await page.type('#ssopassword', password);

    if (debug) {
        await page.screenshot({path: './screenshots/ssofilledout.png'});
    }

    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        page.click('#login > button')
    ]);

    if(debug) {
        await page.screenshot({path: './screenshots/ssosubmitted.png'});
    }
    // 7. DUO AUTHENTICATION
    await page.waitForTimeout(8000);
    const duo = await page.$('#duo_iframe');
    if (debug) {
        await duo.screenshot({path:'./screenshots/duocontent.png'});
    }

    const duoframe = await duo.contentFrame();

    //await duoframe.screenshot({path:'./screenshots/duoframecontent.png'});
    //const temp = await duoframe.$('#login-form');
    //await temp.screenshot({path: './screenshots/ssoform.png'});
    await Promise.all([
        page.waitForNavigation({waitUntil: 'networkidle0'}),
        duoframe.click('#auth_methods > fieldset:nth-child(1) > div.row-label.push-label > button'),
    ]);

    if (debug){
    await page.screenshot({path: './screenshots/postduo.png'});
    }
    // 8. CONFIRM RESERVATION

    // OK at this point you should be past sso and duo.
    // wait for the content to load and then select it
    await page.waitForSelector('#bform-terms-container > div.s-lc-eq-co-terms > div > p:nth-child(2) > strong > span > span > a'); //waiting for the UCSD library reservation policies link before proceeding
    const confirmbtn = await page.$('#terms_accept');
    await confirmbtn.click();

    if (debug) {
        await page.screenshot({path: './screenshots/lastconfirmpage.png'});
    }
    const submitbtn = await page.$('#s-lc-eq-bform-submit');
    if (debug){
        await submitbtn.screenshot({path: './screenshots/finalsubmitbtn.png'});
    }
    await submitbtn.click();

    if(debug){
        await page.screenshot({path: './screenshots/confirmationticket.png'});
    }
    await browser.close();
})();