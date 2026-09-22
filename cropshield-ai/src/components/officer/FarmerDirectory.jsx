import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Search, 
  MapPin, 
  Phone, 
  Sprout, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const FarmerDirectory = () => {
  const { reports, registeredFarmersRegistry = [] } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const baseRegisteredFarmers = [
    {
      id: "f-1",
      name: "Ramesh Patil",
      username: "ramesh_patil",
      phone: "+91 98224 55120",
      location: "Kupwad, Sangli",
      crop: "Tomato (Abhinav Variety)",
      acreage: "2.5 Acres",
      soilType: "Black Cotton Soil",
      lastScan: "27 May 2024 (Early Blight - 91%)",
      healthStatus: "Attention Needed",
      totalScans: 8,
      verifiedScans: 6
    },
    {
      id: "f-2",
      name: "Sunita Ghorpade",
      username: "sunita_g",
      phone: "+91 94233 11890",
      location: "Tasgaon Rural",
      crop: "Capsicum & Tomato",
      acreage: "1.8 Acres",
      soilType: "Red Loamy Soil",
      lastScan: "26 May 2024 (Bacterial Spot)",
      healthStatus: "Under Treatment",
      totalScans: 5,
      verifiedScans: 4
    },
    {
      id: "f-3",
      name: "Anand Shinde",
      username: "anand_shinde",
      phone: "+91 97654 88321",
      location: "Miraj Agricultural Zone",
      crop: "Tomato",
      acreage: "3.2 Acres",
      soilType: "Black Alluvial Soil",
      lastScan: "25 May 2024 (Aphids Infestation)",
      healthStatus: "Recovering",
      totalScans: 12,
      verifiedScans: 11
    },
    {
      id: "f-4",
      name: "Ganesh Kadam",
      username: "ganesh_k",
      phone: "+91 91580 44231",
      location: "Walwa, Sangli",
      crop: "Tomato & Sugarcane",
      acreage: "4.0 Acres",
      soilType: "Clay Loam Soil",
      lastScan: "24 May 2024 (Healthy)",
      healthStatus: "Good",
      totalScans: 9,
      verifiedScans: 9
    },
    {
      id: "f-5",
      name: "Babanrao Patil",
      username: "babanrao_p",
      phone: "+91 98901 33214",
      location: "Palus Riverbed",
      crop: "Tomato (Heirloom)",
      acreage: "2.0 Acres",
      soilType: "Silty Loam",
      lastScan: "22 May 2024 (Early Blight)",
      healthStatus: "Resolved",
      totalScans: 7,
      verifiedScans: 6
    }
  ];

  const newlyRegistered = registeredFarmersRegistry.map(rf => ({
    id: rf.id,
    name: rf.name,
    username: rf.username,
    phone: rf.phone,
    location: `${rf.district || 'Sangli'}, ${rf.state || 'Maharashtra'}`,
    crop: "Enrolled Farmer (Portal Registration)",
    acreage: "Registered Account",
    soilType: "Verified Farmer Profile",
    lastScan: `Enrolled ${rf.registeredAt || 'Recently'}`,
    healthStatus: "Registered",
    totalScans: rf.scansCount || 0,
    verifiedScans: 0,
    isNewPortalRegistration: true
  }));

  const combinedFarmers = [...newlyRegistered, ...baseRegisteredFarmers];

  const filteredFarmers = combinedFarmers.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.username && f.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (f.phone && f.phone.includes(searchQuery)) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-gray-900">Sangli District Farmer Registry & Surveillance Profiles</h2>
          <p className="text-xs text-gray-500 font-medium">842 Active registered farmers with digitized land, crop and soil profiles</p>
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by farmer name, crop or village..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 shadow-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFarmers.map((farmer) => (
          <div key={farmer.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-start justify-between border-b border-gray-100 pb-2.5">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-xl font-bold">
                  👨‍🌾
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-gray-900 leading-tight">{farmer.name}</h3>
                  {farmer.username && (
                    <span className="inline-block text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5">
                      @{farmer.username}
                    </span>
                  )}
                  <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    {farmer.location}
                  </p>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                farmer.healthStatus === 'Good' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : farmer.healthStatus === 'Resolved'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {farmer.healthStatus}
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex items-center justify-between">
                <span>Crop:</span>
                <strong className="text-gray-900">{farmer.crop}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Field Size:</span>
                <strong>{farmer.acreage}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Soil Profile:</span>
                <strong>{farmer.soilType}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span>Phone:</span>
                <strong className="text-emerald-800">{farmer.phone}</strong>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-[11px] space-y-0.5">
              <span className="text-gray-400 font-bold block">Latest Health Scan:</span>
              <p className="text-gray-800 font-semibold truncate">{farmer.lastScan}</p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-gray-500 pt-1">
              <span>Total Scans: <strong>{farmer.totalScans}</strong></span>
              <span className="text-emerald-700 font-bold">✓ {farmer.verifiedScans} Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
