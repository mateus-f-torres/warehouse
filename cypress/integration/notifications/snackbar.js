describe('Snackbar should', function () {
  after(cy.teardown)

  const username = 'TEST_USERNAME'
  const DELAY = {username, company: 'TEST_DELAY_COMPANY'}
  const SUCCESS = {username, company: 'TEST_SUCCESS_COMPANY'}
  const FAILURE = {username, company: 'TEST_FAILURE_COMPANY'}

  function tryAddingProduct() {
    cy.findByLabelText('adicionar').click()
    cy.findByLabelText(/Nome do produto/).type('Bacon')
    cy.findAllByLabelText(/Quantidade em estoque/).type('2')
    cy.findAllByLabelText(/Preço unitário/).type('11,19')
    cy.findByText('Criar').click()
  }

  it('notify user when an action is taken', function () {
    cy.setup(DELAY)

    tryAddingProduct()

    cy.findByText(/[aA]dicionando/).should('exist')
  })

  it('notify user when an action is successful', function () {
    cy.setup(SUCCESS)

    tryAddingProduct()

    cy.findByText(/[aA]dicionando/).should('exist')
    cy.findByText(/sucesso/).should('exist')
  })

  it('notify user when an action is unsuccessful', function () {
    cy.setup(FAILURE)

    tryAddingProduct()

    cy.findByText(/[aA]dicionando/).should('exist')
    cy.findByText(/[eE]rro/).should('exist')
  })
})
