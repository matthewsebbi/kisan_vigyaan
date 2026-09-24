/**
 * KISAN VIGYAAN - Environmental Crop Disease Prediction Engine
 * 
 * Scalable, scientifically grounded multi-factor disease suitability model.
 * Evaluates crop, variety, growth stage, real-time microclimate sensors,
 * soil chemistry, leaf wetness duration, and persistence windows.
 * 
 * Citations & References:
 * - ICAR (Indian Council of Agricultural Research) Crop Protection Compendiums
 * - TNAU (Tamil Nadu Agricultural University) Agritech Portal Disease Forecast Models
 * - MPKV (Mahatma Phule Krishi Vidyapeeth), Rahuri Plant Pathology Research
 * - APS (American Phytopathological Society) Compendium of Plant Diseases
 * - CABI Plantwise Knowledge Bank Epidemiological Suitability Guides
 */

// 1. MASTER SCIENTIFIC DISEASE ENVIRONMENTAL SUITABILITY PROFILES
export const DISEASE_ENVIRONMENTAL_PROFILES = {
  // ==========================================
  // 🌾 COTTON (Gossypium hirsutum)
  // ==========================================
  'cotton_bacterial_blight': {
    id: 'cotton_bacterial_blight',
    crop: 'cotton',
    cropNameEn: 'Cotton',
    diseaseName: 'Bacterial Blight / Angular Leaf Spot',
    diseaseNameMr: 'कापूस जिवाणू करपा (अँगुलेटर लीफ स्पॉट)',
    diseaseNameTa: 'பருத்தி பாக்டீரியா கருகல் நோய்',
    pathogen: 'Xanthomonas citri pv. malvacearum',
    pathogenType: 'Bacterium',
    spreadVector: 'Rain splash, dew droplets, wind-driven moisture, seed-borne inoculum',
    
    // Environmental Threshold Ranges (Scientifically validated)
    temperature: {
      min: 20.0,
      optLow: 28.0,
      optHigh: 34.0,
      max: 40.0,
      unit: '°C',
      weight: 0.22,
      relevance: true
    },
    relativeHumidity: {
      min: 70.0,
      optLow: 82.0,
      optHigh: 95.0,
      max: 100.0,
      unit: '%',
      weight: 0.25,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 8.0,
      optHours: 14.0,
      unit: 'hours',
      weight: 0.20,
      relevance: true
    },
    soilMoisture: {
      minVWC: 35.0,
      optVWC: 65.0,
      maxVWC: 90.0,
      unit: '% VWC',
      weight: 0.10,
      relevance: true
    },
    rainfall: {
      minMm24h: 5.0,
      optMm24h: 25.0,
      weight: 0.13,
      relevance: true
    },
    soilPH: {
      relevance: false, // Insufficient validated evidence as direct pathogen driver
      explanation: 'Soil pH has negligible direct correlation with foliar bacterial blight infection.'
    },
    soilEC: {
      relevance: false,
      explanation: 'EC does not directly drive foliar Xanthomonas colonization.'
    },

    // Temporal Persistence
    persistence: {
      requiredHoursFavorable: 12.0,
      weight: 0.10
    },

    // Crop Growth Stage Susceptibility (0.0 to 1.0)
    stageSusceptibility: {
      seedling: 0.70,       // Seedling blight
      vegetative: 0.85,     // Angular leaf spot
      flowering: 0.95,      // Square / bud rot & Blackarm
      boll_formation: 1.00, // Maximum vulnerability (Boll rot)
      maturity: 0.50
    },

    // Baseline Parameter Weights for this disease (Normalized internally)
    weights: {
      temperature: 0.22,
      relativeHumidity: 0.25,
      leafWetness: 0.20,
      rainfall: 0.13,
      soilMoisture: 0.10,
      persistence: 0.10
    },

    scientificReferences: [
      { source: 'ICAR-CICR Nagpur', title: 'Technical Bulletin No. 42: Integrated Management of Bacterial Blight in Bt Cotton' },
      { source: 'TNAU Agritech', title: 'Crop Protection: Cotton Diseases and Epidemic Forecast Criteria' },
      { source: 'APSnet', title: 'Compendium of Cotton Diseases, 2nd Edition (Xanthomonas malvacearum epidemiology)' }
    ]
  },

  'cotton_grey_mildew': {
    id: 'cotton_grey_mildew',
    crop: 'cotton',
    cropNameEn: 'Cotton',
    diseaseName: 'Grey Mildew / Dahiya Disease',
    diseaseNameMr: 'कापूस दहिया रोग (ग्रे मिल्ड्यू)',
    diseaseNameTa: 'பருத்தி சாம்பல் கருகல் நோய்',
    pathogen: 'Ramularia areola (Teleomorph: Mycosphaerella areola)',
    pathogenType: 'Fungus',
    spreadVector: 'Wind-borne conidia under cool nights and humid mornings',

    temperature: {
      min: 16.0,
      optLow: 22.0,
      optHigh: 28.0,
      max: 33.0,
      unit: '°C',
      weight: 0.25,
      relevance: true
    },
    relativeHumidity: {
      min: 75.0,
      optLow: 85.0,
      optHigh: 98.0,
      max: 100.0,
      unit: '%',
      weight: 0.30,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 6.0,
      optHours: 12.0,
      unit: 'hours',
      weight: 0.25,
      relevance: true
    },
    soilMoisture: {
      relevance: false,
      explanation: 'Airborne fungal conidia; soil moisture has minimal direct bearing on Ramularia germination.'
    },
    rainfall: {
      minMm24h: 2.0,
      optMm24h: 15.0,
      weight: 0.10,
      relevance: true
    },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 18.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.20,
      vegetative: 0.60,
      flowering: 0.85,
      boll_formation: 1.00, // Severe defoliation during peak boll filling
      maturity: 0.70
    },

    weights: {
      temperature: 0.25,
      relativeHumidity: 0.30,
      leafWetness: 0.25,
      rainfall: 0.10,
      persistence: 0.10
    },

    scientificReferences: [
      { source: 'MPKV Rahuri Research Journal', title: 'Epidemiology of Ramularia areola in Kharif Cotton' },
      { source: 'ICAR-CICR', title: 'Management of Fungal Foliar Spots in Cotton' }
    ]
  },

  // ==========================================
  // 🍅 TOMATO (Solanum lycopersicum)
  // ==========================================
  'tomato_early_blight': {
    id: 'tomato_early_blight',
    crop: 'tomato',
    cropNameEn: 'Tomato',
    diseaseName: 'Early Blight (Target Spot)',
    diseaseNameMr: 'टोमॅटो अल्टरनेरिया करपा (टार्गेट स्पॉट)',
    diseaseNameTa: 'தக்காளி முன் கருகல் நோய்',
    pathogen: 'Alternaria solani',
    pathogenType: 'Fungus',
    spreadVector: 'Airborne and splashing conidia from crop debris and solanaceous weeds',

    temperature: {
      min: 14.0,
      optLow: 24.0,
      optHigh: 29.0,
      max: 35.0,
      unit: '°C',
      weight: 0.24,
      relevance: true
    },
    relativeHumidity: {
      min: 72.0,
      optLow: 85.0,
      optHigh: 96.0,
      max: 100.0,
      unit: '%',
      weight: 0.26,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 5.0,
      optHours: 10.0,
      unit: 'hours',
      weight: 0.22,
      relevance: true
    },
    soilMoisture: {
      minVWC: 40.0,
      optVWC: 70.0,
      maxVWC: 95.0,
      unit: '% VWC',
      weight: 0.10,
      relevance: true
    },
    rainfall: {
      minMm24h: 3.0,
      optMm24h: 20.0,
      weight: 0.08,
      relevance: true
    },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 10.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.40,
      vegetative: 0.65,
      flowering: 0.85,
      boll_formation: 1.00, // Fruiting / ripening stage most susceptible to concentric rot
      maturity: 0.90
    },

    weights: {
      temperature: 0.24,
      relativeHumidity: 0.26,
      leafWetness: 0.22,
      soilMoisture: 0.10,
      rainfall: 0.08,
      persistence: 0.10
    },

    scientificReferences: [
      { source: 'ICAR-IIHR Bengaluru', title: 'Diagnostic Guide and Forecast Model for Alternaria in Solanaceous Crops' },
      { source: 'APSnet', title: 'Compendium of Tomato Diseases and Pests (Alternaria solani thermal response curve)' }
    ]
  },

  'tomato_late_blight': {
    id: 'tomato_late_blight',
    crop: 'tomato',
    cropNameEn: 'Tomato',
    diseaseName: 'Late Blight (Irish Blight)',
    diseaseNameMr: 'टोमॅटो लेट ब्लाइट (तांबेरा करपा)',
    diseaseNameTa: 'தக்காளி பின் கருகல் நோய்',
    pathogen: 'Phytophthora infestans',
    pathogenType: 'Oomycete',
    spreadVector: 'Wind-borne sporangia; catastrophic rapid spread under cool wet spells',

    temperature: {
      min: 10.0,
      optLow: 16.0,
      optHigh: 22.0,
      max: 27.0,
      unit: '°C',
      weight: 0.28,
      relevance: true
    },
    relativeHumidity: {
      min: 85.0,
      optLow: 92.0,
      optHigh: 100.0,
      max: 100.0,
      unit: '%',
      weight: 0.32,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 7.0,
      optHours: 15.0,
      unit: 'hours',
      weight: 0.25,
      relevance: true
    },
    soilMoisture: {
      minVWC: 60.0,
      optVWC: 85.0,
      maxVWC: 100.0,
      unit: '% VWC',
      weight: 0.05,
      relevance: true
    },
    rainfall: {
      minMm24h: 10.0,
      optMm24h: 40.0,
      weight: 0.10,
      relevance: true
    },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 14.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.80,
      vegetative: 0.90,
      flowering: 1.00,
      boll_formation: 1.00,
      maturity: 0.85
    },

    weights: {
      temperature: 0.28,
      relativeHumidity: 0.32,
      leafWetness: 0.25,
      rainfall: 0.10,
      soilMoisture: 0.05
    },

    scientificReferences: [
      { source: 'CABI Plantwise', title: 'Pest Management Decision Guide: Phytophthora infestans on Tomato' },
      { source: 'Cornell Vegetable Program', title: 'Late Blight Decision Support System (DSS) Validation' }
    ]
  },

  'tomato_bacterial_wilt': {
    id: 'tomato_bacterial_wilt',
    crop: 'tomato',
    cropNameEn: 'Tomato',
    diseaseName: 'Bacterial Wilt / Vascular Collapse',
    diseaseNameMr: 'टोमॅटो जिवाणूजन्य मर रोग (वास्क्युलर कोलमडणे)',
    diseaseNameTa: 'தக்காளி பாக்டீரியா வாடல் நோய்',
    pathogen: 'Ralstonia solanacearum (formerly Pseudomonas)',
    pathogenType: 'Soil-borne Bacterium',
    spreadVector: 'Contaminated irrigation water, soil root wounds, nematodes',

    temperature: {
      min: 24.0,
      optLow: 30.0,
      optHigh: 36.0,
      max: 42.0,
      unit: '°C',
      weight: 0.22,
      relevance: true
    },
    relativeHumidity: {
      min: 65.0,
      optLow: 80.0,
      optHigh: 95.0,
      max: 100.0,
      unit: '%',
      weight: 0.10,
      relevance: true
    },
    soilMoisture: {
      minVWC: 65.0,
      optVWC: 85.0,
      maxVWC: 100.0, // Waterlogged, anaerobic root zone triggers rapid vascular plugging
      unit: '% VWC',
      weight: 0.30,
      relevance: true
    },
    leafWetness: {
      relevance: false,
      explanation: 'Soil-borne vascular pathogen infecting roots; foliar leaf wetness is not an epidemiological driver.'
    },
    soilPH: {
      relevance: true,
      min: 5.0,
      optLow: 5.5,
      optHigh: 6.8,
      max: 8.2,
      weight: 0.18,
      explanation: 'Acidic to slightly acidic soils (pH 5.5 - 6.5) significantly accelerate Ralstonia root infection.'
    },
    soilEC: {
      relevance: true,
      min: 0.8,
      optLow: 1.5,
      optHigh: 3.5,
      max: 5.0,
      weight: 0.10,
      explanation: 'Elevated salinity causes micro-fissures in root epidermis, facilitating bacterial entry.'
    },
    rainfall: {
      minMm24h: 15.0,
      optMm24h: 50.0,
      weight: 0.10,
      relevance: true
    },

    persistence: {
      requiredHoursFavorable: 24.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.60,
      vegetative: 0.80,
      flowering: 1.00,      // Maximum vascular water demand during flowering causes rapid midday wilting
      boll_formation: 0.95,
      maturity: 0.70
    },

    weights: {
      soilMoisture: 0.30,
      temperature: 0.22,
      soilPH: 0.18,
      soilEC: 0.10,
      rainfall: 0.10,
      relativeHumidity: 0.10
    },

    scientificReferences: [
      { source: 'ICAR-IIHR', title: 'Bacterial Wilt Management in Solanaceous Vegetables (Ralstonia Soil Factors)' },
      { source: 'AVRDC World Vegetable Center', title: 'Technical Bulletin 38: Ralstonia solanacearum Ecology & pH interactions' }
    ]
  },

  // ==========================================
  // 🍇 GRAPES (Vitis vinifera)
  // ==========================================
  'grapes_downy_mildew': {
    id: 'grapes_downy_mildew',
    crop: 'grapes',
    cropNameEn: 'Grapes',
    diseaseName: 'Downy Mildew (Kevada)',
    diseaseNameMr: 'द्राक्ष डाऊनी मिल्ड्यू (केवडा रोग)',
    diseaseNameTa: 'திராட்சை அடிச்சாம்பல் நோய்',
    pathogen: 'Plasmopara viticola',
    pathogenType: 'Oomycete',
    spreadVector: 'Swimming flagellated zoospores in free water droplets (3-2-1 Rule: 10cm shoots, 10mm rain, 10°C min temp)',

    temperature: {
      min: 12.0,
      optLow: 20.0,
      optHigh: 26.0,
      max: 32.0,
      unit: '°C',
      weight: 0.25,
      relevance: true
    },
    relativeHumidity: {
      min: 80.0,
      optLow: 90.0,
      optHigh: 99.0,
      max: 100.0,
      unit: '%',
      weight: 0.28,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 4.0,
      optHours: 9.0,
      unit: 'hours',
      weight: 0.30,
      relevance: true
    },
    rainfall: {
      minMm24h: 5.0,
      optMm24h: 25.0,
      weight: 0.12,
      relevance: true
    },
    soilMoisture: {
      minVWC: 40.0,
      optVWC: 70.0,
      maxVWC: 95.0,
      weight: 0.05,
      relevance: true
    },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 8.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.30,
      vegetative: 0.75,     // Shoot emergence 10-15cm
      flowering: 1.00,      // Pre-bloom and cap fall (Rachis blight disaster window)
      boll_formation: 0.95, // Berry pea-stage
      maturity: 0.40        // Berries gain natural resistance after veraison (sugar >8° Brix)
    },

    weights: {
      leafWetness: 0.30,
      relativeHumidity: 0.28,
      temperature: 0.25,
      rainfall: 0.12,
      soilMoisture: 0.05
    },

    scientificReferences: [
      { source: 'ICAR-NRC Grapes Pune', title: 'Downy Mildew Weather-Based Forewarning Model for Maharashtra Vineyards' },
      { source: 'UC Davis IPM', title: 'Grape Disease Index: Plasmopara viticola Infection Rules' }
    ]
  },

  'grapes_powdery_mildew': {
    id: 'grapes_powdery_mildew',
    crop: 'grapes',
    cropNameEn: 'Grapes',
    diseaseName: 'Powdery Mildew (Bhuri)',
    diseaseNameMr: 'द्राक्ष भुरी रोग (पावडरी मिल्ड्यू)',
    diseaseNameTa: 'திராட்சை சாம்பல் நோய்',
    pathogen: 'Uncinula necator (Erysiphe necator)',
    pathogenType: 'Fungus (Obligate Ectoparasite)',
    spreadVector: 'Dry airborne conidia favored by shady humid canopies without free water washing',

    temperature: {
      min: 15.0,
      optLow: 22.0,
      optHigh: 29.0,
      max: 36.0,
      unit: '°C',
      weight: 0.35,
      relevance: true
    },
    relativeHumidity: {
      min: 45.0,
      optLow: 65.0,
      optHigh: 85.0,
      max: 95.0,
      unit: '%',
      weight: 0.35,
      relevance: true
    },
    leafWetness: {
      relevance: true,
      thresholdHours: 0.0,
      optHours: 2.0,
      unit: 'hours',
      weight: 0.10,
      explanation: 'Unlike Downy Mildew, Powdery Mildew conidia are killed by prolonged heavy rain immersion; thrives in moderate humidity with cloudy shade.'
    },
    rainfall: {
      relevance: false,
      explanation: 'Heavy rainfall physically dislodges and lyses Uncinula conidia.'
    },
    soilMoisture: { relevance: false },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 16.0,
      weight: 0.15
    },

    stageSusceptibility: {
      seedling: 0.20,
      vegetative: 0.70,
      flowering: 1.00,
      boll_formation: 0.95, // Berry cracking & mummification
      maturity: 0.50
    },

    weights: {
      temperature: 0.35,
      relativeHumidity: 0.35,
      persistence: 0.15,
      leafWetness: 0.15
    },

    scientificReferences: [
      { source: 'ICAR-NRC Grapes', title: 'Erysiphe necator Epidemiological Validation in Sangli & Nashik' },
      { source: 'Gubler-Thomas Model', title: 'Powdery Mildew Risk Assessment Index in Viticulture' }
    ]
  },

  // ==========================================
  // 🎋 SUGARCANE (Saccharum officinarum)
  // ==========================================
  'sugarcane_red_rot': {
    id: 'sugarcane_red_rot',
    crop: 'sugarcane',
    cropNameEn: 'Sugarcane',
    diseaseName: 'Red Rot of Sugarcane',
    diseaseNameMr: 'उसाचा तांबेरा / लाल कुजव्या (रेड रॉट)',
    diseaseNameTa: 'கரும்பு செவ்வழுகல் நோய்',
    pathogen: 'Colletotrichum falcatum (Glomerella tucumanensis)',
    pathogenType: 'Fungus',
    spreadVector: 'Infected setts, irrigation runoff, stalk borer boreholes, high water table',

    temperature: {
      min: 22.0,
      optLow: 28.0,
      optHigh: 34.0,
      max: 39.0,
      unit: '°C',
      weight: 0.22,
      relevance: true
    },
    relativeHumidity: {
      min: 75.0,
      optLow: 86.0,
      optHigh: 98.0,
      max: 100.0,
      unit: '%',
      weight: 0.22,
      relevance: true
    },
    soilMoisture: {
      minVWC: 60.0,
      optVWC: 85.0,
      maxVWC: 100.0, // Waterlogging and poorly drained black soils favor rapid sett rot
      unit: '% VWC',
      weight: 0.28,
      relevance: true
    },
    rainfall: {
      minMm24h: 15.0,
      optMm24h: 45.0,
      weight: 0.18,
      relevance: true
    },
    leafWetness: {
      relevance: false,
      explanation: 'Internal vascular sett and stalk pathogen; foliar leaf wetness is secondary.'
    },
    soilPH: {
      relevance: true,
      min: 6.5,
      optLow: 7.5,
      optHigh: 8.5,
      max: 9.0,
      weight: 0.10,
      explanation: 'Alkaline and waterlogged soils in the Krishna basin exacerbate root stress and sett rot.'
    },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 24.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.90,       // Germination sett rot failure
      vegetative: 0.60,
      flowering: 0.85,      // Cane elongation & maturity
      boll_formation: 1.00, // Grand growth & sucrose synthesis stage
      maturity: 0.95
    },

    weights: {
      soilMoisture: 0.28,
      temperature: 0.22,
      relativeHumidity: 0.22,
      rainfall: 0.18,
      soilPH: 0.10
    },

    scientificReferences: [
      { source: 'ICAR-SBI Coimbatore', title: 'Sugarcane Pathology Manual: Colletotrichum falcatum epidemiology' },
      { source: 'Vasantdada Sugar Institute (VSI) Pune', title: 'Survey and Forecast of Red Rot in Maharashtra' }
    ]
  },

  // ==========================================
  // 🍚 RICE / PADDY (Oryza sativa)
  // ==========================================
  'rice_blast': {
    id: 'rice_blast',
    crop: 'rice',
    cropNameEn: 'Rice / Paddy',
    diseaseName: 'Paddy Blast (Leaf & Neck Blast)',
    diseaseNameMr: 'भाताचा कडा करपा व मानमोडी (ब्लास्ट)',
    diseaseNameTa: 'நெல் குலை நோய்',
    pathogen: 'Magnaporthe oryzae (Pyricularia oryzae)',
    pathogenType: 'Fungus',
    spreadVector: 'Airborne conidia released during night cooling with heavy dew deposit',

    temperature: {
      min: 17.0,
      optLow: 22.0,
      optHigh: 27.0,
      max: 33.0,
      unit: '°C',
      weight: 0.25,
      relevance: true
    },
    relativeHumidity: {
      min: 82.0,
      optLow: 90.0,
      optHigh: 99.0,
      max: 100.0,
      unit: '%',
      weight: 0.30,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 8.0,
      optHours: 14.0,
      unit: 'hours',
      weight: 0.25,
      relevance: true
    },
    rainfall: {
      minMm24h: 5.0,
      optMm24h: 30.0,
      weight: 0.10,
      relevance: true
    },
    soilMoisture: {
      minVWC: 60.0,
      optVWC: 90.0,
      maxVWC: 100.0,
      unit: '% VWC',
      weight: 0.10,
      relevance: true
    },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 12.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.80,       // Nursery blast
      vegetative: 0.85,     // Tillering leaf blast
      flowering: 1.00,      // Panicle emergence & Neck Blast (Whitehead collapse)
      boll_formation: 0.90, // Grain filling
      maturity: 0.40
    },

    weights: {
      relativeHumidity: 0.30,
      temperature: 0.25,
      leafWetness: 0.25,
      rainfall: 0.10,
      soilMoisture: 0.10
    },

    scientificReferences: [
      { source: 'ICAR-NRRI Cuttack', title: 'Rice Blast Forecasting System (BLASTSIM Protocol)' },
      { source: 'IRRI (International Rice Research Institute)', title: 'Epidemiology of Magnaporthe oryzae in South Asia' }
    ]
  },

  'rice_bacterial_leaf_blight': {
    id: 'rice_bacterial_leaf_blight',
    crop: 'rice',
    cropNameEn: 'Rice / Paddy',
    diseaseName: 'Bacterial Leaf Blight (BLB / Kresek)',
    diseaseNameMr: 'भाताचा जिवाणूजन्य पान करपा (बीएलबी)',
    diseaseNameTa: 'நெல் பாக்டீரியா இலை கருகல் நோய்',
    pathogen: 'Xanthomonas oryzae pv. oryzae',
    pathogenType: 'Bacterium',
    spreadVector: 'Irrigation water, rainstorms, typhoons causing leaf friction abrasions',

    temperature: {
      min: 22.0,
      optLow: 28.0,
      optHigh: 34.0,
      max: 39.0,
      unit: '°C',
      weight: 0.24,
      relevance: true
    },
    relativeHumidity: {
      min: 75.0,
      optLow: 88.0,
      optHigh: 98.0,
      max: 100.0,
      unit: '%',
      weight: 0.26,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 6.0,
      optHours: 12.0,
      unit: 'hours',
      weight: 0.20,
      relevance: true
    },
    rainfall: {
      minMm24h: 15.0,
      optMm24h: 50.0,
      weight: 0.18,
      relevance: true
    },
    soilMoisture: {
      minVWC: 70.0,
      optVWC: 95.0,
      maxVWC: 100.0,
      unit: '% VWC',
      weight: 0.12,
      relevance: true
    },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 16.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.70,       // Kresek systemic wilting
      vegetative: 0.85,     // Maximum tillering
      flowering: 0.95,      // Booting to flowering
      boll_formation: 0.70,
      maturity: 0.30
    },

    weights: {
      relativeHumidity: 0.26,
      temperature: 0.24,
      leafWetness: 0.20,
      rainfall: 0.18,
      soilMoisture: 0.12
    },

    scientificReferences: [
      { source: 'ICAR-IIRR Hyderabad', title: 'Standard Operating Procedures for BLB Warning and Management' },
      { source: 'TNAU', title: 'Rice Bacterial Blight Environmental Indices' }
    ]
  },

  // ==========================================
  // 🌱 SOYBEAN (Glycine max)
  // ==========================================
  'soybean_rust': {
    id: 'soybean_rust',
    crop: 'soybean',
    cropNameEn: 'Soybean',
    diseaseName: 'Asian Soybean Rust',
    diseaseNameMr: 'सोयाबीन तांबेरा रोग (रस्ट)',
    diseaseNameTa: 'சோயாபீன் துரு நோய்',
    pathogen: 'Phakopsora pachyrhizi',
    pathogenType: 'Fungus',
    spreadVector: 'Wind-borne urediniospores across regional corridors with continuous cloudiness',

    temperature: {
      min: 15.0,
      optLow: 20.0,
      optHigh: 27.0,
      max: 32.0,
      unit: '°C',
      weight: 0.26,
      relevance: true
    },
    relativeHumidity: {
      min: 80.0,
      optLow: 90.0,
      optHigh: 99.0,
      max: 100.0,
      unit: '%',
      weight: 0.28,
      relevance: true
    },
    leafWetness: {
      thresholdHours: 6.0,
      optHours: 12.0,
      unit: 'hours',
      weight: 0.30,
      relevance: true
    },
    rainfall: {
      minMm24h: 5.0,
      optMm24h: 25.0,
      weight: 0.16,
      relevance: true
    },
    soilMoisture: { relevance: false },
    soilPH: { relevance: false },
    soilEC: { relevance: false },

    persistence: {
      requiredHoursFavorable: 14.0,
      weight: 0.10
    },

    stageSusceptibility: {
      seedling: 0.30,
      vegetative: 0.60,
      flowering: 0.90,      // Pod initiation (R3) to seed fill (R5) is catastrophic damage window
      boll_formation: 1.00,
      maturity: 0.75
    },

    weights: {
      leafWetness: 0.30,
      relativeHumidity: 0.28,
      temperature: 0.26,
      rainfall: 0.16
    },

    scientificReferences: [
      { source: 'ICAR-IISR Indore', title: 'Asian Soybean Rust Early Warning Systems in Central & Western India' },
      { source: 'USDA-ARS', title: 'Epidemiological Parameters for Phakopsora pachyrhizi Spore Viability' }
    ]
  }
};


// 2. MATHEMATICAL & BIOLOGICAL SUITABILITY EVALUATION FUNCTIONS

/**
 * Calculates Temperature Suitability Score S_T in [0, 1] using cardinal temperatures.
 * Uses a smooth asymmetrical thermal response curve.
 */
export function calculateTemperatureSuitability(temp, profile) {
  if (!profile.temperature || !profile.temperature.relevance) return null;
  const { min, optLow, optHigh, max } = profile.temperature;

  if (temp < min || temp > max) {
    return 0.0;
  }

  // Inside optimum zone
  if (temp >= optLow && temp <= optHigh) {
    return 1.0;
  }

  // Ascending phase (min to optLow)
  if (temp < optLow) {
    const ratio = (temp - min) / (optLow - min);
    return Math.max(0, Math.min(1, Math.pow(ratio, 1.3)));
  }

  // Descending phase (optHigh to max)
  const ratio = (max - temp) / (max - optHigh);
  return Math.max(0, Math.min(1, Math.pow(ratio, 1.3)));
}

/**
 * Calculates Relative Humidity Suitability Score S_RH in [0, 1].
 */
export function calculateRHSuitability(rh, profile) {
  if (!profile.relativeHumidity || !profile.relativeHumidity.relevance) return null;
  const { min, optLow, optHigh, max } = profile.relativeHumidity;

  if (rh < min) {
    // Linear decay below minimum threshold
    return Math.max(0, (rh - (min - 15)) / 15 * 0.2);
  }

  if (rh >= optLow && rh <= optHigh) {
    return 1.0;
  }

  if (rh < optLow) {
    return 0.2 + 0.8 * ((rh - min) / (optLow - min));
  }

  // Above optHigh up to max
  return 1.0;
}

/**
 * Calculates Leaf Wetness Suitability Score S_LW in [0, 1].
 */
export function calculateLeafWetnessSuitability(hoursWet, profile) {
  if (!profile.leafWetness || !profile.leafWetness.relevance) return null;
  const { thresholdHours, optHours } = profile.leafWetness;

  if (hoursWet <= 0) return 0.05;
  if (hoursWet >= optHours) return 1.0;
  if (hoursWet < thresholdHours) {
    return 0.1 + (hoursWet / thresholdHours) * 0.4;
  }

  // Between threshold and optimum
  return 0.5 + 0.5 * ((hoursWet - thresholdHours) / (optHours - thresholdHours));
}

/**
 * Calculates Soil Moisture Suitability Score S_SM in [0, 1].
 */
export function calculateSoilMoistureSuitability(vwc, profile) {
  if (!profile.soilMoisture || !profile.soilMoisture.relevance) return null;
  const { minVWC, optVWC, maxVWC } = profile.soilMoisture;

  if (vwc < minVWC) {
    return Math.max(0, (vwc / minVWC) * 0.3);
  }

  if (vwc >= optVWC && vwc <= maxVWC) {
    return 1.0;
  }

  if (vwc < optVWC) {
    return 0.3 + 0.7 * ((vwc - minVWC) / (optVWC - minVWC));
  }

  // Above maxVWC (anaerobic waterlogging)
  return 0.85;
}

/**
 * Calculates Soil pH Stress & Pathogen Suitability Score S_pH in [0, 1].
 */
export function calculateSoilPHSuitability(pH, profile) {
  if (!profile.soilPH || !profile.soilPH.relevance) return null;
  const { min, optLow, optHigh, max } = profile.soilPH;

  if (pH < min || pH > max) return 0.1;
  if (pH >= optLow && pH <= optHigh) return 1.0;

  if (pH < optLow) {
    return 0.2 + 0.8 * ((pH - min) / (optLow - min));
  }

  return 0.2 + 0.8 * ((max - pH) / (max - optHigh));
}

/**
 * Calculates Soil EC / Salinity Stress Score S_EC in [0, 1].
 */
export function calculateSoilECSuitability(ec, profile) {
  if (!profile.soilEC || !profile.soilEC.relevance) return null;
  const { min, optLow, optHigh, max } = profile.soilEC;

  if (ec < min) return 0.2;
  if (ec >= optLow && ec <= optHigh) return 1.0;
  if (ec < optLow) {
    return 0.2 + 0.8 * ((ec - min) / (optLow - min));
  }
  return 0.7; // High salinity stress continues to favor opportunistic pathogens
}

/**
 * Calculates Rainfall / Splash Suitability Score S_Rain in [0, 1].
 */
export function calculateRainfallSuitability(rain24h, profile) {
  if (!profile.rainfall || !profile.rainfall.relevance) return null;
  const { minMm24h, optMm24h } = profile.rainfall;

  if (rain24h <= 0) return 0.1;
  if (rain24h >= optMm24h) return 1.0;
  if (rain24h < minMm24h) {
    return 0.2 + (rain24h / minMm24h) * 0.4;
  }
  return 0.6 + 0.4 * ((rain24h - minMm24h) / (optMm24h - minMm24h));
}

/**
 * Calculates Temporal Persistence Factor P_time in [0.3, 1.0].
 * Sustained favorable microclimate over required hours escalates risk.
 */
export function calculatePersistenceFactor(hoursFavorable, profile) {
  const reqHours = profile.persistence?.requiredHoursFavorable || 12.0;
  if (!hoursFavorable || hoursFavorable <= 0) return 0.35;
  
  if (hoursFavorable >= reqHours) {
    const excess = Math.min(2.0, hoursFavorable / reqHours);
    return Math.min(1.0, 0.75 + (excess - 1.0) * 0.25);
  }

  return Math.max(0.35, (hoursFavorable / reqHours) * 0.75);
}

/**
 * Main Evaluation Pipeline for a single Disease Profile against Telemetry Inputs
 * 
 * @param {string} diseaseId - ID from DISEASE_ENVIRONMENTAL_PROFILES
 * @param {Object} inputs - Sensor & Plot Telemetry { temp, rh, leafWetnessHours, soilVWC, soilPH, soilEC, rain24h, growthStage, hoursFavorable, historicalPressure, hasImageSymptom }
 * @returns {Object} Comprehensive evaluation result with score, riskLevel, factorBreakdown, explainability, IPM actions
 */
export function evaluateDiseaseRisk(diseaseId, inputs = {}) {
  const profile = DISEASE_ENVIRONMENTAL_PROFILES[diseaseId];
  if (!profile) {
    return { error: `Disease profile not found for ID: ${diseaseId}` };
  }

  // 1. Sanitize & Default inputs
  const temp = typeof inputs.temp === 'number' ? inputs.temp : 28.0;
  const rh = typeof inputs.rh === 'number' ? inputs.rh : 82.0;
  const leafWetness = typeof inputs.leafWetnessHours === 'number' ? inputs.leafWetnessHours : 8.0;
  const soilVWC = typeof inputs.soilVWC === 'number' ? inputs.soilVWC : 55.0;
  const soilPH = typeof inputs.soilPH === 'number' ? inputs.soilPH : 7.2;
  const soilEC = typeof inputs.soilEC === 'number' ? inputs.soilEC : 0.45;
  const rain24h = typeof inputs.rain24h === 'number' ? inputs.rain24h : 10.0;
  const growthStage = inputs.growthStage || 'flowering';
  const hoursFavorable = typeof inputs.hoursFavorable === 'number' ? inputs.hoursFavorable : 14.0;
  const historicalPressure = typeof inputs.historicalPressure === 'number' ? inputs.historicalPressure : 0.5; // 0.0 to 1.0
  const hasImageSymptom = Boolean(inputs.hasImageSymptom);

  // 2. Calculate Individual Biological Suitability Scores
  const sTemp = calculateTemperatureSuitability(temp, profile);
  const sRH = calculateRHSuitability(rh, profile);
  const sLW = calculateLeafWetnessSuitability(leafWetness, profile);
  const sSM = calculateSoilMoistureSuitability(soilVWC, profile);
  const sPH = calculateSoilPHSuitability(soilPH, profile);
  const sEC = calculateSoilECSuitability(soilEC, profile);
  const sRain = calculateRainfallSuitability(rain24h, profile);

  // Stage Susceptibility
  const stageSusceptibility = profile.stageSusceptibility[growthStage] ?? 0.70;

  // Persistence Factor
  const persistenceFactor = calculatePersistenceFactor(hoursFavorable, profile);

  // 3. Dynamic Normalized Weighted Aggregation
  let totalWeight = 0;
  let weightedSum = 0;

  const weights = profile.weights || {};

  if (sTemp !== null && weights.temperature) {
    weightedSum += sTemp * weights.temperature;
    totalWeight += weights.temperature;
  }
  if (sRH !== null && weights.relativeHumidity) {
    weightedSum += sRH * weights.relativeHumidity;
    totalWeight += weights.relativeHumidity;
  }
  if (sLW !== null && weights.leafWetness) {
    weightedSum += sLW * weights.leafWetness;
    totalWeight += weights.leafWetness;
  }
  if (sSM !== null && weights.soilMoisture) {
    weightedSum += sSM * weights.soilMoisture;
    totalWeight += weights.soilMoisture;
  }
  if (sRain !== null && weights.rainfall) {
    weightedSum += sRain * weights.rainfall;
    totalWeight += weights.rainfall;
  }
  if (sPH !== null && weights.soilPH) {
    weightedSum += sPH * weights.soilPH;
    totalWeight += weights.soilPH;
  }
  if (sEC !== null && weights.soilEC) {
    weightedSum += sEC * weights.soilEC;
    totalWeight += weights.soilEC;
  }

  // Base environmental suitability in [0, 1]
  const rawEnvSuitability = totalWeight > 0 ? (weightedSum / totalWeight) : 0.5;

  // 4. Incorporate Stage Susceptibility, Temporal Persistence, and Historical Inoculum
  // Disease Risk Formula:
  // Risk = (0.55 * EnvSuitability * Persistence) + (0.25 * StageSusceptibility) + (0.20 * HistoricalPressure)
  let compositeScore = (0.55 * rawEnvSuitability * persistenceFactor) + 
                       (0.25 * stageSusceptibility * rawEnvSuitability) + 
                       (0.20 * historicalPressure * (rawEnvSuitability > 0.4 ? 1.0 : 0.3));

  // Scale to percentage 0 to 100
  let finalRiskScore = Math.max(5, Math.min(99, Math.round(compositeScore * 100)));

  // If image evidence is attached, create fused diagnostic alert
  if (hasImageSymptom) {
    finalRiskScore = Math.min(99, Math.round(finalRiskScore * 1.15 + 15));
  }

  // 5. Determine 4 Standardized Risk Levels
  let riskLevel = 'LOW';
  let riskLevelLabel = 'LOW RISK';
  let riskLevelColor = 'emerald';
  let riskLevelBg = 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';

  if (finalRiskScore >= 80) {
    riskLevel = 'VERY_HIGH';
    riskLevelLabel = 'VERY HIGH RISK';
    riskLevelColor = 'rose';
    riskLevelBg = 'bg-rose-100 text-rose-900 border-rose-400 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800';
  } else if (finalRiskScore >= 60) {
    riskLevel = 'HIGH';
    riskLevelLabel = 'HIGH RISK';
    riskLevelColor = 'orange';
    riskLevelBg = 'bg-orange-100 text-orange-900 border-orange-400 dark:bg-orange-950 dark:text-orange-200 dark:border-orange-800';
  } else if (finalRiskScore >= 30) {
    riskLevel = 'MODERATE';
    riskLevelLabel = 'MODERATE RISK';
    riskLevelColor = 'amber';
    riskLevelBg = 'bg-amber-100 text-amber-900 border-amber-400 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800';
  }

  // 6. Build Factor Explainability Breakdown
  const factorBreakdown = [];

  if (sTemp !== null) {
    factorBreakdown.push({
      factor: 'Temperature',
      symbol: '🌡️',
      value: `${temp}°C`,
      optimalRange: `${profile.temperature.optLow}°C – ${profile.temperature.optHigh}°C`,
      score: Math.round(sTemp * 100),
      status: sTemp >= 0.8 ? 'Highly Favorable' : sTemp >= 0.5 ? 'Moderately Favorable' : 'Unfavorable',
      isFavorable: sTemp >= 0.6,
      weightPct: Math.round((profile.weights?.temperature || 0.2) * 100)
    });
  }

  if (sRH !== null) {
    factorBreakdown.push({
      factor: 'Relative Humidity',
      symbol: '💧',
      value: `${rh}%`,
      optimalRange: `${profile.relativeHumidity.optLow}% – ${profile.relativeHumidity.optHigh}%`,
      score: Math.round(sRH * 100),
      status: sRH >= 0.8 ? 'Critically Favorable' : sRH >= 0.5 ? 'Moderately Favorable' : 'Unfavorable',
      isFavorable: sRH >= 0.6,
      weightPct: Math.round((profile.weights?.relativeHumidity || 0.25) * 100)
    });
  }

  if (sLW !== null) {
    factorBreakdown.push({
      factor: 'Leaf Wetness Duration',
      symbol: '🍃',
      value: `${leafWetness} hrs`,
      optimalRange: `≥ ${profile.leafWetness.thresholdHours} hrs (Opt: ${profile.leafWetness.optHours}h)`,
      score: Math.round(sLW * 100),
      status: sLW >= 0.8 ? 'Infection Threshold Exceeded' : sLW >= 0.5 ? 'Emerging Wetness' : 'Below Threshold',
      isFavorable: sLW >= 0.6,
      weightPct: Math.round((profile.weights?.leafWetness || 0.2) * 100)
    });
  }

  if (sSM !== null) {
    factorBreakdown.push({
      factor: 'Soil Moisture',
      symbol: '💦',
      value: `${soilVWC}% VWC`,
      optimalRange: `${profile.soilMoisture.optVWC}% – ${profile.soilMoisture.maxVWC}%`,
      score: Math.round(sSM * 100),
      status: sSM >= 0.8 ? 'Favorable / High Moisture' : sSM >= 0.5 ? 'Moderate Moisture' : 'Dry / Safe',
      isFavorable: sSM >= 0.6,
      weightPct: Math.round((profile.weights?.soilMoisture || 0.1) * 100)
    });
  }

  if (sRain !== null) {
    factorBreakdown.push({
      factor: '24h Rainfall Splash',
      symbol: '🌧️',
      value: `${rain24h} mm`,
      optimalRange: `≥ ${profile.rainfall.minMm24h} mm`,
      score: Math.round(sRain * 100),
      status: sRain >= 0.7 ? 'Spore Dispersal Active' : 'Low Splash Risk',
      isFavorable: sRain >= 0.6,
      weightPct: Math.round((profile.weights?.rainfall || 0.1) * 100)
    });
  }

  if (sPH !== null) {
    factorBreakdown.push({
      factor: 'Soil Reaction (pH)',
      symbol: '🧪',
      value: `pH ${soilPH}`,
      optimalRange: `pH ${profile.soilPH.optLow} – ${profile.soilPH.optHigh}`,
      score: Math.round(sPH * 100),
      status: sPH >= 0.7 ? 'Pathogen-Conducive pH' : 'Sub-optimal for Disease',
      isFavorable: sPH >= 0.6,
      weightPct: Math.round((profile.weights?.soilPH || 0.1) * 100)
    });
  }

  if (sEC !== null) {
    factorBreakdown.push({
      factor: 'Salinity / EC',
      symbol: '⚡',
      value: `${soilEC} dS/m`,
      optimalRange: `< ${profile.soilEC.optLow} dS/m`,
      score: Math.round(sEC * 100),
      status: sEC >= 0.7 ? 'Salinity Stress Inducing' : 'Normal Non-Saline',
      isFavorable: sEC >= 0.6,
      weightPct: Math.round((profile.weights?.soilEC || 0.1) * 100)
    });
  }

  // 7. Generate Natural Language Explainability Narrative
  const favorableFactors = factorBreakdown.filter(f => f.isFavorable);
  const unfavorableFactors = factorBreakdown.filter(f => !f.isFavorable);

  let explanationNarrative = '';
  if (riskLevel === 'VERY_HIGH' || riskLevel === 'HIGH') {
    explanationNarrative = `Environmental conditions are currently highly favorable for ${profile.diseaseName}. High relative humidity (${rh}%) combined with temperature (${temp}°C) and persistent leaf wetness (${leafWetness} hrs) provide optimal spore incubation conditions. Crop stage (${growthStage.replace('_', ' ')}) is in high susceptibility window.`;
  } else if (riskLevel === 'MODERATE') {
    explanationNarrative = `Moderate microclimate suitability detected for ${profile.diseaseName}. While ${favorableFactors.map(f => f.factor).join(' and ')} are favorable, ${unfavorableFactors.map(f => f.factor).join(' and ')} currently limit exponential epidemic spread.`;
  } else {
    explanationNarrative = `Environmental conditions are currently unfavorable for ${profile.diseaseName}. Current microclimate parameters remain outside the pathogen's primary germination envelope.`;
  }

  // Mandatory Early Warning Notice
  const warningNotice = hasImageSymptom 
    ? `Image evidence consistent with ${profile.diseaseName} detected along with high environmental suitability. Inspect and confirm.`
    : `Environmental conditions are favorable for ${profile.diseaseName}. This does not confirm that the disease is present. Inspect the crop for symptoms.`;

  // 8. Recommended Proactive Monitoring & IPM Action
  let recommendedAction = '';
  if (riskLevel === 'VERY_HIGH') {
    recommendedAction = `Daily field scouting required: Inspect lower leaf undersides and stem collars. Ensure field drainage to prevent water stagnation. Prepare preventive biocontrol (e.g. Trichoderma or Bacillus subtilis) or recommended protective sprays if initial lesions are sighted.`;
  } else if (riskLevel === 'HIGH') {
    recommendedAction = `Conduct targeted 48-hour scouting in low-lying and densely shaded rows. Avoid evening overhead irrigation to reduce leaf wetness hours.`;
  } else if (riskLevel === 'MODERATE') {
    recommendedAction = `Routine scouting every 3-4 days. Monitor weather forecasts for sudden rainfall or prolonged night dews.`;
  } else {
    recommendedAction = `Standard crop management. Maintain balanced N:P:K nutrition to bolster systemic crop immunity.`;
  }

  return {
    diseaseId,
    diseaseName: profile.diseaseName,
    diseaseNameMr: profile.diseaseNameMr,
    diseaseNameTa: profile.diseaseNameTa,
    crop: profile.crop,
    cropNameEn: profile.cropNameEn,
    pathogen: profile.pathogen,
    pathogenType: profile.pathogenType,
    spreadVector: profile.spreadVector,
    riskScore: finalRiskScore,
    riskLevel,
    riskLevelLabel,
    riskLevelColor,
    riskLevelBg,
    environmentalSuitabilityPct: Math.round(rawEnvSuitability * 100),
    persistenceHours: hoursFavorable,
    requiredPersistenceHours: profile.persistence?.requiredHoursFavorable || 12,
    growthStage,
    stageSusceptibilityPct: Math.round(stageSusceptibility * 100),
    factorBreakdown,
    favorableFactorsCount: favorableFactors.length,
    totalFactorsCount: factorBreakdown.length,
    explanationNarrative,
    warningNotice,
    recommendedAction,
    scientificReferences: profile.scientificReferences || [],
    timestamp: new Date().toISOString()
  };
}

/**
 * Evaluates all relevant diseases for a given crop and plot telemetry.
 * 
 * @param {string} cropKey - 'cotton' | 'tomato' | 'grapes' | 'sugarcane' | 'rice' | 'soybean'
 * @param {Object} telemetry - Sensor inputs
 * @returns {Array} List of evaluated disease risk reports sorted by risk score descending
 */
export function evaluatePlotAllDiseases(cropKey, telemetry = {}) {
  const cropDiseases = Object.keys(DISEASE_ENVIRONMENTAL_PROFILES).filter(
    k => DISEASE_ENVIRONMENTAL_PROFILES[k].crop === cropKey.toLowerCase()
  );

  const evaluations = cropDiseases.map(diseaseId => evaluateDiseaseRisk(diseaseId, telemetry));
  evaluations.sort((a, b) => b.riskScore - a.riskScore);
  return evaluations;
}

/**
 * Generates an explainable 24-Hour microclimate risk trajectory trend for a plot.
 * 
 * @param {string} diseaseId 
 * @param {Object} currentTelemetry 
 * @returns {Array} 24 hourly time points with microclimate values and computed risk score
 */
export function generate24HourRiskTrend(diseaseId, currentTelemetry = {}) {
  const trend = [];
  const baseTemp = currentTelemetry.temp || 28;
  const baseRH = currentTelemetry.rh || 82;
  const baseLW = currentTelemetry.leafWetnessHours || 8;

  const now = new Date();

  for (let i = 24; i >= 0; i -= 2) {
    const time = new Date(now.getTime() - i * 3600 * 1000);
    const hourLabel = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Simulate realistic diurnal microclimate oscillation
    const hourOfDay = time.getHours();
    const tempDelta = Math.sin((hourOfDay - 9) * Math.PI / 12) * 5.0; // Warmest at 3 PM, coolest at 6 AM
    const rhDelta = -Math.sin((hourOfDay - 9) * Math.PI / 12) * 18.0; // Highest RH at dawn

    const simTemp = Math.round((baseTemp + tempDelta) * 10) / 10;
    const simRH = Math.max(35, Math.min(99, Math.round(baseRH + rhDelta)));
    const simLW = hourOfDay >= 20 || hourOfDay <= 8 ? Math.min(14, baseLW + 2) : Math.max(1, baseLW - 4);
    const simHoursFavorable = Math.max(2, Math.round(currentTelemetry.hoursFavorable || 14) - Math.floor(i / 2));

    const evalResult = evaluateDiseaseRisk(diseaseId, {
      ...currentTelemetry,
      temp: simTemp,
      rh: simRH,
      leafWetnessHours: simLW,
      hoursFavorable: simHoursFavorable
    });

    trend.push({
      time: hourLabel,
      hoursAgo: i,
      riskScore: evalResult.riskScore,
      temperature: simTemp,
      relativeHumidity: simRH,
      leafWetness: simLW,
      riskLevel: evalResult.riskLevel
    });
  }

  return trend;
}

/**
 * Fuses Image Evidence with Environmental Suitability
 */
export function fuseImageAndEnvironmentalEvidence(imageDetection, environmentalRisk) {
  if (!imageDetection || !environmentalRisk) return null;

  const imgConfidence = imageDetection.confidence || 85;
  const envScore = environmentalRisk.riskScore || 50;

  // Synthesis logic
  let fusionVerdict = 'CONCURRENT_HIGH_ALERT';
  let synthesizedHeadline = '';
  let actionProtocol = '';

  if (envScore >= 70 && imgConfidence >= 75) {
    fusionVerdict = 'CRITICAL_CONFIRMED_EPIDEMIC_RISK';
    synthesizedHeadline = `High Concern: Visual symptoms of ${environmentalRisk.diseaseName} match current highly favorable microclimate suitability.`;
    actionProtocol = 'Immediate field quarantine of affected row, confirm with KVK extension officer, and execute localized IPM bio-fungicide protocol.';
  } else if (imgConfidence >= 75 && envScore < 40) {
    fusionVerdict = 'SYMPTOM_PRESENT_ENVIRONMENT_UNFAVORABLE';
    synthesizedHeadline = `Symptom Detected under Low Environmental Risk: Lesions observed may be past damage or abiotic stress (nutrient deficiency/sunscald).`;
    actionProtocol = 'Inspect whether lesions are active or dried old scars. Secondary spread is currently inhibited by dry microclimate.';
  } else if (envScore >= 70 && imgConfidence < 60) {
    fusionVerdict = 'HIGH_PREVENTIVE_SUITABILITY_NO_VISUAL_SYMPTOMS';
    synthesizedHeadline = `High Environmental Risk (Early Warning): Microclimate is highly favorable for ${environmentalRisk.diseaseName}, but no severe visual symptoms detected yet.`;
    actionProtocol = 'Do NOT spray harsh chemicals prematurely. Increase scouting frequency to 48 hours and maintain preventive cultural sanitation.';
  } else {
    fusionVerdict = 'ROUTINE_MONITORING';
    synthesizedHeadline = `Low Environmental Risk: Both visual symptoms and microclimate suitability are within safe tolerances.`;
    actionProtocol = 'Continue standard cultivation and balanced nutrition management.';
  }

  return {
    fusionVerdict,
    synthesizedHeadline,
    actionProtocol,
    imageConfidence: imgConfidence,
    environmentalRiskScore: envScore,
    diseaseName: environmentalRisk.diseaseName,
    timestamp: new Date().toISOString()
  };
}
