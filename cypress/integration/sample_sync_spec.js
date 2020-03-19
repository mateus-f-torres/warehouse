describe('Warehouse', function() {
  it('should load sign-in page for new users', function() {
    cy.visit('/')
    expect(
      cy.findByText('A super original online storage logistics tool !!!'),
    ).toBeInTheDocument()
  })

  it('should allow a new user to sign-in', function() {
    cy.findByPlaceholderText('User').type('Matthews')
    cy.findByPlaceholderText('Company').type('Po.N.T.E')

    // cy.findByTestId('login.user')
    // cy.findByTestId('login.company')
  })

  it('should load product list page after signing-in')
  it('should load product list for already logged-in users')
  it('should allow a user to search for a specifically named product')
  it('should allow a user to add a new product')
  it('should allow a user to reorder the list by dragging a product')
  it('should keep a product list state even after a page refresh')
})
