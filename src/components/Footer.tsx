const links = [
  { label: 'GitHub', href: 'https://github.com/vyshakbellur' },
  { label: 'Instagram', href: 'https://instagram.com/v_naada' },
  { label: 'YouTube', href: 'https://youtube.com/@v_naada' },
];

export default function Footer() {
  return (
    <footer className="border-t border-cream/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-display font-bold text-gold text-lg">VB</span>
          <span className="font-mono text-xs text-mist ml-3">New Jersey, USA</span>
        </div>
        <div className="flex gap-6">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="nav-link">
              {link.label}
            </a>
          ))}
        </div>
        <p className="font-mono text-xs text-mist">© {new Date().getFullYear()} Vyshak Bellur</p>
      </div>
    </footer>
  );
}
