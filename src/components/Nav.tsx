import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Publications', href: '#publications' },
  { label: 'Hobbies', href: '#hobbies' },
  { label: 'Ask Me', href: '#console' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const nav = document.getElementById('mobile-nav');
      if (nav && !nav.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <header
      id="mobile-nav"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        backgroundColor: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.1)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-xl text-gold tracking-tight">VB</a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">{link.label}</a>
          ))}
          <a
            href="https://github.com/vyshakbellur"
            target="_blank"
            rel="noreferrer"
            className="nav-link border border-gold/30 px-3 py-1 hover:border-gold/70 hover:text-gold transition-colors"
          >
            GitHub ↗
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-cream transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[10px]' : ''}`} />
          <span className={`block w-5 h-px bg-cream transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-cream transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gold/10 bg-ink/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-base" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="https://github.com/vyshakbellur" target="_blank" rel="noreferrer" className="nav-link text-base" onClick={() => setMenuOpen(false)}>
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
}
