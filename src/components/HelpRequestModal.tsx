import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CampaignCategory, UrgencyLevel } from '../types';
import { 
  X, 
  ShieldAlert, 
  UploadCloud, 
  CheckCircle2, 
  FileText, 
  Building, 
  AlertTriangle,
  Send,
  Lock
} from 'lucide-react';
import { CATEGORY_INFO } from '../data/seedData';

interface HelpRequestModalProps {
  onClose: () => void;
}

export const HelpRequestModal: React.FC<HelpRequestModalProps> = ({ onClose }) => {
  const { submitHelpRequest } = useApp();

  const [applicantName, setApplicantName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [relation, setRelation] = useState('Self');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [category, setCategory] = useState<CampaignCategory>('medical');
  const [urgency, setUrgency] = useState<UrgencyLevel>('urgent');
  const [amountRequired, setAmountRequired] = useState<number>(50000);
  const [description, setDescription] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [ifscOrUpi, setIfscOrUpi] = useState('');
  const [hospitalDirect, setHospitalDirect] = useState(true);

  // Simulated uploaded files
  const [uploadedDocs, setUploadedDocs] = useState<{ name: string; type: string; size: string }[]>([
    { name: 'Hospital_Admission_Report.pdf', type: 'PDF', size: '1.2 MB' },
    { name: 'Estimated_Cost_Certificate.pdf', type: 'PDF', size: '820 KB' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleAddSampleDoc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setUploadedDocs(prev => [
        ...prev,
        {
          name: f.name,
          type: f.name.split('.').pop()?.toUpperCase() || 'DOC',
          size: `${(f.size / 1024 / 1024).toFixed(1)} MB`
        }
      ]);
    }
  };

  const handleRemoveDoc = (index: number) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const res = submitHelpRequest({
        applicantName,
        phone,
        email,
        beneficiaryName: beneficiaryName || applicantName,
        relation,
        location: {
          city: city || 'Local Area',
          state: state || 'State'
        },
        category,
        urgency,
        amountRequired: Number(amountRequired),
        description,
        documents: uploadedDocs,
        payoutInfo: {
          bankName: bankName || 'Hospital Billing Trust Account',
          accountHolder: accountHolder || beneficiaryName || applicantName,
          ifscOrUpi: ifscOrUpi || 'VERIFIED_ESCROW_UPI',
          hospitalDirectDisbursement: hospitalDirect
        }
      });
      setIsSubmitting(false);
      setSubmittedId(res.id);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-stone-50 px-5 py-4 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-stone-900 leading-tight">
              Submit an Emergency Help Request
            </h3>
            <p className="text-xs text-stone-500">
              For yourself, a family member, hospital patient, or disaster-affected group
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!submittedId ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
            {/* Strict Notice / Verification Disclaimer */}
            <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 leading-relaxed">
                <strong className="font-semibold block mb-0.5">Important Verification Notice:</strong>
                Submitting a request does not guarantee fundraising. All requests are rigorously verified by Sahayata field coordinators and hospital desks before approval. We verify inpatient admissions, bills, and doctor notes to protect donor trust.
              </div>
            </div>

            {/* Applicant & Patient Details */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase font-bold text-stone-500">
                1. Contact & Beneficiary Info
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="youremail@example.com"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Relationship to Beneficiary</label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Self">Self (I am the patient/person in need)</option>
                    <option value="Parent">Parent (for my child)</option>
                    <option value="Child">Child (for my elderly parent)</option>
                    <option value="Spouse">Spouse / Partner</option>
                    <option value="Volunteer">Authorized Volunteer / Field Social Worker</option>
                    <option value="NGO Representative">NGO / Community Trust Coordinator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Hyderabad"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="e.g. Telangana"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Emergency Category & Urgency */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <h4 className="text-xs uppercase font-bold text-stone-500">
                2. Emergency Classification & Urgency
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category of Assistance *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CampaignCategory)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="medical">🏥 Emergency Medical & Surgery</option>
                    <option value="medicines">💊 Vital Medicines & Dialysis</option>
                    <option value="food">🍚 Food Support for Hungry & Destitute</option>
                    <option value="shelter">🛏️ Emergency Shelter / Warm Beds</option>
                    <option value="disaster">🌊 Flood, Cyclone, Natural Disaster</option>
                    <option value="fire">🔥 Fire Accident & Emergency Burn Aid</option>
                    <option value="family">👨‍👩‍👧 Critical Family Emergency</option>
                    <option value="humanitarian">🆘 Other Urgent Humanitarian Need</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Emergency Urgency Level *</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as UrgencyLevel)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    <option value="critical">🚨 Critical (Procedure required in 12-24 hours)</option>
                    <option value="urgent">⚠️ Urgent (Support required within 48-72 hours)</option>
                    <option value="standard">⏳ Standard (Ongoing care / within 1-2 weeks)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Total Verified Amount Required (₹) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-data font-bold text-stone-500">₹</span>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="500"
                    value={amountRequired}
                    onChange={(e) => setAmountRequired(Number(e.target.value))}
                    className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm font-data font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Detailed Situation Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain what happened, current medical condition, doctor's recommendations, financial standing, and why immediate public help is required..."
                  className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                />
              </div>
            </div>

            {/* Document Upload Simulation */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase font-bold text-stone-500">
                  3. Supporting Documents & Photos
                </h4>
                <span className="text-[11px] text-stone-500">Hospital bills, ID, treatment estimate</span>
              </div>

              <div className="border-2 border-dashed border-stone-300 rounded-xl p-4 text-center hover:border-stone-400 transition-colors bg-stone-50/50">
                <UploadCloud className="w-6 h-6 text-stone-400 mx-auto mb-1" />
                <label className="cursor-pointer text-xs font-semibold text-amber-700 hover:text-amber-800">
                  <span>Click to select supporting document or bill</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAddSampleDoc}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
                <p className="text-[11px] text-stone-500 mt-1">PDF, JPG, PNG up to 10MB each</p>
              </div>

              {/* Uploaded List */}
              <div className="space-y-2">
                {uploadedDocs.map((doc, idx) => (
                  <div key={idx} className="p-2.5 bg-stone-100 rounded-lg flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-stone-800">
                      <FileText className="w-4 h-4 text-stone-500" />
                      <span className="font-medium">{doc.name}</span>
                      <span className="text-stone-400">({doc.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveDoc(idx)}
                      className="text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Payout Verification Info */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <h4 className="text-xs uppercase font-bold text-stone-500">
                4. Direct Disbursement & Bank ESCROW
              </h4>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
                <label className="flex items-center gap-2 text-stone-800 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hospitalDirect}
                    onChange={(e) => setHospitalDirect(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>Disburse directly to Hospital / Institution Billing Account (Recommended)</span>
                </label>
                <p className="text-stone-500 text-[11px] pl-5">
                  Direct disbursements to accredited hospital accounts receive priority verification and higher donor trust.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Hospital / Institution / Bank Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="e.g. City Life Hospital Patients Account"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    IFSC Code or UPI ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={ifscOrUpi}
                    onChange={(e) => setIfscOrUpi(e.target.value)}
                    placeholder="e.g. HDFC0001824 or hospital@upi"
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-stone-200">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-stone-300 text-white font-semibold text-sm sm:text-base rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 min-h-[48px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting for Verification...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Help Request for Verification</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Submission Success Screen */
          <div className="p-6 sm:p-8 space-y-5 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold text-emerald-800 tracking-wider">
                Application Received · Verification Initiated
              </span>
              <h3 className="text-2xl font-bold font-editorial text-stone-900 mt-1">
                Your request is in our verification queue.
              </h3>
              <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
                Request Reference ID: <strong className="font-data text-stone-900">#{submittedId}</strong>.
              </p>
              <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                A volunteer verification coordinator has been alerted to review the attached medical records and contact the treating physician. You can also view this in the Verification Portal.
              </p>
            </div>

            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-colors min-h-[44px]"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
