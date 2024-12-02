import React from 'react';
import { useAuthStore } from '../stores/auth.store';

export default function Home() {
  const { user } = useAuthStore();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Welcome back, {user?.email}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-700">Active License</h2>
          <p className="mt-2 text-blue-600">Professional Plan</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-green-700">Status</h2>
          <p className="mt-2 text-green-600">Active</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-700">Next Renewal</h2>
          <p className="mt-2 text-purple-600">30 days</p>
        </div>
      </div>
    </div>
  );
}