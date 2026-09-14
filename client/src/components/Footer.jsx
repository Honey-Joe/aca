import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { label: 'Instagram', href: '#', icon: '📸' },
  { label: 'LinkedIn', href: '#', icon: '💼' },
  { label: 'GitHub', href: '#', icon: '🐙' },
  { label: 'YouTube', href: '#', icon: '▶️' },
];

const navLinks = ['Home', 'About', 'Bearers', 'Events'];

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: footerRef.current, start: 'top 95%' } }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="contact" ref={footerRef} className="relative pt-16 pb-8 px-4 border-t border-white/10">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #9e373a, #2b5f83, transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #9e373a, #2b5f83)' }}>
                ACA
              </div>
              <span className="font-bold text-white text-lg" style={{ fontFamily: 'Space Grotesk' }}>
                Association of Computer Application
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering students through technology, innovation, and collaboration since 2014.
              Department of Computer Application.
            </p>
            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {socials.map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-base hover:border-white/30 transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link === 'Bearers' ? 'bearers' : link.toLowerCase())}
                    className="text-slate-400 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full transition-all duration-200 group-hover:w-3"
                      style={{ backgroundColor: '#9e373a' }} />
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>Department of Computer Application,<br />College Campus, Kerala, India</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href="mailto:aca@college.edu" className="hover:text-white transition-colors">aca@college.edu</a>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Association of Computer Application. All rights reserved.</p>
          <p>
            Built with ❤️ by{' '}
            <span className="bg-clip-text text-transparent font-semibold"
              style={{ backgroundImage: 'linear-gradient(90deg, #9e373a, #2b5f83)' }}>
              ACA Tech Team
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
