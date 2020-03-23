describe('Warehouse Login', function() {
  before(() => cy.clearLocalStorageCache())

  describe('for new users', function() {
    after(() => cy.saveLocalStorageCache())

    it('shows login page for new users', function() {
      cy.visit('/')
      cy.findByText('Warehouse').should('exist')
    })

    it('allows a new user to log in', function() {
      cy.findByPlaceholderText('Usuário').type('Mateus')
      cy.findByPlaceholderText('Empresa').type('Po.N,T.E')
      cy.findByText('Entrar').click()

      cy.findByText('Olá Mateus').should('exist')
      cy.findByText('da empresa Po.N,T.E').should('exist')
      // cy.findByText('lista de produtos').should('exist')
    })
  })

  describe('for registered users', function() {
    before(() => cy.restoreLocalStorageCache())

    it('shows products page for already logged-in users', function() {
      cy.reload()

      cy.findByText('Olá Mateus').should('exist')
      cy.findByText('da empresa Po.N,T.E').should('exist')
      // cy.findByText('lista de produtos').should('exist')
    })
  })

  describe('with cache cleared', function() {
    before(() => cy.clearLocalStorageCache())

    it('shows login page if local storage is cleared', function() {
      cy.reload()
      cy.findByText('Warehouse').should('exist')
    })
  })

  // it('should allow a user to search for a specifically named product')
  // it('should allow a user to add a new product')
  // it('should allow a user to reorder the list by dragging a product')
  // it('should keep a product list state even after a page refresh')
})
