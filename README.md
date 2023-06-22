# Automated Account Creation Tests Using Cypress

Testing the UI and server side functionality of new user account creation in an imitation social blogging site (a [Medium.com](https://medium.com/) clone called [**Conduit**](https://angular.realworld.io/)) using [Cypress](https://www.cypress.io/).

## Overview

Links:

- [Application Url](https://angular.realworld.io/)
- [Application Documentation](https://github.com/gothinkster/angular-realworld-example-app)

Components Tested:

- New user account creation via the HTML sign up form
- New user account creation via the API

Sign up form conditions:

- All fields are required in order to submit the form
- Username and email must be unique (not be associated with any existing accounts)

## Test Details

**Happy Path:** Valid new user account creation

<details>

<summary>UI Tests: An e2e approach using the HTML sign up form</summary>  
</br>
<p>Pre-testing steps</p>
<ol><li>Generate unique user data and write to fixture file</li>
<li>Navigate to the sign up page</li></ol>

<p>Test Steps</p>
<ol><li>Type the username</li>
<li>Type the email address</li>
<li>Type the password</li>
  <li>Click Sign up button</li>
</ol>

<p>Expected Results</p>
<ol><li>Redirected to home page as the logged in user</li>
</ol>

</details>

<details>
<summary>API Tests: </summary>

</br>
<p>Pre-testing steps</p>
<ol><li>Generate new user data and write to fixture file</li></ol>

<p>Test Steps</p>
<ol><li>Send a POST request to the <code>/users</code> endpoint containing username, email, and password in the body</li></ol>

<p>Expected Results</p>
<ol><li>Response containing success status code of <code>200</code></li>
  <ul><li>Note: Discrepancy noted in the <a href="https://github.com/gothinkster/realworld/blob/a9a1247942ba910d2475cf855de885fb340678d2/api/openapi.yml#LL39C1-L52C40">documentation</a> showing success status code of <code>201</code>. Issue filed <a href="https://github.com/gothinkster/realworld/issues/1325">here</a></li></ul>
<li>Response body matches data in the request body</li>
</ol>

</details>

**Sad Path:** Attempt invalid new user account creation

<details>

<summary>UI Tests: Attempt to submit the form with missing fields and non-unique username and email</summary>  
</br>
<p>Pre-testing steps</p>
<ol><li>Register test username and email if not already registered</li>
<li>Navigate to the sign up page</li></ol>

<p>Test Steps</p>
<ol><li>Type the username of existing account</li>
<li>Type the email address of existing account</li>
<li>Type the password of the existing account</li>
  <li>Click Sign up button</li>
</ol>

<p>Expected Results</p>
<ol><li>Submit button remains disabled until all fields are entered</li>
<li>Attempt to submit leads to error messages</li>
<ol type="a"><li>"email has already been taken"</li><li>"username has already been taken"</li></ol>
<li>Registration is unsuccessful</li>
</ol>

</details>

<details>
<summary>API Tests: </summary>

</br>
<p>Pre-testing steps</p>
<ol><li>Register test username and email if not already registered</li></ol>

<p>Test Steps</p>
<ol><li>Send a POST request to the <code>/users</code> endpoint containing the existing user's username, email, and password in the body</li></ol>

<p>Expected Results</p>
<ol><li>Registration fails</li>
<li>Response containing error status code of <code>422</code> </li>
<li>Response error messages indicate missing fields or username/password taken</li>
</ol>

</details>
