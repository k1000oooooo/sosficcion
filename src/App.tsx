import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ResonanceExtra from './pages/ResonanceExtra'
import CreativaRadio from './pages/CreativaRadio'
import Discografia from './pages/Discografia'
import Videos from './pages/Videos'

export default function App() {
  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resonance-extra" element={<ResonanceExtra />} />
        <Route path="/creativa-radio" element={<CreativaRadio />} />
        <Route path="/discografia" element={<Discografia />} />
        <Route path="/videos" element={<Videos />} />
      </Routes>
    </div>
  )
}
