import { Route, Routes } from 'react-router';
import Header from './components/Header';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

export default function App() {
  return (
    <div className="wrapper">
      <a className="skip-link" href="#main-content">Перейти к содержимому</a>
      <Header />
      <main className="content" id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
