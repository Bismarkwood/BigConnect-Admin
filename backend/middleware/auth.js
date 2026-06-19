import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'bigconnect-admin-jwt-secret-dev-2026'

/**
 * Middleware to verify JWT token from Authorization header
 * Attaches decoded user to req.user
 */
export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Authentication required',
            message: 'No token provided'
        })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                error: 'Token expired',
                message: 'Please login again'
            })
        }
        return res.status(401).json({
            error: 'Invalid token',
            message: 'Authentication failed'
        })
    }
}

/**
 * Middleware to check user role
 * Usage: authorize('super_admin', 'platform_admin')
 */
export function authorize(...allowedRoles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Authentication required'
            })
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Insufficient permissions',
                message: `Role '${req.user.role}' is not authorized for this action`,
                requiredRoles: allowedRoles,
            })
        }

        next()
    }
}