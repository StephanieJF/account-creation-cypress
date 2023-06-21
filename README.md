# Automated Account Creation Tests

Testing the UI and server side functionality of a new user account creation in an imitation social blogging site (a [Medium.com](https://medium.com/) clone called [**Conduit**](https://angular.realworld.io/)) using [Cypress](https://www.cypress.io/).

## Description

Links:

- [Application Url](https://angular.realworld.io/)
- [Application Documentation](https://github.com/gothinkster/angular-realworld-example-app)  
  Components Tested:
- New user account creation via the HTML sign up form
- New user account creation via the API  
  Sign up form conditions:
- All fields are required in order to submit the form
- Username and email must be unique (not be associated with any existing accounts)

## Test Features

**Happy Path:** Valid new user account creation

- UI Tests: An `e2e` approach using the HTML sign up form

  - Steps

- API Tests:

**Sad Path:** Attempt invalid new user account creation

- UI Tests: Attempt to submit the form with missing fields and non-unique username and email

  - Steps

- API Tests:
