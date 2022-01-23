import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Home from './components/Home'
import Sell from './components/Sell'
import Saved from './components/Saved'
import More from './components/More'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="App">
      <main className="loading show">
        <div className="ui-loader"><FontAwesomeIcon icon={faSpinner} /></div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/app-find-it-guide-cars' element={<Home />} />
            <Route path='/app-find-it-guide-cars-sell' element={<Sell />} />
            <Route path='/app-find-it-guide-cars-saved' element={<Saved />} />
            <Route path='/app-find-it-guide-cars-settings' element={<More />} />
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  )
}