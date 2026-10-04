import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UrgentSection } from './components/UrgentSection';
import { CampaignCard } from './components/CampaignCard';
import { WhereDonationGoesLedger } from './components/WhereDonationGoesLedger';
import { SuccessStoriesSection } from './components/SuccessStoriesSection';
import { DonationModal } from './components/DonationModal';
import { CampaignDetailModal } from './components/CampaignDetailModal';
import { HelpRequestModal } from './components/HelpRequestModal';
import { DonorDashboardModal } from './components/DonorDashboardModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { CATEGORY_INFO } from './data/seedData';
import { 
  Search, 
  Filter, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  Utensils, 
  Home, 
  Stethoscope, 
  Pill, 
  Waves, 
  Flame, 
  Users, 
  LifeBuoy,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const CategoryIconMap: Record<string, React.ReactNode> = {
  all: <HeartHandshake className="w-4 h-4" />,
  medical: <Stethoscope className="w-4 h-4" />,
  food: <Utensils className="w-4 h-4" />,
  shelter: <Home className="w-4 h-4" />,
  disaster: <Waves className="w-4 h-4" />,
  medicines: <Pill className="w-4 h-4" />,
  fire: <Flame className="w-4 h-4" />,
  family: <Users className="w-4 h-4" />,
  humanitarian: <LifeBuoy className="w-4 h-4" />,
};

const MainContent: React.FC = () => {
  const { 
    campaigns, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    activeModal,
    setActiveModal,
    activeCampaign,
    openDonateModal
  } = useApp();

  const [urgencyFilter, setUrgencyFilter] = useState<'all' | 'urgent_only'>('all');

  // Urgent campaigns
  const urgentCampaigns = campaigns.filter(c => c.status === 'urgent' || c.urgency === 'critical');

  // Filtered campaigns for the explore section
  const filteredCampaigns = campaigns.filter(c => {
    // Category match
    const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;

    // Search query match (title, beneficiary, city, description)
    const query = searchQuery.toLowerCase().trim();
    const matchSearch = !query || 
      c.title.toLowerCase().includes(query) ||
      c.beneficiaryName.toLowerCase().includes(query) ||
      c.location.city.toLowerCase().includes(query) ||
      c.situationSummary.toLowerCase().includes(query);

    // City match
    const matchCity = selectedCity === 'all' || c.location.city.toLowerCase() === selectedCity.toLowerCase();

    // Urgency match
    const matchUrgency = urgencyFilter === 'all' || c.status === 'urgent' || c.urgency === 'critical';

    return matchCategory && matchSearch && matchCity && matchUrgency;
  });

  const availableCities = Array.from(new Set(campaigns.map(c => c.location.city)));

  return (
    <div className="min-h-screen bg-white text-black flex flex-col selection:bg-emerald-100 selection:text-emerald-950 pb-16 md:pb-0">
      {/* Top 3-Zone Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Dedicated Urgent Cases Section (Prioritized) */}
        <UrgentSection urgentCampaigns={urgentCampaigns} />

        {/* How It Works 6-Step Horizontal Pipeline */}
        <section className="py-10 sm:py-12 bg-white border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Direct Citizen-To-Citizen Help
              </span>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-black mt-1">
                How Sahayata Works
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                From emergency request to direct hospital receipt, zero intermediary delay.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {[
                { step: '01', title: 'Someone In Need', desc: 'Family or coordinator submits emergency request with hospital bills.' },
                { step: '02', title: 'Direct Verification', desc: 'Doctors & volunteers authenticate inpatient admission & prognosis.' },
                { step: '03', title: 'Campaign Goes Live', desc: 'Audited goal, proof documents & ledger breakdown published.' },
                { step: '04', title: 'People Donate', desc: 'Direct contributions via UPI/card with 100% transparent tracking.' },
                { step: '05', title: 'Help Is Delivered', desc: 'Funds disbursed to hospital billing desk or relief supplier escrow.' },
                { step: '06', title: 'Transparent Proof', desc: 'Discharge summaries, receipts & recovery updates sent to donors.' }
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200 hover:border-emerald-500 shadow-2xs transition-all text-left">
                  <div className="text-xs font-bold font-data text-emerald-700 mb-1">
                    Step {item.step}
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-black mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-zinc-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Verified Campaigns / Explore Section */}
        <section id="all-campaigns" className="py-10 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Direct Humanitarian Registry
                </span>
                <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-black mt-0.5">
                  Verified Active Campaigns
                </h2>
                <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                  Choose a specific person or cause to support. Every case is verified with local medical coordinators.
                </p>
              </div>

              {/* Search & Location Filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, condition, city..."
                    className="w-full sm:w-64 bg-white border border-zinc-300 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-black text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>

                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                  >
                    <option value="all">All Locations (India)</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Category Segmented Controls (Interactive Filter Buttons) */}
            <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
              <div className="flex items-center gap-2 min-w-max">
                {Object.entries(CATEGORY_INFO).map(([key, info]) => {
                  const isActive = selectedCategory === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                        isActive
                          ? 'bg-black text-white shadow-sm font-semibold'
                          : 'bg-white text-zinc-800 border border-zinc-300 hover:border-emerald-600 hover:bg-zinc-50'
                      }`}
                    >
                      {CategoryIconMap[key] || <HeartHandshake className="w-4 h-4" />}
                      <span>{info.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campaign Grid */}
            {filteredCampaigns.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-zinc-200 shadow-xs">
                <p className="text-base font-semibold text-black">No campaigns match your current filters.</p>
                <p className="text-xs text-zinc-500 mt-1">Try resetting your search query or selecting "All Urgent Cases".</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSelectedCity('all');
                  }}
                  className="mt-4 px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-medium"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((camp) => (
                  <CampaignCard key={camp.id} campaign={camp} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Feature: "Where did my donation go?" Interactive Ledger */}
        <section className="py-12 sm:py-16 bg-white border-y border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <WhereDonationGoesLedger />
          </div>
        </section>

        {/* Success Stories & Verified Real Outcomes */}
        <SuccessStoriesSection />

        {/* Humanitarian Call To Action Banner */}
        <section className="py-12 sm:py-16 bg-black text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Direct Emergency Network
            </span>
            <h2 className="text-2xl sm:text-4xl font-editorial font-bold leading-tight">
              “When someone is in need, make it easier for someone else to help.”
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Whether you are an individual donor, hospital social worker, or someone facing an unexpected emergency, Sahayata is designed for you.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openDonateModal(null)}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm min-h-[48px]"
              >
                HELP SOMEONE TODAY
              </button>
              <button
                onClick={() => setActiveModal('request_help')}
                className="w-full sm:w-auto px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 font-semibold text-sm rounded-xl transition-colors min-h-[48px]"
              >
                REQUEST EMERGENCY ASSISTANCE
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation (Smartphones) */}
      <MobileBottomNav />

      {/* Modals */}
      {activeModal === 'donate' && (
        <DonationModal
          initialCampaign={activeCampaign}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'detail' && activeCampaign && (
        <CampaignDetailModal
          campaign={activeCampaign}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'request_help' && (
        <HelpRequestModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'my_impact' && (
        <DonorDashboardModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'admin' && (
        <AdminDashboardModal
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === 'where_donations_go' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 border border-stone-200">
            <div className="bg-stone-50 px-5 py-3 border-b border-stone-200 flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-stone-700">Financial Transparency Ledger</span>
              <button onClick={() => setActiveModal(null)} className="p-1 text-stone-400 hover:text-stone-700">
                ×
              </button>
            </div>
            <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto">
              <WhereDonationGoesLedger />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
