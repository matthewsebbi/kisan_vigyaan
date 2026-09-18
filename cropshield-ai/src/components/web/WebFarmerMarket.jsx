import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  CheckCircle2, 
  TrendingUp, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Filter, 
  Layers, 
  CreditCard,
  Phone,
  Sparkles,
  ArrowRight,
  TrendingDown,
  PhoneCall,
  ExternalLink,
  MapPin,
  Clock,
  Radio,
  Zap,
  Tag,
  Check,
  MessageSquare,
  Trash2,
  X,
  Sprout,
  Upload,
  Camera
} from 'lucide-react';
import {
  marketplaceCropMedicines,
  marketplaceSeedsAndFertilizers,
  marketplaceDroneServices,
  liveMandiRatesComprehensive,
  allMarketplaceItemsCombined,
  initialFarmerCropListings
} from '../../data/marketplaceData';

export const WebFarmerMarket = ({ onNavigate }) => {
  const { 
    addToCart, 
    openDirectCheckout, 
    setIsCartModalOpen, 
    cart, 
    theme, 
    lang, 
    t 
  } = useApp();

  const isDark = theme === 'dark';
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'farmerSell' | 'medicine' | 'seeds' | 'services' | 'mandi'
  const [searchQuery, setSearchQuery] = useState('');
  const [addedToast, setAddedToast] = useState(null);

  // Farmer Crop Selling State (Persisted in localStorage)
  const [farmerListings, setFarmerListings] = useState(() => {
    const saved = localStorage.getItem('farmerProduceListings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error loading farmer listings', e);
      }
    }
    return initialFarmerCropListings;
  });

  // Modal State for Posting New Crop Listing
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [newCropForm, setNewCropForm] = useState({
    name: '',
    cropType: 'Soybean',
    quantity: '50 Quintals',
    price: 5200,
    priceUnit: 'per Quintal',
    grade: 'Grade-A Organic (98% Germination)',
    sellerName: 'Ramesh Patil',
    location: 'Sangli APMC, Maharashtra',
    phone: '+91 98224 55120',
    harvestDate: 'Fresh Harvested 2 days ago',
    description: 'Cleaned, sun-dried, chemical-free premium crop ready for immediate farm pickup or mandi transport.',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500&auto=format&fit=crop&q=60'
  });

  const cropPresets = [
    { label: 'Soybean', img: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500&auto=format&fit=crop&q=60' },
    { label: 'Rice / Paddy', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60' },
    { label: 'Bt Cotton', img: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60' },
    { label: 'Turmeric', img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60' },
    { label: 'Red Grapes', img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&auto=format&fit=crop&q=60' },
    { label: 'Tomatoes', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60' },
    { label: 'Wheat', img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=60' },
    { label: 'Sugarcane', img: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=500&auto=format&fit=crop&q=60' }
  ];

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newCropForm.name || !newCropForm.price) return;

    const createdItem = {
      id: `user-crop-${Date.now()}`,
      name: newCropForm.name,
      nameMr: newCropForm.name,
      nameTa: newCropForm.name,
      cropType: newCropForm.cropType,
      sellerName: newCropForm.sellerName || 'Farmer Seller',
      location: newCropForm.location || 'Local Farm',
      quantity: newCropForm.quantity || '10 Quintals',
      price: Number(newCropForm.price) || 4000,
      priceUnit: newCropForm.priceUnit || 'per Quintal',
      grade: newCropForm.grade || 'Grade A Quality',
      phone: newCropForm.phone || '+91 98224 55120',
      harvestDate: newCropForm.harvestDate || 'Fresh Harvest',
      description: newCropForm.description || 'Quality produce direct from farm.',
      category: 'farmerSell',
      icon: '🌾',
      image: newCropForm.image,
      isUserListing: true
    };

    const updated = [createdItem, ...farmerListings];
    setFarmerListings(updated);
    localStorage.setItem('farmerProduceListings', JSON.stringify(updated));

    setIsSellModalOpen(false);
    setActiveCategory('farmerSell');

    setAddedToast(lang === 'mr' ? '🎉 तुमचे पीक विक्रीसाठी बाजारात जोडले गेले!' : lang === 'ta' ? '🎉 உங்கள் பயிர் விற்பனைக்கு சேர்க்கப்பட்டது!' : '🎉 Crop listing published successfully to Kisan Market!');
    setTimeout(() => setAddedToast(null), 3000);
  };

  const handleDeleteListing = (id) => {
    const updated = farmerListings.filter(item => item.id !== id);
    setFarmerListings(updated);
    localStorage.setItem('farmerProduceListings', JSON.stringify(updated));
  };

  const getProductLocalized = (p, field) => {
    if (!p) return '';
    const localizedField = `${field}_${lang}`;
    if (p[localizedField]) return p[localizedField];
    if (lang === 'ta' && p[`${field}Ta`]) return p[`${field}Ta`];
    if (lang === 'mr' && p[`${field}Mr`]) return p[`${field}Mr`];
    if (lang === 'hi' && p[`${field}Hi`]) return p[`${field}Hi`];
    return p[field] || '';
  };

  // Combined Marketplace List including user-posted farmer listings
  const combinedAllListings = [...farmerListings, ...allMarketplaceItemsCombined];

  // Select items based on activeCategory
  let currentItemList = [];
  if (activeCategory === 'all') {
    currentItemList = combinedAllListings;
  } else if (activeCategory === 'farmerSell') {
    currentItemList = farmerListings;
  } else if (activeCategory === 'medicine') {
    currentItemList = marketplaceCropMedicines;
  } else if (activeCategory === 'seeds') {
    currentItemList = marketplaceSeedsAndFertilizers;
  } else if (activeCategory === 'services') {
    currentItemList = marketplaceDroneServices;
  }

  const filteredProducts = currentItemList.filter(p => {
    const pName = (p.name || '').toLowerCase();
    const pNameMr = (p.nameMr || '').toLowerCase();
    const pNameTa = (p.nameTa || '').toLowerCase();
    const pCrops = (p.crops || p.cropType || '').toLowerCase();
    const pDesc = (p.description || '').toLowerCase();
    const pLoc = (p.location || '').toLowerCase();
    const q = searchQuery.toLowerCase();

    return pName.includes(q) || pNameMr.includes(q) || pNameTa.includes(q) || pCrops.includes(q) || pDesc.includes(q) || pLoc.includes(q);
  });

  const filteredMandiRates = liveMandiRatesComprehensive.filter(m => {
    const q = searchQuery.toLowerCase();
    return (m.crop || '').toLowerCase().includes(q) ||
           (m.cropMr || '').toLowerCase().includes(q) ||
           (m.cropTa || '').toLowerCase().includes(q) ||
           (m.mandi || '').toLowerCase().includes(q) ||
           (m.mandiMr || '').toLowerCase().includes(q);
  });

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setIsCartModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-700 text-white font-black text-xs shadow-2xl flex items-center gap-2 animate-slideUp">
          <CheckCircle2 className="w-5 h-5" />
          <span>{addedToast}</span>
        </div>
      )}

      {/* Header Banner (Stitch Card) */}
      <div className={`p-6 rounded-2xl border stitch-card flex flex-col md:flex-row md:items-center justify-between gap-4 ${
        isDark 
          ? 'bg-[#091222] border-[#182a4a] text-white' 
          : 'bg-white border-[#E2E8F0] text-slate-900'
      }`}>
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white flex items-center justify-center shadow-xs shrink-0">
            <ShoppingBag className="w-6 h-6 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {lang === 'ta' ? 'விவசாய சந்தை & நேரடி பயிர் விற்பனை' : lang === 'mr' ? 'शेतकरी बाजारपेठ व थेट धान्य विक्री केंद्र' : lang === 'hi' ? 'किसान बाजार व फसल बिक्री केंद्र' : 'Farmer Marketplace & Direct Crop Selling'}
              </h1>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Farmer Direct Sale
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
              {lang === 'ta' ? 'பயிர்களை விற்கவும், விதைகள் & உரங்களை வாங்கவும், நேரடி மண்டி ஏல விலைகளை பார்க்கவும்' : lang === 'mr' ? 'आपले धान्य विक्रीसाठी टाका, प्रमाणित खते व औषधे खरेदी करा आणि थेट बाजार भाव पहा' : 'Sell your harvested crops directly to buyers, purchase subsidized inputs & check APMC spot rates'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          {/* Post Crop for Sale Button */}
          <button
            onClick={() => setIsSellModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 border border-amber-500/40"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ta' ? 'பயிர் விற்பனை பதிவு' : lang === 'mr' ? 'पीक विक्रीसाठी टाका' : lang === 'hi' ? 'फसल बेचने के लिए जोड़ें' : 'Sell Crop / Post Produce'}</span>
          </button>

          {/* View Cart Button */}
          <button
            onClick={() => setIsCartModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{lang === 'ta' ? `கூடை (${(cart || []).reduce((s, i) => s + (i.quantity || 1), 0)})` : lang === 'mr' ? `कार्ट (${(cart || []).reduce((s, i) => s + (i.quantity || 1), 0)})` : `Cart (${(cart || []).reduce((s, i) => s + (i.quantity || 1), 0)})`}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Tabs & Search Strip */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
          {[
            { id: 'all', label: lang === 'ta' ? `அனைத்தும் (${combinedAllListings.length})` : lang === 'mr' ? `सर्व (${combinedAllListings.length})` : `All Items (${combinedAllListings.length})` },
            { id: 'farmerSell', label: lang === 'ta' ? `பயிர் விற்பனை (${farmerListings.length})` : lang === 'mr' ? `धान्य विक्री (${farmerListings.length})` : lang === 'hi' ? `फसल बिक्री (${farmerListings.length})` : `Farmer Sales (${farmerListings.length})` },
            { id: 'medicine', label: lang === 'ta' ? `🧪 மருந்துகள் (${marketplaceCropMedicines.length})` : lang === 'mr' ? `🧪 पीक औषधे (${marketplaceCropMedicines.length})` : `🧪 Crop Medicines (${marketplaceCropMedicines.length})` },
            { id: 'seeds', label: lang === 'ta' ? `🌱 விதைகள் & உரங்கள் (${marketplaceSeedsAndFertilizers.length})` : lang === 'mr' ? `🌱 बियाणे व खते (${marketplaceSeedsAndFertilizers.length})` : `🌱 Seeds & Fertilizers (${marketplaceSeedsAndFertilizers.length})` },
            { id: 'services', label: lang === 'ta' ? `🚁 ட்ரோன் (${marketplaceDroneServices.length})` : lang === 'mr' ? `🚁 ड्रोन (${marketplaceDroneServices.length})` : `🚁 Drones (${marketplaceDroneServices.length})` },
            { id: 'mandi', label: lang === 'ta' ? `📊 மண்டி விலை (${liveMandiRatesComprehensive.length})` : lang === 'mr' ? `📊 बाजारभाव (${liveMandiRatesComprehensive.length})` : `📊 Mandi Rates (${liveMandiRatesComprehensive.length})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-[#1B4332] text-white shadow-xs'
                  : isDark 
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={activeCategory === 'mandi' ? (lang === 'ta' ? 'பயிர் அல்லது சந்தையைத் தேடவும்...' : 'Search crop or APMC mandi...') : (lang === 'ta' ? 'மருந்து, விதை, ட்ரோன் அல்லது பயிரைத் தேடவும்...' : 'Search crop, seed, medicine, or mandi...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:border-[#1B4332] transition-colors border ${
              isDark 
                ? 'bg-[#0a1324] border-[#182a4a] text-white placeholder-slate-500' 
                : 'bg-white border-[#E2E8F0] text-slate-900 placeholder-slate-400 shadow-2xs'
            }`}
          />
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. PRODUCT, FARMER CROP SALES & DRONE SERVICE GRID            */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeCategory !== 'mandi' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredProducts.map(product => {
            const pName = getProductLocalized(product, 'name');
            const pUnit = getProductLocalized(product, 'unit') || product.priceUnit || 'per Quintal';
            const pCrops = getProductLocalized(product, 'crops') || product.cropType || 'Field Produce';
            const isFarmerProduce = product.category === 'farmerSell';
            const isDrone = product.category === 'services';

            return (
              <div 
                key={product.id}
                className={`rounded-2xl border stitch-card overflow-hidden flex flex-col justify-between transition-all duration-200 group ${
                  isFarmerProduce
                    ? (isDark ? 'bg-[#09152b] border-amber-500/40 text-white' : 'bg-white border-amber-200 text-slate-900')
                    : (isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-[#E2E8F0] text-slate-900')
                }`}
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img 
                      src={product.image || 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500'} 
                      alt={pName} 
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-md border ${
                        isFarmerProduce 
                          ? 'bg-amber-500 text-slate-950 border-amber-300' 
                          : 'bg-emerald-700 text-white border-emerald-500'
                      }`}>
                        {isFarmerProduce ? '🌾 Farmer Sale' : (isDrone ? '🚁 Drone Service' : '🌱 Certified Input')}
                      </span>

                      {product.grade && (
                        <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                          {product.grade}
                        </span>
                      )}

                      {product.isUserListing && (
                        <button
                          onClick={() => handleDeleteListing(product.id)}
                          className="p-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-md"
                          title="Delete My Listing"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Bottom overlay: Price & Quantity */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] text-slate-300 font-bold block">{isFarmerProduce ? 'Asking Price:' : 'Subsidized Rate:'}</span>
                        <strong className="text-xl font-black text-amber-300 dark:text-emerald-300 font-sans">
                          ₹{product.price.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-200">/ {pUnit}</span>
                        </strong>
                      </div>
                      {product.quantity && (
                        <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
                          Qty: {product.quantity}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-black text-base leading-snug text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {pName}
                      </h3>
                      {product.sellerName && (
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-600" />
                          <span>{product.sellerName} • {product.location}</span>
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 font-medium">
                      {product.description}
                    </p>

                    <div className="p-2.5 bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-emerald-200/80 dark:border-slate-800 text-[11px] space-y-1">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Harvest / Availability:</span>
                        <strong className="text-slate-900 dark:text-slate-200">{product.harvestDate || 'Ready in Stock'}</strong>
                      </div>
                      {product.phone && (
                        <div className="flex justify-between text-slate-600 dark:text-slate-400">
                          <span>Verified Seller Contact:</span>
                          <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{product.phone}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Strip */}
                <div className="p-5 pt-0">
                  {isFarmerProduce ? (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200 dark:border-slate-800">
                      <a
                        href={`tel:${product.phone || '9822455120'}`}
                        className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Seller</span>
                      </a>

                      <a
                        href={`https://wa.me/${(product.phone || '').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(product.sellerName || 'Farmer')},%20I%20am%20interested%20in%20buying%20your%20${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-emerald-200/60 dark:border-slate-800">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`py-2.5 px-3 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
                          isDark 
                            ? 'bg-[#0f1d38] hover:bg-[#162a52] text-slate-200 border border-[#22365e]' 
                            : 'bg-white hover:bg-emerald-100/70 text-slate-900 border border-emerald-200 shadow-2xs'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{lang === 'ta' ? 'கூடை' : lang === 'mr' ? 'कार्टमध्ये' : 'Add to Cart'}</span>
                      </button>

                      <button
                        onClick={() => openDirectCheckout(product)}
                        className="py-2.5 px-3 rounded-xl bg-[#047857] hover:bg-[#065F46] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <span>{isDrone ? (lang === 'ta' ? 'முன்பதிவு' : lang === 'mr' ? 'बुक करा' : 'Book Drone') : (lang === 'ta' ? 'வாங்க' : lang === 'mr' ? 'खरेदी करा' : 'Buy Now')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. 22+ LIVE APMC MANDI COMMODITY RATES                        */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeCategory === 'mandi' && (
        <div className="space-y-5">
          {/* APMC Ticker Header */}
          <div className="p-4 rounded-2xl bg-[#DCFCE7] dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2.5">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <strong className="text-emerald-950 dark:text-emerald-200 font-black">
                {lang === 'ta' ? 'நேரடி e-NAM & APMC மண்டி ஏல விலைகள் (உடனடி நேரலை)' : lang === 'mr' ? 'थेट ई-नाम व कृषी उत्पन्न बाजार समिती थेट दर (थेट लिलाव)' : 'Live e-NAM & APMC Spot Mandi Rates (Direct Farmer-Trader Auction Connect)'}
              </strong>
            </div>
            <span className="text-[11px] text-emerald-900 dark:text-emerald-300 font-bold">
              Updated: Today, 09:30 AM • 22 Active Mandis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredMandiRates.map(m => {
              const isUp = m.trendStatus === 'up';
              const isDown = m.trendStatus === 'down';
              const cropTitle = getProductLocalized(m, 'crop');
              const mandiTitle = getProductLocalized(m, 'mandi');

              return (
                <div
                  key={m.id}
                  className={`rounded-3xl border overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl group ${
                    isDark 
                      ? 'bg-[#0a1324] border-[#182a4a] text-white' 
                      : 'bg-[#F0FDF4] hover:bg-[#E8F5EB] border-emerald-200/90 text-slate-900'
                  }`}
                >
                  <div>
                    {/* Real Commodity Photography Banner */}
                    <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                      <img 
                        src={m.image} 
                        alt={m.crop} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/20 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          {mandiTitle}
                        </span>

                        <span className={`text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-md ${
                          isUp 
                            ? 'bg-emerald-600 text-white' 
                            : isDown 
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-700 text-white'
                        }`}>
                          {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : isDown ? <TrendingDown className="w-3.5 h-3.5" /> : null}
                          {m.trend}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                        <h3 className="text-base font-black drop-shadow-md">
                          {cropTitle}
                        </h3>
                        <span className="text-base sm:text-lg font-black text-emerald-300 drop-shadow-md font-sans">
                          {m.rate}
                        </span>
                      </div>
                    </div>

                    {/* Mandi Details */}
                    <div className="p-5 space-y-3">
                      <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-emerald-200/80 dark:border-slate-800 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block">Current Modal Rate</span>
                          <strong className="text-base font-black text-emerald-900 dark:text-emerald-400 font-sans">{m.rate}</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 font-bold block">Govt MSP Floor</span>
                          <strong className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans">{m.msp}</strong>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-600 font-medium">
                        <span>Today's Arrivals: <strong className="text-slate-900 dark:text-slate-200 font-bold">{m.arrivals}</strong></span>
                        <span>Active Buyers: <strong className="text-emerald-800 dark:text-emerald-400 font-bold">{m.buyers} Traders</strong></span>
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                        Status: <span className="text-slate-900 dark:text-white font-bold">{m.status}</span>
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <a
                      href="tel:18001801551"
                      className="w-full py-2.5 bg-[#047857] hover:bg-[#065F46] text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-transform active:scale-95"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{lang === 'ta' ? 'மண்டி ஏலதாரரை அழைக்கவும்' : lang === 'mr' ? 'बाजार समिती व्यापारी संपर्क' : 'Connect with APMC Trader'}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. POST CROP LISTING MODAL DIALOG                              */}
      {/* ───────────────────────────────────────────────────────────── */}
      {isSellModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 relative ${
            isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-emerald-200 text-slate-900'
          }`}>
            <button
              onClick={() => setIsSellModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-5 border-b pb-4 border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-xl">
                🌾
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  {lang === 'mr' ? 'तुमचे पीक विक्रीसाठी टाका' : lang === 'ta' ? 'உங்கள் பயிரை விற்பனைக்கு சேர்க்க' : 'Sell Produce / List Harvested Crop'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Direct Farmer-to-Trader Marketplace • Zero Middlemen Commission
                </p>
              </div>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4 text-xs font-medium">
              {/* Crop Title */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Crop Listing Title *
                </label>
                <input
                  type="text"
                  required
                  value={newCropForm.name}
                  onChange={(e) => setNewCropForm({ ...newCropForm, name: e.target.value })}
                  placeholder="e.g. Organic Phule Sangam Soybean (KDS-726)"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Grid 2 Columns: Category & Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Crop Category
                  </label>
                  <select
                    value={newCropForm.cropType}
                    onChange={(e) => setNewCropForm({ ...newCropForm, cropType: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Soybean">Soybean (सोयाबीन)</option>
                    <option value="Rice">Rice / Paddy (भात / धान)</option>
                    <option value="Cotton">Cotton (कापूस / பருத்தி)</option>
                    <option value="Turmeric">Turmeric (हळद / மஞ்சள்)</option>
                    <option value="Grapes">Grapes (द्राक्षे / திராட்சை)</option>
                    <option value="Tomato">Tomato (टोमॅटो / தக்காளி)</option>
                    <option value="Wheat">Wheat (गहू / கோதுமை)</option>
                    <option value="Sugarcane">Sugarcane (ऊस / கரும்பு)</option>
                    <option value="Chilli">Chilli (मिरची / மிளகாய்)</option>
                    <option value="Onion">Onion (कांदा / வெங்காயம்)</option>
                    <option value="Potato">Potato (बटाटा / உருளைக்கிழங்கு)</option>
                    <option value="Other">Other Field Crops</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Available Quantity *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCropForm.quantity}
                    onChange={(e) => setNewCropForm({ ...newCropForm, quantity: e.target.value })}
                    placeholder="e.g. 60 Quintals / 10 Tons / 150 Crates"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Grid 2 Columns: Price & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Asking Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newCropForm.price}
                    onChange={(e) => setNewCropForm({ ...newCropForm, price: e.target.value })}
                    placeholder="e.g. 5200"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Price Unit
                  </label>
                  <select
                    value={newCropForm.priceUnit}
                    onChange={(e) => setNewCropForm({ ...newCropForm, priceUnit: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="per Quintal">per Quintal (प्रति क्विंटल)</option>
                    <option value="per Kg">per Kg (प्रति किलो)</option>
                    <option value="per Crate">per Crate / Box</option>
                    <option value="per Ton">per Metric Ton</option>
                    <option value="per Bale">per Cotton Bale</option>
                  </select>
                </div>
              </div>

              {/* Grade & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Quality Grade / Variety
                  </label>
                  <input
                    type="text"
                    value={newCropForm.grade}
                    onChange={(e) => setNewCropForm({ ...newCropForm, grade: e.target.value })}
                    placeholder="e.g. Grade A Organic (98% Germination)"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Farm Location / Mandi *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCropForm.location}
                    onChange={(e) => setNewCropForm({ ...newCropForm, location: e.target.value })}
                    placeholder="e.g. Sangli APMC, Maharashtra"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Contact Phone & Seller Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Your Name (Seller) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCropForm.sellerName}
                    onChange={(e) => setNewCropForm({ ...newCropForm, sellerName: e.target.value })}
                    placeholder="Ramesh Patil"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    WhatsApp / Contact Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCropForm.phone}
                    onChange={(e) => setNewCropForm({ ...newCropForm, phone: e.target.value })}
                    placeholder="+91 98224 55120"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Crop Photo Selector */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Select Crop Photo Sample
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {cropPresets.map((preset, pIdx) => (
                    <button
                      type="button"
                      key={pIdx}
                      onClick={() => setNewCropForm({ ...newCropForm, image: preset.img })}
                      className={`h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${
                        newCropForm.image === preset.img ? 'border-amber-500 ring-2 ring-amber-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.img} alt={preset.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-black text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'mr' ? '🚀 पीक विक्रीची जाहिरात प्रकाशित करा' : lang === 'ta' ? '🚀 பயிர் விற்பனை விளம்பரம் வெளியிடவும்' : '🚀 Publish Crop Sale Listing'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
