import 'cypress-testing-library/add-commands'
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  // NB: Cypress drops the `CYPRESS__` prefix when using:
  expect(Cypress.env('ADMIN_USERNAME')).not.to.be.undefined
  expect(Cypress.env('ADMIN_PASSWORD')).not.to.be.undefined
  const login = 'https://firstvoices-dev.apps.prod.nuxeo.io/nuxeo/startup'
  // Login
  cy.log('--- LOGIN ---')
  cy.request({
    method: 'POST',
    url: login,
    form: true, // we are submitting a regular form body
    body: {
      user_name: Cypress.env('ADMIN_USERNAME'),
      user_password: Cypress.env('ADMIN_PASSWORD'),
      language: 'en',
      requestedUrl: 'app',
      forceAnonymousLogin: true,
      form_submitted_marker: undefined,
      Submit: 'Log+In',
    },
  })
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })