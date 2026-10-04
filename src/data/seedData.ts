import { Campaign, DonationRecord, HelpRequestSubmission } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_emergency_aid_1791087604537.jpg';

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-urgent-surgery-ravi',
    title: "Help Ravi's family arrange emergency surgery expenses",
    beneficiaryName: "Aaradhya (daughter) & Ravi Kumar",
    age: 6,
    relation: "Father requesting for child",
    location: {
      city: "Hyderabad",
      state: "Telangana",
      country: "India"
    },
    category: "medical",
    urgency: "critical",
    situationSummary: "6-year-old Aaradhya requires emergency pediatric thoracic surgery following an acute trauma. Ravi is an auto-rickshaw driver and exhausted all personal savings.",
    detailedStory: "Ravi Kumar is a hardworking auto-rickshaw driver supporting a family of five. Last Tuesday, his 6-year-old daughter Aaradhya suffered acute trauma resulting in severe internal thoracic complications. She was rushed to City Life Pediatric Trauma Care where emergency stabilization was completed. The medical board has scheduled a vital corrective surgery within 48 hours. The total surgical, PICU, and prosthetic cost is ₹1,50,000. Sahayata's local field coordinator visited the hospital, verified the IP admission records, and confirmed that funds will be disbursed directly to the hospital's dedicated patient trust account.",
    amountRequired: 150000,
    amountRaised: 72500,
    amountUsed: 42000,
    donorCount: 46,
    status: "urgent",
    verificationStatus: "verified",
    verificationDetails: {
      verifiedBy: "Dr. Ananya Rao & Sahayata Field Team",
      verificationDate: "2026-10-02",
      hospitalOrOrg: "City Life Children's Hospital, Banjara Hills",
      documentsVerified: [
        "Patient Admission Record (IP# 884219)",
        "Thoracic Surgeon's Treatment Estimation",
        "Father's Aadhar & BPL Ration Card",
        "Hospital ESCROW Bank Details Verified"
      ],
      leadVolunteerNote: "Direct verification conducted in person at PICU Bed 14. Doctor confirmed critical timeline. Disbursements go directly to the hospital billing desk.",
      hospitalContactVerified: true,
      fieldVisitConducted: true
    },
    coverImage: "/src/assets/images/case_medical_surgery_1791087618288.jpg",
    breakdown: [
      {
        id: "b-1",
        category: "Thoracic Surgical Procedure & Theater Charges",
        allocatedAmount: 65000,
        spentAmount: 42000,
        status: "paid",
        vendorOrHospital: "City Life Children's Hospital",
        proofDocument: "Inv-MED-8921"
      },
      {
        id: "b-2",
        category: "Pediatric ICU Monitoring & Life Support (4 Days)",
        allocatedAmount: 45000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "City Life PICU Ward"
      },
      {
        id: "b-3",
        category: "Post-Operative Antibiotics, IV Fluids & Blood Units",
        allocatedAmount: 25000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "Hospital Pharmacy Central"
      },
      {
        id: "b-4",
        category: "Follow-up Diagnostic Scans & Pulmonary Rehabilitation",
        allocatedAmount: 15000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "Radiology & Rehab Unit"
      }
    ],
    updates: [
      {
        id: "up-1",
        date: "2026-10-03",
        title: "Tranche 1 Disbursed: Pre-op diagnostics completed",
        description: "Sahayata has wired ₹42,000 directly to City Life Hospital for surgery clearance tests and blood reservation. Aaradhya's vital signs are stabilized.",
        amountUsed: 42000,
        verifiedBy: "Sahayata Finance & Dr. Ananya",
        receiptUrl: "RECEIPT-TXN-90342"
      }
    ],
    bankDetailsMasked: "HDFC Bank · A/c ending 4819 (Hospital ESCROW)",
    beneficiaryBankAccount: {
      accountHolderName: "City Life Pediatric Trust (for Aaradhya Kumar)",
      bankName: "HDFC Bank",
      accountNumberMasked: "•••• •••• 4819",
      ifscCode: "HDFC0001092",
      accountType: "hospital_escrow",
      verificationStatus: "verified_by_platform",
      verifiedAt: "2026-10-02T14:30:00Z",
      pennyDropRef: "PENNY-DROP-OK-881924",
      disbursals: [
        {
          id: "disb-ravi-1",
          amount: 42000,
          utrNumber: "UTR-HDFC-9920148192",
          timestamp: "2026-10-03T11:20:00Z",
          recipientAccountMasked: "HDFC Bank A/c ending 4819",
          bankName: "HDFC Bank",
          purpose: "Pre-authorized surgical clearance & PICU bed reservation",
          verifiedBy: "Sahayata Finance & Dr. Ananya",
          status: "completed"
        }
      ]
    },
    dateCreated: "2026-10-01",
    daysRemaining: 2
  },
  {
    id: 'camp-disaster-flood-krishna',
    title: "Emergency rations and clean drinking water for 42 flood-affected families",
    beneficiaryName: "Krishna River Basin Coastal Communities",
    age: undefined,
    relation: "Community Relief Action",
    location: {
      city: "Machilipatnam",
      state: "Andhra Pradesh",
      country: "India"
    },
    category: "disaster",
    urgency: "critical",
    situationSummary: "Sudden flash floods washed away homes and contaminated local wells across 3 hamlets. 42 families urgently need dry ration survival kits and water purification units.",
    detailedStory: "Torrential monsoon rains caused river embankment breaches, inundating low-lying residential clusters in coastal hamlets. Drinking water sources are completely silted, posing cholera and waterborne epidemic risks. Sahayata partnered with accredited rural volunteers to procure and distribute 42 Emergency Survival Bundles (each containing 20kg rice, pulses, cooking oil, tarpaulins, chlorine tablets, and infant nutritional packs).",
    amountRequired: 280000,
    amountRaised: 194000,
    amountUsed: 135000,
    donorCount: 118,
    status: "urgent",
    verificationStatus: "verified",
    verificationDetails: {
      verifiedBy: "K. Srinivas (Local Panchayat Relief Liaison)",
      verificationDate: "2026-09-30",
      hospitalOrOrg: "Coastal Disaster Relief Coordination Cell",
      documentsVerified: [
        "District Magistrate Flood Alert Notification #409",
        "Gram Panchayat 42-Family Verification Roster",
        "Wholesale Civil Supplies Invoice & Delivery Manifest"
      ],
      leadVolunteerNote: "Kits are assembled and delivered under joint supervision with local panchayat officers. No middlemen.",
      hospitalContactVerified: true,
      fieldVisitConducted: true
    },
    coverImage: "/src/assets/images/case_disaster_flood_1791087661153.jpg",
    breakdown: [
      {
        id: "b-flood-1",
        category: "42 Dry Ration Kits (Rice, Pulses, Cooking Oil, Salt)",
        allocatedAmount: 140000,
        spentAmount: 95000,
        status: "paid",
        vendorOrHospital: "District Civil Supplies Warehouse"
      },
      {
        id: "b-flood-2",
        category: "Water Purification Tablets & 20L Food-Grade Jerrycans",
        allocatedAmount: 60000,
        spentAmount: 40000,
        status: "paid",
        vendorOrHospital: "CleanWater Relief Logistics"
      },
      {
        id: "b-flood-3",
        category: "Heavy-Duty Waterproof Tarpaulins & Solar Emergency Lanterns",
        allocatedAmount: 50000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "ShelterAid Suppliers"
      },
      {
        id: "b-flood-4",
        category: "Anti-fungal and First Aid Emergency Medicine Kits",
        allocatedAmount: 30000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "Red Cross Rural Medical Depot"
      }
    ],
    updates: [
      {
        id: "up-flood-1",
        date: "2026-10-02",
        title: "First batch of 25 ration kits delivered directly to displaced families",
        description: "25 families in South Hamlet received their emergency rations and water purification canisters. Distribution list signed by village head.",
        amountUsed: 135000,
        verifiedBy: "K. Srinivas & Team",
        receiptUrl: "RECEIPT-DIST-4401"
      }
    ],
    bankDetailsMasked: "State Bank of India · A/c ending 1198 (Disaster Relief Account)",
    beneficiaryBankAccount: {
      accountHolderName: "Coastal Disaster Relief Coordination Cell",
      bankName: "State Bank of India",
      accountNumberMasked: "•••• •••• 1198",
      ifscCode: "SBIN0004218",
      accountType: "relief_trust",
      verificationStatus: "verified_by_platform",
      verifiedAt: "2026-09-30T10:00:00Z",
      pennyDropRef: "PENNY-DROP-OK-440192",
      disbursals: [
        {
          id: "disb-flood-1",
          amount: 135000,
          utrNumber: "UTR-SBI-7729104812",
          timestamp: "2026-10-02T16:45:00Z",
          recipientAccountMasked: "SBI A/c ending 1198",
          bankName: "State Bank of India",
          purpose: "Procurement of 25 dry ration bundles & chlorine tablets",
          verifiedBy: "K. Srinivas & Team",
          status: "completed"
        }
      ]
    },
    dateCreated: "2026-09-29",
    daysRemaining: 4
  },
  {
    id: 'camp-food-elders-relief',
    title: "Daily warm nutritious meals for 120 destitute elders & homeless day laborers",
    beneficiaryName: "Senior Citizen Community Kitchen",
    age: 72,
    relation: "Community Kitchen Coordinator",
    location: {
      city: "Kolkata",
      state: "West Bengal",
      country: "India"
    },
    category: "food",
    urgency: "standard",
    situationSummary: "Providing hot, fresh, dignified meals twice daily to abandoned elderly people who have no family support or pensions.",
    detailedStory: "Around Sealdah and central railway station zones, hundreds of abandoned elderly men and women struggle for even one square meal a day. The 'Annapurna Community Kitchen' prepares fresh khichdi, vegetables, lentil soup, and boiled eggs under strict hygiene standards. A monthly donation of just ₹85,000 ensures 120 destitute elders receive two nutritious hot meals every single day without interruption.",
    amountRequired: 85000,
    amountRaised: 62000,
    amountUsed: 45000,
    donorCount: 79,
    status: "active",
    verificationStatus: "verified",
    verificationDetails: {
      verifiedBy: "Debashish Mukherjee, Social Worker",
      verificationDate: "2026-09-25",
      hospitalOrOrg: "Annapurna Senior Aid Trust (Reg. WB-2019-948)",
      documentsVerified: [
        "FSSAI Food Safety Hygiene Certification",
        "Trust Registration & 80G Approval Certificate",
        "Daily Meal Beneficiary Logbook & Geo-tagged Distribution Photos"
      ],
      leadVolunteerNote: "Kitchen inspected weekly. Clean water, nutritious fresh food, direct plate-to-person distribution.",
      hospitalContactVerified: true,
      fieldVisitConducted: true
    },
    coverImage: "/src/assets/images/case_food_relief_1791087632482.jpg",
    breakdown: [
      {
        id: "b-food-1",
        category: "Fresh Vegetables, Rice, Dal & Cooking Oil for 30 Days",
        allocatedAmount: 52000,
        spentAmount: 32000,
        status: "paid",
        vendorOrHospital: "Bara Bazar Wholesale Market"
      },
      {
        id: "b-food-2",
        category: "Clean LPG Cylinders & Filtered Drinking Water",
        allocatedAmount: 18000,
        spentAmount: 13000,
        status: "paid",
        vendorOrHospital: "Indane Gas Agency & AquaSafe"
      },
      {
        id: "b-food-3",
        category: "Biodegradable Meal Trays & Sanitary Provisions",
        allocatedAmount: 15000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "EcoPack Supplies"
      }
    ],
    updates: [
      {
        id: "up-food-1",
        date: "2026-10-01",
        title: "2,400 meals served in the past 20 days",
        description: "Audited ledger published: 120 elders received lunch and dinner daily. All vendor vouchers verified by Sahayata audit desk.",
        amountUsed: 45000,
        verifiedBy: "Debashish Mukherjee",
        receiptUrl: "RECEIPT-FOOD-102"
      }
    ],
    bankDetailsMasked: "Punjab National Bank · A/c ending 8812 (Direct Vendor Escrow)",
    beneficiaryBankAccount: {
      accountHolderName: "Annapurna Senior Aid Trust",
      bankName: "Punjab National Bank",
      accountNumberMasked: "•••• •••• 8812",
      ifscCode: "PUNB0182900",
      accountType: "relief_trust",
      verificationStatus: "verified_by_platform",
      verifiedAt: "2026-09-25T09:15:00Z",
      pennyDropRef: "PENNY-DROP-OK-112093",
      disbursals: [
        {
          id: "disb-food-1",
          amount: 45000,
          utrNumber: "UTR-PNB-6628103991",
          timestamp: "2026-10-01T10:00:00Z",
          recipientAccountMasked: "PNB A/c ending 8812",
          bankName: "Punjab National Bank",
          purpose: "Bara Bazar wholesale rice, lentils & fresh vegetables",
          verifiedBy: "Debashish Mukherjee",
          status: "completed"
        }
      ]
    },
    dateCreated: "2026-09-12"
  },
  {
    id: 'camp-shelter-winter-homeless',
    title: "Safe night shelter beds and thermal blankets for 60 homeless street dwellers",
    beneficiaryName: "Urban Night Shelter Care",
    relation: "Shelter Coordinator",
    location: {
      city: "New Delhi",
      state: "Delhi",
      country: "India"
    },
    category: "shelter",
    urgency: "urgent",
    situationSummary: "Providing hygienic bedding, wool blankets, and overnight security for homeless families sleeping on exposed pavements as night temperatures plunge.",
    detailedStory: "With nighttime temperatures dropping rapidly, elderly people and small children sleeping on flyover pavements face severe hypothermia risks. Sahayata is outfitting a community night shelter with 60 sturdy camp cots, dense thermal wool blankets, clean mattress liners, and nighttime security guards to keep vulnerable individuals safe from cold and street crime.",
    amountRequired: 65000,
    amountRaised: 48500,
    amountUsed: 35000,
    donorCount: 52,
    status: "active",
    verificationStatus: "verified",
    verificationDetails: {
      verifiedBy: "Meenakshi Sharma (Community Coordinator)",
      verificationDate: "2026-09-28",
      hospitalOrOrg: "Delhi Ashray Adhikar Abhiyan Collaboration",
      documentsVerified: [
        "Municipal Shelter Permission Permit",
        "Woolen Blanket Bulk Manufacturer Invoice",
        "Shelter Night Roster Log"
      ],
      leadVolunteerNote: "Shelter space inspected. Proper ventilation, clean toilet access, and tea/hot water facilities confirmed.",
      hospitalContactVerified: true,
      fieldVisitConducted: true
    },
    coverImage: "/src/assets/images/case_shelter_homeless_1791087648599.jpg",
    breakdown: [
      {
        id: "b-shelter-1",
        category: "60 High-Density Thermal Fleece Blankets & Mattresses",
        allocatedAmount: 38000,
        spentAmount: 35000,
        status: "paid",
        vendorOrHospital: "Panipat Handloom Cooperative"
      },
      {
        id: "b-shelter-2",
        category: "First Aid Supplies & Night Hot Tea/Soup Distribution",
        allocatedAmount: 15000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "Community Wellness Store"
      },
      {
        id: "b-shelter-3",
        category: "Night Caretaker & Safe Storage Locker Installation",
        allocatedAmount: 12000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "Shelter Maintenance Fund"
      }
    ],
    updates: [
      {
        id: "up-sh-1",
        date: "2026-10-02",
        title: "50 thermal blankets delivered to shelter",
        description: "50 warm blankets and mattresses arranged on cots. 48 individuals slept safely off the freezing pavement last night.",
        amountUsed: 35000,
        verifiedBy: "Meenakshi Sharma",
        receiptUrl: "RECEIPT-SH-882"
      }
    ],
    bankDetailsMasked: "ICICI Bank · A/c ending 3094 (Shelter Operating ESCROW)",
    beneficiaryBankAccount: {
      accountHolderName: "Delhi Ashray Care Operating Account",
      bankName: "ICICI Bank",
      accountNumberMasked: "•••• •••• 3094",
      ifscCode: "ICIC0000007",
      accountType: "relief_trust",
      verificationStatus: "verified_by_platform",
      verifiedAt: "2026-09-28T14:00:00Z",
      pennyDropRef: "PENNY-DROP-OK-550291",
      disbursals: [
        {
          id: "disb-shelter-1",
          amount: 35000,
          utrNumber: "UTR-ICICI-8819203914",
          timestamp: "2026-10-02T12:00:00Z",
          recipientAccountMasked: "ICICI Bank A/c ending 3094",
          bankName: "ICICI Bank",
          purpose: "Panipat Handloom 50 thermal blankets & cots delivery",
          verifiedBy: "Meenakshi Sharma",
          status: "completed"
        }
      ]
    },
    dateCreated: "2026-09-24",
    daysRemaining: 6
  },
  {
    id: 'camp-success-ramesh-cardiac',
    title: "Emergency cardiac stenting & recovery for Ramesh, daily wage laborer",
    beneficiaryName: "Ramesh Sonawane",
    age: 49,
    relation: "Self & Wife Sunita",
    location: {
      city: "Pune",
      state: "Maharashtra",
      country: "India"
    },
    category: "medical",
    urgency: "standard",
    situationSummary: "Ramesh suffered severe myocardial infarction while working at a construction site. Thanks to 84 donors, life-saving coronary stenting was fully funded and completed!",
    detailedStory: "Ramesh is a sole earner supporting his elderly mother and two school-going children. When he collapsed at work, doctors at Sassoon Heart Institute discovered a 95% critical blockage. Through the Sahayata platform, ₹1,20,000 was raised in 72 hours. All funds were paid directly to the cardiac catheterization lab.",
    amountRequired: 120000,
    amountRaised: 120000,
    amountUsed: 120000,
    donorCount: 84,
    status: "completed",
    verificationStatus: "completed",
    verificationDetails: {
      verifiedBy: "Dr. Vikram Joshi, Senior Interventional Cardiologist",
      verificationDate: "2026-09-10",
      hospitalOrOrg: "Sassoon Multispeciality Heart Center",
      documentsVerified: [
        "Angiogram Report & Pre-op CD",
        "Discharge Summary & Stent Serial Numbers Verification",
        "Final Hospital Receipt Showing Zero Balance Due"
      ],
      leadVolunteerNote: "Full case audited. Ramesh has completed 3-week post-op cardiac evaluation with normal ejection fraction.",
      hospitalContactVerified: true,
      fieldVisitConducted: true
    },
    coverImage: "/src/assets/images/case_medical_surgery_1791087618288.jpg",
    breakdown: [
      {
        id: "b-ramesh-1",
        category: "Coronary Drug-Eluting Stents & Angioplasty Procedure",
        allocatedAmount: 85000,
        spentAmount: 85000,
        status: "paid",
        vendorOrHospital: "Sassoon Heart Center Billing",
        proofDocument: "FINAL-INV-9901"
      },
      {
        id: "b-ramesh-2",
        category: "ICU Stay & Post-Op Cardiac Monitoring",
        allocatedAmount: 22000,
        spentAmount: 22000,
        status: "paid",
        vendorOrHospital: "Cardiac Care Unit",
        proofDocument: "REC-ICU-412"
      },
      {
        id: "b-ramesh-3",
        category: "3 Months Blood Thinners & Cardiac Medication Supply",
        allocatedAmount: 13000,
        spentAmount: 13000,
        status: "paid",
        vendorOrHospital: "MedPlus Pharmacy",
        proofDocument: "MED-BILL-701"
      }
    ],
    updates: [
      {
        id: "up-ram-final",
        date: "2026-09-28",
        title: "Discharged & Fully Recovered: Back home with family!",
        description: "Ramesh has returned home in good spirits. He walked 15 minutes without chest pain today and thanked all 84 donors with folded hands.",
        amountUsed: 120000,
        verifiedBy: "Dr. Vikram Joshi",
        receiptUrl: "AUDIT-CERT-1200"
      }
    ],
    bankDetailsMasked: "Bank of Maharashtra · A/c ending 0491",
    beneficiaryBankAccount: {
      accountHolderName: "Sassoon Heart Institute Cardiac Billing Desk",
      bankName: "Bank of Maharashtra",
      accountNumberMasked: "•••• •••• 0491",
      ifscCode: "MAHB0000122",
      accountType: "hospital_escrow",
      verificationStatus: "verified_by_platform",
      verifiedAt: "2026-09-10T11:00:00Z",
      pennyDropRef: "PENNY-DROP-OK-991204",
      disbursals: [
        {
          id: "disb-ramesh-1",
          amount: 120000,
          utrNumber: "UTR-BOM-1102938475",
          timestamp: "2026-09-28T15:30:00Z",
          recipientAccountMasked: "Bank of Maharashtra A/c ending 0491",
          bankName: "Bank of Maharashtra",
          purpose: "Full settlement for coronary angioplasty, ICU stay & 3 months medications",
          verifiedBy: "Dr. Vikram Joshi",
          status: "completed"
        }
      ]
    },
    dateCreated: "2026-09-08",
    outcome: {
      date: "2026-09-28",
      outcomeSummary: "Successful double-vessel stenting, zero complications, full functional recovery.",
      beneficiaryQuote: "“When I was lying on that hospital bed, I thought my children would lose their father and fall into poverty. Unknown brothers and sisters on Sahayata stepped up. You gave me back my life. I will never forget your kindness.”"
    }
  },
  {
    id: 'camp-medicines-dialysis-priya',
    title: "Essential monthly dialysis & erythropoietin injections for Priya",
    beneficiaryName: "Priya Devi (32 years)",
    age: 32,
    relation: "Mother of 2 children",
    location: {
      city: "Patna",
      state: "Bihar",
      country: "India"
    },
    category: "medicines",
    urgency: "urgent",
    situationSummary: "Priya suffers from end-stage renal disease and requires 8 dialysis sessions per month plus vital hemoglobin maintenance injections.",
    detailedStory: "Priya is a 32-year-old mother of two daughters. Both her kidneys have failed and she awaits an eventual transplant. In the interim, she cannot survive without bi-weekly hemodialysis and weekly erythropoietin injections to keep her blood count stable. Her husband works as a tailor earning ₹7,000 monthly, which is barely enough for rent and groceries.",
    amountRequired: 45000,
    amountRaised: 31000,
    amountUsed: 18000,
    donorCount: 39,
    status: "active",
    verificationStatus: "verified",
    verificationDetails: {
      verifiedBy: "Dr. R. K. Prasad (Nephrology Dept)",
      verificationDate: "2026-09-22",
      hospitalOrOrg: "Patna Dialysis Center",
      documentsVerified: [
        "Serum Creatinine & Kidney Function Lab Reports",
        "Nephrologist Treatment Plan & Prescription",
        "Hospital Dialysis Package Cost Breakdown"
      ],
      leadVolunteerNote: "Verified with treating nephrologist. Funds paid in 2-month packages directly to the dialysis center.",
      hospitalContactVerified: true,
      fieldVisitConducted: true
    },
    coverImage: "/src/assets/images/case_medical_surgery_1791087618288.jpg",
    breakdown: [
      {
        id: "b-dial-1",
        category: "16 Dialysis Sessions & Dialyzer Consumable Kits",
        allocatedAmount: 28000,
        spentAmount: 14000,
        status: "paid",
        vendorOrHospital: "Patna Dialysis Center"
      },
      {
        id: "b-dial-2",
        category: "Erythropoietin Injections & Iron Supplements",
        allocatedAmount: 12000,
        spentAmount: 4000,
        status: "paid",
        vendorOrHospital: "LifeCare Pharmacy"
      },
      {
        id: "b-dial-3",
        category: "Monthly Electrolyte & Serum Chemistry Panel Tests",
        allocatedAmount: 5000,
        spentAmount: 0,
        status: "pending",
        vendorOrHospital: "PathKind Diagnostic Labs"
      }
    ],
    updates: [
      {
        id: "up-dial-1",
        date: "2026-09-30",
        title: "8 dialysis sessions completed smoothly this month",
        description: "Priya's hemoglobin improved from 6.2 to 8.8 g/dL. She is active and able to help her children with their homework.",
        amountUsed: 18000,
        verifiedBy: "Dr. R. K. Prasad",
        receiptUrl: "REC-DIAL-889"
      }
    ],
    bankDetailsMasked: "Canara Bank · A/c ending 6620 (Dialysis Center Direct ESCROW)",
    beneficiaryBankAccount: {
      accountHolderName: "Patna Dialysis Center Patient Trust",
      bankName: "Canara Bank",
      accountNumberMasked: "•••• •••• 7731",
      ifscCode: "CNRB0001928",
      accountType: "hospital_escrow",
      verificationStatus: "verified_by_platform",
      verifiedAt: "2026-09-22T13:00:00Z",
      pennyDropRef: "PENNY-DROP-OK-332910",
      disbursals: [
        {
          id: "disb-priya-1",
          amount: 18000,
          utrNumber: "UTR-CNRB-4491028374",
          timestamp: "2026-09-29T10:00:00Z",
          recipientAccountMasked: "Canara Bank A/c ending 7731",
          bankName: "Canara Bank",
          purpose: "Pre-payment for 8 dialysis sessions and 4 erythropoietin vials",
          verifiedBy: "Dr. R. K. Prasad",
          status: "completed"
        }
      ]
    },
    dateCreated: "2026-09-18",
    daysRemaining: 12
  }
];

export const INITIAL_USER_DONATIONS: DonationRecord[] = [
  {
    id: "don-seed-1",
    transactionId: "TXN-SAH-892401",
    campaignId: "camp-urgent-surgery-ravi",
    campaignTitle: "Help Ravi's family arrange emergency surgery expenses",
    beneficiaryName: "Aaradhya (daughter) & Ravi Kumar",
    amount: 1500,
    donorName: "Compassionate Donor",
    donorEmail: "kumarbharath1920@gmail.com",
    isAnonymous: false,
    paymentMethod: "upi",
    timestamp: "2026-10-02T14:32:00Z",
    receiptNumber: "SAH-2026-0941",
    allocatedItems: [
      { item: "Surgical Theater & PICU Support", amount: 950 },
      { item: "Post-op IV Fluids & Blood Units", amount: 400 },
      { item: "Diagnostic Scans Fund", amount: 150 }
    ]
  },
  {
    id: "don-seed-2",
    transactionId: "TXN-SAH-771923",
    campaignId: "camp-disaster-flood-krishna",
    campaignTitle: "Emergency rations and clean drinking water for 42 flood-affected families",
    beneficiaryName: "Krishna River Basin Coastal Communities",
    amount: 2500,
    donorName: "Compassionate Donor",
    donorEmail: "kumarbharath1920@gmail.com",
    isAnonymous: false,
    paymentMethod: "card",
    timestamp: "2026-10-01T09:15:00Z",
    receiptNumber: "SAH-2026-0882",
    allocatedItems: [
      { item: "Emergency Food Ration Bundle", amount: 1600 },
      { item: "Water Purification Jerrycans", amount: 650 },
      { item: "First Aid Antiseptic Kit", amount: 250 }
    ]
  }
];

export const INITIAL_PENDING_REQUESTS: HelpRequestSubmission[] = [
  {
    id: "req-pending-01",
    applicantName: "Mohammed Farooq",
    phone: "+91 98451 22910",
    email: "farooq.m@example.com",
    beneficiaryName: "Farooq's Mother (Zarina Begum, 64)",
    relation: "Son",
    location: {
      city: "Bengaluru",
      state: "Karnataka"
    },
    category: "fire",
    urgency: "urgent",
    amountRequired: 110000,
    description: "An electrical cylinder leakage fire burnt Zarina Begum's modest tailoring room and clothes shop in Shivajinagar. She suffered 2nd-degree burn injuries on arms and legs. She is admitted to Victoria Hospital Burn Ward. Family has zero insurance.",
    documents: [
      { name: "Victoria_Hospital_Admission_Report.pdf", type: "PDF", size: "2.1 MB" },
      { name: "Fire_Station_NOC_Inspection_Report.pdf", type: "PDF", size: "1.4 MB" },
      { name: "Doctor_Estimate_Burn_Dressing_SkinGraft.pdf", type: "PDF", size: "850 KB" }
    ],
    payoutInfo: {
      bankName: "Victoria Hospital Patients Welfare Trust",
      accountHolder: "Victoria Hospital Burn Ward",
      ifscOrUpi: "SBIN0001244",
      hospitalDirectDisbursement: true
    },
    submittedAt: "2026-10-03T18:10:00Z",
    status: "pending_verification"
  },
  {
    id: "req-pending-02",
    applicantName: "Lakshmi Narayanan",
    phone: "+91 94440 88219",
    email: "lakshmi.chennai@example.com",
    beneficiaryName: "Kavitha (daughter, 11)",
    relation: "Mother",
    location: {
      city: "Chennai",
      state: "Tamil Nadu"
    },
    category: "medical",
    urgency: "critical",
    amountRequired: 95000,
    description: "Kavitha collapsed at school with acute severe appendicitis with perforation and localized peritonitis. She was admitted for emergency laparoscopic appendectomy and drainage at Institute of Child Health Egmore.",
    documents: [
      { name: "ICH_Egmore_Ultrasound_Report.pdf", type: "PDF", size: "3.2 MB" },
      { name: "Surgery_Estimation_Certificate.pdf", type: "PDF", size: "1.1 MB" }
    ],
    payoutInfo: {
      bankName: "Indian Overseas Bank",
      accountHolder: "ICH Egmore Child Relief Trust",
      ifscOrUpi: "IOBA0000122",
      hospitalDirectDisbursement: true
    },
    submittedAt: "2026-10-03T19:40:00Z",
    status: "pending_verification"
  }
];

export const CATEGORY_INFO: Record<
  string,
  { label: string; icon: string; description: string; color: string }
> = {
  all: {
    label: "All Urgent Cases",
    icon: "HeartHandshake",
    description: "Every verified person and crisis needing urgent community aid",
    color: "slate"
  },
  medical: {
    label: "Emergency Medical",
    icon: "Stethoscope",
    description: "Hospital surgeries, trauma ICU, and critical procedures",
    color: "rose"
  },
  food: {
    label: "Food Support",
    icon: "Utensils",
    description: "Nutritious warm meals for hungry families and destitute elders",
    color: "amber"
  },
  shelter: {
    label: "Emergency Shelter",
    icon: "Home",
    description: "Warm beds, blankets, and safe shelter for homeless individuals",
    color: "sky"
  },
  disaster: {
    label: "Disaster Relief",
    icon: "Waves",
    description: "Immediate survival packs, clean water, and flood/cyclone aid",
    color: "blue"
  },
  medicines: {
    label: "Medicines & Care",
    icon: "Pill",
    description: "Life-saving ongoing medications, dialysis, and insulin",
    color: "emerald"
  },
  fire: {
    label: "Fire & Accidents",
    icon: "Flame",
    description: "Immediate emergency assistance for burn and accident victims",
    color: "orange"
  },
  family: {
    label: "Critical Family",
    icon: "Users",
    description: "Sudden bereavement, breadwinner loss, or vulnerable children",
    color: "indigo"
  },
  humanitarian: {
    label: "Urgent Humanitarian",
    icon: "LifeBuoy",
    description: "Other genuine time-sensitive humanitarian relief needs",
    color: "stone"
  }
};
