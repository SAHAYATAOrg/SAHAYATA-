import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, AlertCircle, PlusCircle, UserCheck, ShieldCheck } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { setActiveModal, openDonateModal, userDonations, pendingRequests } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-50/95 backdrop-blur-md border-t border-stone-200 px-2 py-1 shadow-lg">
      <div className="grid grid-cols-5 items-center h-14">
        {/* Destination 1: Feed / Explore */}
        <a
          href="#all-campaigns"
          className="flex flex-col items-center justify-center min-h-[44px] text-stone-600 hover:text-stone-900 transition-colors"
        >
          <HeartHandshake className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Explore</span>
        </a>

        {/* Destination 2: Urgent */}
        <a
          href="#urgent-cases"
          className="flex flex-col items-center justify-center min-h-[44px] text-rose-600 hover:text-rose-700 transition-colors"
        >
          <AlertCircle className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold tracking-tight mt-0.5">Urgent</span>
        </a>

        {/* Destination 3: Need Help (Primary Center Button) */}
        <button
          onClick={() => setActiveModal('request_help')}
          className="flex flex-col items-center justify-center min-h-[44px] text-stone-900 hover:text-amber-700 transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center">
            <PlusCircle className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Need Help</span>
        </button>

        {/* Destination 4: My Impact */}
        <button
          onClick={() => setActiveModal('my_impact')}
          className="relative flex flex-col items-center justify-center min-h-[44px] text-stone-600 hover:text-stone-900 transition-colors"
        >
          <UserCheck className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Impact</span>
          {userDonations.length > 0 && (
            <span className="absolute top-1 right-3 w-4 h-4 rounded-full bg-stone-900 text-[9px] text-white flex items-center justify-center font-data">
              {userDonations.length}
            </span>
          )}
        </button>

        {/* Destination 5: Verification Admin Desk */}
        <button
          onClick={() => setActiveModal('admin')}
          className="relative flex flex-col items-center justify-center min-h-[44px] text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
          <span className="text-[10px] font-medium tracking-tight mt-0.5">Verify</span>
          {pendingRequests.filter(r => r.status === 'pending_verification').length > 0 && (
            <span className="absolute top-1 right-3 w-2 h-2 rounded-full bg-amber-500"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
