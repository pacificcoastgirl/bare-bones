// components/app-card.tsx
import Link from 'next/link';
import { DashboardApp, ColorPalette } from '@/config/apps';

interface CardDesignRules {
  colorClass: string;
  accentClass: string;
  glowClass: string;
  textColorClass: string;
  descColorClass: string;
  tagStyleClass: string;
  launchColorClass: string;
}

// 🏛️ THE CENTRAL THEME ENGINE MATRIX
// This maps our metadata keywords directly to explicit Tailwind instructions
const PALETTE_RULES: Record<ColorPalette, CardDesignRules> = {
  teal: {
    colorClass: 'bg-slate-900 border-slate-800/80',
    accentClass: 'text-teal-400 bg-teal-500/10',
    glowClass: 'from-teal-500/10 to-transparent',
    textColorClass: 'text-white',
    descColorClass: 'text-slate-400',
    tagStyleClass: 'bg-white/5 border-white/10 text-slate-300',
    launchColorClass: 'text-indigo-400'
  },
  blue: {
    colorClass: 'bg-slate-900 border-slate-800/80',
    accentClass: 'text-blue-400 bg-blue-500/10',
    glowClass: 'from-blue-500/10 to-transparent',
    textColorClass: 'text-white',
    descColorClass: 'text-slate-400',
    tagStyleClass: 'bg-white/5 border-white/10 text-slate-300',
    launchColorClass: 'text-indigo-400'
  },
  purple: {
    colorClass: 'bg-slate-900 border-slate-800/80',
    accentClass: 'text-purple-400 bg-purple-500/10',
    glowClass: 'from-purple-500/10 to-transparent',
    textColorClass: 'text-white',
    descColorClass: 'text-slate-400',
    tagStyleClass: 'bg-white/5 border-white/10 text-slate-300',
    launchColorClass: 'text-indigo-400'
  },
  yellow: {
    // 💡 Light cards calculate entirely different contrast logic automatically!
    colorClass: 'bg-yellow-400 border-yellow-300',
    accentClass: 'text-slate-900 bg-slate-900/10',
    glowClass: 'from-yellow-400/20 to-transparent',
    textColorClass: 'text-slate-900',
    descColorClass: 'text-slate-800/90',
    tagStyleClass: 'bg-slate-900/5 border-slate-900/10 text-slate-700',
    launchColorClass: 'text-slate-900'
  }
};

interface AppCardProps {
  app: DashboardApp;
}

export function AppCard({ app }: AppCardProps) {
  // Derive all styles dynamically by querying the rule factory matrix
  const styles = PALETTE_RULES[app.palette];
  
  const destinationUrl = app.launchType === 'native' 
  ? `/${app.id}` 
  : `/app-viewer/${app.id}`;

  const { Icon } = app;

  return (
    <Link href={destinationUrl} className="group block relative h-full">
      {/* Dynamic Glow Glow Background */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${styles.glowClass} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none`} />
      
      {/* Core Base Card Wrapper Container */}
      <div className={`relative p-5 rounded-2xl border ${styles.colorClass} shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 flex flex-col justify-between min-h-[140px] h-full`}>
        <div className="flex gap-4 items-start">
          
          <div className={`p-3 rounded-xl ${styles.accentClass} shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex flex-col min-w-0">
            <h3 className={`text-xl font-bold tracking-tight truncate ${styles.textColorClass}`}>{app.title}</h3>
            <p className={`text-sm mt-1 leading-relaxed line-clamp-2 ${styles.descColorClass}`}>{app.description}</p>
            
            {/* Dynamic Tag Display */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {app.tags.map(tag => (
                <span key={tag} className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${styles.tagStyleClass}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <span className={`text-xs font-bold uppercase mt-4 self-end flex items-center gap-1 transition-all opacity-0 group-hover:opacity-100 ${styles.launchColorClass}`}>
          Launch ➔
        </span>
      </div>
    </Link>
  );
}
