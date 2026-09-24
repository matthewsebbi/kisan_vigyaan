import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Plus, 
  Search, 
  MapPin, 
  PhoneCall, 
  MessageSquare, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  X, 
  ShoppingBag, 
  Filter, 
  Clock, 
  ShieldCheck, 
  Edit3, 
  Send, 
  DollarSign,
  TrendingUp,
  Package
} from 'lucide-react';
import { initialFarmerCropListings } from '../../data/marketplaceData';

export const FarmerCropSellPortal = ({ onNavigate }) => {
  const { lang, t, theme } = useApp();
  const isDark = theme === 'dark';

  // Tabs: 'browse' | 'myListings'
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Load Farmer Listings from LocalStorage or Defaults
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem('farmerProduceListings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Error parsing stored listings:', e);
      }
    }
    return initialFarmerCropListings;
  });

  // Modal State for Posting Crop Listing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    cropType: 'Soybean',
    quantity: '50 Quintals',
    price: 5200,
    priceUnit: 'per Quintal',
    grade: 'Grade-A Organic (98% Germination)',
    sellerName: 'Ramesh Patil',
    location: 'Sangli APMC, Maharashtra',
    phone: '+91 98224 55120',
    harvestDate: 'Harvested 2 days ago',
    description: 'Cleaned, sun-dried, chemical-free premium crop ready for immediate farm pickup or mandi transport.',
    image: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500&auto=format&fit=crop&q=60'
  });

  // Buying Offer Modal State (Trader/Buyer contacting Farmer)
  const [offerModalItem, setOfferModalItem] = useState(null);
  const [offerForm, setOfferForm] = useState({
    buyerName: '',
    buyerPhone: '',
    offeredPrice: '',
    requestedQty: '',
    note: 'Interested in buying your harvest. Please confirm availability.'
  });

  const cropCategories = [
    { id: 'All', labelEn: 'All Crops', labelMr: 'सर्व पिके', labelTa: 'அனைத்து பயிர்கள்' },
    { id: 'Soybean', labelEn: 'Soybean', labelMr: 'सोयाबीन', labelTa: 'சோயாபீன்' },
    { id: 'Rice', labelEn: 'Rice / Paddy', labelMr: 'तांदूळ / धान', labelTa: 'நெல்' },
    { id: 'Cotton', labelEn: 'Bt Cotton', labelMr: 'कापूस', labelTa: 'பருத்தி' },
    { id: 'Turmeric', labelEn: 'Turmeric', labelMr: 'हळद', labelTa: 'மஞ்சள்' },
    { id: 'Grapes', labelEn: 'Grapes', labelMr: 'द्राक्षे', labelTa: 'திராட்சை' },
    { id: 'Tomato', labelEn: 'Tomato', labelMr: 'टोमॅटो', labelTa: 'தக்காளி' },
    { id: 'Wheat', labelEn: 'Wheat', labelMr: 'गहू', labelTa: 'கோதுமை' },
    { id: 'Sugarcane', labelEn: 'Sugarcane', labelMr: 'ऊस', labelTa: 'கரும்பு' },
    { id: 'Chilli', labelEn: 'Chilli', labelMr: 'मिरची', labelTa: 'மிளகாய்' },
    { id: 'Onion', labelEn: 'Onion', labelMr: 'कांदा', labelTa: 'வெங்காயம்' },
    { id: 'Potato', labelEn: 'Potato', labelMr: 'बटाटा', labelTa: 'உருளைக்கிழங்கு' },
    { id: 'Other', labelEn: 'Other Produce', labelMr: 'इतर पिके', labelTa: 'இதர பயிர்கள்' }
  ];

  const presetPhotos = [
    { type: 'Soybean', url: 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500&auto=format&fit=crop&q=60' },
    { type: 'Rice', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60' },
    { type: 'Cotton', url: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60' },
    { type: 'Turmeric', url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60' },
    { type: 'Grapes', url: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=500&auto=format&fit=crop&q=60' },
    { type: 'Tomato', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=60' },
    { type: 'Wheat', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&auto=format&fit=crop&q=60' },
    { type: 'Sugarcane', url: 'https://images.unsplash.com/photo-1543257580-7269da773bf5?w=500&auto=format&fit=crop&q=60' }
  ];

  const handlePostListing = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;

    const newListing = {
      id: `user-crop-${Date.now()}`,
      name: form.name,
      nameMr: form.name,
      nameTa: form.name,
      cropType: form.cropType,
      sellerName: form.sellerName || 'Farmer Seller',
      location: form.location || 'Local Farm',
      quantity: form.quantity || '10 Quintals',
      price: Number(form.price) || 4000,
      priceUnit: form.priceUnit || 'per Quintal',
      grade: form.grade || 'Grade A Quality',
      phone: form.phone || '+91 98224 55120',
      harvestDate: form.harvestDate || 'Fresh Harvest',
      description: form.description || 'Quality produce direct from farm.',
      category: 'farmerSell',
      icon: '🌾',
      image: form.image,
      status: 'Active',
      isUserListing: true,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newListing, ...listings];
    setListings(updated);
    localStorage.setItem('farmerProduceListings', JSON.stringify(updated));

    setIsModalOpen(false);
    setActiveTab('myListings');

    showToast(lang === 'mr' ? '🎉 तुमचे पीक विक्रीसाठी प्रसिद्ध केले आहे!' : lang === 'ta' ? '🎉 உங்கள் பயிர் விற்பனை பதிவு செய்யப்பட்டது!' : '🎉 Crop listing published live for buyers!');
  };

  const handleDeleteListing = (id) => {
    const updated = listings.filter(item => item.id !== id);
    setListings(updated);
    localStorage.setItem('farmerProduceListings', JSON.stringify(updated));
    showToast(lang === 'mr' ? 'जाहिरात हटवली आहे.' : 'Listing removed.');
  };

  const handleMarkAsSold = (id) => {
    const updated = listings.map(item => item.id === id ? { ...item, status: 'Sold Out' } : item);
    setListings(updated);
    localStorage.setItem('farmerProduceListings', JSON.stringify(updated));
    showToast(lang === 'mr' ? 'पीक विकले गेले म्हणून चिन्हांकित केले!' : 'Marked as Sold Out!');
  };

  const handleSendOffer = (e) => {
    e.preventDefault();
    if (!offerForm.buyerName || !offerForm.buyerPhone) return;

    const phone = (offerModalItem.phone || '').replace(/[^0-9]/g, '');
    const text = `Hi ${offerModalItem.sellerName}, I want to buy your ${offerModalItem.name} (${offerModalItem.quantity}) listed on KISAN VIGYAAN.\n\nMy Offer:\n• Offered Price: ₹${offerForm.offeredPrice} ${offerModalItem.priceUnit}\n• Quantity: ${offerForm.requestedQty}\n• Buyer: ${offerForm.buyerName} (${offerForm.buyerPhone})\n• Note: ${offerForm.note}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
    setOfferModalItem(null);
    showToast('💬 Opening WhatsApp to connect with seller!');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered Listings
  const userListings = listings.filter(l => l.isUserListing);
  const displayListings = activeTab === 'myListings' ? userListings : listings;

  const filteredListings = displayListings.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.cropType === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      (item.name || '').toLowerCase().includes(q) ||
      (item.cropType || '').toLowerCase().includes(q) ||
      (item.sellerName || '').toLowerCase().includes(q) ||
      (item.location || '').toLowerCase().includes(q) ||
      (item.grade || '').toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-16 animate-fadeIn font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-700 text-white font-black text-xs shadow-2xl flex items-center gap-2 animate-slideUp">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header Card (Light Green Theme) */}
      <div className={`p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5 ${
        isDark 
          ? 'bg-[#091325] border-[#182a4a] text-white' 
          : 'bg-[#F0FDF4] border-emerald-200/90 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#047857] to-[#059669] text-white flex items-center justify-center text-2xl shadow-lg shrink-0">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                {lang === 'ta' ? 'விவசாயிகள் பயிர் விற்பனை சந்தை' : lang === 'mr' ? 'शेतकरी धान्य व पीक विक्री केंद्र' : lang === 'hi' ? 'किसान फसल एवं उपज बिक्री केंद्र' : 'Farmer Crop Selling & Produce Portal'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                Direct Farmer Trade
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium leading-relaxed">
              {lang === 'ta' ? 'விவசாயிகள் தங்கள் அறுவடை செய்த பயிர்களை இடைத்தரகர்கள் இன்றி நேரடியாக வியாபாரிகளிடம் விற்கலாம்' : lang === 'mr' ? 'शेतकऱ्यांनी पिकवलेले धान्य, भाजीपाला व फळे थेट व्यापाऱ्यांना व ग्राहकांना विनादलाल विक्री करा' : 'Post your harvested crops for sale directly to traders across India with zero commission'}
            </p>
          </div>
        </div>

        {/* Primary Action Button (Single Clean Plus Icon!) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white font-black text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 border border-amber-300/40 shrink-0"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>{lang === 'ta' ? 'பயிர் விற்பனை பதிவு' : lang === 'mr' ? 'पीक विक्रीसाठी टाका' : lang === 'hi' ? 'फसल बेचने के लिए जोड़ें' : 'Post Crop for Sale'}</span>
        </button>
      </div>

      {/* Navigation Sub-Tabs: Browse Marketplace vs My Active Listings */}
      <div className="flex items-center justify-between border-b border-emerald-200/60 dark:border-slate-800 pb-3 gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'browse'
                ? 'bg-[#047857] text-white shadow-md'
                : isDark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{lang === 'ta' ? `விற்பனை பயிர்கள் (${listings.length})` : lang === 'mr' ? `विक्रीसाठी उपलब्ध पिके (${listings.length})` : `All Crops for Sale (${listings.length})`}</span>
          </button>

          <button
            onClick={() => setActiveTab('myListings')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'myListings'
                ? 'bg-amber-600 text-white shadow-md'
                : isDark ? 'bg-slate-900 text-slate-400 hover:text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{lang === 'ta' ? `என் விற்பனைகள் (${userListings.length})` : lang === 'mr' ? `माझ्या पोस्ट केलेल्या जाहिराती (${userListings.length})` : `My Active Listings (${userListings.length})`}</span>
          </button>
        </div>

        {/* Total Count Badge */}
        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 hidden sm:inline-block">
          Showing {filteredListings.length} of {displayListings.length} listings
        </span>
      </div>

      {/* Category Pills & Search Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {cropCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs font-black'
                  : isDark
                  ? 'bg-[#0a1324] border border-[#182a4a] text-slate-300 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-emerald-800 shadow-2xs'
              }`}
            >
              {lang === 'ta' ? cat.labelTa : lang === 'mr' ? cat.labelMr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder={lang === 'ta' ? 'பயிர், ஊர் அல்லது விவசாயியை தேடவும்...' : 'Search crop, variety, or city...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-4 py-2 rounded-2xl text-xs font-medium focus:outline-none focus:border-emerald-500 transition-colors ${
              isDark 
                ? 'bg-[#0a1324] border border-[#182a4a] text-white placeholder-slate-500' 
                : 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400 shadow-2xs'
            }`}
          />
        </div>
      </div>

      {/* Crop Cards Grid */}
      {filteredListings.length === 0 ? (
        <div className={`p-12 text-center rounded-3xl border ${
          isDark ? 'bg-[#0a1324] border-[#182a4a] text-slate-400' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <Sprout className="w-12 h-12 mx-auto text-emerald-500 mb-3 opacity-60" />
          <h3 className="text-base font-black text-slate-900 dark:text-white">No crop listings found</h3>
          <p className="text-xs mt-1">Try adjusting your crop filter search or post a new crop listing!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 px-5 py-2.5 rounded-2xl bg-emerald-600 text-white text-xs font-black inline-flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Post First Crop Listing</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredListings.map(item => {
            const isSold = item.status === 'Sold Out';

            return (
              <div
                key={item.id}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 group ${
                  isSold
                    ? 'opacity-60 grayscale bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800'
                    : isDark
                    ? 'bg-[#09152b] border-[#1a2d52] hover:border-amber-500/50 text-white'
                    : 'bg-[#FFFBEB] hover:bg-[#FEF3C7] border-amber-200/90 text-slate-900 shadow-xs'
                }`}
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={item.image || 'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=500'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                    {/* Header Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase bg-amber-500 text-slate-950 shadow-md border border-amber-300">
                        {isSold ? 'Sold Out' : '🌾 Direct Farmer Sale'}
                      </span>

                      {item.grade && (
                        <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20">
                          {item.grade}
                        </span>
                      )}
                    </div>

                    {/* Price & Quantity Overlay */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[10px] text-amber-200 font-bold block">Asking Selling Price:</span>
                        <strong className="text-xl font-black text-amber-300 drop-shadow-md font-sans">
                          ₹{Number(item.price).toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-200">/ {item.priceUnit || 'per Qtl'}</span>
                        </strong>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm shadow-md">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="font-black text-base leading-snug text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span><strong>{item.sellerName}</strong> • {item.location}</span>
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 font-medium">
                      {item.description}
                    </p>

                    <div className="p-3 bg-white/80 dark:bg-slate-900/60 rounded-2xl border border-amber-200/80 dark:border-slate-800 text-[11px] space-y-1">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Harvest Status:</span>
                        <strong className="text-slate-900 dark:text-slate-200">{item.harvestDate || 'Fresh Harvest'}</strong>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Farmer Mobile:</span>
                        <strong className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">{item.phone}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="p-5 pt-0">
                  {item.isUserListing ? (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200 dark:border-slate-800">
                      {!isSold && (
                        <button
                          onClick={() => handleMarkAsSold(item.id)}
                          className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Sold</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteListing(item.id)}
                        className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95 col-span-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200 dark:border-slate-800">
                      <a
                        href={`tel:${(item.phone || '').replace(/[^0-9]/g, '')}`}
                        className="py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Seller</span>
                      </a>

                      <button
                        onClick={() => setOfferModalItem(item)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Buy / Offer</span>
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
      {/* POST NEW CROP MODAL FORM                                       */}
      {/* ───────────────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 relative ${
            isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-emerald-200 text-slate-900'
          }`}>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-5 border-b pb-4 border-slate-200 dark:border-slate-800">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-2xl">
                🌾
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                  {lang === 'mr' ? 'तुमचे पीक विक्रीसाठी टाका' : lang === 'ta' ? 'உங்கள் பயிரை விற்பனைக்கு சேர்க்க' : 'Post Crop Listing for Direct Sale'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Direct Farmer-to-Buyer Marketplace • Zero Middlemen Commission
                </p>
              </div>
            </div>

            <form onSubmit={handlePostListing} className="space-y-4 text-xs font-medium">
              {/* Crop Title */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Crop Listing Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                    Crop Type / Category
                  </label>
                  <select
                    value={form.cropType}
                    onChange={(e) => setForm({ ...form, cropType: e.target.value })}
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
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
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
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
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
                    value={form.priceUnit}
                    onChange={(e) => setForm({ ...form, priceUnit: e.target.value })}
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
                    value={form.grade}
                    onChange={(e) => setForm({ ...form, grade: e.target.value })}
                    placeholder="e.g. Grade A Organic (98% Germination)"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Farm Location / Mandi District *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
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
                    value={form.sellerName}
                    onChange={(e) => setForm({ ...form, sellerName: e.target.value })}
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
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98224 55120"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Sample Photo Selector */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Select Crop Sample Photo
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {presetPhotos.map((preset, pIdx) => (
                    <button
                      type="button"
                      key={pIdx}
                      onClick={() => setForm({ ...form, image: preset.url })}
                      className={`h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${
                        form.image === preset.url ? 'border-amber-500 ring-2 ring-amber-400 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.type} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white font-black text-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'mr' ? '🚀 पीक विक्रीची जाहिरात प्रकाशित करा' : lang === 'ta' ? '🚀 பயிர் விற்பனை விளம்பரம் வெளியிடவும்' : '🚀 Publish Crop Sale Listing'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* BUYER OFFER & INQUIRY MODAL                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      {offerModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 relative ${
            isDark ? 'bg-[#0a1324] border-[#182a4a] text-white' : 'bg-white border-emerald-200 text-slate-900'
          }`}>
            <button
              onClick={() => setOfferModalItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4 border-b pb-3 border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-xl">
                💬
              </div>
              <div>
                <h2 className="text-base font-black tracking-tight text-slate-900 dark:text-white">
                  Send Buying Offer to Farmer
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  {offerModalItem.name} • {offerModalItem.sellerName}
                </p>
              </div>
            </div>

            <form onSubmit={handleSendOffer} className="space-y-3 text-xs font-medium">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Your Name / Trading Company *
                </label>
                <input
                  type="text"
                  required
                  value={offerForm.buyerName}
                  onChange={(e) => setOfferForm({ ...offerForm, buyerName: e.target.value })}
                  placeholder="e.g. Sangli Grain Traders Ltd."
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Offered Price (₹)
                  </label>
                  <input
                    type="number"
                    value={offerForm.offeredPrice || offerModalItem.price}
                    onChange={(e) => setOfferForm({ ...offerForm, offeredPrice: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    Your Mobile No *
                  </label>
                  <input
                    type="text"
                    required
                    value={offerForm.buyerPhone}
                    onChange={(e) => setOfferForm({ ...offerForm, buyerPhone: e.target.value })}
                    placeholder="+91 98230 00000"
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-emerald-500 ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Message / Requirements
                </label>
                <textarea
                  rows={3}
                  value={offerForm.note}
                  onChange={(e) => setOfferForm({ ...offerForm, note: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none focus:border-emerald-500 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Offer via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
