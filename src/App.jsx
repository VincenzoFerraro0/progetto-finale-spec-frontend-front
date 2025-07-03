import { Route, Routes } from "react-router-dom"
import DeafaultLayout from "./layout/DeafaultLayout"


//Pagine
import Comparator from "./pages/Comparator"
import Favorites from "./pages/Favorites"
import EventsList from "./pages/EventsList"

function App() {
  return (
    <Routes>
      <Route Component={DeafaultLayout}>
        <Route path="/" Component={EventsList}/>
        <Route path="/comparator" Component={Comparator}/>
        <Route path="/favorites" Component={Favorites}/>
      </Route>
    </Routes>
  )
}

export default App
