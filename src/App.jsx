import { Route, Routes } from "react-router-dom"
import DeafaultLayout from "./layout/DeafaultLayout"

function App() {

  return (
    <Routes>
      <Route Component={DeafaultLayout}>

      </Route>
    </Routes>
  )
}

export default App
