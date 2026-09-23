import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Phone, 
  Sprout, 
  Layers, 
  Globe, 
  ShieldCheck, 
  LogOut, 
  Save, 
  Check,
  Smartphone,
  Info
} from 'lucide-react';

export const FarmerProfile = () => {
  const { 
    t, 
    lang, 
    setLang, 
    setActiveTab, 
    farmerProfile, 
    setFarmerProfile,
    setRole
  } = useApp();

  const [formData, setFormData] = useState({ ...farmerProfile });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setFarmerProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 pb-20">
      {/* Top Header */}
      <div className="px-4 py-3.5 bg-[#165a3c] flex items-center justify-between shadow-md text-white">
        <button 
          onClick={() => setActiveTab('esp32LiveData')}
          className="p-1.5 -ml-1 text-white hover:bg-emerald-800/60 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-lg font-bold tracking-tight">{t('profile')} & Farm Settings</h1>

        <div className="w-6"></div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Profile Card Banner */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-3xl shadow-inner">
            {formData.avatar}
          </div>
          <div>
            <h2 className="text-base font-extrabold text-gray-900">{formData.name}</h2>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {formData.location}
            </p>
            <div className="flex items-center space-x-2 mt-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md">
                Registered Farmer #MH-SNG-8842
              </span>
            </div>
          </div>
        </div>

        {/* Farm & Crop Configuration Form */}
        <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-xs space-y-3 text-xs">
          <h3 className="font-extrabold text-gray-800 text-xs uppercase tracking-wider mb-2">
            Farm & Crop Parameters
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Farmer Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Phone Number (SMS Alert)</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Primary Crop</label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="Tomato">Tomato (टोमॅटो)</option>
                <option value="Capsicum">Capsicum (ढोबळी मिरची)</option>
                <option value="Grapes">Grapes (द्राक्षे)</option>
                <option value="Sugarcane">Sugarcane (ऊस)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
              </select>
            </div>
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Crop Growth Stage</label>
              <select
                value={formData.growthStage}
                onChange={(e) => setFormData({ ...formData, growthStage: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-semibold"
              >
                <option value="Vegetative">Vegetative (शाकीय वाढ)</option>
                <option value="Flowering">Flowering (फुलोरा अवस्था)</option>
                <option value="Fruiting">Fruiting (फळधारणा अवस्था)</option>
                <option value="Harvesting">Harvesting (काढणी)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Field Size / Acreage</label>
              <input
                type="text"
                value={formData.acreage}
                onChange={(e) => setFormData({ ...formData, acreage: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="text-gray-500 font-semibold block mb-1">Soil Type</label>
              <input
                type="text"
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-500 font-semibold block mb-1">Village & District Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-xl font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#165a3c] hover:bg-[#124930] text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all mt-2"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Farm Profile Saved!' : 'Save Farm Profile'}</span>
          </button>
        </form>

        {/* Switch to Extension Officer Mode shortcut */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-xs space-y-2">
          <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            Switch to Agriculture Extension Officer Mode
          </h4>
          <p className="text-xs text-emerald-800 leading-snug">
            Are you a local Agriculture Extension Worker, Krishi Sahayak, or District Admin? Switch to the full surveillance and report validation dashboard.
          </p>
          <button
            onClick={() => setRole('officer')}
            className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Open Officer Surveillance Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};
