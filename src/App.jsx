import { Route, Routes } from "react-router-dom"
import DeafaultLayout from "./layout/DeafaultLayout"


//Pagine
import HomePage from "./pages/HomePage"
import EventDetails from "./pages/EventDetails"
import ComparatorPage from "./pages/ComparatorPage"
import WishlistPage from "./pages/WishListPage"

function App() {

  return (
    <Routes>
      <Route Component={DeafaultLayout}>
        <Route path="/" Component={HomePage} />
        <Route path="/comparator" Component={ComparatorPage} />
        <Route path="/wishlist" Component={WishlistPage} />
        <Route path="/events/:id" Component={EventDetails} />
      </Route>
    </Routes>
  )
}

export default App
