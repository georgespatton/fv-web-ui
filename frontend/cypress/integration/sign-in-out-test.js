// NOTE: this file will be copied to `cypress/integration` and run from there,
// so imports paths will be based on that location!

import 'cypress-testing-library/add-commands'

describe('sign-in-out.js > Login and Logout', () => {
  it('Sign in and out as member and admin', () => {
    cy.login({
      userName: 'TESTLANGUAGEFIVE_MEMBER',
    })
  })
})
