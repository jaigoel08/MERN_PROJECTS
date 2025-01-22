const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authUser = async (req, res, next) => {
   
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
        try{
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);
            
            if (!user) {
                return res.status(404).send({ error: 'User not found' });
            }
    
            req.user = user;
            return next();
        }
        catch(err) {
            return res.status(401).json({message: 'Unauthorized'});
        }
};

module.exports = authUser; 