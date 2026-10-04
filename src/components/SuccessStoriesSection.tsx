import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, HeartHandshake, ShieldCheck, ArrowRight, Quote } from 'lucide-react';

export const SuccessStoriesSection: React.FC = () => {
  const { campaigns, openDetailModal } = useApp();

  const completedStories = campaigns.filter(c => c.outcome || c.status === 'completed');

  if (completedStories.length === 0) return null;

  return (
    <section id="success-outcomes" className="py-12 sm:py-16 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Proven Real-World Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-editorial font-bold text-black leading-tight">
            “Your donation helped a family survive their darkest hour.”
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600 leading-relaxed">
            Full transparency does not end when a campaign reaches 100%. We verify every hospital discharge, rehabilitation milestone, and family recovery.
          </p>
        </div>

        {/* Stories List */}
        <div className="space-y-8">
          {completedStories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-xs hover:border-emerald-500 transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left image */}
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto bg-zinc-100">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-emerald-800 text-white px-3 py-1 rounded text-xs font-semibold shadow-sm">
                    100% Fully Recovered & Audited
                  </div>
                </div>

                {/* Right narrative */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                      <span className="font-semibold text-black uppercase">{story.location.city}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-semibold">₹{story.amountRaised.toLocaleString('en-IN')} Raised</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-data">{story.donorCount} Donors</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-editorial text-black leading-snug">
                      {story.title}
                    </h3>

                    {/* Original situation */}
                    <div className="mt-3 text-xs sm:text-sm text-zinc-600">
                      <strong className="text-black font-semibold">Original Situation: </strong>
                      {story.situationSummary}
                    </div>

                    {/* How funds were used */}
                    <div className="mt-4 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs">
                      <div className="font-semibold text-black mb-1.5 flex items-center justify-between">
                        <span>How the funds were used:</span>
                        <span className="text-emerald-700 font-semibold">100% Verified Vouchers</span>
                      </div>
                      <div className="space-y-1 font-data text-zinc-700">
                        {story.breakdown.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <span>• {item.category}:</span>
                            <span className="font-semibold text-black">
                              ₹{item.allocatedAmount.toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Beneficiary Quote */}
                    {story.outcome && (
                      <div className="mt-4 pl-4 border-l-2 border-emerald-600 text-xs sm:text-sm text-zinc-800 italic">
                        <Quote className="w-3.5 h-3.5 text-emerald-700 mb-1 inline mr-1" />
                        {story.outcome.beneficiaryQuote}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-zinc-200 flex items-center justify-between">
                    <span className="text-xs text-zinc-500">
                      Outcome confirmed on: {story.outcome?.date || story.dateCreated}
                    </span>

                    <button
                      onClick={() => openDetailModal(story)}
                      className="px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>View Full Audit & Medical Trail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
