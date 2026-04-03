import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import StaffPortal from './pages/StaffPortal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sobre" element={<About />} />
          <Route path="contacto" element={<Contact />} />
          <Route path="staff" element={<StaffPortal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
