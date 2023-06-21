/// <reference types="cypress" />

describe('Register for a new account via API', () => {
  beforeEach(function () {
    //generate unique data and write it into the fixture file
    cy.createUniqueUser();

    //make fixture data available
    cy.fixture('userInfo').then((user) => {
      this.user = user;
    });
  });

  it('Successfully creates a new account', function () {
    //send POST request to create account, assign to alias newUser
    cy.newAccountViaAPI(this.user).as('newUser');

    //check for successful status code
    // cy.get('@newUser').its('status').should('eq', 201);
    cy.get('@newUser').its('status').should('eq', 200);

    //check response matches user data that was sent
    cy.get('@newUser').then((response) => {
      let responseData = response.body.user;
      expect(responseData.username).to.eq(this.user.username);
      expect(responseData.email).to.eq(this.user.email);
    });
  });
});
