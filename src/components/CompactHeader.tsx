import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { nav } from '../data/nav';

export default function CompactHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-white/[0.08] bg-[#050912]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-full max-w-6xl items-center px-5">
          <Link
            to="/"
            className="mr-auto text-[15px] font-semibold tracking-[-0.01em] text-white/90 transition-colors hover:text-white sm:text-base"
            onClick={() => setMenuOpen(false)}
          >
            Vyshak Bellur
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 8h16" />
                  <path d="M4 16h16" />
                </>
              )}
            </svg>
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-white/[0.09] text-white'
                      : 'text-white/50 hover:bg-white/[0.045] hover:text-white/80'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {menuOpen && (
        <nav className="absolute left-0 right-0 top-16 z-40 border-b border-white/[0.08] bg-[#050912]/95 px-5 py-3 shadow-2xl backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
          <div className="mx-auto max-w-6xl">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                end={item.href === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-3 text-sm transition-colors ${
                    isActive ? 'bg-white/[0.07] text-white' : 'text-white/55 hover:bg-white/[0.04] hover:text-white/80'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
