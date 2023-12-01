const Models = require('../models/index.js')
const Users = Models.User

const jwt = require("jsonwebtoken")

async function IsAdmin(req, res, next) {
    try {
        const user = jwt.verify(req.cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if(error) return res.sendStatus(403);
            return decoded
        })
        
        const checkRole = await Users.findOne({
            where: {
                id: user.id,
            },
        })

        if (checkRole.role !== 'Admin') {
            return res.status(403).json({ msg: `Your role is not allowed!` })
        } else {
            next()
        }
    } catch (error) {
        return res.status(500).json({ msg: `roleChecker:\n ${error.message}` })
    }
}

module.exports = { IsAdmin }
