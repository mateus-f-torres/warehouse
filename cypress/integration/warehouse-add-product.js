describe('Warehouse', function() {
  before(() => cy.visit('/'))
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
    // NOTE: product name
    it('should NOT allow a repeated product creation', function() {
      addNewProduct({name: 'Bacon', stock: '4', price: '12,99'})
      cy.findByText('produto já existente').should('exist')
      cy.findByText('Cancelar').click()
    })
    it('should NOT allow an unnamed product creation', function() {
      addNewProduct({name: '    ', stock: '4', price: '12,99'})
      cy.findByText('produto precisa de um nome').should('exist')
      cy.findByText('Cancelar').click()
    })

    // NOTE: stock number
    it('should NOT allow a zero stock product creation', function() {
      addNewProduct({name: 'MOCK', stock: '0', price: '1'})
      cy.findByText('quantidade em estoque não pode ser 0').should('exist')
      cy.findByText('Cancelar').click()
    })
    it('should NOT allow a non-numeric stock product creation', function() {
      addNewProduct({name: 'MOCK', stock: 'foobar', price: '1'})
      cy.findByText('quantidade precisa ser numerica').should('exist')
      cy.findByText('Cancelar').click()
    })

    // NOTE: price value
    it('should NOT allow a zero price product creation', function() {
      addNewProduct({name: 'MOCK', stock: '1', price: '0'})
      cy.findByText('valor unitário não pode ser 0').should('exist')
      cy.findByText('Cancelar').click()
    })
    it('should NOT allow a non-numeric price product creation', function() {
      addNewProduct({name: 'MOCK', stock: '1', price: 'foobar'})
      cy.findByText('valor unitário precisa ser numerico').should('exist')
      cy.findByText('Cancelar').click()
    })

    // TODO:
    /*
    it('should NOT allow a numeric-only named product creation', function() {})
    // NOTE: refresh
    it('should save newly created items locally', function() {})
    // NOTE: esse teste vale mais no DELETE
    // it('should reuse any vacant ID when inserting a new product in the list', function() {})
    // NOTE: esse teste vale mais no drag-n-drop talvez
    // it('should keep current products order list locally saved', function() {})
    */
  })
})
