describe('Warehouse should', function () {
  before(() => cy.login())

  it('allow users to create a single random item', function () {
    cy.findByTestId('options').click()
    cy.findByText('Add 1 random item').click().type('{esc}')
    cy.findAllByTestId('item').should('have.length', 1)
  })

  it('allow users to create multiple random items', function () {
    cy.findByTestId('options').click()
    cy.findByText('Add 10 random items').click().type('{esc}')
    cy.findAllByTestId('item').should('have.length', 10)
  })
})
