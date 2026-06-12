import { navItems, type ScreenId } from '../../app/navigation';

export function BottomNav({ active, onChange }: { active: ScreenId; onChange: (screen: ScreenId) => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] border-t border-white/10 bg-[#070713]/95 px-1.5 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2 shadow-[0_-18px_45px_rgba(0,0,0,.45)] backdrop-blur-xl min-[390px]:px-2">
      <div className="grid grid-cols-7 gap-1">
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={`flex min-h-12 min-w-0 flex-col items-center justify-center rounded-2xl px-0.5 text-[9px] transition active:scale-[.98] min-[390px]:text-[10px] ${
                isActive ? 'bg-violet-500/25 text-cyan-100' : 'text-violet-100/55'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon size={17} aria-hidden="true" />
              <span className="mt-0.5 w-full truncate text-center leading-none">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
