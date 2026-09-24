import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { indianBanksList } from '../../data/marketplaceData';
import { 
  X, 
  ShoppingCart, 
  CreditCard, 
  QrCode, 
  Building2, 
  Landmark, 
  Banknote, 
  Truck, 
  CheckCircle2, 
  Download, 
  Printer, 
  ArrowRight, 
  MapPin, 
  Phone, 
  Tag, 
  Plus, 
  Minus, 
  Trash2, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';

export const CheckoutModal = ({ isOpen, onClose, directItem = null }) => {
  const { 
    lang, 
    farmerProfile, 
    cart, 
    updateCartQty, 
    removeFromCart, 
    clearCart, 
    placeOrder, 
    addToCart 
  } = useApp();

  const [step, setStep] = useState(1); // 1: Cart & Address, 2: Payment, 3: Success
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: farmerProfile?.name || 'Ramesh Patil',
    phone: farmerProfile?.phone || '+91 98224 55120',
    village: 'Kupwad / Miraj Taluka',
    district: 'Sangli',
    state: 'Maharashtra',
    pincode: '416416',
    farmLandmark: 'Near Kupwad Primary School, Gat No. 114 (Tractor Accessible)',
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'debit' | 'credit' | 'netbanking' | 'kcc' | 'cod'
  const [upiOption, setUpiOption] = useState('qr');
  const [upiId, setUpiId] = useState('');
  const [upiVerified, setUpiVerified] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: farmerProfile?.name || 'Ramesh Patil',
    expiry: '',
    cvv: ''
  });
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // If directItem is passed, ensure it is in items
  const itemsToCheckout = directItem 
    ? [{ product: directItem, quantity: 1 }] 
    : (cart && cart.length > 0 ? cart : []);

  const getDeliveryDateStr = (daysAhead = 3) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  const cartSubtotal = itemsToCheckout.reduce((sum, item) => sum + ((item.product.mrp || item.product.subsidizedPrice || item.product.price) * item.quantity), 0);
  const cartPrice = itemsToCheckout.reduce((sum, item) => sum + ((item.product.price || item.product.subsidizedPrice) * item.quantity), 0);
  const cartSubsidySavings = Math.max(0, cartSubtotal - cartPrice);
  const cartGst = Math.round(cartPrice * 0.05);
  const cartDeliveryFee = cartPrice > 1000 || cartPrice === 0 ? 0 : 60;
  const cartGrandTotal = cartPrice + cartGst + cartDeliveryFee;
  const cartCount = itemsToCheckout.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsProcessingPayment(false);
      setConfirmedOrder(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePlaceOrder = () => {
    if (itemsToCheckout.length === 0) return;
    setIsProcessingPayment(true);

    setTimeout(() => {
      let paymentLabel = 'UPI Payment';
      if (paymentMethod === 'upi') paymentLabel = upiOption === 'qr' ? 'UPI (Scanned QR Code)' : ('UPI (' + (upiId || 'farmer@upi') + ')');
      if (paymentMethod === 'debit') paymentLabel = 'Debit Card (RuPay/Visa ending ' + (cardDetails.number.slice(-4) || '4218') + ')';
      if (paymentMethod === 'credit') paymentLabel = 'Credit Card (ending ' + (cardDetails.number.slice(-4) || '8831') + ')';
      if (paymentMethod === 'netbanking') {
        const b = indianBanksList.find(x => x.id === selectedBank);
        paymentLabel = 'NetBanking (' + (b ? b.name : 'State Bank of India') + ')';
      }
      if (paymentMethod === 'kcc') paymentLabel = 'Kisan Credit Card (KCC Subsidized Credit)';
      if (paymentMethod === 'cod') paymentLabel = 'Cash on Delivery (Pay at Farm Gate)';

      const orderData = {
        farmerName: deliveryAddress.fullName,
        phone: deliveryAddress.phone,
        address: deliveryAddress.village + ', ' + deliveryAddress.district + ', ' + deliveryAddress.state + ' - ' + deliveryAddress.pincode + ' (' + deliveryAddress.farmLandmark + ')',
        items: itemsToCheckout.map(item => ({
          id: item.product.id,
          name: item.product.name,
          brand: item.product.brand || item.product.company || 'Agri Brand',
          price: item.product.price || item.product.subsidizedPrice,
          mrp: item.product.mrp || item.product.subsidizedPrice,
          qty: item.quantity,
          subsidyDiscount: Math.max(0, (item.product.mrp || item.product.subsidizedPrice) - (item.product.price || item.product.subsidizedPrice))
        })),
        subtotal: cartSubtotal,
        subsidySavings: cartSubsidySavings,
        gst: cartGst,
        deliveryFee: cartDeliveryFee,
        total: cartGrandTotal,
        paymentMethod: paymentLabel,
        transactionId: 'TXN-' + paymentMethod.toUpperCase() + '-' + Math.floor(10000000 + Math.random() * 90000000),
        status: 'Confirmed • Dispatching from District KVK Hub',
        estimatedDelivery: getDeliveryDateStr(3)
      };

      const created = placeOrder(orderData);
      setConfirmedOrder(created);
      setIsProcessingPayment(false);
      setStep(3);
    }, 1600);
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
        '<td>₹' + Number(item.mrp).toFixed(2) + '</td>' +
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
            '<div class="brand">🌾 KISAN VIGYAAN Agri-Marketplace</div>' +
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
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0b1528] border border-[#1e2f4d] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-[#070e1e] border-b border-[#18263f] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                {step === 1 ? 'Review Order & Delivery Address' : step === 2 ? 'Select Payment Gateway' : 'Order Placed & Official Tax Receipt'}
              </h3>
              <p className="text-[11px] text-slate-400">
                {step === 1 ? `${cartCount} Items Selected` : step === 2 ? `Total Payable: ₹${cartGrandTotal.toFixed(2)}` : `Order Confirmed: ${confirmedOrder?.orderId}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-[#0f1d38] hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-[#203254] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* STEP 1: ITEMS & DELIVERY ADDRESS */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Items List */}
              <div className="space-y-2">
                <div className="font-bold text-slate-300">Order Items:</div>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {itemsToCheckout.map(item => (
                    <div 
                      key={item.product.id}
                      className="flex items-center justify-between p-2.5 bg-[#070e1e] border border-[#16233b] rounded-xl gap-3"
                    >
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-12 h-12 rounded-lg object-cover border border-[#1e2f4d] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white truncate">{item.product.name}</div>
                        <div className="text-[10px] text-slate-400">
                          {item.product.brand || item.product.company} • Qty: <strong className="text-cyan-300">{item.quantity}</strong>
                        </div>
                        <div className="font-black text-emerald-400">
                          ₹{Number(item.product.price || item.product.subsidizedPrice).toFixed(2)}
                        </div>
                      </div>
                      <div className="font-mono font-bold text-white">
                        ₹{(Number(item.product.price || item.product.subsidizedPrice) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="bg-[#070e1e] p-3.5 rounded-xl border border-[#16233b] space-y-2.5">
                <div className="flex items-center space-x-2 font-bold text-white">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Farmer Delivery Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Farmer Full Name</label>
                    <input
                      type="text"
                      value={deliveryAddress.fullName}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-lg px-2.5 py-1.5 text-white font-semibold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Phone Number</label>
                    <input
                      type="text"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-lg px-2.5 py-1.5 text-white font-semibold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-[10px] text-slate-400 block mb-0.5">Village / Gat No / Landmark</label>
                    <input
                      type="text"
                      value={deliveryAddress.village + ' (' + deliveryAddress.farmLandmark + ')'}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, village: e.target.value })}
                      className="w-full bg-[#0d182e] border border-[#203254] rounded-lg px-2.5 py-1.5 text-white font-semibold focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="bg-[#070e1e] p-3.5 rounded-xl border border-[#16233b] space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal (MRP Value):</span>
                  <span>₹{cartSubtotal.toFixed(2)}</span>
                </div>
                {cartSubsidySavings > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Direct Govt. Subsidy Saved:</span>
                    <span>-₹{cartSubsidySavings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>GST (5% Agricultural rate):</span>
                  <span>₹{cartGst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Farm Delivery Surcharge:</span>
                  <span>{cartDeliveryFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `₹${cartDeliveryFee}`}</span>
                </div>
                <div className="border-t border-[#18263f] pt-2 flex justify-between items-baseline">
                  <span className="font-extrabold text-white text-sm">Total Payable:</span>
                  <span className="font-black text-emerald-400 text-base">₹{cartGrandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 p-2.5 rounded-xl flex items-center gap-2 text-cyan-300">
                <Truck className="w-4 h-4 shrink-0" />
                <span>Guaranteed Farm Gate Delivery: <strong>{getDeliveryDateStr(3)}</strong></span>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT GATEWAY SELECTION */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Payment Methods Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI (GPay / PhonePe / Paytm)', icon: QrCode, sub: 'Instant QR / ID' },
                  { id: 'debit', label: 'Debit Card (RuPay / Visa)', icon: CreditCard, sub: 'Kisan RuPay' },
                  { id: 'credit', label: 'Credit Card', icon: CreditCard, sub: 'All Banks' },
                  { id: 'netbanking', label: 'Internet Banking', icon: Building2, sub: 'SBI / HDFC / PNB' },
                  { id: 'kcc', label: 'Kisan Credit Card (KCC)', icon: Landmark, sub: '4% Subsidized' },
                  { id: 'cod', label: 'Cash on Delivery (COD)', icon: Banknote, sub: 'Pay at Farm Gate' }
                ].map(m => {
                  const Icon = m.icon;
                  const isSel = paymentMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={'p-2.5 rounded-xl border flex flex-col items-center text-center space-y-1 transition-all ' + (
                        isSel
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold shadow-md'
                          : 'bg-[#070e1e] border-[#16233b] text-slate-400 hover:text-white'
                      )}
                    >
                      <Icon className={'w-4 h-4 ' + (isSel ? 'text-cyan-400' : 'text-slate-500')} />
                      <span className="text-[11px] font-bold leading-tight">{m.label}</span>
                      <span className="text-[9px] text-slate-400">{m.sub}</span>
                    </button>
                  );
                })}
              </div>

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div className="bg-[#070e1e] p-4 rounded-xl border border-[#16233b] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">UPI Options:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUpiOption('qr')}
                        className={'px-2.5 py-1 rounded-lg font-bold text-[11px] ' + (
                          upiOption === 'qr' ? 'bg-cyan-500 text-slate-950' : 'bg-[#0d182e] text-slate-400'
                        )}
                      >
                        Dynamic QR Code
                      </button>
                      <button
                        onClick={() => setUpiOption('id')}
                        className={'px-2.5 py-1 rounded-lg font-bold text-[11px] ' + (
                          upiOption === 'id' ? 'bg-cyan-500 text-slate-950' : 'bg-[#0d182e] text-slate-400'
                        )}
                      >
                        Enter UPI ID
                      </button>
                    </div>
                  </div>

                  {upiOption === 'qr' ? (
                    <div className="text-center py-2 space-y-2">
                      <div className="p-3 bg-white rounded-xl inline-block shadow-md">
                        <img 
                          src={'https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=cropshield@okaxis%26pn=CropShieldAgri%26am=' + cartGrandTotal + '%26cu=INR'}
                          alt="UPI QR" 
                          className="w-32 h-32 mx-auto"
                        />
                      </div>
                      <div className="text-[11px] text-slate-300 font-bold">Scan with GPay, PhonePe, Paytm or BHIM</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-slate-300 block text-[11px]">Enter UPI ID / VPA</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. 9822455120@paytm, farmer@okaxis"
                          value={upiId}
                          onChange={(e) => { setUpiId(e.target.value); setUpiVerified(false); }}
                          className="flex-1 bg-[#0d182e] border border-[#203254] rounded-lg px-3 py-1.5 text-white"
                        />
                        <button
                          type="button"
                          onClick={() => setUpiVerified(true)}
                          className="px-3 py-1.5 bg-[#13223f] text-cyan-300 border border-cyan-500/40 rounded-lg font-bold"
                        >
                          {upiVerified ? '✓ Verified' : 'Verify'}
                        </button>
                      </div>
                      {upiVerified && <p className="text-emerald-400 text-[10px] font-bold">✓ Handle Verified: Ramesh Patil</p>}
                    </div>
                  )}
                </div>
              )}

              {/* Debit Card Form */}
              {paymentMethod === 'debit' && (
                <div className="bg-[#070e1e] p-3.5 rounded-xl border border-[#16233b] space-y-2.5">
                  <div className="text-white font-bold">Debit Card (RuPay / Visa / MasterCard)</div>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    maxLength="19"
                    className="w-full bg-[#0d182e] border border-[#203254] rounded-lg px-3 py-1.5 text-white font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="bg-[#0d182e] border border-[#203254] rounded-lg px-3 py-1.5 text-white font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV (3 Digits)"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="bg-[#0d182e] border border-[#203254] rounded-lg px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Credit Card Form */}
              {paymentMethod === 'credit' && (
                <div className="bg-[#070e1e] p-3.5 rounded-xl border border-[#16233b] space-y-2.5">
                  <div className="text-white font-bold">Credit Card</div>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    maxLength="19"
                    className="w-full bg-[#0d182e] border border-[#203254] rounded-lg px-3 py-1.5 text-white font-mono"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="bg-[#0d182e] border border-[#203254] rounded-lg px-3 py-1.5 text-white font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="bg-[#0d182e] border border-[#203254] rounded-lg px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* NetBanking Form */}
              {paymentMethod === 'netbanking' && (
                <div className="bg-[#070e1e] p-3.5 rounded-xl border border-[#16233b] space-y-2.5">
                  <div className="text-white font-bold">Select Indian Bank:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {indianBanksList.slice(0, 6).map(b => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBank(b.id)}
                        className={'p-2 rounded-lg border text-left flex items-center space-x-2 ' + (
                          selectedBank === b.id ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold' : 'bg-[#0d182e] border-[#203254] text-slate-300'
                        )}
                      >
                        <span>{b.logo}</span>
                        <span className="truncate text-[11px]">{b.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Kisan Credit Card */}
              {paymentMethod === 'kcc' && (
                <div className="bg-[#070e1e] p-3.5 rounded-xl border border-emerald-500/40 space-y-2">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Landmark className="w-4 h-4" />
                    <span>Kisan Credit Card (KCC) Subsidized Loan (4% Interest)</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Amount will be debited against your verified district KCC crop credit limit.</p>
                </div>
              )}

              {/* COD */}
              {paymentMethod === 'cod' && (
                <div className="bg-[#070e1e] p-3.5 rounded-xl border border-amber-500/40 space-y-2">
                  <div className="text-amber-400 font-bold flex items-center gap-1.5">
                    <Banknote className="w-4 h-4" />
                    <span>Pay at Farm Gate on Delivery ({getDeliveryDateStr(3)})</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Pay in Cash or UPI QR to the KVK delivery truck representative.</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED & DOWNLOAD RECEIPT */}
          {step === 3 && confirmedOrder && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-black text-white">Payment Confirmed & Order Placed!</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Order ID: <strong className="text-cyan-300 font-mono">{confirmedOrder.orderId}</strong> • Txn: <strong className="text-emerald-400 font-mono">{confirmedOrder.transactionId}</strong>
                </p>
              </div>

              <div className="bg-[#070e1e] p-3 rounded-xl border border-[#16233b] max-w-md mx-auto text-left space-y-1">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Truck className="w-4 h-4" />
                  <span>Guaranteed Delivery: {confirmedOrder.estimatedDelivery}</span>
                </div>
                <div className="text-slate-400 text-[11px]">Dispatching from KVK District Store, Sangli</div>
                <div className="text-white font-bold pt-1">Total Paid: ₹{Number(confirmedOrder.total).toFixed(2)} ({confirmedOrder.paymentMethod})</div>
              </div>

              <div className="pt-2 flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handlePrintReceipt(confirmedOrder)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl shadow-lg transition-all flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official Receipt (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-[#0f1d38] text-slate-300 hover:text-white rounded-xl border border-[#203254] font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 3 && (
          <div className="p-4 bg-[#070e1e] border-t border-[#18263f] flex items-center justify-between">
            {step === 1 ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-400 hover:text-white font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={itemsToCheckout.length === 0}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Proceed to Payment (₹{cartGrandTotal.toFixed(2)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-slate-400 hover:text-white font-bold text-xs"
                >
                  ← Back to Address
                </button>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handlePlaceOrder}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Processing & Generating Receipt...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Pay ₹{cartGrandTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
