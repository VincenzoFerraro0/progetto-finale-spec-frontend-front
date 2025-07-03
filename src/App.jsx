import { Route, Routes } from "react-router-dom"
import DeafaultLayout from "./layout/DeafaultLayout"
import HomePage from "./pages/HomePage"
import Comparator from "./pages/Comparator"
import Favorites from "./pages/Favorites"

function App() {

  return (
    <Routes>
      <Route Component={DeafaultLayout}>
        <Route path="/" Component={HomePage}/>
        <Route path="/comparator" Component={Comparator}/>
        <Route path="/favorites" Component={Favorites}/>
      </Route>
    </Routes>
  )
}

export default App
