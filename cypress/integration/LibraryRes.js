describe("Test the geisel page", {timeout: 10000}, () => {
    it("Opens the page", ()=>{
        cy.visit("https://ucsd.libcal.com/reserve");
    });

    it("Change the date to two weeks from today (basic)", () => {
        let i;
        for (i=0; i<14; i++){
            cy.get('.fc-next-button').click();
            cy.wait(500);
        }
    })
});