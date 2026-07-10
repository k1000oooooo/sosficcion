import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import ResonanceExtra from './pages/ResonanceExtra'
import CreativaRadio from './pages/CreativaRadio'
import Discografia from './pages/Discografia'
import Videos from './pages/Videos'
import Books from './pages/Books'
import BookViewer from './pages/BookViewer'
import Contacto from './pages/Contacto'
import { books } from './content/books'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/resonance-extra" element={<ResonanceExtra />} />
        <Route path="/creativa-radio" element={<CreativaRadio />} />
        <Route path="/discografia" element={<Discografia />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/books" element={<Books />} />
        {books.map((book) => (
          <Route
            key={book.id}
            path={`/books/${book.id}`}
            element={<BookViewer bookId={book.id} />}
          />
        ))}
        <Route path="/contacto" element={<Contacto />} />
      </Route>
    </Routes>
  )
}
