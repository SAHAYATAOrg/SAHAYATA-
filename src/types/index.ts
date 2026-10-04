export type CampaignCategory = 
  | 'food'
  | 'shelter'
  | 'medical'
  | 'medicines'
  | 'disaster'
  | 'fire'
  | 'family'
  | 'humanitarian';

export type UrgencyLevel = 'critical' | 'urgent' | 'standard';

export type VerificationStatus = 'verified' | 'under_review' | 'flagged' | 'completed';

export interface ExpenseBreakdownItem {
  id: string;
  category: string;
  allocatedAmount: number;
  spentAmount: number;
  status: 'paid' | 'pending' | 'allocated';
  proofDocument?: string;
  vendorOrHospital?: string;
}

export interface CampaignUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  amountUsed: number;
  receiptUrl?: string;
  verifiedBy: string;
  photoUrl?: string;
}

export interface VerificationDetails {
  verifiedBy: string;
  verificationDate: string;
  hospitalOrOrg?: string;
  documentsVerified: string[];
  leadVolunteerNote: string;
  hospitalContactVerified: boolean;
  fieldVisitConducted: boolean;
}

export interface PlatformDisbursement {
  id: string;
  amount: number;
  utrNumber: string;
  timestamp: string;
  recipientAccountMasked: string;
  bankName: string;
  purpose: string;
  verifiedBy: string;
  status: 'completed' | 'processing';
}

export interface BeneficiaryBankAccount {
  accountHolderName: string;
  bankName: string;
  accountNumberMasked: string;
  ifscCode: string;
  accountType: 'hospital_escrow' | 'savings' | 'relief_trust';
  verificationStatus: 'pending_verification' | 'verified_by_platform';
  verifiedAt?: string;
  pennyDropRef?: string;
  disbursals: PlatformDisbursement[];
}

export interface Campaign {
  id: string;
  title: string;
  beneficiaryName: string;
  age?: number;
  relation?: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  category: CampaignCategory;
  urgency: UrgencyLevel;
  situationSummary: string;
  detailedStory: string;
  amountRequired: number;
  amountRaised: number;
  amountUsed: number;
  donorCount: number;
  status: 'active' | 'completed' | 'urgent';
  verificationStatus: VerificationStatus;
  verificationDetails: VerificationDetails;
  beneficiaryBankAccount: BeneficiaryBankAccount;
  coverImage: string;
  additionalImages?: string[];
  breakdown: ExpenseBreakdownItem[];
  updates: CampaignUpdate[];
  bankDetailsMasked: string;
  dateCreated: string;
  daysRemaining?: number;
  outcome?: {
    date: string;
    outcomeSummary: string;
    beneficiaryQuote: string;
    postRecoveryPhoto?: string;
  };
}

export interface DonationRecord {
  id: string;
  transactionId: string;
  campaignId: string;
  campaignTitle: string;
  beneficiaryName: string;
  amount: number;
  donorName: string;
  donorPhone?: string;
  donorEmail?: string;
  isAnonymous: boolean;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  timestamp: string;
  receiptNumber: string;
  allocatedItems: {
    item: string;
    amount: number;
  }[];
}

export interface HelpRequestSubmission {
  id: string;
  applicantName: string;
  phone: string;
  email: string;
  beneficiaryName: string;
  relation: string;
  location: {
    city: string;
    state: string;
  };
  category: CampaignCategory;
  urgency: UrgencyLevel;
  amountRequired: number;
  description: string;
  documents: {
    name: string;
    type: string;
    size: string;
  }[];
  payoutInfo: {
    bankName: string;
    accountHolder: string;
    accountNumber?: string;
    ifscOrUpi: string;
    hospitalDirectDisbursement: boolean;
  };
  submittedAt: string;
  status: 'pending_verification' | 'approved' | 'rejected' | 'needs_info';
  reviewerNotes?: string;
}
