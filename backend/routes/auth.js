import {
    Router
} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from '../db/index.js'
import dotenv from 'dotenv'

dotenv.config()

export const authRouter = Router()

const JWT_SECRET = process.env.JWT_SECRET || 'bigconnect-admin-jwt-secret-dev-2026'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h'

/**
 * POST /api/v1/auth/login
 * Admin login with email and password
 */
authRouter.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            })
        }

        // Find user by email
        const result = await pool.query(
            'SELECT * FROM admin_users WHERE email = $1 AND status = $2',
            [email.toLowerCase(), 'active']
        )

        if (result.rows.length === 0) {
            return res.status(401).json({
                error: 'Invalid email or password'
            })
        }

        const user = result.rows[0]

        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash)
        if (!isValid) {
            return res.status(401).json({
                error: 'Invalid email or password'
            })
        }

        // Update last login
        await pool.query(
            'UPDATE admin_users SET last_login_at = NOW() WHERE id = $1',
            [user.id]
        )

        // Generate JWT
        const token = jwt.sign({
                userId: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role,
            },
            JWT_SECRET, {
                expiresIn: JWT_EXPIRES_IN
            }
        )

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    role: user.role,
                    avatarUrl: user.avatar_url,
                },
            },
        })
    } catch (error) {
        console.error('Login error:', error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

/**
 * POST /api/v1/auth/forgot-password
 * Send password reset PIN to admin email
 */
authRouter.post('/forgot-password', async (req, res) => {
    try {
        const {
            email
        } = req.body

        if (!email) {
            return res.status(400).json({
                error: 'Email is required'
            })
        }

        const result = await pool.query(
            'SELECT id, email FROM admin_users WHERE email = $1',
            [email.toLowerCase()]
        )

        // Always return success (don't reveal if email exists)
        if (result.rows.length === 0) {
            return res.json({
                success: true,
                message: 'If the email exists, a reset PIN has been sent.'
            })
        }

        const user = result.rows[0]

        // Generate 6-digit PIN
        const pin = Math.floor(100000 + Math.random() * 900000).toString()
        const expires = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

        await pool.query(
            'UPDATE admin_users SET password_reset_token = $1, password_reset_expires = $2 WHERE id = $3',
            [pin, expires, user.id]
        )

        // TODO: Send PIN via email service
        console.log(`[DEV] Reset PIN for ${email}: ${pin}`)

        res.json({
            success: true,
            message: 'If the email exists, a reset PIN has been sent.'
        })
    } catch (error) {
        console.error('Forgot password error:', error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

/**
 * POST /api/v1/auth/verify-reset-pin
 * Verify the 6-digit reset PIN
 */
authRouter.post('/verify-reset-pin', async (req, res) => {
    try {
        const {
            email,
            pin
        } = req.body

        if (!email || !pin) {
            return res.status(400).json({
                error: 'Email and PIN are required'
            })
        }

        const result = await pool.query(
            'SELECT id FROM admin_users WHERE email = $1 AND password_reset_token = $2 AND password_reset_expires > NOW()',
            [email.toLowerCase(), pin]
        )

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: 'Invalid or expired PIN'
            })
        }

        res.json({
            success: true,
            message: 'PIN verified successfully'
        })
    } catch (error) {
        console.error('Verify PIN error:', error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

/**
 * POST /api/v1/auth/reset-password
 * Reset password after PIN verification
 */
authRouter.post('/reset-password', async (req, res) => {
    try {
        const {
            email,
            pin,
            newPassword
        } = req.body

        if (!email || !pin || !newPassword) {
            return res.status(400).json({
                error: 'Email, PIN, and new password are required'
            })
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters'
            })
        }

        // Verify PIN is still valid
        const result = await pool.query(
            'SELECT id FROM admin_users WHERE email = $1 AND password_reset_token = $2 AND password_reset_expires > NOW()',
            [email.toLowerCase(), pin]
        )

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: 'Invalid or expired PIN'
            })
        }

        const user = result.rows[0]

        // Hash new password
        const hash = await bcrypt.hash(newPassword, 10)

        // Update password and clear reset token
        await pool.query(
            'UPDATE admin_users SET password_hash = $1, password_reset_token = NULL, password_reset_expires = NULL, updated_at = NOW() WHERE id = $2',
            [hash, user.id]
        )

        res.json({
            success: true,
            message: 'Password reset successfully'
        })
    } catch (error) {
        console.error('Reset password error:', error)
        res.status(500).json({
            error: 'Internal server error'
        })
    }
})

/**
 * GET /api/v1/auth/me
 * Get current authenticated user profile
 */
authRouter.get('/me', async (req, res) => {
    // This requires the authenticate middleware on the route
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Authentication required'
        })
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)

        const result = await pool.query(
            'SELECT id, email, first_name, last_name, role, status, avatar_url, phone, last_login_at, created_at FROM admin_users WHERE id = $1',
            [decoded.userId]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const user = result.rows[0]
        res.json({
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            status: user.status,
            avatarUrl: user.avatar_url,
            phone: user.phone,
            lastLoginAt: user.last_login_at,
            createdAt: user.created_at,
        })
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid token'
        })
    }
})