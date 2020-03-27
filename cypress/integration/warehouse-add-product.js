const MOCK_USER = {
  username: 'MOCK_USERNAME',
  company: 'MOCK_COMPANY',
}

// TODO: precisa limpar o IndexedDB antes do teste
describe('Warehouse', function() {
  before(() => cy.loginWith(MOCK_USER))

  describe('allows a user to add a new product to the list', function() {
    beforeEach(() => cy.findByText('Adicionar novo produto').click())

    function addNewProduct({name, stock, price}) {
      cy.findByPlaceholderText('Nome do Produto').type(name)
      cy.findByPlaceholderText('Quantidade em Estoque').type(stock)
      cy.findByPlaceholderText('Preço Unitário').type(price)
      cy.findByText('Criar').click()
    }

    it('should add a new product to the list when created', function() {
      addNewProduct({name: 'Bacon', stock: '4', price: '12,99'})
      cy.findByText('Bacon').should('exist')
    })
    it('should NOT allow a repeated product creation', function() {
      addNewProduct({name: 'Bacon', stock: '4', price: '12,99'})
      cy.findByText('produto já existente').should('exist')
    })

    // NOTE: esse teste vale mais no DELETE
    it('should reuse any vacant ID when inserting a new product in the list', function() {})
    // NOTE: esse teste vale mais no drag-n-drop talvez
    it('should keep current products list locally saved', function() {})

    // NOTE: product name
    it('should NOT allow an unnamed product creation', function() {})
    it('should NOT allow a numeric-only named product creation', function() {})
    // NOTE: stock number
    it('should NOT allow a zero or negative stock product creation', function() {})
    it('should NOT allow a non-numeric stock product creation', function() {})
    it('should NOT allow a floating number stock product creation', function() {})
    // NOTE: price value
    it('should NOT allow a zero or negative price product creation', function() {})
    it('should NOT allow a non-numeric price product creation', function() {})
    // NOTE: refresh
    it('should save newly created items locally', function() {})
  })
})
