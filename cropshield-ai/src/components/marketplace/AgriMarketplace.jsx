import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  marketplaceProducts, 
  mspReferenceData, 
  indianBanksList 
} from '../../data/marketplaceData';
import { 
  fertilizerProducts, 
  nearestFertilizerShops 
} from '../../data/extendedMockData';
import { CheckoutModal } from './CheckoutModal';
import { 
  ShoppingBag, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  Search, 
  CheckCircle2, 
  Download, 
  Printer, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Landmark, 
  Banknote, 
  Wheat, 
  Scale, 
  FileText, 
  X, 
  MapPin, 
  Phone, 
  Tag, 
  Eye,
  Sparkles,
  Check,
  FlaskConical,
  Sprout,
  Store,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AgriMarketplace = () => {
  const { 
    lang, 
    farmerProfile, 
    cart, 
    addToCart, 
    removeFromCart, 
    updateCartQty, 
    clearCart,
    wishlist, 
    toggleWishlist, 
    orders, 
    placeOrder, 
    farmerCropListings, 
    addCropListing,
    openDirectCheckout,
    setIsCartModalOpen
  } = useApp();

  // Active Main Tab: 'fertilizers' | 'seeds' | 'sell' | 'shops' | 'orders' | 'wishlist'
  const [activeTab, setActiveTab] = useState('fertilizers');
  
  // Fertilizers Sub-filter: 'all' | 'commercial' | 'govt' | 'bio'
  const [fertSubFilter, setFertSubFilter] = useState('all');
  
  // Seeds/Pesticides Sub-filter: 'all' | 'seeds' | 'pesticides'
  const [seedSubFilter, setSeedSubFilter] = useState('all');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Direct checkout modal state
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [directCheckoutItem, setDirectCheckoutItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [claimedVoucher, setClaimedVoucher] = useState(null);

  // Quantities for fertilizer catalog
  const [quantities, setQuantities] = useState({
    'fert-1': 1, 'fert-2': 1, 'fert-3': 1, 'fert-4': 1, 'fert-5': 1, 'fert-6': 1
  });

  // Sell Produce Form State
  const [sellForm, setSellForm] = useState({
    crop: 'Tomato',
    variety: 'Abhinav F1',
    quantityQuintals: '',
    expectedPricePerQtl: '',
    qualityGrade: 'Grade A (Export / Super Market)',
    moisturePercent: '12%',
    district: farmerProfile?.location || 'Sangli, Maharashtra',
    apmcMandi: 'Sangli Krishi Utpanna Bazar Samiti',
    phone: farmerProfile?.phone || '+91 98224 55120',
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=600&q=80'
  });
  const [sellSubmitted, setSellSubmitted] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleInstantBuy = (product) => {
    openDirectCheckout(product);
  };

  const handleAddToCartWithToast = (product, qty = 1) => {
    addToCart(product, qty);
    setIsCartModalOpen(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
  };

  const handleClaimSubsidy = (item) => {
    setClaimedVoucher(item);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
  };

  const handleQuantityDelta = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      return { ...prev, [id]: Math.max(1, current + delta) };
    });
  };

  const cartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 1), 0);
  const cartPrice = (cart || []).reduce((sum, item) => sum + ((item.price || item.product?.price || 0) * (item.quantity || 1)), 0);

  // Filtered Fertilizers List (Combines marketplaceData & extendedMockData)
  const allFertilizers = [
    ...marketplaceProducts.filter(p => p.category === 'fertilizers'),
    ...fertilizerProducts.map(p => ({
      id: p.id,
      name: p.name,
      category: 'fertilizers',
      brand: p.company,
      price: p.subsidizedPrice,
      mrp: p.mrpWithoutSubsidy || p.subsidizedPrice + (p.subsidyAmount || 300),
      packSize: p.priceUnit,
      nutrientComposition: p.type,
      dosage: p.dosageGuidelines,
      description: p.description,
      image: p.image,
      govSubsidized: Boolean(p.subsidyAmount && p.subsidyAmount > 0),
      subsidyDiscount: p.subsidyAmount || (p.mrpWithoutSubsidy ? p.mrpWithoutSubsidy - p.subsidizedPrice : 0),
      rating: p.rating,
      stockBags: p.stockBags || 150
    }))
  ];

  const filteredFertilizers = allFertilizers.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.nutrientComposition.toLowerCase().includes(searchQuery.toLowerCase());
    if (fertSubFilter === 'commercial') return matchesSearch && !f.govSubsidized;
    if (fertSubFilter === 'govt') return matchesSearch && f.govSubsidized;
    if (fertSubFilter === 'bio') return matchesSearch && (f.nutrientComposition.includes('ORGANIC') || f.nutrientComposition.includes('Bio'));
    return matchesSearch;
  });

  // Filtered Seeds & Pesticides
  const seedsAndProtection = marketplaceProducts.filter(p => p.category === 'seeds' || p.category === 'pesticides');
  const filteredSeeds = seedsAndProtection.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (seedSubFilter === 'seeds') return matchesSearch && p.category === 'seeds';
    if (seedSubFilter === 'pesticides') return matchesSearch && p.category === 'pesticides';
    return matchesSearch;
  });

  const handleSellSubmit = (e) => {
    e.preventDefault();
    if (!sellForm.quantityQuintals || !sellForm.expectedPricePerQtl) return;

    addCropListing({
      crop: sellForm.crop,
      variety: sellForm.variety,
      quantityQuintals: Number(sellForm.quantityQuintals),
      expectedPricePerQtl: Number(sellForm.expectedPricePerQtl),
      qualityGrade: sellForm.qualityGrade,
      moisturePercent: sellForm.moisturePercent,
      district: sellForm.district,
      apmcMandi: sellForm.apmcMandi,
      phone: sellForm.phone,
      image: sellForm.image
    });

    setSellSubmitted(true);
    setTimeout(() => setSellSubmitted(false), 4000);
  };

  const handlePrintReceipt = (order) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const itemsRows = order.items.map((item, idx) => 
      '<tr>' +
        '<td>' + (idx + 1) + '</td>' +
        '<td><strong>' + item.name + '</strong></td>' +
        '<td>' + item.brand + '</td>' +
        '<td>' + item.qty + '</td>' +
        '<td>₹' + Number(item.mrp || item.price).toFixed(2) + '</td>' +
        '<td style="color: #16a34a;">-₹' + (((item.subsidyDiscount || 0) * item.qty)).toFixed(2) + '</td>' +
        '<td>₹' + Number(item.price).toFixed(2) + '</td>' +
        '<td><strong>₹' + ((item.price * item.qty)).toFixed(2) + '</strong></td>' +
      '</tr>'
    ).join('');

    const invoiceHtml = 
      '<!DOCTYPE html>' +
      '<html>' +
      '<head>' +
        '<title>KISAN VIGYAAN - Tax Invoice & Payment Receipt (' + order.orderId + ')</title>' +
        '<style>' +
          'body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; background: #fff; line-height: 1.5; }' +
          '.header { display: flex; justify-content: space-between; border-bottom: 2px solid #0284c7; padding-bottom: 20px; margin-bottom: 25px; }' +
          '.brand { font-size: 24px; font-weight: 800; color: #0284c7; }' +
          '.badge { background: #dcfce7; color: #15803d; padding: 4px 12px; border-radius: 12px; font-weight: bold; font-size: 12px; display: inline-block; border: 1px solid #86efac; }' +
          '.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }' +
          '.box { background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px; }' +
          'table { width: 100%; border-collapse: collapse; margin: 25px 0; font-size: 13px; }' +
          'th, td { padding: 10px 12px; border: 1px solid #cbd5e1; text-align: left; }' +
          'th { background: #f1f5f9; color: #334155; font-weight: 700; }' +
          '.total-box { float: right; width: 320px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; font-size: 14px; }' +
          '.grand-total { font-size: 18px; font-weight: bold; color: #0f172a; border-top: 2px solid #0284c7; padding-top: 8px; margin-top: 8px; }' +
          '.savings { color: #16a34a; font-weight: bold; }' +
          '.footer { clear: both; margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }' +
          '.seal { float: right; border: 2px solid #16a34a; color: #16a34a; padding: 10px 18px; border-radius: 8px; font-weight: 900; transform: rotate(-5deg); text-transform: uppercase; font-size: 14px; margin-top: 15px; }' +
        '</style>' +
      '</head>' +
      '<body>' +
        '<div class="header">' +
          '<div>' +
            '<div class="brand">🌾 KISAN VIGYAAN Farmer Marketplace</div>' +
            '<div style="font-size: 12px; color: #64748b;">Government of India & State Agriculture Department Authorized Supply Portal</div>' +
            '<div style="font-size: 12px; color: #64748b;">GSTIN: 27AABCC8942K1Z8 • KVK District Fulfillment Hub</div>' +
          '</div>' +
          '<div style="text-align: right;">' +
            '<div class="badge">PAID & VERIFIED</div>' +
            '<div style="font-size: 14px; font-weight: bold; margin-top: 5px;">TAX INVOICE / RECEIPT</div>' +
            '<div style="font-size: 12px; color: #64748b;">Invoice #: ' + order.orderId + '</div>' +
            '<div style="font-size: 12px; color: #64748b;">Date: ' + order.date + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="grid-2">' +
          '<div class="box">' +
            '<strong style="color: #0284c7;">Billed & Delivered To (Farmer):</strong><br/>' +
            '<strong>' + order.farmerName + '</strong><br/>' +
            'Phone: ' + order.phone + '<br/>' +
            'Address: ' + order.address + '<br/>' +
            'Kisan ID: MH-SGL-849201' +
          '</div>' +
          '<div class="box">' +
            '<strong style="color: #0284c7;">Dispatch & Delivery Information:</strong><br/>' +
            '<strong>Guaranteed Delivery Date: ' + order.estimatedDelivery + '</strong><br/>' +
            'Dispatch Hub: Krishi Vigyan Kendra (KVK) Central Store, Sangli<br/>' +
            'Tracking No: ' + order.trackingNumber + '<br/>' +
            'Payment Mode: ' + order.paymentMethod + '<br/>' +
            'Txn Ref: ' + order.transactionId +
          '</div>' +
        '</div>' +
        '<table>' +
          '<thead>' +
            '<tr><th>#</th><th>Item Description</th><th>Brand</th><th>Qty</th><th>MRP Rate</th><th>Subsidy Saved</th><th>Net Unit Price</th><th>Total Amount</th></tr>' +
          '</thead>' +
          '<tbody>' + itemsRows + '</tbody>' +
        '</table>' +
        '<div class="seal">OFFICIAL DBT PAID<br/><span style="font-size: 10px; font-weight: normal;">Govt Subsidized Rate</span></div>' +
        '<div class="total-box">' +
          '<div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Subtotal (MRP Value):</span><span>₹' + Number(order.subtotal).toFixed(2) + '</span></div>' +
          '<div style="display: flex; justify-content: space-between; margin-bottom: 4px;" class="savings"><span>Direct Govt. Subsidy Saved:</span><span>-₹' + Number(order.subsidySavings).toFixed(2) + '</span></div>' +
          '<div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>GST (5% Agricultural rate):</span><span>₹' + Number(order.gst).toFixed(2) + '</span></div>' +
          '<div style="display: flex; justify-content: space-between; margin-bottom: 4px;"><span>Farm Gate Delivery Charge:</span><span>' + (order.deliveryFee === 0 ? '<strong style="color: #16a34a;">FREE</strong>' : '₹' + Number(order.deliveryFee).toFixed(2)) + '</span></div>' +
          '<div class="grand-total" style="display: flex; justify-content: space-between;"><span>Total Paid (INR):</span><span>₹' + Number(order.total).toFixed(2) + '</span></div>' +
        '</div>' +
        '<div class="footer">This is a computer-generated tax invoice authorized under the National Fertilizer & Seed Distribution Framework.<br/>Toll-Free Helpline: <strong>1800-180-1551</strong></div>' +
      '</body>' +
      '</html>';

    printWindow.document.write(invoiceHtml);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <div className="space-y-6 relative pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner & Unified Marketplace Navigation */}
      <div className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#18263f] pb-5">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-white tracking-tight">
                  {lang === 'mr' ? 'शेतकरी कृषी बाजार (Farmer Marketplace)' : lang === 'hi' ? 'किसान बाज़ार एवं मंडी' : 'Farmer Marketplace'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Unified Agri Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {lang === 'mr' 
                  ? 'सरकारी अनुदानित खते, प्रमाणित बियाणे, औषधे, नजीकची दुकाने व थेट शेतकरी मंडी (MSP)'
                  : 'Subsidized Fertilizers, Certified Hybrid Seeds, Crop Protection, Nearest Dealer Outlets & Farmer Mandi at Fair MSP'}
              </p>
            </div>
          </div>

          {/* Unified Navigation Tabs */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('fertilizers')}
              className={'flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ' + (
                activeTab === 'fertilizers'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_14px_rgba(16,185,129,0.35)]'
                  : 'bg-[#0f1d38] text-slate-300 hover:text-white border border-[#203254]'
              )}
            >
              <FlaskConical className="w-4 h-4" />
              <span>{lang === 'mr' ? 'खते व सबसिडी' : 'Fertilizers & Subsidies'}</span>
            </button>

            <button
              onClick={() => setActiveTab('seeds')}
              className={'flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ' + (
                activeTab === 'seeds'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_14px_rgba(6,182,212,0.35)]'
                  : 'bg-[#0f1d38] text-slate-300 hover:text-white border border-[#203254]'
              )}
            >
              <Sprout className="w-4 h-4" />
              <span>{lang === 'mr' ? 'बियाणे व औषधे' : 'Seeds & Protection'}</span>
            </button>

            <button
              onClick={() => setActiveTab('sell')}
              className={'flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ' + (
                activeTab === 'sell'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_14px_rgba(245,158,11,0.35)]'
                  : 'bg-[#0f1d38] text-slate-300 hover:text-white border border-[#203254]'
              )}
            >
              <Wheat className="w-4 h-4" />
              <span>{lang === 'mr' ? 'पीक विक्री (मंडी)' : 'Sell Crops (Mandi)'}</span>
            </button>

            <button
              onClick={() => setActiveTab('shops')}
              className={'flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ' + (
                activeTab === 'shops'
                  ? 'bg-teal-500 text-slate-950 shadow-[0_0_14px_rgba(20,184,166,0.35)]'
                  : 'bg-[#0f1d38] text-slate-300 hover:text-white border border-[#203254]'
              )}
            >
              <Store className="w-4 h-4" />
              <span>{lang === 'mr' ? 'नजीकची दुकाने (PACS)' : 'Nearest Shops (PACS)'}</span>
            </button>

            <button
              onClick={() => { setDirectCheckoutItem(null); setIsCartModalOpen(true); }}
              className="relative flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all bg-[#0f1d38] hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/40 shadow-xs"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{lang === 'mr' ? 'कार्ट' : 'Cart'}</span>
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-emerald-500 text-slate-950 text-[10px] font-black rounded-full shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={'flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ' + (
                activeTab === 'orders'
                  ? 'bg-purple-500 text-white shadow-[0_0_14px_rgba(168,85,247,0.35)]'
                  : 'bg-[#0f1d38] text-slate-300 hover:text-white border border-[#203254]'
              )}
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'mr' ? 'पावत्या' : 'Receipts'}</span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              className={'flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ' + (
                activeTab === 'wishlist'
                  ? 'bg-rose-500 text-white shadow-[0_0_14px_rgba(244,63,94,0.35)]'
                  : 'bg-[#0f1d38] text-slate-300 hover:text-white border border-[#203254]'
              )}
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            </button>
          </div>
        </div>

        {/* Live MSP Ticker Bar */}
        <div className="mt-4 pt-3 flex items-center justify-between overflow-x-auto text-[11px] gap-4 scrollbar-none text-slate-300">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 shrink-0">
            <Scale className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'हमीभाव संदर्भ (MSP Index):' : 'Official MSP Rates:'}</span>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            {mspReferenceData.slice(0, 6).map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5 bg-[#0d182e] px-2.5 py-1 rounded-lg border border-[#1e2f4d]">
                <span className="font-medium text-slate-200">{item.crop}:</span>
                <span className="font-extrabold text-emerald-400">₹{item.msp}</span>
                <span className="text-[9px] text-slate-500">/Qtl</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Claimed Token Popup Banner */}
      {claimedVoucher && (
        <div className="p-4 bg-gradient-to-r from-emerald-950/90 to-teal-950/90 border-2 border-emerald-400/60 rounded-2xl shadow-xl flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl font-black text-base">
              ✓
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-emerald-300">
                DBT Subsidy Voucher Token #MAHA-DBT-{Date.now().toString().slice(-6)} Generated!
              </h4>
              <p className="text-slate-200 mt-0.5">
                Present this official token at your local Kupwad Panchayat PACS or Kisan Agro Seva Kendra to claim <strong>{claimedVoucher.name}</strong> at subsidized DBT rate.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setClaimedVoucher(null)}
            className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-950 font-bold rounded-xl text-xs transition-colors"
          >
            Done
          </button>
        </div>
      )}

      {/* TAB 1: FERTILIZERS & SUBSIDIES */}
      {activeTab === 'fertilizers' && (
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-[#0b1528] border border-[#1e2f4d] p-3.5 rounded-2xl">
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: lang === 'mr' ? 'सर्व खते' : 'All Fertilizers' },
                { id: 'govt', label: lang === 'mr' ? 'सरकारी अनुदानित खते (DBT)' : 'Govt Subsidized (DBT)' },
                { id: 'commercial', label: lang === 'mr' ? 'व्यावसायिक ग्रेड खते' : 'Commercial Grade' },
                { id: 'bio', label: lang === 'mr' ? 'सेंद्रिय व जैविक (Bio-NPK)' : 'Bio & Organic' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFertSubFilter(tab.id)}
                  className={'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ' + (
                    fertSubFilter === tab.id
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-xs'
                      : 'bg-[#0f1d38] text-slate-400 hover:text-white border border-[#203254]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={lang === 'mr' ? 'खते शोधा (Urea, DAP)...' : 'Search fertilizer (Urea, DAP)...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#0d182e] border border-[#203254] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0d182e] border border-[#203254] text-xs text-slate-300 font-semibold px-3 py-1.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="popular">Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFertilizers.map(product => {
              const inWishlist = (wishlist || []).includes(product.id);
              const cartItem = (cart || []).find(x => x.product.id === product.id);
              const qty = quantities[product.id] || 1;
              const totalPrice = product.price * qty;

              return (
                <div 
                  key={product.id}
                  className="bg-[#0b1528] border border-[#1e2f4d] hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative h-44 bg-[#070e1e] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />

                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      {product.govSubsidized && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {lang === 'mr' ? 'अनुदानित दर' : 'DBT Subsidized'}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/85 text-emerald-300 border border-emerald-500/30 backdrop-blur-xs">
                        {product.brand}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-rose-400 border border-slate-700 backdrop-blur-xs transition-colors"
                    >
                      <Heart className={'w-4 h-4 ' + (inWishlist ? 'text-rose-500 fill-rose-500' : '')} />
                    </button>

                    <button
                      onClick={() => setSelectedProductModal(product)}
                      className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-emerald-500 text-slate-300 hover:text-slate-950 text-[10px] font-bold border border-slate-700 backdrop-blur-xs transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{lang === 'mr' ? 'माहिती' : 'Details'}</span>
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {product.packSize}
                      </p>
                    </div>

                    <div className="bg-[#070e1e] p-2 rounded-xl border border-[#16233b] text-[11px] text-slate-300 space-y-0.5">
                      <div className="text-[10px] text-slate-400 font-semibold truncate">
                        Composition: {product.nutrientComposition}
                      </div>
                      {product.stockBags && (
                        <div className="text-[10px] text-cyan-400 font-bold">
                          Live Stock: {product.stockBags} bags available at KVK Hub
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-[#18263f] space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-black text-emerald-400">
                              ₹{Number(product.price).toFixed(2)}
                            </span>
                            {product.mrp > product.price && (
                              <span className="text-[11px] text-slate-500 line-through">
                                ₹{Number(product.mrp).toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.subsidyDiscount > 0 && (
                            <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                              <Tag className="w-2.5 h-2.5" />
                              <span>Save ₹{product.subsidyDiscount.toFixed(0)} Subsidy</span>
                            </div>
                          )}
                        </div>

                        {cartItem && (
                          <div className="flex items-center bg-emerald-500/15 border border-emerald-500/40 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQty(product.id, -1)}
                              className="p-1 text-emerald-300 hover:bg-emerald-500/30 rounded transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1.5 text-xs font-black text-emerald-300">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQty(product.id, 1)}
                              className="p-1 text-emerald-300 hover:bg-emerald-500/30 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddToCartWithToast(product, 1)}
                          className="py-2 px-2 bg-[#0f1d38] hover:bg-[#15274b] text-emerald-300 hover:text-white border border-[#203254] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{lang === 'mr' ? 'कार्टमध्ये टाका' : 'Add to Cart'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleInstantBuy(product)}
                          className="py-2 px-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{lang === 'mr' ? 'थेट खरेदी करा' : 'Buy Now'}</span>
                        </button>
                      </div>

                      {product.govSubsidized && (
                        <button
                          type="button"
                          onClick={() => handleClaimSubsidy(product)}
                          className="w-full py-1 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          <span>Pre-Book DBT Subsidy Token</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SEEDS & CROP PROTECTION */}
      {activeTab === 'seeds' && (
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-[#0b1528] border border-[#1e2f4d] p-3.5 rounded-2xl">
            <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: lang === 'mr' ? 'सर्व बियाणे व औषधे' : 'All Seeds & Protection' },
                { id: 'seeds', label: lang === 'mr' ? 'प्रमाणित संकरित बियाणे (Seeds)' : 'Certified Hybrid Seeds' },
                { id: 'pesticides', label: lang === 'mr' ? 'कीटकनाशके व बुरशीनाशके' : 'Pesticides & Fungicides' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSeedSubFilter(tab.id)}
                  className={'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ' + (
                    seedSubFilter === tab.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-xs'
                      : 'bg-[#0f1d38] text-slate-400 hover:text-white border border-[#203254]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 md:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder={lang === 'mr' ? 'बियाणे, औषधे शोधा...' : 'Search seeds, pesticides...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#0d182e] border border-[#203254] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0d182e] border border-[#203254] text-xs text-slate-300 font-semibold px-3 py-1.5 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="popular">Popularity</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredSeeds.map(product => {
              const inWishlist = (wishlist || []).includes(product.id);
              const cartItem = (cart || []).find(x => x.product.id === product.id);

              return (
                <div 
                  key={product.id}
                  className="bg-[#0b1528] border border-[#1e2f4d] hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative h-44 bg-[#070e1e] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />

                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/85 text-cyan-300 border border-cyan-500/30 backdrop-blur-xs">
                        {product.brand}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2.5 right-2.5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-slate-300 hover:text-rose-400 border border-slate-700 backdrop-blur-xs transition-colors"
                    >
                      <Heart className={'w-4 h-4 ' + (inWishlist ? 'text-rose-500 fill-rose-500' : '')} />
                    </button>

                    <button
                      onClick={() => setSelectedProductModal(product)}
                      className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-slate-950/80 hover:bg-cyan-500 text-slate-300 hover:text-slate-950 text-[10px] font-bold border border-slate-700 backdrop-blur-xs transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      <span>{lang === 'mr' ? 'माहिती' : 'Details'}</span>
                    </button>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                        {lang === 'mr' && product.nameMr ? product.nameMr : product.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {product.packSize}
                      </p>
                    </div>

                    <div className="bg-[#070e1e] p-2 rounded-xl border border-[#16233b] text-[11px] text-slate-300 space-y-0.5">
                      <div className="text-[10px] text-slate-400 font-semibold truncate">
                        {product.nutrientComposition}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#18263f] space-y-2.5">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-black text-emerald-400">
                              ₹{Number(product.price).toFixed(2)}
                            </span>
                            {product.mrp > product.price && (
                              <span className="text-[11px] text-slate-500 line-through">
                                ₹{Number(product.mrp).toFixed(2)}
                              </span>
                            )}
                          </div>
                          {product.subsidyDiscount > 0 && (
                            <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-0.5">
                              <Tag className="w-2.5 h-2.5" />
                              <span>Save ₹{product.subsidyDiscount.toFixed(0)}</span>
                            </div>
                          )}
                        </div>

                        {cartItem && (
                          <div className="flex items-center bg-cyan-500/15 border border-cyan-500/40 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQty(product.id, -1)}
                              className="p-1 text-cyan-300 hover:bg-cyan-500/30 rounded transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-1.5 text-xs font-black text-cyan-300">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQty(product.id, 1)}
                              className="p-1 text-cyan-300 hover:bg-cyan-500/30 rounded transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleAddToCartWithToast(product, 1)}
                          className="py-2 px-2 bg-[#0f1d38] hover:bg-[#15274b] text-cyan-300 hover:text-white border border-[#203254] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{lang === 'mr' ? 'कार्टमध्ये टाका' : 'Add to Cart'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleInstantBuy(product)}
                          className="py-2 px-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{lang === 'mr' ? 'थेट खरेदी करा' : 'Buy Now'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SELL PRODUCE (MANDI) */}
      {activeTab === 'sell' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#18263f] pb-3 mb-4">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-base text-white">
                      {lang === 'mr' ? 'आपले पीक विक्रीसाठी नोंदवा' : 'List Harvested Produce for Sale'}
                    </h2>
                    <p className="text-xs text-slate-400">
                      {lang === 'mr' ? 'थेट व्यापारी व सरकारी खरेदी केंद्रांशी जोडले जा' : 'Connect directly with certified bulk buyers, mills, and APMC traders'}
                    </p>
                  </div>
                </div>

                {sellSubmitted && (
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold animate-pulse">
                    ✓ Listing Published Live!
                  </span>
                )}
              </div>

              <form onSubmit={handleSellSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {lang === 'mr' ? 'पिकाचे नाव (Crop Name)' : 'Crop Name'}
                    </label>
                    <select
                      value={sellForm.crop}
                      onChange={(e) => setSellForm({ ...sellForm, crop: e.target.value })}
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-amber-500"
                    >
                      {['Tomato', 'Wheat', 'Rice (Paddy)', 'Cotton', 'Soybean', 'Maize', 'Chilli', 'Potato', 'Groundnut', 'Mustard', 'Onion'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {lang === 'mr' ? 'वाण / प्रकार (Variety)' : 'Variety / Hybrid Name'}
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Abhinav F1, Pusa 1121, HD-3086"
                      value={sellForm.variety}
                      onChange={(e) => setSellForm({ ...sellForm, variety: e.target.value })}
                      required
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {lang === 'mr' ? 'उपलब्ध प्रमाण (Quintals)' : 'Available Quantity (Quintals)'}
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 50 Quintals"
                      value={sellForm.quantityQuintals}
                      onChange={(e) => setSellForm({ ...sellForm, quantityQuintals: e.target.value })}
                      required
                      min="1"
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {lang === 'mr' ? 'अपेक्षित दर (₹ / क्विंटल)' : 'Expected Price (₹ / Quintal)'}
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 2150"
                      value={sellForm.expectedPricePerQtl}
                      onChange={(e) => setSellForm({ ...sellForm, expectedPricePerQtl: e.target.value })}
                      required
                      min="100"
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {lang === 'mr' ? 'गुणवत्ता प्रत (Quality Grade)' : 'Quality Grade'}
                    </label>
                    <select
                      value={sellForm.qualityGrade}
                      onChange={(e) => setSellForm({ ...sellForm, qualityGrade: e.target.value })}
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-amber-500"
                    >
                      <option value="Grade A (Export / Super Market)">Grade A (Export / Super Market)</option>
                      <option value="Grade B (Fair Average Quality - FAQ)">Grade B (Fair Average Quality - FAQ)</option>
                      <option value="Grade C (Processing Grade)">Grade C (Processing Grade)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      {lang === 'mr' ? 'मंडी / पिकअप ठिकाण' : 'Mandi Yard / Farm Pickup'}
                    </label>
                    <input
                      type="text"
                      value={sellForm.apmcMandi}
                      onChange={(e) => setSellForm({ ...sellForm, apmcMandi: e.target.value })}
                      required
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <Wheat className="w-4 h-4" />
                    <span>{lang === 'mr' ? 'मंडीमध्ये विक्रीसाठी प्रकाशित करा' : 'Publish Crop to Mandi Board'}</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Active Mandi Listings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  <span>{lang === 'mr' ? 'थेट चालू मंडी सौदे' : 'Live Farmer Mandi Listings'}</span>
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-[10px] font-bold">
                    {(farmerCropListings || []).length} Active
                  </span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(farmerCropListings || []).map(listing => (
                  <div 
                    key={listing.id}
                    className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={listing.image} 
                          alt={listing.crop} 
                          className="w-12 h-12 rounded-xl object-cover border border-[#1e2f4d]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm text-white">{listing.crop}</h4>
                            <span className="px-2 py-0.2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-md">
                              {listing.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400">{listing.variety}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-amber-400">₹{listing.expectedPricePerQtl}</div>
                        <div className="text-[10px] text-slate-500">/ Quintal</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-[#070e1e] p-2.5 rounded-xl border border-[#16233b] text-[11px]">
                      <div>
                        <span className="text-slate-500">Quantity:</span>
                        <div className="font-bold text-white">{listing.quantityQuintals} Quintals</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Grade:</span>
                        <div className="font-bold text-slate-200 truncate">{listing.qualityGrade}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Location:</span>
                        <div className="font-medium text-slate-300 truncate">{listing.district}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Buyer Bids:</span>
                        <div className="font-bold text-emerald-400">{listing.bidsReceived} Offers (Top: ₹{listing.highestBid})</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[11px] text-slate-400">Seller: <strong>{listing.farmerName}</strong></span>
                      <a 
                        href={'tel:' + listing.phone}
                        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl font-bold transition-colors flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Contact Buyer</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-4 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-[#18263f] pb-3 mb-3">
                <Scale className="w-4 h-4 text-amber-400" />
                <h3 className="font-extrabold text-sm text-white">
                  {lang === 'mr' ? 'सरकारी हमीभाव संदर्भ (MSP Index)' : 'Government MSP Reference Index'}
                </h3>
              </div>

              <p className="text-[11px] text-slate-400 mb-3">
                {lang === 'mr'
                  ? 'शेतकऱ्यांना योग्य भाव मिळण्यासाठी कृषी मूल्य आयोगाचे (CACP) अधिकृत किमान हमीभाव'
                  : 'Official statutory Minimum Support Prices to protect farmers against distress selling.'}
              </p>

              <div className="space-y-2 overflow-y-auto max-h-96 pr-1">
                {mspReferenceData.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-[#070e1e] border border-[#16233b] hover:border-amber-500/30 p-2.5 rounded-xl flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="font-bold text-xs text-white">{item.crop}</div>
                      <div className="text-[10px] text-slate-500">{item.season} • {item.govtBody}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-amber-400">₹{item.msp}</div>
                      <div className="text-[9px] text-slate-400">{item.unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-950/40 to-slate-900 border border-cyan-500/30 p-4 rounded-2xl">
              <div className="flex items-center space-x-2 text-cyan-300 font-extrabold text-xs mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>e-NAM & PACS Direct Settlement</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                All crop sales through CropShield Mandi are linked to e-NAM digital clearing. Payments are directly credited to the farmer's verified bank account within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: NEAREST OUTLETS & PACS (PRIVATE VS GOVT) */}
      {activeTab === 'shops' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#0a1426] border border-[#192b4a] rounded-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Nearest Fertilizer & Agri-Input Outlets in Sangli & Miraj
                </h3>
                <p className="text-xs text-slate-400">
                  Compare Licensed Private Agro-Dealers vs Authorized Government Subsidized Co-operative Points (PACS / IFFCO e-Bazar)
                </p>
              </div>
            </div>

            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold rounded-xl hidden sm:inline">
              📍 6 Outlets Located Near Your Farm Plot
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* COLUMN 1: PRIVATE SECTOR SHOPS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>
                  <h3 className="text-base font-black text-white">
                    🏢 Private Licensed Fertilizer Dealers
                  </h3>
                </div>
                <span className="text-xs font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-lg">
                  Private Agro Centers
                </span>
              </div>

              {nearestFertilizerShops.privateSector.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-[#091122] border border-[#162744] hover:border-cyan-500/40 rounded-2xl p-4 shadow-md space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{shop.name}</h4>
                      <p className="text-xs text-slate-400 font-medium">{shop.owner}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-black rounded-xl">
                      {shop.distance}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{shop.address}</span>
                  </p>

                  <div className="p-2.5 bg-[#060c18] border border-slate-800 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span><strong>License No:</strong> {shop.licenseNo}</span>
                      <span className="text-emerald-400 font-bold">{shop.status}</span>
                    </div>
                    <p className="text-cyan-300 font-medium pt-1 border-t border-slate-800/80">
                      {shop.liveStock}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {shop.authorizedBrands.map((b, idx) => (
                      <span key={idx} className="text-[10px] font-semibold text-slate-300 bg-[#0c1628] border border-slate-700 px-2 py-0.5 rounded-md">
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <a
                      href={`tel:${shop.phone}`}
                      className="flex-1 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Dealer
                    </a>
                    <button
                      type="button"
                      onClick={() => alert(`Opening GPS navigation to ${shop.name}`)}
                      className="px-3 py-2 bg-[#0e1c35] hover:bg-[#152a4e] border border-[#203c6e] text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Route
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* COLUMN 2: GOVERNMENT SECTOR OUTLETS & PACS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h3 className="text-base font-black text-white">
                    🏛️ Government Subsidized Outlets & PACS
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                  Govt DBT Authorized
                </span>
              </div>

              {nearestFertilizerShops.governmentSector.map((shop) => (
                <div
                  key={shop.id}
                  className="bg-[#081524] border-2 border-emerald-500/30 hover:border-emerald-400/60 rounded-2xl p-4 shadow-md space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        {shop.name}
                      </h4>
                      <p className="text-xs text-emerald-400 font-semibold">{shop.sector}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black rounded-xl">
                      {shop.distance}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{shop.address}</span>
                  </p>

                  <div className="p-2.5 bg-[#040d18] border border-emerald-900/60 rounded-xl space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-300">
                      <span><strong>Govt Node Code:</strong> {shop.govtCode}</span>
                      <span className="text-cyan-300 font-bold">{shop.subsidyMode}</span>
                    </div>
                    <p className="text-emerald-300 font-bold pt-1 border-t border-slate-800">
                      Official Quota: {shop.officialQuotaPrice}
                    </p>
                    <p className="text-slate-300 text-[11px]">
                      {shop.liveStock}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleClaimSubsidy({ name: shop.name, subsidizedPrice: 267 })}
                      className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Tag className="w-3.5 h-3.5" /> Pre-Book DBT Token
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Connecting to ${shop.name} Officer: ${shop.officerInCharge}`)}
                      className="px-3 py-2 bg-[#071f19] hover:bg-[#0c3127] border border-emerald-600/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Officer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MY ORDERS & RECEIPTS HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#18263f] pb-3">
            <div>
              <h2 className="font-extrabold text-base text-white">
                {lang === 'mr' ? 'माझ्या ऑर्डर्स व शासकीय पावत्या' : 'My Orders & Official Tax Receipts'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'mr' ? 'सर्व खते, बियाणे व औषध खरेदीच्या अधिकृत पावत्या डाउनलोड करा' : 'Download GST Tax Invoices and proof of payment for all purchases'}
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {(orders || []).map(order => (
              <div 
                key={order.orderId}
                className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-5 space-y-4 shadow-md hover:border-cyan-500/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#18263f] pb-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-sm text-cyan-300">{order.orderId}</span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md text-[10px] font-bold">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Ordered on: {order.date} • Txn: {order.transactionId}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePrintReceipt(order)}
                      className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Download Receipt (PDF)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="bg-[#070e1e] p-2.5 rounded-xl border border-[#16233b] text-xs">
                      <div className="font-bold text-white truncate">{item.name}</div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                        <span>Qty: <strong>{item.qty}</strong></span>
                        <span className="font-bold text-emerald-400">₹{(Number(item.price) * item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 pt-1 gap-2 border-t border-[#18263f]">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Guaranteed Delivery Date: <strong className="text-white">{order.estimatedDelivery}</strong></span>
                  </div>
                  <div>
                    <span>Total Paid: </span>
                    <strong className="text-sm text-emerald-400 font-mono">₹{Number(order.total).toFixed(2)}</strong> ({order.paymentMethod})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: SAVED WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#18263f] pb-3">
            <h2 className="font-extrabold text-base text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              <span>{lang === 'mr' ? 'माझी आवडती उत्पादने (Wishlist)' : 'Saved Items & Favorites'} ({(wishlist || []).length})</span>
            </h2>
          </div>

          {(wishlist || []).length === 0 ? (
            <div className="text-center py-12 bg-[#0b1528] rounded-2xl border border-[#1e2f4d] space-y-3">
              <Heart className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400 font-bold">No saved items yet.</p>
              <button
                type="button"
                onClick={() => setActiveTab('fertilizers')}
                className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Browse Marketplace
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketplaceProducts.filter(p => (wishlist || []).includes(p.id)).map(product => (
                <div key={product.id} className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl p-4 flex gap-3.5 items-center justify-between">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white truncate">{product.name}</h4>
                    <div className="text-[10px] text-slate-400">{product.brand}</div>
                    <div className="font-extrabold text-sm text-emerald-400 mt-1">₹{Number(product.price).toFixed(2)}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleInstantBuy(product)}
                    className="px-3 py-1.5 bg-emerald-500 text-slate-950 rounded-xl font-bold text-xs"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Floating Bottom Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={() => { setDirectCheckoutItem(null); setIsCartModalOpen(true); }}
            className="px-5 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="text-left leading-tight">
              <div className="text-[10px] uppercase font-extrabold tracking-wider">Proceed to Checkout</div>
              <div className="text-sm font-black">₹{Number(cartPrice).toFixed(2)}</div>
            </div>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3.5">
              <img 
                src={selectedProductModal.image} 
                alt={selectedProductModal.name} 
                className="w-20 h-20 rounded-2xl object-cover border border-[#1e2f4d]"
              />
              <div>
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold rounded-md uppercase">
                  {selectedProductModal.brand}
                </span>
                <h3 className="font-black text-sm text-white mt-1">
                  {selectedProductModal.name}
                </h3>
                <div className="text-xs font-black text-emerald-400 mt-0.5">
                  ₹{Number(selectedProductModal.price).toFixed(2)} <span className="text-slate-500 text-[11px] line-through">₹{Number(selectedProductModal.mrp).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed bg-[#070e1e] p-3.5 rounded-xl border border-[#16233b]">
              <p><strong>Description:</strong> {selectedProductModal.description}</p>
              <p><strong>Composition:</strong> {selectedProductModal.nutrientComposition}</p>
              <p><strong>Recommended Application:</strong> {selectedProductModal.dosage}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleAddToCartWithToast(selectedProductModal, 1);
                  setSelectedProductModal(null);
                }}
                className="flex-1 py-2.5 bg-[#0f1d38] hover:bg-[#15274b] text-cyan-300 border border-[#203254] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProductModal(null);
                  handleInstantBuy(selectedProductModal);
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Buy Now (Instant Checkout)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
