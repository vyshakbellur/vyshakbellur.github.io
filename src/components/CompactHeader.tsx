import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../data/nav';

/* Per-page accent colours — complement each page's content palette */
const PAGE_ACCENT: Record<string, string> = {
  '/about':        '#F2E8D0',  /* warm ivory — general bio */
  '/education':    '#86efac',  /* sage green — academic */
  '/experience':   '#F5A623',  /* amber — career timeline */
  '/sandbox':      '#00D4FF',  /* cyan — interactive algorithms */
  '/projects':     '#00ffa0',  /* ATC green — radar */
  '/publications': '#7dd3fc',  /* sky blue — papers */
  '/life':         '#fb7185',  /* rose — running / travel */
  '/contact':      '#c084fc',  /* lavender — message */
};

function accent(pathname: string): string {
  return PAGE_ACCENT[pathname] ?? '#F2E8D0';
}

/* ══════════════════════════════════════════════════════════════════ */
export default function CompactHeader() {
  const { pathname } = useLocation();
  const ac = accent(pathname);

  return (
    <header
      className="hidden md:flex flex-shrink-0 z-50 items-center"
      style={{
        height: 54,
        background: 'rgba(5,3,0,0.96)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${ac}22`,
        boxShadow: `0 1px 0 ${ac}10, 0 4px 20px rgba(0,0,0,0.7)`,
        padding: '0 24px',
        gap: 0,
      }}
    >
      {/* ── Name / home link ── */}
      <Link
        to="/"
        style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 1, marginRight: 'auto' }}
      >
        <span style={{
          fontSize: 13.5, fontWeight: 900, fontFamily: 'Georgia,serif',
          letterSpacing: '0.07em', color: ac, lineHeight: 1,
          textShadow: `0 0 18px ${ac}44`,
          transition: 'color 0.3s, text-shadow 0.3s',
        }}>
          VYSHAK ATHREYA
        </span>
        <span style={{
          fontSize: 7.5, fontWeight: 600, letterSpacing: '0.22em',
          color: `${ac}55`, fontFamily: 'Georgia,serif', lineHeight: 1,
        }}>
          BELLUR KESHAVAMURTHY
        </span>
      </Link>

      {/* ── Separator ── */}
      <div style={{ width: 1, height: 28, background: `${ac}18`, marginRight: 20 }} />

      {/* ── Nav links ── */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {nav.map(item => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === '/'}
            style={({ isActive }) => ({
              textDecoration: 'none',
              padding: '5px 11px',
              borderRadius: 6,
              fontSize: 9.5,
              fontFamily: 'monospace',
              fontWeight: isActive ? 900 : 400,
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color: isActive ? ac : 'rgba(255,255,255,0.58)',
              background: isActive ? `${ac}14` : 'transparent',
              borderBottom: isActive ? `2px solid ${ac}` : '2px solid transparent',
              transition: 'color 0.15s, background 0.15s, border-color 0.15s',
              whiteSpace: 'nowrap',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
