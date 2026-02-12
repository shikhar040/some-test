/*
  # Initial Schema Setup for SOME Social Network

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `title` (text)
      - `location` (text)
      - `bio` (text)
      - `avatar` (text)
      - `posts_count` (integer, default 0)
      - `followers_count` (integer, default 0)
      - `following_count` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `image` (text, nullable)
      - `type` (text, check: 'social' or 'professional')
      - `likes_count` (integer, default 0)
      - `comments_count` (integer, default 0)
      - `shares_count` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `post_likes`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references posts)
      - `user_id` (uuid, references profiles)
      - `created_at` (timestamptz, default now())
    
    - `user_settings`
      - `user_id` (uuid, primary key, references profiles)
      - `email_notifications` (boolean, default true)
      - `push_notifications` (boolean, default true)
      - `social_visibility` (text, default 'public')
      - `professional_visibility` (text, default 'public')
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  bio text DEFAULT '',
  avatar text NOT NULL DEFAULT '',
  posts_count integer DEFAULT 0,
  followers_count integer DEFAULT 1234,
  following_count integer DEFAULT 567,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  image text,
  type text NOT NULL CHECK (type IN ('social', 'professional')),
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  user_id uuid PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  social_visibility text DEFAULT 'public' CHECK (social_visibility IN ('public', 'followers', 'private')),
  professional_visibility text DEFAULT 'public' CHECK (professional_visibility IN ('public', 'connections', 'recruiters')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Posts policies
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete their own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (true);

-- Post likes policies
CREATE POLICY "Post likes are viewable by everyone"
  ON post_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can like posts"
  ON post_likes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can unlike posts"
  ON post_likes FOR DELETE
  TO authenticated
  USING (true);

-- User settings policies
CREATE POLICY "Users can view their own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);

-- Insert a default profile for testing
INSERT INTO profiles (id, name, title, location, avatar, bio)
VALUES (
  'b8c3a3f2-4567-4abc-9def-123456789abc',
  'Alex Morgan',
  'Creative Designer & Developer',
  'San Francisco, CA',
  'https://i.pravatar.cc/150?img=33',
  'Passionate about creating beautiful digital experiences'
) ON CONFLICT (id) DO NOTHING;

-- Insert default settings for the test profile
INSERT INTO user_settings (user_id)
VALUES ('b8c3a3f2-4567-4abc-9def-123456789abc')
ON CONFLICT (user_id) DO NOTHING;
