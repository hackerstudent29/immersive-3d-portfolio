export type Project = {
  id: string;
  name: string;
  monogram: string;
  category: string;
  description: string;
  technologies: string[];
  features: string[];
  github: string;
  demo: string;
  accent: string;
};

export const projects: Project[] = [
  {
    id: 'listen-zenify',
    name: 'Listen Zenify',
    monogram: 'LZ',
    description: 'A full-stack music streaming platform for web and mobile combining AI-powered features, advanced audio processing, and creator-focused tools for an immersive experience.',
    category: 'Audio / Streaming',
    technologies: ['Next.js', 'Fastify', 'PostgreSQL', 'Flutter', 'Web Audio API'],
    features: ['High-performance audio engine', 'Gapless playback', 'Creator Studio analytics', 'Dynamic UI personalization'],
    github: 'https://github.com/hackerstudent29/Zenify',
    demo: 'https://listenzenify.vercel.app/',
    accent: '#a295c2'
  },
  {
    id: 'lorin-rag',
    name: 'Lorin AI',
    monogram: 'LO',
    description: 'A retrieval-augmented (RAG) assistant built for MSAJCE. Ingests the entire public knowledge surface and returns precise, source-grounded answers at a fraction of the cost of a naive LLM approach.',
    category: 'AI / Analytics',
    technologies: ['Python', 'FastAPI', 'Pinecone', 'Gemini 2.0 Flash', 'Anthropic', 'Next.js'],
    features: ['Hybrid semantic + BM25 retrieval', 'Sub-5K tokens per query', 'Weekly analytics digest', 'Cross-encoder re-ranking'],
    github: 'https://github.com/hackerstudent29/MSAJCE-LORIN',
    demo: 'https://lorin-ai.vercel.app/',
    accent: '#d8aa70'
  },
  {
    id: 'zendrum-booking',
    name: 'ZenDrum Booking',
    monogram: 'ZB',
    description: 'A full-stack microservices-based event management and ticket booking platform delivering secure event registration, real-time seat booking, and digital ticketing.',
    category: 'Enterprise / Booking',
    technologies: ['React', 'Java Spring Boot', 'PostgreSQL', 'Socket.IO', 'React Three Fiber'],
    features: ['Real-time seat reservation', 'Interactive 3D venue map', 'Dedicated payment microservice', 'QR ticket generation'],
    github: 'https://github.com/hackerstudent29/Event-Management-System-main',
    demo: 'https://zendrumbooking.vercel.app/',
    accent: '#83a891'
  },
  {
    id: 'ram-remix-hub',
    name: 'Ram Remix Hub',
    monogram: 'RH',
    description: 'A modern full-stack web platform featuring an interactive 3D experience, secure authentication, cloud media management, and a highly animated user interface.',
    category: 'Media / 3D',
    technologies: ['Next.js', 'TypeScript', 'Three.js', 'Spline', 'PostgreSQL'],
    features: ['Interactive 3D interface', 'Cloud-based media upload', 'Secure NextAuth authentication', 'Type-safe component architecture'],
    github: 'https://github.com/RAMZENDRUM/Ram-Remix-Hub',
    demo: 'https://ram-remix-hub.vercel.app/',
    accent: '#c9918b'
  },
  {
    id: 'zenturf',
    name: 'ZenTurf',
    monogram: 'ZT',
    description: 'A modern full-stack sports venue booking platform enabling users to discover, explore, and reserve sports turfs through an interactive map-based experience.',
    category: 'Maps / Edge',
    technologies: ['TanStack Start', 'shadcn/ui', 'Supabase', 'PL/pgSQL', 'Cloudflare Workers'],
    features: ['Leaflet map-based discovery', 'Edge deployment', 'Database-level booking logic', 'Responsive modern UI'],
    github: 'https://github.com/RAMZENDRUM/zenturf',
    demo: 'https://zenturf.vercel.app/',
    accent: '#7eb69c'
  },
  {
    id: 'smart-hostel',
    name: 'Smart Hostel',
    monogram: 'SH',
    description: 'A full-stack hostel management platform that streamlines maintenance requests through a secure, role-based system for students, technicians, and wardens.',
    category: 'Admin / Security',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    features: ['Role-based dashboards', 'Maintenance complaint tracking', 'Row Level Security enforced', 'Analytics dashboard with charts'],
    github: 'https://github.com/RAMZENDRUM/smart-hostel',
    demo: 'https://smart-hostel-mocha.vercel.app/',
    accent: '#cfb59b'
  }
];