describe('Warehouse should', function () {
  before(() => cy.clearLocalStorage())

  describe('for new users:', function () {
    it('show login page', function () {
      cy.visit('/')
      cy.findByAltText('Warehouse Banner').should('exist')
    })

    it('allow a user to log in', function () {
      cy.findByPlaceholderText('Usuário').type('Mateus')
      cy.findByPlaceholderText('Empresa').type('Po.N,T.E')
      cy.findByText('Entrar').click()

      cy.findByText('Olá Mateus').should('exist')
      cy.findByText('da empresa Po.N,T.E').should('exist')
    })

    after(() => cy.saveLocalStorage())
  })

  describe('for logged users:', function () {
    before(() => cy.restoreLocalStorage())

    it('redirect to products page', function () {
      cy.reload()

      cy.findByText('Olá Mateus').should('exist')
      cy.findByText('da empresa Po.N,T.E').should('exist')
    })
  })
})
