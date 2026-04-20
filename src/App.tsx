import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Background from './components/Background';
import Layout from './components/Layout';
import Home from './pages/Home';
import MLPage from './pages/MLPage';
import Experience from './pages/Experience';
import Credentials from './pages/Credentials';
import Life from './pages/Life';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Background />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experience" element={<Experience />} />
          <Route path="credentials" element={<Credentials />} />
          <Route path="projects" element={<Projects />} />
          <Route path="publications" element={<Publications />} />
          <Route path="life" element={<Life />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
