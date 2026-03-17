import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import { useAuth } from './context/AuthContext'

function PrivateRoute() {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <Outlet />
}

function App() {
  return (
    <div className="min-h-screen bg-sable-100/80 bg-pattern-moroccan bg-moroccan-sm">
      <div className="min-h-screen bg-gradient-to-b from-sable-100/90 via-sable-100/60 to-sable-100/90">
        <Navbar />
        <main className="container-page pt-24 pb-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
