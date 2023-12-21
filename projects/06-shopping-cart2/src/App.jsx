import { useState } from 'react'
import './App.css'
import { products as initialProducts } from './mocks/products.json'
import { Products } from './components/Products'
import { Header } from './components/Header'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/Cart'
import { CartProvider } from './context/cart'


function App() {

  const [products, setProducts] = useState(initialProducts)

  const { filterProducts } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <CartProvider>
        <Cart />
        <Header
        />
        <main>
          <h2>Products</h2>
          <Products
            products={filteredProducts}
          />
        </main>
      </CartProvider>
    </>
  )
}

export default App
