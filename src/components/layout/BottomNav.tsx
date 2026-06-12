import { navItems, type ScreenId } from '../../app/navigation';

export function BottomNav({ active, onChange }: { active: ScreenId; onChange: (screen: ScreenId) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] border-t border-white/10 bg-[#070713]/90 px-1.5 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2 backdrop-blur-xl sm:px-2">
      <div className="grid grid-cols-7 gap-1">
        {navItems.map((item) => {
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-12 min-w-0 flex-col items-center justify-center rounded-2xl px-1 text-[10px] transition ${
                isActive ? 'bg-violet-500/25 text-cyan-100' : 'text-violet-100/55'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <span className="w-full truncate text-center leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
