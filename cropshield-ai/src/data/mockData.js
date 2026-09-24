// KISAN VIGYAAN - Mock Data & Knowledge Base

// Real Botanical Leaf Photography Assets
export const sampleLeafImages = {
  earlyBlight: "https://images.unsplash.com/photo-1592417817098-8f3d69104a49?w=800&auto=format&fit=crop&q=80",
  leafSpot: "https://images.unsplash.com/photo-1588645258957-6e54f7a26f63?w=800&auto=format&fit=crop&q=80",
  aphids: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&auto=format&fit=crop&q=80",
  powderyMildew: "https://images.unsplash.com/photo-1601342631638-34860b74bb81?w=800&auto=format&fit=crop&q=80",
  healthy: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&auto=format&fit=crop&q=80"
};

// Comprehensive Disease Knowledge Base
export const diseasesDatabase = {
  earlyBlight: {
    id: "early_blight",
    name: "Early Blight",
    marathiName: "अगेती करपा (Early Blight)",
    hindiName: "अगेती झुलसा (Early Blight)",
    scientificName: "Alternaria solani",
    crop: "Tomato",
    confidence: 91,
    severity: "High",
    severityLevel: 75,
    affectedArea: "23%",
    riskScore: 78,
    riskLevel: "High Risk",
    image: sampleLeafImages.earlyBlight,
    reasons: [
      "High Humidity (65%)",
      "Recent Rainfall (Last 48 hrs)",
      "Temperature (24-29°C)",
      "Susceptible crop stage (Flowering)"
    ],
    reasonsMr: [
      "जास्त आर्द्रता (६५%)",
      "मागील ४८ तासांत झालेला पाऊस",
      "अनुकूल तापमान (२४-२९° से)",
      "संवेदनशील पीक अवस्था (फुलोरा)"
    ],
    reasonsHi: [
      "उच्च आर्द्रता (65%)",
      "पिछले 48 घंटों में वर्षा",
      "तापमान (24-29°C)",
      "संवेदनशील फसल चरण (फूल आना)"
    ],
    immediateActions: [
      "Remove and destroy infected leaves from lower canopy.",
      "Improve field ventilation and crop row spacing.",
      "Avoid overhead sprinkler irrigation; switch to drip.",
      "Monitor field every 2 days for spot expansion."
    ],
    immediateActionsMr: [
      "झाडाच्या खालच्या भागातील प्रादुर्भाव झालेली पाने काढून नष्ट करा.",
      "पिकांमधील हवा खेळती राहण्यासाठी योग्य अंतर ठेवा.",
      "तुषार सिंचन टाळा; केवळ ठिबक सिंचनाचा वापर करा.",
      "दर २ दिवसांनी शेताची पाहणी करा."
    ],
    immediateActionsHi: [
      "पौधे के निचले हिस्से से संक्रमित पत्तियों को हटाकर नष्ट करें।",
      "खेत में उचित हवा संचार बनाए रखें।",
      "ऊपर से पानी देने से बचें; ड्रिप सिंचाई का उपयोग करें।",
      "हर 2 दिन में खेत का निरीक्षण करें।"
    ],
    treatments: {
      organic: {
        name: "Neem Oil 10,000 PPM",
        dosagePerLiter: "3 ml/L",
        rate: 3,
        unit: "ml",
        instructions: "Spray thoroughly covering both upper and lower leaf surfaces during early morning or late evening."
      },
      chemical: {
        name: "Mancozeb 75% WP",
        dosagePerLiter: "2 g/L",
        rate: 2,
        unit: "g",
        alternate: "Azoxystrobin 23% SC @ 1 ml/L",
        instructions: "Apply preventative protective spray. Ensure waiting period of 7 days before harvest."
      }
    },
    recheckDays: 3
  },
  leafSpot: {
    id: "leaf_spot",
    name: "Bacterial Leaf Spot",
    marathiName: "जिवाणूजन्य ठिपके (Bacterial Spot)",
    hindiName: "जीवाणु पत्ती धब्बा (Bacterial Spot)",
    scientificName: "Xanthomonas perforans",
    crop: "Tomato",
    confidence: 88,
    severity: "Medium",
    severityLevel: 55,
    affectedArea: "15%",
    riskScore: 62,
    riskLevel: "Medium Risk",
    image: sampleLeafImages.leafSpot,
    reasons: [
      "Moderate Humidity (58%)",
      "Warm days with dew formation",
      "Intermittent light showers"
    ],
    reasonsMr: [
      "मध्यम आर्द्रता (५८%)",
      "उष्ण दिवस आणि सकाळचे दव",
      "अधूनमधून हलका पाऊस"
    ],
    reasonsHi: [
      "मध्यम आर्द्रता (58%)",
      "ओस के साथ गर्म दिन",
      "रुक-रुक कर हल्की बारिश"
    ],
    immediateActions: [
      "Prune affected foliage with sanitized shears.",
      "Sanitize farm tools before moving to healthy sections.",
      "Avoid handling wet plants to stop bacterial spread."
    ],
    immediateActionsMr: [
      "निर्जंतुक कात्रीने बाधित पाने छाटा.",
      "ओल्या पिकांवर काम करणे टाळा."
    ],
    immediateActionsHi: [
      "संक्रमित पत्तियों को छाँटें और कृषि औजारों को साफ रखें।",
      "गीले पौधों को छूने से बचें ताकि संक्रमण न फैले।"
    ],

    treatments: {
      organic: {
        name: "Copper Hydroxide 77% WP + Pseudomonas fluorescens",
        dosagePerLiter: "2.5 g/L",
        rate: 2.5,
        unit: "g",
        instructions: "Bio-fungicide spray for protective bactericidal coat."
      },
      chemical: {
        name: "Streptocycline 90:10 + Copper Oxychloride 50% WP",
        dosagePerLiter: "0.1 g + 2.5 g / L",
        rate: 2.5,
        unit: "g",
        instructions: "Foliar spray across all vegetative nodes."
      }
    },
    recheckDays: 4
  },
  aphids: {
    id: "aphids",
    name: "Aphids Infestation & Vector Risk",
    marathiName: "मावा कीड प्रादुर्भाव (Aphids)",
    hindiName: "माहू / एफिड्स प्रकोप (Aphids)",
    scientificName: "Aphis gossypii",
    crop: "Tomato",
    confidence: 94,
    severity: "Medium",
    severityLevel: 48,
    affectedArea: "18%",
    riskScore: 54,
    riskLevel: "Medium Risk",
    image: sampleLeafImages.aphids,
    reasons: [
      "Dry spells with rising temperature (30°C+)",
      "High nitrogen fertilizer application",
      "Presence of tender new leaf flushes"
    ],
    reasonsMr: [
      "तापमानात वाढ आणि कोरडे हवामान",
      "युरिया/नत्र खतांचा जास्त वापर",
      "नवीन कोवळी पालवी"
    ],
    reasonsHi: [
      "तापमान में वृद्धि और शुष्क मौसम",
      "अत्यधिक नाइट्रोजन उर्वरक का उपयोग",
      "नई कोमल पत्तियों की उपस्थिति"
    ],
    immediateActions: [
      "Install Yellow Sticky Traps @ 15-20 traps/acre.",
      "Wash undersides of leaves with high pressure water stream.",
      "Conserve natural predators like Ladybird beetles."
    ],
    immediateActionsMr: [
      "एकरला १५-२० पिवळे चिकट सापळे लावा.",
      "पानांच्या खालच्या बाजूवर पाण्याच्या फवाऱ्याने फवारणी करा.",
      "ढालकिडा (Ladybird beetle) या मित्रकिडींचे संरक्षण करा."
    ],
    immediateActionsHi: [
      "प्रति एकड़ 15-20 पीले चिपचिपे ट्रैप लगाएं।",
      "पत्तियों के नीचे तेज पानी के फुहारे से धोएं।",
      "मित्र कीटों का संरक्षण करें।"
    ],
    treatments: {
      organic: {
        name: "Verticillium lecanii (Bio-agent) OR Fish Oil Soap",
        dosagePerLiter: "5 g/L",
        rate: 5,
        unit: "g",
        instructions: "Target underside of curled leaves in high relative humidity."
      },
      chemical: {
        name: "Imidacloprid 17.8% SL",
        dosagePerLiter: "0.5 ml/L",
        rate: 0.5,
        unit: "ml",
        instructions: "Systemic insecticide. Stop spray 10 days before harvest."
      }
    },
    recheckDays: 3
  },
  powderyMildew: {
    id: "powdery_mildew",
    name: "Powdery Mildew",
    marathiName: "भुरी रोग (Powdery Mildew)",
    hindiName: "चूर्णिल आसिता / पाउडरी मिल्ड्यू",
    scientificName: "Leveillula taurica",
    crop: "Tomato",
    confidence: 93,
    severity: "High",
    severityLevel: 70,
    affectedArea: "30%",
    riskScore: 72,
    riskLevel: "High Risk",
    image: sampleLeafImages.powderyMildew,
    reasons: [
      "Cool nights (15-18°C) followed by warm dry days (28-32°C)",
      "High relative humidity at night without leaf wetness",
      "Dense foliage shading"
    ],
    reasonsMr: [
      "थंड रात्री आणि उष्ण दिवस",
      "हवेतील जास्त आर्द्रता",
      "दाट झाडांची सावली"
    ],
    reasonsHi: [
      "ठंडी रातें और गर्म सूखे दिन",
      "हवा में उच्च नमी",
      "घनी पत्तियां"
    ],
    immediateActions: [
      "Thin out dense canopy for sun penetration.",
      "Avoid excessive nitrogen feeding.",
      "Collect and dispose powdery fallen leaves."
    ],
    immediateActionsMr: [
      "सूर्यप्रकाश थेट पडण्यासाठी जादा फांद्या विरळ करा.",
      "जास्त नत्र देणे टाळा."
    ],
    immediateActionsHi: [
      "सूर्य का प्रकाश मिलने के लिए घनी शाखाओं को छाँटें।",
      "अत्यधिक नाइट्रोजन के प्रयोग से बचें।"
    ],
    treatments: {
      organic: {
        name: "Wettable Sulfur 80% WDG OR Milk Whey 10%",
        dosagePerLiter: "2.5 g/L",
        rate: 2.5,
        unit: "g",
        instructions: "Sulfur spray in early morning. Do not spray in extreme midday heat (>35°C)."
      },
      chemical: {
        name: "Hexaconazole 5% EC",
        dosagePerLiter: "1 ml/L",
        rate: 1,
        unit: "ml",
        instructions: "Systemic triazole fungicide spray."
      }
    },
    recheckDays: 4
  },
  healthy: {
    id: "healthy",
    name: "Healthy Foliage (No Disease)",
    marathiName: "निरोगी पीक (कोणताही रोग नाही)",
    hindiName: "स्वस्थ फसल (कोई रोग नहीं)",
    scientificName: "Solanum lycopersicum",
    crop: "Tomato",
    confidence: 98,
    severity: "None",
    severityLevel: 5,
    affectedArea: "0%",
    riskScore: 12,
    riskLevel: "Low Risk",
    image: sampleLeafImages.healthy,
    reasons: [
      "Optimal chlorophyll index",
      "No fungal lesions or insect feeding vectors",
      "Balanced soil nutrients"
    ],
    reasonsMr: [
      "उत्तम हरितद्रव्य निर्देशांक",
      "कोणतेही बुरशीचे डाग किंवा कीड नाही",
      "संतुलित अन्नद्रव्ये"
    ],
    reasonsHi: [
      "उत्कृष्ट क्लोरोफिल स्तर",
      "कोई फफूंद या कीट नहीं",
      "संतुलित पोषक तत्व"
    ],
    immediateActions: [
      "Maintain current balanced irrigation & fertigation schedule.",
      "Keep pheromone & sticky monitoring traps active in field.",
      "Continue bi-weekly proactive scouting."
    ],
    immediateActionsMr: [
      "नियमित ठिबक पाणी आणि संतुलित खत व्यवस्थापन चालू ठेवा.",
      "कामगंध सापळे शेतात नियमित तपासा."
    ],
    immediateActionsHi: [
      "वर्तमान संतुलित सिंचाई और पोषण बनाए रखें।",
      "नियमित निगरानी जारी रखें।"
    ],
    treatments: {
      organic: {
        name: "Preventive Panchagavya / Seaweed Extract",
        dosagePerLiter: "3 ml/L",
        rate: 3,
        unit: "ml",
        instructions: "Foliar spray for immunity boosting."
      },
      chemical: {
        name: "Not Required (Proactive Booster Only)",
        dosagePerLiter: "0",
        rate: 0,
        unit: "-",
        instructions: "Maintain standard preventive crop schedule."
      }
    },
    recheckDays: 7
  }
};

// District Surveillance Statistics (matching the Admin Dashboard mockup)
export const surveillanceStats = {
  totalReports: 1248,
  totalReportsGrowth: "+18%",
  diseasesDetected: 7,
  diseasesGrowth: "+12%",
  highRiskAreas: 23,
  highRiskGrowth: "+15%",
  farmersActive: 842,
  farmersGrowth: "+20%",
  timeRange: "20 May – 27 May 2024"
};

// Disease Trend Timeline Data (Matching mockup chart exactly)
export const diseaseTrendData = [
  { date: "20 May", earlyBlight: 70, leafSpot: 50, aphids: 25 },
  { date: "21 May", earlyBlight: 125, leafSpot: 85, aphids: 20 },
  { date: "22 May", earlyBlight: 90, leafSpot: 55, aphids: 30 },
  { date: "23 May", earlyBlight: 125, leafSpot: 70, aphids: 35 },
  { date: "24 May", earlyBlight: 105, leafSpot: 65, aphids: 35 },
  { date: "25 May", earlyBlight: 150, leafSpot: 100, aphids: 35 },
  { date: "26 May", earlyBlight: 145, leafSpot: 95, aphids: 45 },
  { date: "27 May", earlyBlight: 175, leafSpot: 135, aphids: 40 },
];

// Top Diseases Donut Data (Matching mockup donut chart exactly)
export const topDiseasesDistribution = [
  { name: "Early Blight", value: 42, color: "#dc2626" },
  { name: "Leaf Spot", value: 26, color: "#16a34a" },
  { name: "Aphids", value: 18, color: "#eab308" },
  { name: "Powdery Mildew", value: 9, color: "#f97316" },
  { name: "Others", value: 5, color: "#06b6d4" },
];

// Geospatial Hotspot Locations (Sangli District Clusters)
export const sangliHotspots = [
  {
    id: "spot-1",
    name: "Sangli City & Haripur Cluster",
    lat: 16.8524,
    lng: 74.5815,
    risk: "High",
    disease: "Early Blight (Alternaria solani)",
    affectedFarms: 48,
    reportsCount: 164,
    severityScore: 88,
    radius: 3800,
    color: "#ef4444",
    leadOfficer: "Dr. Suhas More",
    advisoryStatus: "Active Alert Issued",
    recommendation: "Emergency Mancozeb / Neem spray advisory"
  },
  {
    id: "spot-2",
    name: "Miraj Agricultural Belt",
    lat: 16.8222,
    lng: 74.6509,
    risk: "High",
    disease: "Early Blight & Leaf Spot",
    affectedFarms: 35,
    reportsCount: 112,
    severityScore: 82,
    radius: 3200,
    color: "#ef4444",
    leadOfficer: "A. S. Kulkarni",
    advisoryStatus: "Advisory Broadcasted",
    recommendation: "Trap counts spiked; field scouting mandated"
  },
  {
    id: "spot-3",
    name: "Tasgaon Grape & Vegetable Zone",
    lat: 17.0344,
    lng: 74.6006,
    risk: "Medium",
    disease: "Powdery Mildew & Aphids",
    affectedFarms: 22,
    reportsCount: 78,
    severityScore: 58,
    radius: 2600,
    color: "#f59e0b",
    leadOfficer: "V. R. Deshmukh",
    advisoryStatus: "Monitoring",
    recommendation: "Sulfur / Neem prophylactic spray"
  },
  {
    id: "spot-4",
    name: "Walwa – Islampur Fertile Basin",
    lat: 17.0396,
    lng: 74.3414,
    risk: "Low",
    disease: "Minor Bacterial Spot",
    affectedFarms: 9,
    reportsCount: 31,
    severityScore: 24,
    radius: 2000,
    color: "#22c55e",
    leadOfficer: "P. T. Jadhav",
    advisoryStatus: "Stable",
    recommendation: "Standard fertigation maintenance"
  },
  {
    id: "spot-5",
    name: "Palus Riverbed Cluster",
    lat: 17.0988,
    lng: 74.4533,
    risk: "Medium",
    disease: "Early Blight Spore Influx",
    affectedFarms: 18,
    reportsCount: 62,
    severityScore: 64,
    radius: 2400,
    color: "#f59e0b",
    leadOfficer: "S. K. Shinde",
    advisoryStatus: "Advisory Broadcasted",
    recommendation: "Pruning and copper hydroxide application"
  }
];

// Seed Farmer Reports
export const seedFarmerReports = [
  {
    id: "rep-101",
    farmerName: "Ramesh Patil",
    phone: "+91 98224 55120",
    village: "Kupwad, Sangli",
    crop: "Tomato (Abhinav Variety)",
    acreage: "2.5 Acres",
    stage: "Flowering",
    disease: "Early Blight (Alternaria solani)",
    confidence: 91,
    severity: "High",
    affectedArea: "23%",
    date: "2024-05-27 10:45 AM",
    status: "Verified by Officer",
    officerRemarks: "Field sample confirmed. Approved Neem Oil + Mancozeb application. 100% subsidy token generated for bio-fungicide.",
    verifiedBy: "Dr. Suhas More (Sangli Agri Dept)",
    verifiedAt: "2024-05-27 02:15 PM",
    image: sampleLeafImages.earlyBlight,
    recheckDate: "2024-05-30"
  },
  {
    id: "rep-102",
    farmerName: "Sunita Ghorpade",
    phone: "+91 94233 11890",
    village: "Tasgaon",
    crop: "Capsicum",
    acreage: "1.8 Acres",
    stage: "Fruiting",
    disease: "Bacterial Leaf Spot",
    confidence: 88,
    severity: "Medium",
    affectedArea: "15%",
    date: "2024-05-26 04:20 PM",
    status: "Under Officer Review",
    officerRemarks: "Pending physical specimen inspection at Regional Agri Lab.",
    verifiedBy: "Awaiting Officer",
    verifiedAt: null,
    image: sampleLeafImages.leafSpot,
    recheckDate: "2024-05-29"
  },
  {
    id: "rep-103",
    farmerName: "Anand Shinde",
    phone: "+91 97654 88321",
    village: "Miraj Rural",
    crop: "Tomato",
    acreage: "3.2 Acres",
    stage: "Vegetative",
    disease: "Aphids Infestation",
    confidence: 94,
    severity: "Medium",
    affectedArea: "18%",
    date: "2024-05-25 09:10 AM",
    status: "Verified by Officer",
    officerRemarks: "Sticky traps distributed. Advised Verticillium bio-agent.",
    verifiedBy: "V. R. Deshmukh (Extension Officer)",
    verifiedAt: "2024-05-25 11:30 AM",
    image: sampleLeafImages.aphids,
    recheckDate: "2024-05-28"
  }
];

// Seed Farmer Community Posts (with Real Farmer Profiles & Field Photography)
export const seedCommunityPosts = [
  {
    id: "post-1",
    author: "Ramesh Patil",
    location: "Kupwad, Sangli",
    role: "Farmer (2.5 Acres Tomato)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    timeAgo: "2 hours ago",
    crop: "Tomato (Flowering stage)",
    title: "Noticed concentric brown spots on lower leaves after 2 days of rain",
    content: "My 2.5 acre tomato crop is at flowering stage. Due to high humidity (65%) and cloudy weather in Sangli yesterday, brown spots with yellow halos appeared on lower leaves. KISAN VIGYAAN diagnosed Early Blight (91%). Need advice on whether organic Neem spray alone is sufficient or if chemical backup is required.",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d69104a49?w=900&auto=format&fit=crop&q=85",
    likes: 18,
    commentsCount: 3,
    trapCount: "Pheromone Trap: 4 moths/night | Sticky Trap: 12 whiteflies",
    isOfficerVerified: true,
    officerReview: {
      officerName: "Dr. Suhas More",
      officerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
      designation: "District Agriculture Extension Officer, Sangli",
      date: "1 hour ago",
      badge: "Official Agriculture Dept Validation",
      comment: "Confirmed as Early Blight (Alternaria solani). At 23% affected canopy and ongoing high humidity (65%), organic Neem oil (3 ml/L) should be alternated with protective Mancozeb 75% WP @ 2 g/L. Free bio-fungicide stock is available at the Kupwad Panchayat Krishi Seva Kendra today.",
      actionTaken: "Added GPS location to Sangli Hotspot Zone 1"
    },
    comments: [
      {
        id: "c-1",
        author: "Babanrao Patil",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
        role: "Farmer (Miraj)",
        time: "1 hour ago",
        text: "I faced the same last week. Pruning the lower 6 inches of foliage immediately helped stop the spread!"
      },
      {
        id: "c-2",
        author: "Prakash Shinde",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
        role: "Farmer (Tasgaon)",
        time: "45 mins ago",
        text: "Make sure you don't use sprinkler watering, switch to drip irrigation immediately."
      }
    ]
  },
  {
    id: "post-2",
    author: "Ganesh Kadam",
    location: "Walwa, Sangli",
    role: "Farmer (4 Acres Cotton/Tomato)",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    timeAgo: "5 hours ago",
    crop: "Tomato (Vegetative)",
    title: "Sticky traps filled with tiny green insects - Vector warning",
    content: "Checked my yellow sticky traps today morning and counted 28 aphids per card. Leaves are starting to curl slightly at the shoot tips. Weather forecast predicts warm dry winds.",
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=900&auto=format&fit=crop&q=85",
    likes: 12,
    commentsCount: 2,
    trapCount: "Yellow Sticky: 28 aphids/card (Above ETL)",
    isOfficerVerified: true,
    officerReview: {
      officerName: "P. T. Jadhav",
      officerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
      designation: "Taluka Krishi Adhikari, Walwa",
      date: "3 hours ago",
      badge: "Official Advisory",
      comment: "Economic Threshold Level (ETL) exceeded. Spray Verticillium lecanii bio-agent @ 5g/L or Imidacloprid 17.8% SL @ 0.5 ml/L on leaf undersides. Ensure nearby weed hosts are removed.",
      actionTaken: "Broadcasted Aphid Alert to Walwa Farmers"
    },
    comments: [
      {
        id: "c-3",
        author: "Santosh Mane",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80",
        role: "Farmer (Shirala)",
        time: "2 hours ago",
        text: "Neem oil 10,000 ppm mixed with mild soap gave 80% mortality within 48 hours in my polyhouse."
      }
    ]
  }
];

// Sensor & Trap Inputs Mock Data
export const liveSensorTelemetry = {
  weatherStation: {
    location: "Sangli Agri Research Substation",
    temperature: "28.4°C",
    humidity: "65%",
    rainfallLast48h: "14.2 mm",
    windSpeed: "8.5 km/h",
    leafWetnessHours: "6.5 hrs",
    soilMoisture: "44%",
    soilTemp: "23.8°C"
  },
  pestTraps: [
    {
      id: "trap-01",
      name: "Pheromone Trap #1 (Fruit Borer - Helicoverpa)",
      count: 7,
      threshold: 8,
      status: "Near Warning Level",
      lastCleaned: "2 days ago"
    },
    {
      id: "trap-02",
      name: "Yellow Sticky Trap #3 (Aphids / Whitefly)",
      count: 24,
      threshold: 15,
      status: "Threshold Exceeded (High)",
      lastCleaned: "Yesterday"
    },
    {
      id: "trap-03",
      name: "Light Trap #1 (Spodoptera)",
      count: 3,
      threshold: 10,
      status: "Safe (Low)",
      lastCleaned: "3 days ago"
    }
  ]
};
