import React, { useState } from 'react';
import { Campaign } from '../types';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Heart, Share2, CheckCircle2 } from 'lucide-react';
import { CATEGORY_INFO } from '../data/seedData';

interface CampaignCardProps {
  campaign: Campaign;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const { openDonateModal, openDetailModal } = useApp();
  const [copied, setCopied] = useState(false);

  const percent = Math.min(100, Math.round((campaign.amountRaised / campaign.amountRequired) * 100));
  const remaining = Math.max(0, campaign.amountRequired - campaign.amountRaised);
  const categoryLabel = CATEGORY_INFO[campaign.category]?.label || campaign.category;

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Please support: "${campaign.title}" on Sahayata emergency network. Donate ₹50 or share with someone who can help:`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: campaign.title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 hover:border-stone-300 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-200 group">
      <div>
        {/* Cover Photo with Image Fallback */}
        <div
          onClick={() => openDetailModal(campaign)}
          className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 cursor-pointer"
        >
          <img
            src={campaign.coverImage}
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />

          {/* Status overlay bar if completed or critical */}
          {campaign.status === 'completed' && (
            <div className="absolute top-3 left-3 bg-emerald-900/90 backdrop-blur-sm text-white px-2.5 py-1 text-xs font-semibold rounded-md shadow-sm">
              Goal 100% Achieved
            </div>
          )}
          {campaign.status === 'urgent' && (
            <div className="absolute top-3 left-3 bg-rose-700/90 backdrop-blur-sm text-white px-2.5 py-1 text-xs font-semibold rounded-md shadow-sm">
              Critical Timeframe
            </div>
          )}
        </div>

        {/* Card Content Body */}
        <div className="p-4 sm:p-5">
          {/* Zero-Pill Unboxed Metadata Line */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-2">
            <span className="font-semibold text-black uppercase tracking-wide">
              {categoryLabel}
            </span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span>{campaign.location.city}</span>
            <span aria-hidden="true" className="text-zinc-300">·</span>
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
            </span>
          </div>

          {/* Beneficiary Image & Profile above Title */}
          <div
            onClick={() => openDetailModal(campaign)}
            className="flex items-center gap-2.5 mb-2.5 p-2 bg-zinc-50 hover:bg-white rounded-xl border border-zinc-200 hover:border-emerald-500 transition-all cursor-pointer group/beneficiary"
            title="Click to open and get details about beneficiary"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-zinc-300 bg-zinc-200 ring-2 ring-transparent group-hover/beneficiary:ring-emerald-500 transition-all">
              <img
                src={campaign.coverImage}
                alt={campaign.beneficiaryName}
                className="w-full h-full object-cover group-hover/beneficiary:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-black truncate group-hover/beneficiary:text-emerald-700 transition-colors">
                  {campaign.beneficiaryName}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5 group-hover/beneficiary:translate-x-0.5 transition-transform">
                  <span>Beneficiary Details</span> →
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 truncate">
                {campaign.relation || 'Verified Case'} · {campaign.location.city}
              </div>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => openDetailModal(campaign)}
            className="text-base sm:text-lg font-bold text-black hover:text-emerald-700 cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {campaign.title}
          </h3>

          {/* Short description */}
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 leading-relaxed line-clamp-2">
            {campaign.situationSummary}
          </p>

          {/* Beneficiary unboxed info */}
          <div className="mt-3 text-xs text-zinc-500">
            For: <span className="font-semibold text-black">{campaign.beneficiaryName}</span>
            {campaign.relation && <span className="text-zinc-400"> ({campaign.relation})</span>}
          </div>

          {/* Progress Section */}
          <div className="mt-4 pt-3 border-t border-zinc-100">
            <div className="flex items-baseline justify-between mb-1.5">
              <div>
                <span className="text-base sm:text-lg font-bold font-data tabular-nums text-black">
                  ₹{campaign.amountRaised.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-zinc-500 ml-1">
                  of ₹{campaign.amountRequired.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs font-bold font-data text-emerald-700">
                {percent}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  campaign.status === 'completed'
                    ? 'bg-emerald-600'
                    : campaign.status === 'urgent'
                    ? 'bg-rose-600'
                    : 'bg-emerald-600'
                }`}
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Sub-progress stats */}
            <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 font-data">
              <span>{campaign.donorCount} donors</span>
              <span>₹{remaining.toLocaleString('en-IN')} remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center gap-2">
        {campaign.status !== 'completed' ? (
          <button
            onClick={() => openDonateModal(campaign, 50)}
            className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Donate 50 Rupees</span>
          </button>
        ) : (
          <button
            onClick={() => openDetailModal(campaign)}
            className="flex-1 py-2.5 px-3 bg-emerald-50 text-emerald-900 border border-emerald-300 font-medium text-xs sm:text-sm rounded-xl transition-colors min-h-[44px]"
          >
            View Recovery Story
          </button>
        )}

        <button
          onClick={handleShare}
          className={`p-2.5 rounded-xl transition-all min-h-[44px] min-w-[44px] flex items-center justify-center ${
            copied
              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
              : 'bg-zinc-100 hover:bg-zinc-200 text-black'
          }`}
          title="Share this case link with someone who can help"
        >
          {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
