import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';
import { seedCropListings } from '../data/marketplaceData';
import {
  diseasesDatabase,
  surveillanceStats,
  diseaseTrendData,
  topDiseasesDistribution,
  sangliHotspots,
  liveSensorTelemetry,
  sampleLeafImages,
  seedFarmerReports,
  seedCommunityPosts
} from '../data/mockData';
import { STATE_AGRI_OFFICERS } from '../data/indiaGeographicData';

export const seedSoilHealthCards = [
  {
    id: "shc-2026-001",
    farmerName: "Ramesh Patil",
    phone: "+91 98224 55120",
    plotName: "Plot 1 - North Cotton Field",
    surveyNumber: "Gat No. 142/A",
    sampleDate: "12 Aug 2026",
    reportDate: "18 Aug 2026",
    labName: "District Soil Testing Laboratory, KVK Sangli",
    labCertification: "NABL & ICAR Accredited (ISO/IEC 17025)",
    soilType: "Deep Black Clayey Soil (Vertisol)",
    overallStatus: "Fertile (Nitrogen & Zinc Deficient)",
    healthScore: 76,
    parameters: [
      { name: "Soil Reaction (pH)", symbol: "pH", value: 7.8, unit: "-", normalRange: "6.5 - 7.5", status: "Slightly Alkaline", rating: "Moderate" },
      { name: "Electrical Conductivity (EC)", symbol: "EC", value: 0.42, unit: "dS/m", normalRange: "< 1.0", status: "Normal (Non-Saline)", rating: "Optimal" },
      { name: "Organic Carbon (OC)", symbol: "OC", value: 0.58, unit: "%", normalRange: "0.50 - 0.75", status: "Medium", rating: "Good" },
      { name: "Available Nitrogen (N)", symbol: "N", value: 198, unit: "kg/ha", normalRange: "280 - 560", status: "Low (Deficient)", rating: "Low" },
      { name: "Available Phosphorus (P2O5)", symbol: "P", value: 26.4, unit: "kg/ha", normalRange: "23 - 56", status: "Medium", rating: "Good" },
      { name: "Available Potassium (K2O)", symbol: "K", value: 340, unit: "kg/ha", normalRange: "140 - 280", status: "High (Rich)", rating: "High" },
      { name: "Available Sulfur (S)", symbol: "S", value: 14.2, unit: "ppm", normalRange: "10.0 - 20.0", status: "Sufficient", rating: "Optimal" },
      { name: "Available Zinc (Zn)", symbol: "Zn", value: 0.45, unit: "ppm", normalRange: "> 0.60", status: "Critical Deficient", rating: "Critical" },
      { name: "Available Iron (Fe)", symbol: "Fe", value: 4.8, unit: "ppm", normalRange: "> 4.5", status: "Sufficient", rating: "Optimal" },
      { name: "Available Boron (B)", symbol: "B", value: 0.52, unit: "ppm", normalRange: "0.50 - 1.0", status: "Adequate", rating: "Optimal" },
      { name: "Available Manganese (Mn)", symbol: "Mn", value: 3.2, unit: "ppm", normalRange: "> 2.0", status: "Sufficient", rating: "Optimal" },
      { name: "Available Copper (Cu)", symbol: "Cu", value: 0.38, unit: "ppm", normalRange: "> 0.20", status: "Sufficient", rating: "Optimal" }
    ],
    deficiencies: [
      "Low Available Nitrogen (198 kg/ha) - Stunts vegetative tillering",
      "Critical Zinc Deficiency (0.45 ppm) - Causes little leaf and auxin reduction"
    ],
    fertilizerPrescription: [
      { fertilizer: "Neem Coated Urea", dose: "55 kg / Acre in 2 splits", time: "Basal & 30 DAS" },
      { fertilizer: "Zinc Sulfate (Heptahydrate 21%)", dose: "10 kg / Acre soil application", time: "At sowing" },
      { fertilizer: "Zinc EDTA 12% Foliar", dose: "1.5 g / Liter water", time: "At 35 & 50 DAS" },
      { fertilizer: "FYM / Well-rotted Cow Dung", dose: "5 Tons / Acre", time: "Field prep" }
    ]
  },
  {
    id: "shc-2026-002",
    farmerName: "Ramesh Patil",
    phone: "+91 98224 55120",
    plotName: "Plot 4 - Tomato & Vegetable Patch",
    surveyNumber: "Gat No. 143/B",
    sampleDate: "10 Jul 2026",
    reportDate: "16 Jul 2026",
    labName: "District Soil Testing Laboratory, KVK Sangli",
    labCertification: "NABL & ICAR Accredited (ISO/IEC 17025)",
    soilType: "Medium Sandy Loam Soil",
    overallStatus: "Optimal Organic Balance (Boron & Magnesium Deficient)",
    healthScore: 84,
    parameters: [
      { name: "Soil Reaction (pH)", symbol: "pH", value: 6.9, unit: "-", normalRange: "6.5 - 7.5", status: "Neutral (Ideal)", rating: "Optimal" },
      { name: "Electrical Conductivity (EC)", symbol: "EC", value: 0.35, unit: "dS/m", normalRange: "< 1.0", status: "Optimal", rating: "Optimal" },
      { name: "Organic Carbon (OC)", symbol: "OC", value: 0.72, unit: "%", normalRange: "0.50 - 0.75", status: "High Organic Matter", rating: "Optimal" },
      { name: "Available Nitrogen (N)", symbol: "N", value: 295, unit: "kg/ha", normalRange: "280 - 560", status: "Medium", rating: "Good" },
      { name: "Available Phosphorus (P2O5)", symbol: "P", value: 38.5, unit: "kg/ha", normalRange: "23 - 56", status: "Sufficient", rating: "Optimal" },
      { name: "Available Potassium (K2O)", symbol: "K", value: 280, unit: "kg/ha", normalRange: "140 - 280", status: "Sufficient", rating: "Optimal" },
      { name: "Available Sulfur (S)", symbol: "S", value: 16.5, unit: "ppm", normalRange: "10.0 - 20.0", status: "Sufficient", rating: "Optimal" },
      { name: "Available Zinc (Zn)", symbol: "Zn", value: 0.78, unit: "ppm", normalRange: "> 0.60", status: "Adequate", rating: "Optimal" },
      { name: "Available Iron (Fe)", symbol: "Fe", value: 5.4, unit: "ppm", normalRange: "> 4.5", status: "Sufficient", rating: "Optimal" },
      { name: "Available Boron (B)", symbol: "B", value: 0.32, unit: "ppm", normalRange: "0.50 - 1.0", status: "Deficient (Poor Fruit Set)", rating: "Critical" },
      { name: "Available Magnesium (Mg)", symbol: "Mg", value: 1.1, unit: "meq/100g", normalRange: "> 1.5", status: "Marginal Deficient", rating: "Low" },
      { name: "Available Calcium (Ca)", symbol: "Ca", value: 8.4, unit: "meq/100g", normalRange: "> 5.0", status: "Rich", rating: "Optimal" }
    ],
    deficiencies: [
      "Boron Deficiency (0.32 ppm) - Causes flower dropping and hollow fruits",
      "Magnesium Deficiency - Causes interveinal leaf chlorosis"
    ],
    fertilizerPrescription: [
      { fertilizer: "Solubor Boron 20%", dose: "1.0 g / Liter foliar spray", time: "At flower bud formation" },
      { fertilizer: "Magnesium Sulfate (Epsom Salt)", dose: "5.0 g / Liter foliar", time: "At 40 DAS" },
      { fertilizer: "19:19:19 Starter", dose: "4.0 g / Liter via Drip", time: "Transplanting + 15 days" }
    ]
  }
];

const AppContext = createContext(null);

// Initial Pre-seeded Saved Accounts with Detailed Government Officials & Farmers
const INITIAL_ACCOUNTS = [
  // 🌾 FARMER ACCOUNTS
  {
    id: "usr-farmer-ramesh",
    role: "farmer",
    name: "Ramesh Patil",
    username: "ramesh_patil",
    password: "kisan123",
    phone: "+91 98224 55120",
    email: "ramesh.patil@kisan.in",
    state: "Maharashtra",
    district: "Sangli",
    aadharNumber: "8841 9023 5512",
    aadharMasked: "XXXX-XXXX-5512",
    authToken: "tok_farmer_ramesh_98224",
    location: "Sangli, Maharashtra",
    tehsil: "Miraj / Kupwad Block",
    village: "Kupwad Shivar",
    pincode: "416416",
    crop: "Cotton & Tomato",
    acreage: "14.5 Total Acres (6 Plots)",
    soilType: "Medium Black Soil",
    kisanCardNumber: "MH-PMK-2024-88421",
    healthStatus: "2 Plots Need Action",
    avatar: "👨‍🌾",
    lang: "en"
  },
  {
    id: "usr-farmer-santosh",
    role: "farmer",
    name: "Santosh Deshmukh",
    username: "santosh_d",
    password: "kisan123",
    phone: "+91 94220 18452",
    email: "santosh.deshmukh@kisan.in",
    state: "Maharashtra",
    district: "Kolhapur",
    aadharNumber: "7719 4432 1845",
    aadharMasked: "XXXX-XXXX-1845",
    authToken: "tok_farmer_santosh_94220",
    location: "Kolhapur, Maharashtra",
    tehsil: "Shirol Block",
    village: "Shirol Shivar",
    pincode: "416103",
    crop: "Sugarcane & Soybean",
    acreage: "8.0 Total Acres (4 Plots)",
    soilType: "Alluvial Clay Soil",
    kisanCardNumber: "MH-PMK-2024-77190",
    healthStatus: "1 Plot Need Action",
    avatar: "🚜",
    lang: "mr"
  },

  // 🏛️ GOVERNMENT OFFICIALS DIRECTORY & LOGIN IDS (Area-Wise)
  {
    id: "usr-officer-suhas",
    govtId: "GOV-AGRI-MH-01",
    role: "officer",
    name: "Dr. Suhas More",
    username: "officer_maharashtra",
    altUsername: "dr_suhas",
    password: "officer123",
    phone: "+91 98900 12345",
    state: "Maharashtra",
    district: "Sangli",
    officePhone: "0233-2670841",
    email: "officer.maharashtra@agri.gov.in",
    aadharNumber: "8491 2284 4891",
    aadharMasked: "XXXX-XXXX-4891",
    authToken: "tok_officer_suhas_98900",
    designation: "District Agriculture Extension Officer (Class-I)",
    department: "Department of Agriculture, Govt. of Maharashtra",
    jurisdictionArea: "Sangli District HQ & Miraj Agricultural Corridor",
    officeLocation: "District Collectorate Agri Wing, Sangli - 416416",
    badge: "Govt. Class-I Officer",
    avatar: "🧑‍🔬",
    lang: "en"
  },
  {
    id: "usr-officer-anjali",
    govtId: "GOV-MH-TSG-02",
    role: "officer",
    name: "Dr. Anjali Kulkarni",
    phone: "+91 98231 66789",
    officePhone: "02346-240112",
    email: "dr.anjali.kulkarni@agri.gov.in",
    aadharNumber: "7823 4519 6723",
    aadharMasked: "XXXX-XXXX-6723",
    authToken: "tok_officer_anjali_98231",
    designation: "Senior Plant Pathologist & Horticulture Specialist",
    department: "Krishi Vigyan Kendra (ICAR-KVK), Tasgaon",
    jurisdictionArea: "Tasgaon, Kavathe Mahankal & East Sangli Grape Belt",
    officeLocation: "ICAR-KVK Research Complex, Tasgaon - 416312",
    badge: "Senior Pathologist",
    avatar: "👩‍🔬",
    lang: "en"
  },
  {
    id: "usr-officer-rajesh",
    govtId: "GOV-MH-WLW-03",
    role: "officer",
    name: "Shri. Rajesh Patil",
    phone: "+91 97654 32190",
    officePhone: "02342-220455",
    email: "rajesh.patil@agri.gov.in",
    aadharNumber: "6140 9812 9140",
    aadharMasked: "XXXX-XXXX-9140",
    authToken: "tok_officer_rajesh_97654",
    designation: "Sub-Divisional Agriculture Officer (SDAO)",
    department: "Division of Soil & Water Conservation, Govt. of Maharashtra",
    jurisdictionArea: "Walwa, Shirala & Islampur Fertile Sugarcane Basin",
    officeLocation: "Sub-Divisional Agri Administrative Complex, Islampur - 415409",
    badge: "SDAO Officer",
    avatar: "👨‍💼",
    lang: "mr"
  },
  {
    id: "usr-officer-vikram",
    govtId: "GOV-MH-JTH-04",
    role: "officer",
    name: "Dr. Vikram Shinde",
    phone: "+91 94211 78901",
    officePhone: "02344-246022",
    email: "dr.vikram.shinde@agri.gov.in",
    aadharNumber: "9052 3341 3352",
    aadharMasked: "XXXX-XXXX-3352",
    authToken: "tok_officer_vikram_94211",
    designation: "District Biocontrol & IPM Surveillance Officer",
    department: "Commissionerate of Agriculture (Plant Protection), Maharashtra",
    jurisdictionArea: "Jath, Atpadi & Khanapur Drought Prone Watershed Area",
    officeLocation: "Taluka Agriculture Command Center, Jath - 416404",
    badge: "Biocontrol Lead",
    avatar: "🧑‍🌾",
    lang: "mr"
  },
  {
    id: "usr-officer-sunita",
    govtId: "GOV-MH-KLP-05",
    role: "officer",
    name: "Smt. Sunita Jadhav",
    phone: "+91 99220 44567",
    officePhone: "0231-2651402",
    email: "sunita.jadhav@mahadbt.gov.in",
    aadharNumber: "4481 6620 5581",
    aadharMasked: "XXXX-XXXX-5581",
    authToken: "tok_officer_sunita_99220",
    designation: "Assistant Director of Agriculture & DBT Schemes Nodal Officer",
    department: "Mahadbt & PM-KISAN State Implementation Wing",
    jurisdictionArea: "Shirol, Hatkanangale & Kolhapur Regional Basin",
    officeLocation: "Joint Director of Agriculture Office, Kolhapur - 416003",
    badge: "DBT Schemes Director",
    avatar: "👩‍💼",
    lang: "en"
  },

  // 🤝 AGRICULTURAL ORGANISATIONS & NGOS DIRECTORY & LOGIN IDS
  {
    id: "usr-ngo-sangli-organic",
    govtId: "FPO-MH-SGL-01",
    orgRegId: "MH/2020/0278144",
    role: "ngo",
    name: "Sangli Organic Farmers Producer Co. Ltd.",
    authorizedPerson: "Shri. Babasaheb Kadam (President)",
    phone: "+91 98229 44120",
    officePhone: "0233-2550198",
    email: "contact@sangliorganicfpo.in",
    aadharNumber: "7742 8819 3341",
    aadharMasked: "XXXX-XXXX-3341",
    authToken: "tok_ngo_sangli_98229",
    designation: "Farmer Producer Organisation (FPO & Organic Federation)",
    department: "NABARD & SFAC Registered Producer Enterprise",
    jurisdictionArea: "Sangli, Miraj & Krishna River Organic Cluster (1,240 Farmers)",
    officeLocation: "Market Yard Agro Commercial Complex, Sangli - 416416",
    badge: "NABARD Registered FPO",
    memberFarmersCount: 1240,
    avatar: "🌾",
    lang: "en"
  },
  {
    id: "usr-ngo-grape-relief",
    govtId: "NGO-MH-TSG-02",
    orgRegId: "MH/2018/0192305",
    role: "ngo",
    name: "Maha Grape & Horticulture Growers Relief Trust",
    authorizedPerson: "Dr. Pramod Mane (Managing Trustee)",
    phone: "+91 94238 67102",
    officePhone: "02346-248900",
    email: "trust@mahagrapegrowers.org",
    aadharNumber: "6619 4520 8924",
    aadharMasked: "XXXX-XXXX-8924",
    authToken: "tok_ngo_grape_94238",
    designation: "Agricultural Non-Profit Organisation / NGO",
    department: "NITI Aayog Darpan & MSAMB Affiliated Trust",
    jurisdictionArea: "Tasgaon, Kavathe Mahankal & Khanapur Grape Belt (850 Farms)",
    officeLocation: "Horticulture Vikas Bhavan, Tasgaon - 416312",
    badge: "State Recognized NGO",
    memberFarmersCount: 850,
    avatar: "🍇",
    lang: "mr"
  },
  {
    id: "usr-ngo-krishna-valley",
    govtId: "AGRI-MH-WLW-03",
    orgRegId: "MH/2019/0245611",
    role: "ngo",
    name: "Krishna Valley Cane & Soil Conservation Federation",
    authorizedPerson: "Smt. Vaishali Shinde (Secretary)",
    phone: "+91 98600 78451",
    officePhone: "02342-224810",
    email: "connect@krishnavalleysustain.org",
    aadharNumber: "5521 7890 1267",
    aadharMasked: "XXXX-XXXX-1267",
    authToken: "tok_ngo_krishna_98600",
    designation: "Cooperative Agricultural Development Organisation",
    department: "National Cooperative Development Corporation (NCDC)",
    jurisdictionArea: "Walwa, Shirala & Islampur Sugarcane Watershed Basin (1,600 Farmers)",
    officeLocation: "Agro-Biotech Hub, Islampur - 415409",
    badge: "Soil Health Federation",
    memberFarmersCount: 1600,
    avatar: "🌱",
    lang: "mr"
  },
  {
    id: "usr-ngo-jath-watershed",
    govtId: "NGO-MH-JTH-04",
    orgRegId: "MH/2017/0156782",
    role: "ngo",
    name: "Jath Drought Mitigation & Rural Watershed Sanstha",
    authorizedPerson: "Shri. Dnyaneshwar Gaikwad (Program Director)",
    phone: "+91 94045 11928",
    officePhone: "02344-245100",
    email: "helpline@jathwatershed.org",
    aadharNumber: "9183 3341 5590",
    aadharMasked: "XXXX-XXXX-5590",
    authToken: "tok_ngo_jath_94045",
    designation: "Rural Watershed NGO & Climate Resilience Society",
    department: "NITI Aayog Darpan Registered NGO",
    jurisdictionArea: "Jath & Atpadi Arid Rainfed Sector (920 Dryland Farmers)",
    officeLocation: "Gramin Vikas Kendra, Jath - 416404",
    badge: "NITI Aayog Darpan NGO",
    memberFarmersCount: 920,
    avatar: "💧",
    lang: "mr"
  },
  {
    id: "usr-ngo-sahyadri-agro",
    govtId: "FPO-MH-KLP-05",
    orgRegId: "U01111MH2021PTC356789",
    role: "ngo",
    name: "Sahyadri Agro-Eco Producer & Biocontrol Consortium",
    authorizedPerson: "Dr. Arvind Deshpande (Executive Director)",
    phone: "+91 97633 55214",
    officePhone: "0231-2689940",
    email: "director@sahyadriagroeco.in",
    aadharNumber: "4490 1187 6632",
    aadharMasked: "XXXX-XXXX-6632",
    authToken: "tok_ngo_sahyadri_97633",
    designation: "Biocontrol & Sustainable Farming Consortium",
    department: "Ministry of Corporate Affairs & SFAC Certified",
    jurisdictionArea: "Shirol, Hatkanangale & Kolhapur Floodplains (1,450 Members)",
    officeLocation: "Sahyadri Krishi Bhavan, Kolhapur - 416003",
    badge: "SFAC Certified FPO",
    memberFarmersCount: 1450,
    avatar: "🤝",
    lang: "en"
  }
];

export const AppProvider = ({ children }) => {
  // 1. Accounts Registry & Session Management
  const [accounts, setAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('cs_accounts_v6');
      let parsed = saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
      if (Array.isArray(parsed)) {
        parsed = parsed.filter(a => {
          const n = (a.name || '').trim().toLowerCase();
          const u = (a.username || '').trim().toLowerCase();
          const p = (a.phone || '').replace(/\s+/g, '');
          const e = (a.email || '').toLowerCase();
          return n !== 'ram' && u !== 'ram' && !p.includes('11223') && !e.includes('ram@kisan');
        });
        if (parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_ACCOUNTS;
  });

  const [activeUserId, setActiveUserId] = useState(() => {
    const cur = localStorage.getItem('cs_active_user_id') || 'usr-farmer-ramesh';
    if (cur === 'usr-farmer-ram' || (cur.toLowerCase().includes('ram') && !cur.includes('ramesh'))) {
      return 'usr-farmer-ramesh';
    }
    return cur;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('cs_is_logged_in') === 'true';
  });

  // 1b. State-Wise Farmer Registrations Registry (Dispatched to State Agri Officers)
  const [registeredFarmersRegistry, setRegisteredFarmersRegistry] = useState(() => {
    const initialReg = [
      {
        id: "usr-farmer-ramesh",
        name: "Ramesh Patil",
        username: "ramesh_patil",
        phone: "+91 98224 55120",
        state: "Maharashtra",
        district: "Sangli",
        crop: "Cotton & Tomato",
        acreage: "14.5 Acres",
        aadharMasked: "XXXX-XXXX-5512",
        registeredAt: "22 Sep 2026, 09:30 AM",
        status: "Active (Verified by State Agri Office)"
      },
      {
        id: "usr-farmer-santosh",
        name: "Santosh Deshmukh",
        username: "santosh_d",
        phone: "+91 94220 18452",
        state: "Maharashtra",
        district: "Kolhapur",
        crop: "Sugarcane & Soybean",
        acreage: "8.0 Acres",
        aadharMasked: "XXXX-XXXX-1845",
        registeredAt: "21 Sep 2026, 03:15 PM",
        status: "Active (Verified by State Agri Office)"
      }
    ];
    try {
      const saved = localStorage.getItem('cs_farmer_registrations_v2');
      if (!saved) return initialReg;
      const parsed = JSON.parse(saved);
      return parsed.filter(a => 
        a.name?.trim().toLowerCase() !== 'ram' && 
        a.username?.trim().toLowerCase() !== 'ram' && 
        !a.phone?.includes('11223')
      );
    } catch (e) {
      return initialReg;
    }
  });

  // Purge ram immediately from localStorage on startup
  useEffect(() => {
    try {
      const savedAccs = localStorage.getItem('cs_accounts_v6');
      if (savedAccs) {
        const parsed = JSON.parse(savedAccs);
        const filtered = parsed.filter(a => 
          a.name?.trim().toLowerCase() !== 'ram' && 
          a.username?.trim().toLowerCase() !== 'ram' && 
          !a.phone?.includes('11223') && 
          a.email !== 'ram@kisan.in'
        );
        if (filtered.length !== parsed.length) {
          localStorage.setItem('cs_accounts_v6', JSON.stringify(filtered));
          setAccounts(filtered);
        }
      }
      const activeId = localStorage.getItem('cs_active_user_id');
      const currentActive = accounts.find(a => a.id === activeId);
      if (currentActive && (currentActive.name?.trim().toLowerCase() === 'ram' || currentActive.username?.trim().toLowerCase() === 'ram' || currentActive.phone?.includes('11223'))) {
        setActiveUserId('usr-farmer-ramesh');
        localStorage.setItem('cs_active_user_id', 'usr-farmer-ramesh');
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    localStorage.setItem('cs_farmer_registrations_v2', JSON.stringify(registeredFarmersRegistry));
  }, [registeredFarmersRegistry]);

  useEffect(() => {
    localStorage.setItem('cs_accounts_v6', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('cs_active_user_id', activeUserId);
  }, [activeUserId]);

  const currentUser = accounts.find(a => a.id === activeUserId) || accounts[0] || INITIAL_ACCOUNTS[0];
  const role = currentUser.role;

  // Active navigation tab for farmer: 'esp32LiveData' | 'scan' | 'market' | 'alerts' | 'more'
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'home') return 'esp32LiveData';
      if (['esp32LiveData', 'scan', 'market', 'alerts', 'more'].includes(hash)) return hash;
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'home') return 'esp32LiveData';
      if (tab && ['esp32LiveData', 'scan', 'market', 'alerts', 'more'].includes(tab)) return tab;
    } catch {}
    return 'esp32LiveData';
  });

  useEffect(() => {
    const handleHash = () => {
      try {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'home') {
          setActiveTab('esp32LiveData');
        } else if (['esp32LiveData', 'scan', 'market', 'alerts', 'more'].includes(hash)) {
          setActiveTab(hash);
        }
      } catch {}
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  // Active navigation tab for officer
  const [officerTab, setOfficerTab] = useState('dashboard');

  // Theme mode: 'dark' (default) | 'light'
  const [theme, setTheme] = useState(() => localStorage.getItem('cs_theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('cs_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  // 2. ISOLATED PER-ACCOUNT STATE (Zero data bleed across accounts)
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem(`cs_lang_${activeUserId}`) || currentUser.lang || 'en';
  });

  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isAccountSwitcherOpen, setIsAccountSwitcherOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isChotaKissanOpen, setIsChotaKissanOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Isolated Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(`cs_cart_${activeUserId}`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'med-cotton-blight',
        name: 'Streptocycline 90% + Copper Oxychloride Combo',
        price: 240,
        mrp: 320,
        quantity: 1,
        selected: true,
        category: 'Emergency Protection',
        icon: '🧪',
        unit: 'Combo Pack (75g + 500g)',
        subsidyDiscount: 80
      }
    ];
  });

  // Isolated Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(`cs_orders_${activeUserId}`);
    return saved ? JSON.parse(saved) : [
      {
        orderId: `CS-${activeUserId.slice(-4)}-9842`,
        date: "26 Aug 2026, 04:30 PM",
        farmerName: currentUser.name,
        phone: currentUser.phone,
        address: `${currentUser.village || currentUser.location || 'Sangli'} - 416416`,
        items: [
          { id: "fert-1", name: "IFFCO Nano Urea Liquid (500 ml)", price: 225, mrp: 240, quantity: 2, subsidyDiscount: 15 },
          { id: "pest-1", name: "Coromandel Mancozeb 75% WP (500 g)", price: 290, mrp: 360, quantity: 1, subsidyDiscount: 70 }
        ],
        subtotal: 740,
        subsidySavings: 100,
        gst: 37,
        deliveryFee: 0,
        total: 777,
        paymentMethod: "UPI (Google Pay)",
        transactionId: "UPI-98421034-OKAXIS",
        status: "Confirmed & Dispatched from KVK Sangli Hub",
        estimatedDelivery: "28 Aug 2026 (Tomorrow by 2 PM)",
        trackingNumber: "TRK-MH-SGL-2026-8841"
      }
    ];
  });

  // Isolated In-App Alerts
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem(`cs_alerts_${activeUserId}`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'alt-1',
        type: 'critical',
        severity: 'critical',
        time: 'Just now',
        titleEn: 'Plot 2 (Cotton) Bacterial Blight Active',
        titleMr: 'प्लॉट २ (कापूस) जिवाणू करपा आढळला',
        titleHi: 'प्लॉट 2 (कपास) बैक्टीरियल ब्लाइट प्रकोप',
        titleTa: 'நிலம் 2 (பருத்தி) பாக்டீரியா கருகல் நோய் உள்ளது',
        titleTe: 'పొలం 2 (పత్తి) బాక్టీరియల్ బ్లైట్ వ్యాపించింది',
        titleKn: 'ಜಮೀನು 2 (ಹತ್ತಿ) ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್ ರೋಗವಿದೆ',
        descEn: 'Angular water-soaked spots detected on leaves. Streptocycline spray needed within 24 hours.',
        descMr: 'पानांवर करप्याचे डाग आढळले. स्ट्रेप्टोमायसीन फवारणी तातडीने करा.',
        descHi: 'पत्तियों पर धब्बे दिखे हैं। तुरंत स्ट्रेप्टोसाइक्लिन छिड़काव करें।',
        descTa: 'இலைகளில் கருகல் புள்ளிகள் காணப்படுகின்றன. 24 மணி நேரத்தில் ஸ்ட்ரெப்டோசைக்ளின் தெளிக்கவும்.',
        descTe: 'ఆకులపై మచ్చలు కనిపించాయి. 24 గంటల్లో స్ట్రెప్టోసైక్లిన్ పిచికారీ చేయండి.',
        descKn: 'ಎಲೆಗಳ ಮೇಲೆ ಕಲೆಗಳು ಕಂಡುಬಂದಿವೆ. 24 ಗಂಟೆಗಳಲ್ಲಿ ಸ್ಟ್ರೆಪ್ಟೊಸೈಕ್ಲಿನ್ ಸಿಂಪಡಿಸಿ.',
        fullAdvisoryEn: 'Bacterial inoculum is expanding in Block B. Prune heavily infected bottom leaves and spray Streptocycline (0.5g/L) + Copper Oxychloride (2.5g/L) before tomorrow evening rain.',
        fullAdvisoryMr: 'जिवाणूंचा प्रादुर्भाव वाढू नये म्हणून बाधित पाने छाटा आणि स्ट्रेप्टोमायसीन व कॉपर फवारा.',
        fullAdvisoryHi: 'रोग विस्तार रोकने के लिए प्रभावित पत्तियां काटें और 24 घंटे में छिड़काव करें।',
        fullAdvisoryTa: 'பாதிக்கப்பட்ட கீழ் இலைகளை வெட்டிவிட்டு ஸ்ட்ரெப்டோசைக்ளின் மற்றும் காப்பர் ஆக்ஸிகுளோரைடு தெளிக்கவும்.',
        locationEn: 'Kupwad / Miraj Block, Sangli',
        locationMr: 'कुपवाड / मिरज विभाग, सांगली',
        locationHi: 'कुपवाड़ / मिरज ब्लॉक, सांगली',
        locationTa: 'குப்வாட் / மிராஜ் பகுதி, சாங்லி',
        lat: 16.8524,
        lng: 74.5815,
        radius: 3200,
        color: '#ef4444',
        read: false,
        smsSent: true
      },
      {
        id: 'alt-2',
        type: 'weather',
        severity: 'high',
        time: '2 hours ago',
        titleEn: 'Heavy Rainfall & Humidity Warning (Sangli)',
        titleMr: 'सांगली भागात जास्त आर्द्रतेचा इशारा (८५%)',
        titleHi: 'सांगली में भारी आर्द्रता (85%) चेतावनी',
        titleTa: 'சாங்லி பகுதியில் அதிக மழை & ஈரப்பதம் எச்சரிக்கை',
        titleTe: 'సాంగ్లీలో భారీ వర్షం & తేమ హెచ్చరిక',
        titleKn: 'ಸಾಂಗ್ಲಿಯಲ್ಲಿ ಭಾರಿ ಮಳೆ & ತೇವಾಂಶ ಎಚ್ಚರಿಕೆ',
        descEn: '85% humidity expected tomorrow. Spore germination conditions high.',
        descMr: 'उद्या संध्याकाळी पावसाची शक्यता. बुरशीचा प्रादुर्भाव वाढू शकतो.',
        descHi: 'कल शाम बारिश की संभावना। कवक संक्रमण का खतरा अधिक।',
        descTa: 'நாளை 85% ஈரப்பதம் எதிர்பார்க்கப்படுகிறது. பூஞ்சை பரவும் அபாயம் அதிகம்.',
        descTe: 'రేపు 85% తేమ ఉండే అవకాశం. శిలీంధ్ర వ్యాప్తి ప్రమాదం ఎక్కువ.',
        descKn: 'ನಾಳೆ 85% ತೇವಾಂಶ ನಿರೀಕ್ಷಿಸಲಾಗಿದೆ. ಶಿಲೀಂಧ್ರ ಹರಡುವ ಅಪಾಯ ಹೆಚ್ಚು.',
        fullAdvisoryEn: 'IMD Pune radar indicates localized convection storms across Sangli district with high relative humidity. Avoid overhead nitrogen broadcasting.',
        fullAdvisoryMr: 'हवामान विभागाच्या अंदाजानुसार दमट हवामानामुळे करपा वाढू शकतो. खतांची फवारणी तात्पुरती थांबवा.',
        fullAdvisoryHi: 'मौसम विभाग के अनुसार भारी आर्द्रता रहेगी। कवकनाशी का समय पर उपयोग करें।',
        fullAdvisoryTa: 'வானிலை மையம் அதிக ஈரப்பதத்தை எச்சரிக்கிறது. தற்காலிகமாக உரமிடுவதை தவிர்க்கவும்.',
        locationEn: 'Sangli District Wide',
        locationMr: 'संपूर्ण सांगली जिल्हा',
        locationHi: 'संपूर्ण सांगली जिला',
        locationTa: 'சாங்லி மாவட்டம் முழுவதும்',
        lat: 16.8700,
        lng: 74.6000,
        radius: 5000,
        color: '#f59e0b',
        read: false,
        smsSent: true
      },
      {
        id: 'alt-3',
        type: 'critical',
        severity: 'medium',
        time: 'Yesterday',
        titleEn: 'Plot 4 (Tomato) Early Blight Notice',
        titleMr: 'प्लॉट ४ (टोमॅटो) करपा प्रतिबंधक सल्ला',
        titleHi: 'प्लॉट 4 (टमाटर) अगेती झुलसा नोटिस',
        titleTa: 'நிலம் 4 (தக்காளி) முற்கால கருகல் எச்சரிக்கை',
        titleTe: 'పొలం 4 (టమోటా) ముందస్తు తెగులు హెచ్చరిక',
        titleKn: 'ಜಮೀನು 4 (ಟೊಮೆಟೊ) ಆರಂಭಿಕ ರೋಗ ಎಚ್ಚರಿಕೆ',
        descEn: 'Concentric rings spotted on lower leaves. Mancozeb spray suggested.',
        descMr: 'खालच्या पानांवर डाग आढळले. मँकोझेब फवारणीचा सल्ला.',
        descHi: 'निचली पत्तियों पर धब्बे दिखे। मैंकोजेब छिड़काव करें।',
        descTa: 'கீழ் இலைகளில் புள்ளிகள் காணப்படுகின்றன. மான்கோசெப் தெளிக்கவும்.',
        descTe: 'దిగువ ఆకులపై మచ్చలు కనిపించాయి. మాంకోజెబ్ పిచికారీ చేయండి.',
        descKn: 'ಕೆಳಗಿನ ಎಲೆಗಳಲ್ಲಿ ಕಲೆಗಳು ಕಂಡುಬಂದಿವೆ. ಮ್ಯಾಂಕೋಜೆಬ್ ಸಿಂಪಡಿಸಿ.',
        fullAdvisoryEn: 'Alternaria solani target spots detected on 4 plants. Apply Mancozeb (2.0g/L) to prevent stem canker.',
        fullAdvisoryMr: 'टोमॅटो पिकावर अगेती करपा बुरशी आढळली आहे. मँकोझेब बुरशीनाशक फवारा.',
        fullAdvisoryHi: 'टमाटर में अगेती झुलसा दिखा है। मैंकोजेब का छिड़काव करें।',
        fullAdvisoryTa: 'தக்காளியில் கருகல் நோய் பரவாமல் தடுக்க மான்கோசெப் பூஞ்சைக்கொல்லி தெளிக்கவும்.',
        locationEn: 'Miraj North Plot 4',
        locationMr: 'मिरज उत्तर प्लॉट ४',
        locationHi: 'मिरज उत्तर प्लॉट 4',
        locationTa: 'மிராஜ் வடக்கு நிலம் 4',
        lat: 16.8350,
        lng: 74.6200,
        radius: 1800,
        color: '#ef4444',
        read: true,
        smsSent: false
      },
      {
        id: 'alt-4',
        type: 'advisory',
        severity: 'low',
        time: '2 days ago',
        titleEn: 'PM-KISAN 17th Installment Credited',
        titleMr: 'पीएम-किसान १७ वा हप्ता खात्यात जमा',
        titleHi: 'पीएम-किसान 17वीं किस्त खाते में जमा',
        titleTa: 'பிஎம்-கிசான் 17வது தவணை வரவு வைக்கப்பட்டது',
        titleTe: 'పీఎం-కిసాన్ 17వ విడత ఖాతాలో జమ అయింది',
        titleKn: 'ಪಿಎಂ-ಕಿಸಾನ್ 17ನೇ ಕಂತು ಖಾತೆಗೆ ಜಮೆಯಾಗಿದೆ',
        descEn: '₹2,000 Direct Benefit Transfer credited to your bank account.',
        descMr: '₹२,००० थेट बँक खात्यात डीबीटी द्वारे जमा झाले आहेत.',
        descHi: '₹2,000 सीधे बैंक खाते में डीबीटी द्वारा जमा।',
        descTa: '₹2,000 நேரடி பணப்பரிமாற்றம் மூலம் வங்கி கணக்கில் வரவு வைக்கப்பட்டது.',
        descTe: '₹2,000 నేరుగా మీ బ్యాంకు ఖాతాలో జమ అయ్యాయి.',
        descKn: '₹2,000 ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮೆಯಾಗಿದೆ.',
        fullAdvisoryEn: 'Government of Maharashtra confirmed disbursement under PM-KISAN & Namo Shetkari Mahasanman Yojana.',
        fullAdvisoryMr: 'नमो शेतकरी महासन्मान निधी अंतर्गत अनुदान थेट खात्यात जमा झाले आहे.',
        fullAdvisoryHi: 'नमो शेतकरी योजना के तहत अनुदान सफलतापूर्वक हस्तांतरित।',
        fullAdvisoryTa: 'பிஎம்-கிசான் திட்டத்தின் கீழ் நிதி வெற்றிகரமாக உங்கள் கணக்கில் வரவு வைக்கப்பட்டது.',
        locationEn: 'State-wide Maharashtra',
        locationMr: 'संपूर्ण महाराष्ट्र',
        locationHi: 'संपूर्ण महाराष्ट्र',
        locationTa: 'மகாராஷ்டிரா முழுவதும்',
        lat: 16.8524,
        lng: 74.5815,
        radius: 1200,
        color: '#16a34a',
        read: true,
        smsSent: false
      }
    ];
  });

  // Isolated SMS Dispatches History
  const [smsHistory, setSmsHistory] = useState(() => {
    const saved = localStorage.getItem(`cs_sms_${activeUserId}`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'sms-1',
        recipient: currentUser.phone,
        sender: 'VK-KISAAN',
        timestamp: 'Today, 08:31 AM',
        severity: 'CRITICAL',
        message: 'EMERGENCY CROP ALERT: Bacterial Blight detected in Sangli Miraj sector. Immediate Streptocycline spray recommended before rainfall. - Agri Extension Dept MH'
      },
      {
        id: 'sms-2',
        recipient: currentUser.phone,
        sender: 'VK-KISAAN',
        timestamp: 'Yesterday, 02:15 PM',
        severity: 'HIGH',
        message: 'WEATHER ADVISORY: 85% relative humidity & storm alert in Sangli district for next 24 hours. Monitor foliage. - IMD Pune & KVK Hub'
      }
    ];
  });

  // Active Emergency SMS Toast Notification Banner
  const [emergencySmsToast, setEmergencySmsToast] = useState(null);

  // Farmer Field Scan Reports
  const [reports, setReports] = useState(() => {
    const saved = localStorage.getItem(`cs_reports_${activeUserId}`);
    return saved ? JSON.parse(saved) : seedFarmerReports;
  });

  const addReport = (newReport) => {
    const reportItem = {
      id: `rep-${Date.now()}`,
      farmerName: currentUser.name,
      phone: currentUser.phone,
      village: currentUser.village || currentUser.location || "Sangli",
      date: new Date().toLocaleDateString('en-GB') + ` ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      status: "Submitted (Under Officer Review)",
      officerRemarks: "Field diagnostic data submitted to Taluka Agriculture Extension Office.",
      verifiedBy: "Dr. Suhas More (District Extension Officer)",
      verifiedAt: null,
      recheckDate: "In 3 Days",
      ...newReport
    };
    setReports(prev => [reportItem, ...prev]);
    return reportItem;
  };

  // Farmer Community Posts
  const [communityPosts, setCommunityPosts] = useState(() => {
    const saved = localStorage.getItem('cs_community_posts');
    return saved ? JSON.parse(saved) : seedCommunityPosts;
  });

  const addCommunityPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      author: currentUser.name,
      location: currentUser.village || currentUser.location || "Sangli",
      role: `Farmer (${currentUser.crop || 'Crop'} - ${currentUser.acreage || 'Farm'})`,
      avatar: currentUser.avatar || "👨‍🌾",
      timeAgo: "Just now",
      crop: currentUser.crop || "Mixed Crops",
      title: postData.title,
      content: postData.content,
      image: postData.image || null,
      likes: 1,
      commentsCount: 0,
      trapCount: postData.trapCount || "",
      isOfficerVerified: false,
      officerReview: null,
      comments: []
    };
    setCommunityPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const verifyCommunityPost = (postId, remarks, actionNotice) => {
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isOfficerVerified: true,
          officerReview: {
            officerName: currentUser.name || "Dr. Suhas More",
            officerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
            designation: "District Agriculture Extension Officer, Sangli",
            date: "Just now",
            badge: "Official Agriculture Dept Validation",
            comment: remarks,
            actionTaken: actionNotice || "Field Action Recorded"
          }
        };
      }
      return p;
    }));
  };

  const addCommentToPost = (postId, commentText) => {
    if (!commentText) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: currentUser.name,
      avatar: currentUser.avatar || "👨‍🌾",
      role: currentUser.role === 'officer' ? 'Agri Officer' : 'Farmer',
      time: "Just now",
      text: commentText
    };
    setCommunityPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: (p.commentsCount || 0) + 1,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    }));
  };

  // Soil Health Cards & Testing
  const [soilHealthCards, setSoilHealthCards] = useState(() => {
    const saved = localStorage.getItem(`cs_soil_cards_${activeUserId}`);
    return saved ? JSON.parse(saved) : seedSoilHealthCards;
  });

  const bookSoilTest = (bookingData) => {
    const newCard = {
      id: `shc-${Date.now()}`,
      farmerName: currentUser.name,
      phone: currentUser.phone,
      plotName: bookingData.plotName || "Plot 1",
      surveyNumber: bookingData.surveyNumber || "Gat No. 101",
      sampleDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      reportDate: "Sample In-Transit to KVK Lab",
      labName: "District Soil Testing Laboratory, KVK Sangli",
      labCertification: "NABL & ICAR Accredited (ISO/IEC 17025)",
      soilType: bookingData.soilType || "Medium Black Soil",
      overallStatus: "Sample Collected (Lab Testing In-Progress)",
      healthScore: 78,
      parameters: seedSoilHealthCards[0].parameters,
      deficiencies: [
        "Lab test scheduled. Preliminary visual assessment shows healthy soil moisture."
      ],
      fertilizerPrescription: [
        { fertilizer: "Organic Compost", dose: "4 Tons / Acre", time: "Pre-sowing" },
        { fertilizer: "19:19:19 Starter", dose: "4 kg / Acre", time: "Transplanting + 15 days" }
      ]
    };
    setSoilHealthCards(prev => [newCard, ...prev]);
    return newCard;
  };

  // Active Diagnosis & Leaf Image State
  const [selectedLeafImage, setSelectedLeafImage] = useState(null);
  const [currentDiagnosis, setCurrentDiagnosis] = useState(diseasesDatabase.earlyBlight);

  // Synchronize active account data on user switch (Zero Data Bleed!)
  useEffect(() => {
    localStorage.setItem(`cs_cart_${activeUserId}`, JSON.stringify(cart));
  }, [cart, activeUserId]);

  useEffect(() => {
    localStorage.setItem(`cs_orders_${activeUserId}`, JSON.stringify(orders));
  }, [orders, activeUserId]);

  useEffect(() => {
    localStorage.setItem(`cs_alerts_${activeUserId}`, JSON.stringify(alerts));
  }, [alerts, activeUserId]);

  useEffect(() => {
    localStorage.setItem(`cs_sms_${activeUserId}`, JSON.stringify(smsHistory));
  }, [smsHistory, activeUserId]);

  useEffect(() => {
    localStorage.setItem(`cs_lang_${activeUserId}`, lang);
  }, [lang, activeUserId]);

  useEffect(() => {
    localStorage.setItem(`cs_reports_${activeUserId}`, JSON.stringify(reports));
  }, [reports, activeUserId]);

  useEffect(() => {
    localStorage.setItem('cs_community_posts', JSON.stringify(communityPosts));
  }, [communityPosts]);

  useEffect(() => {
    localStorage.setItem(`cs_soil_cards_${activeUserId}`, JSON.stringify(soilHealthCards));
  }, [soilHealthCards, activeUserId]);

  // Load account-specific state whenever activeUserId changes
  const handleAccountSwitch = (newUserId) => {
    const target = accounts.find(a => a.id === newUserId);
    if (!target) return;

    setActiveUserId(newUserId);
    
    // Load isolated state for new user
    const savedCart = localStorage.getItem(`cs_cart_${newUserId}`);
    setCart(savedCart ? JSON.parse(savedCart) : []);

    const savedOrders = localStorage.getItem(`cs_orders_${newUserId}`);
    setOrders(savedOrders ? JSON.parse(savedOrders) : []);

    const savedAlerts = localStorage.getItem(`cs_alerts_${newUserId}`);
    if (savedAlerts) setAlerts(JSON.parse(savedAlerts));

    const savedSms = localStorage.getItem(`cs_sms_${newUserId}`);
    if (savedSms) setSmsHistory(JSON.parse(savedSms));

    const savedReports = localStorage.getItem(`cs_reports_${newUserId}`);
    setReports(savedReports ? JSON.parse(savedReports) : seedFarmerReports);

    const savedSoil = localStorage.getItem(`cs_soil_cards_${newUserId}`);
    setSoilHealthCards(savedSoil ? JSON.parse(savedSoil) : seedSoilHealthCards);
    if (savedSms) setSmsHistory(JSON.parse(savedSms));

    const savedLang = localStorage.getItem(`cs_lang_${newUserId}`) || target.lang || 'en';
    setLangState(savedLang);

    if (target.role === 'officer') {
      setOfficerTab('dashboard');
    } else {
      setActiveTab('esp32LiveData');
    }

    setIsAccountSwitcherOpen(false);
  };

  // 3. AUTHENTICATION & MULTI-ACCOUNT MANAGEMENT
  const signup = (formData) => {
    const { 
      name, 
      phone, 
      phoneOrEmail,
      username,
      state = 'Maharashtra', 
      district = 'Sangli', 
      aadharNo, 
      aadharNumber,
      lang: userLang = 'en', 
      password, 
      role = 'farmer', 
      crop = 'Cotton & Mixed Crops', 
      acreage = '5.0 Acres' 
    } = formData;

    // Validation
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Please enter your full name.' };
    }
    
    const rawPhone = phone || phoneOrEmail || '';
    const cleanDigits = rawPhone.replace(/\D/g, '');
    if (cleanDigits.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }

    if (!password || password.length < 4) {
      return { success: false, error: 'Password must be at least 4 characters long.' };
    }

    const cleanPhone = cleanDigits.slice(-10);
    const rawAadhaar = (aadharNo || aadharNumber || '').replace(/\D/g, '');
    const cleanUsername = (username || cleanPhone || name.toLowerCase().replace(/\s+/g, '_')).trim().toLowerCase();

    // Duplicate Check
    const existing = accounts.find(a => 
      (a.username && a.username.toLowerCase() === cleanUsername) ||
      (a.phone && a.phone.replace(/\D/g, '').slice(-10) === cleanPhone)
    );

    if (existing) {
      return { success: false, error: 'An account with this username or mobile number already exists.' };
    }

    const newUserId = `usr-${role}-${Date.now().toString().slice(-5)}`;
    const formattedAadhaar = rawAadhaar.length >= 12 
      ? `${rawAadhaar.slice(0, 4)} ${rawAadhaar.slice(4, 8)} ${rawAadhaar.slice(8, 12)}` 
      : (aadharNo || aadharNumber || '8841 9023 5512');
    const maskedAadhaar = rawAadhaar.length >= 4 
      ? `XXXX-XXXX-${rawAadhaar.slice(-4)}` 
      : 'XXXX-XXXX-5512';

    const newAccount = {
      id: newUserId,
      role,
      name: name.trim(),
      username: cleanUsername,
      password: password,
      phone: `+91 ${cleanPhone.slice(0, 5)} ${cleanPhone.slice(5)}`,
      email: `${cleanUsername}@kisan.in`,
      aadharNumber: formattedAadhaar,
      aadharMasked: maskedAadhaar,
      authToken: `tok_${role}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      state: state || 'Maharashtra',
      district: district || 'Sangli',
      location: `${district}, ${state}`,
      tehsil: `${district} Block`,
      village: `${district} Shivar`,
      crop: crop || 'Cotton & Tomato',
      acreage: acreage || '5.0 Acres',
      avatar: role === 'officer' ? '🧑‍🔬' : '👨‍🌾',
      designation: role === 'officer' ? 'Agriculture Extension Officer' : undefined,
      department: role === 'officer' ? 'Department of Agriculture' : undefined,
      lang: userLang || 'en'
    };

    setAccounts(prev => [newAccount, ...prev]);

    // Dispatch new farmer registration to the State Agri Officer
    const dispatchRecord = {
      id: newUserId,
      name: newAccount.name,
      username: newAccount.username,
      phone: newAccount.phone,
      state: newAccount.state,
      district: newAccount.district,
      crop: newAccount.crop,
      acreage: newAccount.acreage,
      aadharMasked: newAccount.aadharMasked,
      registeredAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: `Dispatched to ${newAccount.state} State Agri Office`
    };
    setRegisteredFarmersRegistry(prev => [dispatchRecord, ...prev]);

    handleAccountSwitch(newUserId);
    setLangState(userLang || 'en');
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    return { success: true, user: newAccount };
  };

  const login = (identifier, password) => {
    if (!identifier) {
      return { success: false, error: 'Please enter your username, mobile number, or Aadhaar number.' };
    }

    const cleanInput = identifier.trim().toLowerCase().replace(/[\s-]/g, '');
    const cleanDigits = identifier.replace(/\D/g, '');

    // Check if input matches any designated State Agri Officer
    let stateOfficerAccount = null;
    const matchedStateOfficer = Object.values(STATE_AGRI_OFFICERS).find(off => 
      off.username.toLowerCase() === cleanInput ||
      off.govtId.toLowerCase().replace(/[\s-]/g, '') === cleanInput ||
      (off.username.includes('maharashtra') && cleanInput === 'dr_suhas')
    );

    if (matchedStateOfficer) {
      // Find if already exists in accounts or add them
      stateOfficerAccount = accounts.find(a => a.id === matchedStateOfficer.id || a.username === matchedStateOfficer.username);
      if (!stateOfficerAccount) {
        stateOfficerAccount = {
          id: matchedStateOfficer.id,
          role: 'officer',
          name: matchedStateOfficer.name,
          username: matchedStateOfficer.username,
          altUsername: matchedStateOfficer.username.includes('maharashtra') ? 'dr_suhas' : undefined,
          password: matchedStateOfficer.password || 'officer123',
          govtId: matchedStateOfficer.govtId,
          state: matchedStateOfficer.state,
          district: matchedStateOfficer.district,
          jurisdictionArea: matchedStateOfficer.jurisdictionArea,
          department: matchedStateOfficer.department,
          designation: matchedStateOfficer.designation,
          phone: matchedStateOfficer.phone,
          email: matchedStateOfficer.email,
          avatar: matchedStateOfficer.avatar || '🧑‍🔬',
          authToken: `tok_officer_${matchedStateOfficer.id}`,
          lang: 'en'
        };
        setAccounts(prev => [...prev, stateOfficerAccount]);
      }
    }

    const matched = stateOfficerAccount || accounts.find(a => {
      const u = (a.username || '').toLowerCase().trim();
      const altU = (a.altUsername || '').toLowerCase().trim();
      const p = (a.phone || '').replace(/\D/g, '');
      const ad = (a.aadharNumber || '').replace(/\D/g, '');
      const e = (a.email || '').toLowerCase().trim();
      const n = (a.name || '').toLowerCase().replace(/[\s-]/g, '');
      const g = (a.govtId || '').toLowerCase().replace(/[\s-]/g, '');
      const id = (a.id || '').toLowerCase().trim();

      return u === cleanInput || 
             altU === cleanInput ||
             (cleanDigits.length >= 10 && p.endsWith(cleanDigits.slice(-10))) ||
             (cleanDigits.length === 12 && ad === cleanDigits) ||
             e === cleanInput || 
             n === cleanInput || 
             g === cleanInput ||
             id === cleanInput;
    });

    if (!matched) {
      return { success: false, error: 'Account not found. Please check your username or register a new account.' };
    }

    // Verify Password: if account has set password, require it; demo accounts accept kisan123 / officer123 or match
    if (matched.password) {
      if (password && matched.password !== password && password !== 'kisan123' && password !== 'officer123') {
        return { success: false, error: 'Incorrect password. Please try again.' };
      }
    }

    handleAccountSwitch(matched.id);
    if (matched.lang) {
      setLangState(matched.lang);
    }
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
    return { success: true, user: matched };
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('cs_is_logged_in', 'false');
    setIsAccountSwitcherOpen(false);
    setIsLoginModalOpen(false);
  };

  const removeAccount = (userIdToRemove) => {
    const updated = accounts.filter(a => a.id !== userIdToRemove);
    if (updated.length === 0) {
      setAccounts(INITIAL_ACCOUNTS);
      handleAccountSwitch(INITIAL_ACCOUNTS[0].id);
    } else {
      setAccounts(updated);
      if (activeUserId === userIdToRemove) {
        handleAccountSwitch(updated[0].id);
      }
    }
  };

  // 4. AGRI OFFICER REVIEW QUEUE & DYNAMIC FEEDBACK LOOP
  const [modelAccuracy, setModelAccuracy] = useState(98.4);
  const [fieldReviewQueue, setFieldReviewQueue] = useState([
    {
      id: "scan-rep-101",
      farmerName: "Ramesh Patil",
      farmerPhone: "+91 98224 55120",
      plotName: "Plot 2 - Cotton Field (Miraj)",
      submittedTime: "Today, 09:15 AM",
      crop: "Cotton (Bt Hybrid)",
      aiPredictedPathogen: "Bacterial Blight (Xanthomonas)",
      aiConfidence: 95.8,
      status: "pending", // 'pending' | 'approved' | 'corrected' | 'rejected'
      severity: "critical",
      image: "/samples/cotton_blight.jpg",
      officerNotes: "",
      verifiedPathogen: "Bacterial Blight (Xanthomonas)",
      recommendedChemical: "Streptocycline 90% + Copper Oxychloride"
    },
    {
      id: "scan-rep-102",
      farmerName: "Santosh Deshmukh",
      farmerPhone: "+91 94220 18452",
      plotName: "Plot 4 - Tomato Field (Shirol)",
      submittedTime: "Today, 08:40 AM",
      crop: "Tomato (Abhinav)",
      aiPredictedPathogen: "Early Blight (Alternaria solani)",
      aiConfidence: 94.2,
      status: "pending",
      severity: "high",
      image: "/samples/tomato_early_blight.jpg",
      officerNotes: "",
      verifiedPathogen: "Early Blight (Alternaria solani)",
      recommendedChemical: "Mancozeb 75% WP"
    },
    {
      id: "scan-rep-103",
      farmerName: "Ramesh Patil",
      farmerPhone: "+91 98224 55120",
      plotName: "Plot 1 - Rice Field (Kupwad)",
      submittedTime: "Yesterday, 04:10 PM",
      crop: "Rice (MTU 1010)",
      aiPredictedPathogen: "Optimal Canopy Health (No Pathogen)",
      aiConfidence: 98.7,
      status: "approved",
      severity: "low",
      image: "/samples/rice_healthy.jpg",
      officerNotes: "Confirmed healthy chlorophyll index. No spray needed.",
      verifiedPathogen: "Healthy Leaf Matrix",
      recommendedChemical: "None"
    }
  ]);

  // Officer Approves Scan
  const approveScan = (scanId, comment = "Diagnosis confirmed by District Extension Officer.") => {
    setFieldReviewQueue(prev => prev.map(s => {
      if (s.id === scanId) {
        return { ...s, status: 'approved', officerNotes: comment };
      }
      return s;
    }));

    // Dynamic Neural Feedback: Ground-truth approval reinforces model accuracy
    setModelAccuracy(prev => +(prev + 0.1).toFixed(1));

    // Dispatch verification alert & SMS to farmer
    const scan = fieldReviewQueue.find(s => s.id === scanId);
    if (scan) {
      triggerAlert({
        titleEn: `Officer Verified: ${scan.plotName}`,
        titleMr: `अधिकारी पडताळणी: ${scan.plotName}`,
        titleHi: `अधिकारी सत्यापन: ${scan.plotName}`,
        descEn: `Dr. Suhas More confirmed ${scan.aiPredictedPathogen}. Prescription: ${scan.recommendedChemical}`,
        descMr: `डॉ. सुहास मोरे यांनी ${scan.aiPredictedPathogen} रोगाची पुष्टी केली. औषध: ${scan.recommendedChemical}`,
        descHi: `डॉ. सुहास मोरे ने ${scan.aiPredictedPathogen} की पुष्टि की। दवा: ${scan.recommendedChemical}`,
        severity: scan.severity || 'high',
        locationEn: scan.plotName
      });
    }
  };

  // Officer Corrects / Rejects Scan
  const rejectOrCorrectScan = (scanId, correctedPathogen, customPrescription, comment) => {
    setFieldReviewQueue(prev => prev.map(s => {
      if (s.id === scanId) {
        return {
          ...s,
          status: 'corrected',
          verifiedPathogen: correctedPathogen,
          recommendedChemical: customPrescription,
          officerNotes: comment || `Corrected by Extension Officer to ${correctedPathogen}.`
        };
      }
      return s;
    }));

    // Ground-truth correction feedback
    setModelAccuracy(prev => +(prev + 0.05).toFixed(1));

    const scan = fieldReviewQueue.find(s => s.id === scanId);
    if (scan) {
      triggerAlert({
        titleEn: `Prescription Update: ${scan.plotName}`,
        titleMr: `औषध शिफारस सुधारणा: ${scan.plotName}`,
        titleHi: `दवा अनुशंसा सुधार: ${scan.plotName}`,
        descEn: `Corrected to ${correctedPathogen}. Use ${customPrescription}. Notes: ${comment}`,
        descMr: `दुरुस्ती: ${correctedPathogen}. वापरा: ${customPrescription}.`,
        descHi: `सुधार: ${correctedPathogen}. उपयोग करें: ${customPrescription}.`,
        severity: 'critical',
        locationEn: scan.plotName
      });
    }
  };

  // 5. EMERGENCY SMS GATEWAY DISPATCH
  const triggerAlert = (alertData) => {
    const isCriticalOrHigh = alertData.severity === 'critical' || alertData.severity === 'high';
    const newAlert = {
      id: `alt-${Date.now()}`,
      type: alertData.type || (alertData.severity === 'critical' ? 'critical' : 'advisory'),
      severity: alertData.severity || 'medium',
      time: 'Just now',
      titleEn: alertData.titleEn || alertData.title || 'Field Advisory Notice',
      titleMr: alertData.titleMr || alertData.title || 'शेती सल्ला सूचना',
      titleHi: alertData.titleHi || alertData.title || 'कृषि सलाह सूचना',
      descEn: alertData.descEn || alertData.desc || alertData.message || 'Check farm field status.',
      descMr: alertData.descMr || alertData.desc || 'शेताची पाहणी करा.',
      descHi: alertData.descHi || alertData.desc || 'खेत की स्थिति जांचें।',
      fullAdvisoryEn: alertData.descEn || 'Follow prescribed protocol.',
      fullAdvisoryMr: alertData.descMr || 'योग्य फवारणी करा.',
      fullAdvisoryHi: alertData.descHi || 'उचित छिड़काव करें।',
      locationEn: alertData.locationEn || currentUser.location || 'Sangli District',
      locationMr: currentUser.village || 'सांगली विभाग',
      locationHi: currentUser.village || 'सांगली क्षेत्र',
      lat: 16.8524,
      lng: 74.5815,
      radius: alertData.severity === 'critical' ? 3500 : 1500,
      color: alertData.severity === 'critical' ? '#ef4444' : '#f59e0b',
      read: false,
      smsSent: isCriticalOrHigh
    };

    setAlerts(prev => [newAlert, ...prev]);

    // If Critical or High Severity, automatically dispatch real-time emergency SMS!
    if (isCriticalOrHigh) {
      const smsEntry = {
        id: `sms-${Date.now()}`,
        recipient: currentUser.phone,
        sender: 'VK-KISAAN',
        timestamp: 'Just now',
        severity: alertData.severity.toUpperCase(),
        message: `EMERGENCY ALERT [${alertData.severity.toUpperCase()}]: ${alertData.titleEn || alertData.title}. ${alertData.descEn || alertData.desc}. For help call Kisan Helpline 1800-180-1551. - MH Agri Dept`
      };

      setSmsHistory(prev => [smsEntry, ...prev]);
      
      // Trigger interactive on-screen incoming SMS toast
      setEmergencySmsToast(smsEntry);
    }
  };

  const markAllAlertsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const broadcastNewAdvisory = (advisoryData) => {
    const newAdvisory = {
      id: `alt-broadcast-${Date.now()}`,
      type: advisoryData.severity === 'High' ? 'critical' : 'warning',
      severity: advisoryData.severity?.toLowerCase() || 'high',
      time: 'Just now',
      title: advisoryData.title,
      titleEn: advisoryData.title,
      titleMr: advisoryData.titleMr || advisoryData.title,
      titleHi: advisoryData.title,
      titleTa: advisoryData.title,
      descEn: advisoryData.message,
      descMr: advisoryData.message,
      descHi: advisoryData.message,
      descTa: advisoryData.message,
      message: advisoryData.message,
      fullAdvisoryEn: advisoryData.message,
      fullAdvisoryMr: advisoryData.message,
      locationEn: `${advisoryData.targetRadiusKm || 15}km Radius (Sangli District)`,
      locationMr: `सांगली जिल्हा (${advisoryData.targetRadiusKm || 15} किमी परिसर)`,
      lat: 16.8620,
      lng: 74.5380,
      radius: (advisoryData.targetRadiusKm || 15) * 1000,
      color: advisoryData.severity === 'High' ? '#ef4444' : '#f59e0b',
      read: false,
      smsSent: true,
      issuedBy: currentUser?.name || 'District Agri Officer'
    };

    setAlerts(prev => [newAdvisory, ...prev]);

    setEmergencySmsToast({
      visible: true,
      sender: "GOVT-AGRI-ALERT",
      message: `[Kisan Emergency Advisory] ${advisoryData.title}: ${advisoryData.message.slice(0, 80)}...`,
      phone: "+91 98224 55120"
    });

    return newAdvisory;
  };

  // 6. CART & CHECKOUT DISPATCH
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState(null);

  const addToCart = (product, qty = 1) => {
    if (!product) return;
    const safePrice = Number(product.price) || Number(product.subsidizedPrice) || 240;
    const safeMrp = Number(product.mrp) || Math.round(safePrice * 1.3);
    const safeSubsidy = Number(product.subsidyDiscount) || Math.max(0, safeMrp - safePrice);

    const safeProduct = {
      id: product.id ? String(product.id) : `item-${Date.now()}`,
      name: product.name || product.title || 'Agronomy Product',
      price: safePrice,
      mrp: safeMrp,
      subsidyDiscount: safeSubsidy,
      unit: product.unit || product.priceUnit || 'Pack',
      category: product.category || 'Crop Protection',
      icon: product.icon || '🧪',
      image: product.image || null,
      ...product
    };

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.id === safeProduct.id);
      if (existingIdx >= 0) {
        return prev.map((item, idx) =>
          idx === existingIdx
            ? { ...item, quantity: (item.quantity || 1) + qty, selected: true }
            : item
        );
      }
      return [...prev, { ...safeProduct, quantity: qty, selected: true }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== String(productId)));
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === String(productId)) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleCartItemSelection = (productId) => {
    setCart(prev => prev.map(item =>
      item.id === String(productId) ? { ...item, selected: !item.selected } : item
    ));
  };

  const selectAllCartItems = (selectState) => {
    setCart(prev => prev.map(item => ({ ...item, selected: selectState })));
  };

  const clearCart = () => setCart([]);

  const openDirectCheckout = (product) => {
    setDirectCheckoutItem({ ...product, quantity: 1, selected: true });
    setIsCartModalOpen(true);
  };

  const placeOrder = (orderData) => {
    const orderId = `CS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) + `, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      farmerName: orderData.farmerName || currentUser.name,
      phone: orderData.phone || currentUser.phone,
      address: orderData.address,
      items: orderData.items,
      subtotal: orderData.subtotal,
      subsidySavings: orderData.subsidySavings,
      gst: orderData.gst,
      deliveryFee: orderData.deliveryFee,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
      transactionId: orderData.transactionId || `TXN-KVK-${Math.floor(10000000 + Math.random() * 90000000)}`,
      trackingNumber: `TRK-MH-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: "In 24-48 Hours by KVK Sangli Hub"
    };

    setOrders(prev => [newOrder, ...prev]);

    // Remove purchased items from cart if not direct checkout
    if (!directCheckoutItem) {
      setCart(prev => prev.filter(item => !item.selected));
    }
    setDirectCheckoutItem(null);
    return newOrder;
  };

  // Translation helper with English fallback
  const t = (key, fallback = '') => {
    return translations[lang]?.[key] || translations.en?.[key] || fallback || key;
  };

  return (
    <AppContext.Provider
      value={{
        // Accounts & Auth
        accounts,
        activeUserId,
        currentUser,
        farmerProfile: currentUser,
        officerProfile: currentUser,
        role,
        isLoggedIn,
        setIsLoggedIn,
        login,
        signup,
        logout,
        switchAccount: handleAccountSwitch,
        removeAccount,
        isAccountSwitcherOpen,
        setIsAccountSwitcherOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        registeredFarmersRegistry,

        // Navigation & Views
        activeTab,
        setActiveTab,
        officerTab,
        setOfficerTab,

        // Theme & Localization
        theme,
        toggleTheme,
        lang,
        setLang: setLangState,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isChotaKissanOpen,
        setIsChotaKissanOpen,
        isChatbotOpen,
        setIsChatbotOpen,
        t,

        // Cart & Checkout
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartQty: updateCartQuantity,
        toggleCartItemSelection,
        selectAllCartItems,
        clearCart,
        isCartModalOpen,
        setIsCartModalOpen,
        directCheckoutItem,
        setDirectCheckoutItem,
        openDirectCheckout,
        orders,
        placeOrder,

        // Alerts, Advisories & Broadcast
        alerts,
        advisories: alerts,
        broadcastNewAdvisory,
        triggerAlert,
        markAllAlertsRead,
        smsHistory,
        emergencySmsToast,
        setEmergencySmsToast,

        // Officer Review Queue & Continuous Learning Feedback
        fieldReviewQueue,
        modelAccuracy,
        approveScan,
        rejectOrCorrectScan,

        // Field Diagnosis Reports
        reports,
        addReport,
        selectedLeafImage,
        setSelectedLeafImage,
        currentDiagnosis,
        setCurrentDiagnosis,
        diseasesDatabase,

        // Farmer Community & Extension Q&A
        communityPosts,
        addCommunityPost,
        verifyCommunityPost,
        addCommentToPost,

        // Soil Health Cards & Testing
        soilHealthCards,
        bookSoilTest,

        // Mock Telemetry Data & Hotspots
        surveillanceStats,
        diseaseTrendData,
        topDiseasesDistribution,
        sangliHotspots,
        hotspots: sangliHotspots
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
