import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  HeartHandshake, 
  ShieldCheck, 
  Download, 
  Receipt, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Building
} from 'lucide-react';

interface DonorDashboardModalProps {
  onClose: () => void;
}

export const DonorDashboardModal: React.FC<DonorDashboardModalProps> = ({ onClose }) => {
  const { userDonations, campaigns, openDetailModal } = useApp();

  const totalDonated = userDonations.reduce((sum, d) => sum + d.amount, 0);
  const uniqueCasesCount = new Set(userDonations.map(d => d.campaignId)).size;
  const activeCasesCount = userDonations.filter(d => {
    const c = campaigns.find(camp => camp.id === d.campaignId);
    return c && c.status !== 'completed';
  }).length;

  const handleDownloadReceipt = (receiptNo: string, amount: number) => {
    alert(`Downloading Official 80G Tax Exemption Certificate for Receipt #${receiptNo} (₹${amount.toLocaleString('en-IN')})`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-stone-50 px-5 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-tight">
                My Donor Impact & Receipts
              </h3>
              <p className="text-xs text-stone-500">
                Track every rupee you contributed and see verified patient updates
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 lg:p-8 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Impact Scorecard */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Your Direct Humanitarian Impact
              </span>
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Tax Deductible (80G)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="text-xs text-stone-500">Total Donated</div>
                <div className="text-2xl font-bold font-data tabular-nums text-stone-900 mt-1">
                  ₹{totalDonated.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Across {userDonations.length} transactions</div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="text-xs text-stone-500">People / Crises Supported</div>
                <div className="text-2xl font-bold font-data tabular-nums text-amber-700 mt-1">
                  {uniqueCasesCount} Cases
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Direct verified beneficiaries</div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-stone-200">
                <div className="text-xs text-stone-500">Active Cases Supported</div>
                <div className="text-2xl font-bold font-data tabular-nums text-emerald-700 mt-1">
                  {activeCasesCount} Active
                </div>
                <div className="text-[11px] text-stone-400 mt-0.5">Currently receiving relief</div>
              </div>
            </div>
          </div>

          {/* Donation History with Receipts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-stone-900">
                Donation History & Printable 80G Receipts
              </h4>
              <span className="text-xs text-stone-500 font-data">
                {userDonations.length} contributions
              </span>
            </div>

            {userDonations.length === 0 ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
                <p className="text-sm text-stone-600">You haven't made any donations yet.</p>
                <p className="text-xs text-stone-400 mt-1">
                  Choose a verified emergency case on the home page to start your impact.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {userDonations.map((don) => {
                  const camp = campaigns.find(c => c.id === don.campaignId);

                  return (
                    <div
                      key={don.id}
                      className="p-4 bg-white rounded-xl border border-stone-200 hover:border-stone-300 transition-colors shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                        <div>
                          <div className="text-xs font-semibold text-stone-900">
                            {don.campaignTitle}
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            Beneficiary: <strong className="text-stone-800">{don.beneficiaryName}</strong>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <div className="text-base font-bold font-data tabular-nums text-stone-900">
                            ₹{don.amount.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-stone-500 font-data">
                            {new Date(don.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Where your specific donation went */}
                      <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="text-stone-500 font-medium">Your Rupee Allocation:</div>
                          <div className="flex flex-wrap gap-2 text-[11px] font-data text-stone-700">
                            {don.allocatedItems.map((alloc, idx) => (
                              <span key={idx} className="bg-stone-100 px-2 py-0.5 rounded text-stone-800">
                                {alloc.item}: ₹{alloc.amount.toLocaleString('en-IN')}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {camp && (
                            <button
                              onClick={() => {
                                onClose();
                                openDetailModal(camp);
                              }}
                              className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                            >
                              <span>View Case</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDownloadReceipt(don.receiptNumber, don.amount)}
                            className="px-2.5 py-1.5 border border-stone-300 hover:bg-stone-50 text-stone-800 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                            title="Download Official 80G Receipt"
                          >
                            <Download className="w-3 h-3" />
                            <span>80G Receipt</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Transparency note */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200/80 text-xs text-stone-700 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-950 block">Audited Escrow Guarantee:</span>
              Sahayata holds zero donation commissions. Every rupee contributed through this portal is disbursed directly to hospital billing desks, pharmacy distributors, or wholesale ration hubs with GST-verified receipts.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-5 py-3 border-t border-stone-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
