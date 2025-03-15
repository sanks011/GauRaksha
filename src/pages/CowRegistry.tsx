import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface CowFormData {
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  health_status: string;
  genetic_history?: string;
  location_lat?: number;
  location_lng?: number;
  milk_production?: number;
}

interface Cow extends CowFormData {
  id: string;
  created_at: string;
}

export default function CowRegistry() {
  const [cows, setCows] = useState<Cow[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCow, setEditingCow] = useState<Cow | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CowFormData>();

  useEffect(() => {
    if (!user) {
      navigate('/'); // Redirect to Home if not logged in
    }
  }, [user, navigate]);
  
  useEffect(() => {
    if (editingCow) {
      Object.entries(editingCow).forEach(([key, value]) => {
        setValue(key as keyof CowFormData, value);
      });
    }
  }, [editingCow, setValue]);

  const loadCows = async () => {
    const { data, error } = await supabase
      .from('cows')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error loading cows:', error);
      return;
    }
    
    setCows(data);
  };

  const onSubmit = async (data: CowFormData) => {
    try {
      if (editingCow) {
        const { error } = await supabase
          .from('cows')
          .update(data)
          .eq('id', editingCow.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cows')
          .insert([{ ...data, owner_id: user?.id }]);
        
        if (error) throw error;
      }
      
      reset();
      setIsFormOpen(false);
      setEditingCow(null);
      loadCows();
    } catch (error) {
      console.error('Error saving cow:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this cow?')) {
      const { error } = await supabase
        .from('cows')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting cow:', error);
        return;
      }
      
      loadCows();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cow Registry</h1>
        <button
          onClick={() => {
            reset();
            setEditingCow(null);
            setIsFormOpen(true);
          }}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Plus size={20} />
          <span>Add New Cow</span>
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingCow ? 'Edit Cow' : 'Register New Cow'}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                {...register('name', { required: 'Name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Breed
              </label>
              <input
                {...register('breed', { required: 'Breed is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                {...register('age', { required: 'Age is required', min: 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                {...register('gender', { required: 'Gender is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Health Status
              </label>
              <input
                {...register('health_status', { required: 'Health status is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Milk Production (liters/day)
              </label>
              <input
                type="number"
                step="0.1"
                {...register('milk_production', { min: 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Genetic History
              </label>
              <textarea
                {...register('genetic_history')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                rows={3}
              />
            </div>

            <div className="md:col-span-2 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setIsFormOpen(false);
                  setEditingCow(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {editingCow ? 'Update' : 'Register'} Cow
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cows.map((cow) => (
          <div key={cow.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{cow.name}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setEditingCow(cow);
                    setIsFormOpen(true);
                  }}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(cow.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            
            <dl className="space-y-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Breed</dt>
                <dd className="text-gray-900">{cow.breed}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="text-gray-900">{cow.age} years</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="text-gray-900 capitalize">{cow.gender}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Health Status</dt>
                <dd className="text-gray-900">{cow.health_status}</dd>
              </div>
              {cow.milk_production && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Milk Production</dt>
                  <dd className="text-gray-900">{cow.milk_production} L/day</dd>
                </div>
              )}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

