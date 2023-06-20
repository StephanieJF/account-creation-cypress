Cypress.Commands.add('createUniqueUser', () => {
  let makeUnique = Math.random().toString(16).substring(2);
  let uniqueUsername = 'Nina' + makeUnique;
  let uniqueEmail = uniqueUsername + '@GoodDogs.com';
  cy.writeFile('cypress/fixtures/userInfo.json', { username: `${uniqueUsername}`, email: `${uniqueEmail}`, password: 'ilovetreats456' });
});
