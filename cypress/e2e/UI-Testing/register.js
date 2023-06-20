/// <reference types="cypress" />
describe('Register for a new account via the UI', () => {
  before(function () {
    //generates unique data and write it into the fixture file
    cy.createUniqueUser();

    //make fixture data available
    cy.fixture('userInfo').then((user) => {
      this.user = user;
    });
  });

  it('Successfully registers a new account', function () {
    cy.getRegistrationPage();
    cy.fillRegistrationForm(this.user);

    cy.get('button[type="submit"]').click(); //submit the form

    //validate successful registration via UI elements
    cy.get('app-article-list').should('contain.text', 'No articles are here');
    cy.get('.container > .nav').should('contain.text', this.user.username);
  });
});
