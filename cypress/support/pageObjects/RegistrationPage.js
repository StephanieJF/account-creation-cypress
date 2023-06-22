class RegistrationPage {
  createUniqueUser() {
    let makeUnique = Math.random().toString(16).substring(2);
    let uniqueUsername = 'Nina' + makeUnique;
    let uniqueEmail = uniqueUsername + '@GoodDogs.com';
    cy.writeFile('cypress/fixtures/userInfo.json', { username: `${uniqueUsername}`, email: `${uniqueEmail}`, password: 'ilovetreats456' });
  }

  getRegistrationPage() {
    cy.visit('');
    cy.get('.nav-link').contains('Sign up').click(); //click signup button

    // assert sign up button took user to sign up page
    cy.url().should('contain', '/register');
    cy.get('h1').should('have.text', 'Sign up');
  }

  getInputField(placeholder) {
    return cy.get('input[placeholder=' + placeholder + ']');
  }

  fillRegistrationForm(user) {
    cy.get('input[placeholder="Username"]').type(user.username);
    cy.get('input[placeholder="Email"]').type(user.email);
    cy.get('input[placeholder="Password"]').type(user.password);
  }

  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }

  newUserViaAPI(user) {
    return cy.request({
      method: 'POST',
      url: 'https://api.realworld.io/api/users',
      body: { user: user },
      failOnStatusCode: false,
    });
  }
}

export default RegistrationPage;
