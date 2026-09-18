import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const links = ['Home', 'About', 'Bearers', 'Events', 'Contact'];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    if (open) {
      gsap.fromTo(mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(mobileMenuRef.current, { height: 0, opacity: 0, duration: 0.2 });
    }
  }, [open]);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0f0f14]/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('home')}>
            <div
              className="w-[100px] h-9 rounded-lg flex items-center justify-center text-white font-bold text-xs"
              // style={{ background: 'linear-gradient(135deg, #9e373a, #2b5f83)' }}
            >
              <img src={'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/8486f397-f186-42b7-89aa-1b83a85af28c-removebg-preview.png?updatedAt=1789396686083'} alt="" />
            </div>
            {/* <span className="font-semibold text-white hidden sm:block text-sm" style={{ fontFamily: 'Space Grotesk' }}>
              Assoc. of Computer Application
            </span> */}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link === 'Bearers' ? 'bearers' : link.toLowerCase())}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg transition-all duration-200"
                style={{ '--hover-bg': 'rgba(158,55,58,0.15)' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(158,55,58,0.15)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="md:hidden overflow-hidden h-0 opacity-0 bg-[#0f0f14]/95 backdrop-blur-md border-t border-white/10">
        <div className="px-4 py-3 flex flex-col gap-1">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link === 'Bearers' ? 'bearers' : link.toLowerCase())}
              className="text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg transition-all"
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(158,55,58,0.15)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
