import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { getLicenseDetails, type License } from '../../services/license.service';

function getLicenseStatusColor(status: License['status']) {
  switch (status) {
    case 'active':
      return 'text-green-600';
    case 'expired':
      return 'text-red-600';
    case 'suspended':
      return 'text-yellow-600';
    default:
      return 'text-gray-600';
  }
}

export function LicenseInfo() {
  const { data: license, isLoading } = useQuery({
    queryKey: ['license'],
    queryFn: getLicenseDetails,
  });

  if (isLoading) {
    return (
      <div className="animate-pulse bg-white rounded-lg p-6 shadow">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!license) {
    return (
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="flex items-center text-red-600">
          <XCircle className="h-5 w-5 mr-2" />
          <span>No active license found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">License Details</h3>
          <span className={`flex items-center ${getLicenseStatusColor(license.status)}`}>
            <CheckCircle className="h-5 w-5 mr-2" />
            {license.status.charAt(0).toUpperCase() + license.status.slice(1)}
          </span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="font-medium">{license.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Expires</p>
            <p className="font-medium flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {new Date(license.expiresAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Features</p>
          <ul className="grid grid-cols-2 gap-2">
            {license.features.map((feature) => (
              <li key={feature} className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}