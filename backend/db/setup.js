import pg from 'pg'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const {
    Pool
} = pg

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'bigconnect_admin',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
})

async function setup() {
    try {
        console.log('Setting up BigConnect Admin database...')

        // Create admin_users table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'support_admin',
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        avatar_url TEXT,
        phone VARCHAR(50),
        last_login_at TIMESTAMP,
        password_reset_token VARCHAR(6),
        password_reset_expires TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `)
        console.log('✓ admin_users table created')

        // Create default admin user
        const password = 'BigConnect@2026'
        const hash = await bcrypt.hash(password, 10)

        await pool.query(`
      INSERT INTO admin_users (email, password_hash, first_name, last_name, role, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
    `, ['admin@bigconnect.ai', hash, 'David', 'Mensah', 'super_admin', 'active'])

        console.log('✓ Default admin user created')
        console.log('  Email: admin@bigconnect.ai')
        console.log('  Password: BigConnect@2026')
        console.log('')
        console.log('Database setup complete!')

        await pool.end()
    } catch (error) {
        console.error('Setup failed:', error.message)
        process.exit(1)
    }
}

setup()