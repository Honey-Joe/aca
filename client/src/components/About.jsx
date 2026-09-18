import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '200+', label: 'Active Members' },
  { value: '10+', label: 'Years of Excellence' },
  { value: '50+', label: 'Events Conducted' },
  { value: '33', label: 'Office Bearers' },
];

const pillars = [
  { title: 'Innovation', desc: 'Fostering creative thinking and cutting-edge tech solutions.', icon: '⚡' },
  { title: 'Collaboration', desc: 'Building a strong network of like-minded tech enthusiasts.', icon: '🤝' },
  { title: 'Excellence', desc: 'Striving for the highest standards in academics and projects.', icon: '🏆' },
];

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: textRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' } }
      );
      gsap.fromTo(pillarsRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: pillarsRef.current, start: 'top 85%' } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #9e373a, #2b5f83, transparent)' }} />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: '#9e373a' }}>
            Who We Are
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            About <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, #9e373a, #2b5f83)' }}>ACA</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(90deg, #9e373a, #2b5f83)' }} />
        </div>

        {/* Text block */}
        <div ref={textRef} className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-slate-300 text-lg leading-relaxed mb-4">
            The <strong className="text-white">Association of Computer Application (ACA)</strong> is the premier student body
            of the Department of Computer Application, dedicated to bridging the gap between academic learning and
            real-world technology.
          </p>
          <p className="text-slate-400 leading-relaxed">
            Our mission is to cultivate a vibrant community where students explore, innovate, and grow together —
            through workshops, hackathons, seminars, and cultural events that shape well-rounded tech professionals.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map(({ value, label }) => (
            <div key={label} className="rounded-2xl border border-white/10 p-6 text-center"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #9e373a, #2b5f83)' }}>
                {value}
              </div>
              <div className="text-slate-400 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Pillars */}
        <div ref={pillarsRef} className="grid sm:grid-cols-3 gap-6">
          {pillars.map(({ title, desc, icon }) => (
            <div key={title} className="rounded-2xl border border-white/10 p-6 group hover:border-white/20 transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.03)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: 'linear-gradient(135deg, rgba(158,55,58,0.2), rgba(43,95,131,0.2))' }}>
                {icon}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>{title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
