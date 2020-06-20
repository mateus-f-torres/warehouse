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

Cypress.Commands.add('login', function () {
  cy.visit('/')
  cy.findByPlaceholderText('Usuário').type(MOCK_USER.username)
  cy.findByPlaceholderText('Empresa').type(MOCK_USER.company)
  cy.findByText('Entrar').click()

  // TODO: change to wait for loading table to stop
  /* eslint cypress/no-unnecessary-waiting: 'off' */
  cy.wait(1000)

  cy.findByLabelText('options').click()
  cy.findByText('Delete items').click().type('{esc}')
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
