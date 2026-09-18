// Maharashtra State Boundary & District Boundary Segments
// Used for rendering faint 3D borders on the SoilGrids Globe

export const MAHARASHTRA_OUTLINE = [
  // West Coast (South to North)
  [15.75, 73.65], // Sindhudurg / Goa border
  [16.10, 73.45], // Malvan
  [16.50, 73.30], // Vijaydurg
  [16.99, 73.28], // Ratnagiri
  [17.50, 73.18], // Guhagar
  [17.95, 73.05], // Harihareshwar
  [18.30, 72.95], // Murud Janjira
  [18.75, 72.85], // Alibag
  [18.95, 72.82], // Mumbai Harbour
  [19.15, 72.80], // Mumbai Suburban
  [19.50, 72.75], // Palghar
  [20.10, 72.72], // Dahanu / Gujarat border
  // Northern Border (Gujarat & MP border through Satpura)
  [20.35, 73.20], // Jawhar / Surgana
  [20.80, 73.80], // Nandurbar / Navapur
  [21.60, 74.05], // Dhadgaon / Narmada River
  [21.95, 74.25], // Toranmal peak
  [21.80, 74.85], // Shahada
  [21.40, 75.30], // Shirpur
  [21.35, 75.75], // Chopda
  [21.45, 76.10], // Raver / Burhanpur border
  [21.40, 76.60], // Melghat / Satpura MP border
  [21.60, 77.10], // Dharni (Amravati)
  [21.45, 77.80], // Morshi / Betul border
  [21.60, 78.60], // Narkhed / Chhindwara border
  [21.65, 79.25], // Pench / Totladoh border
  [21.60, 79.70], // Bawanthadi / Seoni border
  [21.45, 80.25], // Gondia / Balaghat border
  // Eastern Border (Chhattisgarh border)
  [21.20, 80.40], // Salekasa
  [20.80, 80.50], // Deori / Rajnandgaon border
  [20.30, 80.70], // Korchi / Gadchiroli
  [19.80, 80.60], // Dhanora
  [19.20, 80.45], // Etapalli
  [18.80, 80.20], // Bhamragad (Indravati confluence)
  [18.65, 79.95], // Sironcha (Pranhita-Godavari confluence, southernmost Vidarbha)
  // Southern & South-Western Border (Telangana & Karnataka border)
  [19.10, 79.60], // Aheri
  [19.50, 79.20], // Chandrapur / Asifabad border
  [19.70, 78.70], // Rajura
  [19.80, 78.10], // Penganga border (Kinwat)
  [19.40, 77.80], // Mahoor
  [18.85, 77.85], // Dharmabad (Nanded)
  [18.50, 77.35], // Mukhed / Nizamabad border
  [18.30, 77.00], // Degloor
  [18.10, 76.60], // Nilanga / Bidar border
  [17.80, 76.10], // Omerga / Aland border
  [17.50, 75.90], // Akkalkot / Gulbarga border
  [17.20, 75.70], // South Solapur
  [16.90, 75.30], // Mangalwedha / Bijapur border
  [16.85, 74.90], // Jath / Athani border
  [16.65, 74.60], // Miraj / Belagavi border
  [16.40, 74.40], // Kagal / Nipani border
  [16.20, 74.25], // Chandgad
  [15.80, 74.00], // Dodamarg
  [15.75, 73.65]  // Loop back to Sindhudurg / Goa
];

// Faint District Internal Dividing Lines
export const DISTRICT_INTERNAL_BORDERS = [
  // Western Ghats ridge separating Konkan from Plateau
  [
    [15.80, 73.90], [16.20, 73.80], [16.70, 73.70], [17.15, 73.60],
    [17.55, 73.55], [17.90, 73.50], [18.40, 73.40], [18.80, 73.35],
    [19.30, 73.30], [19.80, 73.35], [20.20, 73.30]
  ],
  // Sangli - Kolhapur - Satara boundaries
  [
    [16.55, 74.15], [16.70, 74.35], [16.85, 74.40], [17.10, 74.20]
  ],
  [
    [17.10, 74.20], [17.25, 74.60], [17.35, 74.90], [17.15, 75.25]
  ],
  // Pune - Satara - Solapur boundaries
  [
    [17.90, 73.70], [17.95, 74.20], [18.15, 74.60], [18.10, 75.10]
  ],
  [
    [18.10, 75.10], [18.50, 75.30], [18.80, 75.20]
  ],
  // Pune - Ahmednagar - Nashik boundaries
  [
    [18.60, 73.60], [19.00, 74.00], [19.10, 74.50], [19.40, 74.70]
  ],
  [
    [19.40, 74.70], [19.80, 74.20], [20.00, 73.80]
  ],
  // Marathwada internal dividers (Chhatrapati Sambhaji Nagar, Jalna, Beed, Nanded, Parbhani, Latur, Osmanabad)
  [
    [19.50, 75.00], [19.88, 75.35], [20.20, 75.50]
  ],
  [
    [19.88, 75.35], [19.85, 75.90], [19.40, 76.20]
  ],
  [
    [19.40, 76.20], [19.15, 76.50], [19.00, 77.00], [19.20, 77.40]
  ],
  [
    [19.00, 75.75], [18.80, 76.20], [18.40, 76.60], [18.20, 76.30]
  ],
  // North Maharashtra (Jalgaon, Dhule, Nandurbar)
  [
    [20.50, 74.20], [21.00, 74.40], [21.50, 74.40]
  ],
  [
    [20.50, 74.90], [20.90, 75.20], [21.35, 75.40]
  ],
  // Vidarbha Dividers (Buldhana, Akola, Washim, Amravati, Yavatmal, Wardha, Nagpur, Bhandara, Gondia, Chandrapur, Gadchiroli)
  [
    [20.20, 76.10], [20.80, 76.30], [21.20, 76.40]
  ],
  [
    [20.30, 76.90], [20.70, 77.05], [21.20, 77.10]
  ],
  [
    [20.00, 77.40], [20.60, 77.80], [21.30, 78.00]
  ],
  [
    [20.40, 78.40], [20.80, 78.70], [21.35, 78.80]
  ],
  [
    [20.70, 79.20], [21.15, 79.30], [21.50, 79.50]
  ],
  [
    [20.60, 79.90], [21.15, 80.00], [21.40, 80.10]
  ],
  [
    [19.80, 79.50], [20.30, 79.80], [20.70, 80.20]
  ]
];

// District Centroids with Localized Names & Agro Data
export const DISTRICT_NODES = [
  { id: 'sangli', name: 'Sangli', nameMr: 'सांगली', lat: 16.8524, lng: 74.5815, soil: 'VR', waterIndex: 84 },
  { id: 'kolhapur', name: 'Kolhapur', nameMr: 'कोल्हापूर', lat: 16.7050, lng: 74.2433, soil: 'VR/FR', waterIndex: 92 },
  { id: 'satara', name: 'Satara', nameMr: 'सातारा', lat: 17.6805, lng: 74.0183, soil: 'CM/VR', waterIndex: 88 },
  { id: 'pune', name: 'Pune', nameMr: 'पुणे', lat: 18.5204, lng: 73.8567, soil: 'VR', waterIndex: 86 },
  { id: 'solapur', name: 'Solapur', nameMr: 'सोलापूर', lat: 17.6599, lng: 75.9064, soil: 'VR', waterIndex: 78 },
  { id: 'ahmednagar', name: 'Ahmednagar', nameMr: 'अहिल्यानगर', lat: 19.0952, lng: 74.7496, soil: 'VR', waterIndex: 76 },
  { id: 'nashik', name: 'Nashik', nameMr: 'नाशिक', lat: 19.9975, lng: 73.7898, soil: 'VR', waterIndex: 85 },
  { id: 'dhule', name: 'Dhule', nameMr: 'धुळे', lat: 20.9042, lng: 74.7749, soil: 'VR', waterIndex: 74 },
  { id: 'nandurbar', name: 'Nandurbar', nameMr: 'नंदुरबार', lat: 21.3705, lng: 74.2409, soil: 'CM/LP', waterIndex: 72 },
  { id: 'jalgaon', name: 'Jalgaon', nameMr: 'जळगाव', lat: 21.0077, lng: 75.5626, soil: 'VR', waterIndex: 80 },
  { id: 'aurangabad', name: 'Chh. Sambhajinagar', nameMr: 'छ. संभाजीनगर', lat: 19.8762, lng: 75.3433, soil: 'VR', waterIndex: 75 },
  { id: 'jalna', name: 'Jalna', nameMr: 'जालना', lat: 19.8347, lng: 75.8816, soil: 'VR', waterIndex: 71 },
  { id: 'beed', name: 'Beed', nameMr: 'बीड', lat: 18.9891, lng: 75.7601, soil: 'VR', waterIndex: 69 },
  { id: 'latur', name: 'Latur', nameMr: 'लातूर', lat: 18.4088, lng: 76.5604, soil: 'VR', waterIndex: 73 },
  { id: 'osmanabad', name: 'Dharashiv', nameMr: 'धाराशिव', lat: 18.1856, lng: 76.0419, soil: 'VR', waterIndex: 70 },
  { id: 'nanded', name: 'Nanded', nameMr: 'नांदेड', lat: 19.1383, lng: 77.3210, soil: 'VR', waterIndex: 79 },
  { id: 'parbhani', name: 'Parbhani', nameMr: 'परभणी', lat: 19.2686, lng: 76.7708, soil: 'VR', waterIndex: 74 },
  { id: 'hingoli', name: 'Hingoli', nameMr: 'हिंगोली', lat: 19.7173, lng: 77.1472, soil: 'VR', waterIndex: 75 },
  { id: 'buldhana', name: 'Buldhana', nameMr: 'बुलढाणा', lat: 20.5293, lng: 76.1843, soil: 'VR', waterIndex: 74 },
  { id: 'akola', name: 'Akola', nameMr: 'अकोला', lat: 20.7002, lng: 77.0082, soil: 'VR', waterIndex: 77 },
  { id: 'washim', name: 'Washim', nameMr: 'वाशिम', lat: 20.1110, lng: 77.1350, soil: 'VR', waterIndex: 73 },
  { id: 'amravati', name: 'Amravati', nameMr: 'अमरावती', lat: 20.9320, lng: 77.7523, soil: 'VR', waterIndex: 81 },
  { id: 'yavatmal', name: 'Yavatmal', nameMr: 'यवतमाळ', lat: 20.3888, lng: 78.1204, soil: 'VR', waterIndex: 70 },
  { id: 'wardha', name: 'Wardha', nameMr: 'वर्धा', lat: 20.7453, lng: 78.6022, soil: 'VR', waterIndex: 78 },
  { id: 'nagpur', name: 'Nagpur', nameMr: 'नागपूर', lat: 21.1458, lng: 79.0882, soil: 'VR/LV', waterIndex: 83 },
  { id: 'bhandara', name: 'Bhandara', nameMr: 'भंडारा', lat: 21.1714, lng: 79.6543, soil: 'LV', waterIndex: 86 },
  { id: 'gondia', name: 'Gondia', nameMr: 'गोंदिया', lat: 21.4598, lng: 80.1961, soil: 'LV/FR', waterIndex: 88 },
  { id: 'chandrapur', name: 'Chandrapur', nameMr: 'चंद्रपूर', lat: 19.9615, lng: 79.2961, soil: 'VR/LV', waterIndex: 79 },
  { id: 'gadchiroli', name: 'Gadchiroli', nameMr: 'गडचिरोली', lat: 20.1809, lng: 80.0019, soil: 'FR/LV', waterIndex: 89 },
  { id: 'thane', name: 'Thane', nameMr: 'ठाणे', lat: 19.2183, lng: 72.9781, soil: 'FR', waterIndex: 91 },
  { id: 'palghar', name: 'Palghar', nameMr: 'पालघर', lat: 19.6967, lng: 72.7699, soil: 'FR', waterIndex: 89 },
  { id: 'raigad', name: 'Raigad', nameMr: 'रायगड', lat: 18.5158, lng: 73.1822, soil: 'FR', waterIndex: 93 },
  { id: 'ratnagiri', name: 'Ratnagiri', nameMr: 'रत्नागिरी', lat: 16.9902, lng: 73.3120, soil: 'FR', waterIndex: 95 },
  { id: 'sindhudurg', name: 'Sindhudurg', nameMr: 'सिंधुदुर्ग', lat: 16.1158, lng: 73.6937, soil: 'FR', waterIndex: 96 },
  { id: 'mumbai', name: 'Mumbai City', nameMr: 'मुंबई', lat: 18.9220, lng: 72.8347, soil: 'FL/FR', waterIndex: 90 },
  { id: 'mumbai_sub', name: 'Mumbai Sub', nameMr: 'मुंबई उपनगर', lat: 19.0760, lng: 72.8777, soil: 'FL/FR', waterIndex: 90 }
];
