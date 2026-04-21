import { useState } from 'react';

/* ─── Borough polygons ─────────────────────────────────────────────
   SVG ViewBox: 0 0 820 520
   Projection: linear Mercator approximation
     x(lng) = (lng + 74.26) * 1464
     y(lat) = (40.917 - lat) * 1182
   Key anchors:
     Battery Park tip  (-74.017, 40.700) ≈ (360, 256)
     Inwood/N-tip      (-73.920, 40.868) ≈ (502,  58)
     JFK Airport       (-73.780, 40.642) ≈ (706, 326)
     SI center         (-74.152, 40.576) ≈ (158, 402)
─────────────────────────────────────────────────────────────────── */

/* Manhattan — thin diagonal island running SW (Battery) → NE (Inwood) */
const M =
  /* west shore N→S */
  '502,58 480,80 460,100 440,122 420,142 400,164 390,180 378,198 ' +
  '368,218 358,240 350,256 ' +
  /* east shore S→N */
  '378,256 390,242 404,228 412,214 418,202 425,190 432,180 ' +
  '444,168 455,158 464,146 472,132 480,114 490,94 496,76 502,58';

/* The Bronx — main-land mass N of Manhattan */
const BX =
  '502,58 478,10 558,5 642,18 700,50 714,86 696,118 648,130 ' +
  '590,138 540,128 520,70 502,58';

/* Queens — large E-borough across East River */
const QN =
  '488,162 514,140 590,138 648,130 714,86 748,70 782,138 ' +
  '780,272 748,358 682,384 582,360 508,318 454,268 440,248 ' +
  '450,226 458,216 464,196 470,180 488,162';

/* Brooklyn — large S-borough, adjacent to Queens */
const BK =
  '408,268 454,268 508,318 582,360 628,428 598,482 508,490 ' +
  '418,482 378,448 364,398 368,348 388,310 408,268';

/* Staten Island — isolated SW across Upper Bay */
const SI =
  '52,370 88,322 132,308 178,308 222,318 255,338 270,368 ' +
  '265,402 248,432 215,454 178,464 140,460 102,448 70,428 ' +
  '48,396 48,374 52,370';

const BOROUGHS = [
  { id: 'staten-island', name: 'STATEN ISLAND', poly: SI,  fill: '#0d1018', stroke: 'rgba(100,140,200,0.28)' },
  { id: 'manhattan',     name: 'MANHATTAN',     poly: M,   fill: '#0e0e1c', stroke: 'rgba(100,140,200,0.32)' },
  { id: 'bronx',         name: 'THE BRONX',     poly: BX,  fill: '#0d1018', stroke: 'rgba(100,140,200,0.28)' },
  { id: 'queens',        name: 'QUEENS',        poly: QN,  fill: '#0d1018', stroke: 'rgba(100,140,200,0.28)' },
  { id: 'brooklyn',      name: 'BROOKLYN',      poly: BK,  fill: '#0d1018', stroke: 'rgba(100,140,200,0.28)' },
];

/* Central Park — tilted rect inside Manhattan (~W59–W110, CPW–5th Ave) */
const CENTRAL_PARK = '420,142 430,142 440,142 448,145 440,182 430,182 422,182 420,142';

/* Bridge lines (geographic landmark context) */
const BRIDGES = [
  { id: 'brooklyn-br',    x1: 370, y1: 250, x2: 408, y2: 268 },
  { id: 'williamsburg',   x1: 414, y1: 240, x2: 454, y2: 248 },
  { id: 'queensboro',     x1: 448, y1: 183, x2: 470, y2: 180 },
  { id: 'verrazano',      x1: 255, y1: 338, x2: 388, y2: 310 },
  { id: 'george-wash-br', x1: 398, y1: 120, x2: 320, y2: 108 }, /* off to NJ */
];

/* ─── Career stations ─────────────────────────────────────────────
   Each employer mapped to an NYC borough/neighborhood that resonates
   thematically with the career domain.
────────────────────────────────────────────────────────────────── */
const STOPS = [
  {
    id: 'hcl-in',
    borough: 'staten-island',
    neighborhood: 'Staten Island',
    domain: 'Legacy Enterprise',
    company: 'HCL Technologies (India)',
    role: 'Software Engineer',
    period: 'Aug 2014 – Jul 2016',
    color: '#2dd4bf',
    x: 160, y: 390,
    labelAnchor: 'below' as const,
    bullets: [
      'Enterprise HR automation — Java Spring Boot, JSP/Servlets, MySQL',
      'Reduced onboarding & background-check effort by ~70%',
      'Database schemas + front-end workflows for employee management platforms',
      'Spot Award for technical excellence',
    ],
  },
  {
    id: 'hcl-us',
    borough: 'manhattan',
    neighborhood: 'Midtown East, Manhattan',
    domain: 'Enterprise Systems',
    company: 'HCL America — Synchrony Financial',
    role: 'Senior Software Engineer',
    period: 'Jun 2018 – Dec 2021',
    color: '#f43f5e',
    x: 438, y: 184,
    labelAnchor: 'above' as const,
    bullets: [
      'Event-driven microservices — 1.2M+ credit card transactions/day',
      'Sub-50ms latency via Kafka, RabbitMQ, Redis',
      'Reusable React component library adopted across multiple teams',
      'Reduced OpenL rules config time by 80%',
    ],
  },
  {
    id: 'sdsu',
    borough: 'bronx',
    neighborhood: 'University Heights, The Bronx',
    domain: 'Research & Academia',
    company: 'SDSU Research Foundation',
    role: 'Research Software Developer',
    period: '2019 – 2020',
    color: '#f97316',
    x: 582, y: 88,
    labelAnchor: 'above' as const,
    bullets: [
      'CIBER Portal — event and program CMS for non-technical staff',
      'Bioinformatics data pipelines improving ingestion and accessibility',
      'Applied research: software engineering + ML data workflows',
    ],
  },
  {
    id: 'ford',
    borough: 'queens',
    neighborhood: 'Long Island City, Queens',
    domain: 'Automotive Innovation',
    company: 'Ford Motor Company',
    role: 'Software Engineer / Consultant',
    period: 'Mar 2021 – Dec 2022',
    color: '#3b82f6',
    x: 508, y: 222,
    labelAnchor: 'right' as const,
    bullets: [
      'EV Beta Program platform — ~15,000 users across the U.S.',
      'Full-stack: React, TypeScript, Spring Boot, MySQL',
      'Splunk + Amplitude observability pipelines',
      'TDD for customer-facing production stability',
    ],
  },
  {
    id: 'walmart',
    borough: 'brooklyn',
    neighborhood: 'Downtown Brooklyn',
    domain: 'Retail Technology',
    company: 'Walmart Global Tech',
    role: 'Software Engineer',
    period: 'Dec 2022 – Jun 2023',
    color: '#38bdf8',
    x: 488, y: 368,
    labelAnchor: 'below' as const,
    bullets: [
      'React analytics dashboards for shopper behavior and channel performance',
      'TDD with Jest, Cypress, and JUnit',
      'Role- and region-based access control across distributed teams',
    ],
  },
  {
    id: 'jpmc',
    borough: 'manhattan',
    neighborhood: 'Financial District, Manhattan',
    domain: 'FinTech & Platform',
    company: 'JPMorgan Chase & Co.',
    role: 'Senior Full-Stack & Platform Engineer',
    period: 'Jun 2023 – Present',
    color: '#F5A623',
    x: 368, y: 248,
    labelAnchor: 'left' as const,
    bullets: [
      'Modernizing Investment Discovery + Experience APIs — SOAP → REST',
      'Test coverage 18% → 80%; zero P1 incidents in 2025',
      'Cloud-native microservices on AWS — CI/CD, containers, secret management',
      '"Magic Button" — LLM for real-time wealth management intelligence',
      'Own TLS and ADFS certificate lifecycle across all environments',
    ],
  },
];

const VW = 820, VH = 520;

/* ─── Borough label positions (approximate centroid of each polygon) ─ */
const BOROUGH_LABELS = [
  { id: 'staten-island', x: 158, y: 388, name: 'STATEN ISLAND' },
  { id: 'manhattan',     x: 432, y: 188, name: 'MANHATTAN' },  /* note: small space */
  { id: 'bronx',         x: 590, y: 72,  name: 'THE BRONX' },
  { id: 'queens',        x: 608, y: 230, name: 'QUEENS' },
  { id: 'brooklyn',      x: 490, y: 428, name: 'BROOKLYN' },
];

/* ══════════════════════════════════════════════════════════════════ */
export default function Experience() {
  const [sel, setSel]   = useState<number | null>(5);
  const [hovr, setHovr] = useState<number | null>(null);

  const co = sel !== null ? STOPS[sel] : null;

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'hidden', background: '#030610' }}>

      {/* ─── NYC Map SVG ─── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%" height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}
        >
          <defs>
            {/* Street grid — rotated ~29° to match Manhattan grid bearing */}
            <pattern id="street-grid" width="18" height="18"
              patternUnits="userSpaceOnUse" patternTransform="rotate(29)">
              <line x1="18" y1="0" x2="18" y2="18"
                stroke="rgba(255,255,255,0.022)" strokeWidth="0.5"/>
              <line x1="0" y1="18" x2="18" y2="18"
                stroke="rgba(255,255,255,0.014)" strokeWidth="0.4"/>
            </pattern>

            {/* Station glow filter */}
            <filter id="sg" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5"/>
            </filter>

            {/* Vignette gradient */}
            <radialGradient id="vig" cx="50%" cy="50%" r="70%">
              <stop offset="0%"   stopColor="rgba(0,0,0,0)"/>
              <stop offset="100%" stopColor="rgba(0,0,0,0.55)"/>
            </radialGradient>

            {/* Clip: land area (prevents grid bleeding into water) */}
            <clipPath id="land-clip">
              <polygon points={M}/>
              <polygon points={BX}/>
              <polygon points={QN}/>
              <polygon points={BK}/>
              <polygon points={SI}/>
            </clipPath>
          </defs>

          {/* ── Water background ── */}
          <rect x="0" y="0" width={VW} height={VH}
            fill="#030818"/>

          {/* ── Borough land fills ── */}
          {BOROUGHS.map(b => (
            <polygon key={b.id}
              points={b.poly}
              fill={b.fill}
              stroke={b.stroke}
              strokeWidth="1"
              strokeLinejoin="round"
            />
          ))}

          {/* ── Street grid (clipped to land) ── */}
          <rect x="0" y="0" width={VW} height={VH}
            fill="url(#street-grid)"
            clipPath="url(#land-clip)"/>

          {/* ── Central Park (dark green in Manhattan) ── */}
          <polygon points={CENTRAL_PARK}
            fill="#091808" stroke="rgba(60,130,60,0.35)" strokeWidth="0.8"/>



          {/* ── Bridge lines ── */}
          {BRIDGES.map(br => (
            <line key={br.id}
              x1={br.x1} y1={br.y1} x2={br.x2} y2={br.y2}
              stroke="rgba(200,210,240,0.20)"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />
          ))}

          {/* ── Career subway line (segment-by-segment, each in endpoint colour) ── */}
          {STOPS.slice(0, -1).map((s, i) => {
            const t = STOPS[i + 1];
            return (
              <g key={`seg-${i}`}>
                {/* Glow */}
                <line x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                  stroke={t.color} strokeOpacity="0.17"
                  strokeWidth="11" strokeLinecap="round"
                  filter="url(#sg)"/>
                {/* Solid */}
                <line x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                  stroke={t.color} strokeOpacity="0.82"
                  strokeWidth="3.5" strokeLinecap="round"/>
              </g>
            );
          })}

          {/* ── Station circles ── */}
          {STOPS.map((s, i) => {
            const isActive  = sel === i;
            const isHovered = hovr === i;
            const r = isActive ? 13 : isHovered ? 10 : 7.5;

            /* label offset based on anchor direction */
            const lx = s.labelAnchor === 'right'  ? s.x + r + 10
                      : s.labelAnchor === 'left'   ? s.x - r - 10
                      : s.x;
            const ly = s.labelAnchor === 'above' ? s.y - r - 12
                      : s.labelAnchor === 'below' ? s.y + r + 14
                      : s.y;
            const ta = s.labelAnchor === 'right'  ? 'start'
                     : s.labelAnchor === 'left'   ? 'end'
                     : 'middle';

            return (
              <g key={s.id}
                onClick={() => setSel(sel === i ? null : i)}
                onMouseEnter={() => setHovr(i)}
                onMouseLeave={() => setHovr(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Active glow halo */}
                {isActive && (
                  <circle cx={s.x} cy={s.y} r={r + 8}
                    fill={s.color} fillOpacity="0.18" filter="url(#sg)"/>
                )}

                {/* Station ring */}
                <circle cx={s.x} cy={s.y} r={r}
                  fill={isActive ? s.color : '#08091A'}
                  stroke={s.color} strokeWidth={isActive ? 0 : 2.8}
                  style={{ transition: 'r 0.15s' }}/>

                {/* Inner pip */}
                {!isActive && (
                  <circle cx={s.x} cy={s.y} r={r - 4}
                    fill={isHovered ? '#dde0ee' : '#b8bbcf'}/>
                )}

                {/* Leader line to label (above/below) */}
                {(s.labelAnchor === 'above' || s.labelAnchor === 'below') && (
                  <line
                    x1={s.x} y1={s.labelAnchor === 'above' ? s.y - r : s.y + r}
                    x2={s.x} y2={s.labelAnchor === 'above' ? ly + 4 : ly - 4}
                    stroke={isActive ? s.color : 'rgba(200,205,225,0.25)'}
                    strokeWidth="0.8"/>
                )}

                {/* Company label */}
                <text x={lx} y={ly}
                  textAnchor={ta}
                  fill={isActive ? s.color : 'rgba(210,215,235,0.72)'}
                  fontSize={isActive ? 10 : 8.5}
                  fontFamily="Arial, sans-serif" fontWeight={isActive ? 900 : 700}
                  style={{ pointerEvents: 'none', transition: 'font-size 0.15s' }}>
                  {/* Abbreviated company + year */}
                  {s.company.split('(')[0].trim().split(' ').slice(0, 3).join(' ')}
                </text>
                <text x={lx}
                  y={ly + (s.labelAnchor === 'above' ? -11 : 12)}
                  textAnchor={ta}
                  fill={isActive ? `${s.color}bb` : 'rgba(170,175,205,0.38)'}
                  fontSize="7" fontFamily="monospace"
                  style={{ pointerEvents: 'none' }}>
                  {s.period.split('–')[0].trim().replace(/[A-Za-z ]*/g, '')}
                  {'–'}
                  {s.period.split('–')[1]?.trim().slice(0,4) || 'now'}
                </text>
              </g>
            );
          })}

          {/* ── Borough name labels (faint watermarks) ── */}
          {BOROUGH_LABELS.map(bl => {
            /* find which stop's color to use for active borough */
            const activeStop = sel !== null ? STOPS[sel] : null;
            const isActiveBoro = activeStop?.borough === bl.id;
            /* Manhattan has 2 stops — check both */
            const isManhatActive = bl.id === 'manhattan' && (
              STOPS[sel ?? -1]?.borough === 'manhattan'
            );
            const highlight = isActiveBoro || isManhatActive;
            return (
              <text key={bl.id}
                x={bl.x} y={bl.y}
                textAnchor="middle"
                fill="rgba(180,188,215,1)"
                fillOpacity={highlight ? 0.30 : 0.11}
                fontSize={bl.id === 'manhattan' ? 8 : 11}
                fontFamily="Arial Black, sans-serif"
                fontWeight="900"
                letterSpacing="0.20em"
                style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill-opacity 0.3s' }}>
                {bl.name}
              </text>
            );
          })}

          {/* ── Water labels ── */}
          {[
            { label: 'HUDSON RIVER',     x: 30,  y: 220, angle: -72 },
            { label: 'EAST RIVER',       x: 470, y: 208, angle: -62 },
            { label: 'NEW YORK HARBOR',  x: 245, y: 340, angle:  0  },
            { label: 'ATLANTIC OCEAN',   x: 490, y: 512, angle:  0  },
            { label: 'LONG ISLAND SOUND',x: 700, y: 48,  angle:  0  },
          ].map(w => (
            <text key={w.label}
              x={w.x} y={w.y}
              textAnchor="middle"
              fill="rgba(90,130,220,0.22)"
              fontSize="7.5"
              fontFamily="Georgia, serif"
              fontStyle="italic"
              transform={w.angle !== 0 ? `rotate(${w.angle},${w.x},${w.y})` : undefined}
              style={{ pointerEvents: 'none', userSelect: 'none' }}>
              {w.label}
            </text>
          ))}

          {/* ── Legend ── */}
          <g>
            <rect x="12" y={VH - 62} width="228" height="50" rx="3"
              fill="rgba(0,0,0,0.65)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8"/>
            {/* Career route line sample */}
            {STOPS.slice(0, 3).map((s, i) => {
              const x1 = 24 + i * 30;
              const x2 = x1 + 28;
              const y  = VH - 44;
              return (
                <g key={i}>
                  <line x1={x1} y1={y} x2={x2} y2={y}
                    stroke={STOPS[i + 1]?.color ?? s.color} strokeWidth="3" strokeLinecap="round"/>
                  <circle cx={x1} cy={y} r="4"
                    fill="#08091A" stroke={s.color} strokeWidth="2"/>
                </g>
              );
            })}
            <text x="118" y={VH - 40} fill="rgba(200,205,225,0.50)"
              fontSize="8" fontFamily="monospace">CAREER ROUTE (2014–PRESENT)</text>
            <text x="24"  y={VH - 22} fill="rgba(200,205,225,0.22)"
              fontSize="7.5" fontFamily="monospace" letterSpacing="0.05em">CLICK A STATION FOR DETAILS</text>
          </g>

          {/* Compass */}
          <text x={VW - 28} y="26" textAnchor="middle"
            fill="rgba(200,210,240,0.22)" fontSize="10"
            fontFamily="Arial Black,sans-serif">N</text>
          <line x1={VW - 28} y1="30" x2={VW - 28} y2="48"
            stroke="rgba(200,210,240,0.16)" strokeWidth="1"/>

          {/* Vignette */}
          <rect x="0" y="0" width={VW} height={VH} fill="url(#vig)"/>
        </svg>
      </div>

      {/* ─── Detail panel ─── */}
      <div style={{
        width: 305, flexShrink: 0,
        borderLeft: '1px solid rgba(255,255,255,0.05)',
        background: '#060010',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {co ? (
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 18px', display: 'flex', flexDirection: 'column' }}>

            {/* Domain / borough badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '3px 10px 3px 5px', borderRadius: 20,
              background: `${co.color}18`, border: `1px solid ${co.color}44`,
              alignSelf: 'flex-start', marginBottom: 14,
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: co.color, boxShadow: `0 0 8px ${co.color}88` }}/>
              <span style={{ fontSize: 7.5, fontFamily: 'monospace', letterSpacing: '0.15em', color: co.color, textTransform: 'uppercase' }}>
                {co.neighborhood}
              </span>
            </div>

            {/* Accent bar */}
            <div style={{ height: 2.5, borderRadius: 2, marginBottom: 14, background: co.color, boxShadow: `0 0 12px ${co.color}77` }}/>

            {/* Period */}
            <div style={{ fontFamily: 'monospace', fontSize: 8.5, letterSpacing: '0.18em', color: co.color, textTransform: 'uppercase' }}>
              {co.period}
            </div>

            {/* Company */}
            <div style={{ fontSize: 14.5, fontWeight: 900, color: '#fff', marginTop: 7, lineHeight: 1.35 }}>
              {co.company}
            </div>

            {/* Role */}
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)', marginTop: 5, fontStyle: 'italic', fontFamily: 'Georgia,serif' }}>
              {co.role}
            </div>

            {/* Domain */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
              <span style={{ fontSize: 7.5, fontFamily: 'monospace', color: `${co.color}88`, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Domain:
              </span>
              <span style={{ fontSize: 8, fontFamily: 'monospace', color: co.color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {co.domain}
              </span>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '12px 0' }}/>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {co.bullets.map((b, bi) => (
                <div key={bi} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                  <span style={{ color: co.color, flexShrink: 0, marginTop: 4, fontSize: 8 }}>●</span>
                  <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65 }}>{b}</span>
                </div>
              ))}
            </div>

            {/* Prev / Next */}
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              <button
                onClick={() => setSel(s => s !== null && s > 0 ? s - 1 : s)}
                disabled={sel === 0}
                style={{ flex: 1, padding: '7px 0', background: 'none', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 5, color: sel === 0 ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.40)', fontSize: 8.5, letterSpacing: '0.10em', fontFamily: 'monospace', cursor: sel === 0 ? 'default' : 'pointer' }}>
                ← PREV
              </button>
              <button
                onClick={() => setSel(s => s !== null && s < STOPS.length - 1 ? s + 1 : s)}
                disabled={sel === STOPS.length - 1}
                style={{ flex: 1, padding: '7px 0', background: 'none', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 5, color: sel === STOPS.length - 1 ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.40)', fontSize: 8.5, letterSpacing: '0.10em', fontFamily: 'monospace', cursor: sel === STOPS.length - 1 ? 'default' : 'pointer' }}>
                NEXT →
              </button>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
            <div>
              <div style={{ fontSize: 30, opacity: 0.07, marginBottom: 12 }}>🗽</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.2em', lineHeight: 2, fontFamily: 'monospace' }}>
                CLICK A STATION<br/>TO VIEW DETAILS
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
