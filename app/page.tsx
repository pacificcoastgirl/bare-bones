// app/page.tsx
import Link from 'next/link';
// Import the specific typed SVG layout components out of the Heroicons library
import { 
  ShoppingCartIcon, 
  FaceFrownIcon,
  FaceSmileIcon,
  HomeModernIcon,
  AcademicCapIcon 
} from '@heroicons/react/24/outline';

interface DashboardApp {
  id: string;
  title: string;
  description: string;
  tags: ('Utility' | 'Game' | 'Education')[];
  colorClass: string;     // The main background color
  accentClass: string;    // Used for text and icon highlights
  glowClass: string;      // The behind-the-card blurred visual gradient glow
  isDarkCard: boolean;
  // This TypeScript property expects a React component (the SVG icon) passed as data
  Icon: React.ComponentType<React.ComponentProps<'svg'>>;
}

const dashboardApps: DashboardApp[] = [
  { 
    id: 'shopping-list', 
    title: 'Shopping List', 
    description: 'Keep track of stuff we need in one place.',
    tags: ['Utility'],
    colorClass: 'bg-slate-900 border-slate-800/80', 
    accentClass: 'text-teal-400 bg-teal-500/10',
    glowClass: 'from-teal-500/10 to-transparent',
    isDarkCard: true,
    Icon: HomeModernIcon
  },
  { 
    id: 'chore-tracker', 
    title: 'Chore Matrix', 
    description: 'Make sure stuff gets done.',
    tags: ['Utility'],
    colorClass: 'bg-slate-900 border-slate-800/80', 
    accentClass: 'text-blue-400 bg-blue-500/10',
    glowClass: 'from-blue-500/10 to-transparent',
    isDarkCard: true,
    Icon: FaceFrownIcon
  },
  { 
    id: 'math-blaster', 
    title: 'Math Blaster', 
    description: 'Learning can be fun! Right?',
    tags: ['Education', 'Game'],
    colorClass: 'bg-slate-900 border-slate-800/80', 
    accentClass: 'text-purple-400 bg-purple-500/10',
    glowClass: 'from-purple-500/10 to-transparent',
    isDarkCard: true,
    Icon: AcademicCapIcon
  },
  { 
    id: 'capsule', 
    title: 'Capsule', 
    description: 'The world in 60 seconds.',
    tags: ['Education', 'Game'],
    colorClass: 'bg-slate-900 border-slate-800/80', 
    accentClass: 'text-purple-400 bg-purple-500/10',
    glowClass: 'from-purple-500/10 to-transparent',
    isDarkCard: true,
    Icon: AcademicCapIcon
  },
  { 
    id: 'space-shooter', 
    title: 'Space Shooter', 
    description: 'Blast asteroids and break your high score.',
    tags: ['Game'],
    colorClass: 'bg-yellow-400 border-yellow-300', 
    accentClass: 'text-slate-900 bg-slate-900/10',
    glowClass: 'from-yellow-400/20 to-transparent',
    isDarkCard: false,
    Icon: FaceSmileIcon
  },
];

export default function DashboardHome() {
  // We can filter our array layout dynamically into separate layout category segments
  const utilities = dashboardApps.filter(app => app.tags.includes('Utility'));
  const fun = dashboardApps.filter(app => app.tags.includes('Game') && !app.tags.includes('Education'));
  const education = dashboardApps.filter(app => app.tags.includes('Education'));

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-12 flex justify-center relative overflow-hidden">
  
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Flex grid container */}
      <div className="w-full max-w-6xl flex flex-col items-stretch relative z-10">

        {/* Title area */}
        <header className="mb-12 text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
            Headquarters of the House of Bootleg
          </h1>
          <p className="text-gray-400 mt-2">Choose an activity below!</p>
        </header>

        {/* SECTION 1: PARENT UTILITIES */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Taxes and things
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {utilities.map(app => renderCard(app))}
          </div>
        </section>

        {/* SECTION 2: SCHOOL & EDUCATION APPS */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Erm ackshually
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map(app => renderCard(app))}
          </div>
        </section>

        {/* SECTION 3: KIDS ARCADE PORTAL */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Fun stuff that doesn't (totally) suck
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fun.map(app => renderCard(app))}
          </div>
        </section>

      </div>

    </main>
  );
}

// Reusable Local Template Logic Rendering Element Function
function renderCard(app: DashboardApp) {
  const textColorClass = app.isDarkCard ? 'text-white' : 'text-slate-900';
  const descColorClass = app.isDarkCard ? 'text-slate-400' : 'text-slate-800/80';
  const destinationUrl = app.id === 'shopping-list' ? '/shopping-list' : `/app-viewer/${app.id}`;
  
  // Destructure the icon alias reference variable out of our object mapping loop
  const { Icon } = app;

  return (
    <Link key={app.id} href={destinationUrl} className="group block relative">
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${app.glowClass} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none`} />
      
      {/* 1. Controlled the height by changing min-h-[160px] to a tight min-h-[120px] */}
      <div className={`relative p-5 rounded-2xl border ${app.colorClass} shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 flex flex-col justify-between min-h-[120px] h-full`}>
        <div className="flex gap-4 items-start">
          
          {/* Visual Icon Badge */}
          <div className={`p-3 rounded-xl ${app.accentClass} shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          
          {/* Text Flow Container */}
          <div className="flex flex-col min-w-0"> {/* min-w-0 forces flex layout calculation limits */}
            <h3 className={`text-xl font-bold tracking-tight truncate ${textColorClass}`}>
              {app.title}
            </h3>
            <p className={`text-sm mt-1 leading-relaxed line-clamp-2 ${descColorClass}`}>
              {app.description}
            </p>
            
            {/* 2. TAG BAR: Relocated below text so it never compresses your card content horizontally */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {app.tags.map(tag => {
                // Dynamic styling logic for tags inside the loop body
                const tagStyle = app.isDarkCard 
                  ? 'bg-white/5 border-white/10 text-slate-300' 
                  : 'bg-slate-900/5 border-slate-900/10 text-slate-700';
                
                return (
                  <span key={tag} className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${tagStyle}`}>
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Subtle hover launch arrow */}
        <span className={`text-xs font-bold uppercase mt-2 self-end flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100 ${
          app.isDarkCard ? 'text-indigo-400' : 'text-slate-900'
        }`}>
          Go ➔
        </span>
      </div>
    </Link>
  );
}
