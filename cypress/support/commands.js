Cypress.Commands.add('createUniqueUser', () => {
  let makeUnique = Math.random().toString(16).substring(2);
  let uniqueUsername = 'Nina' + makeUnique;
  let uniqueEmail = uniqueUsername + '@GoodDogs.com';
  cy.writeFile('cypress/fixtures/userInfo.json', { username: `${uniqueUsername}`, email: `${uniqueEmail}`, password: 'ilovetreats456' });
});

Cypress.Commands.add('getRegistrationPage', () => {
  cy.visit('');
  cy.get('.nav-link').contains('Sign up').click(); //click signup button

  // assert sign up button took user to sign up page
  cy.url().should('contain', '/register');
  cy.get('h1').should('have.text', 'Sign up');
});

Cypress.Commands.add('fillRegistrationForm', (user) => {
  cy.get('input[placeholder="Username"]').type(user.username);
  cy.get('input[placeholder="Email"]').type(user.email);
  cy.get('input[placeholder="Password"]').type(user.password);
});
