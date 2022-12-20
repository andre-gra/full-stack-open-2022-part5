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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', ({ username, password, name }) => {
  cy.request('POST', 'http://localhost:3001/api/users', {
    username, name, password
  })
})


Cypress.Commands.add('login', () => {
  cy.get('#username').type('admin')
  cy.get('#password').type('admin')
  cy.get('#login-button').click()
})

Cypress.Commands.add('login2', () => {
  cy.get('#username').type('admin2')
  cy.get('#password').type('admin2')
  cy.get('#login-button').click()
})