import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { officeBearers, DOMAIN_ORDER, DOMAIN_IDENTITY } from '../data/officeBearers';
import ProfileCard from './ProfileCard/ProfileCard';

gsap.registerPlugin(ScrollTrigger);

const TOTAL = officeBearers.length; // 33
const PX_PER_MEMBER = 900;          // scroll px per member beat
const CARD_W = 220;                 // card wrapper width px

const DOMAIN_CARD_THEME = {
  'Chair Person':        { glow: 'rgba(158,55,58,0.72)',  inner: 'linear-gradient(145deg,#9e373a55 0%,#c0565a33 100%)' },
  'General Secretary':   { glow: 'rgba(43,95,131,0.72)',  inner: 'linear-gradient(145deg,#2b5f8355 0%,#3d7aa833 100%)' },
  'Overall Coordinator': { glow: 'rgba(109,76,158,0.72)', inner: 'linear-gradient(145deg,#6d4c9e55 0%,#9370cc33 100%)' },
  'Treasurer':           { glow: 'rgba(43,122,95,0.72)',  inner: 'linear-gradient(145deg,#2b7a5f55 0%,#3da88233 100%)' },
  'TechOps':             { glow: 'rgba(26,107,138,0.72)', inner: 'linear-gradient(145deg,#1a6b8a55 0%,#2a8fb033 100%)' },
  'Design':              { glow: 'rgba(138,58,107,0.72)', inner: 'linear-gradient(145deg,#8a3a6b55 0%,#b0509033 100%)' },
  'Alumni Relation':     { glow: 'rgba(122,96,32,0.72)',  inner: 'linear-gradient(145deg,#7a602055 0%,#a8803033 100%)' },
  'HR and PR':           { glow: 'rgba(43,95,131,0.72)',  inner: 'linear-gradient(145deg,#2b5f8355 0%,#3d7aa833 100%)' },
  'Logistics':           { glow: 'rgba(74,107,43,0.72)',  inner: 'linear-gradient(145deg,#4a6b2b55 0%,#6a904033 100%)' },
  'Reports':             { glow: 'rgba(107,43,43,0.72)',  inner: 'linear-gradient(145deg,#6b2b2b55 0%,#9e373a33 100%)' },
  'Photography':         { glow: 'rgba(43,74,122,0.72)',  inner: 'linear-gradient(145deg,#2b4a7a55 0%,#3d6aaa33 100%)' },
  'Hospitality':         { glow: 'rgba(122,58,43,0.72)',  inner: 'linear-gradient(145deg,#7a3a2b55 0%,#a8603033 100%)' },
  'Events':              { glow: 'rgba(158,55,58,0.72)',  inner: 'linear-gradient(145deg,#9e373a55 0%,#c0565a33 100%)' },
};

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#9e373a,#c0565a)',
  'linear-gradient(135deg,#2b5f83,#3d7aa8)',
  'linear-gradient(135deg,#6d4c9e,#9370cc)',
  'linear-gradient(135deg,#2b7a5f,#3da882)',
  'linear-gradient(135deg,#1a6b8a,#2a8fb0)',
  'linear-gradient(135deg,#8a3a6b,#b05090)',
  'linear-gradient(135deg,#7a6020,#a88030)',
  'linear-gradient(135deg,#4a6b2b,#6a9040)',
];

const ICON_PATTERN_URL = '/assets/demo/iconpattern.png';

function makeInitialsAvatar(name, gradient) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const [c1 = '#9e373a', c2 = '#2b5f83'] = gradient.match(/#[0-9a-f]{6}/gi) ?? [];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
    <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/>
    </linearGradient></defs>
    <rect width="300" height="300" fill="url(#g)"/>
    <text x="150" y="175" font-family="Space Grotesk,Inter,sans-serif" font-size="110"
      font-weight="700" fill="white" text-anchor="middle" dominant-baseline="middle"
      letter-spacing="-2">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// ─── Reduced-motion fallback ──────────────────────────────────────────────────
function ReducedMotionFallback() {
  return (
    <section id="bearers" className="py-24 px-4" style={{ background: '#0d0d14' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest block mb-3" style={{ color: '#2b5f83' }}>Leadership</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Office <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#9e373a,#2b5f83)' }}>Bearers</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg,#9e373a,#2b5f83)' }} />
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {officeBearers.map((m, i) => {
            const theme = DOMAIN_CARD_THEME[m.domain];
            const gradient = AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length];
            return (
              <div key={m.id} style={{ width: CARD_W }}>
                <ProfileCard
                  name={m.name} title={m.position} handle={m.registerNumber}
                  status={m.className} avatarUrl={m.image || makeInitialsAvatar(m.name, gradient)}
                  showUserInfo enableTilt enableMobileTilt={false}
                  behindGlowEnabled behindGlowColor={theme.glow}
                  innerGradient={theme.inner} iconUrl={ICON_PATTERN_URL}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function OfficeBearers() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return <ReducedMotionFallback />;
  return <CinematicBearers />;
}

// ─── Cinematic per-member experience ─────────────────────────────────────────
function CinematicBearers() {
  const wrapperRef   = useRef(null);
  const stickyRef    = useRef(null);
  const bgGlowRef    = useRef(null);
  const cardElsRef   = useRef([]);   // one ref per member card wrapper
  const progressRef  = useRef(null);
  const memberNumRef = useRef(null);
  const domainLblRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const totalScrollPx = TOTAL * PX_PER_MEMBER;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide all cards initially
      cardElsRef.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 60, scale: 0.88 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: `+=${totalScrollPx}`,
          scrub: 1.2,
          pin: stickyRef.current,
          anticipatePin: 1,
          onUpdate(self) {
            if (progressRef.current)
              progressRef.current.style.width = `${self.progress * 100}%`;

            const idx = Math.min(Math.floor(self.progress * TOTAL), TOTAL - 1);
            const m = officeBearers[idx];

            if (memberNumRef.current)
              memberNumRef.current.textContent = `${idx + 1} / ${TOTAL}`;
            if (domainLblRef.current)
              domainLblRef.current.textContent = m.domain;

            setActiveIdx(idx);

            // Update background glow color
            if (bgGlowRef.current) {
              const identity = DOMAIN_IDENTITY[m.domain];
              bgGlowRef.current.style.background =
                `radial-gradient(ellipse 60% 50% at 50% 50%, ${identity.glow.replace('0.18', '0.22')}, transparent 70%)`;
            }
          },
        },
      });

      let cursor = 0;

      officeBearers.forEach((member, idx) => {
        const el     = cardElsRef.current[idx];
        const nextEl = cardElsRef.current[idx + 1];

        // Card IN
        tl.to(el, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }, cursor);

        cursor += 0.5; // hold

        // Card OUT + next card starts coming in
        tl.to(el, { opacity: 0, y: -50, scale: 0.92, duration: 0.3, ease: 'power2.in' }, cursor);

        if (nextEl) {
          tl.fromTo(
            nextEl,
            { opacity: 0, y: 60, scale: 0.88 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' },
            cursor + 0.15
          );
        }

        cursor += 0.45;
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const domainDots = DOMAIN_ORDER.map(domain => ({
    domain,
    identity: DOMAIN_IDENTITY[domain],
    firstIdx: officeBearers.findIndex(m => m.domain === domain),
  }));

  return (
    <div
      ref={wrapperRef}
      id="bearers"
      style={{ height: `${totalScrollPx + (typeof window !== 'undefined' ? window.innerHeight : 800)}px` }}
    >
      <div
        ref={stickyRef}
        className="w-full overflow-hidden"
        style={{ height: '100vh', position: 'sticky', top: 0, background: '#0d0d14' }}
      >
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Background glow */}
        <div ref={bgGlowRef} className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(158,55,58,0.22), transparent 70%)' }}
        />

        {/* Top header */}
        <div className="absolute top-5 left-0 right-0 flex justify-center z-10 pointer-events-none">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">ACA 2026–27</span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5" style={{ fontFamily: 'Space Grotesk' }}>
              Office{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#9e373a,#2b5f83)' }}>
                Bearers
              </span>
            </h2>
          </div>
        </div>

        {/* All member cards — stacked, GSAP controls visibility */}
        <div className="absolute inset-0 flex items-center justify-center">
          {officeBearers.map((member, idx) => {
            const theme    = DOMAIN_CARD_THEME[member.domain];
            const gradient = AVATAR_GRADIENTS[idx % AVATAR_GRADIENTS.length];
            const avatar   = member.image || makeInitialsAvatar(member.name, gradient);

            return (
              <div
                key={member.id}
                ref={el => (cardElsRef.current[idx] = el)}
                className="absolute"
                style={{
                  width: 'min(340px, 55vw)',
                  willChange: 'transform, opacity',
                  pointerEvents: 'auto',
                }}
              >
                <ProfileCard
                  name={member.name}
                  title={member.position}
                  handle={member.registerNumber}
                  status={member.className}
                  avatarUrl={avatar}
                  showUserInfo
                  enableTilt
                  enableMobileTilt={false}
                  behindGlowEnabled
                  behindGlowColor={theme.glow}
                  innerGradient={theme.inner}
                  iconUrl={ICON_PATTERN_URL}
                />
              </div>
            );
          })}
        </div>

        {/* HUD — bottom */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2.5 z-20 pointer-events-none">
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p className="text-xs text-gray-600 uppercase tracking-wider">Domain</p>
              <p ref={domainLblRef} className="text-xs font-semibold uppercase tracking-widest text-gray-300 mt-0.5">
                {officeBearers[0].domain}
              </p>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div className="text-center">
              <p className="text-xs text-gray-600 uppercase tracking-wider">Member</p>
              <p ref={memberNumRef} className="text-xs font-mono font-bold text-gray-300 mt-0.5">
                1 / {TOTAL}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-52 sm:w-72 h-px bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full rounded-full"
              style={{ width: '0%', background: 'linear-gradient(90deg,#9e373a,#2b5f83)', willChange: 'width' }}
            />
          </div>

          <p className="text-xs text-gray-600 flex items-center gap-1.5">
            <span className="inline-block w-3 h-4 border border-white/20 rounded-full relative">
              <span className="absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-white/30 rounded-full animate-bounce" />
            </span>
            Scroll to explore
          </p>
        </div>

        {/* Sidebar domain nav — desktop */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1.5 z-20 pointer-events-none">
          {domainDots.map(({ domain, identity, firstIdx }) => {
            const isActive = officeBearers[activeIdx]?.domain === domain;
            return (
              <div key={domain} className="flex items-center gap-2">
                <span
                  className="text-right transition-all duration-300"
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontSize: isActive ? '11px' : '10px',
                    color: isActive ? identity.accent : 'rgba(255,255,255,0.2)',
                    fontWeight: isActive ? 600 : 400,
                    maxWidth: isActive ? 130 : 0,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  {domain}
                </span>
                <div
                  className="rounded-full flex-shrink-0 transition-all duration-300"
                  style={{
                    width:  isActive ? 8 : 3,
                    height: isActive ? 8 : 3,
                    background: isActive ? identity.accent : 'rgba(255,255,255,0.2)',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Mobile domain indicator */}
        <div className="absolute top-5 right-4 lg:hidden z-20 text-right pointer-events-none">
          <p className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: DOMAIN_IDENTITY[officeBearers[activeIdx]?.domain]?.accent ?? '#9e373a' }}>
            {officeBearers[activeIdx]?.domain}
          </p>
          <p className="text-xs text-gray-600 font-mono">
            {String(activeIdx + 1).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}
