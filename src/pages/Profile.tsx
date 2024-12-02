import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { LicenseInfo } from '../components/license/LicenseInfo';
import { profileSchema, type ProfileInput } from '../lib/validation/profile.schema';
import { getProfile, updateProfile } from '../services/profile.service';

export default function Profile() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: profile,
  });

  const onSubmit = async (data: ProfileInput) => {
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email address"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <Input
            label="Full name"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input
            label="Company"
            {...register('company')}
            error={errors.company?.message}
          />
          <Button type="submit" isLoading={isSubmitting}>
            Update Profile
          </Button>
        </form>
      </div>

      <LicenseInfo />
    </div>
  );
}