import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { Heart, AlertCircle, Check, X } from 'lucide-react';

interface Cow {
  id: string;
  name: string;
  breed: string;
  age: number;
  gender: 'male' | 'female';
  health_status: string;
  genetic_history?: string;
  milk_production?: number;
}

interface Match {
  id: string;
  cow1_id: string;
  cow2_id: string;
  compatibility_score: number;
  status: 'pending' | 'accepted' | 'rejected';
  cow1?: Cow;
  cow2?: Cow;
}

export default function BreedingMarketplace() {
  const [myCows, setMyCows] = useState<Cow[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadCowsAndMatches();
    }
  }, [user]);

  const loadCowsAndMatches = async () => {
    try {
      setLoading(true);
      
      // Load user's cows
      const { data: cowsData, error: cowsError } = await supabase
        .from('cows')
        .select('*')
        .eq('owner_id', user?.id);
      
      if (cowsError) throw cowsError;
      setMyCows(cowsData || []);

      // Load matches with cow details
      const { data: matchesData, error: matchesError } = await supabase
        .from('breeding_matches')
        .select(`
          *,
          cow1:cows!breeding_matches_cow1_id_fkey(*),
          cow2:cows!breeding_matches_cow2_id_fkey(*)
        `)
        .or(`cow1_id.eq.${myCows.map(c => c.id).join(',')},cow2_id.eq.${myCows.map(c => c.id).join(',')}`);

      if (matchesError) throw matchesError;
      setMatches(matchesData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const findMatches = async (cowId: string) => {
    try {
      const { data: cow } = await supabase
        .from('cows')
        .select('*')
        .eq('id', cowId)
        .single();

      if (!cow) return;

      // Find potential matches based on breed compatibility and health
      const { data: potentialMatches } = await supabase
        .from('cows')
        .select('*')
        .neq('owner_id', user?.id)
        .eq('breed', cow.breed)
        .eq('health_status', 'healthy')
        .neq('gender', cow.gender);

      if (!potentialMatches?.length) return;

      // Calculate compatibility scores and create matches
      for (const match of potentialMatches) {
        const compatibilityScore = calculateCompatibilityScore(cow, match);
        if (compatibilityScore >= 0.7) { // Only create matches with high compatibility
          await supabase
            .from('breeding_matches')
            .insert({
              cow1_id: cow.id,
              cow2_id: match.id,
              compatibility_score: compatibilityScore,
              status: 'pending'
            });
        }
      }

      loadCowsAndMatches();
    } catch (error) {
      console.error('Error finding matches:', error);
    }
  };

  const calculateCompatibilityScore = (cow1: Cow, cow2: Cow): number => {
    let score = 0;
    
    // Same breed bonus
    if (cow1.breed === cow2.breed) score += 0.3;
    
    // Age compatibility (prefer similar ages)
    const ageDiff = Math.abs(cow1.age - cow2.age);
    score += (1 - Math.min(ageDiff / 5, 1)) * 0.2;
    
    // Health status
    if (cow1.health_status === 'healthy' && cow2.health_status === 'healthy') {
      score += 0.3;
    }
    
    // Milk production (for females)
    if (cow1.gender === 'female' && cow2.gender === 'male') {
      if (cow1.milk_production && cow1.milk_production > 15) {
        score += 0.2;
      }
    } else if (cow2.gender === 'female' && cow1.gender === 'male') {
      if (cow2.milk_production && cow2.milk_production > 15) {
        score += 0.2;
      }
    }
    
    return Math.min(score, 1);
  };

  const updateMatchStatus = async (matchId: string, status: 'accepted' | 'rejected') => {
    try {
      await supabase
        .from('breeding_matches')
        .update({ status })
        .eq('id', matchId);
      
      loadCowsAndMatches();
    } catch (error) {
      console.error('Error updating match status:', error);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Breeding Marketplace</h1>
        <p className="text-gray-600">Find the perfect match for your cows with our AI-powered breeding suggestions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Cows</h2>
          <div className="space-y-4">
            {myCows.map((cow) => (
              <div key={cow.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{cow.name}</h3>
                  <button
                    onClick={() => findMatches(cow.id)}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-700"
                  >
                    <Heart size={16} />
                    <span>Find Matches</span>
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Breed: {cow.breed}</p>
                  <p>Age: {cow.age} years</p>
                  <p>Gender: {cow.gender}</p>
                  <p>Health: {cow.health_status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Breeding Matches</h2>
          <div className="space-y-4">
            {matches.map((match) => {
              const isCow1Owner = match.cow1?.owner_id === user?.id;
              const matchedCow = isCow1Owner ? match.cow2 : match.cow1;
              const myCow = isCow1Owner ? match.cow1 : match.cow2;

              if (!matchedCow || !myCow) return null;

              return (
                <div key={match.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">Match for {myCow.name}</h3>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-green-600">
                          {(match.compatibility_score * 100).toFixed(0)}% Compatible
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className={`capitalize ${
                          match.status === 'pending' ? 'text-yellow-600' :
                          match.status === 'accepted' ? 'text-green-600' :
                          'text-red-600'
                        }`}>
                          {match.status}
                        </span>
                      </div>
                    </div>
                    {match.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateMatchStatus(match.id, 'accepted')}
                          className="p-1 text-green-600 hover:text-green-700"
                          title="Accept"
                        >
                          <Check size={18} />
                        </button>
                        <button
                          onClick={() => updateMatchStatus(match.id, 'rejected')}
                          className="p-1 text-red-600 hover:text-red-700"
                          title="Reject"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Name: {matchedCow.name}</p>
                    <p>Breed: {matchedCow.breed}</p>
                    <p>Age: {matchedCow.age} years</p>
                    <p>Health: {matchedCow.health_status}</p>
                    {matchedCow.milk_production && (
                      <p>Milk Production: {matchedCow.milk_production} L/day</p>
                    )}
                  </div>

                  {match.status === 'accepted' && (
                    <div className="mt-2 p-2 bg-green-50 text-green-700 text-sm rounded">
                      <div className="flex items-center space-x-1">
                        <AlertCircle size={14} />
                        <span>Contact the owner to proceed with breeding arrangements.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {matches.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Heart size={40} className="mx-auto mb-2 text-gray-400" />
                <p>No matches found yet. Try finding matches for your cows!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}