/*
  # GauRakshaAI Database Schema

  1. New Tables
    - `cows`
      - Basic cow information and breeding details
    - `breeding_matches`
      - Tracks breeding pair suggestions and matches
    - `welfare_reports`
      - Stores incident reports with location data
    - `educational_resources`
      - Knowledge base content for farmers

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Cows table
CREATE TABLE IF NOT EXISTS cows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id),
  name text NOT NULL,
  breed text NOT NULL,
  age integer NOT NULL,
  gender text NOT NULL CHECK (gender IN ('male', 'female')),
  health_status text NOT NULL,
  genetic_history text,
  location_lat numeric,
  location_lng numeric,
  milk_production numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Breeding matches table
CREATE TABLE IF NOT EXISTS breeding_matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cow1_id uuid REFERENCES cows(id),
  cow2_id uuid REFERENCES cows(id),
  compatibility_score numeric NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Welfare reports table
CREATE TABLE IF NOT EXISTS welfare_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES auth.users(id),
  incident_type text NOT NULL,
  description text NOT NULL,
  location_lat numeric NOT NULL,
  location_lng numeric NOT NULL,
  image_url text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'investigating', 'resolved')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Educational resources table
CREATE TABLE IF NOT EXISTS educational_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  author_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE cows ENABLE ROW LEVEL SECURITY;
ALTER TABLE breeding_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE welfare_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE educational_resources ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read all cows" ON cows
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their own cows" ON cows
  FOR ALL TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can read all breeding matches" ON breeding_matches
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their breeding matches" ON breeding_matches
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM cows
      WHERE (cows.id = breeding_matches.cow1_id OR cows.id = breeding_matches.cow2_id)
      AND cows.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can read all welfare reports" ON welfare_reports
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create and manage their reports" ON welfare_reports
  FOR ALL TO authenticated
  USING (reporter_id = auth.uid())
  WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Users can read all educational resources" ON educational_resources
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can manage their educational content" ON educational_resources
  FOR ALL TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());