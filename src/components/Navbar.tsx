import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartHandshake, ShieldCheck, UserCheck, HelpCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { setActiveModal, openDonateModal, userDonations, pendingRequests } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-black text-emerald-400 flex items-center justify-center font-bold text-base shadow-sm">
            S
          </div>
          <a href="#" className="text-xl font-editorial font-bold tracking-tight text-black hover:text-emerald-700 transition-colors">
            Sahayata
          </a>
        </div>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-700">
          <a href="#urgent-cases" className="hover:text-black hover:text-emerald-700 transition-colors">
            Urgent Crises
          </a>
          <a href="#all-campaigns" className="hover:text-black hover:text-emerald-700 transition-colors">
            Verified Cases
          </a>
          <button
            onClick={() => setActiveModal('where_donations_go')}
            className="hover:text-black hover:text-emerald-700 transition-colors text-left"
          >
            Where Money Goes
          </button>
          <a href="#success-outcomes" className="hover:text-black hover:text-emerald-700 transition-colors">
            Outcomes & Impact
          </a>
          <button
            onClick={() => setActiveModal('my_impact')}
            className="relative hover:text-black hover:text-emerald-700 transition-colors flex items-center gap-1.5"
          >
            <span>My Impact</span>
            {userDonations.length > 0 && (
              <span className="font-data text-xs bg-emerald-100 text-emerald-900 font-bold rounded px-1.5 py-0.2">
                {userDonations.length}
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveModal('admin')}
            className="hidden lg:flex items-center gap-1 text-xs text-zinc-600 hover:text-black px-2 py-1.5 rounded transition-colors"
            title="Coordinator & Verification Portal"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Verification Desk</span>
            {pendingRequests.filter(r => r.status === 'pending_verification').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-0.5 animate-pulse"></span>
            )}
          </button>

          <button
            onClick={() => setActiveModal('request_help')}
            className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-black bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg transition-colors whitespace-nowrap min-h-[40px] flex items-center justify-center"
          >
            I Need Help
          </button>

          <button
            onClick={() => openDonateModal(null)}
            className="px-3.5 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm whitespace-nowrap min-h-[40px] flex items-center gap-1.5 justify-center"
          >
            <span>Help Someone</span>
          </button>
        </div>
      </div>
    </header>
  );
};
