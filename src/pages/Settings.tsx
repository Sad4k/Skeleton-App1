import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { passwordSchema, type PasswordInput } from '../lib/validation/profile.schema';
import { updatePassword } from '../services/profile.service';
import { activateLicense } from '../services/license.service';

export default function Settings() {
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
  } = useForm<PasswordInput>({
    resolver: zodResolver(passwordSchema),
  });

  const {
    register: registerLicense,
    handleSubmit: handleLicenseSubmit,
    formState: { isSubmitting: isLicenseSubmitting },
    reset: resetLicense,
  } = useForm<{ licenseKey: string }>();

  const onPasswordSubmit = async (data: PasswordInput) => {
    try {
      await updatePassword(data);
      toast.success('Password updated successfully');
      resetPassword();
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  const onLicenseSubmit = async (data: { licenseKey: string }) => {
    try {
      await activateLicense(data.licenseKey);
      toast.success('License activated successfully');
      resetLicense();
    } catch (error) {
      toast.error('Failed to activate license');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Change Password</h2>
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-6">
          <Input
            label="Current Password"
            type="password"
            {...registerPassword('currentPassword')}
            error={passwordErrors.currentPassword?.message}
          />
          <Input
            label="New Password"
            type="password"
            {...registerPassword('newPassword')}
            error={passwordErrors.newPassword?.message}
          />
          <Input
            label="Confirm New Password"
            type="password"
            {...registerPassword('confirmPassword')}
            error={passwordErrors.confirmPassword?.message}
          />
          <Button type="submit" isLoading={isPasswordSubmitting}>
            Update Password
          </Button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">License Management</h2>
        <form onSubmit={handleLicenseSubmit(onLicenseSubmit)} className="space-y-6">
          <Input
            label="License Key"
            {...registerLicense('licenseKey')}
            placeholder="Enter your license key"
          />
          <Button type="submit" isLoading={isLicenseSubmitting}>
            Activate License
          </Button>
        </form>
      </div>
    </div>
  );
}