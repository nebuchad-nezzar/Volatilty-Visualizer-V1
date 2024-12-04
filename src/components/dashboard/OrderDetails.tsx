import React from 'react';
import { format } from 'date-fns';
import { Package, MapPin, Clock, DollarSign } from 'lucide-react';
import { Order } from '../../types/order';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

export default function OrderDetails({ order, onClose }: OrderDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tracking Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Tracking Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Package className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium">Tracking Number:</span>
                <span className="ml-2">{order.trackingNumber}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium">Status:</span>
                <span className="ml-2 capitalize">{order.status}</span>
              </div>
              {order.dates.estimatedDelivery && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-medium">Estimated Delivery:</span>
                  <span className="ml-2">
                    {format(new Date(order.dates.estimatedDelivery), 'PPP')}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium">Amount:</span>
                <span className="ml-2">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: order.payment.currency
                  }).format(order.payment.amount)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">Status:</span>
                <span className={`ml-2 capitalize ${
                  order.payment.status === 'paid' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {order.payment.status}
                </span>
              </div>
              {order.payment.method && (
                <div className="flex items-center">
                  <span className="font-medium">Method:</span>
                  <span className="ml-2 capitalize">{order.payment.method}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shipment Details */}
          <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Shipment Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Origin</h4>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <address className="not-italic">
                    {order.origin.address}<br />
                    {order.origin.city}, {order.origin.country}<br />
                    {order.origin.postalCode}
                  </address>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Destination</h4>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <address className="not-italic">
                    {order.destination.address}<br />
                    {order.destination.city}, {order.destination.country}<br />
                    {order.destination.postalCode}
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}