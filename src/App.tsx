import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Life from './pages/Life';
import Contact from './pages/Contact';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index       element={<Home />} />
          <Route path="about"        element={<About />} />
          <Route path="education"    element={<Education />} />
          <Route path="experience"   element={<Experience />} />
          <Route path="projects"     element={<Projects />} />
          <Route path="publications" element={<Publications />} />
          <Route path="life"         element={<Life />} />
          <Route path="contact"      element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
