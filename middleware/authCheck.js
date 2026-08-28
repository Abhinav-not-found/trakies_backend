import jwt from 'jsonwebtoken'
const authCheck = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const [, token] = authHeader.split(' ');
    try {
        if (!process.env.SECRETE_KEY) {
            throw new Error('SECRETE_KEY is not configured');
        }
        const decode = jwt.verify(token, process.env.SECRETE_KEY);
        req.user = decode;
        next()
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
}

export { authCheck }; 