describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.createUser({ username: 'admin', password: 'admin', name: 'admin' })
    cy.createUser({ username: 'admin2', password: 'admin2', name: 'admin2' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })


  it('succeeds with correct credentials', function () {
    cy.contains('login').click()
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

  describe('When logged1 logged in', function() {
    beforeEach(function() {
      cy.login()
    })

    it('A blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('A very interesting blog')
      cy.get('#author').type('Someone')
      cy.get('#url').type('/wow')
      cy.contains('create').click()
      cy.get('.message').should('contain', 'a new blog A very interesting blog by Someone added')
      cy.contains('A very interesting blog admin')
    })

    it('A blog can be liked', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('A very interesting blog that like me')
      cy.get('#author').type('Other')
      cy.get('#url').type('/liked')
      cy.contains('create').click()
      cy.get('.message').should('contain', 'a new blog A very interesting blog that like me by Other added')
      cy.contains('A very interesting blog that like me admin')
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.get('#like-container').should('contain', '1')
    })

    it('A blog can be deleted', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('A blog can be deleted when logged in')
      cy.get('#author').type('logged')
      cy.get('#url').type('/delete-me')
      cy.contains('create').click()
      cy.get('.message').should('contain', 'a new blog A blog can be deleted when logged in by logged added')
      cy.contains('A blog can be deleted when logged in admin')
      cy.contains('view').click()
      cy.get('#delete-button').click()
      cy.get('.blogs-container').should('not.contain','A blog can de deleted when logged in admin')
    })

  })

  describe('When logged2 logged in', function() {
    beforeEach(function() {
      cy.login()
    })

    it('A blog can be deleted', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('A blog can be deleted when logged in')
      cy.get('#author').type('logged')
      cy.get('#url').type('/delete-me')
      cy.contains('create').click()
      cy.get('.message').should('contain', 'a new blog A blog can be deleted when logged in by logged added')
      cy.contains('A blog can be deleted when logged in admin')
      cy.get('#logout-button').click()
      cy.login2()
      cy.get('.blogs-container').should('not.contain','A blog can de deleted when logged in admin')
      cy.get('#logout-button').click()
      cy.login()
      cy.contains('view').click()
      cy.get('#delete-button').click()
      cy.get('.blogs-container').should('not.contain','A blog can de deleted when logged in admin')
    })

  })

})