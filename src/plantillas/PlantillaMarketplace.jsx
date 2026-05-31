import Footer from '../components/Footer'
import Header from '../components/Header'

export default function PlantillaMarketplace({ children }) {
  return (
    <div className="app">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

