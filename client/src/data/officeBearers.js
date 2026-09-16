// ============================================================
// ACA OFFICE BEARERS 2026-2027
// 33 Office Bearers — 13 domains
// ============================================================

export const DOMAIN_ORDER = [
  'Chair Person',
  'General Secretary',
  'Overall Coordinator',
  'Treasurer',
  'TechOps',
  'Design',
  'Alumni Relation',
  'HR and PR',
  'Logistics',
  'Reports',
  'Photography',
  'Hospitality',
  'Events',
];

export const DOMAIN_IDENTITY = {
  'Chair Person':        { accent: '#9e373a', glow: 'rgba(158,55,58,0.18)',  icon: '👑' },
  'General Secretary':   { accent: '#2b5f83', glow: 'rgba(43,95,131,0.18)',  icon: '📋' },
  'Overall Coordinator': { accent: '#6d4c9e', glow: 'rgba(109,76,158,0.18)', icon: '🎯' },
  'Treasurer':           { accent: '#2b7a5f', glow: 'rgba(43,122,95,0.18)',  icon: '💰' },
  'TechOps':             { accent: '#1a6b8a', glow: 'rgba(26,107,138,0.18)', icon: '⚙️' },
  'Design':              { accent: '#8a3a6b', glow: 'rgba(138,58,107,0.18)', icon: '🎨' },
  'Alumni Relation':     { accent: '#7a6020', glow: 'rgba(122,96,32,0.18)',  icon: '🤝' },
  'HR and PR':           { accent: '#2b5f83', glow: 'rgba(43,95,131,0.18)',  icon: '📣' },
  'Logistics':           { accent: '#4a6b2b', glow: 'rgba(74,107,43,0.18)',  icon: '📦' },
  'Reports':             { accent: '#6b2b2b', glow: 'rgba(107,43,43,0.18)',  icon: '📊' },
  'Photography':         { accent: '#2b4a7a', glow: 'rgba(43,74,122,0.18)',  icon: '📷' },
  'Hospitality':         { accent: '#7a3a2b', glow: 'rgba(122,58,43,0.18)',  icon: '🏨' },
  'Events':              { accent: '#9e373a', glow: 'rgba(158,55,58,0.18)',  icon: '🎉' },
};

// Image convention: /images/members/member-{id:02d}.jpg
// Place actual photos at public/images/members/member-01.jpg … member-33.jpg
export const officeBearers = [

  // 01. CHAIR PERSON — 2
  { id: 1,  domain: 'Chair Person',        position: 'Chair Person',        name: 'Mathan Michael Raj A',  registerNumber: '2025178050', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Mathan_Chairperson.jpg', description: 'Chair Person of the Association of Computer Applications, providing leadership and direction for the association.' },
  { id: 2,  domain: 'Chair Person',        position: 'Chair Person',        name: 'Veera Kala Subiksha D', registerNumber: '2025179034', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/SUBIKSHA_CHAIRPERSON_MCS(SS).jpeg', description: 'Chair Person of the Association of Computer Applications, supporting the association in achieving its goals and initiatives.' },

  // 02. GENERAL SECRETARY — 2
  { id: 3,  domain: 'General Secretary',   position: 'General Secretary',   name: 'Vishal R',              registerNumber: '2025178021', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Vishal%20-%20General%20Secretary%20-%20M.C.A(R).jpg', description: 'General Secretary responsible for coordinating association activities and maintaining effective communication.' },
  { id: 4,  domain: 'General Secretary',   position: 'General Secretary',   name: 'Mohamed Haroon L',      registerNumber: '2025179013', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Mohamed_Haroon_General_Secretary.jpg', description: 'General Secretary supporting the administration, coordination, and communication of ACA activities.' },

  // 03. OVERALL COORDINATOR — 2
  { id: 5,  domain: 'Overall Coordinator', position: 'Overall Coordinator', name: 'Umamaheswaran S',       registerNumber: '2025178046', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Mahesh_OverallCoordinator.jpeg', description: 'Overall Coordinator responsible for coordinating initiatives and ensuring collaboration across the association.' },
  { id: 6,  domain: 'Overall Coordinator', position: 'Overall Coordinator', name: 'Senthilkumar D',        registerNumber: '2025179044', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/Senthilkumar_overall%20co-ordinator.png', description: 'Overall Coordinator supporting the planning, execution, and coordination of ACA activities.' },

  // 04. TREASURER — 2
  { id: 7,  domain: 'Treasurer',           position: 'Treasurer',           name: 'Sowthamini G',          registerNumber: '2025179057', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Sowthamini_Treasurer_MCASS.jpg', description: 'Treasurer supporting the financial administration and responsible management of ACA activities.' },
  { id: 8,  domain: 'Treasurer',           position: 'Treasurer',           name: 'Anbu Selvan P',         registerNumber: '2025178035', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Anbu%20selvan_TREASURER.jpg', description: 'Treasurer supporting financial coordination and resource management for the association.' },

  // 05. TECHOPS — 3
  { id: 9,  domain: 'TechOps',             position: 'TechOps',             name: 'Danush A',              registerNumber: '2025179048', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Danush_TechOps_SS.jpeg', description: 'TechOps member contributing to the technical operations and digital initiatives of ACA.' },
  { id: 10, domain: 'TechOps',             position: 'TechOps',             name: 'Honey Joe A',           registerNumber: '2025179019', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/1000168365.png', description: 'TechOps member supporting the technical infrastructure and digital activities of the association.' },
  { id: 11, domain: 'TechOps',             position: 'TechOps',             name: 'Sivagowtham B',         registerNumber: '2025178041', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Gowtham_TechOps.jpg', description: 'TechOps member contributing to the technical activities and technology-driven initiatives of ACA.' },

  // 06. DESIGN — 3
  { id: 12, domain: 'Design',              position: 'Design',              name: 'Leander Bertie',      registerNumber: '2025179018', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/leander%20bertie(design).jpg', description: 'Design team member contributing to the creative and visual communication initiatives of ACA.' },
  { id: 13, domain: 'Design',              position: 'Design',              name: 'Mohamed Mufid K T',     registerNumber: '2025179020', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/WhatsApp%20Image%202026-09-14%20at%2010.59.57%20PM%20(1).jpeg', description: 'Design team member supporting the creation of visual content and creative materials for ACA activities.' },
  { id: 14, domain: 'Design',              position: 'Design',              name: 'Saishree G',            registerNumber: '2025179011', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Saishree_Design.jpeg', description: "Design team member contributing to ACA's visual presentation and creative initiatives." },

  // 07. ALUMNI RELATION — 3
  // { id: 15, domain: 'Alumni Relation',     position: 'Alumni Relation',     name: 'Meena P',               registerNumber: '2025179029', className: 'MCA (SS)', image: '/images/members/member-15.jpg', description: 'Alumni Relation team member supporting communication and engagement between ACA and its alumni.' },
  { id: 16, domain: 'Alumni Relation',     position: 'Alumni Relation',     name: 'Kiruthika C',           registerNumber: '2025179039', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Kiruthika_alumni%20relations.jpg', description: 'Alumni Relation team member contributing to alumni engagement and association initiatives.' },
  { id: 17, domain: 'Alumni Relation',     position: 'Alumni Relation',     name: 'Shakthi Shwetha J',     registerNumber: '2025179030', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/WhatsApp%20Image%202026-09-15%20at%209.59.47%20PM.jpeg', description: 'Alumni Relation team member supporting interaction and coordination with the ACA alumni community.' },

  // 08. HR AND PR — 3
  { id: 18, domain: 'HR and PR',           position: 'HR and PR',           name: 'Dharshini B S',         registerNumber: '2025178031', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Dharshini_Hr%20&%20Pr_MCA(Reg).png', description: 'HR and PR team member supporting people coordination, communication, and public relations activities.' },
  { id: 19, domain: 'HR and PR',           position: 'HR and PR',           name: 'Raghunandhan K',        registerNumber: '2025178051', className: 'MCA (R)',  image: '/images/members/member-19.jpg', description: 'HR and PR team member contributing to communication, coordination, and outreach activities.' },
  { id: 20, domain: 'HR and PR',           position: 'HR and PR',           name: 'Logesh Waran R',        registerNumber: '2025178043', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Gemini_Generated_Image_54n9sc54n9sc54n9.png', description: 'HR and PR team member supporting internal coordination and external communication initiatives.' },
  { id: 21, domain: 'HR and PR',           position: 'HR and PR',           name: 'Amit',                  registerNumber: '2025178016', className: 'MCA (R)',  image: '/images/members/member-21.jpg', description: 'Logistics team member supporting the operational requirements of ACA activities.' },

  // 09. LOGISTICS — 3
  { id: 22, domain: 'Logistics',           position: 'Logistics',           name: 'Vianjey Bonosa A',      registerNumber: '2025178014', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Vianjey_Bonosa_Logistics_Regular.jpg', description: 'Logistics team member contributing to resource coordination and event operations.' },
  { id: 23, domain: 'Logistics',           position: 'Logistics',           name: 'Sabharish G J',           registerNumber: '2025179049', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/PDF_20260915_230905_074_page-0001.jpg.jpeg', description: 'Logistics team member supporting the smooth operational execution of ACA activities.' },

  // 10. REPORTS — 1
  { id: 24, domain: 'Reports',             position: 'Reports',             name: 'Catherine Esther W',    registerNumber: '2025179025', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Gemini_Generated_Image_i2qrm7i2qrm7i2qr_4AH6jKwPS.png', description: 'Reports team member responsible for documenting ACA activities and maintaining official records.' },

  // 11. PHOTOGRAPHY — 2
  { id: 25, domain: 'Photography',         position: 'Photography',         name: 'Srisuganandan K',       registerNumber: '2025178002', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Suga_Photography_MCARegular.jpg', description: 'Photography team member documenting ACA activities and preserving important moments through visual storytelling.' },
  { id: 26, domain: 'Photography',         position: 'Photography',         name: 'Syed Bahudadeer',       registerNumber: '2025179058', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/SyedBahudadeer_Photographer_MCA(SS).jpg', description: 'Photography team member capturing and documenting ACA activities and events.' },

  // 12. HOSPITALITY — 2
  { id: 27, domain: 'Hospitality',         position: 'Hospitality',         name: 'Madhura VM',            registerNumber: '2025178010', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Madhura_Hospitality_Regular.jpg', description: 'Hospitality team member supporting guest and participant arrangements during ACA activities.' },
  { id: 28, domain: 'Hospitality',         position: 'Hospitality',         name: 'Vaishnavi J',           registerNumber: '2025179036', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/Vaishnavi_Hospitality_MCASS.jpg', description: 'Hospitality team member contributing to a welcoming and organized experience for guests and participants.' },

  // 13. EVENTS — 5
  // { id: 29, domain: 'Events',              position: 'Events',              name: 'Shridharan M R',        registerNumber: '2025179042', className: 'MCA (SS)', image: '/images/members/member-29.jpg', description: 'Events team member contributing to the planning and execution of ACA events and programs.' },
  { id: 30, domain: 'Events',              position: 'Events',              name: 'Jayasurya V',           registerNumber: '2025179024', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/jayasurya%20v.jpg', description: 'Events team member supporting event organization and coordination.' },
  { id: 31, domain: 'Events',              position: 'Events',              name: 'Nivetha M',             registerNumber: '2025179046', className: 'MCA (SS)', image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/NIVETHA_M_EVENTS_MCA(SS).jpeg', description: 'Events team member contributing to successful planning and execution of ACA programs.' },
  { id: 32, domain: 'Events',              position: 'Events',              name: 'Sri Akshaya S',         registerNumber: '2025178032', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/SRI%20AKSHAYA_EVENTS_MCA%20REGULAR.jpg', description: 'Events team member supporting event coordination and participant engagement.' },
  { id: 33, domain: 'Events',              position: 'Events',              name: 'Amitha B',              registerNumber: '2025178003', className: 'MCA (R)',  image: 'https://ik.imagekit.io/HoneyJoe/drive-download-20260914T095007Z-1-001/AMITHA_EVENTS_MCA(REGULAR).jpg', description: 'Events team member contributing to the organization and smooth execution of ACA events.' },
];

export function getGroupedDomains() {
  return DOMAIN_ORDER.map((domain, idx) => ({
    domain,
    domainIndex: idx,
    identity: DOMAIN_IDENTITY[domain],
    members: officeBearers.filter((m) => m.domain === domain),
  }));
}
