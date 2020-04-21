describe('Warehouse', function () {
  before(() => cy.login())

  describe('allows a user to add a new product to the list', function () {
    beforeEach(() => cy.findByLabelText('adicionar').click())

    function addNewProduct({name, stock, price}) {
      cy.findByLabelText(/Nome do produto/).type(name)
      cy.findAllByLabelText(/Quantidade em estoque/).type(stock)
      cy.findAllByLabelText(/Preço unitário/).type(price)
      cy.findByText('Criar').click()
    }

    function cancelCreation() {
      cy.findByLabelText(/Nome do produto/).type('{esc}')
    }

    it('should add a new product to the list when created', function () {
      addNewProduct({name: 'Bacon', stock: '4', price: '12,99'})
      cy.findByText('Bacon').should('exist')
    })

    // NOTE: product name
    /* TODO: return this spec
    it('should NOT allow a repeated product creation', function () {
      addNewProduct({name: 'Bacon', stock: '4', price: '12,99'})
      cy.findByText('produto já existente').should('exist')
      cy.findByTestId('cancel').click()
    })
     */
    it('should NOT allow an unnamed product creation', function () {
      addNewProduct({name: '    ', stock: '4', price: '12,99'})
      cy.findByText('Nome precisa ser preenchido').should('exist')
      cancelCreation()
    })

    // NOTE: stock number
    it('should NOT allow a zero stock product creation', function () {
      addNewProduct({name: 'MOCK', stock: '0', price: '1'})
      cy.findByText('Estoque não pode ser 0').should('exist')
      cancelCreation()
    })
    it('should NOT allow a non-numeric stock product creation', function () {
      addNewProduct({name: 'MOCK', stock: 'foobar', price: '1'})
      cy.findByText('Estoque precisa ser numérico').should('exist')
      cancelCreation()
    })

    // NOTE: price value
    it('should NOT allow a zero price product creation', function () {
      addNewProduct({name: 'MOCK', stock: '1', price: '0'})
      cy.findByText('Valor não pode ser 0').should('exist')
      cancelCreation()
    })
    it('should NOT allow a non-numeric price product creation', function () {
      addNewProduct({name: 'MOCK', stock: '1', price: 'foobar'})
      cy.findByText('Valor precisa ser numérico').should('exist')
      cancelCreation()
    })

    // TODO:
    /*
    // NOTE: refresh
    it('should save newly created items locally', function() {})
    // NOTE: esse teste vale mais no DELETE
    // it('should reuse any vacant ID when inserting a new product in the list', function() {})
    // NOTE: esse teste vale mais no drag-n-drop talvez
    // it('should keep current products order list locally saved', function() {})
    */
  })
})
