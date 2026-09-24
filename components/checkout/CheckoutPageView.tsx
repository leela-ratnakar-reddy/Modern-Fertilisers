'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Banknote,
  Lock,
  ArrowRight,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrdersContext';
import { DeliveryAddress, PaymentMethod } from '@/types/order';
import { formatPrice } from '@/lib/utils';

export function CheckoutPageView() {
  const router = useRouter();
  const { items, itemCount, subtotal, deliveryFee, discountAmount, appliedCoupon, clearCart, isMounted } =
    useCart();
  const { createOrder } = useOrders();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: 'Andhra Pradesh',
    pincode: '',
  });

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [demoUpiId, setDemoUpiId] = useState('farmer@oksbi');
  const [demoCardNumber, setDemoCardNumber] = useState('4242 •••• •••• 4242');
  const [demoCardExpiry, setDemoCardExpiry] = useState('12/28');
  const [demoCardCvv, setDemoCardCvv] = useState('888');

  // Touched & Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Indian Agricultural States
  const INDIAN_STATES = [
    'Andhra Pradesh',
    'Telangana',
    'Karnataka',
    'Maharashtra',
    'Gujarat',
    'Punjab',
    'Haryana',
    'Tamil Nadu',
    'Madhya Pradesh',
    'Uttar Pradesh',
    'Rajasthan',
    'West Bengal',
    'Odisha',
    'Bihar',
  ];

  if (!isMounted) {
    return (
      <div className="py-24 text-center">
        <div className="w-8 h-8 border-2 border-emerald-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs font-mono text-neutral-500">Preparing Checkout Interface...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-16 sm:py-24 max-w-md mx-auto text-center px-4 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-neutral-900">Your cart is empty</h1>
        <p className="text-xs sm:text-sm text-neutral-500">
          Please add agricultural inputs to your shopping cart before initiating checkout.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold text-xs tracking-wide hover:bg-emerald-950 transition-all"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter at least 3 characters';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '10-digit mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required for dispatch receipt';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = 'Farm / village or house address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Town / District is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = '6-digit PIN code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = 'PIN code must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorKey);
      element?.focus();
      return;
    }

    setIsSubmitting(true);

    const deliveryAddress: DeliveryAddress = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      addressLine1: formData.addressLine1.trim(),
      addressLine2: formData.addressLine2.trim() || undefined,
      city: formData.city.trim(),
      state: formData.state,
      pincode: formData.pincode.trim(),
    };

    // Calculate effective delivery fee
    const finalDeliveryFee = deliveryMethod === 'express' ? 120 : deliveryFee;
    const finalTotal = subtotal - discountAmount + finalDeliveryFee;

    // Simulate network latency for authentic feel
    setTimeout(() => {
      const order = createOrder({
        items,
        subtotal,
        deliveryFee: finalDeliveryFee,
        discountAmount,
        appliedCoupon,
        total: finalTotal,
        address: deliveryAddress,
        deliveryMethod,
        paymentMethod,
      });

      // Clear the active cart
      clearCart();

      // Navigate to order-success page
      router.push(`/order-success/${order.id}`);
    }, 600);
  };

  return (
    <div className="py-8 sm:py-14 bg-[#fbfbf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8">
          <Link href="/cart" className="hover:text-emerald-800 transition-colors">
            Cart ({itemCount})
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
          <span className="text-neutral-900 font-semibold">Secure Demo Checkout</span>
        </nav>

        {/* Demo Notice Banner */}
        <div className="p-4 rounded-2xl bg-emerald-950 text-emerald-100 border border-emerald-900/60 mb-8 flex items-start sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-white font-mono uppercase tracking-wider block">
                Interactive Demo Checkout Mode
              </span>
              <p className="text-emerald-300 text-[11px] mt-0.5">
                No real payments will be charged and no real bank information is collected. Your simulated order will be recorded in local storage with an active status timeline.
              </p>
            </div>
          </div>
          <span className="hidden md:inline-block font-mono text-[10px] uppercase tracking-wider bg-emerald-900 text-emerald-300 px-2 py-1 rounded">
            Frontend Sandbox
          </span>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Form Sections (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* SECTION 1: Contact Information */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-neutral-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    Contact Information
                  </h2>
                  <span className="text-[11px] text-neutral-400">Order updates & invoice</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="fullName" className="text-xs font-semibold text-neutral-700">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="e.g. Ramesh Kumar Patel"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-600'
                          : 'border-neutral-200 bg-neutral-50/50 focus:border-emerald-600 focus:bg-white'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-600">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="text-xs font-semibold text-neutral-700">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400">
                        +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        maxLength={10}
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                        placeholder="98765 43210"
                        className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono text-neutral-900 focus:outline-none transition-colors ${
                          errors.phone
                            ? 'border-rose-400 bg-rose-50/30 focus:border-rose-600'
                            : 'border-neutral-200 bg-neutral-50/50 focus:border-emerald-600 focus:bg-white'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-[11px] text-rose-600">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-semibold text-neutral-700">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="ramesh@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-600'
                          : 'border-neutral-200 bg-neutral-50/50 focus:border-emerald-600 focus:bg-white'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Delivery Address */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-neutral-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    Farm / Delivery Address
                  </h2>
                  <span className="text-[11px] text-neutral-400">Doorstep delivery</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="addressLine1" className="text-xs font-semibold text-neutral-700">
                      Address / Farm Survey No. *
                    </label>
                    <input
                      id="addressLine1"
                      type="text"
                      value={formData.addressLine1}
                      onChange={(e) => handleInputChange('addressLine1', e.target.value)}
                      placeholder="House / Farm Sy No., Village, Main Road"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors ${
                        errors.addressLine1
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-600'
                          : 'border-neutral-200 bg-neutral-50/50 focus:border-emerald-600 focus:bg-white'
                      }`}
                    />
                    {errors.addressLine1 && <p className="text-[11px] text-rose-600">{errors.addressLine1}</p>}
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="addressLine2" className="text-xs font-semibold text-neutral-700">
                      Landmark / Area (Optional)
                    </label>
                    <input
                      id="addressLine2"
                      type="text"
                      value={formData.addressLine2}
                      onChange={(e) => handleInputChange('addressLine2', e.target.value)}
                      placeholder="Near Primary Agriculture Cooperative / Water Tank"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="city" className="text-xs font-semibold text-neutral-700">
                      Town / District *
                    </label>
                    <input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g. Guntur / Warangal"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm text-neutral-900 focus:outline-none transition-colors ${
                        errors.city
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-600'
                          : 'border-neutral-200 bg-neutral-50/50 focus:border-emerald-600 focus:bg-white'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-rose-600">{errors.city}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="state" className="text-xs font-semibold text-neutral-700">
                      State *
                    </label>
                    <select
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors cursor-pointer"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label htmlFor="pincode" className="text-xs font-semibold text-neutral-700">
                      PIN Code *
                    </label>
                    <input
                      id="pincode"
                      type="text"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                      placeholder="522001"
                      className={`w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono text-neutral-900 focus:outline-none transition-colors ${
                        errors.pincode
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-600'
                          : 'border-neutral-200 bg-neutral-50/50 focus:border-emerald-600 focus:bg-white'
                      }`}
                    />
                    {errors.pincode && <p className="text-[11px] text-rose-600">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* SECTION 3: Delivery Method */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-neutral-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    Delivery Method
                  </h2>
                  <span className="text-[11px] text-neutral-400">Logistics dispatch</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          checked={deliveryMethod === 'standard'}
                          onChange={() => setDeliveryMethod('standard')}
                          className="text-emerald-700"
                        />
                        <span className="font-bold text-xs sm:text-sm text-neutral-900">
                          Standard Agronomic Delivery
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-800">
                        {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 pl-5">
                      Estimated 3 to 4 business days via regional depot.
                    </p>
                  </label>

                  <label
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          checked={deliveryMethod === 'express'}
                          onChange={() => setDeliveryMethod('express')}
                          className="text-emerald-700"
                        />
                        <span className="font-bold text-xs sm:text-sm text-neutral-900">
                          Express Stage Dispatch
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-neutral-900">
                        ₹120
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 pl-5">
                      Priority dispatch in 1 to 2 business days for critical spray timings.
                    </p>
                  </label>
                </div>
              </div>

              {/* SECTION 4: Payment Method (Demo) */}
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h2 className="text-sm font-bold uppercase font-mono tracking-wider text-neutral-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">
                      4
                    </span>
                    Demo Payment Method
                  </h2>
                  <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Simulated Gateway
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Demo UPI option */}
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'upi'}
                          onChange={() => setPaymentMethod('upi')}
                          className="text-emerald-700"
                        />
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4 text-emerald-800" />
                          <span className="font-bold text-xs sm:text-sm text-neutral-900">
                            Demo UPI (GPay / PhonePe / BHIM)
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 bg-white px-2 py-0.5 rounded border border-neutral-200">
                        Instant Mock Verification
                      </span>
                    </div>

                    {paymentMethod === 'upi' && (
                      <div className="mt-3 pt-3 border-t border-emerald-100 pl-6 space-y-2">
                        <label className="text-[11px] font-mono text-neutral-500 block">
                          Enter Demo Virtual Payment Address (VPA):
                        </label>
                        <input
                          type="text"
                          value={demoUpiId}
                          onChange={(e) => setDemoUpiId(e.target.value)}
                          className="w-full sm:w-2/3 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-mono text-neutral-800"
                        />
                        <p className="text-[11px] text-emerald-800 font-medium">
                          ✓ Click &quot;Place Demo Order&quot; to simulate instant verified confirmation.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery option */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="text-emerald-700"
                        />
                        <div className="flex items-center gap-2">
                          <Banknote className="w-4 h-4 text-emerald-800" />
                          <span className="font-bold text-xs sm:text-sm text-neutral-900">
                            Cash on Delivery (COD)
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 bg-white px-2 py-0.5 rounded border border-neutral-200">
                        Pay upon receipt
                      </span>
                    </div>
                  </div>

                  {/* Demo Card option */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="text-emerald-700"
                        />
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-emerald-800" />
                          <span className="font-bold text-xs sm:text-sm text-neutral-900">
                            Demo Credit / Debit Card
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 bg-white px-2 py-0.5 rounded border border-neutral-200">
                        Fictional card test
                      </span>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="mt-3 pt-3 border-t border-emerald-100 pl-6 space-y-3">
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                          <strong>Demo checkout</strong> — no real payment will be processed. Fictional test fields are pre-populated.
                        </div>

                        <div className="grid grid-cols-2 gap-2 sm:w-2/3">
                          <div className="col-span-2">
                            <label className="text-[10px] font-mono text-neutral-400 block mb-0.5">Card Number</label>
                            <input
                              type="text"
                              value={demoCardNumber}
                              onChange={(e) => setDemoCardNumber(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 block mb-0.5">Expiry</label>
                            <input
                              type="text"
                              value={demoCardExpiry}
                              onChange={(e) => setDemoCardExpiry(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 block mb-0.5">CVV</label>
                            <input
                              type="text"
                              value={demoCardCvv}
                              onChange={(e) => setDemoCardCvv(e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Review & Submit (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs space-y-6 sticky top-24">
                <h3 className="text-base font-bold text-neutral-900 pb-3 border-b border-neutral-100 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="font-mono text-xs font-semibold text-neutral-500">
                    {itemCount} Items
                  </span>
                </h3>

                {/* Line Items List Preview */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="truncate">
                          <p className="font-semibold text-neutral-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-mono">
                            Qty: {item.quantity} × {item.selectedPack.size}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-neutral-900 shrink-0">
                        {formatPrice(item.selectedPack.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals Breakdown */}
                <div className="pt-4 border-t border-neutral-100 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-semibold text-neutral-900">{formatPrice(subtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-mono font-bold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Delivery Fee ({deliveryMethod === 'express' ? 'Express' : 'Standard'})</span>
                    <span className="font-mono">
                      {deliveryMethod === 'express'
                        ? '₹120'
                        : deliveryFee === 0
                        ? <span className="text-emerald-700 font-semibold uppercase text-xs">Free</span>
                        : formatPrice(deliveryFee)}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-neutral-200">
                    <span className="text-sm font-bold text-neutral-900">Total Payable</span>
                    <span className="text-xl sm:text-2xl font-black font-mono text-neutral-900">
                      {formatPrice(
                        subtotal -
                          discountAmount +
                          (deliveryMethod === 'express' ? 120 : deliveryFee)
                      )}
                    </span>
                  </div>
                </div>

                {/* Submit Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Demo Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Place Demo Order ({formatPrice(
                        subtotal -
                          discountAmount +
                          (deliveryMethod === 'express' ? 120 : deliveryFee)
                      )})</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-neutral-400">
                  By clicking Place Demo Order, you register a simulated order in your browser session.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
