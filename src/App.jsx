import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import MachinesPage from './pages/MachinesPage'
import ServicesPage from './pages/ServicesPage'
import IndustriesPage from './pages/IndustriesPage'
import ContactPage from './pages/ContactPage'
import MachineDetailPage from './pages/MachineDetailPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import SupportPage from './pages/SupportPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <ThemeProvider>
      <Layout>
        {({ isVisible }) => (
          <Routes>
            <Route path="/" element={<HomePage isVisible={isVisible} />} />
            <Route path="/machines" element={<MachinesPage isVisible={isVisible} />} />
            <Route path="/machines/:manufacturer/:slug" element={<MachineDetailPage />} />
            <Route path="/services" element={<ServicesPage isVisible={isVisible} />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/industries" element={<IndustriesPage isVisible={isVisible} />} />
            <Route path="/support" element={<SupportPage isVisible={isVisible} />} />
            <Route path="/about" element={<AboutPage isVisible={isVisible} />} />
            <Route path="/contact" element={<ContactPage isVisible={isVisible} />} />
          </Routes>
        )}
      </Layout>
    </ThemeProvider>
  )
}

export default App
