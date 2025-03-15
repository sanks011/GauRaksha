import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { AlertTriangle, Camera, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface WelfareReport {
  id: string;
  incident_type: string;
  description: string;
  location_lat: number;
  location_lng: number;
  image_url?: string;
  status: 'pending' | 'investigating' | 'resolved';
  created_at: string;
}

interface ReportFormData {
  incident_type: string;
  description: string;
  image_url?: string;
}

export default function WelfareReporting() {
  const [reports, setReports] = useState<WelfareReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string>('');
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ReportFormData>();

  useEffect(() => {
    if (user) {
      loadReports();
      getCurrentLocation();
    }
  }, [user]);

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('welfare_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError('');
        },
        (error) => {
          setLocationError('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
    }
  };

  const onSubmit = async (data: ReportFormData) => {
    if (!location) {
      setLocationError('Location is required to submit a report.');
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('welfare_reports')
        .insert([{
          ...data,
          reporter_id: user?.id,
          location_lat: location.lat,
          location_lng: location.lng,
          status: 'pending'
        }]);

      if (error) throw error;

      reset();
      loadReports();
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'investigating':
        return 'text-blue-600 bg-blue-50';
      case 'resolved':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'investigating':
        return <AlertCircle size={16} />;
      case 'resolved':
        return <CheckCircle size={16} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Report Welfare Incidents</h1>
        <p className="text-gray-600">Help protect cows by reporting incidents of mistreatment or neglect.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Submit a Report</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Incident Type
                </label>
                <select
                  {...register('incident_type', { required: 'Incident type is required' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select incident type</option>
                  <option value="illegal_transport">Illegal Transport</option>
                  <option value="mistreatment">Mistreatment</option>
                  <option value="abandonment">Abandonment</option>
                  <option value="unsafe_conditions">Unsafe Conditions</option>
                  <option value="other">Other</option>
                </select>
                {errors.incident_type && (
                  <p className="text-red-500 text-sm mt-1">{errors.incident_type.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  {...register('description', {
                    required: 'Description is required',
                    minLength: { value: 20, message: 'Description must be at least 20 characters' }
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Provide detailed information about the incident..."
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  {...register('image_url')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin size={16} className="text-gray-500" />
                  {location ? (
                    <span className="text-green-600">Location detected</span>
                  ) : (
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Detect location
                    </button>
                  )}
                </div>
                {locationError && (
                  <p className="text-red-500 text-sm mt-1">{locationError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !location}
                className={`w-full py-2 px-4 rounded-md text-white ${
                  isSubmitting || !location
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
            </form>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize">
                      {report.incident_type.replace('_', ' ')}
                    </span>
                    <div className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${getStatusColor(report.status)}`}>
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(report.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-2">{report.description}</p>
                
                {report.image_url && (
                  <img
                    src={report.image_url}
                    alt="Incident"
                    className="w-full h-48 object-cover rounded-md mb-2"
                  />
                )}
                
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <MapPin size={14} />
                  <span>
                    Location: {report.location_lat.toFixed(6)}, {report.location_lng.toFixed(6)}
                  </span>
                </div>
              </div>
            ))}
            
            {reports.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <AlertTriangle size={40} className="mx-auto mb-2 text-gray-400" />
                <p>No reports found. Be the first to report an incident!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}