import { Suspense, lazy } from 'react'

import './App.css'
import { Router } from './Router'
import { Route } from './Route'

import HomePage from './pages/Home'
// import AboutPage from './pages/About' // import estatico
import Page404 from './pages/404'
import Search from './pages/Search'

// import Dinamico
const LazyAboutPage = lazy(()=>import('./pages/About.jsx')) // va crear un componente vacio de forma que hasta que no se renderize nose ejecutara ese import

// const routes = [
//   {
//     path: '/',
//     Component: HomePage
//   },
//   {
//     path: '/about',
//     Component: AboutPage
//   },
//   {
//     path: '/twich',
//     Component: () => <h1>Twich</h1>
//   },
//   /* para las rutas con parametros */
//   // {
//   //   path: '/search/:query', /** que bien seria /search/javascript o /search/nodejs o /search/react.....*/
//   //   Component: ({routeParams}) => <h1>Haz buscado : {routeParams.query}</h1>
//   // },
//   {
//     path: '/search/:query',
//     Component: Search
//   },
// ]

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: Search
  },
]

function App() {
  
  return (
    <main>
      {/* a esto se le diria renderizado condicional pero es muy espartano */}
      {/* { currentPath === '/' && <HomePage/>}
      { currentPath === '/about' && <AboutPage/> } */}

      {/* <Router routes={routes} /> de esta manera esta agarrando el defaultComponente en la funcion del router*/}

      {/* ---- */}

      {/* <Router routes={routes} defaultComponent={Page404}/> */}

      {/* <Router routes={routes} defaultComponent={Page404}/> */}
      {/* Como usamos un componente dinamico que sera un componente que no estara
      disponible hasta que no se lo requiera entonce lo tenemos que envolver en un Suspense
      e incluso el <Suspense fallback={<div>Loading</div>}> que si hay parte de la UI que esta suspendida
      quiero que me renderices algo*/}
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={HomePage}/>
          {/* <Route path='/about' Component={AboutPage}/> */}
          <Route path='/about' Component={LazyAboutPage}/>
        </Router>
      </Suspense>
      
    </main>
  )
}

export default App
