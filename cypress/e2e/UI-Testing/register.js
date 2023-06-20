/// <reference types="cypress" />
describe('Register for a new account via the UI', () => {
  before(function () {
    //custom command to generate unique data and write it into the fixture file
    cy.createUniqueUser();

    //make fixture data available
    cy.fixture('userInfo').then((user) => {
      this.user = user;
    });
  });

  it('Successfully registers a new account', function () {
    cy.visit('');
    cy.get('.nav-link').contains('Sign up').click(); //click signup button

    // assert sign up button took user to sign up page
    cy.url().should('contain', '/register');
    cy.get('h1').should('have.text', 'Sign up');

    cy.get('input[placeholder="Username"]').type(this.user.username);
    cy.get('input[placeholder="Email"]').type(this.user.email);
    cy.get('input[placeholder="Password"]').type(this.user.password);

    cy.get('button[type="submit"]').click(); //submit the form

    //validate registration was successful via UI elements
    cy.get('app-article-list').should('contain.text', 'No articles are here'); //new user has nothing in their posts
    cy.get('.container > .nav').should('contain.text', this.user.username); //username displayed when logged in
  });
});
