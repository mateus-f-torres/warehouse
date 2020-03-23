import '@testing-library/cypress/add-commands'

// Cypress LocalStorage workaround by Christian Kolb
// https://blog.liplex.de/keep-local-storage-in-cypress/
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

Cypress.Commands.add('warehouseLogin', function() {
  cy.visit('/')
  cy.findByPlaceholderText('Usuário').type('Mateus')
  cy.findByPlaceholderText('Empresa').type('Po.N,T.E')
  cy.findByText('Entrar').click()
})
