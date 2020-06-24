import '@testing-library/cypress/add-commands'

const MOCK_USER = {
  username: 'TEST_USERNAME',
  company: 'TEST_COMPANY',
}

let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

Cypress.Commands.add('clearLocalStorage', () => {
  localStorage.clear()
  LOCAL_STORAGE_MEMORY = {}
})

Cypress.Commands.add('setup', function (user = MOCK_USER) {
  cy.visit('/')
  cy.findByPlaceholderText('Usuário').type(user.username)
  cy.findByPlaceholderText('Empresa').type(user.company)
  cy.findByText('Entrar').click()
  // TODO: change to wait for loading table to stop
  /* eslint cypress/no-unnecessary-waiting: 'off' */
  cy.wait(1000)
})

Cypress.Commands.add('teardown', function () {
  cy.findByLabelText('options').click()
  cy.findByText('Delete items').click()
  // TODO: change to wait for items deletion
  /* eslint cypress/no-unnecessary-waiting: 'off' */
  cy.wait(1000)
  cy.findByText('Logout').click()
})

Cypress.Commands.add('populateProductListWith', function (MOCK_LIST) {
  MOCK_LIST.forEach((item) => {
    cy.findByLabelText('adicionar').click()
    cy.findByLabelText(/Nome do produto/).type(item.name)
    cy.findByLabelText(/Quantidade em estoque/).type(item.stock)
    cy.findByLabelText(/Preço unitário/).type(item.price)
    cy.findByText('Criar').click()
  })
})
