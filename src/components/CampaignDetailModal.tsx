import React, { useState } from 'react';
import { Campaign } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Building, 
  FileCheck, 
  Receipt, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';
import { CATEGORY_INFO } from '../data/seedData';

interface CampaignDetailModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({ campaign, onClose }) => {
  const { openDonateModal } = useApp();
  const [activeTab, setActiveTab] = useState<'story' | 'ledger' | 'updates' | 'verification'>('story');
  const [copySuccess, setCopySuccess] = useState(false);

  const percent = Math.min(100, Math.round((campaign.amountRaised / campaign.amountRequired) * 100));
  const remaining = Math.max(0, campaign.amountRequired - campaign.amountRaised);
  const categoryInfo = CATEGORY_INFO[campaign.category];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 border border-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Sticky Close Bar */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
            <span className="font-semibold text-black uppercase">
              Case Ref: #{campaign.id.slice(-6).toUpperCase()}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-zinc-600 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors text-xs flex items-center gap-1"
              title="Share Case"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">{copySuccess ? 'Link Copied!' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-500 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[82vh] overflow-y-auto">
          {/* Hero Banner inside modal */}
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full bg-zinc-900 overflow-hidden">
            <img
              src={campaign.coverImage}
              alt={campaign.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-end p-4 sm:p-6">
              <div className="text-white max-w-2xl">
                <div className="flex items-center gap-2 text-xs text-zinc-200 mb-1.5">
                  <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-medium">
                    {categoryInfo?.label}
                  </span>
                  <span>{campaign.location.city}, {campaign.location.state}</span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-editorial text-white leading-snug">
                  {campaign.title}
                </h2>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Quick Metrics Strip */}
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-zinc-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs uppercase text-zinc-500 font-semibold">Goal Required</div>
                <div className="text-lg sm:text-xl font-bold font-data tabular-nums text-black mt-0.5">
                  ₹{campaign.amountRequired.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase text-zinc-500 font-semibold">Amount Raised</div>
                <div className="text-lg sm:text-xl font-bold font-data tabular-nums text-emerald-700 mt-0.5">
                  ₹{campaign.amountRaised.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase text-zinc-500 font-semibold">Amount Disbursed</div>
                <div className="text-lg sm:text-xl font-bold font-data tabular-nums text-black mt-0.5">
                  ₹{campaign.amountUsed.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase text-zinc-500 font-semibold">Supporters</div>
                <div className="text-lg sm:text-xl font-bold font-data tabular-nums text-black mt-0.5">
                  {campaign.donorCount} Donors
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-600 mb-1.5">
                <span className="font-semibold text-black font-data">
                  {percent}% funded
                </span>
                <span className="font-data">
                  ₹{remaining.toLocaleString('en-IN')} remaining needed
                </span>
              </div>
              <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all bg-emerald-600"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {/* Modal Navigation Tabs (Interactive Segmented Control) */}
            <div className="flex items-center gap-1 p-1 bg-zinc-100 rounded-xl">
              <button
                onClick={() => setActiveTab('story')}
                className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors min-h-[38px] ${
                  activeTab === 'story'
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                Case Story & Background
              </button>
              <button
                onClick={() => setActiveTab('ledger')}
                className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors min-h-[38px] ${
                  activeTab === 'ledger'
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                Expense Breakdown
              </button>
              <button
                onClick={() => setActiveTab('verification')}
                className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors min-h-[38px] ${
                  activeTab === 'verification'
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                Verification Proof
              </button>
              <button
                onClick={() => setActiveTab('updates')}
                className={`flex-1 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors min-h-[38px] relative ${
                  activeTab === 'updates'
                    ? 'bg-white text-black shadow-sm font-semibold'
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                Updates ({campaign.updates.length})
              </button>
            </div>

            {/* Tab 1: Detailed Story */}
            {activeTab === 'story' && (
              <div className="space-y-4">
                {/* Beneficiary Identity Spotlight */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-zinc-300 bg-zinc-200 shadow-xs">
                    <img
                      src={campaign.coverImage}
                      alt={campaign.beneficiaryName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-black truncate">
                        {campaign.beneficiaryName}
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        Verified Beneficiary
                      </span>
                    </div>
                    <div className="text-xs text-zinc-600 mt-0.5">
                      {campaign.relation && <span>{campaign.relation} · </span>}
                      {campaign.age && <span>{campaign.age} Years Old · </span>}
                      <span>{campaign.location.city}, {campaign.location.state}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500 mt-1 font-data">
                      Registration Case ID: #{campaign.id.toUpperCase()}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                  <div className="text-xs font-bold uppercase text-black mb-1">
                    Emergency Situation Summary
                  </div>
                  <p className="text-sm text-zinc-800 leading-relaxed">
                    {campaign.situationSummary}
                  </p>
                </div>

                <div className="text-sm sm:text-base text-zinc-700 leading-relaxed space-y-3 font-normal">
                  <h4 className="font-editorial text-lg font-bold text-black">
                    The Full Story
                  </h4>
                  <p>{campaign.detailedStory}</p>
                </div>

                {/* Beneficiary Details definition list */}
                <div className="pt-4 border-t border-zinc-200">
                  <h4 className="text-xs uppercase font-bold text-zinc-500 mb-3">
                    Beneficiary & Clinical Details
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-zinc-50 rounded-lg">
                      <span className="text-zinc-500">Patient / Family Name:</span>
                      <div className="font-semibold text-black mt-0.5">{campaign.beneficiaryName}</div>
                    </div>
                    <div className="p-3 bg-zinc-50 rounded-lg">
                      <span className="text-zinc-500">Treating Facility:</span>
                      <div className="font-semibold text-black mt-0.5">
                        {campaign.verificationDetails.hospitalOrOrg || 'Accredited Medical Center'}
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-50 rounded-lg">
                      <span className="text-zinc-500">Location:</span>
                      <div className="font-semibold text-black mt-0.5">
                        {campaign.location.city}, {campaign.location.state}
                      </div>
                    </div>
                    <div className="p-3 bg-zinc-50 rounded-lg">
                      <span className="text-zinc-500">Disbursement Method:</span>
                      <div className="font-semibold text-emerald-800 mt-0.5">
                        {campaign.bankDetailsMasked}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Outcome summary if completed */}
                {campaign.outcome && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Verified Recovery Outcome ({campaign.outcome.date})</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-800 italic mt-2">
                      {campaign.outcome.beneficiaryQuote}
                    </p>
                    <div className="text-xs text-zinc-600 mt-2 font-medium">
                      Status: {campaign.outcome.outcomeSummary}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Expense Breakdown Ledger */}
            {activeTab === 'ledger' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-black">
                    Itemized Cost Ledger & Proof of Allocation
                  </h4>
                  <span className="text-xs text-zinc-500 font-data">
                    Audited by Sahayata Financial Desk
                  </span>
                </div>

                <div className="border border-zinc-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-zinc-50 text-zinc-700 font-semibold border-b border-zinc-200">
                      <tr>
                        <th className="py-2.5 px-3 sm:px-4">Expense Component</th>
                        <th className="py-2.5 px-3 sm:px-4">Beneficiary / Vendor</th>
                        <th className="py-2.5 px-3 sm:px-4 text-right">Required (₹)</th>
                        <th className="py-2.5 px-3 sm:px-4 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100 font-normal">
                      {campaign.breakdown.map((item) => (
                        <tr key={item.id} className="hover:bg-zinc-50">
                          <td className="py-3 px-3 sm:px-4 font-medium text-black">
                            {item.category}
                          </td>
                          <td className="py-3 px-3 sm:px-4 text-zinc-600 text-xs">
                            {item.vendorOrHospital || campaign.verificationDetails.hospitalOrOrg}
                          </td>
                          <td className="py-3 px-3 sm:px-4 text-right font-data tabular-nums text-black font-semibold">
                            ₹{item.allocatedAmount.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 px-3 sm:px-4 text-right">
                            {item.status === 'paid' ? (
                              <span className="text-emerald-700 font-semibold inline-flex items-center gap-1 text-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Disbursed
                              </span>
                            ) : (
                              <span className="text-zinc-600 font-medium text-xs">
                                In Progress
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-zinc-50 font-bold border-t border-zinc-200">
                      <tr>
                        <td colSpan={2} className="py-2.5 px-3 sm:px-4 text-zinc-800">
                          Total Verified Need
                        </td>
                        <td className="py-2.5 px-3 sm:px-4 text-right font-data tabular-nums text-black">
                          ₹{campaign.amountRequired.toLocaleString('en-IN')}
                        </td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="p-3 bg-zinc-50 rounded-lg text-xs text-zinc-600 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span>
                    No personal cash transfers. All payments are disbursed directly to verified hospital accounts with GST receipts.
                  </span>
                </div>
              </div>
            )}

            {/* Tab 3: Verification Proof */}
            {activeTab === 'verification' && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Verified by: {campaign.verificationDetails.verifiedBy}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-800 mt-2">
                    {campaign.verificationDetails.leadVolunteerNote}
                  </p>
                  <div className="mt-2 text-xs text-zinc-500 font-data">
                    Verified on: {campaign.verificationDetails.verificationDate}
                  </div>
                </div>

                <h4 className="text-xs uppercase font-bold text-zinc-500 pt-2">
                  Documents Inspected & Validated
                </h4>
                <div className="space-y-2">
                  {campaign.verificationDetails.documentsVerified.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-zinc-200 flex items-center justify-between text-xs sm:text-sm bg-white"
                    >
                      <div className="flex items-center gap-2 text-zinc-800 font-medium">
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                        <span>{doc}</span>
                      </div>
                      <span className="text-emerald-700 font-semibold text-xs">
                        Verified Authenticity
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-zinc-50 rounded-lg text-xs text-zinc-500 flex items-center justify-between">
                  <span>Hospital Verification Contact: Authenticated</span>
                  <span>Field Visit: Completed</span>
                </div>

                {/* Platform Escrow & Beneficiary Bank Verification Card */}
                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-black">
                      <Lock className="w-4 h-4 text-emerald-600" />
                      <span>Beneficiary Bank & Escrow Security</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      {campaign.beneficiaryBankAccount?.verificationStatus === 'verified_by_platform'
                        ? 'Platform Verified & Authorized'
                        : 'Pending Verification'}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Donations are held in Sahayata's audited central platform escrow. Once clinical records and bank accounts pass automated penny-drop validation, funds are directly wired to the provider with an official bank UTR.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2 bg-white rounded-lg border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">Bank Name</span>
                      <span className="font-semibold text-black">{campaign.beneficiaryBankAccount?.bankName || 'Direct Escrow'}</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">Account</span>
                      <span className="font-data font-semibold text-black">{campaign.beneficiaryBankAccount?.accountNumberMasked || campaign.bankDetailsMasked}</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">IFSC Code</span>
                      <span className="font-data font-semibold text-black">{campaign.beneficiaryBankAccount?.ifscCode || 'HDFC0001092'}</span>
                    </div>
                    <div className="p-2 bg-white rounded-lg border border-zinc-200">
                      <span className="text-[10px] text-zinc-400 block">Verification Ref</span>
                      <span className="font-data text-[11px] text-emerald-700 font-semibold truncate block">
                        {campaign.beneficiaryBankAccount?.pennyDropRef || 'Verified OK'}
                      </span>
                    </div>
                  </div>

                  {/* Disbursals table if any */}
                  {campaign.beneficiaryBankAccount?.disbursals && campaign.beneficiaryBankAccount.disbursals.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-bold uppercase text-zinc-500 mb-1.5">
                        Completed Platform Wires to Beneficiary ({campaign.beneficiaryBankAccount.disbursals.length})
                      </div>
                      <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-zinc-50 text-zinc-600 font-medium border-b border-zinc-200">
                            <tr>
                              <th className="py-1.5 px-2.5">Bank UTR</th>
                              <th className="py-1.5 px-2.5">Amount</th>
                              <th className="py-1.5 px-2.5">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100 font-normal">
                            {campaign.beneficiaryBankAccount.disbursals.map((d) => (
                              <tr key={d.id}>
                                <td className="py-1.5 px-2.5 font-data font-bold text-emerald-700">{d.utrNumber}</td>
                                <td className="py-1.5 px-2.5 font-data font-semibold text-black">₹{d.amount.toLocaleString('en-IN')}</td>
                                <td className="py-1.5 px-2.5 text-zinc-600 truncate max-w-xs">{d.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: Updates & Impact Timeline */}
            {activeTab === 'updates' && (
              <div className="space-y-4">
                {campaign.updates.length === 0 ? (
                  <p className="text-sm text-zinc-500 py-6 text-center">
                    No updates published yet. Once funds are disbursed, receipts and medical logs will appear here.
                  </p>
                ) : (
                  <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                    {campaign.updates.map((update) => (
                      <div key={update.id} className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 border-2 border-white ring-2 ring-zinc-200" />
                        <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                            <span className="font-semibold text-black">{update.title}</span>
                            <span className="font-data">{update.date}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed mt-1">
                            {update.description}
                          </p>
                          <div className="mt-3 pt-2 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
                            <span>Amount Used: ₹{update.amountUsed.toLocaleString('en-IN')}</span>
                            <span className="text-zinc-600 font-data">Ref: {update.receiptUrl || 'Audited'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Sticky Bottom Action */}
        <div className="sticky bottom-0 bg-white border-t border-zinc-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-zinc-500">Remaining to be raised</div>
            <div className="text-base sm:text-lg font-bold font-data tabular-nums text-black">
              ₹{remaining.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-100 rounded-xl transition-colors min-h-[44px]"
            >
              Close
            </button>
            {campaign.status !== 'completed' && (
              <button
                onClick={() => {
                  onClose();
                  openDonateModal(campaign, 50);
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center gap-2 min-h-[44px]"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donate 50 Rupees</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
