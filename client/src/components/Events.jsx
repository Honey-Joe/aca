import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    title: 'TechFest 2024',
    date: 'March 15, 2024',
    category: 'Technical',
    desc: 'Annual technical festival featuring hackathons, coding contests, and project exhibitions.',
    color: '#9e373a',
    icon: '💻',
    size: 'large',
  },
  {
    title: 'Code Sprint',
    date: 'January 20, 2024',
    category: 'Competition',
    desc: '24-hour competitive programming marathon for all skill levels.',
    color: '#2b5f83',
    icon: '⚡',
    size: 'small',
  },
  {
    title: 'Web Dev Workshop',
    date: 'February 10, 2024',
    category: 'Workshop',
    desc: 'Hands-on workshop covering modern web development with React and Node.js.',
    color: '#2b5f83',
    icon: '🌐',
    size: 'small',
  },
  {
    title: 'Cultural Night',
    date: 'December 5, 2023',
    category: 'Cultural',
    desc: 'A vibrant evening of music, dance, and drama celebrating student talent.',
    color: '#9e373a',
    icon: '🎭',
    size: 'large',
  },
  {
    title: 'AI/ML Seminar',
    date: 'November 18, 2023',
    category: 'Seminar',
    desc: 'Expert-led seminar on Artificial Intelligence and Machine Learning trends.',
    color: '#9e373a',
    icon: '🤖',
    size: 'small',
  },
  {
    title: 'Sports Meet',
    date: 'October 8, 2023',
    category: 'Sports',
    desc: 'Inter-department sports competition fostering teamwork and healthy competition.',
    color: '#2b5f83',
    icon: '🏅',
    size: 'small',
  },
];

export default function Events() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
      );

      const cards = gridRef.current.querySelectorAll('.event-card');
      cards.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
            delay: (i % 3) * 0.1,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="events" ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #9e373a, #2b5f83, transparent)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest mb-3 block" style={{ color: '#9e373a' }}>
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Space Grotesk' }}>
            Our <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #9e373a, #2b5f83)' }}>Events</span>
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full"
            style={{ background: 'linear-gradient(90deg, #9e373a, #2b5f83)' }} />
        </div>

        {/* Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {events.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    gsap.to(cardRef.current, { rotateX: y, rotateY: x, duration: 0.3, ease: 'power2.out', transformPerspective: 800 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div
      ref={cardRef}
      className={`event-card rounded-2xl border border-white/10 overflow-hidden group cursor-pointer transition-all duration-300 hover:border-white/25 hover:shadow-xl ${
        event.size === 'large' ? 'sm:row-span-1' : ''
      }`}
      style={{ background: 'rgba(255,255,255,0.03)', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Color banner */}
      <div className="h-36 relative flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${event.color}33, ${event.color}66)` }}>
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        <span className="text-5xl relative z-10">{event.icon}</span>
        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${event.color}40, transparent 70%)` }} />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${event.color}22`, color: event.color === '#9e373a' ? '#e8a0a2' : '#7ab3d4' }}>
            {event.category}
          </span>
          <span className="text-xs text-slate-500">{event.date}</span>
        </div>
        <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Space Grotesk' }}>
          {event.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed">{event.desc}</p>
      </div>
    </div>
  );
}
