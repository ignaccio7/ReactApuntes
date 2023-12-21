
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { Router } from './Router.jsx'
import { Route } from './Route.jsx'
import { Link } from './Link.jsx'
import { getCurrentPath } from './utils.js'

// describe('Router',()=>{  este para probar
//     it('should work',()=>{
//         expect(1).toBe(1)
//     })
// })

// usando una funcion de vitest para poder mockear y obtener el valor de una funcion
vi.mock('./utils.js', ()=>({
    // en lugar de que el getCurrentPath() sea una funcion que nos devolvera la ruta le podemos decir que es una funcion de vi y le podremos decir que es lo que queremos que nos devuelva
    getCurrentPath: vi.fn()
}))

describe('Router',()=>{
    beforeEach(()=>{
        cleanup()
        vi.clearAllMocks()
    })
    
    it('should render without problems',()=>{
        render(<Router routes={[]}/>)
        expect(true).toBeTruthy()
    })
    
    it('should render 404 if no routes match',()=>{
        render(<Router routes={[]} defaultComponent={()=>(<h1>404</h1>)}/>)
        // screen.debug()
        expect(screen.getByText('404')).toBeTruthy()
    })

    it('should render the component of the first route that matches',()=>{
        // cuando se llame de forma interna en nuestra app que devuelva /about
        getCurrentPath.mockReturnValue('/about')
        const routes = [
            {
                path: '/',
                Component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                Component: () => <h1>About</h1>
            }
        ]

        render(<Router routes={routes}/>)
        expect(screen.getByText('About')).toBeTruthy()

    })

    it('should navigate using Links',async () => {
        getCurrentPath.mockReturnValueOnce('/')

        render(
            <Router>
                <Route path="/" Component={()=>{
                    return(
                        <>
                            <h1>Home</h1>
                            <Link to="/about">Go to About</Link>
                        </>
                    )
                }}
                />
                <Route path="/about" Component={()=>{
                    return(
                        <h1>About</h1>
                    )
                }}

                />
            </Router>            
        )
        // Click on the link
        const button = screen.getByText(/Go to About/)
        fireEvent.click(button)        

        // Check that the new route is rendered
        const aboutTitle = await screen.findByText('About')

        expect(aboutTitle).toBeTruthy()
    })    

})

