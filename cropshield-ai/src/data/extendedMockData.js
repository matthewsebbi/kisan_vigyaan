// Extended Mock Data for Enterprise Dark Cyber-Agri Dashboard

// 1. Farm Field & Crop Plot Monitoring Data
export const initialPlotsData = [
  {
    id: "plot-1",
    name: "Plot 1",
    crop: "Rice Field",
    block: "Block A",
    status: "Normal",
    statusType: "normal",
    healthScore: 92,
    currentQuantity: 3800,
    maxQuantity: 5000,
    acreage: "3.8 / 5.0 Acres",
    unit: "kg est. yield",
    temp: 28.0,
    humidity: 58.0,
    moisture: 44.0,
    pestDetected: false,
    fanOn: true,
    uvOn: true,
    lastUpdated: "4:14 pm",
    expectedShelfLife: "Vegetative Stage (Healthy)"
  },
  {
    id: "plot-2",
    name: "Plot 2",
    crop: "Wheat Field",
    block: "Block A",
    status: "Critical",
    statusType: "critical",
    healthScore: 43,
    currentQuantity: 3500,
    maxQuantity: 4000,
    acreage: "3.5 / 4.0 Acres",
    unit: "kg est. yield",
    temp: 36.0,
    humidity: 72.0,
    moisture: 56.0,
    pestDetected: true,
    fanOn: true,
    uvOn: true,
    lastUpdated: "7:39 pm",
    expectedShelfLife: "Rust Alert (Treatment Active)"
  },
  {
    id: "plot-3",
    name: "Plot 3",
    crop: "Tomato Field",
    block: "Block B",
    status: "Warning",
    statusType: "warning",
    healthScore: 78,
    currentQuantity: 2100,
    maxQuantity: 3000,
    acreage: "2.1 / 3.0 Acres",
    unit: "kg est. yield",
    temp: 29.7,
    humidity: 62.0,
    moisture: 42.0,
    pestDetected: false,
    fanOn: false,
    uvOn: false,
    lastUpdated: "11:33 am",
    expectedShelfLife: "Flowering Stage"
  },
  {
    id: "plot-4",
    name: "Plot 4",
    crop: "Maize Field",
    block: "Block B",
    status: "Normal",
    statusType: "normal",
    healthScore: 85,
    currentQuantity: 4200,
    maxQuantity: 6000,
    acreage: "4.2 / 6.0 Acres",
    unit: "kg est. yield",
    temp: 31.1,
    humidity: 61.8,
    moisture: 40.1,
    pestDetected: false,
    fanOn: false,
    uvOn: false,
    lastUpdated: "2:50 pm",
    expectedShelfLife: "Knee-High Stage"
  },
  {
    id: "plot-5",
    name: "Plot 5",
    crop: "Capsicum Field",
    block: "Block C",
    status: "Warning",
    statusType: "warning",
    healthScore: 65,
    currentQuantity: 1800,
    maxQuantity: 2500,
    acreage: "1.8 / 2.5 Acres",
    unit: "kg est. yield",
    temp: 33.0,
    humidity: 68.0,
    moisture: 48.8,
    pestDetected: false,
    fanOn: true,
    uvOn: false,
    lastUpdated: "5:12 pm",
    expectedShelfLife: "Fruiting Stage"
  },
  {
    id: "plot-6",
    name: "Plot 6",
    crop: "Pulses Field",
    block: "Block C",
    status: "Normal",
    statusType: "normal",
    healthScore: 95,
    currentQuantity: 2900,
    maxQuantity: 3500,
    acreage: "2.9 / 3.5 Acres",
    unit: "kg est. yield",
    temp: 28.7,
    humidity: 56.1,
    moisture: 43.3,
    pestDetected: false,
    fanOn: false,
    uvOn: false,
    lastUpdated: "1:05 pm",
    expectedShelfLife: "Pod Formation Stage"
  }
];

// 2. Disaster Prediction & Risk Modeling
export const disasterPredictions = [
  {
    id: "dis-1",
    disasterType: "Extreme Heatwave & Canopy Desiccation",
    disasterTypeMr: "तीव्र उष्णतेची लाट व पीक सुकणे",
    riskLevel: "High Risk (78% Probability)",
    severity: "High",
    color: "#ef4444",
    timeWindow: "Next 48 to 96 Hours",
    affectedZone: "Sangli, Solapur & North Karnataka Border",
    triggerFactors: ["Max Temp > 41.5°C", "Relative Humidity < 22%", "Wind speed 22 km/h"],
    impactOnCrops: "High transpirational shock on Tomato, Grapes and flowering Vegetables; flower and fruit drop risk.",
    mitigationActions: [
      "Schedule light evening drip irrigation to regulate root zone temperature.",
      "Apply Kaolin clay foliar spray (5%) or anti-transpirant.",
      "Deploy 50% green agro-shade nets over high-value nursery beds."
    ]
  },
  {
    id: "dis-2",
    disasterType: "Unseasonal Downpour & Flash Waterlogging",
    disasterTypeMr: "अवेळी मुसळधार पाऊस व पाणी साचणे",
    riskLevel: "Moderate Risk (54% Probability)",
    severity: "Medium",
    color: "#f59e0b",
    timeWindow: "Day 6 to Day 9 Forecast",
    affectedZone: "Krishna River Basin (Walwa, Palus, Kupwad)",
    triggerFactors: ["Low Pressure Depression in Bay of Bengal", "Precipitation > 65mm in 24h"],
    impactOnCrops: "Root asphyxiation and sudden onset of Phytophthora root rot in standing Solanaceous crops.",
    mitigationActions: [
      "Clear drainage channels and furrows to drain standing rainwater.",
      "Drench root zones with Trichoderma harzianum @ 5g/L post-rainfall.",
      "Delay scheduled granular fertilizer applications."
    ]
  },
  {
    id: "dis-3",
    disasterType: "Fall Armyworm & Aphid Swarm Vector Influx",
    disasterTypeMr: "लष्करी अळी व मावा कीड प्रादुर्भाव लाट",
    riskLevel: "Severe Risk (86% Probability)",
    severity: "Critical",
    color: "#ef4444",
    timeWindow: "Immediate - Active Next 14 Days",
    affectedZone: "Miraj & Tasgaon Agro Belts",
    triggerFactors: ["Favorable wind currents from South", "Intermittent drizzle with 80% RH"],
    impactOnCrops: "Rapid defoliation of Maize and whorl damage; virus transmission in Capsicum & Tomato.",
    mitigationActions: [
      "Install 10 Pheromone Traps / acre with Spodoptera & Helicoverpa lures.",
      "Release egg parasitoid Trichogramma pretiosum @ 50,000 / acre.",
      "Spray Neem formulation 10,000 PPM (3 ml/L) at first instar sighting."
    ]
  }
];

// 3. Complete Exhaustive Welfare Schemes for Indian Farmers (Matching User Screenshot)
export const governmentSchemesData = [
  {
    "id": "scheme-1",
    "title": "PM-KISAN (Kisan Samman Nidhi)",
    "titleMr": "प्रधानमंत्री किसान सन्मान निधी योजना (PM-KISAN)",
    "department": "Ministry of Agriculture & Farmers Welfare, Govt of India",
    "category": "Financial Support",
    "benefitAmount": "₹6,000 / year",
    "benefitDetails": "Income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
    "eligibility": "All Landholder Farmers",
    "documentsRequired": [
      "Aadhaar Card",
      "Land Ownership Record (7/12 Extract / 8A / Khatiyan)",
      "Bank Account Passbook with IFSC",
      "Aadhaar-linked Mobile Number"
    ],
    "applicationLink": "https://pmkisan.gov.in/",
    "subsidyPercentage": "100% Direct Cash Transfer"
  },
  {
    "id": "scheme-2",
    "title": "PM Fasal Bima Yojana (Crop Insurance)",
    "titleMr": "प्रधानमंत्री पीक विमा योजना (PMFBY)",
    "department": "Department of Agriculture & Cooperation",
    "category": "Crop Insurance",
    "benefitAmount": "Low premium crop cover",
    "benefitDetails": "Financial support to farmers suffering crop loss/damage arising out of natural calamities.",
    "eligibility": "All Farmers growing notified crops",
    "documentsRequired": [
      "Crop Sowing Certificate (Pik Pahani)",
      "Land Record (7/12 & 8A / Land Possession Certificate)",
      "Bank Passbook copy",
      "Aadhaar Card"
    ],
    "applicationLink": "https://pmfby.gov.in/",
    "subsidyPercentage": "Govt pays up to 98% of actuarial premium"
  },
  {
    "id": "scheme-3",
    "title": "Subsidized Smart Grain Warehousing Scheme",
    "titleMr": "धान्य साठवणूक व गोदाम भाडे अनुदान योजना",
    "department": "Warehousing Development and Regulatory Authority (WDRA) & NABARD",
    "category": "Storage & Warehousing",
    "benefitAmount": "50% Rental Subsidy",
    "benefitDetails": "Get up to 50% subsidy on warehousing rental fees for storage periods exceeding 3 months.",
    "eligibility": "Registered Grain Guards Users",
    "documentsRequired": [
      "Farmer ID / Aadhaar Card",
      "Harvest Receipt / Warehouse Deposit Note",
      "Bank Account Details"
    ],
    "applicationLink": "https://wdra.gov.in/",
    "subsidyPercentage": "50% Rental Subsidy"
  },
  {
    "id": "scheme-4",
    "title": "Agricultural Mechanization Subsidy",
    "titleMr": "कृषी यांत्रिकीकरण उप-अभियान (SMAM / MahaDBT)",
    "department": "Department of Agriculture & Farmers Welfare",
    "category": "Machinery & Equipment",
    "benefitAmount": "40% IoT Hardware Subsidy",
    "benefitDetails": "Get subsidy up to 40% on procurement of advanced IoT sensory systems and UV grain guards.",
    "eligibility": "Small & Marginal Farmers",
    "documentsRequired": [
      "Land Records (7/12 & 8A)",
      "Aadhaar Card",
      "Bank Passbook",
      "Quotation from authorized dealer"
    ],
    "applicationLink": "https://agrimachinery.nic.in/",
    "subsidyPercentage": "40% - 80% Direct Bank Subsidy"
  },
  {
    "id": "scheme-5",
    "title": "PM-KUSUM Solar Agricultural Pump Scheme",
    "titleMr": "महाकृषी ऊर्जा अभियान (PM-KUSUM सोलर कृषी पंप)",
    "department": "Ministry of New and Renewable Energy (MNRE)",
    "category": "Solar & Irrigation",
    "benefitAmount": "Up to 90% Solar Pump Subsidy",
    "benefitDetails": "Installation of standalone off-grid 3 HP, 5 HP, and 7.5 HP solar agriculture pumps with 90% subsidy ensuring daytime irrigation with 0 electricity bills for 25 years.",
    "eligibility": "Farmers with borewell/well without electricity grid connection",
    "documentsRequired": [
      "7/12 Extract showing water source",
      "Aadhaar Card",
      "No Objection Certificate (NOC)",
      "Bank Details"
    ],
    "applicationLink": "https://pmkusum.mnre.gov.in/",
    "subsidyPercentage": "90% Government Subsidy (Farmer pays 10%)"
  },
  {
    "id": "scheme-6",
    "title": "Kisan Credit Card (KCC) Consequential Loan Scheme",
    "titleMr": "किसान क्रेडिट कार्ड (KCC स्वस्त व्याज पीक कर्ज)",
    "department": "Reserve Bank of India (RBI) & NABARD",
    "category": "Financial Support",
    "benefitAmount": "Loans up to ₹3,00,000 @ 4% Interest",
    "benefitDetails": "Access timely institutional credit for crop cultivation, fertilizer purchase, and post-harvest maintenance at a subsidized effective interest rate of 4% on prompt repayment.",
    "eligibility": "All owner cultivators, tenant farmers, dairy & fisheries farmers",
    "documentsRequired": [
      "Land record copy",
      "Aadhaar Card & PAN Card",
      "Passport size photographs",
      "Existing bank declaration"
    ],
    "applicationLink": "https://www.myscheme.gov.in/schemes/kcc",
    "subsidyPercentage": "3% Prompt Repayment Incentive Subvention"
  },
  {
    "id": "scheme-7",
    "title": "PMKSY - Per Drop More Crop (Micro-Irrigation Drip Subsidy)",
    "titleMr": "प्रधानमंत्री कृषी सिंचन योजना (ठिबक व तुषार सिंचन अनुदान)",
    "department": "Department of Agriculture & Farmers Welfare",
    "category": "Solar & Irrigation",
    "benefitAmount": "55% Drip / Sprinkler Subsidy",
    "benefitDetails": "Financial assistance of 55% for small/marginal farmers and 45% for other farmers on micro-irrigation (Drip & Sprinkler) installations to save 40-50% water and boost crop yield.",
    "eligibility": "All farmers with cultivable agricultural land and assured water source",
    "documentsRequired": [
      "7/12 & 8A Land Extract",
      "Aadhaar Card",
      "Electricity/Solar pump bill or water source certificate",
      "Drip equipment invoice"
    ],
    "applicationLink": "https://pmksy.gov.in/",
    "subsidyPercentage": "55% Direct Subsidy for Small Farmers"
  },
  {
    "id": "scheme-8",
    "title": "Paramparagat Krishi Vikas Yojana (PKVY - Organic Farming)",
    "titleMr": "परंपरागत कृषी विकास योजना (सेंद्रिय शेती अनुदान)",
    "department": "National Project on Organic Farming (NCOF)",
    "category": "Organic Farming",
    "benefitAmount": "₹50,000 per Hectare",
    "benefitDetails": "Financial support of ₹50,000/ha for organic conversion, bio-fertilizers, vermicompost units, botanical pest preparations, and free PGS-India organic certification.",
    "eligibility": "Farmers in organic clusters of 50 acres",
    "documentsRequired": [
      "Group registration certificate",
      "Farmer Aadhaar & Land records",
      "Bank Account details"
    ],
    "applicationLink": "https://pgsindia-ncof.gov.in/",
    "subsidyPercentage": "₹31,000/ha direct assistance for inputs"
  },
  {
    "id": "scheme-9",
    "title": "e-NAM (National Agriculture Market - Online Mandi)",
    "titleMr": "ई-नाम राष्ट्रीय कृषी बाजार (ऑनलाइन थेट धान्य विक्री)",
    "department": "Small Farmers Agribusiness Consortium (SFAC)",
    "category": "Marketing & Mandi",
    "benefitAmount": "Zero Brokerage & Pan-India Competitive Prices",
    "benefitDetails": "Online trading platform connecting 1,361+ wholesale APMC mandis across India for transparent electronic auctioning, quality assaying, and direct online payment into farmer accounts.",
    "eligibility": "All farmers, FPOs, and traders across India selling farm produce",
    "documentsRequired": [
      "Aadhaar Card",
      "Bank Passbook copy",
      "Mobile Number for APMC Gate-pass SMS"
    ],
    "applicationLink": "https://www.enam.gov.in/",
    "subsidyPercentage": "100% Free Government Mandi Portal"
  },
  {
    "id": "scheme-10",
    "title": "Agriculture Infrastructure Fund (AIF)",
    "titleMr": "कृषी पायाभूत सुविधा निधी (AIF कमी व्याज कर्ज योजना)",
    "department": "Ministry of Agriculture, Govt of India",
    "category": "Storage & Warehousing",
    "benefitAmount": "3% Interest Subvention on Loans up to ₹2 Crore",
    "benefitDetails": "Medium to long-term debt financing for post-harvest management infrastructure including cold storages, pack-houses, primary processing units, ripening chambers, and grain silos.",
    "eligibility": "Farmers, FPOs, Primary Agricultural Credit Societies (PACS), Agri-entrepreneurs",
    "documentsRequired": [
      "Detailed Project Report (DPR)",
      "Land possession/lease deed",
      "KYC documents and Bank loan sanction letter"
    ],
    "applicationLink": "https://agriinfra.dac.gov.in/",
    "subsidyPercentage": "3% Interest Subvention + CGTMSE Credit Guarantee"
  },
  {
    "id": "scheme-11",
    "title": "PM Kisan Maandhan Yojana (PM-KMY - Farmer Pension)",
    "titleMr": "प्रधानमंत्री किसान मानधन योजना (मासिक ₹३,००० पेन्शन)",
    "department": "Ministry of Agriculture & LIC of India",
    "category": "Financial Support",
    "benefitAmount": "₹3,000 / month Assured Pension",
    "benefitDetails": "Old-age social security pension of ₹3,000 per month after attaining 60 years of age with a voluntary contribution of ₹55 to ₹200/month (50% matched by Central Govt).",
    "eligibility": "Small & marginal farmers aged between 18 and 40 years",
    "documentsRequired": [
      "Aadhaar Card",
      "Savings Bank Account / Jan Dhan Account with IFSC",
      "Land 7/12 copy"
    ],
    "applicationLink": "https://maandhan.in/",
    "subsidyPercentage": "50% Matching Contribution by Central Govt"
  },
  {
    "id": "scheme-12",
    "title": "Soil Health Card Scheme & Micronutrient Support",
    "titleMr": "मृदा आरोग्य पत्रिका योजना (मोफत माती परीक्षण व किट)",
    "department": "National Mission for Sustainable Agriculture (NMSA)",
    "category": "Soil & Nutrients",
    "benefitAmount": "Free 12-Parameter Soil Card + ₹2,500 Kit",
    "benefitDetails": "Free soil testing card assessing 12 macro/micro-nutrients (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with crop-specific dosage advice to cut chemical expenses by 25%.",
    "eligibility": "All agricultural landholders in all districts",
    "documentsRequired": [
      "Land survey number (Gat number)",
      "Farmer Aadhaar and Crop detail"
    ],
    "applicationLink": "https://soilhealth.dac.gov.in/",
    "subsidyPercentage": "100% Free Government Diagnostic Service"
  },
  {
    "id": "scheme-13",
    "title": "Mission for Integrated Development of Horticulture (MIDH)",
    "titleMr": "एकात्मिक फलोत्पादन विकास अभियान (MIDH फळबाग व शेडनेट अनुदान)",
    "department": "National Horticulture Board & State Agri Dept",
    "category": "Machinery & Equipment",
    "benefitAmount": "Up to 50% Capital Subsidy",
    "benefitDetails": "Up to 50% subsidy on establishment of high-density fruit orchards (Grapes, Pomegranate, Mango), greenhouse / polyhouse poly-tunnels, shade net houses, and plastic mulching.",
    "eligibility": "Individual farmers, grower associations, self-help groups (SHGs)",
    "documentsRequired": [
      "7/12 & 8A Extract",
      "Aadhaar Card",
      "Quotation / Detailed Estimate from empanelled vendor"
    ],
    "applicationLink": "https://midh.gov.in/",
    "subsidyPercentage": "40% - 50% Project Cost Subsidy"
  },
  {
    "id": "scheme-14",
    "title": "National Beekeeping & Honey Mission (NBHM)",
    "titleMr": "राष्ट्रीय मधमाशी पालन व मध अभियान (NBHM मधमाशी पेटी अनुदान)",
    "department": "National Bee Board (NBB)",
    "category": "Machinery & Equipment",
    "benefitAmount": "Up to 80% Subsidy on Bee Colonies",
    "benefitDetails": "Financial assistance up to 80% for purchase of scientific bee boxes, honey extractor equipment, bee colonies, and specialized training for supplementary farm income.",
    "eligibility": "Small/Marginal Farmers, Landless laborers, Tribal farmers & FPOs",
    "documentsRequired": [
      "Farmer Aadhaar & Bank Details",
      "Bee-keeping training certificate or NBB registration"
    ],
    "applicationLink": "https://nbhm.gov.in/",
    "subsidyPercentage": "75% - 80% Subsidy on Bee Boxes"
  },
  {
    "id": "scheme-15",
    "title": "Rashtriya Gokul Mission & Dairy Livestock Subsidy",
    "titleMr": "राष्ट्रीय गोकुळ अभियान व दुग्धव्यवसाय अनुदान",
    "department": "Department of Animal Husbandry & Dairying",
    "category": "Livestock & Dairy",
    "benefitAmount": "Up to 50% Capital Subsidy (up to ₹50 Lakh)",
    "benefitDetails": "50% capital subsidy on establishing cattle breed multiplication farms, automatic milking machines, silage making units, and fodder processing machinery.",
    "eligibility": "Individual farmers, Dairy Cooperatives, FPOs & SHGs",
    "documentsRequired": [
      "Project report",
      "Aadhaar Card & Bank account details",
      "Land lease or ownership documents"
    ],
    "applicationLink": "https://dahd.nic.in/",
    "subsidyPercentage": "50% Capital Subsidy"
  },
  {
    "id": "scheme-16",
    "title": "MahaDBT Farmer Welfare Single Window Portal",
    "titleMr": "महाडीबीटी शेतकरी योजना (सर्व शासकीय कृषी योजना एकच पोर्टल)",
    "department": "Department of Agriculture, Govt of Maharashtra",
    "category": "Financial Support",
    "benefitAmount": "Comprehensive Direct Bank Transfer (DBT)",
    "benefitDetails": "Single window digital gateway for all Maharashtra State agricultural schemes including seed distribution, pipeline subsidies, farm ponds, plastic lining, and tractor implements.",
    "eligibility": "All resident agricultural landowners and tenant farmers",
    "documentsRequired": [
      "Aadhaar Card linked with 7/12 and Bank Account",
      "Caste Certificate (for SC/ST higher subsidy)",
      "Mobile number"
    ],
    "applicationLink": "https://mahadbt.maharashtra.gov.in/",
    "subsidyPercentage": "Direct Bank Transfer (DBT) to Farmer Account"
  }
];


// 4. Fertilizers & Subsidy Calculator Data
export const fertilizerProducts = [
  {
    id: "fert-1",
    name: "NPK 20:20:20 Complex",
    company: "IFFCO",
    type: "COMPLEX",
    categoryKey: "complex",
    rating: 4.5,
    reviewsCount: 142,
    bagWeightKg: 50,
    stockBags: 250,
    mrpWithoutSubsidy: 1850,
    subsidizedPrice: 1350,
    priceUnit: "/ 50kg bag",
    subsidyAmount: 500,
    govtSubsidyPercent: "27%",
    image: "https://images.unsplash.com/photo-1585336261026-6d601b0b462c?w=800&auto=format&fit=crop&q=80",
    description: "Balanced nutrition for all crops promoting vegetative growth and root density.",
    dosageGuidelines: "Apply 50kg/acre during active tillering / branching stage."
  },
  {
    id: "fert-2",
    name: "DAP (Di-Ammonium Phosphate)",
    company: "Coromandel",
    type: "PHOSPHATIC",
    categoryKey: "phosphatic",
    rating: 4.7,
    reviewsCount: 289,
    bagWeightKg: 50,
    stockBags: 180,
    mrpWithoutSubsidy: 4100,
    subsidizedPrice: 1450,
    priceUnit: "/ 50kg bag",
    subsidyAmount: 2650,
    govtSubsidyPercent: "65%",
    image: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80",
    description: "High phosphorus for vigorous root development and robust seedling establishment.",
    dosageGuidelines: "Basal soil application near root zone at sowing/transplanting."
  },
  {
    id: "fert-3",
    name: "Urea (46% Nitrogen)",
    company: "NFL",
    type: "NITROGENOUS",
    categoryKey: "nitrogenous",
    rating: 4.3,
    reviewsCount: 512,
    bagWeightKg: 45,
    stockBags: 500,
    mrpWithoutSubsidy: 2450,
    subsidizedPrice: 267,
    priceUnit: "/ 45kg bag",
    subsidyAmount: 2183,
    govtSubsidyPercent: "89%",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop&q=80",
    description: "Highest nitrogen content fertilizer with neem coating for sustained release.",
    dosageGuidelines: "Apply in 3 split doses (basal, vegetative, and panicle initiation)."
  },
  {
    id: "fert-4",
    name: "MOP (Muriate of Potash)",
    company: "IPL",
    type: "POTASSIC",
    categoryKey: "potassic",
    rating: 4.2,
    reviewsCount: 98,
    bagWeightKg: 50,
    stockBags: 120,
    mrpWithoutSubsidy: 3200,
    subsidizedPrice: 1700,
    priceUnit: "/ 50kg bag",
    subsidyAmount: 1500,
    govtSubsidyPercent: "47%",
    image: "https://images.unsplash.com/photo-1601342631638-34860b74bb81?w=800&auto=format&fit=crop&q=80",
    description: "Essential potassium for disease tolerance, frost resistance, and fruit weight.",
    dosageGuidelines: "Apply at flowering and fruit set stage via soil or fertigation."
  },
  {
    id: "fert-5",
    name: "Organic Vermicompost",
    company: "GreenGold",
    type: "ORGANIC",
    categoryKey: "organic",
    rating: 4.8,
    reviewsCount: 175,
    bagWeightKg: 25,
    stockBags: 300,
    mrpWithoutSubsidy: 650,
    subsidizedPrice: 450,
    priceUnit: "/ 25kg bag",
    subsidyAmount: 200,
    govtSubsidyPercent: "31%",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80",
    description: "Premium quality organic manure with rich beneficial microbial consortium.",
    dosageGuidelines: "Mix 500kg - 1 Ton per acre into topsoil before sowing."
  },
  {
    id: "fert-6",
    name: "Single Super Phosphate (SSP)",
    company: "Mahadhan",
    type: "PHOSPHATIC",
    categoryKey: "phosphatic",
    rating: 4.1,
    reviewsCount: 84,
    bagWeightKg: 50,
    stockBags: 200,
    mrpWithoutSubsidy: 750,
    subsidizedPrice: 480,
    priceUnit: "/ 50kg bag",
    subsidyAmount: 270,
    govtSubsidyPercent: "36%",
    image: "https://images.unsplash.com/photo-1588645258957-6e54f7a26f63?w=800&auto=format&fit=crop&q=80",
    description: "Multi-nutrient fertilizer supplying 16% Phosphorus, 11% Sulfur, and 19% Calcium.",
    dosageGuidelines: "Basal dressing for oilseeds, pulses, and sugarcane crops."
  }
];

// Nearest Fertilizer Outlets & Centers (Private vs Government Sectors)
export const nearestFertilizerShops = {
  privateSector: [
    {
      id: "shop-p1",
      name: "Kisan Agro Seva Kendra & Input Dealer",
      nameMr: "किसान ॲग्रो सेवा केंद्र व खते डेपो",
      owner: "Suresh Patil (Authorized Dealer)",
      distance: "1.2 km away",
      address: "Plot 14, Sangli-Miraj Main Road, Opp. Market Yard Gate 1",
      phone: "+91 98220 14589",
      rating: 4.8,
      reviewsCount: 230,
      licenseNo: "MAH/SAN/AGRO-4821/2026",
      status: "Open Now • Closes 8:30 PM",
      authorizedBrands: ["Coromandel", "Mahadhan", "Bayer", "Yara", "Syngenta"],
      liveStock: "In Stock: NPK 20:20:20, Urea, DAP, Potash, Micronutrients",
      services: ["Same-Day Farm Delivery", "Digital UPI & Khata", "Soil Sample Drop Point"]
    },
    {
      id: "shop-p2",
      name: "Shri Ganesh Krishi Vikas & Fertilizer Depot",
      nameMr: "श्री गणेश कृषी विकास केंद्र",
      owner: "Mahesh Deshmukh",
      distance: "2.4 km away",
      address: "Shop No. 7, APMC Commercial Complex, Sangli",
      phone: "+91 94230 87120",
      rating: 4.6,
      reviewsCount: 168,
      licenseNo: "MAH/SAN/AGRO-1109/2026",
      status: "Open Now • Closes 8:00 PM",
      authorizedBrands: ["IFFCO", "GreenGold Organics", "Deepak Fertilisers"],
      liveStock: "In Stock: Complex Fertilizers, Bio-NPK, Vermicompost, Zinc Sulfate",
      services: ["Bulk Booking Discount", "Agronomist Consultation", "Tractor Loading Facility"]
    },
    {
      id: "shop-p3",
      name: "Mahavir Krishi Seva Kendra",
      nameMr: "महावीर कृषी सेवा केंद्र व होलसेल डेपो",
      owner: "Pravin Shah",
      distance: "3.8 km away",
      address: "Tasgaon Road Bypass Junction, Kupwad MIDC",
      phone: "+91 98901 33451",
      rating: 4.7,
      reviewsCount: 310,
      licenseNo: "MAH/SAN/AGRO-7741/2026",
      status: "Open Now • Closes 9:00 PM",
      authorizedBrands: ["IPL", "GSFC", "RCF", "Zuari Agro"],
      liveStock: "In Stock: Bulk DAP, 10:26:26, 12:32:16, Calcium Nitrate, Boron",
      services: ["Wholesale Rates", "Credit Facility for FPOs", "On-Field Delivery"]
    }
  ],
  governmentSector: [
    {
      id: "shop-g1",
      name: "Primary Agricultural Cooperative Society (PACS) - Kupwad Center",
      nameMr: "प्राथमिक कृषी पतपुरवठा सहकारी संस्था (PACS) - कुपवाड",
      sector: "Government Co-operative Society (PACS)",
      officerInCharge: "S. K. Kadam (Secretary)",
      distance: "1.5 km away",
      address: "Gram Panchayat Bhawan, Kupwad Gaon, Sangli",
      phone: "0233-2644211 / +91 94224 55190",
      rating: 4.9,
      reviewsCount: 420,
      govtCode: "MAH-COOP-SANGLI-084",
      status: "Govt Timings: 9:00 AM - 6:00 PM",
      subsidyMode: "e-PoS Machine DBT Aadhaar Authentication Active",
      officialQuotaPrice: "Neem Urea @ ₹266.50/45kg | DAP @ ₹1,350/50kg",
      liveStock: "Govt Subsidized Stock: Urea (850 bags), DAP (400 bags), MOP (200 bags)",
      services: ["100% Guaranteed Non-Adulterated Certified Stock", "Direct DBT Aadhaar Sale", "Subsidized Bio-Agents"]
    },
    {
      id: "shop-g2",
      name: "IFFCO Kisan Seva Kendra (e-Bazar Government Point)",
      nameMr: "इफ्को किसान सेवा केंद्र (ई-बाजार शासकीय केंद्र)",
      sector: "Central Govt Supported Cooperative Outlet",
      officerInCharge: "Dr. Suhas More (Agri Extension Officer)",
      distance: "2.9 km away",
      address: "APMC Sub-Yard, Main Market Gate, Miraj",
      phone: "1800 103 1967 (Toll-Free Govt Helpline)",
      rating: 4.8,
      reviewsCount: 380,
      govtCode: "IFFCO-EBAZAR-MRJ-01",
      status: "Open Now • 8:30 AM - 7:00 PM",
      subsidyMode: "Direct Central Govt PoS Subsidized Price Scheme",
      officialQuotaPrice: "Nano Urea @ ₹225/bottle | Nano DAP @ ₹600/bottle | Bio-Decomposer @ ₹150",
      liveStock: "Govt Stock: Liquid Nano Fertilizers, Water Soluble Fertilisers, Free Soil Testing",
      services: ["Soil Health Card Testing Lab", "Crop Advisory by Agri Scientists", "Nano Sprayer Demo"]
    },
    {
      id: "shop-g3",
      name: "Maharashtra Agro Industries Development Corp (MAIDC)",
      nameMr: "महाराष्ट्र कृषी उद्योग विकास महामंडळ (MAIDC) शासकीय केंद्र",
      sector: "State Government Agriculture Corporation",
      officerInCharge: "R. B. Patil (District Manager)",
      distance: "4.1 km away",
      address: "Zilla Parishad Krishi Bhavan Compound, Sangli",
      phone: "0233-2211900 / +91 98231 10099",
      rating: 4.7,
      reviewsCount: 290,
      govtCode: "MAIDC-SANGLI-DIV-1",
      status: "Govt Office Hours: 10:00 AM - 5:30 PM",
      subsidyMode: "MahaDBT State Linked Voucher Redemption Center",
      officialQuotaPrice: "100% Subsidized Micronutrient Kits & 50% Organic Manure Subsidy",
      liveStock: "Krishi Udyog Certified Organic Inputs, Soil Testing Kits, Bio-Pesticides",
      services: ["MahaDBT Subsidy Voucher Claim", "Organic Certification Helpdesk", "Certified Seeds Counter"]
    }
  ]
};


// 5. Intelligent Vision Test Samples with Real Botanical Photography
export const visionSampleCatalog = [
  {
    id: "sample-early-blight",
    title: "Tomato Leaf - Early Blight",
    category: "crop_disease",
    cropType: "Tomato (Solanum lycopersicum)",
    organ: "Lower Foliage Leaf",
    isPlant: true,
    expectedDiagnosis: "Early Blight (Alternaria solani)",
    confidence: 94,
    severity: "High",
    affectedArea: "23%",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d69104a49?w=800&auto=format&fit=crop&q=80",
    symptomsIdentified: [
      "Concentric ring 'target-board' necrotic lesions on leaf surface",
      "Yellow chlorotic halo encircling brown spots",
      "Lower canopy leaf senescence"
    ],
    unrelatedThingsExcluded: [
      "No insect feeding bite marks detected",
      "No chemical phytotoxicity scorch lines",
      "No hailstone mechanical tear"
    ],
    pesticidePrescription: {
      chemical: [
        { name: "Mancozeb 75% WP", dosePerLiter: "2.0 g/L", method: "Protective foliar cover spray", tradeName: "Dithane M-45 / Indofil M-45" },
        { name: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC", dosePerLiter: "1.0 ml/L", method: "Systemic curative spray", tradeName: "Amistar Top" }
      ],
      organic: [
        { name: "Cold-Pressed Neem Oil 10,000 PPM", dosePerLiter: "3.0 ml/L", method: "Spray early morning with liquid soap emulsifier" },
        { name: "Trichoderma viride 1% WP", dosePerLiter: "5.0 g/L", method: "Bio-fungicidal protective wash" }
      ]
    }
  },
  {
    id: "sample-bacterial-spot",
    title: "Chilli / Tomato - Bacterial Spot",
    category: "crop_disease",
    cropType: "Chilli / Capsicum",
    organ: "Foliage Leaf",
    isPlant: true,
    expectedDiagnosis: "Bacterial Leaf Spot (Xanthomonas)",
    confidence: 89,
    severity: "Medium",
    affectedArea: "16%",
    image: "https://images.unsplash.com/photo-1588645258957-6e54f7a26f63?w=800&auto=format&fit=crop&q=80",
    symptomsIdentified: [
      "Small water-soaked angular spots with yellow margins",
      "Bacterial ooze translucent appearance in early morning dew"
    ],
    unrelatedThingsExcluded: [
      "No powdery fungal spores",
      "No aphid honeydew mold"
    ],
    pesticidePrescription: {
      chemical: [
        { name: "Streptocycline 90:10 (Streptomycin + Tetracycline)", dosePerLiter: "0.1 g/L", method: "Systemic bactericide spray", tradeName: "Streptocycline" },
        { name: "Copper Oxychloride 50% WP", dosePerLiter: "2.5 g/L", method: "Tank mix with Streptocycline for contact bactericidal cover", tradeName: "Blitox 50" }
      ],
      organic: [
        { name: "Pseudomonas fluorescens 1% WP", dosePerLiter: "5.0 g/L", method: "Bio-bactericide foliar spray" }
      ]
    }
  },
  {
    id: "sample-aphids",
    title: "Cotton / Tomato - Aphid Vector Infestation",
    category: "pest_infestation",
    cropType: "Tomato / Cotton",
    organ: "Shoot Tip & Underside",
    isPlant: true,
    expectedDiagnosis: "Aphids Vector Infestation (Aphis gossypii)",
    confidence: 95,
    severity: "High",
    affectedArea: "28%",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop&q=80",
    symptomsIdentified: [
      "Colonies of soft-bodied green/black nymphs sucking sap",
      "Downward leaf curling and distortion at growing tips",
      "Sticky honeydew secretions with sooty mold development"
    ],
    unrelatedThingsExcluded: [
      "No fungal leaf spot necrosis",
      "No root knot nematode galling"
    ],
    pesticidePrescription: {
      chemical: [
        { name: "Imidacloprid 17.8% SL", dosePerLiter: "0.5 ml/L", method: "Systemic neonicotinoid foliar spray", tradeName: "Confidor / Victor" },
        { name: "Thiamethoxam 25% WG", dosePerLiter: "0.3 g/L", method: "Fast knockdown translaminar spray", tradeName: "Actara" }
      ],
      organic: [
        { name: "Verticillium lecanii 1.15% WP (Bio-agent)", dosePerLiter: "5.0 g/L", method: "Entomopathogenic fungal spray targeting soft insect body" },
        { name: "Fish Oil Rosin Soap (FORS)", dosePerLiter: "20.0 ml/L", method: "Suffocates sap-sucking nymphs instantly" }
      ]
    }
  },
  {
    id: "sample-powdery-mildew",
    title: "Grape / Tomato - Powdery Mildew",
    category: "crop_disease",
    cropType: "Grapes / Tomato",
    organ: "Upper Foliage Leaf",
    isPlant: true,
    expectedDiagnosis: "Powdery Mildew (Uncinula necator / Leveillula taurica)",
    confidence: 93,
    severity: "High",
    affectedArea: "32%",
    image: "https://images.unsplash.com/photo-1601342631638-34860b74bb81?w=800&auto=format&fit=crop&q=80",
    symptomsIdentified: [
      "White talcum-powder like superficial fungal patches",
      "Chlorotic patches underneath powdery white coating",
      "Leaf curling and premature leaf drop"
    ],
    unrelatedThingsExcluded: [
      "No bacterial water soaking",
      "No aphid honeydew"
    ],
    pesticidePrescription: {
      chemical: [
        { name: "Hexaconazole 5% EC", dosePerLiter: "1.0 ml/L", method: "Systemic triazole fungicide spray", tradeName: "Contaf Plus" },
        { name: "Wettable Sulfur 80% WDG", dosePerLiter: "2.5 g/L", method: "Foliar protective spray at dawn", tradeName: "Sulfex" }
      ],
      organic: [
        { name: "Ampelomyces quisqualis 2% WP", dosePerLiter: "5.0 g/L", method: "Hyperparasitic bio-control agent" },
        { name: "Baking Soda (Sodium Bicarbonate) + Liquid Soap", dosePerLiter: "3.0 g/L", method: "Raises leaf surface pH to suppress spore germination" }
      ]
    }
  },
  {
    id: "sample-healthy-leaf",
    title: "Healthy Green Crop Foliage",
    category: "healthy_crop",
    cropType: "Tomato",
    organ: "Canopy Foliage",
    isPlant: true,
    expectedDiagnosis: "Healthy Foliage (No Disease Detected)",
    confidence: 99,
    severity: "None (0%)",
    affectedArea: "0%",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80",
    symptomsIdentified: [
      "Optimal chlorophyll green hue and turgor pressure",
      "No fungal lesions, necrotic halos or insect feeding puncture marks",
      "Intact vein structure and clean stomatal surface"
    ],
    unrelatedThingsExcluded: [
      "All disease pathogens absent",
      "No nutrient deficiency symptoms"
    ],
    pesticidePrescription: {
      chemical: [],
      organic: [
        { name: "Panchagavya / Seaweed Extract 5%", dosePerLiter: "3.0 ml/L", method: "Proactive immunity booster spray" }
      ]
    }
  },
  {
    id: "sample-dog",
    title: "Pet Animal (Domestic Dog)",
    category: "non_plant",
    isPlant: false,
    detectedObject: "Domestic Pet / Dog (Canis lupus familiaris)",
    confidence: 98,
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80",
    warningMessage: "⚠️ Non-Plant Image Detected: The system identified a domestic animal/pet (Dog), which contains no crop leaves, stem tissue, or agricultural plant symptoms.",
    guidance: "Please hold your camera 15-20cm from an affected crop leaf, fruit, or stem and retake the photo."
  },
  {
    id: "sample-car",
    title: "Automobile / Vehicle",
    category: "non_plant",
    isPlant: false,
    detectedObject: "Automobile / Road Vehicle",
    confidence: 99,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&auto=format&fit=crop&q=80",
    warningMessage: "⚠️ Non-Plant Image Detected: The system detected an automobile vehicle, not agricultural crop foliage or farm produce.",
    guidance: "Please capture a clear photo of an affected plant part in daylight."
  },
  {
    id: "sample-human-face",
    title: "Human Face / Person",
    category: "non_plant",
    isPlant: false,
    detectedObject: "Human Face / Person",
    confidence: 97,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    warningMessage: "⚠️ Non-Plant Image Detected: The system detected a human portrait. KISAN VIGYAAN requires a photograph of a crop leaf or farm plant to diagnose diseases.",
    guidance: "Aim the camera at your crop leaves or fruit and take a clear picture."
  }
];

// 6. Hourly & 7-Day Temperature/Humidity Trend Telemetry
export const hourlyClimateTrends = [
  { time: "00:00", temp: 22.4, humidity: 78, soilMoisture: 45 },
  { time: "03:00", temp: 21.0, humidity: 84, soilMoisture: 45 },
  { time: "06:00", temp: 20.8, humidity: 86, soilMoisture: 44 },
  { time: "09:00", temp: 25.5, humidity: 71, soilMoisture: 43 },
  { time: "12:00", temp: 29.8, humidity: 55, soilMoisture: 42 },
  { time: "15:00", temp: 31.2, humidity: 49, soilMoisture: 41 },
  { time: "18:00", temp: 28.0, humidity: 62, soilMoisture: 43 },
  { time: "21:00", temp: 24.5, humidity: 73, soilMoisture: 44 }
];
