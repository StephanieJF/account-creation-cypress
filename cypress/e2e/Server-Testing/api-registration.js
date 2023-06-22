/// <reference types="cypress" />
import RegistrationPage from '../../support/pageObjects/RegistrationPage';
import existingUser from '../../fixtures/existingUser.json';

describe('Register for a new account via API', () => {
  const registrationPage = new RegistrationPage();
  beforeEach(function () {
    //generate unique data and write it into the fixture file
    registrationPage.createUniqueUser();

    //make fixture data available
    cy.fixture('newUser').then((user) => {
      this.user = user;
    });
  });

  it('Successfully creates a new account', function () {
    //send POST request to create account
    registrationPage.registrationViaAPI(this.user).then((response) => {
      //check for successful status code and response matches request data
      expect(response.status).to.eq(200);
      expect(response.body.user.username).to.eq(this.user.username);
      expect(response.body.user.email).to.eq(this.user.email);
    });
  });

  it('Sends an error if username or email are taken', () => {
    //create the account for the user if they don't already have one
    registrationPage.registrationViaAPI(existingUser);

    //attempt to register with non-unique username and email
    registrationPage.registrationViaAPI(existingUser).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body.errors.username[0]).to.eq('has already been taken');
      expect(response.body.errors.email[0]).to.eq('has already been taken');
    });
  });

  it('Sends an error if username is missing', () => {
    let missingUsername = { username: '', email: 'gingie@TheGoodDog.com', password: 'ilovetreats123' };

    //attempt to register with blank username
    registrationPage.registrationViaAPI(missingUsername).then((response) => {
      //check for successful status code and response matches request data
      expect(response.status).to.eq(422);
      expect(response.body.errors.username[0]).to.eq("can't be blank");
    });
  });

  it('Sends an error if email is missing', () => {
    let missingEmail = { username: 'Gingie', email: '', password: 'ilovetreats123' };

    //attempt to register with blank password
    registrationPage.registrationViaAPI(missingEmail).then((response) => {
      //check for successful status code and response matches request data
      expect(response.status).to.eq(422);
      expect(response.body.errors.email[0]).to.eq("can't be blank");
    });
  });

  it('Sends an error if password is missing', () => {
    let missingPassword = { username: 'Gingie', email: 'gingie@TheGoodDog.com', password: '' };

    //attempt to register with blank password
    registrationPage.registrationViaAPI(missingPassword).then((response) => {
      //check for successful status code and response matches request data
      expect(response.status).to.eq(422);
      expect(response.body.errors.password[0]).to.eq("can't be blank");
    });
  });
});
