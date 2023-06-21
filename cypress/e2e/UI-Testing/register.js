/// <reference types="cypress" />
describe('Register for a new account via the UI', () => {
  beforeEach(function () {
    //generate unique data and write it into the fixture file
    cy.createUniqueUser();

    //make fixture data available
    cy.fixture('userInfo').then((user) => {
      this.user = user;
    });
  });

  it('Successfully registers a new account', function () {
    //fill out and submit registration form
    cy.getRegistrationPage();
    cy.fillRegistrationForm(this.user);

    cy.get('button[type="submit"]').click();

    //validate successful registration via UI elements
    cy.get('app-article-list').should('contain.text', 'No articles are here');
    cy.get('.container > .nav').should('contain.text', this.user.username);
  });

  it.only('Cannot register with missing or non-unique username and email', function () {
    //bypass UI to register a user for this test
    cy.request({
      method: 'POST',
      url: 'https://api.realworld.io/api/users',
      body: { user: this.user },
    });

    //attempt to register the user again

    cy.getRegistrationPage();
    //submit button remains inactive until required fields are filled
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[placeholder="Username"]').type(this.user.username);
    cy.get('button[type="submit"]').should('be.disabled'); //still disabled

    cy.get('input[placeholder="Email"]').type(this.user.email);
    cy.get('button[type="submit"]').should('be.disabled'); //still disabled

    cy.get('input[placeholder="Password"]').type(this.user.password);
    cy.get('button[type="submit"]').should('be.enabled'); //now enabled

    //non-unique username and email should each display errors
    cy.get('button[type="submit"]').click();
    cy.get('.error-messages').find('li').should('have.length', 2).and('contain.text', 'email has already been taken').and('contain.text', 'username has already been taken');
  });
});
