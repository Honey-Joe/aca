import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const badgeRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  useEffect(() => {
    gsap.to(orb1Ref.current, { x: 30, y: -20, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2Ref.current, { x: -20, y: 30, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1 });

    const tl = gsap.timeline({ delay: 0.5 });
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(titleRef.current.children,
      { opacity: 0, y: 60, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 0.9, stagger: 0.15, ease: 'power4.out' },
      '-=0.2'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(ctaRef.current.children,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.3'
    );
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0f0f14]" />

      {/* Orbs */}
      <div ref={orb1Ref} className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30"
        style={{ background: '#9e373a' }} />
      <div ref={orb2Ref} className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-25"
        style={{ background: '#2b5f83' }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm mb-8"
          style={{ borderColor: 'rgba(158,55,58,0.4)', backgroundColor: 'rgba(158,55,58,0.12)', color: '#e8a0a2' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#9e373a' }} />
          Academic Year 2025-26
        </div> */}

        <div ref={titleRef}>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
            <span className="block text-white">Association of</span>
            <span className="block bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #9e373a, #2b5f83, #9e373a)' }}>
              Computer Applications
            </span>
          </h1>
        </div>

        <p ref={subtitleRef} className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Empowering students through technology, innovation, and collaboration.
          Building the next generation of computer science professionals.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('about')}
            className="px-8 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ background: 'linear-gradient(135deg, #9e373a, #2b5f83)', boxShadow: '0 8px 24px rgba(158,55,58,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Discover More
          </button>
          <button
            onClick={() => scrollTo('events')}
            className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            View Events
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
