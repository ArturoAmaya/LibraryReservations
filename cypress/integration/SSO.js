
describe("Test the geisel page", {timeout: 100000}, () => {
    it("Opens the page", ()=>{
        cy.visit("https://a5.ucsd.edu/tritON/profile/SAML2/Redirect/SSO?execution=e3s1");
    });
});