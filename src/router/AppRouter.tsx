import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { Navbar } from "../components/Navbar/Navbar"
import { PokedexListPage } from "../pages/PokedexListPage/PokedexListPage"


export const AppRouter = () => {
  return (
    <>
    <Router>
        <Navbar />
        <main>
            <Routes>
                <Route path="/" element={<PokedexListPage />} />
            </Routes>
        </main>
    </Router>
    </>
  )
}
