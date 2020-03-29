import '@testing-library/cypress/add-commands'

let LOCAL_STORAGE_MEMORY = {}

Cypress.Commands.add('saveLocalStorageCache', () => {
  Object.keys(localStorage).forEach((key) => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key]
  })
})

Cypress.Commands.add('restoreLocalStorageCache', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach((key) => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
  })
})

Cypress.Commands.add('clearLocalStorageCache', () => {
  localStorage.clear()
  LOCAL_STORAGE_MEMORY = {}
})

Cypress.Commands.add('loginWith', function(MOCK_USER) {
  cy.visit('/')
  cy.findByPlaceholderText('Usuário').type(MOCK_USER.username)
  cy.findByPlaceholderText('Empresa').type(MOCK_USER.company)
  cy.findByText('Entrar').click()
})

Cypress.Commands.add('populateProductListWith', function(MOCK_LIST) {
  MOCK_LIST.forEach((item) => {
    cy.findByText('Adicionar novo produto').click()
    cy.findByPlaceholderText('Nome do Produto').type(item.name)
    cy.findByPlaceholderText('Quantidade em Estoque').type(item.stock)
    cy.findByPlaceholderText('Preço Unitário').type(item.price)
    cy.findByText('Criar').click()
  })
})
