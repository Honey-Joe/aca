import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { officeBearers, getGroupedDomains, DOMAIN_ORDER, DOMAIN_IDENTITY } from '../data/officeBearers';
import ProfileCard from './ProfileCard/ProfileCard';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_DOMAINS = DOMAIN_ORDER.length; // 13
const PX_PER_DOMAIN = 1500;               // vertical scroll px per domain beat

const DOMAIN_GLOW = {
  'Chair Person':        'rgba(158,55,58,0.72)',
  'General Secretary':   'rgba(43,95,131,0.72)',
  'Overall Coordinator': 'rgba(109,76,158,0.72)',
  'Treasurer':           'rgba(43,122,95,0.72)',
  'TechOps':             'rgba(26,107,138,0.72)',
  'Design':              'rgba(138,58,107,0.72)',
  'Alumni Relation':     'rgba(122,96,32,0.72)',
  'HR and PR':           'rgba(43,95,131,0.72)',
  'Logistics':           'rgba(74,107,43,0.72)',
  'Reports':             'rgba(107,43,43,0.72)',
  'Photography':         'rgba(43,74,122,0.72)',
  'Hospitality':         'rgba(122,58,43,0.72)',
  'Events':              'rgba(158,55,58,0.72)',
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
function ReducedMotionFallback({ domains }) {
  return (
    <section id="bearers" className="py-24 px-4" style={{ background: '#0d0d14' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest block mb-3" style={{ color: '#2b5f83' }}>Leadership</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Office <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,#9e373a,#2b5f83)' }}>Bearers</span>
          </h2>
        </div>
        {domains.map(({ domain, identity, members }, dIdx) => (
          <div key={domain} className="mb-16">
            <div className="flex items-center gap-3 mb-6 pb-3 border-b border-white/10">
              <span className="text-2xl">{identity.icon}</span>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'Space Grotesk', color: identity.accent }}>{domain}</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-5">
              {members.map((m, i) => {
                const gradient = AVATAR_GRADIENTS[(dIdx * 3 + i) % AVATAR_GRADIENTS.length];
                return (
                  <div key={m.id} style={{ width: CARD_W }}>
                    <ProfileCard
                      name={m.name} title={m.position} handle={m.registerNumber}
                      status={m.className} avatarUrl={m.image || makeInitialsAvatar(m.name, gradient)}
                      showUserInfo enableTilt enableMobileTilt={false}
                      behindGlowEnabled behindGlowColor='none'
                      innerGradient="none" iconUrl=""
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function OfficeBearers() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const domains = getGroupedDomains();
  if (prefersReducedMotion) return <ReducedMotionFallback domains={domains} />;
  return <CinematicBearers domains={domains} />;
}

// ─── Cinematic domain-based horizontal reveal ─────────────────────────────────
function CinematicBearers({ domains }) {
  const wrapperRef    = useRef(null);
  const stickyRef     = useRef(null);
  const bgGlowRef     = useRef(null);
  const titleElsRef   = useRef([]);  // domain title divs
  const rowElsRef     = useRef([]);  // card row strip divs
  const progressRef   = useRef(null);
  const domainNumRef  = useRef(null);
  const domainLblRef  = useRef(null);

  const [activeDomainIdx, setActiveDomainIdx] = useState(0);

  const totalScrollPx = TOTAL_DOMAINS * PX_PER_DOMAIN;

  useEffect(() => {
    const vw = window.innerWidth;
    const isMobile = vw < 640;
    const CARD_W   = isMobile ? Math.min(130, Math.floor(vw * 0.36)) : 200;
    const CARD_GAP = isMobile ? 16 : 32;

    const ctx = gsap.context(() => {
      // ── Initial states ──
      titleElsRef.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 30 });
      });
      rowElsRef.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, x: vw * 0.6 });
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

            const dIdx = Math.min(
              Math.floor(self.progress * TOTAL_DOMAINS),
              TOTAL_DOMAINS - 1
            );
            const identity = DOMAIN_IDENTITY[DOMAIN_ORDER[dIdx]];

            if (domainNumRef.current)
              domainNumRef.current.textContent =
                `${String(dIdx + 1).padStart(2, '0')} / ${String(TOTAL_DOMAINS).padStart(2, '0')}`;
            if (domainLblRef.current)
              domainLblRef.current.textContent = DOMAIN_ORDER[dIdx];

            if (bgGlowRef.current)
              bgGlowRef.current.style.background =
                `radial-gradient(ellipse 70% 55% at 50% 50%, ${identity.glow.replace('0.18', '0.2')}, transparent 70%)`;

            setActiveDomainIdx(dIdx);
          },
        },
      });

      let cursor = 0;

      domains.forEach(({ domain, identity, members }, dIdx) => {
        const titleEl     = titleElsRef.current[dIdx];
        const rowEl       = rowElsRef.current[dIdx];
        const nextTitleEl = titleElsRef.current[dIdx + 1];
        const nextRowEl   = rowElsRef.current[dIdx + 1];

        // 1. Title fades in
        tl.to(titleEl, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, cursor);

        cursor += 0.2; // brief title hold

        // 2. Title fades out, cards slide in from right simultaneously
        tl.to(titleEl, { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' }, cursor);
        tl.to(rowEl,   { opacity: 1, x: 0,   duration: 0.45, ease: 'power3.out' }, cursor + 0.1);

        cursor += 0.55; // cards visible — hold

        cursor += 0.6;  // hold window

        // 3. Cards slide out to the LEFT, next domain title comes in
        tl.to(rowEl, { opacity: 0, x: -vw * 0.6, duration: 0.35, ease: 'power2.in' }, cursor);

        if (nextTitleEl) {
          tl.to(nextTitleEl, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }, cursor + 0.2);
        }

        cursor += 0.4;
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

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
        <div ref={bgGlowRef} className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(158,55,58,0.2), transparent 70%)', transition: 'background 0.6s ease' }}
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

        {/* Domain title labels — stacked, GSAP controls */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {domains.map(({ domain, identity }, dIdx) => (
            <div
              key={domain}
              ref={el => (titleElsRef.current[dIdx] = el)}
              className="absolute flex flex-col items-center gap-3 text-center px-6"
              style={{ willChange: 'transform, opacity' }}
            >
              <span className="text-5xl">{identity.icon}</span>
              <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: identity.accent }}>
                {String(dIdx + 1).padStart(2, '0')} / {String(TOTAL_DOMAINS).padStart(2, '0')}
              </span>
              <h3 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>
                {domain}
              </h3>
              <div className="h-px w-20 rounded-full"
                style={{ background: `linear-gradient(90deg,transparent,${identity.accent},transparent)` }} />
              <p className="text-xs text-gray-500">{domains[dIdx].members.length} member{domains[dIdx].members.length > 1 ? 's' : ''}</p>
            </div>
          ))}
        </div>

        {/* Card rows — one per domain, GSAP drives x */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {domains.map(({ domain, members }, dIdx) => {
            const isMob    = window.innerWidth < 640;
            const cardW    = isMob ? Math.min(130, Math.floor(window.innerWidth * 0.36)) : 350;
            const cardGap  = isMob ? 16 : 32;
            const count    = members.length;
            const rowW     = count * cardW + (count - 1) * cardGap;
            const vwPad    = isMob ? 16 : 40;

            return (
              <div
                key={domain}
                ref={el => (rowElsRef.current[dIdx] = el)}
                className="absolute flex items-center"
                style={{
                  gap: cardGap,
                  width: rowW > window.innerWidth - vwPad ? `calc(100vw - ${vwPad}px)` : rowW,
                  maxWidth: `calc(100vw - ${vwPad}px)`,
                  flexWrap: 'wrap',
                  overflowX: rowW > window.innerWidth - vwPad ? 'auto' : 'visible',
                  justifyContent: 'center',
                  paddingBottom: rowW > window.innerWidth - vwPad ? 8 : 0,
                  willChange: 'transform, opacity',
                  pointerEvents: 'auto',
                }}
              >
                {members.map((member, mIdx) => {
                  const gradient = AVATAR_GRADIENTS[(dIdx * 3 + mIdx) % AVATAR_GRADIENTS.length];
                  const avatar   = member.image || makeInitialsAvatar(member.name, gradient);
                  return (
                    <div key={member.id} style={{ width: cardW, flexShrink: 0, pointerEvents: 'auto' }}>
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
                        behindGlowColor={DOMAIN_GLOW[domain]}
                        innerGradient="none"
                        iconUrl=""
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* HUD — bottom */}
        <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2.5 z-20 pointer-events-none">
          <div className="flex items-center gap-5">
            <div className="text-center">
              <p ref={domainNumRef} className="text-xs font-mono font-bold text-gray-500">01 / 13</p>
              <p ref={domainLblRef} className="text-xs font-semibold uppercase tracking-widest text-gray-300 mt-0.5">
                {DOMAIN_ORDER[0]}
              </p>
            </div>
          </div>

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

        {/* Sidebar domain nav */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1.5 z-20 pointer-events-none">
          {domains.map(({ domain, identity }, dIdx) => {
            const isActive = activeDomainIdx === dIdx;
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
                  className="rounded-full shrink-0 transition-all duration-300"
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
            style={{ color: DOMAIN_IDENTITY[DOMAIN_ORDER[activeDomainIdx]]?.accent ?? '#9e373a' }}>
            {DOMAIN_ORDER[activeDomainIdx]}
          </p>
          <p className="text-xs text-gray-600 font-mono">
            {String(activeDomainIdx + 1).padStart(2, '0')} / {String(TOTAL_DOMAINS).padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
}
