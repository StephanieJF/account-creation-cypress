/// <reference types="cypress" />
import RegistrationPage from '../../support/pageObjects/RegistrationPage';
import existingUser from '../../fixtures/existingUser.json';

describe('Register for a new account via the UI', () => {
  const registrationPage = new RegistrationPage();
  beforeEach(function () {
    //generate unique data and write it into the fixture file
    registrationPage.createUniqueUser();

    registrationPage.getRegistrationPage();

    //make fixture data available
    cy.fixture('newUser').then((user) => {
      this.user = user;
    });
  });

  it('Successfully registers a new account', function () {
    //fill out and submit registration form
    registrationPage.getRegistrationPage();
    registrationPage.fillRegistrationForm(this.user);

    registrationPage.getSubmitButton().click();

    //validate successful registration via UI elements
    cy.get('app-article-list').should('contain.text', 'No articles are here');
    cy.get('.container > .nav').should('contain.text', this.user.username);
  });

  it('Cannot register with missing fields or already used account info', function () {
    //create the account for the user if they don't already have one
    registrationPage.registrationViaAPI(existingUser);

    //attempt to register the existing user via UI

    //check that submit button remains inactive until required fields are filled
    registrationPage.getSubmitButton().should('be.disabled');

    registrationPage.getInputField('Username').type(existingUser.username);
    registrationPage.getSubmitButton().should('be.disabled'); //still disabled

    registrationPage.getInputField('Email').type(existingUser.email);
    registrationPage.getSubmitButton().should('be.disabled'); //still disabled

    registrationPage.getInputField('Password').type(existingUser.password);
    registrationPage.getSubmitButton().should('be.enabled'); //now enabled

    //non-unique username and email should each display errors
    registrationPage.getSubmitButton().click();
    cy.get('.error-messages').find('li').should('have.length', 2).and('contain.text', 'email has already been taken').and('contain.text', 'username has already been taken');
  });
});
