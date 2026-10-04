import React, { useState } from 'react';
import { Campaign } from '../types';
import { useApp } from '../context/AppContext';
import { AlertCircle, Clock, ShieldCheck, Heart, Share2, CheckCircle2 } from 'lucide-react';

interface UrgentSectionProps {
  urgentCampaigns: Campaign[];
}

export const UrgentSection: React.FC<UrgentSectionProps> = ({ urgentCampaigns }) => {
  const { openDonateModal, openDetailModal } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (urgentCampaigns.length === 0) return null;

  const handleShare = async (camp: Campaign) => {
    const shareTitle = `🚨 Urgent Help: ${camp.title}`;
    const shareText = `Please help or share: "${camp.title}". Even ₹50 helps Ravi's family and people in critical need on Sahayata. When someone is in need, someone should be there.`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // User dismissed or share failed, fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopiedId(camp.id);
        setTimeout(() => setCopiedId(null), 2500);
      } catch (e) {
        setCopiedId(camp.id);
        setTimeout(() => setCopiedId(null), 2500);
      }
    }
  };

  return (
    <section id="urgent-cases" className="py-8 sm:py-12 bg-white border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
              <span>Immediate Support Needed Within 24-48 Hours</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-black mt-1">
              Urgent Emergencies
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Time-critical life-saving treatments and disaster responses awaiting immediate community funding.
            </p>
          </div>

          <div className="text-xs text-zinc-500 font-data">
            {urgentCampaigns.length} urgent cases currently under active emergency watch
          </div>
        </div>

        {/* Urgent Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {urgentCampaigns.map((camp) => {
            const percent = Math.min(100, Math.round((camp.amountRaised / camp.amountRequired) * 100));
            const remaining = Math.max(0, camp.amountRequired - camp.amountRaised);

            return (
              <div
                key={camp.id}
                className="bg-white rounded-2xl border-2 border-zinc-200 hover:border-emerald-600 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-150"
              >
                <div>
                  {/* Urgent Alert Banner */}
                  <div className="bg-black text-white px-4 py-2.5 flex items-center justify-between text-xs font-semibold">
                    <span className="flex items-center gap-1.5 uppercase tracking-wide text-emerald-400">
                      <AlertCircle className="w-4 h-4 text-emerald-400" />
                      {camp.category === 'medical'
                        ? 'URGENT MEDICAL HELP'
                        : camp.category === 'disaster'
                        ? 'DISASTER EMERGENCY RELIEF'
                        : 'CRITICAL EMERGENCY NEED'}
                    </span>
                    {camp.daysRemaining && (
                      <span className="flex items-center gap-1 font-data font-normal text-zinc-300">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" /> {camp.daysRemaining} days left
                      </span>
                    )}
                  </div>

                  <div className="p-5 sm:p-6">
                    {/* Unboxed Metadata Header */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2">
                      <span className="font-semibold text-black uppercase">
                        {camp.location.city}, {camp.location.state}
                      </span>
                      <span aria-hidden="true" className="text-zinc-300">·</span>
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Hospital Verified
                      </span>
                      <span aria-hidden="true" className="text-zinc-300">·</span>
                      <span className="font-data">{camp.donorCount} donors</span>
                    </div>

                    {/* Beneficiary Image above Title */}
                    <div
                      onClick={() => openDetailModal(camp)}
                      className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-3.5 bg-zinc-100 cursor-pointer group shadow-xs border border-zinc-200"
                      title="Click to open and get details about beneficiary"
                    >
                      <img
                        src={camp.coverImage}
                        alt={camp.beneficiaryName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end justify-between p-3.5 text-white">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center font-bold text-sm text-white shrink-0">
                            {camp.beneficiaryName.charAt(0)}
                          </div>
                          <div>
                            <div className="text-xs sm:text-sm font-bold leading-tight">
                              {camp.beneficiaryName}
                            </div>
                            <div className="text-[11px] text-zinc-200">
                              {camp.relation || 'Beneficiary'} · {camp.location.city}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold bg-emerald-600 text-white px-2.5 py-1 rounded-lg border border-emerald-500 group-hover:bg-emerald-500 transition-colors flex items-center gap-1">
                          <span>View Details</span>
                          <span className="text-xs">→</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => openDetailModal(camp)}
                      className="text-lg sm:text-xl font-bold text-black hover:text-emerald-700 cursor-pointer transition-colors leading-snug"
                    >
                      “{camp.title}”
                    </h3>

                    {/* Short Situation Narrative */}
                    <p className="mt-2 text-sm text-zinc-600 leading-relaxed line-clamp-2">
                      {camp.situationSummary}
                    </p>

                    {/* Funding Progress Meter */}
                    <div className="mt-5 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <div>
                          <span className="text-xl font-bold font-data tabular-nums text-black">
                            ₹{camp.amountRaised.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-zinc-500 ml-1">
                            raised of ₹{camp.amountRequired.toLocaleString('en-IN')} needed
                          </span>
                        </div>
                        <span className="text-sm font-bold font-data text-emerald-700">
                          {percent}% funded
                        </span>
                      </div>

                      {/* Accessible Progress Bar */}
                      <div className="w-full bg-zinc-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                        <span>Remaining: ₹{remaining.toLocaleString('en-IN')}</span>
                        <span className="text-emerald-700 font-semibold">
                          Direct ESCROW to: {camp.verificationDetails.hospitalOrOrg?.split(',')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => openDonateModal(camp, 50)}
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>DONATE 50 RUPEES</span>
                  </button>

                  <button
                    onClick={() => handleShare(camp)}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all min-h-[44px] flex items-center justify-center gap-1.5 ${
                      copiedId === camp.id
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-zinc-100 hover:bg-zinc-200 text-black'
                    }`}
                    title="Share this link to someone who can help"
                  >
                    {copiedId === camp.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-zinc-700" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
