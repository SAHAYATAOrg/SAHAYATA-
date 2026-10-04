import React, { createContext, useContext, useState, useEffect } from 'react';
import { Campaign, DonationRecord, HelpRequestSubmission, CampaignCategory } from '../types';
import { INITIAL_CAMPAIGNS, INITIAL_USER_DONATIONS, INITIAL_PENDING_REQUESTS } from '../data/seedData';

interface AppContextType {
  campaigns: Campaign[];
  userDonations: DonationRecord[];
  pendingRequests: HelpRequestSubmission[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  activeModal: 'donate' | 'request_help' | 'detail' | 'my_impact' | 'admin' | 'where_donations_go' | null;
  setActiveModal: (modal: 'donate' | 'request_help' | 'detail' | 'my_impact' | 'admin' | 'where_donations_go' | null) => void;
  activeCampaign: Campaign | null;
  setActiveCampaign: (camp: Campaign | null) => void;
  donationInitialAmount: number;
  openDonateModal: (campaign?: Campaign | null, initialAmount?: number) => void;
  openDetailModal: (campaign: Campaign) => void;
  processDonation: (data: {
    campaignId?: string;
    amount: number;
    donorName: string;
    donorPhone?: string;
    donorEmail?: string;
    isAnonymous: boolean;
    paymentMethod: 'upi' | 'card' | 'netbanking';
  }) => DonationRecord;
  submitHelpRequest: (request: Omit<HelpRequestSubmission, 'id' | 'submittedAt' | 'status'>) => HelpRequestSubmission;
  approveRequestToCampaign: (requestId: string, category: CampaignCategory, urgent: boolean) => void;
  rejectHelpRequest: (requestId: string, reason: string) => void;
  toggleCampaignUrgency: (campaignId: string) => void;
  verifyBeneficiaryAccount: (campaignId: string) => void;
  disburseCampaignTranche: (campaignId: string, amount: number, note: string) => void;
  postCampaignUpdate: (campaignId: string, title: string, description: string, amountUsed: number) => void;
  totalFundsRaised: number;
  totalDonorsCount: number;
  totalFamiliesSupported: number;
  totalPlatformEscrowHeld: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem('sahayata_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  const [userDonations, setUserDonations] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('sahayata_user_donations');
      return saved ? JSON.parse(saved) : INITIAL_USER_DONATIONS;
    } catch {
      return INITIAL_USER_DONATIONS;
    }
  });

  const [pendingRequests, setPendingRequests] = useState<HelpRequestSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('sahayata_pending_requests');
      return saved ? JSON.parse(saved) : INITIAL_PENDING_REQUESTS;
    } catch {
      return INITIAL_PENDING_REQUESTS;
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [activeModal, setActiveModal] = useState<'donate' | 'request_help' | 'detail' | 'my_impact' | 'admin' | 'where_donations_go' | null>(null);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [donationInitialAmount, setDonationInitialAmount] = useState<number>(50);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('sahayata_campaigns', JSON.stringify(campaigns));
    } catch (e) {
      console.warn('Failed to save campaigns to localStorage', e);
    }
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem('sahayata_user_donations', JSON.stringify(userDonations));
    } catch (e) {
      console.warn('Failed to save donations to localStorage', e);
    }
  }, [userDonations]);

  useEffect(() => {
    try {
      localStorage.setItem('sahayata_pending_requests', JSON.stringify(pendingRequests));
    } catch (e) {
      console.warn('Failed to save requests to localStorage', e);
    }
  }, [pendingRequests]);

  const openDonateModal = (campaign?: Campaign | null, initialAmount: number = 50) => {
    setActiveCampaign(campaign || null);
    setDonationInitialAmount(initialAmount);
    setActiveModal('donate');
  };

  const openDetailModal = (campaign: Campaign) => {
    setActiveCampaign(campaign);
    setActiveModal('detail');
  };

  const processDonation = (data: {
    campaignId?: string;
    amount: number;
    donorName: string;
    donorPhone?: string;
    donorEmail?: string;
    isAnonymous: boolean;
    paymentMethod: 'upi' | 'card' | 'netbanking';
  }): DonationRecord => {
    const targetCampaign = campaigns.find(c => c.id === data.campaignId) || campaigns[0];
    const txnNumber = 'TXN-SAH-' + Math.floor(100000 + Math.random() * 900000);
    const receiptNum = 'SAH-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    // Calculate smart expense allocation preview
    const splitHospital = Math.round(data.amount * 0.65);
    const splitMeds = Math.round(data.amount * 0.25);
    const splitEmergencyBuffer = data.amount - splitHospital - splitMeds;

    const newDonation: DonationRecord = {
      id: 'don-' + Date.now(),
      transactionId: txnNumber,
      campaignId: targetCampaign.id,
      campaignTitle: targetCampaign.title,
      beneficiaryName: targetCampaign.beneficiaryName,
      amount: data.amount,
      donorName: data.isAnonymous ? 'Kind Anonymous Supporter' : (data.donorName || 'Generous Donor'),
      donorPhone: data.donorPhone,
      donorEmail: data.donorEmail,
      isAnonymous: data.isAnonymous,
      paymentMethod: data.paymentMethod,
      timestamp: new Date().toISOString(),
      receiptNumber: receiptNum,
      allocatedItems: [
        { item: targetCampaign.breakdown[0]?.category || "Immediate Emergency Intervention", amount: splitHospital },
        { item: targetCampaign.breakdown[1]?.category || "Critical Medications & Care", amount: splitMeds },
        { item: "Patient Emergency Buffer Reserve", amount: splitEmergencyBuffer }
      ]
    };

    // Update campaign progress
    setCampaigns(prev => prev.map(camp => {
      if (camp.id === targetCampaign.id) {
        const updatedRaised = camp.amountRaised + data.amount;
        const isComplete = updatedRaised >= camp.amountRequired;
        return {
          ...camp,
          amountRaised: updatedRaised,
          donorCount: camp.donorCount + 1,
          status: isComplete ? 'completed' : camp.status
        };
      }
      return camp;
    }));

    setUserDonations(prev => [newDonation, ...prev]);
    return newDonation;
  };

  const submitHelpRequest = (requestData: Omit<HelpRequestSubmission, 'id' | 'submittedAt' | 'status'>): HelpRequestSubmission => {
    const newRequest: HelpRequestSubmission = {
      ...requestData,
      id: 'req-' + Date.now(),
      submittedAt: new Date().toISOString(),
      status: 'pending_verification'
    };

    setPendingRequests(prev => [newRequest, ...prev]);
    return newRequest;
  };

  const approveRequestToCampaign = (requestId: string, category: CampaignCategory, urgent: boolean) => {
    const req = pendingRequests.find(r => r.id === requestId);
    if (!req) return;

    // Pick an appropriate default cover image from our verified set
    const coverMap: Record<CampaignCategory, string> = {
      medical: '/src/assets/images/case_medical_surgery_1791087618288.jpg',
      medicines: '/src/assets/images/case_medical_surgery_1791087618288.jpg',
      food: '/src/assets/images/case_food_relief_1791087632482.jpg',
      shelter: '/src/assets/images/case_shelter_homeless_1791087648599.jpg',
      disaster: '/src/assets/images/case_disaster_flood_1791087661153.jpg',
      fire: '/src/assets/images/hero_emergency_aid_1791087604537.jpg',
      family: '/src/assets/images/hero_emergency_aid_1791087604537.jpg',
      humanitarian: '/src/assets/images/hero_emergency_aid_1791087604537.jpg',
    };

    const newCampaign: Campaign = {
      id: 'camp-' + Date.now(),
      title: `Emergency Support for ${req.beneficiaryName} - ${req.location.city}`,
      beneficiaryName: req.beneficiaryName,
      relation: req.relation,
      location: {
        city: req.location.city,
        state: req.location.state,
        country: 'India'
      },
      category: category,
      urgency: urgent ? 'critical' : 'urgent',
      situationSummary: req.description.slice(0, 160) + '...',
      detailedStory: req.description,
      amountRequired: req.amountRequired,
      amountRaised: 0,
      amountUsed: 0,
      donorCount: 0,
      status: urgent ? 'urgent' : 'active',
      verificationStatus: 'verified',
      verificationDetails: {
        verifiedBy: 'Sahayata Central Verification Desk',
        verificationDate: new Date().toISOString().split('T')[0],
        hospitalOrOrg: req.payoutInfo.bankName || 'Verified Payout Account',
        documentsVerified: req.documents.map(d => d.name),
        leadVolunteerNote: 'Hospital documentation, patient identification, and primary physician contact confirmed by field audit desk.',
        hospitalContactVerified: true,
        fieldVisitConducted: true
      },
      coverImage: coverMap[category] || '/src/assets/images/hero_emergency_aid_1791087604537.jpg',
      beneficiaryBankAccount: {
        accountHolderName: req.payoutInfo.accountHolder || req.beneficiaryName,
        bankName: req.payoutInfo.bankName || 'Verified Medical / Relief Trust Bank',
        accountNumberMasked: req.payoutInfo.accountNumber ? `•••• •••• ${req.payoutInfo.accountNumber.slice(-4)}` : '•••• •••• 8820',
        ifscCode: req.payoutInfo.ifscOrUpi || 'HDFC0001092',
        accountType: 'hospital_escrow',
        verificationStatus: 'pending_verification',
        disbursals: []
      },
      breakdown: [
        {
          id: 'b-new-1',
          category: 'Direct Hospital / Medical Emergency Bill',
          allocatedAmount: Math.round(req.amountRequired * 0.7),
          spentAmount: 0,
          status: 'pending',
          vendorOrHospital: req.payoutInfo.bankName
        },
        {
          id: 'b-new-2',
          category: 'Prescription Medicines & Care Consumables',
          allocatedAmount: Math.round(req.amountRequired * 0.2),
          spentAmount: 0,
          status: 'pending'
        },
        {
          id: 'b-new-3',
          category: 'Patient Nutritional & Recovery Buffer',
          allocatedAmount: req.amountRequired - Math.round(req.amountRequired * 0.7) - Math.round(req.amountRequired * 0.2),
          spentAmount: 0,
          status: 'pending'
        }
      ],
      updates: [
        {
          id: 'up-init',
          date: new Date().toISOString().split('T')[0],
          title: 'Campaign Verified & Published',
          description: 'Our verification team has thoroughly reviewed medical documents and authorized direct escrow fund collection.',
          amountUsed: 0,
          verifiedBy: 'Sahayata Verification Desk'
        }
      ],
      bankDetailsMasked: `${req.payoutInfo.bankName} · Verified Direct Escrow`,
      dateCreated: new Date().toISOString().split('T')[0],
      daysRemaining: urgent ? 3 : 15
    };

    setCampaigns(prev => [newCampaign, ...prev]);
    setPendingRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'approved' } : r));
  };

  const rejectHelpRequest = (requestId: string, reason: string) => {
    setPendingRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'rejected', reviewerNotes: reason } : r));
  };

  const toggleCampaignUrgency = (campaignId: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const nextStatus = c.status === 'urgent' ? 'active' : 'urgent';
        return {
          ...c,
          status: nextStatus,
          urgency: nextStatus === 'urgent' ? 'critical' : 'standard'
        };
      }
      return c;
    }));
  };

  const verifyBeneficiaryAccount = (campaignId: string) => {
    const pennyRef = 'PENNY-DROP-OK-' + Math.floor(100000 + Math.random() * 900000);
    const now = new Date().toISOString();

    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const updatedBank = {
          ...(c.beneficiaryBankAccount || {
            accountHolderName: c.beneficiaryName,
            bankName: 'Accredited Hospital Escrow Bank',
            accountNumberMasked: '•••• •••• 4819',
            ifscCode: 'HDFC0001092',
            accountType: 'hospital_escrow' as const,
            disbursals: []
          }),
          verificationStatus: 'verified_by_platform' as const,
          verifiedAt: now,
          pennyDropRef: pennyRef
        };

        const updateLog = {
          id: 'up-verify-' + Date.now(),
          date: now.split('T')[0],
          title: 'Beneficiary Bank Account Verified by Platform',
          description: `Platform verified beneficiary bank account (${updatedBank.bankName}) via automated Penny-Drop test (Ref: ${pennyRef}). Funds are now authorized for direct wire disbursal.`,
          amountUsed: 0,
          verifiedBy: 'Sahayata Compliance Desk'
        };

        return {
          ...c,
          beneficiaryBankAccount: updatedBank,
          updates: [updateLog, ...c.updates]
        };
      }
      return c;
    }));
  };

  const disburseCampaignTranche = (campaignId: string, amount: number, note: string) => {
    const utr = 'UTR-SAH-' + Date.now().toString().slice(-6) + '-' + Math.floor(1000 + Math.random() * 9000);
    const today = new Date().toISOString().split('T')[0];

    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const newUsed = c.amountUsed + amount;

        const newDisbursal = {
          id: 'disb-' + Date.now(),
          amount,
          utrNumber: utr,
          timestamp: new Date().toISOString(),
          recipientAccountMasked: c.beneficiaryBankAccount?.accountNumberMasked || c.bankDetailsMasked,
          bankName: c.beneficiaryBankAccount?.bankName || 'Hospital Direct Escrow',
          purpose: note,
          verifiedBy: 'Sahayata Financial Compliance Lead',
          status: 'completed' as const
        };

        const newUpdate = {
          id: 'up-' + Date.now(),
          date: today,
          title: `Platform Disbursed ₹${amount.toLocaleString('en-IN')} (UTR: ${utr})`,
          description: `${note}. Verified bank wire executed from Sahayata Platform Escrow to beneficiary account.`,
          amountUsed: amount,
          verifiedBy: 'Sahayata Lead Auditor',
          receiptUrl: utr
        };

        const existingDisbursals = c.beneficiaryBankAccount?.disbursals || [];

        return {
          ...c,
          amountUsed: newUsed,
          updates: [newUpdate, ...c.updates],
          beneficiaryBankAccount: {
            ...(c.beneficiaryBankAccount || {
              accountHolderName: c.beneficiaryName,
              bankName: 'Accredited Hospital Escrow Bank',
              accountNumberMasked: '•••• •••• 4819',
              ifscCode: 'HDFC0001092',
              accountType: 'hospital_escrow' as const,
              verificationStatus: 'verified_by_platform' as const
            }),
            disbursals: [newDisbursal, ...existingDisbursals]
          }
        };
      }
      return c;
    }));
  };

  const postCampaignUpdate = (campaignId: string, title: string, description: string, amountUsed: number) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id === campaignId) {
        const newUpdate = {
          id: 'up-' + Date.now(),
          date: new Date().toISOString().split('T')[0],
          title,
          description,
          amountUsed,
          verifiedBy: 'Sahayata Field Team',
          receiptUrl: 'REC-' + Math.floor(1000 + Math.random() * 9000)
        };
        return {
          ...c,
          amountUsed: c.amountUsed + amountUsed,
          updates: [newUpdate, ...c.updates]
        };
      }
      return c;
    }));
  };

  // Computations
  const totalFundsRaised = campaigns.reduce((acc, c) => acc + c.amountRaised, 0);
  const totalDonorsCount = campaigns.reduce((acc, c) => acc + c.donorCount, 0);
  const totalFamiliesSupported = campaigns.filter(c => c.amountRaised > 0).length + 1380; // includes past audited records
  const totalPlatformEscrowHeld = campaigns.reduce((acc, c) => acc + Math.max(0, c.amountRaised - c.amountUsed), 0);

  return (
    <AppContext.Provider
      value={{
        campaigns,
        userDonations,
        pendingRequests,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedCity,
        setSelectedCity,
        activeModal,
        setActiveModal,
        activeCampaign,
        setActiveCampaign,
        donationInitialAmount,
        openDonateModal,
        openDetailModal,
        processDonation,
        submitHelpRequest,
        approveRequestToCampaign,
        rejectHelpRequest,
        toggleCampaignUrgency,
        verifyBeneficiaryAccount,
        disburseCampaignTranche,
        postCampaignUpdate,
        totalFundsRaised,
        totalDonorsCount,
        totalFamiliesSupported,
        totalPlatformEscrowHeld
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
