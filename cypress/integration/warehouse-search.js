describe('Warehouse', function() {
  before(() => cy.warehouseLogin())
  afterEach(() => {
    cy.findByPlaceholderText('Buscar').clear()
  })

  describe('allows a user to search for a product', function() {
    it('should NOT be location sensitive', function() {
      cy.findByPlaceholderText('Buscar').type('Butter')
      cy.findByText('Vinho').should('not.exist')
      cy.findByText('Butterscotch').should('exist')
      cy.findByText('Coconut Butter').should('exist')
    })

    it('should NOT be case sensitive', function() {
      cy.findByPlaceholderText('Buscar').type('café')
      cy.findByText('Vinho').should('not.exist')
      cy.findByText('Filtro de café').should('exist')
      cy.findByText('Café em pó').should('exist')
    })

    it('should NOT be accent sentive', function() {
      cy.findByPlaceholderText('Buscar').type('mamão')
      cy.findByText('Vinho').should('not.exist')
      cy.findByText('Mamão').should('exist')
      cy.findByText('Caroço de mamão').should('exist')
    })
  })
})
