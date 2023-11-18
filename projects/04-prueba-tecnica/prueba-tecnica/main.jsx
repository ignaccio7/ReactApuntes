// import { createRoot } from 'react-dom/client'

// const root = createRoot(document.getElementById("app"))

// root.render(<h1>Hello, world!</h1>)

import { createRoot } from 'react-dom/client'
import { App } from './src/App'
const root = createRoot(document.getElementById("app"))

root.render(<App/>)