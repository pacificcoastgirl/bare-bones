// app/page.tsx
import { DashboardEngine } from '@/services/dashboard-engine';
import { AppCard } from '@/components/app-card';

export default function DashboardHome() {
  // Instantiate our pure logic engine service data layer
  const engine = new DashboardEngine();
  
  const utilities = engine.getAppsByTags(['Utility']);
  const entertainment = engine.getFunStuff();
  const education = engine.getAppsByTags(['Education']);

  return (
    <main className="min-h-screen bg-[#0b0f19] text-white p-6 md:p-12 flex justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="w-full max-w-6xl flex flex-col items-stretch relative z-10">
        
        <header className="mb-12 text-left">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Headquarters of the House of Bootleg
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Choose an activity below!</p>
        </header>

        {/* SECTION 1: PARENT UTILITIES */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" /> Taxes and things
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {utilities.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        </section>

        {/* SECTION 2: SCHOOL & EDUCATION APPS */}
        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Erm ackshually
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        </section>

        {/* SECTION 3: KIDS ARCADE PORTAL */}
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" /> Fun stuff that doesn't (totally) suck
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {entertainment.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
