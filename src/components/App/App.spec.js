import React from 'react'
import {waitFor} from '@testing-library/react'

import question, {
  watchRequestRandomAnswer,
} from '../../stores/question/question'
import AppContainer from './AppContainer'

describe('App', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  describe('Sync Spec Example', () => {
    it('should correctly mock i18n translation', async () => {
      const {render} = setupRenderWithReduxAndSaga({question})

      const ui = <AppContainer />

      const {queryByText} = render(ui)

      await waitFor(() => {
        expect(queryByText(/friend_request/)).toBeInTheDocument()
      })
    })
  })

  describe('Async Spec Sample', function() {
    it('should correctly mock fetch calls', async function() {
      fetch.mockResponse(JSON.stringify({answer: 'no'}), {
        status: 200,
        headers: {'content-type': 'application/json'},
      })

      const {saga, render} = setupRenderWithReduxAndSaga({question})

      saga.run(watchRequestRandomAnswer)

      const ui = <AppContainer />

      const {getByText, getByTestId} = render(ui)

      await waitFor(() => {
        getByText(/random_answer/).click()
        expect(getByTestId(/answer-no/)).toBeChecked()
      })
    })
  })
})

// NOTE: integration
describe('Search Field', function() {
  it('should filter the product list with given text', function() {})
})

// NOTE:
//  2 - ID are insertion order based (not written)
//  3 - show error on wrong input value
//  4 - show error on 0 stock value
//  7 - reuse deleted IDs
describe('New Product Form', function() {
  // NOTE: unit
  it('should NOT allow an unnamed product creation', function() {})
  it('should NOT allow a repeated product creation', function() {})
  it('should NOT allow a numeric-only named product creation', function() {})
  it('should NOT allow a zero or negative stock product creation', function() {})
  it('should NOT allow a non-numeric stock product creation', function() {})
  it('should NOT allow a zero or negative price product creation', function() {})
  it('should NOT allow a non-numeric price product creation', function() {})

  // NOTE: integration
  it('should add a new product to the list when created', function() {})
  it('should reuse any vacant ID when inserting a new product in the list', function() {})
})

// NOTE:
//  1 - changes should be locally saved (page refresh wont reset list)
//  5 - changing stock to 0 deletes entry
//  6 - total value changes with stock|price modifications
describe('Product List', function() {
  it('should remove a zeroed stock quantity entry', function() {})
  it('should alter total value when stock AND|OR price is modified', function() {})
  it('should remove an entry when delete button is clicked', function() {})
  it('should allow users to reorder the list by dragging items', function() {})
  it('should reorder the list when headers are clicked', function() {})
  it('should locally save list state (page refresh wont reset list)', function() {})
})
