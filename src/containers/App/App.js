import React from 'react'
import ProductsPage from '../ProductsPage/ProductsPage'
import useDatabase from '../../hooks/useDatabase'
import './App.css'

function App() {
  const database = useDatabase()

  return (
    <div className="container">
      <ProductsPage
        list={database.list}
        sort={database.sort}
        reOrder={database.reOrder}
        addProduct={database.addProduct}
        updateProduct={database.updateProduct}
        removeProduct={database.removeProduct}
      />
    </div>
  )
}

export default App
