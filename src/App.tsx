import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Checkout } from "./pages/Checkout"
import { NavigationBar } from "./components/Navbar"
import { ShoppingBasketProvider } from "./context/ShoppingBasketContext"

const App = () => {
    return (
        <ShoppingBasketProvider>
            <NavigationBar />
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Routes>
            </Container>
        </ShoppingBasketProvider>
    )
}

export default App
