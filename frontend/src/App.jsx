import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AnimalList from './pages/AnimalList'
import AnimalForm from './pages/AnimalForm'
import AnimalDetail from './pages/AnimalDetail'
import VaccineForm from './pages/VaccineForm'
import DiseaseForm from './pages/DiseaseForm'
import ReproductionForm from './pages/ReproductionForm'
import MovementForm from './pages/MovementForm'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/animais" element={<AnimalList />} />
          <Route path="/animais/novo" element={<AnimalForm />} />
          <Route path="/animais/editar/:id" element={<AnimalForm />} />
          <Route path="/animais/:id" element={<AnimalDetail />} />
          <Route path="/animais/:id/vacinar" element={<VaccineForm />} />
          <Route path="/animais/:id/diagnosticar" element={<DiseaseForm />} />
          <Route path="/animais/:id/reproducao" element={<ReproductionForm />} />
          <Route path="/animais/:id/movimentar" element={<MovementForm />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
