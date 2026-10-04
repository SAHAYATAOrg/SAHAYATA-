import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Receipt, ArrowRight, Building, CheckCircle2, FileText, HelpCircle } from 'lucide-react';

export const WhereDonationGoesLedger: React.FC = () => {
  const { campaigns, openDonateModal } = useApp();
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(campaigns[0]?.id || '');
  const [simulationAmount, setSimulationAmount] = useState<number>(1000);

  const selectedCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  // Dynamic calculation for "Where did my donation go?"
  // Example from brief: ₹1,000 donated → ₹600 hospital bill → ₹250 medicines → ₹150 remaining requirement
  const hospitalShare = Math.round(simulationAmount * 0.60);
  const medicineShare = Math.round(simulationAmount * 0.25);
  const remainingShare = simulationAmount - hospitalShare - medicineShare;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-8">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Complete Financial Transparency Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-black">
          “Where did my donation go?”
        </h2>
        <p className="mt-2 text-sm text-zinc-600 leading-relaxed">
          Unlike traditional charities with obscure overheads, Sahayata is an open ledger. We track every single rupee from donor payment to hospital bill clearance, with direct verification tokens.
        </p>
      </div>

      {/* Interactive Simulator Box */}
      <div className="mt-6 sm:mt-8 p-5 sm:p-6 bg-white rounded-2xl border border-zinc-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1.5">
                Select Case / Emergency Fund
              </label>
              <select
                value={selectedCampaignId}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-black focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title.length > 50 ? c.title.slice(0, 50) + '...' : c.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-black uppercase tracking-wide mb-1.5">
                Simulate Donation Amount (₹)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[500, 1000, 2500, 5000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSimulationAmount(amt)}
                    className={`py-2 text-xs font-data font-semibold rounded-lg border transition-all ${
                      simulationAmount === amt
                        ? 'bg-black text-white border-black shadow-sm'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:border-emerald-600 hover:text-emerald-700'
                    }`}
                  >
                    ₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min="100"
                step="100"
                value={simulationAmount}
                onChange={(e) => setSimulationAmount(Math.max(10, Number(e.target.value)))}
                className="w-full bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm font-data font-bold text-black focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Enter custom amount"
              />
            </div>
          </div>

          {/* Breakdown Visualizer */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
            <div className="flex items-baseline justify-between border-b border-zinc-100 pb-3 mb-4">
              <span className="text-xs uppercase tracking-wide text-zinc-500 font-semibold">
                Simulated Contribution
              </span>
              <span className="text-xl font-bold font-data tabular-nums text-black">
                ₹{simulationAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Rupee-for-Rupee Flow */}
            <div className="space-y-3">
              <div className="flex items-start justify-between p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    →
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-black">
                      Direct Medical / Hospital Bill
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Paid directly to accredited institution: {selectedCampaign?.verificationDetails?.hospitalOrOrg?.split(',')[0]}
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold font-data text-emerald-800 tabular-nums">
                  ₹{hospitalShare.toLocaleString('en-IN')} (60%)
                </span>
              </div>

              <div className="flex items-start justify-between p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    →
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-black">
                      Essential Medicines & Consumables
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Prescription pharmaceuticals, IV fluids & diagnostics
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold font-data text-zinc-800 tabular-nums">
                  ₹{medicineShare.toLocaleString('en-IN')} (25%)
                </span>
              </div>

              <div className="flex items-start justify-between p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    →
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-black">
                      Target Goal & Follow-up Recovery Reserve
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      Held in audited ESCROW until milestone invoice verification
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold font-data text-emerald-800 tabular-nums">
                  ₹{remainingShare.toLocaleString('en-IN')} (15%)
                </span>
              </div>
            </div>

            {/* Zero Platform Fee Guarantee */}
            <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> 0% Platform Commission
              </span>
              <button
                onClick={() => openDonateModal(selectedCampaign)}
                className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 text-xs"
              >
                Donate this amount now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Steps: Platform Escrow & Verification Architecture */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
        <div className="p-4 bg-white rounded-xl border border-zinc-200">
          <div className="text-xs font-bold uppercase text-black mb-1 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">1</span>
            <span>Platform Receives Funds First</span>
          </div>
          <h4 className="text-sm font-bold text-black mt-1">Central Platform Escrow Vault</h4>
          <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
            All donor contributions arrive first into Sahayata’s audited central platform escrow. No money is sent out immediately or prematurely.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-zinc-200">
          <div className="text-xs font-bold uppercase text-emerald-700 mb-1 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span>Platform Verifies Beneficiary Account</span>
          </div>
          <h4 className="text-sm font-bold text-black mt-1">Penny-Drop & KYC Validation</h4>
          <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
            Our compliance desk executes automated ₹1 bank validation to verify account holder name, IFSC, Aadhaar/PAN, and hospital billing desk accreditation.
          </p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-zinc-200">
          <div className="text-xs font-bold uppercase text-emerald-700 mb-1 flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[10px]">3</span>
            <span>Platform Sends Money to Beneficiary</span>
          </div>
          <h4 className="text-sm font-bold text-black mt-1">Staged Disbursals with Bank UTR</h4>
          <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
            Once verified, the platform wires funds directly to the hospital or beneficiary in milestone tranches, publishing official Bank UTR numbers on the public ledger.
          </p>
        </div>
      </div>
    </div>
  );
};
