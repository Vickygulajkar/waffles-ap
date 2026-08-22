import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import AdminLayout from './layout/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Offers from './pages/Offers'
import DailyWinner from './pages/DailyWinner'
import Rewards from './pages/Rewards'
import Customers from './pages/Customers'
import Banners from './pages/Banners'
import Reports from './pages/Reports'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
      <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
      <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
      <Route path="/categories" element={<AdminLayout><Categories /></AdminLayout>} />
      <Route path="/offers" element={<AdminLayout><Offers /></AdminLayout>} />
      <Route path="/daily-winner" element={<AdminLayout><DailyWinner /></AdminLayout>} />
      <Route path="/rewards" element={<AdminLayout><Rewards /></AdminLayout>} />
      <Route path="/customers" element={<AdminLayout><Customers /></AdminLayout>} />
      <Route path="/banners" element={<AdminLayout><Banners /></AdminLayout>} />
      <Route path="/reports" element={<AdminLayout><Reports /></AdminLayout>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
