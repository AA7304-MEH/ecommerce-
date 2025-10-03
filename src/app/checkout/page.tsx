'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  CreditCard, 
  Shield, 
  Truck, 
  MapPin, 
  Mail, 
  Phone,
  User,
  Home,
  CheckCircle
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import UnifiedPayment from '@/components/UnifiedPayment';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'paypal' | 'crypto' | 'bank_transfer'>('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'IN'
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to proceed with checkout.</p>
          <button 
            onClick={() => router.push('/products')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would integrate with actual payment gateways here
      if (paymentMethod === 'razorpay') {
        // Razorpay integration would go here
        console.log('Processing Razorpay payment...');
      } else if (paymentMethod === 'paypal') {
        // PayPal integration would go here
        console.log('Processing PayPal payment...');
      } else if (paymentMethod === 'crypto') {
        // Cryptocurrency payment (FREE to integrate)
        console.log('Processing Crypto payment...');
      } else if (paymentMethod === 'bank_transfer') {
        // Direct bank transfer (FREE method)
        console.log('Processing Bank Transfer...');
      }
      
      // Clear cart and redirect to success page
      clearCart();
      setCurrentStep(4);
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      if (validateForm()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      processPayment();
    }
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => router.push('/products')}
              className="w-full btn-primary"
            >
              Continue Shopping
            </button>
            <button 
              onClick={() => router.push('/orders')}
              className="w-full btn-secondary"
            >
              View Order Status
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Shipping', icon: Truck },
              { step: 2, title: 'Review', icon: Shield },
              { step: 3, title: 'Payment', icon: CreditCard }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-primary-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`ml-2 font-medium ${
                  currentStep >= step ? 'text-primary-600' : 'text-gray-600'
                }`}>
                  {title}
                </span>
                {step < 3 && (
                  <div className={`w-20 h-1 mx-4 ${
                    currentStep > step ? 'bg-primary-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="your@email.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`input-field pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`input-field pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <div className="relative">
                        <Home className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className={`input-field pl-10 ${errors.address ? 'border-red-500' : ''}`}
                          placeholder="123 Main Street, Apt 4B"
                        />
                      </div>
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`input-field ${errors.city ? 'border-red-500' : ''}`}
                        placeholder="New York"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className={`input-field ${errors.state ? 'border-red-500' : ''}`}
                        placeholder="NY"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={`input-field ${errors.zipCode ? 'border-red-500' : ''}`}
                        placeholder="10001"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`input-field ${errors.country ? 'border-red-500' : ''}`}
                      >
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="JP">Japan</option>
                      </select>
                      {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Review Order */}
              {currentStep === 2 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.product.title}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          <p className="text-sm font-semibold text-primary-600">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Shipping Address:</h3>
                    <div className="text-sm text-gray-600">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                      <p>{formData.country}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>

                  <UnifiedPayment
                    amount={total}
                    currency={formData.country === 'IN' ? 'INR' : 'USD'}
                    description={`TechNova Global - Order for ${formData.firstName} ${formData.lastName}`}
                    customerInfo={{
                      name: `${formData.firstName} ${formData.lastName}`,
                      email: formData.email,
                      phone: formData.phone,
                    }}
                    onSuccess={(details) => {
                      console.log('Payment successful:', details);
                      clearCart();
                      setCurrentStep(4);
                    }}
                    onError={(error) => {
                      console.error('Payment failed:', error);
                      alert('Payment failed. Please try again.');
                    }}
                  />

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  className={`btn-secondary ${currentStep === 1 ? 'invisible' : ''}`}
                >
                  Back
                </button>
                
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {currentStep === 3 ? 'Complete Order' : 'Continue'}
                      <CreditCard className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {shipping === 0 && (
                <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders over $50!</span>
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>Free worldwide shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Order tracking included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;