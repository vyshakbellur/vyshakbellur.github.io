import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';


import Contact from './pages/Contact';
import Speak from './pages/Speak';
import Writing from './pages/Writing';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index       element={<Home />} />
          <Route path="about"        element={<About />} />


          <Route path="contact"      element={<Contact />} />
          <Route path="speak"        element={<Speak />} />
          <Route path="writing"      element={<Writing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
