describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ username: 'admin', password: 'admin', name: 'admin' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })


  it('succeeds with correct credentials', function () {
    cy.contains('login')
    cy.get('#username').type('admin')
    cy.get('#password').type('admin')
    cy.get('#login-button').click()
    cy.get('.message').should('contain', 'admin logged succesfully')
  })

  it('fails with wrong credentials', function () {
    cy.contains('login').click()
    cy.get('#username').type('wrong')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').should('contain', 'Wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

})