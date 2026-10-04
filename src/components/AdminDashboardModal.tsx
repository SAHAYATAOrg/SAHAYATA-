import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck, 
  Building, 
  Coins, 
  PlusCircle, 
  Flame, 
  ExternalLink,
  Lock,
  FileText
} from 'lucide-react';
import { CampaignCategory } from '../types';

interface AdminDashboardModalProps {
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ onClose }) => {
  const { 
    campaigns, 
    pendingRequests, 
    approveRequestToCampaign, 
    rejectHelpRequest,
    toggleCampaignUrgency,
    verifyBeneficiaryAccount,
    disburseCampaignTranche,
    postCampaignUpdate,
    userDonations,
    totalFundsRaised,
    totalPlatformEscrowHeld
  } = useApp();

  const [activeTab, setActiveTab] = useState<'review_requests' | 'manage_campaigns' | 'disburse_tranches' | 'audit_log'>('review_requests');

  // Tranche disbursement form state
  const [selectedDisburseCampId, setSelectedDisburseCampId] = useState(campaigns[0]?.id || '');
  const [disburseAmount, setDisburseAmount] = useState<number>(25000);
  const [disburseNote, setDisburseNote] = useState<string>('Pre-authorized hospital bill tranche 1 clearance');

  // Campaign update form state
  const [updateCampId, setUpdateCampId] = useState(campaigns[0]?.id || '');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDesc, setUpdateDesc] = useState('');
  const [updateAmountUsed, setUpdateAmountUsed] = useState<number>(0);

  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const handleApprove = (reqId: string, category: CampaignCategory, urgent: boolean) => {
    approveRequestToCampaign(reqId, category, urgent);
    showFeedback('Campaign approved and published to live website!');
  };

  const handleReject = (reqId: string) => {
    const reason = prompt('Please specify verification reason (e.g., Unverifiable hospital IP record, missing physician NOC):', 'Missing IP registration records');
    if (reason) {
      rejectHelpRequest(reqId, reason);
      showFeedback('Request rejected and flagged in audit ledger.');
    }
  };

  const handleDisburse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDisburseCampId || disburseAmount <= 0) return;
    disburseCampaignTranche(selectedDisburseCampId, disburseAmount, disburseNote);
    showFeedback(`Disbursed ₹${disburseAmount.toLocaleString('en-IN')} tranche to hospital escrow.`);
    setDisburseAmount(25000);
  };

  const handlePostUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateCampId || !updateTitle) return;
    postCampaignUpdate(updateCampId, updateTitle, updateDesc, Number(updateAmountUsed));
    showFeedback('Transparent update and medical progress logged to campaign!');
    setUpdateTitle('');
    setUpdateDesc('');
    setUpdateAmountUsed(0);
  };

  const pendingCount = pendingRequests.filter(r => r.status === 'pending_verification').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 border border-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-black text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold leading-tight">
                Sahayata Verification Desk & Coordinator Console
              </h3>
              <p className="text-xs text-zinc-300">
                Auditing requests, validating medical documents & controlling escrow disbursements
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Feedback notification */}
        {actionSuccessMsg && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {actionSuccessMsg}
            </span>
            <button onClick={() => setActionSuccessMsg(null)} className="text-white hover:text-zinc-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tab Controls */}
        <div className="bg-zinc-100 border-b border-zinc-200 px-4 flex items-center gap-2 overflow-x-auto text-xs font-medium py-2">
          <button
            onClick={() => setActiveTab('review_requests')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 min-h-[38px] ${
              activeTab === 'review_requests'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            <span>Review Help Requests</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[10px]">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('manage_campaigns')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap min-h-[38px] ${
              activeTab === 'manage_campaigns'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            Manage Active Campaigns ({campaigns.length})
          </button>

          <button
            onClick={() => setActiveTab('disburse_tranches')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap min-h-[38px] ${
              activeTab === 'disburse_tranches'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            Escrow Fund Disbursement
          </button>

          <button
            onClick={() => setActiveTab('audit_log')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap min-h-[38px] ${
              activeTab === 'audit_log'
                ? 'bg-white text-black font-bold shadow-xs'
                : 'text-zinc-600 hover:text-black'
            }`}
          >
            Audit Log & Fraud Prevention
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* TAB 1: Review Requests */}
          {activeTab === 'review_requests' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-black">
                    Incoming Emergency Help Submissions
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Verify applicant identity, hospital admission numbers, and physician cost certifications
                  </p>
                </div>
                <span className="text-xs text-zinc-500 font-data">
                  {pendingRequests.length} total applications on record
                </span>
              </div>

              {pendingRequests.length === 0 ? (
                <div className="p-8 text-center text-sm text-zinc-500 bg-zinc-50 rounded-xl">
                  No pending requests in queue.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 sm:p-5 bg-white rounded-xl border border-zinc-200 shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-black">
                              {req.beneficiaryName}
                            </span>
                            <span className="text-xs text-zinc-500 font-data">
                              (Submitted by: {req.applicantName}, {req.relation})
                            </span>
                            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                              req.status === 'pending_verification'
                                ? 'bg-emerald-100 text-emerald-800'
                                : req.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {req.status.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="text-xs text-zinc-500 mt-1">
                            {req.location.city}, {req.location.state} · Phone: {req.phone} · Email: {req.email}
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <div className="text-base font-bold font-data text-black">
                            ₹{req.amountRequired.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] font-semibold text-rose-700 uppercase">
                            {req.urgency} urgency
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-lg">
                        {req.description}
                      </p>

                      {/* Attached Documents */}
                      <div className="text-xs">
                        <div className="font-semibold text-zinc-700 mb-1">Attached Verification Documents:</div>
                        <div className="flex flex-wrap gap-2">
                          {req.documents.map((d, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded text-zinc-800 flex items-center gap-1 font-data text-[11px]"
                            >
                              <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                              {d.name} ({d.size})
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Payout verification */}
                      <div className="text-xs text-zinc-600 flex items-center justify-between pt-1">
                        <div>
                          Direct Escrow: <strong className="text-zinc-800">{req.payoutInfo.bankName}</strong> ({req.payoutInfo.ifscOrUpi})
                        </div>
                        <span className="text-zinc-400 font-data">
                          {new Date(req.submittedAt).toLocaleString()}
                        </span>
                      </div>

                      {/* Action buttons if pending */}
                      {req.status === 'pending_verification' && (
                        <div className="pt-2 flex items-center justify-end gap-2 border-t border-zinc-100">
                          <button
                            onClick={() => handleReject(req.id)}
                            className="px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors"
                          >
                            Flag / Reject
                          </button>
                          <button
                            onClick={() => handleApprove(req.id, req.category, false)}
                            className="px-4 py-1.5 text-xs bg-black hover:bg-zinc-800 text-white rounded-lg font-medium transition-colors"
                          >
                            Approve Standard Case
                          </button>
                          <button
                            onClick={() => handleApprove(req.id, req.category, true)}
                            className="px-4 py-1.5 text-xs bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition-colors flex items-center gap-1"
                          >
                            <Flame className="w-3.5 h-3.5" />
                            <span>Approve as URGENT (24-48h)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Manage Active Campaigns */}
          {activeTab === 'manage_campaigns' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-black">
                Active Campaigns & Priority Controls
              </h4>

              <div className="border border-zinc-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-100 text-zinc-700 font-semibold border-b border-zinc-200">
                    <tr>
                      <th className="py-2.5 px-3">Title / Beneficiary</th>
                      <th className="py-2.5 px-3">Goal</th>
                      <th className="py-2.5 px-3">Raised</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Emergency Urgency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-normal">
                    {campaigns.map((camp) => (
                      <tr key={camp.id} className="hover:bg-zinc-50">
                        <td className="py-3 px-3">
                          <div className="font-semibold text-black">{camp.title}</div>
                          <div className="text-xs text-zinc-500">{camp.beneficiaryName} · {camp.location.city}</div>
                        </td>
                        <td className="py-3 px-3 font-data tabular-nums text-zinc-700">
                          ₹{camp.amountRequired.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3 font-data tabular-nums text-emerald-700 font-semibold">
                          ₹{camp.amountRaised.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded ${
                            camp.status === 'urgent'
                              ? 'bg-rose-100 text-rose-800'
                              : camp.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-zinc-100 text-zinc-800'
                          }`}>
                            {camp.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => toggleCampaignUrgency(camp.id)}
                            className={`px-3 py-1 text-xs rounded-lg font-medium transition-colors ${
                              camp.status === 'urgent'
                                ? 'bg-rose-600 text-white'
                                : 'bg-zinc-100 text-zinc-700 hover:bg-rose-50 hover:text-rose-700'
                            }`}
                          >
                            {camp.status === 'urgent' ? 'Marked URGENT (Click to unset)' : 'Prioritize as Urgent'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Escrow Fund Disbursement & Post Updates */}
          {activeTab === 'disburse_tranches' && (
            <div className="space-y-6">
              {/* Architecture Explanation Banner */}
              <div className="p-4 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white rounded-2xl shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Platform Escrow & Staged Beneficiary Disbursal Architecture
                    </span>
                  </div>
                  <span className="text-[11px] bg-white/10 px-2.5 py-0.5 rounded-full font-data text-zinc-200">
                    Sahayata Central Vault
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong>Staged Disbursal Flow:</strong> 1. Platform first collects and safeguards donations in Escrow ➔ 2. Platform verifies beneficiary bank account & clinical identity (Penny-Drop Test) ➔ 3. Platform wires funds directly to the verified beneficiary with generated Bank UTR receipt.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <div className="text-zinc-400 text-[11px]">Total Received by Platform</div>
                    <div className="text-sm font-bold font-data text-white">
                      ₹{totalFundsRaised.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-2.5 bg-emerald-500/15 rounded-xl border border-emerald-500/30">
                    <div className="text-emerald-300 text-[11px]">Funds in Platform Escrow</div>
                    <div className="text-sm font-bold font-data text-emerald-400">
                      ₹{totalPlatformEscrowHeld.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="p-2.5 bg-sky-500/15 rounded-xl border border-sky-500/30">
                    <div className="text-sky-300 text-[11px]">Sent to Verified Beneficiaries</div>
                    <div className="text-sm font-bold font-data text-sky-400">
                      ₹{campaigns.reduce((a, b) => a + b.amountUsed, 0).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Beneficiary Bank Account Status & Verification Card */}
              {(() => {
                const selCamp = campaigns.find(c => c.id === selectedDisburseCampId) || campaigns[0];
                const bank = selCamp?.beneficiaryBankAccount;
                const isVerified = bank?.verificationStatus === 'verified_by_platform';
                const escrowBalance = Math.max(0, selCamp.amountRaised - selCamp.amountUsed);

                return (
                  <div className="p-4 sm:p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500">
                          Step 2: Beneficiary Bank Verification Status
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-black mt-0.5">
                          {selCamp.title}
                        </h4>
                        <div className="text-xs text-zinc-600 mt-1">
                          Beneficiary: <strong className="text-zinc-800">{selCamp.beneficiaryName}</strong> · Available in Platform Escrow: <span className="font-bold text-emerald-700 font-data">₹{escrowBalance.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isVerified ? (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-semibold border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Bank Account Verified</span>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              verifyBeneficiaryAccount(selCamp.id);
                              showFeedback(`Bank account for ${selCamp.beneficiaryName} verified via automated Penny-Drop test!`);
                            }}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Verify Beneficiary Account Now</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Bank Account Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                      <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
                        <span className="text-[10px] text-zinc-400 block uppercase">Bank Name</span>
                        <span className="font-semibold text-zinc-800 truncate block">
                          {bank?.bankName || 'Direct Escrow'}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
                        <span className="text-[10px] text-zinc-400 block uppercase">Account Number</span>
                        <span className="font-data font-semibold text-zinc-800 block">
                          {bank?.accountNumberMasked || selCamp.bankDetailsMasked}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
                        <span className="text-[10px] text-zinc-400 block uppercase">IFSC Code</span>
                        <span className="font-data font-semibold text-zinc-800 block">
                          {bank?.ifscCode || 'HDFC0001092'}
                        </span>
                      </div>
                      <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
                        <span className="text-[10px] text-zinc-400 block uppercase">Verification Status</span>
                        <span className={`font-data text-[11px] font-semibold truncate block ${isVerified ? 'text-emerald-700' : 'text-emerald-700'}`}>
                          {isVerified ? (bank?.pennyDropRef || 'Verified OK') : 'Pending Verification'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form 1: Disburse Tranche from Platform to Beneficiary */}
                <form onSubmit={handleDisburse} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-bold text-black">
                        Step 3: Send Funds from Platform to Beneficiary
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        Wire escrow money directly to verified hospital/beneficiary account with bank UTR.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Target Campaign</label>
                    <select
                      value={selectedDisburseCampId}
                      onChange={(e) => setSelectedDisburseCampId(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black font-medium"
                    >
                      {campaigns.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.beneficiaryName} (Escrow: ₹{(c.amountRaised - c.amountUsed).toLocaleString('en-IN')})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Disbursement Amount (₹)</label>
                    <input
                      type="number"
                      required
                      min="1000"
                      step="500"
                      value={disburseAmount}
                      onChange={(e) => setDisburseAmount(Number(e.target.value))}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-data font-bold text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Bank Audit Note & Purpose</label>
                    <input
                      type="text"
                      required
                      value={disburseNote}
                      onChange={(e) => setDisburseNote(e.target.value)}
                      placeholder="e.g. Paid to City Life PICU billing desk for surgery clearance"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Send Funds to Beneficiary & Generate Bank UTR</span>
                  </button>
                </form>

                {/* Form 2: Post Public Update */}
                <form onSubmit={handlePostUpdate} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-zinc-700" />
                    <div>
                      <h4 className="text-sm font-bold text-black">
                        Post Transparent Patient Update
                      </h4>
                      <p className="text-[11px] text-zinc-500">
                        Notify donors about surgical outcomes, recovery milestones, and proof of care.
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Target Campaign</label>
                    <select
                      value={updateCampId}
                      onChange={(e) => setUpdateCampId(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black"
                    >
                      {campaigns.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.beneficiaryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Update Title</label>
                    <input
                      type="text"
                      required
                      value={updateTitle}
                      onChange={(e) => setUpdateTitle(e.target.value)}
                      placeholder="e.g. Successful surgery completed, patient shifted to ward"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Details & Doctor Remarks</label>
                    <textarea
                      rows={2}
                      required
                      value={updateDesc}
                      onChange={(e) => setUpdateDesc(e.target.value)}
                      placeholder="Doctor reported vital stability. Post-operative antibiotics prescribed..."
                      className="w-full bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-black hover:bg-zinc-800 text-white font-semibold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    Publish Update to Donors & Timeline
                  </button>
                </form>
              </div>

              {/* Disbursals Audit Ledger */}
              {(() => {
                const selCamp = campaigns.find(c => c.id === selectedDisburseCampId) || campaigns[0];
                const disbursals = selCamp?.beneficiaryBankAccount?.disbursals || [];

                return (
                  <div className="p-4 sm:p-5 bg-white rounded-2xl border border-zinc-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs sm:text-sm font-bold text-black">
                        Platform Disbursal History for {selCamp.beneficiaryName} ({disbursals.length} wires)
                      </h4>
                      <span className="text-[11px] text-zinc-500 font-data">
                        Direct NEFT/RTGS Wires
                      </span>
                    </div>

                    {disbursals.length === 0 ? (
                      <p className="text-xs text-zinc-500 italic p-4 text-center bg-zinc-50 rounded-xl">
                        No disbursements executed yet for this case. Verify account and wire funds above.
                      </p>
                    ) : (
                      <div className="border border-zinc-200 rounded-xl overflow-hidden">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-zinc-50 text-zinc-600 font-semibold border-b border-zinc-200">
                            <tr>
                              <th className="py-2 px-3">Bank UTR</th>
                              <th className="py-2 px-3">Date</th>
                              <th className="py-2 px-3">Recipient Account</th>
                              <th className="py-2 px-3">Amount</th>
                              <th className="py-2 px-3">Purpose</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-100 font-normal">
                            {disbursals.map((d) => (
                              <tr key={d.id} className="hover:bg-zinc-50">
                                <td className="py-2 px-3 font-data font-bold text-emerald-800">{d.utrNumber}</td>
                                <td className="py-2 px-3 text-zinc-500 font-data">{new Date(d.timestamp).toLocaleDateString()}</td>
                                <td className="py-2 px-3 text-zinc-700">{d.recipientAccountMasked}</td>
                                <td className="py-2 px-3 font-data font-bold text-black">₹{d.amount.toLocaleString('en-IN')}</td>
                                <td className="py-2 px-3 text-zinc-600 max-w-xs truncate">{d.purpose}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* TAB 4: Audit Log & Fraud Prevention Rules */}
          {activeTab === 'audit_log' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Sahayata Verification & Anti-Fraud Constitution</span>
                </div>
                <ul className="text-xs text-amber-950 space-y-1.5 list-disc list-inside mt-2">
                  <li>Mandatory inpatient IP registration verification with accredited hospitals.</li>
                  <li>Zero personal wallet transfers. Payouts must have dual-signatory escrow accounts.</li>
                  <li>Physical field visit conducted by regional coordinators for cases exceeding ₹50,000.</li>
                  <li>Tax deduction 80G receipts automatically reconciled with PAN records.</li>
                </ul>
              </div>

              <h4 className="text-sm font-bold text-black pt-2">
                Recent Ledger Transactions ({userDonations.length} total)
              </h4>
              <div className="space-y-2 text-xs">
                {userDonations.slice(0, 5).map((don) => (
                  <div key={don.id} className="p-3 bg-zinc-50 rounded-lg flex items-center justify-between font-data">
                    <div>
                      <span className="font-bold text-black">{don.transactionId}</span>
                      <span className="text-zinc-500 ml-2">→ {don.campaignTitle.slice(0, 35)}...</span>
                    </div>
                    <span className="font-bold text-emerald-700">₹{don.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-zinc-100 px-5 py-3 border-t border-zinc-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-black hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors"
          >
            Exit Coordinator Console
          </button>
        </div>
      </div>
    </div>
  );
};
