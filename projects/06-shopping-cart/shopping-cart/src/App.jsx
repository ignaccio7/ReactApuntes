// import { CartIcon } from './components/Icons'

// import './App.css'
// import productsJSON from './mocks/products.json'
// import { Products } from './components/Products.jsx'
// import { useState } from 'react'

// import { Header } from './components/Header'

// function App() {

//   const [products, setProducts] = useState(productsJSON.products)

//   // para hacer el filtrado
//   const [filters, setFilters] = useState({
//     category: 'all',
//     minPrice: 0
//   })

//   const filterProducts = (products) => {
//     return products.filter(product => {
//       return (
//         product.price >= filters.minPrice &&
//         (
//           filters.category === 'all' || product.category === filters.category
//         )
//       )
//     })
//   }

//   const filteredProducts = filterProducts(products)

//   return (
//     <>
//       <Header 
//         changeFilters={setFilters}
//       />
//       <main>
//         <h1>Carrito de compra</h1>
//         <Products
//           products={filteredProducts}
//         >

//         </Products>
//       </main>
//     </>
//   )
// }

// export default App

//refactorizando con un customHook

// import { CartIcon } from './components/Icons'

// import './App.css'
// import { products as InitialProducts } from './mocks/products.json'
// import { Products } from './components/Products.jsx'
// import { useState } from 'react'

// import { Header } from './components/Header'
// import { Footer } from './components/Footer'
// import { IS_DEVELOPMENT } from './config'

// function useFilters({ products }) {

//   // para hacer el filtrado
//   const [filters, setFilters] = useState({
//     category: 'all',
//     minPrice: 0
//   })

//   const filterProducts = (products) => {
//     return products.filter(product => {
//       return (
//         product.price >= filters.minPrice &&
//         (
//           filters.category === 'all' || product.category === filters.category
//         )
//       )
//     })
//   }

//   return { filterProducts, setFilters, filters }
// }

// function App() {

//   const [products] = useState(InitialProducts)

//   // para hacer el filtrado
//   const { filterProducts, setFilters, filters } = useFilters({ products })

//   const filteredProducts = filterProducts(products)

//   return (
//     <>
//       <Header
//         changeFilters={setFilters}
//       />
//       <main>
//         <h1>Carrito de compra</h1>
//         <Products
//           products={filteredProducts}
//         >

//         </Products>
//       </main>
//       { IS_DEVELOPMENT && <Footer filters={filters}/> }
//     </>
//   )
// }

// export default App


//para empezar a usar useContext

import { CartIcon } from './components/Icons'

import './App.css'
import { products as InitialProducts } from './mocks/products.json'
import { Products } from './components/Products.jsx'
import { useContext, useState } from 'react'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { IS_DEVELOPMENT } from './config'

import { useFilters } from './hooks/useFilters'

import { Cart } from './components/Cart'

import { CartProvider } from './context/cart'

function App() {

  const [products] = useState(InitialProducts)

  // para hacer el filtrado
  const { filterProducts, setFilters, filters } = useFilters()

  const filteredProducts = filterProducts(products)

  return (
    <>
      <CartProvider>
        <Cart />
        <Header
        />
        <main>
          <h1>Carrito de compra</h1>
          <Products
            products={filteredProducts}
          >

          </Products>
        </main>
        {IS_DEVELOPMENT && <Footer filters={filters} />}
      </CartProvider>
    </>
  )
}

export default App

