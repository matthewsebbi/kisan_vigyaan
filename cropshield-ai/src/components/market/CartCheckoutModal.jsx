import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  CheckCircle2, 
  Download, 
  Printer, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Truck, 
  ChevronRight,
  FileText,
  Building,
  User,
  Phone,
  MapPin,
  FileDown,
  AlertCircle,
  RefreshCw,
  Clock,
  Lock,
  Smartphone,
  Check,
  AlertOctagon,
  Percent
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartCheckoutModal = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    toggleCartItemSelection, 
    selectAllCartItems, 
    clearCart,
    isCartModalOpen, 
    setIsCartModalOpen,
    directCheckoutItem,
    setDirectCheckoutItem,
    placeOrder,
    currentUser,
    farmerProfile,
    theme,
    lang,
    t
  } = useApp();

  const isDark = theme === 'dark';

  // Step state: 'cart' | 'checkout' | 'processing' | 'otp' | 'failure' | 'confirmation'
  const [step, setStep] = useState(directCheckoutItem ? 'checkout' : 'cart');
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Form State
  const [farmerName, setFarmerName] = useState(currentUser.name || 'Ramesh Patil');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98224 55120');
  const [address, setAddress] = useState(`${currentUser.village || 'Kupwad Shivar'}, ${currentUser.tehsil || 'Miraj Block'}, ${currentUser.location || 'Sangli'} - ${currentUser.pincode || '416416'}`);

  // Payment Method: 'debit' | 'credit' | 'netbanking' | 'upi' | 'cod'
  const [selectedMethod, setSelectedMethod] = useState('upi');

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('4532 8812 9941 7720');
  const [cardHolder, setCardHolder] = useState(currentUser.name || 'Ramesh Patil');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('482');
  const [selectedEmi, setSelectedEmi] = useState('full');

  // Net Banking Inputs
  const [selectedBank, setSelectedBank] = useState('SBI');

  // UPI Inputs
  const [upiMode, setUpiMode] = useState('qr'); // 'qr' | 'id'
  const [upiId, setUpiId] = useState('patil@okhdfcbank');
  const [isUpiVerified, setIsUpiVerified] = useState(true);
  const [qrCountdown, setQrCountdown] = useState(180);

  // Simulation & Failure Testing
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [failureReason, setFailureReason] = useState('Bank gateway connection timeout.');
  const [otpCode, setOtpCode] = useState('123456');
  const [processingProgress, setProcessingProgress] = useState(0);

  // Synchronize modal state on opening
  useEffect(() => {
    if (isCartModalOpen) {
      if (directCheckoutItem) {
        setStep('checkout');
      } else {
        setStep('cart');
      }
      setConfirmedOrder(null);
      setSimulateFailure(false);
      setProcessingProgress(0);
    }
  }, [isCartModalOpen, directCheckoutItem]);

  useEffect(() => {
    let timer;
    if (step === 'checkout' && selectedMethod === 'upi' && upiMode === 'qr' && qrCountdown > 0) {
      timer = setInterval(() => setQrCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, selectedMethod, upiMode, qrCountdown]);

  if (!isCartModalOpen) return null;

  // Active items for calculation
  const itemsToCheckout = directCheckoutItem 
    ? [directCheckoutItem] 
    : cart.filter(i => i.selected);

  const subtotal = itemsToCheckout.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalSubsidySavings = itemsToCheckout.reduce((sum, item) => sum + ((item.subsidyDiscount || 0) * (item.quantity || 1)), 0);
  const gst = Math.round(subtotal * 0.05);
  const deliveryFee = 0; // Free delivery for registered farmers
  const grandTotal = subtotal + gst;

  const allSelected = cart.length > 0 && cart.every(i => i.selected);

  const handleClose = () => {
    setIsCartModalOpen(false);
    setDirectCheckoutItem(null);
    setStep('cart');
    setConfirmedOrder(null);
  };

  const handleProceedToPayment = () => {
    if (itemsToCheckout.length === 0) return;

    if (selectedMethod === 'debit' || selectedMethod === 'credit') {
      setStep('processing');
      setProcessingProgress(25);
      setTimeout(() => setProcessingProgress(65), 500);
      setTimeout(() => {
        setProcessingProgress(100);
        setStep('otp'); // 3DS OTP Step
      }, 1000);
    } else {
      executeTransaction();
    }
  };

  const executeTransaction = () => {
    setStep('processing');
    setProcessingProgress(20);

    const t1 = setTimeout(() => setProcessingProgress(60), 600);
    const t2 = setTimeout(() => setProcessingProgress(90), 1200);

    setTimeout(() => {
      clearTimeout(t1);
      clearTimeout(t2);

      if (simulateFailure) {
        setStep('failure');
        setFailureReason('Bank authorization declined or connection timed out. Please retry or choose another payment method.');
      } else {
        const methodLabels = {
          debit: 'Debit Card (RuPay / Visa)',
          credit: 'Credit Card (Mastercard / Visa)',
          netbanking: `Net Banking (${selectedBank})`,
          upi: upiMode === 'qr' ? 'UPI Dynamic QR Scan' : `UPI ID (${upiId})`,
          cod: 'Cash on Delivery (Kisan Pay)'
        };

        const newOrder = placeOrder({
          farmerName,
          phone,
          address,
          items: itemsToCheckout,
          subtotal,
          subsidySavings: totalSubsidySavings,
          gst,
          deliveryFee,
          total: grandTotal,
          paymentMethod: methodLabels[selectedMethod] || selectedMethod
        });

        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
        setConfirmedOrder(newOrder);
        setStep('confirmation');
      }
    }, 1600);
  };

  const handleVerifyOtpAndPay = (e) => {
    e.preventDefault();
    executeTransaction();
  };

  // Direct File Download of Official Invoice (.txt)
  const handleDownloadInvoiceFile = () => {
    if (!confirmedOrder) return;
    
    const invoiceContent = `
============================================================
              KISAN VIGYAAN - TAX INVOICE & RECEIPT
         Govt. Approved Agronomy & KVK Hub Partner
============================================================

ORDER NUMBER      : ${confirmedOrder.orderId}
DATE & TIME       : ${confirmedOrder.date}
PAYMENT STATUS    : PAID & VERIFIED (${confirmedOrder.paymentMethod})
TRANSACTION REF   : ${confirmedOrder.transactionId}
TRACKING NUMBER   : ${confirmedOrder.trackingNumber}

------------------------------------------------------------
BUYER & FARM DETAILS:
------------------------------------------------------------
Farmer Name       : ${confirmedOrder.farmerName}
Contact Phone     : ${confirmedOrder.phone}
Delivery Address  : ${confirmedOrder.address}
Kisan Card ID     : ${currentUser.kisanCardNumber || 'MH-PMK-2024-88421'}
Dispatch KVK Hub  : Krishi Vigyan Kendra (KVK) Sangli Regional Hub

------------------------------------------------------------
ITEMIZED PURCHASE DETAILS:
------------------------------------------------------------
${confirmedOrder.items.map((it, idx) => 
`${idx + 1}. ${it.name}
   Qty: ${it.quantity} x ₹${it.price} (MRP: ₹${it.mrp || it.price})
   DBT Subsidy Discount: -₹${(it.subsidyDiscount || 0) * it.quantity}
   Item Total: ₹${it.price * it.quantity}`
).join('\n\n')}

------------------------------------------------------------
FINANCIAL BREAKDOWN:
------------------------------------------------------------
Subtotal Amount   : ₹${confirmedOrder.subtotal.toLocaleString('en-IN')}
Total DBT Savings : -₹${confirmedOrder.subsidySavings.toLocaleString('en-IN')}
GST (5% SGST/CGST): ₹${confirmedOrder.gst.toLocaleString('en-IN')}
Shipping / Courier: FREE (Kisan Govt Subsidy)
------------------------------------------------------------
GRAND TOTAL PAID  : ₹${confirmedOrder.total.toLocaleString('en-IN')}
------------------------------------------------------------

STATUS:
Your agricultural inputs are dispatched and sealed by KVK Sangli.
For delivery updates, track via SMS or call 1800-180-1551.

KISAN VIGYAAN Agronomy Platform • Ministry of Agriculture
============================================================
`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${confirmedOrder.orderId}_KisanVigyaan.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border transition-all my-6 overflow-hidden ${
        isDark ? 'bg-[#0a1120] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-center shadow-xs">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {step === 'cart' && t('yourFarmCart', 'Your Farm Cart')}
                {step === 'checkout' && t('paymentMethods', 'Checkout & Payment Methods')}
                {step === 'processing' && t('processingPayment', 'Processing Payment...')}
                {step === 'otp' && 'Bank 3D-Secure Verification'}
                {step === 'failure' && t('paymentFailed', 'Transaction Failed')}
                {step === 'confirmation' && t('orderSuccessTitle', 'Order Placed Successfully!')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {step === 'confirmation' ? 'Official Tax Invoice & Receipt Generated' : 'Official KVK Hub Certified Checkout'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CART VIEW */}
        {step === 'cart' && (
          <div className="space-y-4 pt-4">
            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-slate-700 dark:text-slate-300">
                  {t('cartEmpty', 'Your cart is empty')}
                </h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add agro-medicines, bio-fertilizers, or pest traps from the Market tab.
                </p>
              </div>
            ) : (
              <>
                {/* Select All Toggle */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                  <button
                    onClick={() => selectAllCartItems(!allSelected)}
                    className="flex items-center space-x-2 cursor-pointer hover:text-emerald-600"
                  >
                    {allSelected ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4" />}
                    <span>Select All Items ({cart.length})</span>
                  </button>

                  <button
                    onClick={clearCart}
                    className="text-rose-600 hover:underline cursor-pointer text-xs"
                  >
                    Clear All
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        item.selected 
                          ? isDark ? 'bg-slate-900 border-emerald-500/50' : 'bg-emerald-50/50 border-emerald-300'
                          : isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleCartItemSelection(item.id)}
                        className="cursor-pointer text-slate-500 hover:text-emerald-600 shrink-0"
                      >
                        {item.selected ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4" />}
                      </button>

                      <div className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-lg shrink-0">
                        {item.icon || '🧪'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <strong className="text-emerald-700 dark:text-emerald-400">₹{item.price}</strong>
                          {item.mrp && <span className="line-through text-[10px]">₹{item.mrp}</span>}
                          {item.subsidyDiscount > 0 && (
                            <span className="text-[10px] text-amber-600 font-bold">(-₹{item.subsidyDiscount} DBT)</span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center cursor-pointer font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-6 text-center text-xs font-black font-mono">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 flex items-center justify-center cursor-pointer font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 cursor-pointer ml-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Summary */}
                <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
                  isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex justify-between font-medium text-slate-600 dark:text-slate-400">
                    <span>Selected Items Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {totalSubsidySavings > 0 && (
                    <div className="flex justify-between font-bold text-amber-600">
                      <span>PM-KISAN DBT Direct Subsidy</span>
                      <span>-₹{totalSubsidySavings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-slate-600 dark:text-slate-400">
                    <span>GST (5% Agriculture Tax)</span>
                    <span>₹{gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-white">
                    <span>Grand Total</span>
                    <span className="text-emerald-700 dark:text-emerald-400">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={() => setStep('checkout')}
                  disabled={itemsToCheckout.length === 0}
                  className="w-full py-3.5 bg-gradient-to-r from-[#1B5E20] to-[#15803d] hover:from-[#154D1A] hover:to-[#1B5E20] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
                >
                  <span>Proceed to Payment ({itemsToCheckout.length} Items • ₹{grandTotal.toLocaleString('en-IN')})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        )}

        {/* STEP 2: CHECKOUT & PAYMENT METHOD SELECTOR */}
        {step === 'checkout' && (
          <div className="space-y-5 pt-4">
            
            {/* Delivery Address Review */}
            <div className={`p-3.5 rounded-2xl border space-y-1 text-xs ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono block">
                Delivery Address (KVK Sangli Fast Express)
              </span>
              <p className="font-black text-slate-900 dark:text-white">{farmerName} ({phone})</p>
              <p className="text-slate-600 dark:text-slate-400">{address}</p>
            </div>

            {/* Payment Method Selector Tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 dark:text-slate-300">
                {t('paymentMethods', 'Select Payment Method')}
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs font-bold">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: QrCode },
                  { id: 'debit', label: 'Debit Card', icon: CreditCard },
                  { id: 'credit', label: 'Credit Card', icon: CreditCard },
                  { id: 'netbanking', label: 'Net Banking', icon: Building },
                  { id: 'cod', label: 'Cash on Del', icon: Truck }
                ].map(m => {
                  const Icon = m.icon;
                  const isSel = selectedMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        isSel
                          ? 'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 shadow-xs'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] truncate">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* METHOD 1: UPI INTENT & QR CODE FLOW */}
            {selectedMethod === 'upi' && (
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex justify-center space-x-2 pb-2 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setUpiMode('qr')}
                    className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                      upiMode === 'qr' ? 'bg-emerald-600 text-white' : 'text-slate-500'
                    }`}
                  >
                    Dynamic QR Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setUpiMode('id')}
                    className={`px-3 py-1.5 rounded-xl cursor-pointer ${
                      upiMode === 'id' ? 'bg-emerald-600 text-white' : 'text-slate-500'
                    }`}
                  >
                    Enter UPI ID / VPA
                  </button>
                </div>

                {upiMode === 'qr' ? (
                  <div className="flex flex-col items-center space-y-2 py-2">
                    <div className="w-40 h-40 bg-white p-2.5 rounded-2xl border-2 border-emerald-500 shadow-md flex items-center justify-center relative">
                      {/* Realistic SVG QR Pattern */}
                      <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                        <rect width="100" height="100" fill="white" />
                        <path d="M10 10h30v30h-30zM15 15h20v20h-20zM60 10h30v30h-30zM65 15h20v20h-20zM10 60h30v30h-30zM15 65h20v20h-20z" fill="black" />
                        <path d="M45 15h10v10h-10zM15 45h10v10h-10zM45 45h10v10h-10zM65 45h10v10h-10zM45 65h10v10h-10zM65 65h20v10h-20zM75 75h15v15h-15z" fill="black" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[8px] font-black uppercase font-mono shadow-xs">
                          ₹{grandTotal}
                        </span>
                      </div>
                    </div>

                    <div className="text-center text-xs">
                      <p className="font-bold text-slate-800 dark:text-slate-200">Scan with Google Pay, PhonePe, Paytm or BHIM</p>
                      <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                        QR expires in: <strong className="text-emerald-600">{Math.floor(qrCountdown / 60)}:{(qrCountdown % 60).toString().padStart(2, '0')}</strong>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs">
                    <label className="block font-bold text-slate-700 dark:text-slate-300">
                      Enter UPI ID / VPA
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 9822455120@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className={`flex-1 p-2.5 rounded-xl border font-bold ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setIsUpiVerified(true)}
                        className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl cursor-pointer"
                      >
                        Verify
                      </button>
                    </div>
                    {isUpiVerified && (
                      <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Verified: Ramesh Patil (HDFC Bank)</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* METHOD 2 & 3: DEBIT / CREDIT CARDS */}
            {(selectedMethod === 'debit' || selectedMethod === 'credit') && (
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Card Number (RuPay / Visa / Master)</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 8812 9941 7720"
                      className={`w-full p-2.5 rounded-xl border font-mono font-bold ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className={`w-full p-2.5 rounded-xl border font-mono font-bold ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="•••"
                        className={`w-full p-2.5 rounded-xl border font-mono font-bold ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Ramesh Patil"
                      className={`w-full p-2.5 rounded-xl border font-bold ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  {selectedMethod === 'credit' && (
                    <div className="pt-2">
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Kisan Credit EMI Plan</label>
                      <select
                        value={selectedEmi}
                        onChange={(e) => setSelectedEmi(e.target.value)}
                        className={`w-full p-2 rounded-xl border font-bold ${
                          isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="full">Pay in Full (₹{grandTotal})</option>
                        <option value="3m">3 Months @ ₹{Math.round(grandTotal / 3)}/mo (0% Interest Kisan Card)</option>
                        <option value="6m">6 Months @ ₹{Math.round(grandTotal / 6)}/mo (0% Interest)</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* METHOD 4: NET BANKING */}
            {selectedMethod === 'netbanking' && (
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Your Bank
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold">
                  {[
                    'State Bank of India (SBI)',
                    'HDFC Bank',
                    'ICICI Bank',
                    'Axis Bank',
                    'Bank of Maharashtra',
                    'Punjab National Bank (PNB)'
                  ].map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBank(b)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedBank === b 
                          ? 'border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300' 
                          : isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* METHOD 5: CASH ON DELIVERY */}
            {selectedMethod === 'cod' && (
              <div className={`p-4 rounded-2xl border space-y-3 text-xs ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black">
                  <Truck className="w-5 h-5" />
                  <span>Cash on Delivery (Kisan Verified)</span>
                </div>
                <div className="space-y-1.5 font-medium text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Payable in Cash on Delivery:</span>
                    <strong className="text-slate-900 dark:text-white font-bold">₹{grandTotal.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>COD Handling Fee:</span>
                    <span className="text-emerald-600 font-bold">FREE (₹0)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Agent:</span>
                    <span>Certified KVK Sangli Field Officer</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Arrival:</span>
                    <span>Tomorrow by 2:00 PM</span>
                  </div>
                </div>
              </div>
            )}

            {/* Simulated Failure Option for Testing */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 dark:text-slate-400">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={simulateFailure}
                  onChange={(e) => setSimulateFailure(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <span className="font-mono">Test Simulated Bank Gateway Failure State</span>
              </label>
            </div>

            {/* Pay Button */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep('cart')}
                className={`py-3.5 px-4 rounded-2xl border font-bold text-xs cursor-pointer ${
                  isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                Back to Cart
              </button>

              <button
                type="button"
                onClick={handleProceedToPayment}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#1B5E20] to-[#15803d] hover:from-[#154D1A] hover:to-[#1B5E20] text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>Pay ₹{grandTotal.toLocaleString('en-IN')} Securely</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: 3DS OTP MODAL SIMULATION (For Card Payments) */}
        {step === 'otp' && (
          <div className="py-6 space-y-4 text-center animate-fadeIn">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Enter Bank 3D-Secure OTP
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                A one-time password has been sent to your registered mobile ending in ••120
              </p>
            </div>

            <form onSubmit={handleVerifyOtpAndPay} className="max-w-xs mx-auto space-y-3">
              <input
                type="text"
                required
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full text-center text-xl font-mono font-black tracking-widest p-3 rounded-2xl border border-blue-400 focus:outline-none dark:bg-slate-900"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-2xl shadow-lg cursor-pointer"
              >
                Authorize Payment (₹{grandTotal})
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: PROCESSING SPINNER */}
        {step === 'processing' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center animate-fadeIn">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                Communicating with Banking Gateway...
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                256-bit SSL Encrypted • Verifying Transaction
              </p>
            </div>
          </div>
        )}

        {/* STEP 5: FAILURE & RETRY STATE */}
        {step === 'failure' && (
          <div className="py-6 space-y-4 text-center animate-shake">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center mx-auto">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-black text-rose-700 dark:text-rose-400">
                Transaction Could Not Be Completed
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                {failureReason}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setSimulateFailure(false); executeTransaction(); }}
                className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-2xl shadow-md cursor-pointer flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Payment</span>
              </button>

              <button
                type="button"
                onClick={() => { setSimulateFailure(false); setStep('checkout'); }}
                className="px-5 py-3 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-2xl cursor-pointer"
              >
                Change Payment Method
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: ORDER CONFIRMATION & OFFICIAL TAX INVOICE */}
        {step === 'confirmation' && confirmedOrder && (
          <div className="space-y-4 pt-2 animate-fadeIn max-h-[560px] overflow-y-auto pr-1">
            
            {/* Success Banner */}
            <div className={`p-4 rounded-3xl border-2 border-emerald-500/80 flex items-center space-x-3.5 shadow-md ${
              isDark ? 'bg-emerald-950/30' : 'bg-emerald-50/70'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Payment Verified & Dispatched!
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  Order ID: <strong className="font-mono text-emerald-700 dark:text-emerald-400">{confirmedOrder.orderId}</strong> • Tracking code sent via SMS
                </p>
              </div>
            </div>

            {/* Official Itemized Tax Invoice Card */}
            <div className={`p-5 rounded-3xl border shadow-sm space-y-4 text-xs font-mono ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-300'
            }`}>
              
              <div className="flex justify-between items-start pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="font-black text-sm text-slate-900 dark:text-white">
                    TAX INVOICE & BILL OF SUPPLY
                  </h4>
                  <span className="text-[10px] text-slate-500">Krishi Vigyan Kendra (KVK) Hub Partner</span>
                </div>
                <div className="text-right text-[11px]">
                  <p className="font-bold text-emerald-700 dark:text-emerald-400">PAID & VERIFIED</p>
                  <p className="text-slate-500">{confirmedOrder.date}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-slate-500 pb-1 border-b border-slate-200 dark:border-slate-800 text-[10px]">
                  <span>ITEM DESCRIPTION</span>
                  <span>TOTAL (₹)</span>
                </div>
                {confirmedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-slate-800 dark:text-slate-200">
                    <div>
                      <span className="font-bold">{it.name}</span>
                      <span className="text-[10px] text-slate-500 block">Qty: {it.quantity} x ₹{it.price}</span>
                    </div>
                    <strong>₹{it.price * it.quantity}</strong>
                  </div>
                ))}
              </div>

              {/* Financial Totals */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal Amount:</span>
                  <span>₹{confirmedOrder.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {confirmedOrder.subsidySavings > 0 && (
                  <div className="flex justify-between text-amber-600 font-bold">
                    <span>DBT Subsidy Savings:</span>
                    <span>-₹{confirmedOrder.subsidySavings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>GST (5% SGST/CGST):</span>
                  <span>₹{confirmedOrder.gst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Shipping / Courier:</span>
                  <span className="text-emerald-600 font-bold">FREE (Kisan DBT)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-white">
                  <span>Grand Total Paid:</span>
                  <span className="text-emerald-700 dark:text-emerald-400">₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Footer Meta */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 space-y-0.5">
                <p>Payment Method: {confirmedOrder.paymentMethod}</p>
                <p>Transaction Ref: {confirmedOrder.transactionId}</p>
                <p>Delivery To: {confirmedOrder.farmerName} • {confirmedOrder.address}</p>
              </div>

            </div>

            {/* Action Buttons: Download & Print Receipt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadInvoiceFile}
                className="py-3.5 bg-[#1B5E20] hover:bg-[#154D1A] text-white font-black text-xs rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{t('downloadInvoice', 'Download Tax Invoice (.txt)')}</span>
              </button>

              <button
                type="button"
                onClick={handlePrintReceipt}
                className={`py-3.5 font-black text-xs rounded-2xl border flex items-center justify-center gap-2 cursor-pointer ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                }`}
              >
                <Printer className="w-4 h-4 text-cyan-600" />
                <span>{t('printInvoice', 'Print / Save as PDF')}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
