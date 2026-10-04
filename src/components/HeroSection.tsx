import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE } from '../data/seedData';
import { ArrowRight, ShieldCheck, HeartHandshake, Eye, CheckCircle2, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { openDonateModal, setActiveModal, totalFundsRaised, totalFamiliesSupported, totalDonorsCount, userDonations } = useApp();

  const communityDonors = [
    {
      id: 'live-1',
      name: 'Rajesh K.',
      amount: 500,
      city: 'Hyderabad',
      cause: 'Child Heart Surgery',
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'live-2',
      name: 'Sunita Sharma',
      amount: 1000,
      city: 'New Delhi',
      cause: 'Thermal Shelter Blankets',
      color: 'from-amber-500 to-orange-600',
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      id: 'live-3',
      name: 'Dr. Vikram Nair',
      amount: 2500,
      city: 'Pune',
      cause: 'Emergency PICU Support',
      color: 'from-violet-500 to-purple-600',
      badgeColor: 'bg-violet-600 text-white',
    },
    {
      id: 'live-4',
      name: 'Pooja Reddy',
      amount: 50,
      city: 'Bengaluru',
      cause: 'Clean Drinking Water',
      color: 'from-rose-500 to-pink-600',
      badgeColor: 'bg-rose-600 text-white',
    },
    {
      id: 'live-5',
      name: 'Amitabh Sen',
      amount: 350,
      city: 'Kolkata',
      cause: 'Warm Meals for Elders',
      color: 'from-cyan-500 to-blue-600',
      badgeColor: 'bg-cyan-600 text-white',
    },
    {
      id: 'live-6',
      name: 'Karthik & Sneha',
      amount: 1500,
      city: 'Chennai',
      cause: 'Pediatric Care',
      color: 'from-fuchsia-500 to-rose-600',
      badgeColor: 'bg-fuchsia-600 text-white',
    },
    {
      id: 'live-7',
      name: 'Ananya Deshmukh',
      amount: 500,
      city: 'Nagpur',
      cause: 'Dialysis Sessions',
      color: 'from-teal-500 to-emerald-600',
      badgeColor: 'bg-teal-600 text-white',
    },
    {
      id: 'live-8',
      name: 'Mohammad Arif',
      amount: 2000,
      city: 'Lucknow',
      cause: 'Emergency Trauma Surgery',
      color: 'from-indigo-500 to-violet-600',
      badgeColor: 'bg-indigo-600 text-white',
    }
  ];

  const userDonationItems = (userDonations || []).map((d) => ({
    id: d.id,
    name: d.isAnonymous ? 'Kind Soul' : (d.donorName || 'Compassionate Hero'),
    amount: d.amount,
    city: 'Direct Hero',
    cause: d.campaignTitle.slice(0, 22) + '...',
    color: 'from-emerald-500 to-teal-600',
    badgeColor: 'bg-emerald-600 text-white',
  }));

  const allLiveDonors = [...userDonationItems, ...communityDonors];

  // Show 4 donors at a time
  const [batchStartIdx, setBatchStartIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [thanksMap, setThanksMap] = useState<Record<string, number>>({
    'live-1': 18,
    'live-2': 32,
    'live-3': 47,
    'live-4': 14,
    'live-5': 23,
    'live-6': 39,
    'live-7': 19,
    'live-8': 26
  });
  const [justThankedText, setJustThankedText] = useState<string | null>(null);

  // Auto-cycle through batches of 4 donors every 4.5 seconds
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setBatchStartIdx((prev) => (prev + 4 >= allLiveDonors.length ? 0 : prev + 4));
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, allLiveDonors.length]);

  // Take 4 donors at a time
  const visibleFourDonors: (typeof allLiveDonors)[number][] = [];
  for (let i = 0; i < 4; i++) {
    const idx = (batchStartIdx + i) % allLiveDonors.length;
    visibleFourDonors.push(allLiveDonors[idx]);
  }

  const handlePrevBatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBatchStartIdx((prev) => (prev - 4 < 0 ? Math.max(0, allLiveDonors.length - 4) : prev - 4));
  };

  const handleNextBatch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBatchStartIdx((prev) => (prev + 4 >= allLiveDonors.length ? 0 : prev + 4));
  };

  const handleSayThanksSingle = (e: React.MouseEvent, donor: { id: string; name: string }) => {
    e.stopPropagation();
    setThanksMap((prev) => ({
      ...prev,
      [donor.id]: (prev[donor.id] || 15) + 1
    }));
    setJustThankedText(`Heartfelt thanks sent to ${donor.name}! 🙏`);
    setTimeout(() => setJustThankedText(null), 2500);
  };

  const handleSayThanksToAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setThanksMap((prev) => {
      const next = { ...prev };
      visibleFourDonors.forEach((d) => {
        next[d.id] = (next[d.id] || 15) + 1;
      });
      return next;
    });
    const donorNames = visibleFourDonors.map((d) => d.name.split(' ')[0]).join(', ');
    setJustThankedText(`Thank you so much ${donorNames}! You are saving lives! ❤️`);
    setTimeout(() => setJustThankedText(null), 3000);
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20 border-b border-zinc-200 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
              <span>100% Direct Verification</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>Zero Intermediary Cut</span>
              <span aria-hidden="true" className="text-zinc-300">·</span>
              <span>Direct Hospital & Vendor Escrow</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-bold tracking-tight text-black leading-[1.12] max-w-2xl">
              When someone needs help, someone should be there.
            </h1>

            {/* Subtext */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl">
              When someone is in need, we make it easier for someone else to help. A trustworthy emergency aid network directing every rupee toward verified medical, disaster, food, and shelter crises.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => openDonateModal(null)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base shadow-sm transition-all duration-150 flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.99]"
              >
                <span>HELP SOMEONE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveModal('request_help')}
                className="px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white border border-black font-semibold text-base transition-all duration-150 flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.99]"
              >
                <span>I NEED HELP</span>
              </button>
            </div>

            {/* Colourful Live Donors & Heartfelt Gratitude Section (4 Donors at the time) */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="mt-6 p-4 sm:p-5 rounded-2xl bg-white border-2 border-zinc-200 hover:border-emerald-500 shadow-sm transition-all space-y-3"
            >
              {/* Top Banner with Live Indicator, Title & Say Thanks to All 4 */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-black flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Live Donors · Say Thanks to Them!</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSayThanksToAll}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 active:scale-95"
                    title="Send heartfelt thanks to all 4 donors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Say Thanks to All 4 🎉</span>
                  </button>

                  <div className="flex items-center gap-1 text-[11px] text-zinc-500 font-medium pl-1">
                    <button
                      onClick={handlePrevBatch}
                      className="w-6 h-6 rounded-md bg-white border border-zinc-200 hover:bg-zinc-100 flex items-center justify-center font-bold text-black transition-colors"
                      title="Previous 4 donors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-data px-1 text-black font-semibold">
                      {Math.floor(batchStartIdx / 4) + 1}/{Math.ceil(allLiveDonors.length / 4)}
                    </span>
                    <button
                      onClick={handleNextBatch}
                      className="w-6 h-6 rounded-md bg-white border border-zinc-200 hover:bg-zinc-100 flex items-center justify-center font-bold text-black transition-colors"
                      title="Next 4 donors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Thank you feedback banner */}
              {justThankedText && (
                <div className="p-2.5 bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-between px-3.5 shadow-sm animate-pulse">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{justThankedText}</span>
                  </div>
                  <span className="text-[11px] opacity-90 hidden sm:inline">Thank you for spreading kindness</span>
                </div>
              )}

              {/* 4 Donors Shown Simultaneously */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {visibleFourDonors.map((donor) => (
                  <div
                    key={donor.id}
                    className="p-3 bg-white rounded-xl border border-zinc-200 hover:border-emerald-500 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-2.5"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      {/* Colourful Avatar */}
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${donor.color} text-white font-bold text-xs flex items-center justify-center shadow-xs shrink-0 ring-2 ring-white`}>
                        {donor.name.charAt(0)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-xs sm:text-sm text-black truncate">
                            {donor.name}
                          </span>
                          {/* Vibrant Colourful Money Badge */}
                          <span className={`px-2 py-0.5 rounded-full text-[11px] font-data font-bold shadow-xs ${donor.badgeColor}`}>
                            +₹{donor.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="text-[11px] text-zinc-500 truncate mt-0.5">
                          <span className="font-semibold text-emerald-800">“Thank you!”</span> · {donor.cause}
                        </div>
                      </div>
                    </div>

                    {/* Individual Say Thanks Button */}
                    <button
                      onClick={(e) => handleSayThanksSingle(e, donor)}
                      className="shrink-0 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1 active:scale-95 group/btn"
                      title={`Say thanks to ${donor.name}`}
                    >
                      <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600 group-hover/btn:scale-125 transition-transform" />
                      <span className="hidden xs:inline sm:inline">Thanks</span>
                      <span className="font-data text-[10px] text-emerald-900 bg-white px-1.5 py-0.2 rounded-full font-bold border border-emerald-200">
                        {thanksMap[donor.id] || 16}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Badges - Unboxed */}
            <div className="mt-8 pt-6 border-t border-zinc-200 grid grid-cols-3 gap-4 text-black">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-data tabular-nums text-black">
                  ₹{(totalFundsRaised / 100000).toFixed(1)}L+
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">Direct Verified Relief</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-data tabular-nums text-black">
                  {totalFamiliesSupported.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">Lives Directly Touched</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-data tabular-nums text-emerald-600">
                  100%
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">Audited Expense Proof</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Fidelity Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white">
              <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100">
                <img
                  src={HERO_IMAGE}
                  alt="Relief volunteers providing emergency food and medical assistance to families in need"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              {/* Caption Card below image */}
              <div className="p-4 sm:p-5 bg-white">
                <div className="flex items-center justify-between text-xs text-zinc-500 mb-1.5">
                  <span className="font-semibold text-emerald-800">Community Emergency Dispatch</span>
                  <span className="font-data">Verified Field Operations</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-black leading-snug">
                  Direct citizen-to-citizen emergency support with zero platform commission.
                </h3>
                <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                  Every case is verified by on-ground doctors and field volunteers. Donations are disbursed directly to hospital billing desks and verified essential suppliers.
                </p>

                {/* 4 Pillars in clean unboxed layout */}
                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-semibold text-black">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> HELP
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> TRUST
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" /> TRANSPARENCY
                  </span>
                  <span className="text-zinc-300">·</span>
                  <span className="flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" /> IMPACT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
