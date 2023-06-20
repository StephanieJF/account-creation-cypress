/// <reference types="cypress" />

describe('Register for a new account via the UI', () => {
  it('Successfully registers a new account', () => {
    cy.visit('');
    cy.get('.nav-link').contains('Sign up').click(); //click signup button

    // assert sign up button took user to sign up page
    cy.url().should('contain', '/register');
    cy.get('h1').should('have.text', 'Sign up');
  });
});
