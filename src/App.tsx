import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import Layout from './components/Layout';
import Home from './pages/Home';
import MLPage from './pages/MLPage';
import Projects from './pages/Projects';
import Writing from './pages/Writing';
import Certs from './pages/Certs';
import Contact from './pages/Contact';
import Publications from './pages/Publications';

export default function App() {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="ml" element={<MLPage />} />
          <Route path="projects" element={<Projects />} />
          <Route path="writing" element={<Writing />} />
          <Route path="certs" element={<Certs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="publications" element={<Publications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
