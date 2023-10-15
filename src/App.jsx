import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MainLayout from './pages/MainLoayout/MainLayout'
import Login from './pages/loginPage/Login'
import CreateNew from './pages/CreateNew/CreateNew'
import {BrowserRouter as Router, Routes as Switch, Route} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' element={<MainLayout/>}/>
        <Route path='/login' element={<Login/> }/>
        <Route path='/createNew' element={<CreateNew/> }/>
      </Switch>
    </Router>
  </>
  )
}

export default App
