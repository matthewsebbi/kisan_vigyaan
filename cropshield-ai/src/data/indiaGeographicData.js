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
