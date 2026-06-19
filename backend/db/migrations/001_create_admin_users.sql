-- BigConnect AI Admin Users Table
-- Stores admin platform users (BigConnect internal team)

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'support_admin',
  -- Roles: super_admin, platform_admin, finance_admin, support_admin, technical_admin, viewer
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  -- Statuses: active, inactive, suspended
  avatar_url TEXT,
  phone VARCHAR(50),
  last_login_at TIMESTAMP,
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create default super admin
-- Password: BigConnect@2026 (hashed with bcrypt)
INSERT INTO admin_users (email, password_hash, first_name, last_name, role, status)
VALUES (
  'admin@bigconnect.ai',
  '$2b$10$rQZ8K8Y8Y8Y8Y8Y8Y8Y8YOdummyhashreplacewithreal',
  'David',
  'Mensah',
  'super_admin',
  'active'
) ON CONFLICT (email) DO NOTHING;
