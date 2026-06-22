import { navItems, type ScreenId } from '../../app/navigation';

export function BottomNav({ active, onChange }: { active: ScreenId; onChange: (screen: ScreenId) => void }) {
  return (
    <nav
      aria-label="Main navigation"
      className="veyra-bottom-nav fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] px-1.5 pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2 sm:px-2"
    >
      <div className="grid grid-cols-7 gap-1">
        {navItems.map((item) => {
          const isActive = active === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              data-active={isActive}
              className="veyra-nav-button"
            >
              <item.icon size={18} className="shrink-0" aria-hidden="true" />
              <span className="w-full truncate text-center leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
