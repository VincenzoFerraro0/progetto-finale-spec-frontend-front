import { Route, Routes } from "react-router-dom"
import DeafaultLayout from "./layout/DeafaultLayout"


//Pagine
import Favorites from "./pages/Favorites"
import EventsList from "./pages/EventsList"
import EventDetails from "./pages/EventDetails"
import ComparatorPage from "./pages/ComparatorPage"

function App() {

  return (
    <Routes>
      <Route Component={DeafaultLayout}>
        <Route path="/" Component={EventsList} />
        <Route path="/comparator" Component={ComparatorPage} />
        <Route path="/favorites" Component={Favorites} />
        <Route path="/events/:id" Component={EventDetails} />
      </Route>
    </Routes>
  )
}

export default App
