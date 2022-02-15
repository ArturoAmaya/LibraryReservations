describe("Test the geisel page", {timeout: 100000}, () => {
    it("Opens the page", ()=>{
        cy.visit("https://ucsd.libcal.com/reserve");
    });

    it("Change the date to two weeks from today (basic)", () => {
        let i;
        for (i=0; i<14; i++){
            cy.get('.fc-next-button').click();
            cy.wait(2000);
        }
    });

    it("Gets four hours of reservations", ()=>{
        /*cy.get(':nth-child(5) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 690px; right: -720px;"] > .fc-timeline-event').click();
        //cy.get(':nth-child(5) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 720px; right: -750px;"] > .fc-timeline-event').click()
        cy.get(':nth-child(5) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 750px; right: -780px;"] > .fc-timeline-event').click();
        cy.get(':nth-child(5) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 810px; right: -840px;"] > .fc-timeline-event').click();
        cy.get(':nth-child(5) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 870px; right: -900px;"] > .fc-timeline-event').click();*/
        /*cy.get(':nth-child(7) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 750px; right: -780px;"] > .fc-timeline-event').click();
        cy.get(':nth-child(7) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 810px; right: -840px;"] > .fc-timeline-event').click();
        cy.get(':nth-child(7) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 870px; right: -900px;"] > .fc-timeline-event').click();
        cy.get(':nth-child(7) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 930px; right: -960px;"] > .fc-timeline-event').click();*/
        /*cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 450px; right: -480px;"] > .fc-timeline-event').click();
cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 510px; right: -540px;"] > .fc-timeline-event').click();
cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 570px; right: -600px;"] > .fc-timeline-event').click();
cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 630px; right: -660px;"] > .fc-timeline-event').click();*/

    /*cy.get(':nth-child(11) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 450px; right: -480px;"] > .fc-timeline-event').click();
    cy.wait(1000);
    cy.get(':nth-child(11) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 510px; right: -540px;"] > .fc-timeline-event').click();
    cy.wait(1000);
    cy.get(':nth-child(11) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 570px; right: -600px;"] > .fc-timeline-event').click();
    cy.wait(1000);
    cy.get(':nth-child(11) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 630px; right: -660px;"] > .fc-timeline-event').click();
    });*/

    /*cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 450px; right: -480px;"] > .fc-timeline-event').click();
    cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 510px; right: -540px;"] > .fc-timeline-event').click();
    cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 570px; right: -600px;"] > .fc-timeline-event').click();
    cy.get(':nth-child(12) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 630px; right: -660px;"] > .fc-timeline-event').click();
    */
    cy.wait(2000);
    cy.get(':nth-child(22) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 450px; right: -480px;"] > .fc-timeline-event').click();
    cy.wait(2000);
    cy.get(':nth-child(22) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 510px; right: -540px;"] > .fc-timeline-event').click();
    cy.wait(2000);
    cy.get(':nth-child(22) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 570px; right: -600px;"] > .fc-timeline-event').click();
    cy.wait(2000);
    cy.get(':nth-child(22) > .fc-timeline-lane > .fc-timeline-lane-frame > .fc-timeline-events > [style="top: 0px; left: 630px; right: -660px;"] > .fc-timeline-event').click();
    cy.wait(2000);
});
    it("Submit", ()=>{
        cy.wait(1000);
        cy.get('#submit_times').then(($a) => {
            const url = $a.prop('href');
            cy.request(url);
        });
    });
});