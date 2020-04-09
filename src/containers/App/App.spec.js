// import React from 'react'
// import {waitFor} from '@testing-library/react'

describe('App', () => {
  describe('Sync Spec Example', () => {
    it('should correctly mock i18n translation', () => {
      // const {render} = setupRenderWithReduxAndSaga({question})
      //
      // const ui = <AppContainer />
      //
      // const {queryByText} = render(ui)
      //
      // await waitFor(() => {
      //   expect(queryByText(/friend_request/)).toBeInTheDocument()
      // })
    })
  })
})

// NOTE: integration
describe('Search Field', function () {
  it('should filter the product list with given text', function () {})
})

// NOTE:
//  2 - ID are insertion order based (not written)
//  3 - show error on wrong input value
//  4 - show error on 0 stock value
//  7 - reuse deleted IDs

// NOTE:
//  1 - changes should be locally saved (page refresh wont reset list)
//  5 - changing stock to 0 deletes entry
//  6 - total value changes with stock|price modifications
describe('Product Table', function () {
  it('should remove a zeroed stock quantity entry', function () {})
  it('should alter total value when stock AND|OR price is modified', function () {})
  it('should remove an entry when delete button is clicked', function () {})
  it('should allow users to reorder the list by dragging items', function () {})
  it('should reorder the list when headers are clicked', function () {})
  it('should locally save list state (page refresh wont reset list)', function () {})
})
