import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'

export default function PlantillaMarketplace({ children }) {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

