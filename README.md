# Automated Account Creation Tests Using Cypress

Testing the UI and server side functionality of new user account creation in an imitation social blogging site (a [Medium.com](https://medium.com/) clone called [**Conduit**](https://angular.realworld.io/)) using [Cypress](https://www.cypress.io/).

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

<details>

<summary>UI Tests: An e2e approach using the HTML sign up form</summary>  
</br>
<p>Pre-testing steps</p>
<ol><li>Generate new user data and write to fixture file</li>
<li>Navigate to the sign up page</li></ol>

<p>Test Steps</p>
<ol><li>Type the username</li>
<li>Type the email address</li>
<li>Type the password</li>
  <li>Click Sign up button</li>
</ol>

<p>Expected Results</p>
<ol><li>Successful registration</li>
<li>Redirected to home page as a logged in user</li>
</ol>

</details>

<details>
<summary>API Tests: </summary>

</br>
<p>Pre-testing steps</p>
<ol><li>First Step</li>
<li>Secont Step</li></ol>

<p>Test Steps</p>
<ol><li>First Step</li>
<li>Type the email address</li>
<li>Secont Step</li></ol>

<p>Expected Results</p>
<ol><li>First</li>
<li>Second</li>
</ol>

</details>

**Sad Path:** Attempt invalid new user account creation

<details>

<summary>UI Tests: Attempt to submit the form with missing fields and non-unique username and email</summary>  
</br>
<p>Pre-testing steps</p>
<ol><li>Generate new user data and write to fixture file</li>
<li>Bypass the UI- Send a POST request to the users endpoint to add a user to the database</li>
<li>Navigate to the sign up page</li></ol>

<p>Test Steps</p>
<ol><li>Type the username of existing account</li>
<li>Type the email address of existing account</li>
<li>Type the password</li>
  <li>Click Sign up button</li>
</ol>

<p>Expected Results</p>
<ol><li>Submit button is disabled until all fields are entered</li>
<li>Attempt to submit leads to error messages</li>
<ol type="a"><li>"email has already been taken"</li><li>"username has already been taken"</li></ol>
<li>Registration is unsuccessful</li>
</ol>

</details>

<details>
<summary>API Tests: </summary>

</br>
<p>Pre-testing steps</p>
<ol><li>First Step</li>
<li>Secont Step</li></ol>

<p>Test Steps</p>
<ol><li>First Step</li>
<li>Type the email address</li>
<li>Secont Step</li></ol>

<p>Expected Results</p>
<ol><li>First</li>
<li>Second</li>
</ol>

</details>
