/**
 * Comprehensive Indian States & Agricultural Districts Mapping
 * Used for dynamic cascading dropdowns during Farmer Registration & Profile Management
 */

export const INDIAN_STATES_DISTRICTS = {
  "Maharashtra": [
    "Sangli", "Kolhapur", "Satara", "Pune", "Solapur", "Nashik", "Ahmednagar",
    "Jalgaon", "Dhule", "Nandurbar", "Aurangabad (Chhatrapati Sambhaji Nagar)",
    "Jalna", "Parbhani", "Beed", "Nanded", "Osmanabad (Dharashiv)", "Latur",
    "Buldhana", "Akola", "Washim", "Amravati", "Yavatmal", "Wardha", "Nagpur",
    "Bhandara", "Gondia", "Chandrapur", "Gadchiroli", "Thane", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg"
  ],
  "Tamil Nadu": [
    "Coimbatore", "Thanjavur", "Madurai", "Salem", "Tiruchirappalli", "Erode",
    "Tirunelveli", "Dindigul", "Cuddalore", "Vellore", "Theni", "Villupuram",
    "Tiruppur", "Namakkal", "Karur", "Nagapattinam", "Thiruvarur", "Pudukkottai",
    "Ramanathapuram", "Sivaganga", "Virudhunagar", "Thoothukudi", "Kanniyakumari",
    "Dharmapuri", "Krishnagiri", "Tiruvannamalai", "Ranipet", "Kanchipuram", "Chengalpattu"
  ],
  "Karnataka": [
    "Belagavi", "Dharwad", "Mysuru", "Mandya", "Ballari", "Raichur", "Vijayapura",
    "Bagalkote", "Hassan", "Shivamogga", "Davanagere", "Chitradurga", "Tumakuru",
    "Kolar", "Chikkaballapura", "Bengaluru Rural", "Udupi", "Dakshina Kannada",
    "Uttara Kannada", "Haveri", "Gadag", "Koppal", "Kalaburagi", "Yadgir", "Bidar"
  ],
  "Andhra Pradesh": [
    "Guntur", "Krishna", "East Godavari", "West Godavari", "Kurnool", "Anantapur",
    "Chittoor", "Prakasam", "Nellore", "Kadapa", "Visakhapatnam", "Vizianagaram", "Srikakulam"
  ],
  "Telangana": [
    "Warangal", "Karimnagar", "Nalgonda", "Nizamabad", "Khammam", "Mahabubnagar",
    "Medak", "Adilabad", "Rangareddy", "Siddipet", "Suryapet", "Jagtial"
  ],
  "Gujarat": [
    "Rajkot", "Surat", "Vadodara", "Junagadh", "Bhavnagar", "Mehsana", "Anand",
    "Banaskantha", "Amreli", "Sabarkantha", "Patan", "Kheda", "Bharuch", "Jamnagar"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Bathinda", "Jalandhar", "Patiala", "Firozpur",
    "Sangrur", "Fazilka", "Hoshiarpur", "Moga", "Muktsar", "Gurdaspur"
  ],
  "Haryana": [
    "Karnal", "Hisar", "Sirsa", "Ambala", "Rohtak", "Kurukshetra",
    "Sonipat", "Jind", "Fatehabad", "Yamunanagar", "Kaithal", "Panipat"
  ],
  "Madhya Pradesh": [
    "Indore", "Ujjain", "Bhopal", "Jabalpur", "Dewas", "Narmadapuram (Hoshangabad)",
    "Sehore", "Dhar", "Sagar", "Khargone", "Khandwa", "Vidisha", "Ratlam"
  ],
  "Uttar Pradesh": [
    "Varanasi", "Prayagraj", "Lucknow", "Agra", "Meerut", "Bareilly",
    "Aligarh", "Gorakhpur", "Moradabad", "Saharanpur", "Ayodhya", "Muzaffarnagar"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Sri Ganganagar", "Bikaner", "Alwar",
    "Udaipur", "Hanumangarh", "Nagaur", "Barmer", "Chittorgarh", "Bharatpur"
  ],
  "Bihar": [
    "Patna", "Muzaffarpur", "Gaya", "Bhagalpur", "Nalanda", "Samastipur",
    "Rohtas", "Begusarai", "Darbhanga", "Vaishali", "Purnia", "Champaran"
  ],
  "West Bengal": [
    "Purba Bardhaman", "Murshidabad", "Nadia", "Hooghly", "Malda",
    "Bankura", "Birbhum", "Jalpaiguri", "North 24 Parganas", "South 24 Parganas"
  ],
  "Kerala": [
    "Palakkad", "Wayanad", "Idukki", "Thrissur", "Kottayam",
    "Kozhikode", "Malappuram", "Alappuzha", "Kollam", "Ernakulam"
  ]
};

export const INDIAN_STATES = Object.keys(INDIAN_STATES_DISTRICTS);

export const getDistrictsForState = (stateName) => {
  return INDIAN_STATES_DISTRICTS[stateName] || INDIAN_STATES_DISTRICTS["Maharashtra"];
};

/**
 * Designated State Agricultural Extension Officers
 * Exactly one official authority per State with verified Govt IDs & credentials
 */
export const STATE_AGRI_OFFICERS = {
  "Maharashtra": {
    id: "usr-officer-suhas",
    name: "Dr. Suhas More",
    username: "officer_maharashtra",
    password: "officer123",
    govtId: "GOV-AGRI-MH-01",
    state: "Maharashtra",
    district: "Sangli",
    jurisdictionArea: "Maharashtra State Agri Command - Sangli & Western Ghats Zone",
    department: "Department of Agriculture, Govt. of Maharashtra",
    designation: "District Agriculture Extension Officer (Class-I)",
    phone: "+91 98900 12345",
    email: "officer.maharashtra@agri.gov.in",
    avatar: "🧑‍🔬"
  },
  "Tamil Nadu": {
    id: "usr-officer-murugan",
    name: "Dr. R. Murugan",
    username: "officer_tamilnadu",
    password: "officer123",
    govtId: "GOV-AGRI-TN-01",
    state: "Tamil Nadu",
    district: "Thanjavur",
    jurisdictionArea: "Tamil Nadu State Agriculture Command - Cauvery Delta Basin",
    department: "Department of Agriculture & Farmers Welfare, Govt. of Tamil Nadu",
    designation: "Joint Director of Agriculture (JDA)",
    phone: "+91 94432 18901",
    email: "officer.tamilnadu@agri.gov.in",
    avatar: "👨‍🔬"
  },
  "Karnataka": {
    id: "usr-officer-patil",
    name: "Dr. Basavaraj Patil",
    username: "officer_karnataka",
    password: "officer123",
    govtId: "GOV-AGRI-KA-01",
    state: "Karnataka",
    district: "Belagavi",
    jurisdictionArea: "Karnataka State Agricultural Command - Krishna Basin",
    department: "Department of Agriculture, Govt. of Karnataka",
    designation: "Deputy Director of Agriculture (DDA)",
    phone: "+91 98450 67123",
    email: "officer.karnataka@agri.gov.in",
    avatar: "🧑‍💼"
  },
  "Punjab": {
    id: "usr-officer-singh",
    name: "Dr. Gurpreet Singh",
    username: "officer_punjab",
    password: "officer123",
    govtId: "GOV-AGRI-PB-01",
    state: "Punjab",
    district: "Ludhiana",
    jurisdictionArea: "Punjab Agri Command Center - Malwa & Majha Region",
    department: "Department of Agriculture & Farmers Welfare, Govt. of Punjab",
    designation: "Chief Agriculture Officer (CAO)",
    phone: "+91 98140 23456",
    email: "officer.punjab@agri.gov.in",
    avatar: "👨‍💼"
  },
  "Gujarat": {
    id: "usr-officer-patel",
    name: "Dr. Bhavesh Patel",
    username: "officer_gujarat",
    password: "officer123",
    govtId: "GOV-AGRI-GJ-01",
    state: "Gujarat",
    district: "Rajkot",
    jurisdictionArea: "Gujarat Saurashtra & Central Agri Command",
    department: "Directorate of Agriculture, Govt. of Gujarat",
    designation: "District Agricultural Extension Specialist",
    phone: "+91 98250 88912",
    email: "officer.gujarat@agri.gov.in",
    avatar: "🧑‍🔬"
  },
  "Andhra Pradesh": {
    id: "usr-officer-venkat",
    name: "Dr. K. Venkat Rao",
    username: "officer_andhra",
    password: "officer123",
    govtId: "GOV-AGRI-AP-01",
    state: "Andhra Pradesh",
    district: "Guntur",
    jurisdictionArea: "Andhra Coastal & Krishna-Godavari Command",
    department: "Department of Agriculture, Govt. of Andhra Pradesh",
    designation: "Assistant Director of Agriculture",
    phone: "+91 94401 55678",
    email: "officer.andhra@agri.gov.in",
    avatar: "👨‍🔬"
  },
  "Telangana": {
    id: "usr-officer-srinivas",
    name: "Dr. M. Srinivas Reddy",
    username: "officer_telangana",
    password: "officer123",
    govtId: "GOV-AGRI-TG-01",
    state: "Telangana",
    district: "Warangal",
    jurisdictionArea: "Telangana State Agriculture Command - Northern Zone",
    department: "Department of Agriculture, Govt. of Telangana",
    designation: "District Agriculture Officer (DAO)",
    phone: "+91 94408 99120",
    email: "officer.telangana@agri.gov.in",
    avatar: "🧑‍💼"
  },
  "Haryana": {
    id: "usr-officer-malik",
    name: "Dr. Sandeep Malik",
    username: "officer_haryana",
    password: "officer123",
    govtId: "GOV-AGRI-HR-01",
    state: "Haryana",
    district: "Karnal",
    jurisdictionArea: "Haryana Agro Extension Command - GT Road Belt",
    department: "Department of Agriculture & Farmers Welfare, Haryana",
    designation: "Deputy Director of Agriculture",
    phone: "+91 94160 33451",
    email: "officer.haryana@agri.gov.in",
    avatar: "👨‍🔬"
  },
  "Madhya Pradesh": {
    id: "usr-officer-sharma",
    name: "Dr. Rajesh Sharma",
    username: "officer_madhyapradesh",
    password: "officer123",
    govtId: "GOV-AGRI-MP-01",
    state: "Madhya Pradesh",
    district: "Indore",
    jurisdictionArea: "Malwa Plateau & Narmada Valley Agri Command",
    department: "Farmer Welfare & Agriculture Development Dept, MP",
    designation: "Senior Agriculture Development Officer",
    phone: "+91 94250 11987",
    email: "officer.mp@agri.gov.in",
    avatar: "🧑‍💼"
  },
  "Uttar Pradesh": {
    id: "usr-officer-verma",
    name: "Dr. Anand Verma",
    username: "officer_uttarpradesh",
    password: "officer123",
    govtId: "GOV-AGRI-UP-01",
    state: "Uttar Pradesh",
    district: "Varanasi",
    jurisdictionArea: "Purvanchal & Gangetic Plains Agriculture Command",
    department: "Department of Agriculture, Govt. of Uttar Pradesh",
    designation: "Deputy Director (Plant Protection)",
    phone: "+91 94152 77890",
    email: "officer.up@agri.gov.in",
    avatar: "👨‍🔬"
  },
  "Rajasthan": {
    id: "usr-officer-choudhary",
    name: "Dr. Mahendra Choudhary",
    username: "officer_rajasthan",
    password: "officer123",
    govtId: "GOV-AGRI-RJ-01",
    state: "Rajasthan",
    district: "Jaipur",
    jurisdictionArea: "Rajasthan Arid & Semi-Arid Agricultural Command",
    department: "Department of Agriculture, Govt. of Rajasthan",
    designation: "Joint Director of Agriculture (Extension)",
    phone: "+91 94140 44567",
    email: "officer.rajasthan@agri.gov.in",
    avatar: "🧑‍💼"
  },
  "Bihar": {
    id: "usr-officer-prasad",
    name: "Dr. Rameshwar Prasad",
    username: "officer_bihar",
    password: "officer123",
    govtId: "GOV-AGRI-BR-01",
    state: "Bihar",
    district: "Patna",
    jurisdictionArea: "Bihar State Agro Command - Magadh & Mithila Zone",
    department: "Department of Agriculture, Govt. of Bihar",
    designation: "District Agriculture Officer",
    phone: "+91 94310 22345",
    email: "officer.bihar@agri.gov.in",
    avatar: "👨‍🔬"
  },
  "West Bengal": {
    id: "usr-officer-ghosh",
    name: "Dr. Subhasish Ghosh",
    username: "officer_westbengal",
    password: "officer123",
    govtId: "GOV-AGRI-WB-01",
    state: "West Bengal",
    district: "Purba Bardhaman",
    jurisdictionArea: "Rarh & Gangetic Delta Agriculture Command",
    department: "Department of Agriculture, Govt. of West Bengal",
    designation: "Assistant Director of Agriculture (Administration)",
    phone: "+91 94340 55678",
    email: "officer.westbengal@agri.gov.in",
    avatar: "🧑‍💼"
  },
  "Kerala": {
    id: "usr-officer-mathew",
    name: "Dr. Thomas Mathew",
    username: "officer_kerala",
    password: "officer123",
    govtId: "GOV-AGRI-KL-01",
    state: "Kerala",
    district: "Palakkad",
    jurisdictionArea: "Kerala Spice & Paddy Belt Agriculture Command",
    department: "Department of Agricultural Development & Farmers Welfare, Kerala",
    designation: "Principal Agricultural Officer (PAO)",
    phone: "+91 94470 33214",
    email: "officer.kerala@agri.gov.in",
    avatar: "👨‍🔬"
  }
};
