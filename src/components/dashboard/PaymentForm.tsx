import React from 'react';
import { CreditCard, DollarSign } from 'lucide-react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

interface PaymentFormProps {
  amount: number;
  currency: string;
  onSuccess: () => void;
}

export default function PaymentForm({ amount, currency, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Payment successful!');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
          <span className="text-lg font-medium">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: currency
            }).format(amount)}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Details
            </label>
            <div className="border border-gray-300 rounded-md p-4">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        <div className="flex items-center justify-center">
          <CreditCard className="h-5 w-5 mr-2" />
          Pay Now
        </div>
      </button>
    </form>
  );
}