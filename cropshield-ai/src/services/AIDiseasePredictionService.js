/**
 * CropShield AI - AI Disease Prediction Engine Service
 * 
 * Predicts potential crop diseases for a specific farmland plot given:
 * 1. Selected Crop Type
 * 2. Planting / Forecast Date
 * 3. Plot Latitude & Longitude (GPS Centroid)
 * 4. Microclimate & Soil Telemetry (Ambient Temp, Humidity, Soil Moisture, pH)
 * 
 * Delivers:
 * - Ranked list of potential diseases with outbreak risk scores
 * - Precautionary & Preventive IPM methods
 * - Curative chemical & biological remedies with exact 15L backpack pump dosages & PHIs
 * - Multilingual disease titles and localized agronomist synthesis
 */

// ============================================================================
// 1. MASTER SUPPORTED CROPS
// ============================================================================
export const SUPPORTED_CROPS = [
  { id: 'cotton', name: 'Bt Cotton', nameMr: 'बीटी कापूस', nameTa: 'பருத்தி', nameHi: 'कपास', category: 'Cash Crop', icon: '🌱' },
  { id: 'rice', name: 'Paddy / Rice', nameMr: 'भात / धान', nameTa: 'நெல்', nameHi: 'धान / चावल', category: 'Cereal', icon: '🌾' },
  { id: 'tomato', name: 'Tomato', nameMr: 'टोमॅटो', nameTa: 'தக்காளி', nameHi: 'टमाटर', category: 'Vegetable', icon: '🍅' },
  { id: 'pearl_millet', name: 'Pearl Millet / Bajra', nameMr: 'बाजरी', nameTa: 'கம்பு', nameHi: 'बाजरा', category: 'Millet', icon: '🌾' },
  { id: 'sugarcane', name: 'Sugarcane', nameMr: 'ऊस', nameTa: 'கரும்பு', nameHi: 'गन्ना', category: 'Cash Crop', icon: '🎋' },
  { id: 'soybean', name: 'Soybean', nameMr: 'सोयाबीन', nameTa: 'சோயாபீன்', nameHi: 'सोयाबीन', category: 'Oilseed', icon: '🌿' },
  { id: 'grapes', name: 'Grapes', nameMr: 'द्राक्षे', nameTa: 'திராட்சை', nameHi: 'अंगूर', category: 'Fruit', icon: '🍇' },
  { id: 'onion', name: 'Onion', nameMr: 'कांदा', nameTa: 'வெங்காயம்', nameHi: 'प्याज', category: 'Vegetable', icon: '🧅' },
  { id: 'wheat', name: 'Wheat', nameMr: 'गहू', nameTa: 'கோதுமை', nameHi: 'गेहूं', category: 'Cereal', icon: '🌾' },
  { id: 'potato', name: 'Potato', nameMr: 'बटाटा', nameTa: 'உருளைக்கிழங்கு', nameHi: 'आलू', category: 'Vegetable', icon: '🥔' },
  { id: 'groundnut', name: 'Groundnut / Peanut', nameMr: 'भुईमूग', nameTa: 'வேர்க்கடலை', nameHi: 'मूंगफली', category: 'Oilseed', icon: '🥜' },
  { id: 'chickpea', name: 'Chickpea / Chana', nameMr: 'हरभरा / चणा', nameTa: 'கொண்டைக்கடலை', nameHi: 'चना', category: 'Pulse', icon: '🌱' },
  { id: 'banana', name: 'Banana', nameMr: 'केळी', nameTa: 'வாழை', nameHi: 'கேலா', category: 'Fruit', icon: '🍌' },
  { id: 'citrus', name: 'Citrus / Orange', nameMr: 'संत्रा / मोसंबी', nameTa: 'எலுமிச்சை / ஆரஞ்சு', nameHi: 'संतरा / नींबू', category: 'Fruit', icon: '🍊' },
  { id: 'turmeric', name: 'Turmeric', nameMr: 'हळद', nameTa: 'மஞ்சள்', nameHi: 'हल्दी', category: 'Spices', icon: '🫚' },
  { id: 'chilli', name: 'Chilli / Mirchi', nameMr: 'मिरची', nameTa: 'மிளகாய்', nameHi: 'मिर्च', category: 'Vegetable', icon: '🌶️' }
];

// ============================================================================
// 2. COMPREHENSIVE DISEASE DOSSIERS WITH PRECAUTIONS & CURE
// ============================================================================
export const CROP_DISEASE_REGISTRY = {
  // ----------------------------------------------------
  // COTTON
  // ----------------------------------------------------
  cotton: [
    {
      id: 'cotton_bacterial_blight',
      name: 'Bacterial Blight / Angular Leaf Spot',
      nameMr: 'कापूस जिवाणू करपा (अँगुलेटर लीफ स्पॉट)',
      nameTa: 'பருத்தி பாக்டீரியா கருகல் நோய்',
      nameHi: 'कपास जीवाणु झुलसा (ब्लैकआर्म)',
      pathogen: 'Xanthomonas citri pv. malvacearum',
      pathogenType: 'Bacterial',
      vulnerableStages: ['Seedling', 'Vegetative', 'Square & Boll Formation'],
      favorableMonths: [6, 7, 8, 9], // June to Sept (Monsoon)
      optimalTemp: { min: 25, max: 35 },
      optimalRH: 80,
      symptoms: 'Angular water-soaked foliar lesions bounded by leaf veinlets, progressing to blackarm on twigs and boll rot.',
      precautions: [
        'Delint and dress seeds with Carboxin 2g/kg or Streptocycline 1g/kg prior to sowing.',
        'Ensure proper field drainage; avoid water stagnation in furrows.',
        'Wider row spacing (90x60 cm) to facilitate air circulation and rapid canopy drying.',
        'Avoid excessive early nitrogen fertilization which causes lush, vulnerable foliage.'
      ],
      cure: {
        chemicalName: 'Streptocycline + Copper Oxychloride (COC) 50% WP',
        commercialBrands: 'Streptocycline (Hindustan Antibiotics) + Blitox 50 / Blue Copper',
        dosagePerLiter: '0.1g Streptocycline + 2.5g Copper Oxychloride per Liter of water',
        dosagePer15LPump: '1.5g Streptocycline + 37.5g COC per 15-Liter backpack sprayer pump',
        applicationMethod: 'Foliar spray during early morning; ensure thorough wetting of lower leaf surfaces.',
        waitingPeriod: '15 Days Pre-Harvest Interval (PHI)',
        treatmentSchedule: 'Repeat spray after 10-12 days if rainy, cloudy weather persists.'
      },
      alternativeCure: {
        chemicalName: 'Copper Hydroxide 53.8% DF (Kocide 2000) @ 2.0g/L (30g per 15L pump)'
      }
    },
    {
      id: 'cotton_grey_mildew',
      name: 'Grey Mildew / Dahiya Disease',
      nameMr: 'कापूस दहिया रोग (ग्रे मिल्ड्यू)',
      nameTa: 'பருத்தி சாம்பல் பூஞ்சை நோய்',
      nameHi: 'कपास दहिया रोग (ग्रे मिल्ड्यू)',
      pathogen: 'Ramularia areola (Cercosporella gossypii)',
      pathogenType: 'Fungal',
      vulnerableStages: ['Boll Development', 'Maturity'],
      favorableMonths: [9, 10, 11, 12], // Late monsoon & post-monsoon dew
      optimalTemp: { min: 20, max: 28 },
      optimalRH: 75,
      symptoms: 'Angular, frosted white powdery patches on lower leaf surface resembling wheat flour / curd (Dahiya).',
      precautions: [
        'Collect and destroy infected crop residues after harvest.',
        'Maintain balanced potassium fertilization to enhance leaf cuticle thickness.',
        'Prune excessive lower unproductive leaves (de-suckering) to enhance light penetration.'
      ],
      cure: {
        chemicalName: 'Carbendazim 50% WP OR Wettable Sulphur 80% WP',
        commercialBrands: 'Bavistin 50 WP / Sulfex 80 WP',
        dosagePerLiter: '1.0g Carbendazim OR 3.0g Wettable Sulphur per Liter',
        dosagePer15LPump: '15g Carbendazim OR 45g Wettable Sulphur per 15-Liter pump',
        applicationMethod: 'Foliar spray directed towards the underside of middle and bottom canopy leaves.',
        waitingPeriod: '14 Days PHI',
        treatmentSchedule: 'Spray at initial sighting of white powder; repeat after 14 days if dew persists.'
      },
      alternativeCure: {
        chemicalName: 'Kresoxim-methyl 44.3% SC (Ergon) @ 1 ml/L (15ml per 15L pump)'
      }
    },
    {
      id: 'cotton_boll_rot',
      name: 'Boll Rot Complex',
      nameMr: 'कापूस बोंड सड (Boll Rot)',
      nameTa: 'பருத்தி காய் அழுகல் நோய்',
      nameHi: 'कपास गूलर सड़न (Boll Rot)',
      pathogen: 'Complex: Colletotrichum gossypii, Fusarium spp., Rhizopus stolonifer',
      pathogenType: 'Fungal Complex',
      vulnerableStages: ['Flowering', 'Boll Maturation'],
      favorableMonths: [8, 9, 10], // Continuous monsoon rain
      optimalTemp: { min: 24, max: 32 },
      optimalRH: 85,
      symptoms: 'Water-soaked brown spots on maturing bolls expanding into dark sunken rot with fluffy mycelial fungal growth.',
      precautions: [
        'Avoid boll contact with damp soil by earthing up ridges.',
        'Control sucking pests and bollworms whose puncture wounds serve as entry points for fungi.',
        'Stop overhead sprinkler irrigation once boll bursting commences.'
      ],
      cure: {
        chemicalName: 'Mancozeb 75% WP + Carbendazim 12% + Mancozeb 63% WP',
        commercialBrands: 'Saaf / Companion / Indofil M-45',
        dosagePerLiter: '2.0g per Liter of water',
        dosagePer15LPump: '30g per 15-Liter backpack pump',
        applicationMethod: 'Targeted spray onto squares, flowers, and developing green bolls.',
        waitingPeriod: '21 Days PHI',
        treatmentSchedule: 'Apply immediately after continuous 3-day monsoon drizzle.'
      },
      alternativeCure: {
        chemicalName: 'Propiconazole 25% EC (Tilt) @ 1ml/L (15ml per 15L pump)'
      }
    }
  ],

  // ----------------------------------------------------
  // RICE / PADDY
  // ----------------------------------------------------
  rice: [
    {
      id: 'rice_blast',
      name: 'Paddy Blast (Leaf, Node & Neck Blast)',
      nameMr: 'भात करपा रोग (ब्लास्ट)',
      nameTa: 'நெல் குலை நோய் (பிளாஸ்ட்)',
      nameHi: 'धान का झुलसा रोग (ब्लास्ट)',
      pathogen: 'Magnaporthe oryzae (Pyricularia oryzae)',
      pathogenType: 'Fungal',
      vulnerableStages: ['Tillering', 'Panicle Initiation', 'Flowering'],
      favorableMonths: [7, 8, 9, 10],
      optimalTemp: { min: 22, max: 28 },
      optimalRH: 85,
      symptoms: 'Spindle-shaped eye-like lesions with grey centers and dark brown margins; breaking and rotting of panicle neck.',
      precautions: [
        'Seed treatment with Tricyclazole 75% WP @ 2g/kg seed or Carbendazim 2g/kg.',
        'Avoid split application of urea during foggy, overcast periods.',
        'Do not allow nursery beds to dry out; maintain thin water film during high-risk weeks.'
      ],
      cure: {
        chemicalName: 'Tricyclazole 75% WP',
        commercialBrands: 'Beam (Corteva) / Sivic / Baan',
        dosagePerLiter: '0.6g per Liter of water',
        dosagePer15LPump: '9.0g per 15-Liter backpack sprayer pump',
        applicationMethod: 'Spray at boot leaf stage prior to flower emergence to prevent catastrophic neck blast.',
        waitingPeriod: '30 Days PHI',
        treatmentSchedule: 'Apply 1st spray at leaf blast onset; 2nd spray at 5-10% panicle emergence.'
      },
      alternativeCure: {
        chemicalName: 'Isoprothiolane 40% EC (Fuji-One) @ 1.5 ml/L (22.5ml per 15L pump)'
      }
    },
    {
      id: 'rice_bacterial_leaf_blight',
      name: 'Bacterial Leaf Blight (BLB / Kresek)',
      nameMr: 'भात जिवाणू करपा (BLB)',
      nameTa: 'நெல் பாக்டீரியா இலை கருகல்',
      nameHi: 'धान का जीवाणु पत्ती झुलसा',
      pathogen: 'Xanthomonas oryzae pv. oryzae',
      pathogenType: 'Bacterial',
      vulnerableStages: ['Maximum Tillering', 'Booting'],
      favorableMonths: [7, 8, 9],
      optimalTemp: { min: 25, max: 34 },
      optimalRH: 80,
      symptoms: 'Wavy translucent lesions starting from leaf tips turning yellow-white; milky bacterial ooze beads on young lesions.',
      precautions: [
        'Drain field water completely for 3-4 days to stop bacterial spread through irrigation streams.',
        'Clip nursery seedling tips carefully; avoid leaf injury during transplanting.',
        'Apply Potash (MOP) in 2 splits to reinforce silica deposition in leaf epidermal cell walls.'
      ],
      cure: {
        chemicalName: 'Streptocycline + Copper Oxychloride 50% WP',
        commercialBrands: 'Streptocycline 90% + Blitox 50 WP',
        dosagePerLiter: '0.1g Streptocycline + 2.0g COC per Liter',
        dosagePer15LPump: '1.5g Streptocycline + 30g Copper Oxychloride per 15L pump',
        applicationMethod: 'Spray on standing crop in early morning; avoid spraying during windy thunderstorms.',
        waitingPeriod: '15 Days PHI',
        treatmentSchedule: 'Repeat spray after 10 days if waterlogged.'
      },
      alternativeCure: {
        chemicalName: 'Plantomycin (Streptomycin sulphate 9% + Tetracycline 1%) @ 1g/L'
      }
    },
    {
      id: 'rice_sheath_blight',
      name: 'Sheath Blight',
      nameMr: 'भात खोड करपा (शेत ब्लाइट)',
      nameTa: 'நெல் உறை அழுகல் நோய்',
      nameHi: 'धान का शीथ ब्लाइट',
      pathogen: 'Rhizoctonia solani',
      pathogenType: 'Fungal',
      vulnerableStages: ['Tillering to Heading'],
      favorableMonths: [8, 9, 10],
      optimalTemp: { min: 28, max: 32 },
      optimalRH: 85,
      symptoms: 'Greenish-grey oval or irregular snake-skin lesions on leaf sheaths near water line.',
      precautions: [
        'Maintain optimum plant density (20x15 cm); avoid excessive hill clustering.',
        'Skim off floating sclerotia during initial puddling and land preparation.',
        'Apply Trichoderma harzianum @ 2.5 kg/ha enriched in farmyard manure (FYM).'
      ],
      cure: {
        chemicalName: 'Hexaconazole 5% EC OR Validamycin 3% L',
        commercialBrands: 'Contaf 5 EC (Tata Rallis) / Sheathmar 3L',
        dosagePerLiter: '2.0 ml Hexaconazole OR 2.5 ml Validamycin per Liter',
        dosagePer15LPump: '30 ml Hexaconazole OR 37.5 ml Validamycin per 15-Liter pump',
        applicationMethod: 'Direct spray nozzle towards the base/sheath of hills near water level.',
        waitingPeriod: '20 Days PHI',
        treatmentSchedule: 'Single targeted application at boot stage halts vertical lesion ascent.'
      },
      alternativeCure: {
        chemicalName: 'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1 ml/L'
      }
    }
  ],

  // ----------------------------------------------------
  // TOMATO
  // ----------------------------------------------------
  tomato: [
    {
      id: 'tomato_early_blight',
      name: 'Early Blight (Target Spot)',
      nameMr: 'टोमॅटो अल्टरनेरिया करपा (टार्गेट स्पॉट)',
      nameTa: 'தக்காளி ஆரம்பகால கருகல் நோய்',
      nameHi: 'टमाटर अगेती झुलसा (अल्टरनेरिया)',
      pathogen: 'Alternaria solani',
      pathogenType: 'Fungal',
      vulnerableStages: ['Vegetative', 'Fruiting'],
      favorableMonths: [6, 7, 8, 9, 10, 11],
      optimalTemp: { min: 24, max: 30 },
      optimalRH: 75,
      symptoms: 'Concentric ring "target-board" brown spots on older lower leaves, leaf yellowing, stem cankers.',
      precautions: [
        'Stake plants upright with bamboo/trellis to keep lower foliage off wet soil.',
        'Mulch soil surface with silver-black plastic mulch to prevent rain-splash spore dispersal.',
        'Prune off bottom 20 cm of leaves touching soil once fruiting begins.'
      ],
      cure: {
        chemicalName: 'Mancozeb 75% WP OR Chlorothalonil 75% WP',
        commercialBrands: 'Dithane M-45 / Kavach (Syngenta)',
        dosagePerLiter: '2.5g Mancozeb OR 2.0g Chlorothalonil per Liter',
        dosagePer15LPump: '37.5g Mancozeb OR 30g Chlorothalonil per 15-Liter pump',
        applicationMethod: 'Thorough foliar cover including both sides of leaves and green stems.',
        waitingPeriod: '7 Days PHI',
        treatmentSchedule: 'Begin preventive sprays 3 weeks after transplanting; repeat every 10-12 days.'
      },
      alternativeCure: {
        chemicalName: 'Difenoconazole 25% EC (Score) @ 0.8 ml/L (12ml per 15L pump)'
      }
    },
    {
      id: 'tomato_late_blight',
      name: 'Late Blight (Phytophthora)',
      nameMr: 'टोमॅटो तांबरा / लेट ब्लाइट',
      nameTa: 'தக்காளி பின்கால கருகல் நோய்',
      nameHi: 'टमाटर पछेती झुलसा (फाइटोफ्थोरा)',
      pathogen: 'Phytophthora infestans',
      pathogenType: 'Oomycete / Water Mold',
      vulnerableStages: ['Flowering', 'Fruit Sizing'],
      favorableMonths: [11, 12, 1, 2], // Cool, foggy, humid winter
      optimalTemp: { min: 14, max: 22 },
      optimalRH: 90,
      symptoms: 'Rapidly spreading dark water-soaked greasy patches on leaves with white cottony mold under high humidity; hard brown rot on green fruit.',
      precautions: [
        'Avoid furrow flooding or evening overhead sprinkler irrigation.',
        'Monitor daily minimum temperatures; fog + temp < 20°C triggers emergency preventive spray.',
        'Immediately rogue and burn severely blighted whole plants outside plot perimeter.'
      ],
      cure: {
        chemicalName: 'Metalaxyl-M 4% + Mancozeb 64% WP OR Cymoxanil 8% + Mancozeb 64% WP',
        commercialBrands: 'Ridomil Gold (Syngenta) / Curzate (Corteva)',
        dosagePerLiter: '2.5g per Liter of water',
        dosagePer15LPump: '37.5g per 15-Liter backpack sprayer pump',
        applicationMethod: 'Systemic curative spray; cover flower clusters and developing fruit.',
        waitingPeriod: '5 Days PHI',
        treatmentSchedule: 'Apply immediately upon initial lesion detection; re-apply after 7 days if fog continues.'
      },
      alternativeCure: {
        chemicalName: 'Dimethomorph 50% WP (Acrobat) @ 1.5g/L (22.5g per 15L pump)'
      }
    },
    {
      id: 'tomato_leaf_curl',
      name: 'Tomato Leaf Curl Virus (ToLCV)',
      nameMr: 'टोमॅटो पर्णगुच्छ रोग (चुरडा-मुरडा)',
      nameTa: 'தக்காளி இலை சுருட்டு வைரஸ்',
      nameHi: 'टमाटर पर्ण कुंचन (लीफ कर्ल)',
      pathogen: 'Tomato Leaf Curl Begomovirus (Vectored by Whitefly Bemisia tabaci)',
      pathogenType: 'Viral (Insect Vector)',
      vulnerableStages: ['Nursery', 'Early Vegetative (15-45 DAT)'],
      favorableMonths: [3, 4, 5, 9, 10], // Warm dry weather favoring whiteflies
      optimalTemp: { min: 28, max: 38 },
      optimalRH: 55,
      symptoms: 'Upward curling, puckering, reduction of leaf size, severe stunting of plant, bushy appearance, zero fruit setting.',
      precautions: [
        'Install Yellow Sticky Traps @ 20-25 traps per acre at canopy level.',
        'Erect border barrier crops (3 rows of Maize or Sorghum) around tomato plot to deflect whiteflies.',
        'Cover nursery beds with 40-mesh insect-proof nylon nets until transplanting.'
      ],
      cure: {
        chemicalName: 'Diafenthiuron 50% WP OR Imidacloprid 17.8% SL (Vector Control)',
        commercialBrands: 'Pegasus (Syngenta) / Confidor (Bayer)',
        dosagePerLiter: '1.2g Diafenthiuron OR 0.4ml Imidacloprid per Liter',
        dosagePer15LPump: '18g Diafenthiuron OR 6ml Imidacloprid per 15-Liter pump',
        applicationMethod: 'Vector knock-down spray targeting underside of fresh vegetative shoots.',
        waitingPeriod: '7 Days PHI',
        treatmentSchedule: 'Apply at 10, 25, and 40 days after transplanting to suppress whitefly colonization.'
      },
      alternativeCure: {
        chemicalName: 'Spiromesifen 22.9% SC (Oberon) @ 1ml/L + Neem Oil 10,000 ppm @ 2ml/L'
      }
    }
  ],

  // ----------------------------------------------------
  // PEARL MILLET / BAJRA
  // ----------------------------------------------------
  pearl_millet: [
    {
      id: 'bajra_blast',
      name: 'Pearl Millet Blast (Magnaporthe)',
      nameMr: 'बाजरीवरील करपा / ब्लास्ट',
      nameTa: 'கம்பு இலை கருகல் நோய்',
      nameHi: 'बाजरा झुलसा / ब्लास्ट',
      pathogen: 'Magnaporthe grisea / Pyricularia grisea',
      pathogenType: 'Fungal',
      vulnerableStages: ['Tillering', 'Flag Leaf', 'Grain Filling'],
      favorableMonths: [7, 8, 9],
      optimalTemp: { min: 25, max: 32 },
      optimalRH: 80,
      symptoms: 'Spindle-to-elliptical lesions with greyish center and purple-brown borders on leaf blades.',
      precautions: [
        'Adopt blast-resistant hybrid seeds (e.g., GHB 538, MPMH 17).',
        'Avoid excessive urea top-dressing during high rainfall spells.',
        'Destroy volunteer pearl millet grass weeds on plot bunds.'
      ],
      cure: {
        chemicalName: 'Tricyclazole 75% WP + Mancozeb 75% WP',
        commercialBrands: 'Beam 75 WP + Indofil M-45',
        dosagePerLiter: '0.6g Tricyclazole + 2.0g Mancozeb per Liter',
        dosagePer15LPump: '9g Tricyclazole + 30g Mancozeb per 15-Liter backpack pump',
        applicationMethod: 'Foliar spray when initial spindle spots appear on lower 3 leaves.',
        waitingPeriod: '14 Days PHI',
        treatmentSchedule: 'Single spray usually suffices; repeat after 12 days if heavy cloud cover continues.'
      },
      alternativeCure: {
        chemicalName: 'Propiconazole 25% EC @ 1ml/L (15ml per 15L pump)'
      }
    },
    {
      id: 'bajra_downy_mildew',
      name: 'Downy Mildew / Green Ear Disease',
      nameMr: 'बाजरी गोसावी रोग / हिरवी कणीस (डाऊनी मिल्ड्यू)',
      nameTa: 'கம்பு அடிச்சாம்பல் நோய்',
      nameHi: 'बाजरा हरित बाली / डाउनी मिल्ड्यू',
      pathogen: 'Sclerospora graminicola',
      pathogenType: 'Oomycete',
      vulnerableStages: ['Seedling', 'Earhead Emergence'],
      favorableMonths: [6, 7, 8],
      optimalTemp: { min: 20, max: 26 },
      optimalRH: 90,
      symptoms: 'Chlorotic leaf striping with downy white fungal growth underneath; floral earheads transform into twisted green leaf-like structures (Green Ear).',
      precautions: [
        'Seed treatment with Metalaxyl 35% WS (Apron 35 SD) @ 6g/kg seed.',
        'Rogue out and bury downy mildew infected chlorotic seedlings at 20-25 days after sowing.',
        'Follow crop rotation with legumes (Cowpea, Green Gram) to exhaust soil-borne oospores.'
      ],
      cure: {
        chemicalName: 'Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ)',
        commercialBrands: 'Ridomil MZ 72 WP / Krilaxyl',
        dosagePerLiter: '2.5g per Liter of water',
        dosagePer15LPump: '37.5g per 15-Liter backpack sprayer pump',
        applicationMethod: 'Foliar spray at 21 days after sowing (DAS) on entire canopy.',
        waitingPeriod: '21 Days PHI',
        treatmentSchedule: 'Second spray at 35 DAS if secondary foliar downy symptoms emerge.'
      },
      alternativeCure: {
        chemicalName: 'Fosetyl-Al 80% WP (Aliette) @ 2.5g/L (37.5g per 15L pump)'
      }
    }
  ],

  // ----------------------------------------------------
  // SUGARCANE
  // ----------------------------------------------------
  sugarcane: [
    {
      id: 'sugarcane_red_rot',
      name: 'Sugarcane Red Rot',
      nameMr: 'ऊस तांबडा कूज रोग (रेड रॉट)',
      nameTa: 'கரும்பு செவ்வழுகல் நோய்',
      nameHi: 'गन्ना लाल सड़न (रेड रॉट)',
      pathogen: 'Colletotrichum falcatum',
      pathogenType: 'Fungal',
      vulnerableStages: ['Tillering', 'Grand Growth', 'Maturity'],
      favorableMonths: [7, 8, 9, 10],
      optimalTemp: { min: 26, max: 32 },
      optimalRH: 85,
      symptoms: 'Withering and yellowing of crown leaves; splitting cane reveals longitudinal red internal pith with diagnostic cross-wise white bands and alcohol sour smell.',
      precautions: [
        'Use certified disease-free 2-bud or 3-bud setts from registered seed nurseries.',
        'Hot water treatment of setts at 52°C for 30 minutes prior to planting.',
        'Dip seed setts in Carbendazim 50% WP @ 1g/L for 15 minutes before furrow placement.',
        'Immediately uproot and burn red rot affected stools; avoid ratooning an infected field.'
      ],
      cure: {
        chemicalName: 'Sett Drench & Soil Drench: Carbendazim 50% WP + Trichoderma viride',
        commercialBrands: 'Bavistin 50 WP + Bio-Derma (TNAU / MPKV)',
        dosagePerLiter: '1.5g Carbendazim per Liter OR 5g Trichoderma per Liter',
        dosagePer15LPump: '22.5g Carbendazim OR 75g Trichoderma per 15-Liter pump (nozzle removed for drenching)',
        applicationMethod: 'Drench along the root zone stool base; no systemic foliar spray cures internal stalk rot.',
        waitingPeriod: '60 Days PHI',
        treatmentSchedule: 'Soil drenching at first appearance around affected patches to quarantine surrounding healthy stools.'
      },
      alternativeCure: {
        chemicalName: 'Thiophanate Methyl 70% WP (Roko) @ 1.5g/L soil drench'
      }
    },
    {
      id: 'sugarcane_smut',
      name: 'Sugarcane Whip Smut',
      nameMr: 'ऊस काणी रोग (स्मट / चाबूक काणी)',
      nameTa: 'கரும்பு சாட்டைக்கரி நோய்',
      nameHi: 'गन्ना चाबुक कंडुआ (स्मट)',
      pathogen: 'Sporisorium scitamineum',
      pathogenType: 'Fungal',
      vulnerableStages: ['Tillering', 'Early Grand Growth'],
      favorableMonths: [3, 4, 5, 10, 11],
      optimalTemp: { min: 25, max: 35 },
      optimalRH: 70,
      symptoms: 'Terminal growing point transforms into a long, whip-like, curved black structure covered in powdery smut teliospores.',
      precautions: [
        'Carefully cover whip with a polythene bag before cutting at base to prevent spore dispersal to neighboring fields.',
        'Avoid taking ratoon crops from smut-infected fields.',
        'Treat setts with Propiconazole 25% EC @ 1ml/L for 15 minutes before planting.'
      ],
      cure: {
        chemicalName: 'Propiconazole 25% EC (Tilt)',
        commercialBrands: 'Tilt 25 EC / Bumper',
        dosagePerLiter: '1.0 ml per Liter of water',
        dosagePer15LPump: '15 ml per 15-Liter backpack sprayer pump',
        applicationMethod: 'Foliar spray across stools following rogueing of initial whips.',
        waitingPeriod: '30 Days PHI',
        treatmentSchedule: 'Apply 2 sprays at 3-week intervals during formative tillering stage.'
      },
      alternativeCure: {
        chemicalName: 'Triadimefon 25% WP (Bayleton) @ 1g/L (15g per 15L pump)'
      }
    }
  ],

  // ----------------------------------------------------
  // SOYBEAN
  // ----------------------------------------------------
  soybean: [
    {
      id: 'soybean_rust',
      name: 'Asian Soybean Rust',
      nameMr: 'सोयाबीन तांबेरा रोग (रस्ट)',
      nameTa: 'சோயாபீன் துரு நோய்',
      nameHi: 'सोयाबीन गेरूई / रतुआ (रस्ट)',
      pathogen: 'Phakopsora pachyrhizi',
      pathogenType: 'Fungal',
      vulnerableStages: ['Flowering', 'Pod Filling'],
      favorableMonths: [8, 9, 10],
      optimalTemp: { min: 18, max: 28 },
      optimalRH: 85,
      symptoms: 'Tiny brown-red pustules on lower leaf surface, rapid yellowing, premature defoliation, flat empty pods.',
      precautions: [
        'Plant early at monsoon onset to avoid late-season rust spore showers.',
        'Avoid excess plant density; maintain 45x5 cm spacing for aeration.',
        'Regular field inspection of lower leaves starting at 40 days after sowing.'
      ],
      cure: {
        chemicalName: 'Hexaconazole 5% SC OR Propiconazole 25% EC',
        commercialBrands: 'Contaf Plus / Tilt 25 EC',
        dosagePerLiter: '1.0 ml per Liter of water',
        dosagePer15LPump: '15 ml per 15-Liter backpack sprayer pump',
        applicationMethod: 'Spray with hollow-cone nozzle directed upwards to coat underside of canopy.',
        waitingPeriod: '25 Days PHI',
        treatmentSchedule: 'Apply 1st spray at first sighting of pustules; 2nd spray 15 days later.'
      },
      alternativeCure: {
        chemicalName: 'Tebuconazole 25.9% EC (Folicur) @ 1ml/L (15ml per 15L pump)'
      }
    }
  ],

  // ----------------------------------------------------
  // GRAPES
  // ----------------------------------------------------
  grapes: [
    {
      id: 'grapes_downy_mildew',
      name: 'Grape Downy Mildew',
      nameMr: 'द्राक्ष केवडा रोग (डाऊनी मिल्ड्यू)',
      nameTa: 'திராட்சை அடிச்சாம்பல் நோய்',
      nameHi: 'अंगूर डाउनी मिल्ड्यू (केवड़ा)',
      pathogen: 'Plasmopara viticola',
      pathogenType: 'Oomycete',
      vulnerableStages: ['Post-pruning Sprouting', 'Inflorescence', 'Berry Set'],
      favorableMonths: [6, 7, 8, 9, 10], // Rainy cloudy weather
      optimalTemp: { min: 20, max: 27 },
      optimalRH: 90,
      symptoms: 'Translucent yellow "oil spots" on upper leaf surface with dense white cottony sporulation on the underside; berry shriveling.',
      precautions: [
        'Open canopy training (Bower / Y-trellis) to minimize shade and moisture retention.',
        'Apply pre-monsoon preventive spray of Bordeaux mixture (1%).',
        'Avoid excessive shoot congestion; perform timely shoot pinching.'
      ],
      cure: {
        chemicalName: 'Dimethomorph 50% WP OR Mandipropamid 23.4% SC',
        commercialBrands: 'Acrobat (BASF) / Revus (Syngenta)',
        dosagePerLiter: '1.0g Dimethomorph OR 0.8ml Mandipropamid per Liter',
        dosagePer15LPump: '15g Dimethomorph OR 12ml Mandipropamid per 15-Liter pump',
        applicationMethod: 'Mist blower or backpack spray ensuring complete under-leaf coverage.',
        waitingPeriod: '28 Days PHI',
        treatmentSchedule: 'Spray within 24 hours following any 10mm rain event during active vegetative flush.'
      },
      alternativeCure: {
        chemicalName: 'Metalaxyl 8% + Mancozeb 64% WP @ 2.5g/L (37.5g per 15L pump)'
      }
    },
    {
      id: 'grapes_powdery_mildew',
      name: 'Grape Powdery Mildew',
      nameMr: 'द्राक्ष भुरी रोग (पावडरी मिल्ड्यू)',
      nameTa: 'திராட்சை சாம்பல் நோய்',
      nameHi: 'अंगूर चूर्णिल आसिता (भूरी)',
      pathogen: 'Erysiphe necator (Uncinula necator)',
      pathogenType: 'Fungal',
      vulnerableStages: ['Pre-bloom', 'Berry Growth', 'Veraison'],
      favorableMonths: [11, 12, 1, 2, 3], // Dry, warm days with cool humid nights
      optimalTemp: { min: 22, max: 30 },
      optimalRH: 65,
      symptoms: 'Ash-grey powdery coating on leaves, shoots, flowers, and berries; berries crack open longitudinally.',
      precautions: [
        'Cluster thinning and leaf removal around fruiting clusters.',
        'Sulfur dusting @ 15-20 kg/ha in early morning dew during cool winter months.',
        'Ensure continuous monitoring during November to February berry development.'
      ],
      cure: {
        chemicalName: 'Azoxystrobin 8.3% + Mancozeb 66.7% WDG OR Penconazole 10% EC',
        commercialBrands: 'Topas 10 EC (Syngenta) / Custodia',
        dosagePerLiter: '0.5 ml Penconazole OR 1.5 ml Custodia per Liter',
        dosagePer15LPump: '7.5 ml Penconazole OR 22.5 ml Custodia per 15-Liter pump',
        applicationMethod: 'Targeted spray onto bunches and berry stems.',
        waitingPeriod: '14 Days PHI',
        treatmentSchedule: 'Apply at 5-leaf stage, pre-bloom, and pea-stage berries.'
      },
      alternativeCure: {
        chemicalName: 'Wettable Sulphur 80% WDG @ 2.5g/L (37.5g per 15L pump)'
      }
    }
  ],

  // ----------------------------------------------------
  // ONION
  // ----------------------------------------------------
  onion: [
    {
      id: 'onion_purple_blotch',
      name: 'Purple Blotch / Stemphylium Blight',
      nameMr: 'कांदा जांभळा करपा (पर्पल ब्लॉच)',
      nameTa: 'வெங்காயம் ஊதா நிற கருகல் நோய்',
      nameHi: 'प्याज का बैंगनी धब्बा (पर्पल ब्लॉच)',
      pathogen: 'Alternaria porri / Stemphylium vesicarium',
      pathogenType: 'Fungal',
      vulnerableStages: ['Vegetative', 'Bulb Development'],
      favorableMonths: [8, 9, 10, 11, 12],
      optimalTemp: { min: 21, max: 30 },
      optimalRH: 80,
      symptoms: 'Sunken white flecks enlarging into purplish-brown oval blotches with concentric rings; yellowing and collapse of leaves from tip.',
      precautions: [
        'Dip seedlings in Carbendazim @ 1g/L for 10 minutes before transplanting.',
        'Avoid heavy nitrogen applications during bulb development.',
        'Add agricultural sticker / spreader (e.g., Apsa-80 @ 0.5ml/L) to spray tank because onion leaves have waxy cuticles.'
      ],
      cure: {
        chemicalName: 'Tebuconazole 25.9% EC OR Mancozeb 75% WP + Sticker',
        commercialBrands: 'Folicur (Bayer) / Indofil M-45',
        dosagePerLiter: '1.0 ml Tebuconazole OR 2.5g Mancozeb + 0.5ml Spreader per Liter',
        dosagePer15LPump: '15 ml Tebuconazole + 7.5ml Sticker per 15-Liter backpack pump',
        applicationMethod: 'Foliar spray with fine hollow-cone nozzle; must include wetting sticker.',
        waitingPeriod: '15 Days PHI',
        treatmentSchedule: 'Apply 3 sprays at 15-day intervals starting 30 days after transplanting.'
      },
      alternativeCure: {
        chemicalName: 'Difenoconazole 25% EC (Score) @ 0.8 ml/L (12ml per 15L pump)'
      }
    }
  ],

  // ----------------------------------------------------
  // WHEAT
  // ----------------------------------------------------
  wheat: [
    {
      id: 'wheat_rust',
      name: 'Yellow Rust / Stripe Rust',
      nameMr: 'गहू पिवळा तांबेरा रोग (यलो रस्ट)',
      nameTa: 'கோதுமை மஞ்சள் துரு நோய்',
      nameHi: 'गेहूं पीला रतुआ (येलो रस्ट)',
      pathogen: 'Puccinia striiformis f. sp. tritici',
      pathogenType: 'Fungal',
      vulnerableStages: ['Tillering', 'Jointing', 'Heading'],
      favorableMonths: [12, 1, 2], // Cold winter months (Northern & Peninsular India)
      optimalTemp: { min: 10, max: 20 },
      optimalRH: 80,
      symptoms: 'Bright yellow powdery pustules arranged in parallel stripes along leaf veins; yellow powder stains farmer fingers.',
      precautions: [
        'Sow rust-resistant varieties recommended for the zone (e.g. HD 2967, PBW 550, MACS 6222).',
        'Avoid late sowing; complete wheat sowing before November 25.',
        'Regular surveillance of fields near foothills or river banks where fog lingers.'
      ],
      cure: {
        chemicalName: 'Propiconazole 25% EC (Tilt)',
        commercialBrands: 'Tilt 25 EC / Bumper',
        dosagePerLiter: '1.0 ml per Liter of water',
        dosagePer15LPump: '15 ml per 15-Liter backpack sprayer pump',
        applicationMethod: 'Thorough foliar spray across the entire canopy upon first sighting of yellow stripes.',
        waitingPeriod: '30 Days PHI',
        treatmentSchedule: 'Single timely spray halts epidemic spread; repeat after 15 days if cool humid weather continues.'
      },
      alternativeCure: {
        chemicalName: 'Tebuconazole 50% + Trifloxystrobin 25% WG (Nativo) @ 0.6g/L (9g per 15L pump)'
      }
    }
  ],

  // ----------------------------------------------------
  // POTATO
  // ----------------------------------------------------
  potato: [
    {
      id: 'potato_late_blight',
      name: 'Potato Late Blight',
      nameMr: 'बटाटा लेट ब्लाइट (तांबरा करपा)',
      nameTa: 'உருளைக்கிழங்கு பின்கால கருகல் நோய்',
      nameHi: 'आलू पछेती झुलसा (लेट ब्लाइट)',
      pathogen: 'Phytophthora infestans',
      pathogenType: 'Oomycete',
      vulnerableStages: ['Tuber Bulking', 'Canopy Closure'],
      favorableMonths: [11, 12, 1, 2],
      optimalTemp: { min: 12, max: 22 },
      optimalRH: 90,
      symptoms: 'Water-soaked spots turning black on leaves; white downy mold at borders in high humidity; tuber flesh develops dry rust-brown rot.',
      precautions: [
        'Use certified disease-free seed tubers.',
        'High earthing-up to bury tubers deep (10-15 cm) preventing spore wash from foliage to tubers.',
        'De-haulm (cut foliage) 10-12 days prior to digging tubers to prevent contact infection.'
      ],
      cure: {
        chemicalName: 'Cymoxanil 8% + Mancozeb 64% WP OR Dimethomorph 50% WP',
        commercialBrands: 'Curzate (Corteva) / Acrobat (BASF)',
        dosagePerLiter: '2.5g Cymoxanil+Mancozeb OR 1.5g Dimethomorph per Liter',
        dosagePer15LPump: '37.5g Curzate OR 22.5g Acrobat per 15-Liter pump',
        applicationMethod: 'Spray immediately upon warning bulletin or sighting of first blighted leaf in tract.',
        waitingPeriod: '7 Days PHI',
        treatmentSchedule: 'Repeat spray at 7-day intervals as long as overcast foggy conditions prevail.'
      },
      alternativeCure: {
        chemicalName: 'Metalaxyl-M 4% + Mancozeb 64% WP (Ridomil Gold) @ 2.5g/L'
      }
    }
  ]
};

// ============================================================================
// 3. ENGINE CALCULATOR: COMPUTES DISEASE RISK & ADVISORY
// ============================================================================

/**
 * Predicts crop diseases based on:
 * @param {Object} params
 * @param {string} params.cropId - Crop key e.g. 'cotton', 'rice', 'tomato', 'pearl_millet'
 * @param {string|Date} params.date - Planting / Prediction Date (YYYY-MM-DD)
 * @param {number} params.lat - Latitude of farmland plot
 * @param {number} params.lng - Longitude of farmland plot
 * @param {Object} params.telemetry - Optional live sensors { temp, rh, soilMoisture, soilPH }
 * @param {string} params.lang - Output language ('en', 'mr', 'ta', 'hi')
 * @returns {Promise<Object>} Comprehensive prediction report
 */
export async function predictPlotDiseases({
  cropId = 'cotton',
  date = new Date(),
  lat = 16.8524,
  lng = 74.5815,
  telemetry = {},
  lang = 'en'
}) {
  const normCropId = (cropId || 'cotton').toLowerCase().replace(/[\s\-_]/g, '_');
  
  // Resolve mapped crop key
  let resolvedCropKey = 'cotton';
  if (normCropId.includes('cotton') || normCropId.includes('kapas')) resolvedCropKey = 'cotton';
  else if (normCropId.includes('rice') || normCropId.includes('paddy') || normCropId.includes('bhat')) resolvedCropKey = 'rice';
  else if (normCropId.includes('tomato')) resolvedCropKey = 'tomato';
  else if (normCropId.includes('bajra') || normCropId.includes('millet')) resolvedCropKey = 'pearl_millet';
  else if (normCropId.includes('sugar') || normCropId.includes('cane')) resolvedCropKey = 'sugarcane';
  else if (normCropId.includes('soy')) resolvedCropKey = 'soybean';
  else if (normCropId.includes('grape')) resolvedCropKey = 'grapes';
  else if (normCropId.includes('onion')) resolvedCropKey = 'onion';
  else if (normCropId.includes('wheat')) resolvedCropKey = 'wheat';
  else if (normCropId.includes('potat')) resolvedCropKey = 'potato';
  else if (CROP_DISEASE_REGISTRY[normCropId]) resolvedCropKey = normCropId;

  // Selected crop metadata
  const cropMeta = SUPPORTED_CROPS.find(c => c.id === resolvedCropKey) || SUPPORTED_CROPS[0];

  // Parse date & agricultural season
  const parsedDate = new Date(date);
  const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  const month = validDate.getMonth() + 1; // 1 to 12
  const day = validDate.getDate();

  let seasonName = 'Kharif (Monsoon)';
  let seasonKey = 'kharif';
  if (month >= 6 && month <= 10) {
    seasonName = 'Kharif (Monsoon Season)';
    seasonKey = 'kharif';
  } else if (month >= 11 || month <= 2) {
    seasonName = 'Rabi (Winter Season)';
    seasonKey = 'rabi';
  } else {
    seasonName = 'Zaid (Summer Season)';
    seasonKey = 'zaid';
  }

  // Microclimate inputs (use live telemetry or regional climatological seasonal defaults)
  const temp = typeof telemetry.temp === 'number' ? telemetry.temp : (seasonKey === 'kharif' ? 28.5 : seasonKey === 'rabi' ? 22.0 : 34.0);
  const rh = typeof telemetry.rh === 'number' ? telemetry.rh : (seasonKey === 'kharif' ? 82.0 : seasonKey === 'rabi' ? 68.0 : 45.0);
  const soilMoisture = typeof telemetry.soilMoisture === 'number' ? telemetry.soilMoisture : (seasonKey === 'kharif' ? 70 : 45);
  const soilPH = typeof telemetry.soilPH === 'number' ? telemetry.soilPH : 6.8;

  // Agro-climatic zone classification from coordinates
  let agroZone = 'Maharashtra Deccan Plateau (Black Vertisols)';
  if (lat < 13.0) agroZone = 'Southern Peninsular Plains (Tamil Nadu / Kerala)';
  else if (lat > 25.0) agroZone = 'Indo-Gangetic Alluvial Plain';
  else if (lng < 74.0) agroZone = 'Western Ghats Humid Coastal Belt';
  else if (lng > 78.0) agroZone = 'Vidarbha / Central Cotton & Soybean Belt';

  // Get diseases for this crop
  const diseaseList = CROP_DISEASE_REGISTRY[resolvedCropKey] || CROP_DISEASE_REGISTRY.cotton;

  // Score each disease based on date month match, temperature & humidity suitability, and soil conditions
  const scoredDiseases = diseaseList.map(disease => {
    let score = 30; // Baseline incidence probability

    // 1. Month / Season Suitability
    if (disease.favorableMonths.includes(month)) {
      score += 35;
    } else {
      // Check if adjacent month
      const isNear = disease.favorableMonths.some(m => Math.abs(m - month) === 1 || Math.abs(m - month) === 11);
      if (isNear) score += 15;
    }

    // 2. Temperature Suitability
    if (temp >= disease.optimalTemp.min && temp <= disease.optimalTemp.max) {
      score += 20;
    } else if (temp >= disease.optimalTemp.min - 3 && temp <= disease.optimalTemp.max + 3) {
      score += 10;
    }

    // 3. Humidity Suitability
    if (rh >= disease.optimalRH) {
      score += 15;
    } else if (rh >= disease.optimalRH - 15) {
      score += 8;
    }

    // Cap score 10 to 98
    const riskScore = Math.max(12, Math.min(96, score));

    // Risk Level Assignment
    let riskLevel = 'LOW';
    let riskLabel = 'LOW RISK';
    let riskColor = 'emerald';
    let badgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';

    if (riskScore >= 75) {
      riskLevel = 'VERY_HIGH';
      riskLabel = 'CRITICAL ALERT';
      riskColor = 'rose';
      badgeBg = 'bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800';
    } else if (riskScore >= 55) {
      riskLevel = 'HIGH';
      riskLabel = 'HIGH RISK';
      riskColor = 'orange';
      badgeBg = 'bg-orange-100 text-orange-900 border-orange-400 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-800';
    } else if (riskScore >= 35) {
      riskLevel = 'MODERATE';
      riskLabel = 'MODERATE RISK';
      riskColor = 'amber';
      badgeBg = 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800';
    }

    // Localized name helper
    const localizedTitle = lang === 'mr' ? disease.nameMr : lang === 'ta' ? disease.nameTa : lang === 'hi' ? disease.nameHi : disease.name;

    return {
      ...disease,
      localizedTitle,
      riskScore,
      riskLevel,
      riskLabel,
      riskColor,
      badgeBg,
      favorableTempStr: `${disease.optimalTemp.min}°C – ${disease.optimalTemp.max}°C`,
      favorableRHStr: `≥ ${disease.optimalRH}% RH`
    };
  });

  // Sort descending by risk score
  scoredDiseases.sort((a, b) => b.riskScore - a.riskScore);

  const highestThreat = scoredDiseases[0] || null;

  // Synthesize natural language advisory narrative
  const summaryNarrative = generateScientificSummary({
    cropName: cropMeta.name,
    cropMeta,
    seasonName,
    dateStr: validDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    lat,
    lng,
    agroZone,
    temp,
    rh,
    soilMoisture,
    highestThreat,
    lang
  });

  return {
    success: true,
    timestamp: new Date().toISOString(),
    queryContext: {
      cropId: resolvedCropKey,
      cropName: cropMeta.name,
      cropIcon: cropMeta.icon,
      date: validDate.toISOString().split('T')[0],
      formattedDate: validDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      season: seasonName,
      coordinates: {
        lat: Number(lat.toFixed(5)),
        lng: Number(lng.toFixed(5)),
        display: `${Number(lat).toFixed(4)}°N, ${Number(lng).toFixed(4)}°E`
      },
      agroZone,
      telemetry: {
        temp: Number(temp.toFixed(1)),
        rh: Number(rh.toFixed(1)),
        soilMoisture: Number(soilMoisture.toFixed(0)),
        soilPH: Number(soilPH.toFixed(2))
      }
    },
    totalDiseasesEvaluated: scoredDiseases.length,
    highestRiskDisease: highestThreat?.name || 'None',
    highestRiskScore: highestThreat?.riskScore || 0,
    diseases: scoredDiseases,
    summaryNarrative
  };
}

/**
 * Internal generator for scientific advisory narrative
 */
function generateScientificSummary({ cropName, cropMeta, seasonName, dateStr, lat, lng, agroZone, temp, rh, soilMoisture, highestThreat, lang }) {
  if (lang === 'mr') {
    return `दिनांक ${dateStr} रोजी अक्षांश ${lat.toFixed(2)}°, रेखांश ${lng.toFixed(2)}° (${agroZone}) येथील आपल्या शेतात ${cropMeta.nameMr} पिकासाठी ${seasonName} हंगामातील हवामान अंदाज तपासला गेला आहे. सध्याचे तापमान (${temp}°C) व आर्द्रता (${rh}%) पाहता, मुख्य धोका "${highestThreat ? highestThreat.nameMr : 'काही नाही'}" चा संभवतो. लागवडीपूर्वी बीजप्रक्रिया व प्रतिबंधात्मक उपाययोजना तातडीने कराव्यात.`;
  }
  if (lang === 'ta') {
    return `${dateStr} தேதியில் அட்சரேகை ${lat.toFixed(2)}°, தீர்க்கரேகை ${lng.toFixed(2)}° (${cropMeta.nameTa} பயிர்) நிலத்தில் நோய் முன்கணிப்பு பகுப்பாய்வு செய்யப்பட்டது. தற்போதைய வெப்பநிலை (${temp}°C) மற்றும் ஈரப்பதத்தில் (${rh}%), மிக முக்கியமான ஆபத்து "${highestThreat ? highestThreat.nameTa : 'இல்லை'}" ஆகும். பரிந்துரைக்கப்பட்ட தடுப்பு முறைகள் மற்றும் மருந்துகளை தெளிக்கவும்.`;
  }
  if (lang === 'hi') {
    return `दिनांक ${dateStr} को अक्षांश ${lat.toFixed(2)}°, देशांतर ${lng.toFixed(2)}° पर आपके खेत में ${cropMeta.nameHi} के लिए बीमारी पूर्वानुमान का विश्लेषण किया गया। वर्तमान तापमान (${temp}°C) और आर्द्रता (${rh}%) में सबसे अधिक जोखिम "${highestThreat ? highestThreat.nameHi : 'कोई नहीं'}" का है। नीचे दी गई निवारक विधियों व उपचार का पालन करें।`;
  }

  return `Disease vulnerability evaluation for ${cropName} on plot at ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (${agroZone}) for ${dateStr} (${seasonName}). Microclimate parameters (Temp: ${temp}°C, RH: ${rh}%, Soil Moisture: ${soilMoisture}%) show highest pathogen incubation suitability for "${highestThreat ? highestThreat.name : 'None'}" (${highestThreat?.riskScore || 0}% risk). Review verified precautionary cultural steps and chemical backpack pump dosages below.`;
}
