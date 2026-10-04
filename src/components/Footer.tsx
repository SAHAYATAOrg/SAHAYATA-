import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, HeartHandshake, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveModal, openDonateModal } = useApp();

  return (
    <footer className="bg-black text-zinc-300 pt-12 pb-20 md:pb-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                S
              </div>
              <span className="text-xl font-editorial font-bold text-white tracking-tight">
                Sahayata
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              “When someone is in need, make it easier for someone else to help.”
              A transparent, 100% verified emergency aid network connecting ordinary people with urgent human crises.
            </p>

            <div className="text-xs text-emerald-400 font-semibold tracking-wider uppercase pt-1">
              HELP · TRUST · TRANSPARENCY · IMPACT
            </div>

            <div className="pt-2 text-xs text-zinc-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-zinc-500" />
                <span>24/7 Verification Helpline: +91 (800) 425-7242</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-500" />
                <span>emergency-desk@sahayata-network.org</span>
              </div>
            </div>
          </div>

          {/* Types of Help */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Categories of Help
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li><a href="#all-campaigns" className="hover:text-white transition-colors">Emergency Medical & Surgery</a></li>
              <li><a href="#all-campaigns" className="hover:text-white transition-colors">Food Support for Hungry</a></li>
              <li><a href="#all-campaigns" className="hover:text-white transition-colors">Shelter & Homeless Relief</a></li>
              <li><a href="#all-campaigns" className="hover:text-white transition-colors">Floods & Disaster Relief</a></li>
              <li><a href="#all-campaigns" className="hover:text-white transition-colors">Fire Accidents & Burns</a></li>
              <li><a href="#all-campaigns" className="hover:text-white transition-colors">Critical Family Emergencies</a></li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Direct Actions
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <button onClick={() => openDonateModal(null)} className="hover:text-white transition-colors text-left">
                  Donate to Urgent Need
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('request_help')} className="hover:text-white transition-colors text-left">
                  I Need Emergency Help
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('where_donations_go')} className="hover:text-white transition-colors text-left">
                  Where Did My Donation Go?
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('my_impact')} className="hover:text-white transition-colors text-left">
                  Donor Dashboard & Receipts
                </button>
              </li>
              <li>
                <button onClick={() => setActiveModal('admin')} className="hover:text-white transition-colors text-left">
                  Verification Coordinator Desk
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Trust & Security
            </h4>
            <div className="space-y-2 text-xs text-zinc-400 leading-relaxed">
              <p className="flex items-center gap-1.5 text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>0% Platform Commission</span>
              </p>
              <p>Direct Hospital & Vendor Escrow. No personal wallet wire transfers.</p>
              <p>Reconciled 80G Indian Income Tax Deduction Certificates provided for all contributions.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <p>© {new Date().getFullYear()} Sahayata Humanitarian Help Network. Non-profit emergency trust.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-zinc-300 cursor-pointer">Verification Protocol</span>
            <span>·</span>
            <span className="hover:text-zinc-300 cursor-pointer">Financial Ledger</span>
            <span>·</span>
            <span className="hover:text-zinc-300 cursor-pointer">Privacy & Dignity Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
