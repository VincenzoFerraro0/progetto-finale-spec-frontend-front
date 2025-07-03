import { Route, Routes } from "react-router-dom"
import DeafaultLayout from "./layout/DeafaultLayout"
import HomePage from "./pages/HomePage"

function App() {

  return (
    <Routes>
      <Route Component={DeafaultLayout}>
        <Route path="/" Component={HomePage}/>
      </Route>
    </Routes>
  )
}

export default App
