/// <reference types="cypress" />
import RegistrationPage from '../../support/pageObjects/RegistrationPage';

describe('Register for a new account via API', () => {
  const registrationPage = new RegistrationPage();
  beforeEach(function () {
    //generate unique data and write it into the fixture file
    registrationPage.createUniqueUser();

    //make fixture data available
    cy.fixture('userInfo').then((user) => {
      this.user = user;
    });
  });

  it('Successfully creates a new account', function () {
    //send POST request to create account
    registrationPage.newUserViaAPI(this.user).then((response) => {
      //check for successful status code and response matches request data
      expect(response.status).to.eq(200);
      expect(response.body.user.username).to.eq(this.user.username);
      expect(response.body.user.email).to.eq(this.user.email);
    });
  });
});
