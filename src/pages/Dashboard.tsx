import React, { useState } from 'react';
import { Package, Truck, Clock, FileText, Plus, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import NewOrderModal from '../components/dashboard/NewOrderModal';
import OrderList from '../components/dashboard/OrderList';
import OrderStats from '../components/dashboard/OrderStats';
import SearchFilter from '../components/dashboard/SearchFilter';

export default function Dashboard() {
  const { user } = useAuth();
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.displayName}</h1>
              <p className="text-gray-600">Manage your shipments and track orders</p>
            </div>
            <button
              onClick={() => setIsNewOrderModalOpen(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Order
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <OrderStats />

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {/* Orders List */}
        <OrderList searchTerm={searchTerm} filterStatus={filterStatus} />

        {/* New Order Modal */}
        <NewOrderModal
          isOpen={isNewOrderModalOpen}
          onClose={() => setIsNewOrderModalOpen(false)}
        />
      </div>
    </div>
  );
}