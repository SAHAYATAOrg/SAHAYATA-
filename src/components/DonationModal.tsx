import React, { useState } from 'react';
import { Campaign, DonationRecord } from '../types';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Smartphone, 
  Building2, 
  User, 
  Lock,
  ArrowRight,
  Download,
  FileText
} from 'lucide-react';

interface DonationModalProps {
  initialCampaign: Campaign | null;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ initialCampaign, onClose }) => {
  const { campaigns, processDonation, setActiveModal, donationInitialAmount } = useApp();

  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    initialCampaign ? initialCampaign.id : (campaigns[0]?.id || '')
  );
  const [targetType, setTargetType] = useState<'case' | 'general' | 'category'>(
    initialCampaign ? 'case' : 'general'
  );

  const [amount, setAmount] = useState<number>(donationInitialAmount || 50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'other'>('gpay');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedRecord, setCompletedRecord] = useState<DonationRecord | null>(null);

  const activeTargetCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  const currentAmount = customAmount ? Number(customAmount) : amount;

  // Live itemized projection
  const hospitalShare = Math.round(currentAmount * 0.65);
  const medsShare = Math.round(currentAmount * 0.25);
  const bufferShare = currentAmount - hospitalShare - medsShare;

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 50) return;

    setIsProcessing(true);

    setTimeout(() => {
      const record = processDonation({
        campaignId: targetType === 'case' ? activeTargetCampaign?.id : undefined,
        amount: currentAmount,
        donorName: isAnonymous ? 'Anonymous' : (donorName || 'Generous Supporter'),
        donorPhone: donorPhone || '+91 98765 43210',
        isAnonymous,
        paymentMethod
      });
      setIsProcessing(false);
      setCompletedRecord(record);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 border border-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-white px-5 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-black leading-tight">
                {completedRecord ? 'Donation Confirmed' : 'Make an Emergency Donation'}
              </h3>
              <p className="text-xs text-zinc-500">
                100% directly transferred to verified hospital & vendor escrow
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!completedRecord ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
            {/* Target Choice Segment */}
            <div>
              <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-2">
                Donate To
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-zinc-100 rounded-xl mb-3">
                <button
                  type="button"
                  onClick={() => setTargetType('case')}
                  className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                    targetType === 'case' ? 'bg-white font-semibold text-black shadow-sm' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Specific Case
                </button>
                <button
                  type="button"
                  onClick={() => setTargetType('general')}
                  className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                    targetType === 'general' ? 'bg-white font-semibold text-black shadow-sm' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  General Emergency
                </button>
                <button
                  type="button"
                  onClick={() => setTargetType('category')}
                  className={`py-2 text-xs font-medium rounded-lg transition-colors ${
                    targetType === 'category' ? 'bg-white font-semibold text-black shadow-sm' : 'text-zinc-600 hover:text-black'
                  }`}
                >
                  Medical / Food Pool
                </button>
              </div>

              {targetType === 'case' && (
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {campaigns.filter(c => c.status !== 'completed').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.location.city})
                    </option>
                  ))}
                </select>
              )}

              {targetType === 'general' && (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-600">
                  <span className="font-semibold text-black">Rapid Response Reserve:</span> Allocated to urgent patients entering emergency rooms without time to launch a full campaign.
                </div>
              )}

              {targetType === 'category' && (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs text-zinc-600">
                  <span className="font-semibold text-black">Dedicated Category Pool:</span> Divided evenly across all active verified food, shelter, and medical campaigns.
                </div>
              )}
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-2">
                Choose Amount
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[50, 500, 1000, 2500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleAmountSelect(preset)}
                    className={`py-2.5 text-xs sm:text-sm font-data font-bold rounded-xl border transition-all ${
                      amount === preset && !customAmount
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-white text-zinc-800 border-zinc-200 hover:border-emerald-600 hover:text-emerald-700'
                    }`}
                  >
                    ₹{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-data font-bold text-zinc-500">
                  ₹
                </span>
                <input
                  type="number"
                  placeholder="Or enter any custom amount (min ₹50)"
                  value={customAmount}
                  onChange={handleCustomChange}
                  min="50"
                  className="w-full bg-white border border-zinc-300 rounded-xl pl-8 pr-3.5 py-2.5 text-sm font-data font-bold text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Platform Escrow Guarantee Banner */}
            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-zinc-800 leading-relaxed">
                <span className="font-bold text-black block mb-0.5">Platform Escrow Guarantee</span>
                Your ₹{currentAmount.toLocaleString('en-IN')} is first received and held in Sahayata’s central platform escrow vault. Funds are only wired to the beneficiary after our team verifies their KYC, hospital billing, and bank account.
              </div>
            </div>

            {/* "Where will my donation go?" Live Preview Card */}
            <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-xs space-y-1.5">
              <div className="font-semibold text-black flex items-center justify-between">
                <span>Where will your ₹{currentAmount.toLocaleString('en-IN')} go?</span>
                <span className="text-[11px] text-emerald-700 font-data font-bold">100% Verified</span>
              </div>
              <div className="text-zinc-600 flex justify-between font-data">
                <span>→ Hospital bill & clinical charges:</span>
                <span className="font-semibold text-black">₹{hospitalShare.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-zinc-600 flex justify-between font-data">
                <span>→ Prescription medicines & consumables:</span>
                <span className="font-semibold text-black">₹{medsShare.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-zinc-600 flex justify-between font-data">
                <span>→ Post-op recovery buffer:</span>
                <span className="font-semibold text-black">₹{bufferShare.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-3 pt-2 border-t border-zinc-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-black uppercase tracking-wide">
                  Your Details
                </label>
                <label className="flex items-center gap-1.5 text-xs text-zinc-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Donate Anonymously</span>
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number (for SMS / WhatsApp Receipt)"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="bg-white border border-zinc-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              )}

              {isAnonymous && (
                <p className="text-xs text-zinc-500 italic">
                  Your identity will not be shown publicly on the campaign supporters roster.
                </p>
              )}
            </div>

            {/* Payment Method */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <label className="block text-xs font-semibold text-black uppercase tracking-wide">
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Instant UPI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Debit / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-medium transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold'
                      : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>
              </div>

              {paymentMethod === 'upi' && (
                <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 flex items-center justify-around text-xs text-zinc-700">
                  <span className="font-semibold text-black">Fast UPI Options:</span>
                  <span className="px-2 py-1 bg-white border border-zinc-200 rounded font-medium">Google Pay</span>
                  <span className="px-2 py-1 bg-white border border-zinc-200 rounded font-medium">PhonePe</span>
                  <span className="px-2 py-1 bg-white border border-zinc-200 rounded font-medium">Paytm</span>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isProcessing || currentAmount < 50}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-300 text-white font-semibold text-sm sm:text-base rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 min-h-[48px]"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Secure Transfer...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Complete ₹{currentAmount.toLocaleString('en-IN')} Donation</span>
                  </>
                )}
              </button>
              <div className="mt-2 text-center text-[11px] text-zinc-500">
                Direct ESCROW · Eligible for 80G Tax Exemption Receipt · 100% Audited
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation & Receipt Screen */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                Payment Successful & Logged to Ledger
              </span>
              <h3 className="text-2xl font-bold font-editorial text-black mt-1">
                Thank you for being there.
              </h3>
              <p className="text-sm text-zinc-600 mt-1 max-w-md mx-auto">
                Your donation of <strong className="text-black font-data">₹{completedRecord.amount.toLocaleString('en-IN')}</strong> has been confirmed and placed in verified escrow for:
              </p>
              <p className="text-sm font-semibold text-emerald-800 mt-0.5">
                “{completedRecord.campaignTitle}”
              </p>
            </div>

            {/* Printable Receipt Card */}
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-zinc-200 text-left text-xs space-y-2 max-w-md mx-auto shadow-xs">
              <div className="flex justify-between border-b border-zinc-200 pb-2">
                <span className="text-zinc-500">Receipt Number</span>
                <span className="font-data font-bold text-black">{completedRecord.receiptNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Transaction Ref</span>
                <span className="font-data text-zinc-800">{completedRecord.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Beneficiary</span>
                <span className="font-medium text-black">{completedRecord.beneficiaryName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Phone Number</span>
                <span className="font-data text-zinc-800">{completedRecord.donorPhone || 'Registered Mobile'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Fund Security</span>
                <span className="font-semibold text-emerald-800 text-[11px]">
                  Held in Platform Escrow → Disbursed Post-Verification
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Date & Time</span>
                <span className="font-data text-zinc-800">
                  {new Date(completedRecord.timestamp).toLocaleDateString()} {new Date(completedRecord.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-200 font-bold">
                <span className="text-black">Total Donated</span>
                <span className="font-data text-emerald-700 text-sm">
                  ₹{completedRecord.amount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  setActiveModal('my_impact');
                }}
                className="w-full sm:w-auto px-5 py-2.5 bg-black hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors min-h-[44px]"
              >
                Track In My Impact Dashboard
              </button>

              <button
                onClick={() => {
                  alert(`Receipt ${completedRecord.receiptNumber} sent via SMS/WhatsApp to ${completedRecord.donorPhone || 'your phone number'}. Download initiated.`);
                }}
                className="w-full sm:w-auto px-4 py-2.5 border border-zinc-300 hover:bg-zinc-100 text-black font-medium text-xs sm:text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Save 80G Receipt</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
