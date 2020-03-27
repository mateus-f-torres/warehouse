const MOCK_USER = {
  username: 'MOCK_USERNAME',
  company: 'MOCK_COMPANY',
}

const MOCK_PRODUCT_LIST = [
  {name: 'Wine', stock: 4, price: 47.99},
  {name: 'Butterscotch', stock: 2, price: 22.39},
  {name: 'Coconut Butter', stock: 5, price: 6.19},
  {name: 'Egg Roll', stock: 3, price: 2.99},
  {name: 'Eggplant', stock: 4, price: 4.29},
  {name: 'Mamão', stock: 2, price: 3.49},
  {name: 'Café em pó', stock: 2, price: 15.47},
  {name: 'Caroço de mamão', stock: 87, price: 0.07},
  {name: 'Filtro de café', stock: 2, price: 3.99},
]

describe('Warehouse', function() {
  before(() => {
    cy.loginWith(MOCK_USER)
    cy.populateProductListWith(MOCK_PRODUCT_LIST)
  })

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
